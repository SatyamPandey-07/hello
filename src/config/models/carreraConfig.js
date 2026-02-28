export const carreraConfig = {
    id: 'carrera-4s',
    name: '911 Carrera 4S',
    modelPath: '/models/free_porsche_911_carrera_4s-compressed.glb',
    
    // Aura Settings
    auraLightingColor: '#fff8e7',
    auraIntensity: 2.0,
    auraSound: '/audio/ignition-carrera.mp3',
    auraDuration: 2.5,

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
        orbitRadius: 0.25,
        verticalRange: 0.15,
        speed: 0.0006,
        smooth: true
    },

    // Lighting
    lighting: {
        ambient: { color: '#fff8f0', intensity: 0.1 },
        key: { color: '#ffffff', position: [10, 14, 10], intensity: 3.5 },
        fill: { color: '#ffeedd', position: [-8, 5, -5], intensity: 0.5 },
        rim: { color: '#fffef8', position: [-4, 6, -10], intensity: 2.0 }
    },

    // Audio
    ambientLoop: '/audio/carrera-awd-idle.mp3',

    // Visual Theme
    visualTheme: {
        environment: 'city', // Urban sophistication
        backgroundColor: '#0f0f10', // Deep charcoal
        gradientColors: ['#050505', '#1a1a1c', '#0f0f10'], // Sophisticated gray gradient
        fog: {
            enabled: true,
            color: '#0f0f10',
            near: 8,
            far: 30
        },
        atmosphere: {
            particleColor: '#fff8e7',
            particleDensity: 0.2,
            glow: false
        }
    },

    // Scroll Sections
    scrollSections: [
        {
            id: 'exterior',
            title: 'ALL-WHEEL AUTHORITY',
            subtitle: 'Precision Performance',
            description: 'Mechanical grip meets intelligent power distribution.',
            cameraTarget: { x: 2, y: 1.2, z: 4 }
        },
        {
            id: 'features',
            title: 'ACTIVE DYNAMICS',
            subtitle: 'Rear-Axle Steering',
            description: 'Agility of a sports car, stability of a supercar.',
            cameraTarget: { x: -2, y: 0.8, z: 2.5 }
        },
        {
            id: 'interior',
            title: 'DRIVER COMMAND',
            subtitle: 'Intuitive Interface',
            description: 'Every control exactly where instinct expects it.',
            cameraTarget: { x: 0, y: 1.5, z: 2 }
        },
        {
            id: 'exit',
            title: 'EVERYDAY EXCELLENCE',
            subtitle: 'Daily Supercar',
            description: 'Track capability, daily usability, pure Porsche.',
            cameraTarget: { x: 0, y: 2, z: 8 }
        }
    ],

    // UI Overlays
    overlayText: {
        hero: 'Carrera 4S',
        tagline: 'Precision Meets Power',
        cta: 'Configure Yours'
    },

    // Visual Theme
    visualTheme: {
        backgroundColor: '#0a0b0d',
        gradientColors: ['#1a1d24', '#2a2d35', '#0a0b0d'],
        environment: 'city',
        atmosphere: {
            particleColor: '#e0e7ff',
            particleDensity: 220,
            glow: 0.5
        },
        fog: {
            enabled: true,
            color: '#1a1d24',
            near: 12,
            far: 45
        }
    }
};
