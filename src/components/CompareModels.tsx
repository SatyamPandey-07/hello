"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Check, ArrowLeft, Plus } from "lucide-react";
import { carModels, type CarModel } from "@/data/carModels";

// ─── Extended model data with 3D model paths ──────────────────────
interface CompareModel extends CarModel {
  modelSrc?: string;
}

const COMPARE_MODELS: CompareModel[] = carModels.map((m) => {
  const modelMap: Record<string, string> = {
    "911-carrera": "/models/closed-compressed.glb",
    "911-carrera-s": "/models/free_porsche_911_carrera_4s-compressed.glb",
    "911-gt3": "/models/porsche_gt3_rs-compressed.glb",
    "911-turbo": "/models/porsche.glb",
    taycan: "/models/porsche_918_spyder_2015__www.vecarz.com-compressed.glb",
    panamera: "/models/porsche_918_spyder_2015__www.vecarz.com-compressed.glb",
  };
  return { ...m, modelSrc: modelMap[m.slug] || "/models/porsche.glb" };
});

// ─── Spec rows for comparison ─────────────────────────────────────
const SPEC_ROWS: {
  label: string;
  key: string;
  getValue: (m: CompareModel) => string;
  highlight?: "higher" | "lower";
}[] = [
  {
    label: "Horsepower",
    key: "power",
    getValue: (m) => m.specs.power,
    highlight: "higher",
  },
  {
    label: "Top Speed",
    key: "speed",
    getValue: (m) => m.specs.speed,
    highlight: "higher",
  },
  {
    label: "0-60 mph",
    key: "acceleration",
    getValue: (m) => m.specs.acceleration,
    highlight: "lower",
  },
  { label: "Starting Price", key: "price", getValue: (m) => m.price },
  {
    label: "Tagline",
    key: "tagline",
    getValue: (m) => m.tagline,
  },
];

// ─── Model Selector Dropdown ──────────────────────────────────────
function ModelSelector({
  selected,
  onSelect,
  otherSelected,
  index,
}: {
  selected: CompareModel | null;
  onSelect: (model: CompareModel) => void;
  otherSelected: CompareModel | null;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.01 }}
        className={`w-full px-5 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
          selected
            ? "bg-white/[0.04] border-white/10 hover:border-white/20"
            : "bg-white/[0.02] border-dashed border-white/10 hover:border-[#D5001C]/30"
        }`}
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selected.color }}
            />
            <span className="text-sm text-white/80 tracking-wider font-light">
              {selected.name}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Plus className="w-4 h-4 text-white/30" />
            <span className="text-sm text-white/30 tracking-wider font-light">
              Select Model {index + 1}
            </span>
          </div>
        )}
        <ChevronDown
          className={`w-4 h-4 text-white/30 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#141414] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50"
          >
            {COMPARE_MODELS.map((model) => {
              const isSelected = selected?.slug === model.slug;
              const isOther = otherSelected?.slug === model.slug;

              return (
                <button
                  key={model.slug}
                  onClick={() => {
                    if (!isOther) {
                      onSelect(model);
                      setOpen(false);
                    }
                  }}
                  disabled={isOther}
                  className={`w-full px-5 py-3.5 flex items-center justify-between text-left transition-all duration-200 ${
                    isOther
                      ? "opacity-30 cursor-not-allowed"
                      : isSelected
                      ? "bg-white/[0.06]"
                      : "hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: model.color }}
                    />
                    <div>
                      <p className="text-sm text-white/80 tracking-wider font-light">
                        {model.name}
                      </p>
                      <p className="text-[10px] text-white/25 tracking-wider">
                        {model.specs.power} · {model.specs.acceleration}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#D5001C]" />
                  )}
                  {isOther && (
                    <span className="text-[9px] text-white/20 tracking-wider uppercase">
                      In use
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Spec Bar (visual comparison bar) ─────────────────────────────
function SpecBar({
  value,
  maxValue,
  color,
  delay,
}: {
  value: number;
  maxValue: number;
  color: string;
  delay: number;
}) {
  const pct = Math.min(100, (value / maxValue) * 100);
  return (
    <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// ─── Helper: extract numeric from spec string ─────────────────────
function extractNumber(str: string): number {
  const match = str.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function CompareModels() {
  const [modelA, setModelA] = useState<CompareModel | null>(null);
  const [modelB, setModelB] = useState<CompareModel | null>(null);
  const [mvLoaded, setMvLoaded] = useState(false);

  // Load <model-viewer> script
  useEffect(() => {
    const existing = document.querySelector('script[src*="model-viewer"]');
    if (!existing) {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
      script.onload = () => setMvLoaded(true);
      document.head.appendChild(script);
    } else {
      setMvLoaded(true);
    }
  }, []);

  const bothSelected = modelA && modelB;

  // Get best values for highlighting
  const getBestClass = useCallback(
    (
      row: (typeof SPEC_ROWS)[0],
      model: CompareModel,
      other: CompareModel | null
    ) => {
      if (!other || !row.highlight) return "";
      const val = extractNumber(row.getValue(model));
      const otherVal = extractNumber(row.getValue(other));
      if (row.highlight === "higher" && val > otherVal) return "text-green-400";
      if (row.highlight === "lower" && val < otherVal) return "text-green-400";
      if (val === otherVal) return "";
      return "text-white/40";
    },
    []
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs tracking-[0.3em] uppercase font-light">
              Back
            </span>
          </a>
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[#D5001C]" />
            <span className="text-xs tracking-[0.4em] uppercase text-white/60 font-light">
              Compare Models
            </span>
          </div>
        </div>
      </div>

      {/* ── Title Section ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.5em] uppercase text-[#D5001C]/60 mb-3 font-light">
            Side by Side
          </p>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-wider mb-3">
            Compare Models
          </h1>
          <p className="text-sm text-white/25 font-light tracking-wider max-w-lg">
            Select two Porsche models to compare specifications, performance,
            and features side by side.
          </p>
        </motion.div>
      </div>

      {/* ── Model Selectors ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3 font-light">
              Model A
            </p>
            <ModelSelector
              selected={modelA}
              onSelect={setModelA}
              otherSelected={modelB}
              index={0}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3 font-light">
              Model B
            </p>
            <ModelSelector
              selected={modelB}
              onSelect={setModelB}
              otherSelected={modelA}
              index={1}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Comparison Content ─────────────────────────────────── */}
      <AnimatePresence>
        {bothSelected && modelA && modelB && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto px-6 md:px-12 pb-20"
          >
            {/* ── 3D Model Viewers ──────────────────────────────── */}
            {mvLoaded && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[modelA, modelB].map((model, i) => (
                  <motion.div
                    key={model.slug}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden aspect-[4/3]"
                  >
                    {/* Model name badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: model.color }}
                      />
                      <span className="text-xs tracking-wider text-white/60 font-light">
                        {model.name}
                      </span>
                    </div>

                    <model-viewer
                      src={model.modelSrc}
                      alt={`${model.name} 3D Model`}
                      camera-controls
                      auto-rotate
                      shadow-intensity="0.8"
                      exposure="0.9"
                      environment-image="neutral"
                      camera-orbit="30deg 75deg 4m"
                      field-of-view="30deg"
                      interaction-prompt="none"
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                    />

                    {/* Bottom gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            )}

            {/* ── Specs Comparison Table ────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden"
            >
              {/* Table Header */}
              <div className="grid grid-cols-3 px-6 py-4 border-b border-white/[0.06]">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-light">
                  Specification
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: modelA.color }}
                    />
                    <span className="text-xs tracking-wider text-white/60 font-light">
                      {modelA.name}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: modelB.color }}
                    />
                    <span className="text-xs tracking-wider text-white/60 font-light">
                      {modelB.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Spec Rows */}
              {SPEC_ROWS.map((row, ri) => {
                const valA = row.getValue(modelA);
                const valB = row.getValue(modelB);
                const numA = extractNumber(valA);
                const numB = extractNumber(valB);
                const maxVal = Math.max(numA, numB) || 1;

                return (
                  <motion.div
                    key={row.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + ri * 0.08 }}
                    className={`grid grid-cols-3 px-6 py-5 ${
                      ri < SPEC_ROWS.length - 1
                        ? "border-b border-white/[0.04]"
                        : ""
                    }`}
                  >
                    <div className="text-xs text-white/30 tracking-wider font-light flex items-center">
                      {row.label}
                    </div>

                    {/* Model A value */}
                    <div className="text-center">
                      <p
                        className={`text-sm font-light tracking-wider mb-2 ${getBestClass(
                          row,
                          modelA,
                          modelB
                        )}`}
                      >
                        {valA}
                      </p>
                      {row.highlight && numA > 0 && (
                        <SpecBar
                          value={numA}
                          maxValue={maxVal}
                          color={modelA.color}
                          delay={0.7 + ri * 0.08}
                        />
                      )}
                    </div>

                    {/* Model B value */}
                    <div className="text-center">
                      <p
                        className={`text-sm font-light tracking-wider mb-2 ${getBestClass(
                          row,
                          modelB,
                          modelA
                        )}`}
                      >
                        {valB}
                      </p>
                      {row.highlight && numB > 0 && (
                        <SpecBar
                          value={numB}
                          maxValue={maxVal}
                          color={modelB.color}
                          delay={0.7 + ri * 0.08}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ── Features Comparison ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[modelA, modelB].map((model) => (
                <div
                  key={model.slug}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: model.color }}
                    />
                    <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-light">
                      {model.name} Features
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {model.features.map((feat, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: model.color }}
                        />
                        <span className="text-xs text-white/40 leading-relaxed font-light">
                          {feat}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* ── Description ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[modelA, modelB].map((model) => (
                <div
                  key={model.slug}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6"
                >
                  <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3 font-light">
                    {model.tagline}
                  </p>
                  <p className="text-sm text-white/50 leading-relaxed font-light tracking-wider">
                    {model.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-extralight tracking-wider text-white/70">
                      {model.price}
                    </span>
                    <a
                      href={`/car/${model.slug}`}
                      className="text-[10px] tracking-[0.2em] uppercase text-[#D5001C]/60 hover:text-[#D5001C] transition-colors font-light"
                    >
                      View Details →
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Empty state when no models selected ────────────────── */}
      {!bothSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-7xl mx-auto px-6 md:px-12 py-20 text-center"
        >
          <div className="w-16 h-16 rounded-full border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
            <X className="w-6 h-6 text-white/10" />
          </div>
          <p className="text-sm text-white/20 tracking-wider font-light">
            Select two models above to start comparing
          </p>
        </motion.div>
      )}
    </div>
  );
}
