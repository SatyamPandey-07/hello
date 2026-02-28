/**
 * Draco Compression Analysis & Optimization Script
 * 
 * This script analyzes GLB files for Draco compression and provides
 * optimization recommendations.
 * 
 * Usage:
 *   node check-draco-compression.js
 */

const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'public', 'models');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m',
};

function formatBytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function checkDracoCompression(filePath) {
    const buffer = fs.readFileSync(filePath);
    
    // GLB files start with magic number 0x46546C67 ("glTF")
    const magic = buffer.readUInt32LE(0);
    if (magic !== 0x46546C67) {
        return { error: 'Not a valid GLB file' };
    }

    // Check for Draco extension in JSON chunk
    const jsonChunkLength = buffer.readUInt32LE(12);
    const jsonChunkStart = 20;
    const jsonChunk = buffer.toString('utf8', jsonChunkStart, jsonChunkStart + jsonChunkLength);
    
    try {
        const gltf = JSON.parse(jsonChunk);
        
        const hasDraco = gltf.extensionsUsed?.includes('KHR_draco_mesh_compression');
        const hasRequired = gltf.extensionsRequired?.includes('KHR_draco_mesh_compression');
        
        return {
            hasDraco,
            hasRequired,
            extensionsUsed: gltf.extensionsUsed || [],
            meshCount: gltf.meshes?.length || 0,
            primitiveCount: gltf.meshes?.reduce((sum, mesh) => sum + mesh.primitives.length, 0) || 0,
        };
    } catch (e) {
        return { error: 'Failed to parse GLB JSON', details: e.message };
    }
}

console.log(`\n${colors.bold}${colors.cyan}=== Draco Compression Analysis ===${colors.reset}\n`);

const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.glb'));

let totalSize = 0;
let compressedCount = 0;
const results = [];

files.forEach(file => {
    const filePath = path.join(modelsDir, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    totalSize += size;
    
    const analysis = checkDracoCompression(filePath);
    
    results.push({
        file,
        size,
        analysis,
    });

    if (analysis.hasDraco) compressedCount++;
});

// Print results
results.forEach(({ file, size, analysis }) => {
    const status = analysis.hasDraco ? 
        `${colors.green}✓ Draco Compressed${colors.reset}` : 
        `${colors.red}✗ Not Compressed${colors.reset}`;
    
    console.log(`${colors.bold}${file}${colors.reset}`);
    console.log(`  Size: ${colors.yellow}${formatBytes(size)}${colors.reset}`);
    console.log(`  Status: ${status}`);
    
    if (analysis.error) {
        console.log(`  ${colors.red}Error: ${analysis.error}${colors.reset}`);
    } else {
        console.log(`  Meshes: ${analysis.meshCount} | Primitives: ${analysis.primitiveCount}`);
        if (analysis.extensionsUsed.length > 0) {
            console.log(`  Extensions: ${analysis.extensionsUsed.join(', ')}`);
        }
    }
    console.log();
});

// Summary
console.log(`${colors.bold}${colors.cyan}=== Summary ===${colors.reset}`);
console.log(`Total Files: ${files.length}`);
console.log(`Compressed: ${colors.green}${compressedCount}${colors.reset}`);
console.log(`Uncompressed: ${colors.red}${files.length - compressedCount}${colors.reset}`);
console.log(`Total Size: ${colors.yellow}${formatBytes(totalSize)}${colors.reset}`);

if (compressedCount < files.length) {
    const estimatedSavings = totalSize * 0.6; // Conservative 60% reduction
    console.log(`${colors.magenta}Potential Savings: ~${formatBytes(estimatedSavings)}${colors.reset}`);
    
    console.log(`\n${colors.bold}${colors.yellow}⚠️  Recommended Action:${colors.reset}`);
    console.log(`Run the following commands to compress your models:\n`);
    
    results.forEach(({ file, analysis }) => {
        if (!analysis.hasDraco) {
            const outputFile = file.replace('.glb', '-compressed.glb');
            console.log(`${colors.cyan}npx gltf-pipeline -i public/models/${file} -o public/models/${outputFile} -d${colors.reset}`);
        }
    });
    
    console.log(`\n${colors.bold}Then update your config files to use the compressed versions.${colors.reset}\n`);
} else {
    console.log(`\n${colors.green}${colors.bold}✓ All models are already Draco compressed!${colors.reset}\n`);
}
