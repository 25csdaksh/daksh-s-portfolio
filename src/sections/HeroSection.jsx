import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FolderGit2, Mail, Terminal, ChevronDown } from "lucide-react";
import { HeroVisual3D } from "../components/HeroVisual3D";
import { profileData } from "../data/profile";
import { soundManager } from "../utils/sound";

export function HeroSection({ onOpenResume }) {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 flex flex-col justify-center overflow-hidden bg-transparent">
      {/* Massive Low-Opacity Background Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[16vw] sm:text-[18vw] font-black tracking-tighter text-purple-500/[0.04] select-none pointer-events-none watermark-text z-0">
        DAKSH
      </div>

      {/* Cosmic Purple & Amber Radial Glow Follower Background */}
      <div className="absolute top-1/4 left-1/4 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] bg-purple-600/16 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] bg-amber-500/12 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Editorial Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-7"
        >
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#0f072e]/90 border border-purple-400/40 shadow-lg backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-sm shadow-purple-400/60" />
            <span className="font-mono text-[10px] sm:text-xs tracking-wider text-purple-200 font-bold uppercase">
              {profileData.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
              Hi, I'm <span className="text-white">Daksh.</span>
              <br />
              I build <span className="gradient-text-cosmic">digital experiences</span>
              <br />
              that <span className="text-white">matter.</span>
            </h1>
          </div>

          {/* Supporting Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
            I'm a Computer Science Engineering student and full-stack developer passionate about building scalable software, AI-powered products, and meaningful digital experiences.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-1 sm:pt-2">
            <a
              href="#projects"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 text-xs sm:text-sm font-extrabold border border-yellow-300 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-amber-500/40 flex items-center justify-center gap-2 group"
              data-cursor="pointer"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 text-purple-950 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
            </a>

            <a
              href="#contact"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0f072e]/95 border border-purple-400/40 text-white text-xs sm:text-sm font-semibold hover:border-purple-400 hover:text-purple-200 hover:bg-[#170c43] transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 shadow-md backdrop-blur-md"
              data-cursor="pointer"
            >
              <span>Let's Connect</span>
            </a>
          </div>

          {/* Availability Status Indicator */}
          <div className="flex items-center gap-2.5 pt-2 sm:pt-3 border-t border-purple-400/15 text-xs text-slate-300 w-full">
            <div className="flex items-center gap-2 bg-[#0f072e] px-3 py-1 rounded-full border border-purple-400/30 shrink-0">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span className="font-mono text-[11px] sm:text-xs text-purple-300 font-semibold">{profileData.status}</span>
            </div>
            <span className="text-[11px] sm:text-xs font-mono text-slate-400 truncate">
              • Open for innovation & engineering
            </span>
          </div>
        </motion.div>

        {/* Right Side Visual Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center w-full"
        >
          <HeroVisual3D />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative mt-6 sm:mt-12 flex flex-col items-center justify-center pointer-events-none">
        <a
          href="#about"
          className="pointer-events-auto flex flex-col items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-purple-400 transition-colors"
          onClick={() => soundManager.playClick()}
          data-cursor="pointer"
        >
          <span>EXPLORE</span>
          <ChevronDown className="w-4 h-4 text-purple-400 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
