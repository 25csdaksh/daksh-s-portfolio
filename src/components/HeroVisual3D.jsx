import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Code2, Cpu } from "lucide-react";

/**
 * HeroVisual3D / HeroPortrait
 * Ultra-premium hero visual presenting Daksh's portrait with layered lighting,
 * deep space obsidian & gold glassmorphic frame, and fully mobile-responsive badges.
 */
export function HeroVisual3D() {
  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] mx-auto flex items-center justify-center select-none group">
      {/* 1. Ambient Glow Layers matching Theme */}
      <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-blue-600/30 via-amber-500/15 to-indigo-600/25 rounded-[2.5rem] blur-2xl sm:blur-3xl -z-10 group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] bg-amber-400/10 rounded-full blur-[70px] sm:blur-[90px] -z-10" />

      {/* 2. Main Portrait Container Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-b from-[#091328]/95 via-[#050B1A]/95 to-[#02040A] border border-amber-400/40 p-3.5 sm:p-6 shadow-2xl shadow-blue-950/80 backdrop-blur-md overflow-hidden"
      >
        {/* Decorative Grid Pattern Overlay in Background */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#FBBF24 1px, transparent 1px)`,
            backgroundSize: "20px 20px"
          }}
        />

        {/* Top Header Pill inside Frame */}
        <div className="relative z-10 flex items-center justify-between pb-2.5 sm:pb-3 mb-1.5 sm:mb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400/50" />
            <span className="font-mono text-[11px] sm:text-xs font-bold text-amber-300 tracking-wider uppercase">
              Daksh Soni
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0E1D3E] border border-amber-400/30 text-[9px] sm:text-[10px] font-mono text-amber-300">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
            <span>AI & Full Stack</span>
          </div>
        </div>

        {/* 3. Daksh Portrait Cutout Photo */}
        <div className="relative z-10 flex items-center justify-center pt-1 pb-1">
          {/* Subtle Backlight behind Photo */}
          <div className="absolute inset-x-8 bottom-4 top-8 bg-gradient-to-t from-blue-600/25 to-amber-400/15 rounded-full blur-xl -z-10" />

          <motion.img
            src="/daksh-portrait.png"
            alt="Daksh Soni — Full Stack & AI Developer"
            className="w-full max-h-[310px] sm:max-h-[440px] md:max-h-[480px] object-contain drop-shadow-[0_15px_30px_rgba(251,191,36,0.15)] transition-transform duration-500 group-hover:scale-[1.02]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            loading="eager"
          />
        </div>

        {/* 4A. Desktop / Tablet Floating Feature Badges (sm: and up) */}
        {/* Floating Badge Left: Full Stack */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="hidden sm:flex absolute left-4 bottom-20 z-20 items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#091328]/95 border border-amber-400/50 shadow-xl backdrop-blur-md"
        >
          <div className="w-7 h-7 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Code2 className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider leading-none">Specialty</span>
            <span className="text-xs font-bold text-white font-sans leading-tight">Full Stack Web</span>
          </div>
        </motion.div>

        {/* Floating Badge Right: AI Integration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="hidden sm:flex absolute right-4 bottom-8 z-20 items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#091328]/95 border border-amber-400/50 shadow-xl backdrop-blur-md"
        >
          <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-amber-300">
            <Cpu className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider leading-none">Focus</span>
            <span className="text-xs font-bold text-white font-sans leading-tight">AI & Cloud Scalability</span>
          </div>
        </motion.div>

        {/* 4B. Mobile-Optimized Bottom Badges Row (sm:hidden) */}
        <div className="flex sm:hidden items-center justify-between gap-2 pt-2.5 mt-1 border-t border-white/10 relative z-20">
          <div className="flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#0E1D3E]/90 border border-amber-400/30">
            <Code2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] font-bold text-white font-sans truncate">Full Stack Web</span>
          </div>
          <div className="flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#0E1D3E]/90 border border-amber-400/30">
            <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] font-bold text-white font-sans truncate">AI & Scalability</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
