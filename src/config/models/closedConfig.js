export const closedConfig = {
    id: 'closed',
    name: '911 Heritage',
    modelPath: '/models/closed-compressed.glb',
    
    // Aura Settings
    auraLightingColor: '#f0e6d2',
    auraIntensity: 1.8,
    auraSound: '/audio/ignition-heritage.mp3',
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
        orbitRadius: 0.3,
        verticalRange: 0.2,
        speed: 0.0008,
        smooth: true
    },

    // Lighting
    lighting: {
        ambient: { color: '#f0ece4', intensity: 0.08 },
        key: { color: '#fff5e6', position: [8, 12, 8], intensity: 3 },
        fill: { color: '#e0e8ff', position: [-6, 4, -4], intensity: 0.4 },
        rim: { color: '#ffffff', position: [-3, 5, -8], intensity: 1.5 }
    },

    // Audio
    ambientLoop: '/audio/heritage-idle.mp3',

    // Visual Theme
    visualTheme: {
        environment: 'sunset',
        backgroundColor: '#0f0d0a',
        gradientColors: ['#1a1510', '#2d2418', '#0f0d0a'],
        fog: {
            enabled: true,
            color: '#1a1510',
            near: 10,
            far: 50
        },
        atmosphere: {
            particleColor: '#ffedd5',
            particleDensity: 180,
            glow: 0.6
        }
    },

    // Scroll Sections
    scrollSections: [
        {
            id: 'exterior',
            title: 'TIMELESS DESIGN',
            subtitle: 'Classic Porsche Engineering',
            description: 'Every curve tells a story of heritage and precision.',
            cameraTarget: { x: 2, y: 1.2, z: 4 }
        },
        {
            id: 'features',
            title: 'PERFORMANCE DNA',
            subtitle: 'Engineered Excellence',
            description: 'Decades of racing innovation in every detail.',
            cameraTarget: { x: -1.5, y: 1, z: 3 }
        },
        {
            id: 'interior',
            title: 'DRIVER FOCUSED',
            subtitle: 'Cockpit Mastery',
            description: 'Where man and machine become one.',
            cameraTarget: { x: 0, y: 1.5, z: 2 }
        },
        {
            id: 'exit',
            title: 'PURE EMOTION',
            subtitle: 'Born to Drive',
            description: 'This is what legends are made of.',
            cameraTarget: { x: 0, y: 2, z: 8 }
        }
    ],

    // UI Overlays
    overlayText: {
        hero: 'The Icon',
        tagline: 'Heritage Redefined',
        cta: 'Discover More'
    }
};
