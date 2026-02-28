export const gt3rsConfig = {
    id: 'gt3-rs',
    name: '911 GT3 RS',
    modelPath: '/models/porsche_gt3_rs-compressed.glb',
    
    // Aura Settings
    auraLightingColor: '#ffffff',
    auraIntensity: 3.0,
    auraSound: '/audio/ignition-gt3.mp3',
    auraDuration: 2.2,

    // Camera Entry
    cameraEntryPath: {
        start: { x: 0, y: 3, z: 15 },
        mid: { x: 0, y: 2.5, z: 8 },
        end: { x: 0, y: 1.8, z: 6 },
        duration: 3.2,
        easing: 'power2.inOut'
    },

    // Idle Motion
    idleCameraMotion: {
        orbitRadius: 0.2,
        verticalRange: 0.1,
        speed: 0.0004,
        smooth: false
    },

    // Lighting (Sharp track lighting)
    lighting: {
        ambient: { color: '#ffffff', intensity: 0.15 },
        key: { color: '#ffffff', position: [15, 18, 15], intensity: 5.0 },
        fill: { color: '#f8f8f8', position: [-12, 8, -8], intensity: 0.8 },
        rim: { color: '#ffffff', position: [-6, 10, -15], intensity: 3.0 }
    },

    // Audio
    ambientLoop: '/audio/gt3-rs-idle.mp3',
    windLayer: '/audio/gt3-aero-wind.mp3',

    // Visual Theme
    visualTheme: {
        environment: 'studio', // Clinical race environment
        backgroundColor: '#0d0d0e', // Pure racing black
        gradientColors: ['#000000', '#1a1a1a', '#0d0d0e'], // Sharp monochrome gradient
        fog: {
            enabled: false, // No fog for clarity
            color: '#0d0d0e',
            near: 10,
            far: 35
        },
        atmosphere: {
            particleColor: '#ffffff',
            particleDensity: 0.1,
            glow: false
        }
    },

    // Scroll Sections
    scrollSections: [
        {
            id: 'exterior',
            title: 'TRACK WEAPON',
            subtitle: 'Aerodynamic Dominance',
            description: 'Every surface generates downforce. Every edge cuts through air.',
            cameraTarget: { x: 3, y: 1.2, z: 4 }
        },
        {
            id: 'features',
            title: 'ACTIVE AERO',
            subtitle: 'DRS & Rear Wing',
            description: 'Race-derived technology on public roads.',
            cameraTarget: { x: 0, y: 1.5, z: -3 }
        },
        {
            id: 'interior',
            title: 'NO COMPROMISE',
            subtitle: 'Carbon Everywhere',
            description: 'Weight is the enemy. Everything else is negotiable.',
            cameraTarget: { x: 0, y: 1.4, z: 1.8 }
        },
        {
            id: 'exit',
            title: 'RACING PURITY',
            subtitle: '518 HP Naturally Aspirated',
            description: '9,000 RPM of flat-six fury. No turbos. No apologies.',
            cameraTarget: { x: 0, y: 2.5, z: 10 }
        }
    ],

    // UI Overlays
    overlayText: {
        hero: 'GT3 RS',
        tagline: 'Born for the Track',
        cta: 'Enter the Race'
    },

    // Visual Theme
    visualTheme: {
        backgroundColor: '#120a08',
        gradientColors: ['#1f120e', '#3d1f18', '#120a08'],
        environment: 'warehouse',
        atmosphere: {
            particleColor: '#ff5722',
            particleDensity: 250,
            glow: 0.8
        },
        fog: {
            enabled: true,
            color: '#1f120e',
            near: 10,
            far: 42
        }
    }
};
