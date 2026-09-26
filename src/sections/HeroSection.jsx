import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FolderGit2, Mail, Terminal, ChevronDown } from "lucide-react";
import { HeroVisual3D } from "../components/HeroVisual3D";
import { profileData } from "../data/profile";
import { soundManager } from "../utils/sound";

export function HeroSection({ onOpenResume }) {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 md:px-12 flex flex-col justify-center overflow-hidden bg-transparent">
      {/* Massive Low-Opacity Background Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[18vw] font-black tracking-tighter text-blue-500/[0.03] select-none pointer-events-none watermark-text z-0">
        DAKSH
      </div>

      {/* Subtle Radial Glow Follower Background */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/12 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Editorial Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8"
        >
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#091328]/90 border border-amber-400/40 shadow-lg backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs tracking-wider text-amber-300 font-bold uppercase">
              {profileData.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.08]">
              Hi, I'm <span className="text-white">Daksh.</span>
              <br />
              I build <span className="gradient-text-gold">digital experiences</span>
              <br />
              that <span className="text-white">matter.</span>
            </h1>
          </div>

          {/* Supporting Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl font-normal leading-relaxed">
            I'm a Computer Science Engineering student and full-stack developer passionate about building scalable software, AI-powered products, and meaningful digital experiences.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <a
              href="#projects"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-blue-950 text-sm font-extrabold border border-yellow-300 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-amber-500/40 flex items-center gap-2 group"
              data-cursor="pointer"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 text-blue-950 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
            </a>

            <a
              href="#contact"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="px-7 py-3.5 rounded-full bg-[#091328]/95 border border-amber-400/40 text-white text-sm font-semibold hover:border-amber-400 hover:text-amber-300 hover:bg-[#0E1D3E] transition-all duration-300 hover:scale-[1.03] flex items-center gap-2 shadow-md backdrop-blur-md"
              data-cursor="pointer"
            >
              <span>Let's Connect</span>
            </a>
          </div>

          {/* Availability Status Indicator */}
          <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-[#091328] px-3.5 py-1 rounded-full border border-amber-400/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-mono text-amber-300 font-semibold">{profileData.status}</span>
            </div>
            <span className="hidden sm:inline text-xs font-mono text-slate-400">
              • Open for innovation & engineering roles
            </span>
          </div>
        </motion.div>

        {/* Right Side Visual Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center"
        >
          <HeroVisual3D />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative mt-8 sm:mt-12 flex flex-col items-center justify-center pointer-events-none">
        <a
          href="#about"
          className="pointer-events-auto flex flex-col items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-amber-400 transition-colors"
          onClick={() => soundManager.playClick()}
          data-cursor="pointer"
        >
          <span>EXPLORE</span>
          <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
