import gsap from 'gsap';
import * as THREE from 'three';

export class ExperienceTimeline {
    constructor() {
        this.currentTimeline = null;
        this.isPlaying = false;
        this.phase = 'loading'; // loading -> aura -> entry -> idle -> scroll
        this.listeners = new Set();
        this.camera = null;
        this.scene = null;
        this.auraLight = null;
    }

    setReferences(camera, scene) {
        this.camera = camera;
        this.scene = scene;
    }

    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    notifyPhase(phase) {
        this.phase = phase;
        this.listeners.forEach(cb => cb(phase));
    }

    // ─────────────────────────────────────────────────────────────
    // PHASE 1: AURA ANIMATION
    // ─────────────────────────────────────────────────────────────
    async playAura(config) {
        this.notifyPhase('aura');
        
        return new Promise((resolve) => {
            // Create pulsing aura light
            if (!this.auraLight) {
                this.auraLight = new THREE.PointLight(
                    config.auraLightingColor,
                    0,
                    20,
                    2
                );
                this.auraLight.position.set(0, 1, 0);
                this.scene?.add(this.auraLight);
            } else {
                this.auraLight.color.set(config.auraLightingColor);
            }

            // Play aura sound
            if (config.auraSound) {
                const audio = new Audio(config.auraSound);
                audio.volume = 0.4;
                audio.play().catch(() => {});
            }

            // Animate aura intensity
            const tl = gsap.timeline({
                onComplete: () => {
                    resolve();
                }
            });

            tl.to(this.auraLight, {
                intensity: config.auraIntensity * 8,
                duration: 0.8,
                ease: 'power2.out'
            })
            .to(this.auraLight, {
                intensity: config.auraIntensity * 3,
                duration: config.auraDuration - 0.8,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: 1
            })
            .to(this.auraLight, {
                intensity: 0,
                duration: 0.6,
                ease: 'power2.in'
            });

            this.currentTimeline = tl;
        });
    }

    // ─────────────────────────────────────────────────────────────
    // PHASE 2: CAMERA ENTRY ZOOM (Gear-style reveal)
    // ─────────────────────────────────────────────────────────────
    async runEntryZoom(config) {
        this.notifyPhase('entry');

        if (!this.camera) return;

        const path = config.cameraEntryPath;

        return new Promise((resolve) => {
            const tl = gsap.timeline({
                onComplete: () => {
                    resolve();
                }
            });

            // Start position
            this.camera.position.set(path.start.x, path.start.y, path.start.z);
            this.camera.lookAt(0, 1, 0);

            // Zoom through mid to end
            tl.to(this.camera.position, {
                x: path.mid.x,
                y: path.mid.y,
                z: path.mid.z,
                duration: path.duration * 0.4,
                ease: path.easing
            })
            .to(this.camera.position, {
                x: path.end.x,
                y: path.end.y,
                z: path.end.z,
                duration: path.duration * 0.6,
                ease: 'power3.inOut',
                onUpdate: () => {
                    this.camera?.lookAt(0, 1, 0);
                }
            });

            this.currentTimeline = tl;
        });
    }

    // ─────────────────────────────────────────────────────────────
    // PHASE 3: IDLE CAMERA LOOP
    // ─────────────────────────────────────────────────────────────
    startIdleLoop(config) {
        this.notifyPhase('idle');

        if (!this.camera) return;

        const motion = config.idleCameraMotion;
        let time = 0;

        const idleAnimation = () => {
            if (this.phase !== 'idle') return;

            time += motion.speed;

            const offsetX = Math.sin(time) * motion.orbitRadius;
            const offsetY = Math.sin(time * 0.5) * motion.verticalRange;
            const offsetZ = Math.cos(time) * motion.orbitRadius;

            if (this.camera) {
                const basePos = config.cameraEntryPath.end;
                this.camera.position.x = basePos.x + offsetX;
                this.camera.position.y = basePos.y + offsetY;
                this.camera.position.z = basePos.z + offsetZ;
                this.camera.lookAt(0, 1, 0);
            }

            requestAnimationFrame(idleAnimation);
        };

        idleAnimation();
    }

    // ─────────────────────────────────────────────────────────────
    // PHASE 4: UNLOCK SCROLL EXPERIENCE
    // ─────────────────────────────────────────────────────────────
    unlockScrollExperience() {
        this.notifyPhase('scroll');

        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'auto';
            window.dispatchEvent(new CustomEvent('experienceReady'));
        }
    }

    // ─────────────────────────────────────────────────────────────
    // FULL SEQUENCE (Called on model load/switch)
    // ─────────────────────────────────────────────────────────────
    async runFullSequence(config) {
        this.isPlaying = true;

        // Ensure scroll is locked initially
        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }

        try {
            await this.playAura(config);
            await this.runEntryZoom(config);
            this.startIdleLoop(config);
            
            // Wait a moment before unlocking scroll
            setTimeout(() => {
                this.unlockScrollExperience();
            }, 1000);

        } catch (error) {
            console.error('Timeline error:', error);
        } finally {
            this.isPlaying = false;
        }
    }

    // ─────────────────────────────────────────────────────────────
    // RESET (for model switching)
    // ─────────────────────────────────────────────────────────────
    reset() {
        if (this.currentTimeline) {
            this.currentTimeline.kill();
            this.currentTimeline = null;
        }

        this.phase = 'loading';
        this.isPlaying = false;

        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
    }

    destroy() {
        this.reset();
        this.listeners.clear();
        
        if (this.auraLight && this.scene) {
            this.scene.remove(this.auraLight);
            this.auraLight = null;
        }
    }
}

export const globalTimeline = new ExperienceTimeline();
