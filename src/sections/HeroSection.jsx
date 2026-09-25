import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FolderGit2, Mail, Terminal, ChevronDown } from "lucide-react";
import { HeroVisual3D } from "../components/HeroVisual3D";
import { profileData } from "../data/profile";
import { soundManager } from "../utils/sound";

export function HeroSection({ onOpenResume }) {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 md:px-12 flex flex-col justify-center overflow-hidden">
      {/* Massive Low-Opacity Background Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[18vw] font-black tracking-tighter text-[#123C2F] select-none pointer-events-none watermark-text z-0">
        DAKSH
      </div>

      {/* Subtle Radial Glow Follower Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#123C2F]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -z-10" />

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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#123C2F]/15 shadow-xs backdrop-blur-xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs tracking-wider text-[#123C2F] font-bold uppercase">
              {profileData.eyebrow}
            </span>
          </motion.div>

          {/* Editorial Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold text-[#111111] tracking-tight leading-[1.05]">
              Hi, I'm <span className="font-serif italic font-normal text-[#123C2F]">Daksh.</span>
              <br />
              I build <span className="relative inline-block underline decoration-[#D4AF37]/40 decoration-wavy decoration-2">digital experiences</span>
              <br />
              that <span className="font-serif italic font-normal text-[#123C2F]">matter.</span>
            </h1>
          </div>

          {/* Supporting Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-[#555555] max-w-xl font-normal leading-relaxed">
            I'm a Computer Science Engineering student and full-stack developer passionate about building scalable software, AI-powered products, and meaningful digital experiences.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <a
              href="#projects"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="px-7 py-3.5 rounded-full bg-[#123C2F] text-[#F7F7F3] text-sm font-semibold hover:bg-[#1A5442] shadow-lg shadow-[#123C2F]/15 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 group"
              data-cursor="pointer"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="px-7 py-3.5 rounded-full bg-white border border-[#123C2F]/20 text-[#111111] text-sm font-semibold hover:bg-[#123C2F]/5 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
              data-cursor="pointer"
            >
              <span>Let's Connect</span>
            </a>
          </div>

          {/* Availability Status Indicator */}
          <div className="flex items-center gap-3 pt-3 border-t border-[#123C2F]/10 text-xs text-[#666666]">
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span className="font-mono text-emerald-900 font-semibold">{profileData.status}</span>
            </div>
            <span className="hidden sm:inline text-xs font-mono text-[#888888]">
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
          className="pointer-events-auto flex flex-col items-center gap-1 text-[11px] font-mono text-[#888888] hover:text-[#123C2F] transition-colors"
          onClick={() => soundManager.playClick()}
          data-cursor="pointer"
        >
          <span>EXPLORE</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
