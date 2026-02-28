"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type AudioConfig = {
  src: string;
  volume?: number;
  loop?: boolean;
  playbackRate?: number;
};

type AudioTrigger = {
  progress: number; // 0-1 scroll progress
  audioKey: string;
  fadeIn?: number;  // fade in duration in seconds
  fadeOut?: number; // fade out duration in seconds
};

/**
 * Custom hook for managing scroll-triggered audio effects
 * Handles engine sounds, ambient audio, and interaction sounds for the 3D experience
 */
export function useScrollAudio() {
  const audioContextRef = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const lastTriggeredRef = useRef<Set<string>>(new Set());

  // Audio library configuration
  const audioLibrary: Record<string, AudioConfig> = {
    engineIdle: {
      src: "/audio/engine-idle.mp3",
      volume: 0.4,
      loop: true,
      playbackRate: 1.0,
    },
    engineRevLow: {
      src: "/audio/engine-rev-low.mp3",
      volume: 0.5,
      loop: false,
      playbackRate: 1.0,
    },
    engineRevMid: {
      src: "/audio/engine-rev-mid.mp3",
      volume: 0.6,
      loop: false,
      playbackRate: 1.0,
    },
    engineRevHigh: {
      src: "/audio/engine-rev-high.mp3",
      volume: 0.7,
      loop: false,
      playbackRate: 1.0,
    },
    doorOpen: {
      src: "/audio/door-open.mp3",
      volume: 0.3,
      loop: false,
    },
    ambient: {
      src: "/audio/ambient.mp3",
      volume: 0.2,
      loop: true,
    },
  };

  // Define when audio triggers during scroll
  const audioTriggers: AudioTrigger[] = [
    { progress: 0, audioKey: "engineIdle", fadeIn: 1.0 },
    { progress: 0.15, audioKey: "engineRevLow", fadeIn: 0.3, fadeOut: 0.5 },
    { progress: 0.32, audioKey: "doorOpen", fadeIn: 0.2 }, // Enter cabin
    { progress: 0.50, audioKey: "engineRevMid", fadeIn: 0.3, fadeOut: 0.5 },
    { progress: 0.75, audioKey: "engineRevHigh", fadeIn: 0.3, fadeOut: 0.5 },
  ];

  // Initialize audio elements
  useEffect(() => {
    const audioElements: { [key: string]: HTMLAudioElement } = {};

    try {
      Object.entries(audioLibrary).forEach(([key, config]) => {
        const audio = new Audio(config.src);
        audio.volume = 0; // Start at 0 for smooth fade-in
        audio.loop = config.loop || false;
        audio.preload = "auto";
        if (config.playbackRate) {
          audio.playbackRate = config.playbackRate;
        }

        // Handle loading errors gracefully
        audio.addEventListener("error", (e) => {
          console.warn(`Failed to load audio: ${key}`, e);
        });

        audio.addEventListener("canplaythrough", () => {
          console.log(`Audio loaded: ${key}`);
        });

        audioElements[key] = audio;
      });

      audioContextRef.current = audioElements;
      
      // Use requestAnimationFrame to defer setState
      requestAnimationFrame(() => {
        setIsLoaded(true);
      });

      // Start ambient and idle sounds
      const ambient = audioElements.ambient;
      const engineIdle = audioElements.engineIdle;

      if (ambient && engineIdle) {
        ambient.play().catch(() => console.warn("Autoplay blocked for ambient"));
        engineIdle.play().catch(() => console.warn("Autoplay blocked for engine"));
        
        // Fade in ambient and idle
        gsap.to(ambient, { volume: audioLibrary.ambient.volume, duration: 2 });
        gsap.to(engineIdle, { volume: audioLibrary.engineIdle.volume, duration: 2 });
      }
    } catch (error) {
      console.error("Error initializing audio:", error);
    }

    // Cleanup
    return () => {
      Object.values(audioContextRef.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, [audioLibrary]);

  // Mute/unmute functionality
  useEffect(() => {
    Object.values(audioContextRef.current).forEach((audio) => {
      audio.muted = isMuted;
    });
  }, [isMuted]);

  /**
   * Play audio based on scroll progress
   * @param progress - Normalized scroll progress (0-1)
   */
  const onScrollProgress = (progress: number) => {
    if (!isLoaded) return;

    audioTriggers.forEach((trigger) => {
      const triggerKey = `${trigger.audioKey}-${trigger.progress}`;
      const audio = audioContextRef.current[trigger.audioKey];

      if (!audio) return;

      const targetVolume = audioLibrary[trigger.audioKey]?.volume || 0.5;

      // Check if we've passed the trigger point
      if (progress >= trigger.progress && !lastTriggeredRef.current.has(triggerKey)) {
        lastTriggeredRef.current.add(triggerKey);

        if (audio.paused || audio.currentTime === 0) {
          audio.currentTime = 0;
          audio.volume = 0;
          audio.play().catch((e) => console.warn(`Playback failed for ${trigger.audioKey}:`, e));

          // Fade in
          gsap.to(audio, {
            volume: targetVolume,
            duration: trigger.fadeIn || 0.5,
            ease: "power2.inOut",
          });

          // Fade out if specified (for one-shot sounds)
          if (trigger.fadeOut && !audioLibrary[trigger.audioKey].loop) {
            gsap.to(audio, {
              volume: 0,
              duration: trigger.fadeOut,
              delay: audio.duration - trigger.fadeOut,
              ease: "power2.inOut",
              onComplete: () => {
                audio.pause();
                audio.currentTime = 0;
              },
            });
          }
        }
      }

      // Reset triggers when scrolling back up
      if (progress < trigger.progress - 0.05) {
        lastTriggeredRef.current.delete(triggerKey);
      }
    });

    // Dynamic engine idle pitch based on scroll speed
    const engineIdle = audioContextRef.current.engineIdle;
    if (engineIdle && !engineIdle.paused) {
      // Modulate playback rate based on progress (simulate acceleration)
      const basePitch = 1.0;
      const maxPitch = 1.3;
      const pitch = basePitch + (maxPitch - basePitch) * Math.min(progress, 0.8);
      engineIdle.playbackRate = pitch;
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return {
    onScrollProgress,
    isLoaded,
    isMuted,
    toggleMute,
  };
}
