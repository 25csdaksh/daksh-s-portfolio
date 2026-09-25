import React from "react";
import { ArrowUp, Heart, Sparkles, Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "./Icons";
import { profileData } from "../data/profile";
import { soundManager } from "../utils/sound";

export function Footer({ onOpenLearning }) {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#123C2F] text-[#F7F7F3] pt-16 pb-12 px-4 sm:px-6 md:px-12 relative overflow-hidden border-t border-[#123C2F]/20">
      {/* Subtle Background Watermark */}
      <div className="absolute -bottom-10 right-0 font-serif text-[14vw] font-black text-white/3 select-none pointer-events-none">
        SONI
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Top Footer Tier */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#123C2F] flex items-center justify-center font-serif italic text-base font-bold">
                D
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#F7F7F3]">
                Daksh Soni
              </span>
            </div>
            <p className="font-serif italic text-base text-white/70">
              "Building. Learning. Creating."
            </p>
            <p className="text-xs text-white/60 font-mono max-w-sm">
              Computer Science Engineering Student • Full-Stack Developer • AI Enthusiast • Aspiring Software Entrepreneur
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="#about"
                  className="text-white/80 hover:text-[#D4AF37] transition-colors"
                  data-cursor="pointer"
                >
                  About Story
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-white/80 hover:text-[#D4AF37] transition-colors"
                  data-cursor="pointer"
                >
                  Featured Projects
                </a>
              </li>
              <li>
                <a
                  href="#certificates"
                  className="text-white/80 hover:text-[#D4AF37] transition-colors"
                  data-cursor="pointer"
                >
                  Certifications
                </a>
              </li>
              {onOpenLearning && (
                <li>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onOpenLearning();
                    }}
                    className="text-white/80 hover:text-[#D4AF37] transition-colors text-left"
                    data-cursor="pointer"
                  >
                    Learning & Roadmap ↗
                  </button>
                </li>
              )}
              <li>
                <a
                  href="#hackathons"
                  className="text-white/80 hover:text-[#D4AF37] transition-colors"
                  data-cursor="pointer"
                >
                  Hackathons
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/80 hover:text-[#D4AF37] transition-colors"
                  data-cursor="pointer"
                >
                  Contact & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Social Networks & Back to Top */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
              SOCIAL CHANNELS
            </span>
            <div className="flex items-center gap-3">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F7F3] transition-colors"
                title="GitHub"
                data-cursor="pointer"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F7F3] transition-colors"
                title="LinkedIn"
                data-cursor="pointer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F7F3] transition-colors"
                title="Instagram"
                data-cursor="pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F7F3] transition-colors"
                title="Email"
                data-cursor="pointer"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-semibold transition-all"
              data-cursor="pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 pt-2">
          <div>
            © {new Date().getFullYear()} Daksh Soni. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Architected with React & Modern Web Standards</span>
            <span>•</span>
            <span className="text-[#D4AF37]">India (IST)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
