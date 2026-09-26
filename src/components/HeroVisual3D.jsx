import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShieldCheck, Maximize2, Minimize2, Eye, Compass, RotateCw } from "lucide-react";
import { GalaxyScene } from "./galaxy/GalaxyScene";
import { soundManager } from "../utils/sound";

export function HeroVisual3D() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto flex items-center justify-center select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/25 via-amber-500/20 to-indigo-900/35 rounded-3xl blur-3xl -z-10" />

      {/* Galaxy Container Frame */}
      <div className="relative w-full h-full rounded-3xl border-2 border-amber-400/40 bg-[#02060A] overflow-hidden shadow-2xl shadow-blue-950/80 group">
        {/* Procedural 3D Galaxy Canvas */}
        <GalaxyScene className="w-full h-full" showControls={true} />

        {/* Floating Telemetry Badge 1: Netram AI */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          onMouseEnter={() => soundManager.playHover()}
          className="absolute top-4 right-4 bg-[#0D1B3E]/90 backdrop-blur-md px-3 py-2 rounded-xl border border-amber-400/50 shadow-xl flex items-center gap-2.5 z-10 pointer-events-auto"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 text-blue-950 flex items-center justify-center font-black">
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] tracking-wider text-amber-300 font-black uppercase">Netram AI</span>
              <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">98.2%</span>
            </div>
            <p className="text-[10px] text-slate-200 font-normal">Deepfake Defense</p>
          </div>
        </motion.div>

        {/* Floating Telemetry Badge 2: SIH Hackathon */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 5.0, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          onMouseEnter={() => soundManager.playHover()}
          className="absolute bottom-4 left-4 bg-[#0D1B3E]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-400/40 shadow-lg flex items-center gap-2 z-10 pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <div className="text-left">
            <p className="font-mono text-[8px] tracking-wider text-amber-400 font-bold uppercase">SIH 2026</p>
            <p className="text-[9px] font-bold text-white">Team Lead • 36h Sprint</p>
          </div>
        </motion.div>

        {/* Center Monogram Subtle Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
          <div className="w-16 h-16 rounded-full border border-amber-400/30 flex items-center justify-center">
            <span className="font-sans text-xl font-black text-amber-300 font-mono">DS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
