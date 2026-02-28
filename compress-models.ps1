# Draco Compression Script for GLB Models
# This script compresses all GLB models using Draco compression

Write-Host "`n=== Starting Draco Compression ===" -ForegroundColor Cyan
Write-Host "This will compress all GLB models and save ~60-70% file size`n" -ForegroundColor Yellow

$models = @(
    "closed.glb",
    "free_porsche_911_carrera_4s.glb",
    "porsche_918_spyder_2015__www.vecarz.com.glb",
    "porsche_gt3_rs.glb"
)

$totalBefore = 0
$totalAfter = 0
$successful = 0

foreach ($model in $models) {
    $inputPath = "public/models/$model"
    $outputPath = "public/models/" + $model.Replace(".glb", "-compressed.glb")
    
    if (Test-Path $inputPath) {
        $beforeSize = (Get-Item $inputPath).Length / 1MB
        $totalBefore += $beforeSize
        
        Write-Host "Compressing: $model ($([math]::Round($beforeSize, 2)) MB)..." -ForegroundColor Cyan
        
        try {
            $result = npx -y gltf-pipeline -i $inputPath -o $outputPath -d 2>&1
            
            if (Test-Path $outputPath) {
                $afterSize = (Get-Item $outputPath).Length / 1MB
                $totalAfter += $afterSize
                $savings = [math]::Round((($beforeSize - $afterSize) / $beforeSize) * 100, 1)
                
                Write-Host "  [OK] Success: $([math]::Round($afterSize, 2)) MB ($savings percent smaller)" -ForegroundColor Green
                $successful++
            } else {
                Write-Host "  [ERROR] Failed to create compressed file" -ForegroundColor Red
            }
        } catch {
            Write-Host "  [ERROR] Error: $_" -ForegroundColor Red
        }
    } else {
        Write-Host "  [WARN] File not found: $inputPath" -ForegroundColor Yellow
    }
    Write-Host ""
}

Write-Host "`n=== Compression Summary ===" -ForegroundColor Cyan
Write-Host "Models Processed: $successful / $($models.Count)" -ForegroundColor White
Write-Host "Total Before: $([math]::Round($totalBefore, 2)) MB" -ForegroundColor Red
Write-Host "Total After: $([math]::Round($totalAfter, 2)) MB" -ForegroundColor Green
Write-Host "Total Saved: $([math]::Round($totalBefore - $totalAfter, 2)) MB ($([math]::Round((($totalBefore - $totalAfter) / $totalBefore) * 100, 1)) percent)" -ForegroundColor Magenta

if ($successful -gt 0) {
    Write-Host "`n[NEXT] Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Review the compressed models in your 3D viewer" -ForegroundColor White
    Write-Host "2. Update your config files to use the -compressed.glb versions" -ForegroundColor White
    Write-Host "3. Test the models in your app" -ForegroundColor White
    Write-Host "4. Delete the original uncompressed files once verified" -ForegroundColor White
}

Write-Host ""
