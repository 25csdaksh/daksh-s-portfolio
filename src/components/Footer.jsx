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
    <footer className="bg-slate-950 text-slate-100 pt-16 pb-12 px-4 sm:px-6 md:px-12 relative overflow-hidden border-t border-slate-800">
      {/* Subtle Background Watermark */}
      <div className="absolute -bottom-10 right-0 font-sans text-[14vw] font-black text-white/3 select-none pointer-events-none">
        SONI
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Top Footer Tier */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-amber-300 border border-amber-400/60 flex items-center justify-center font-sans text-sm font-extrabold shadow-md shadow-amber-500/10">
                DS
              </div>
              <span className="font-sans text-2xl font-bold tracking-tight text-white">
                Daksh Soni
              </span>
            </div>
            <p className="font-serif italic text-base text-amber-200/80">
              "Building. Learning. Creating."
            </p>
            <p className="text-xs text-slate-400 font-mono max-w-sm">
              Computer Science Engineering Student • Full-Stack Developer • AI Enthusiast • Aspiring Software Entrepreneur
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="#about"
                  className="text-slate-400 hover:text-amber-300 transition-colors"
                  data-cursor="pointer"
                >
                  About Story
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-slate-400 hover:text-amber-300 transition-colors"
                  data-cursor="pointer"
                >
                  Featured Projects
                </a>
              </li>
              <li>
                <a
                  href="#certificates"
                  className="text-slate-400 hover:text-amber-300 transition-colors"
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
                    className="text-slate-400 hover:text-amber-300 transition-colors text-left"
                    data-cursor="pointer"
                  >
                    Learning & Roadmap ↗
                  </button>
                </li>
              )}
              <li>
                <a
                  href="#hackathons"
                  className="text-slate-400 hover:text-amber-300 transition-colors"
                  data-cursor="pointer"
                >
                  Hackathons
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-slate-400 hover:text-amber-300 transition-colors"
                  data-cursor="pointer"
                >
                  Contact & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Social Networks & Back to Top */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold">
              SOCIAL CHANNELS
            </span>
            <div className="flex items-center gap-3">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:bg-blue-900 hover:border-amber-400 hover:text-amber-300 text-slate-300 transition-colors"
                title="GitHub"
                data-cursor="pointer"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:bg-blue-900 hover:border-amber-400 hover:text-amber-300 text-slate-300 transition-colors"
                title="LinkedIn"
                data-cursor="pointer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:bg-blue-900 hover:border-amber-400 hover:text-amber-300 text-slate-300 transition-colors"
                title="Instagram"
                data-cursor="pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:bg-blue-900 hover:border-amber-400 hover:text-amber-300 text-slate-300 transition-colors"
                title="Email"
                data-cursor="pointer"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/80 border border-amber-400/40 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-300 text-xs font-mono font-bold transition-all text-amber-300 shadow-sm"
              data-cursor="pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 pt-2">
          <div>
            © {new Date().getFullYear()} Daksh Soni. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Architected with React & Modern Web Standards</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">India (IST)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
