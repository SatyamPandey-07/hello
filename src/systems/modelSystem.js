import { carreraConfig } from '@/config/models/carreraConfig';
import { spyderConfig } from '@/config/models/spyderConfig';
import { gt3rsConfig } from '@/config/models/gt3rsConfig';
import { closedConfig } from '@/config/models/closedConfig';

export const MODEL_LIST = [
    closedConfig,
    carreraConfig,
    spyderConfig,
    gt3rsConfig
];

export class ModelController {
    constructor() {
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.audioContext = null;
        this.currentAudio = null;
        this.listeners = new Set();
    }

    get current() {
        return MODEL_LIST[this.currentIndex];
    }

    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    notify() {
        this.listeners.forEach(cb => cb(this.current));
    }

    async nextModel() {
        if (this.isTransitioning) return;
        this.currentIndex = (this.currentIndex + 1) % MODEL_LIST.length;
        await this.transition();
    }

    async prevModel() {
        if (this.isTransitioning) return;
        this.currentIndex = (this.currentIndex - 1 + MODEL_LIST.length) % MODEL_LIST.length;
        await this.transition();
    }

    async transition() {
        this.isTransitioning = true;

        // Phase 1: Fade out current experience
        await this.fadeOut();

        // Phase 2: Audio crossfade
        await this.crossfadeAudio();

        // Phase 3: Reset camera and scene
        this.resetCamera();

        // Phase 4: Notify subscribers (UI updates)
        this.notify();

        // Phase 5: Fade in new experience
        await this.fadeIn();

        this.isTransitioning = false;
    }

    async fadeOut() {
        return new Promise(resolve => {
            const overlay = document.getElementById('transition-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'all';
                setTimeout(resolve, 800);
            } else {
                resolve();
            }
        });
    }

    async fadeIn() {
        return new Promise(resolve => {
            const overlay = document.getElementById('transition-overlay');
            if (overlay) {
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    overlay.style.pointerEvents = 'none';
                    resolve();
                }, 300);
            } else {
                resolve();
            }
        });
    }

    async crossfadeAudio() {
        const newConfig = this.current;
        
        // Fade out current
        if (this.currentAudio) {
            const fadeOutSteps = 20;
            const fadeOutInterval = 30;
            let step = 0;
            
            const fadeOut = setInterval(() => {
                if (step >= fadeOutSteps) {
                    clearInterval(fadeOut);
                    this.currentAudio?.pause();
                    this.currentAudio = null;
                } else {
                    if (this.currentAudio) {
                        this.currentAudio.volume = 1 - (step / fadeOutSteps);
                    }
                    step++;
                }
            }, fadeOutInterval);
        }

        // Fade in new
        if (newConfig.ambientLoop) {
            setTimeout(() => {
                const audio = new Audio(newConfig.ambientLoop);
                audio.loop = true;
                audio.volume = 0;
                audio.play();

                let step = 0;
                const fadeInSteps = 20;
                const fadeInInterval = 40;

                const fadeIn = setInterval(() => {
                    if (step >= fadeInSteps) {
                        clearInterval(fadeIn);
                    } else {
                        audio.volume = (step / fadeInSteps) * 0.3;
                        step++;
                    }
                }, fadeInInterval);

                this.currentAudio = audio;
            }, 600);
        }
    }

    resetCamera() {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('resetCamera', {
                detail: { config: this.current }
            }));
        }
    }

    jumpTo(index) {
        if (index >= 0 && index < MODEL_LIST.length && !this.isTransitioning) {
            this.currentIndex = index;
            this.transition();
        }
    }
}

export const globalModelController = new ModelController();
