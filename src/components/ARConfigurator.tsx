"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

// ─── Configuration data per model ──────────────────────────────────
interface ColorOption {
  name: string;
  hex: string;
  type: "standard" | "special";
}

interface WheelOption {
  name: string;
  size: string;
}

interface InteriorOption {
  name: string;
  color: string;
}

interface ModelConfig {
  colors: ColorOption[];
  wheels: WheelOption[];
  interiors: InteriorOption[];
}

const MODEL_CONFIGS: Record<string, ModelConfig> = {
  "911 Heritage": {
    colors: [
      { name: "Chalk", hex: "#C8C3B8", type: "standard" },
      { name: "Black", hex: "#1A1A1A", type: "standard" },
      { name: "Guards Red", hex: "#BF0A30", type: "standard" },
      { name: "Racing Yellow", hex: "#F5D100", type: "standard" },
      { name: "Shark Blue", hex: "#2B4F8C", type: "special" },
      { name: "Python Green", hex: "#3B5E3A", type: "special" },
      { name: "Gentian Blue", hex: "#1E3163", type: "special" },
      { name: "Aventurine Green", hex: "#4A6741", type: "special" },
    ],
    wheels: [
      { name: "Carrera S", size: "20/21\"" },
      { name: "RS Spyder", size: "20/21\"" },
      { name: "Sport Classic", size: "20/21\"" },
    ],
    interiors: [
      { name: "Black Leather", color: "#1A1A1A" },
      { name: "Espresso", color: "#3C2415" },
      { name: "Bordeaux Red", color: "#5C1A1B" },
      { name: "Graphite Blue", color: "#2E3A4A" },
    ],
  },
  "911 Carrera 4S": {
    colors: [
      { name: "White", hex: "#E8E6E1", type: "standard" },
      { name: "Jet Black", hex: "#0D0D0D", type: "standard" },
      { name: "Gentian Blue", hex: "#1E3163", type: "standard" },
      { name: "Lava Orange", hex: "#C15324", type: "standard" },
      { name: "Miami Blue", hex: "#00B0D4", type: "special" },
      { name: "Crayon", hex: "#9E9B8E", type: "special" },
      { name: "Frozen Blue", hex: "#7BA7C2", type: "special" },
      { name: "Amethyst", hex: "#6B3FA0", type: "special" },
    ],
    wheels: [
      { name: "Carrera", size: "19/20\"" },
      { name: "Carrera S", size: "20/21\"" },
      { name: "Turbo S", size: "20/21\"" },
    ],
    interiors: [
      { name: "Black", color: "#1A1A1A" },
      { name: "Truffle Brown", color: "#5C4033" },
      { name: "Slate Grey", color: "#3D3D3D" },
      { name: "Atacama Beige", color: "#B39E7D" },
    ],
  },
  "GT3 RS": {
    colors: [
      { name: "White", hex: "#F0EDE8", type: "standard" },
      { name: "Black", hex: "#121212", type: "standard" },
      { name: "Guards Red", hex: "#BF0A30", type: "standard" },
      { name: "Signal Yellow", hex: "#E8D44D", type: "standard" },
      { name: "Shark Blue", hex: "#2B4F8C", type: "special" },
      { name: "Python Green", hex: "#3B5E3A", type: "special" },
      { name: "Nardo Grey", hex: "#7B7D7D", type: "special" },
      { name: "Ultraviolet", hex: "#5B2C8C", type: "special" },
    ],
    wheels: [
      { name: "GT3 RS Forged", size: "20/21\"" },
      { name: "Weissach Package", size: "20/21\"" },
    ],
    interiors: [
      { name: "Black Alcantara", color: "#0F0F0F" },
      { name: "Red Alcantara", color: "#8B1A1A" },
      { name: "Silver Alcantara", color: "#6C6C6C" },
    ],
  },
  "918 Spyder": {
    colors: [
      { name: "Liquid Silver", hex: "#A8A9AD", type: "standard" },
      { name: "Basalt Black", hex: "#1C1C1C", type: "standard" },
      { name: "Racing Yellow", hex: "#F5D100", type: "standard" },
      { name: "Guards Red", hex: "#BF0A30", type: "standard" },
      { name: "Acid Green", hex: "#88C540", type: "special" },
      { name: "Sapphire Blue", hex: "#0F4C81", type: "special" },
      { name: "Rhodium Silver", hex: "#868686", type: "special" },
      { name: "Riviera Blue", hex: "#4A90D9", type: "special" },
    ],
    wheels: [
      { name: "918 Spyder", size: "20/21\"" },
      { name: "Weissach Package", size: "20/21\"" },
    ],
    interiors: [
      { name: "Onyx Black", color: "#111111" },
      { name: "Marsala", color: "#6B2D3A" },
      { name: "Garnet Red", color: "#9B1B30" },
    ],
  },
};

// ─── Collapsible section ────────────────────────────────────────────
function ConfigSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="text-sm font-light tracking-wider text-white/80 group-hover:text-white transition-colors">
          {title}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-white/30" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/30" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main configurator component ────────────────────────────────────
export default function ARConfigurator({
  modelName,
  onColorChange,
  onConfigChange,
}: {
  modelName: string;
  onColorChange?: (hex: string) => void;
  onConfigChange?: (config: { color: string; wheel: string; interior: string }) => void;
}) {
  const config = MODEL_CONFIGS[modelName] || MODEL_CONFIGS["911 Heritage"];

  const [selectedColor, setSelectedColor] = useState(config.colors[0].name);
  const [selectedWheel, setSelectedWheel] = useState(config.wheels[0].name);
  const [selectedInterior, setSelectedInterior] = useState(config.interiors[0].name);

  // Reset selections when model changes
  const [prevModel, setPrevModel] = useState(modelName);
  if (modelName !== prevModel) {
    const newConfig = MODEL_CONFIGS[modelName] || MODEL_CONFIGS["911 Heritage"];
    setSelectedColor(newConfig.colors[0].name);
    setSelectedWheel(newConfig.wheels[0].name);
    setSelectedInterior(newConfig.interiors[0].name);
    setPrevModel(modelName);
  }

  const handleColorSelect = (name: string, hex: string) => {
    setSelectedColor(name);
    onColorChange?.(hex);
    onConfigChange?.({ color: name, wheel: selectedWheel, interior: selectedInterior });
  };

  const handleWheelSelect = (name: string) => {
    setSelectedWheel(name);
    onConfigChange?.({ color: selectedColor, wheel: name, interior: selectedInterior });
  };

  const handleInteriorSelect = (name: string) => {
    setSelectedInterior(name);
    onConfigChange?.({ color: selectedColor, wheel: selectedWheel, interior: name });
  };

  const standardColors = config.colors.filter((c) => c.type === "standard");
  const specialColors = config.colors.filter((c) => c.type === "special");
  const activeColor = config.colors.find((c) => c.name === selectedColor);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/5">
        <h2 className="text-lg font-light tracking-wider text-white mb-1">
          {modelName}
        </h2>
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light">
          Configurator
        </p>
      </div>

      {/* Scrollable config sections */}
      <div className="flex-1 overflow-y-auto px-5 custom-scrollbar">
        {/* ── Exterior Colours ─────────────────────────────────── */}
        <ConfigSection title="Exterior Colours" defaultOpen={true}>
          {/* Standard */}
          <p className="text-xs font-medium text-white/50 mb-3 tracking-wider">
            Standard Colour
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {standardColors.map((color) => (
              <motion.button
                key={color.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleColorSelect(color.name, color.hex)}
                className={`relative w-12 h-12 rounded-lg border-2 transition-all duration-200 ${selectedColor === color.name
                  ? "border-white/60 shadow-lg"
                  : "border-white/10 hover:border-white/25"
                  }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColor === color.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white drop-shadow-lg" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Special */}
          <p className="text-xs font-medium text-white/50 mb-1 tracking-wider">
            Special Colour
          </p>
          {activeColor && activeColor.type === "special" && (
            <p className="text-[10px] text-[#D5001C]/60 mb-2 tracking-wider">
              {activeColor.name}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {specialColors.map((color) => (
              <motion.button
                key={color.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleColorSelect(color.name, color.hex)}
                className={`relative w-12 h-12 rounded-lg border-2 transition-all duration-200 ${selectedColor === color.name
                  ? "border-white/60 shadow-lg"
                  : "border-white/10 hover:border-white/25"
                  }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColor === color.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white drop-shadow-lg" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Selected color label */}
          {activeColor && (
            <motion.div
              key={activeColor.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-full border border-white/20"
                style={{ backgroundColor: activeColor.hex }}
              />
              <span className="text-xs text-white/50 tracking-wider">
                {activeColor.name}
              </span>
            </motion.div>
          )}
        </ConfigSection>

        {/* ── Wheels ────────────────────────────────────────────── */}
        <ConfigSection title="Wheels">
          <div className="flex flex-col gap-2">
            {config.wheels.map((wheel) => (
              <motion.button
                key={wheel.name}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleWheelSelect(wheel.name)}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${selectedWheel === wheel.name
                  ? "border-white/30 bg-white/5"
                  : "border-white/5 hover:border-white/15 hover:bg-white/[0.02]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {/* Wheel icon */}
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${selectedWheel === wheel.name
                      ? "border-white/40"
                      : "border-white/10"
                      }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${selectedWheel === wheel.name ? "bg-white/40" : "bg-white/10"
                        }`}
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-white/70 font-light tracking-wider">
                      {wheel.name}
                    </p>
                    <p className="text-[10px] text-white/30 tracking-wider">
                      {wheel.size}
                    </p>
                  </div>
                </div>
                {selectedWheel === wheel.name && (
                  <Check className="w-4 h-4 text-white/50" />
                )}
              </motion.button>
            ))}
          </div>
        </ConfigSection>

        {/* ── Interior ──────────────────────────────────────────── */}
        <ConfigSection title="Interior">
          <div className="flex flex-wrap gap-2 mb-3">
            {config.interiors.map((interior) => (
              <motion.button
                key={interior.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleInteriorSelect(interior.name)}
                className={`relative w-14 h-10 rounded-lg border-2 transition-all duration-200 ${selectedInterior === interior.name
                  ? "border-white/60 shadow-lg"
                  : "border-white/10 hover:border-white/25"
                  }`}
                style={{ backgroundColor: interior.color }}
                title={interior.name}
              >
                {selectedInterior === interior.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white drop-shadow-lg" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
          {/* Selected interior label */}
          <span className="text-xs text-white/40 tracking-wider">
            {selectedInterior}
          </span>
        </ConfigSection>

        {/* ── Summary ──────────────────────────────────────────── */}
        <ConfigSection title="Your Configuration">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">
                Exterior
              </span>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: activeColor?.hex }}
                />
                <span className="text-xs text-white/60">{selectedColor}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">
                Wheels
              </span>
              <span className="text-xs text-white/60">{selectedWheel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">
                Interior
              </span>
              <span className="text-xs text-white/60">{selectedInterior}</span>
            </div>
            <div className="w-full h-[1px] bg-white/5 my-2" />
            <p className="text-[9px] text-white/20 tracking-wider text-center">
              Configuration is for visualization purposes only
            </p>
          </div>
        </ConfigSection>
      </div>
    </div>
  );
}
