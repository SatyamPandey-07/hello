"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Eye, Lightbulb, Zap, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import QRCode from "react-qr-code";

const AR_MODELS = [
  { name: "911 Heritage", src: "/models/porsche.glb" },
  { name: "911 Carrera 4S", src: "/models/free_porsche_911_carrera_4s-compressed.glb" },
  { name: "GT3 RS", src: "/models/porsche_gt3_rs-compressed.glb" },
  { name: "918 Spyder", src: "/models/porsche_918_spyder_2015__www.vecarz.com-compressed.glb" },
];

// ─── Device detection ──────────────────────────────────────────────
function getDeviceType(): "ios" | "android" | "desktop" {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "desktop";
}

// ─── Component ─────────────────────────────────────────────────────
export default function ARTestDrive() {
  const modelViewerRef = useRef<HTMLElement & { activateAR?: () => void }>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isRevving, setIsRevving] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [interiorView, setInteriorView] = useState(false);
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop");
  const [arUrl, setArUrl] = useState("");
  const [isLocalhost, setIsLocalhost] = useState(false);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);

  const currentARModel = AR_MODELS[currentModelIndex];

  const handlePrevModel = useCallback(() => {
    setCurrentModelIndex((prev) => (prev - 1 + AR_MODELS.length) % AR_MODELS.length);
  }, []);

  const handleNextModel = useCallback(() => {
    setCurrentModelIndex((prev) => (prev + 1) % AR_MODELS.length);
  }, []);

  // Audio refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // ─── Detect device & build AR URL on mount ───────────────────────
  useEffect(() => {
    setDeviceType(getDeviceType());

    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      const hostname = window.location.hostname;

      // Check if we're on localhost / 127.0.0.1
      const local =
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === "0.0.0.0";
      setIsLocalhost(local);

      if (local) {
        // On localhost → try to auto-detect ngrok public URL
        fetch("/api/tunnel")
          .then((res) => res.json())
          .then((data) => {
            if (data.url) {
              setArUrl(`${data.url}/ar`);
            }
            // If no URL, arUrl stays "" → shows instructions
          })
          .catch(() => {
            // ngrok not running → arUrl stays "" → shows instructions
          });
      } else {
        // On a public URL (ngrok, deployed, etc.) → auto-generate QR
        setArUrl(`${origin}/ar`);
      }
    }
  }, []);

  // ─── Load <model-viewer> script ──────────────────────────────────
  useEffect(() => {
    const existing = document.querySelector('script[src*="model-viewer"]');
    if (!existing) {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
      document.head.appendChild(script);
    }
  }, []);

  // ─── Loading progress simulation ────────────────────────────────
  useEffect(() => {
    if (deviceType === "desktop") return; // Desktop shows QR, no model loading
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [deviceType]);

  // ─── Model load event ───────────────────────────────────────────
  useEffect(() => {
    if (deviceType === "desktop") return;
    const checkLoaded = setInterval(() => {
      const mv = modelViewerRef.current;
      if (mv) {
        const handleLoad = () => {
          setIsLoaded(true);
          setLoadProgress(100);
        };
        mv.addEventListener("load", handleLoad);
        clearInterval(checkLoaded);
        return () => mv.removeEventListener("load", handleLoad);
      }
    }, 100);

    // Fallback: mark loaded after 6s
    const fallback = setTimeout(() => {
      setIsLoaded(true);
      setLoadProgress(100);
    }, 6000);

    return () => {
      clearInterval(checkLoaded);
      clearTimeout(fallback);
    };
  }, [deviceType]);

  // ─── Web Audio API: Engine sound ────────────────────────────────
  const startEngineSound = useCallback(() => {
    if (audioContextRef.current) return;

    const ctx = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();
    audioContextRef.current = ctx;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(85, ctx.currentTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.Q.setValueAtTime(5, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);

    // Vibrato for realism
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(5, ctx.currentTime);
    lfoGain.gain.setValueAtTime(3, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    lfo.start();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start();

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
  }, []);

  const stopEngineSound = useCallback(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        0,
        audioContextRef.current.currentTime + 0.5
      );
      setTimeout(() => {
        oscillatorRef.current?.stop();
        audioContextRef.current?.close();
        audioContextRef.current = null;
        oscillatorRef.current = null;
        gainNodeRef.current = null;
      }, 600);
    }
  }, []);

  const revEngine = useCallback(() => {
    if (
      !audioContextRef.current ||
      !oscillatorRef.current ||
      !gainNodeRef.current
    )
      return;

    const ctx = audioContextRef.current;
    const osc = oscillatorRef.current;
    const gain = gainNodeRef.current;

    setIsRevving(true);
    osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.3);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3);
    osc.frequency.linearRampToValueAtTime(85, ctx.currentTime + 1.5);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);

    if (navigator.vibrate) navigator.vibrate([50, 30, 100]);
    setTimeout(() => setIsRevving(false), 1500);
  }, []);

  const toggleSound = useCallback(() => {
    if (soundEnabled) {
      stopEngineSound();
      setSoundEnabled(false);
    } else {
      startEngineSound();
      setSoundEnabled(true);
    }
  }, [soundEnabled, startEngineSound, stopEngineSound]);

  // ─── Camera controls ───────────────────────────────────────────
  const toggleInteriorView = useCallback(() => {
    const mv = modelViewerRef.current;
    if (!mv) return;
    if (!interiorView) {
      mv.setAttribute("camera-orbit", "0deg 75deg 1.5m");
      mv.setAttribute("field-of-view", "60deg");
      setInteriorView(true);
    } else {
      mv.setAttribute("camera-orbit", "0deg 75deg 4m");
      mv.setAttribute("field-of-view", "30deg");
      setInteriorView(false);
    }
  }, [interiorView]);

  const toggleHeadlights = useCallback(() => {
    const mv = modelViewerRef.current;
    if (!mv) return;
    if (!headlightsOn) {
      mv.setAttribute("exposure", "1.8");
      mv.setAttribute("shadow-intensity", "2");
      setHeadlightsOn(true);
    } else {
      mv.setAttribute("exposure", "1");
      mv.setAttribute("shadow-intensity", "1");
      setHeadlightsOn(false);
    }
  }, [headlightsOn]);

  // ─── Launch native AR ───────────────────────────────────────────
  const launchAR = useCallback(() => {
    const mv = modelViewerRef.current;
    if (mv && mv.activateAR) {
      mv.activateAR();
    }
  }, []);

  // ─── State for desktop QR modal ──────────────────────────────────
  const [showQR, setShowQR] = useState(false);

  // ══════════════════════════════════════════════════════════════════
  //  DESKTOP VIEW — 3D Preview + "View on Mobile" → QR
  // ══════════════════════════════════════════════════════════════════
  if (deviceType === "desktop") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-screen bg-[#111111] flex flex-col relative overflow-hidden"
      >
        {/* Back to home */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-6 left-6 z-30 flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs tracking-[0.3em] uppercase font-light">
            Back
          </span>
        </motion.a>

        {/* Top-right label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-6 right-6 z-30 flex items-center gap-3"
        >
          <div className="w-1 h-5 bg-[#D5001C]" />
          <span className="text-xs tracking-[0.4em] uppercase text-white/40 font-light">
            AR Experience
          </span>
        </motion.div>

        {/* 3D Model Viewer — fullscreen background */}
        <div className="flex-1 relative">
          <model-viewer
            ref={modelViewerRef}
            src={currentARModel.src}
            alt={`${currentARModel.name} 3D Model`}
            camera-controls
            auto-rotate
            shadow-intensity="1"
            exposure="1"
            environment-image="neutral"
            loading="eager"
            camera-orbit="30deg 75deg 4m"
            min-camera-orbit="auto auto 2m"
            max-camera-orbit="auto auto 10m"
            field-of-view="30deg"
            interaction-prompt="auto"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#111111",
              outline: "none",
            }}
          />

          {/* Prev / Next Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex items-center justify-between pointer-events-none z-20">
            <motion.button
              onClick={handlePrevModel}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="pointer-events-auto w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              aria-label="Previous Model"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              onClick={handleNextModel}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="pointer-events-auto w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              aria-label="Next Model"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Model name indicator */}
          <motion.div
            key={currentARModel.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-full px-5 py-2 flex items-center gap-3">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-light">
                {currentModelIndex + 1}/{AR_MODELS.length}
              </span>
              <span className="text-sm font-light text-white tracking-wide">
                {currentARModel.name}
              </span>
            </div>
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#111111]/80 to-transparent pointer-events-none" />
        </div>

        {/* Bottom panel — Title + "View on Mobile" button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 z-20 pb-10 px-8"
        >
          <div className="max-w-4xl mx-auto">
            {/* Control buttons row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              {/* Ignition / Rev */}
              <motion.button
                onClick={() => {
                  if (!soundEnabled) toggleSound();
                  else revEngine();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`ar-glass-btn ${isRevving ? "ar-glass-btn-active" : ""}`}
                id="ar-desktop-ignition-btn"
              >
                <Zap
                  className={`w-4 h-4 transition-colors duration-300 ${
                    isRevving
                      ? "text-[#D5001C]"
                      : soundEnabled
                      ? "text-white/90"
                      : "text-white/50"
                  }`}
                />
                <span className="ar-btn-label">
                  {soundEnabled ? "Rev" : "Ignition"}
                </span>
              </motion.button>

              {/* Sound toggle */}
              <motion.button
                onClick={toggleSound}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`ar-glass-btn ${soundEnabled ? "ar-glass-btn-active" : ""}`}
                id="ar-desktop-sound-btn"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-white/90" />
                ) : (
                  <VolumeX className="w-4 h-4 text-white/50" />
                )}
                <span className="ar-btn-label">
                  {soundEnabled ? "On" : "Off"}
                </span>
              </motion.button>

              {/* Headlights */}
              <motion.button
                onClick={toggleHeadlights}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`ar-glass-btn ${headlightsOn ? "ar-glass-btn-active" : ""}`}
                id="ar-desktop-headlights-btn"
              >
                <Lightbulb
                  className={`w-4 h-4 transition-colors duration-300 ${
                    headlightsOn ? "text-yellow-300" : "text-white/50"
                  }`}
                />
                <span className="ar-btn-label">Lights</span>
              </motion.button>

              {/* Interior */}
              <motion.button
                onClick={toggleInteriorView}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`ar-glass-btn ${interiorView ? "ar-glass-btn-active" : ""}`}
                id="ar-desktop-interior-btn"
              >
                <Eye
                  className={`w-4 h-4 transition-colors duration-300 ${
                    interiorView ? "text-[#D5001C]" : "text-white/50"
                  }`}
                />
                <span className="ar-btn-label">Interior</span>
              </motion.button>
            </motion.div>

            {/* Title + View on Mobile row */}
            <div className="flex items-end justify-between">
              {/* Left: Title */}
              <div>
                <p className="text-xs tracking-[0.5em] uppercase text-[#D5001C]/60 mb-2 font-light">
                  Augmented Reality
                </p>
                <h1 className="text-3xl md:text-4xl font-extralight tracking-wider text-white mb-2">
                  Experience in AR
                </h1>
                <p className="text-sm text-white/25 font-light tracking-wider max-w-sm">
                  Place the {currentARModel.name} in your real-world space using your phone
                </p>
              </div>

              {/* Right: View on Mobile button */}
              <motion.button
                onClick={() => setShowQR(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={!arUrl}
                className="ar-primary-btn group flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                id="ar-mobile-btn"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="7" y="2" width="10" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-xs tracking-[0.3em] uppercase font-light">
                    View on Mobile
                  </span>
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-2 left-0 right-0 z-10 text-center"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/8 font-extralight">
            There is no substitute.
          </p>
        </motion.div>

        {/* ── QR Code Modal Overlay ─────────────────────────────── */}
        <AnimatePresence>
          {showQR && arUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
              onClick={() => setShowQR(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="ar-qr-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-1 h-8 bg-[#D5001C] mx-auto mb-6" />

                <h3 className="text-lg tracking-[0.3em] uppercase font-light text-white mb-2">
                  Scan to Experience
                </h3>
                <p className="text-xs text-white/40 tracking-wider mb-8 max-w-xs text-center">
                  Open your phone camera and point it at this QR code
                </p>

                {/* QR Code */}
                <div className="bg-white p-4 rounded-xl mb-6">
                  <QRCode
                    value={arUrl}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#111111"
                    level="M"
                  />
                </div>

                {/* URL display */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-500/60 animate-pulse" />
                  <p className="text-[10px] text-white/25 tracking-wider font-mono break-all max-w-[260px] text-center">
                    {arUrl}
                  </p>
                </div>

                <p className="text-[10px] tracking-[0.3em] uppercase text-white/15 mb-4">
                  Point your camera at this code
                </p>

                <button
                  onClick={() => setShowQR(false)}
                  className="text-xs text-white/40 hover:text-white/70 transition-colors tracking-wider uppercase"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  //  MOBILE VIEW — Model Viewer + AR + Controls
  // ══════════════════════════════════════════════════════════════════
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-[#111111] flex flex-col z-[100]"
    >
      {/* ── Loading overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#111111]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border border-white/20 rounded-full mb-8 relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-[#D5001C] rounded-full" />
            </motion.div>
            <p className="text-xs tracking-[0.5em] uppercase text-white/40 mb-4">
              Preparing Your Experience
            </p>
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#D5001C] to-[#D5001C]/60"
                style={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-[10px] tracking-widest text-white/20 mt-3">
              {Math.round(loadProgress)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4 safe-area-top"
      >
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-[#D5001C]" />
          <span className="text-xs tracking-[0.4em] uppercase text-white/60 font-light">
            AR Experience
          </span>
        </div>
        <a href="/" className="ar-glass-btn group" id="ar-back-btn">
          <ArrowLeft className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
        </a>
      </motion.div>

      {/* ── Model Viewer (fullscreen) ──────────────────────────── */}
      <div className="flex-1 relative">
        <model-viewer
          ref={modelViewerRef}
          src={currentARModel.src}
          alt={`${currentARModel.name} 3D Model`}
          ar
          ar-modes="scene-viewer webxr quick-look"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral"
          loading="eager"
          ar-scale="auto"
          camera-orbit="30deg 75deg 4m"
          min-camera-orbit="auto auto 2m"
          max-camera-orbit="auto auto 10m"
          field-of-view="30deg"
          interaction-prompt="auto"
          ar-placement="floor"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#111111",
            outline: "none",
          }}
        />

        {/* Prev / Next Arrows — Mobile */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          <motion.button
            onClick={handlePrevModel}
            whileTap={{ scale: 0.9 }}
            className="pointer-events-auto w-10 h-10 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center"
            aria-label="Previous Model"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            onClick={handleNextModel}
            whileTap={{ scale: 0.9 }}
            className="pointer-events-auto w-10 h-10 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center"
            aria-label="Next Model"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Model name indicator — Mobile */}
        <motion.div
          key={currentARModel.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2">
            <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-light">
              {currentModelIndex + 1}/{AR_MODELS.length}
            </span>
            <span className="text-xs font-light text-white tracking-wide">
              {currentARModel.name}
            </span>
          </div>
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#111111] to-transparent pointer-events-none" />
      </div>

      {/* ── Bottom controls ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 z-40 pb-8 px-5 safe-area-bottom"
      >
        <div className="flex flex-col items-center gap-5">
          {/* AR Launch CTA */}
          <motion.button
            onClick={launchAR}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="ar-primary-btn group"
            id="ar-launch-btn"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="text-xs tracking-[0.3em] uppercase font-light">
                View in Your Space
              </span>
            </span>
          </motion.button>

          {/* Floating controls row */}
          <div className="flex items-center gap-3">
            {/* Ignition / Rev */}
            <motion.button
              onClick={() => {
                if (!soundEnabled) toggleSound();
                else revEngine();
              }}
              whileTap={{ scale: 0.95 }}
              className={`ar-glass-btn ${isRevving ? "ar-glass-btn-active" : ""}`}
              id="ar-ignition-btn"
            >
              <Zap
                className={`w-4 h-4 transition-colors duration-300 ${
                  isRevving
                    ? "text-[#D5001C]"
                    : soundEnabled
                    ? "text-white/90"
                    : "text-white/50"
                }`}
              />
              <span className="ar-btn-label">
                {soundEnabled ? "Rev" : "Ignition"}
              </span>
            </motion.button>

            {/* Sound toggle */}
            <motion.button
              onClick={toggleSound}
              whileTap={{ scale: 0.95 }}
              className={`ar-glass-btn ${soundEnabled ? "ar-glass-btn-active" : ""}`}
              id="ar-sound-btn"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-white/90" />
              ) : (
                <VolumeX className="w-4 h-4 text-white/50" />
              )}
              <span className="ar-btn-label">
                {soundEnabled ? "On" : "Off"}
              </span>
            </motion.button>

            {/* Headlights */}
            <motion.button
              onClick={toggleHeadlights}
              whileTap={{ scale: 0.95 }}
              className={`ar-glass-btn ${headlightsOn ? "ar-glass-btn-active" : ""}`}
              id="ar-headlights-btn"
            >
              <Lightbulb
                className={`w-4 h-4 transition-colors duration-300 ${
                  headlightsOn ? "text-yellow-300" : "text-white/50"
                }`}
              />
              <span className="ar-btn-label">Lights</span>
            </motion.button>

            {/* Interior */}
            <motion.button
              onClick={toggleInteriorView}
              whileTap={{ scale: 0.95 }}
              className={`ar-glass-btn ${interiorView ? "ar-glass-btn-active" : ""}`}
              id="ar-interior-btn"
            >
              <Eye
                className={`w-4 h-4 transition-colors duration-300 ${
                  interiorView ? "text-[#D5001C]" : "text-white/50"
                }`}
              />
              <span className="ar-btn-label">Interior</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
