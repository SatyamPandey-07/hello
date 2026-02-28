export const spyderConfig = {
    id: '918-spyder',
    name: '918 Spyder',
    modelPath: '/models/porsche_918_spyder_2015__www.vecarz.com-compressed.glb',
    
    // Aura Settings
    auraLightingColor: '#00d4ff',
    auraIntensity: 2.5,
    auraSound: '/audio/ignition-hybrid.mp3',
    auraDuration: 3.0,

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
        orbitRadius: 0.4,
        verticalRange: 0.25,
        speed: 0.001,
        smooth: true
    },

    // Lighting
    lighting: {
        ambient: { color: '#e8f4ff', intensity: 0.12 },
        key: { color: '#ffffff', position: [12, 16, 12], intensity: 4.0 },
        fill: { color: '#c0e0ff', position: [-10, 6, -6], intensity: 0.6 },
        rim: { color: '#00d4ff', position: [-5, 8, -12], intensity: 2.5 },
        accent: { color: '#0099ff', position: [0, 2, 0], intensity: 1.0 }
    },

    // Audio (Hybrid layering)
    ambientLoop: '/audio/918-dual-loop.mp3',
    electricLayer: '/audio/918-electric.mp3',

    // Visual Theme
    visualTheme: {
        environment: 'night', // Futuristic night scene
        backgroundColor: '#0a0f1a', // Deep blue-black
        gradientColors: ['#020408', '#0d1825', '#0a0f1a'], // Electric blue gradient
        fog: {
            enabled: true,
            color: '#0a0f1a',
            near: 6,
            far: 28
        },
        atmosphere: {
            particleColor: '#00d4ff',
            particleDensity: 0.5,
            glow: true
        }
    },

    // Scroll Sections
    scrollSections: [
        {
            id: 'exterior',
            title: 'HYBRID HYPERCAR',
            subtitle: 'Future of Performance',
            description: 'Electric precision meets combustion fury.',
            cameraTarget: { x: 2.5, y: 1.4, z: 4.5 }
        },
        {
            id: 'features',
            title: 'DUAL POWER SYSTEM',
            subtitle: '887 HP Combined',
            description: 'V8 screams at 9,000 RPM. Electric motors respond in milliseconds.',
            cameraTarget: { x: -2.5, y: 1, z: 3 }
        },
        {
            id: 'interior',
            title: 'MISSION CONTROL',
            subtitle: 'Adaptive Interface',
            description: 'Toggle between electric silence and symphony on demand.',
            cameraTarget: { x: 0, y: 1.6, z: 2.2 }
        },
        {
            id: 'exit',
            title: 'RACING DNA',
            subtitle: 'Nürburgring Record Holder',
            description: 'The hypercar that rewrote the rulebook.',
            cameraTarget: { x: 0, y: 2.2, z: 9 }
        }
    ],

    // UI Overlays
    overlayText: {
        hero: '918 Spyder',
        tagline: 'Electric Meets Extreme',
        cta: 'Explore Hybrid Tech'
    },

    // Visual Theme
    visualTheme: {
        backgroundColor: '#020a12',
        gradientColors: ['#051829', '#08254a', '#020a12'],
        environment: 'night',
        atmosphere: {
            particleColor: '#00d4ff',
            particleDensity: 300,
            glow: 0.9
        },
        fog: {
            enabled: true,
            color: '#051829',
            near: 8,
            far: 40
        }
    }
};
