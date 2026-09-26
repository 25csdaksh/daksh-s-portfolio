import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles, BookOpen } from "lucide-react";
import { soundManager } from "../utils/sound";
import { profileData } from "../data/profile";

export function Navbar({ activeSection, onNavigate, onOpenResume, onOpenLearning }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Certificates", href: "#certificates" },
    { label: "Projects", href: "#projects" },
    { label: "Hackathons", href: "#hackathons" },
    { label: "Learning", isAction: true, action: "learning" },
    { label: "Insights", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const handleSoundToggle = () => {
    const newState = soundManager.toggleSound();
    setSoundEnabled(newState);
  };

  const handleItemClick = (item) => {
    soundManager.playClick();
    setMobileMenuOpen(false);

    if (item.isAction && item.action === "learning") {
      if (onOpenLearning) onOpenLearning();
      return;
    }

    if (item.href) {
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-10 py-4 sm:py-5">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-400 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border border-amber-200/80 shadow-lg shadow-blue-950/5"
            : "bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-xs"
        }`}
      >
        {/* Brand Monogram & Name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
          data-cursor="pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-amber-300 border border-amber-400/80 flex items-center justify-center font-sans text-xs font-black shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(212,175,55,0.4)]">
            DS
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
              Daksh Soni
            </span>
            <span className="hidden sm:inline-block font-mono text-[9px] tracking-widest text-amber-700/80 font-semibold uppercase">
              Engineer • AI & Full Stack
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                item.isAction
                  ? "text-blue-900 bg-amber-50 hover:bg-blue-700 hover:text-amber-200 font-semibold border border-amber-300/80 shadow-2xs"
                  : "text-slate-600 hover:text-blue-700 hover:bg-blue-50/60"
              }`}
              data-cursor="pointer"
            >
              {item.isAction && <BookOpen className="w-3.5 h-3.5 text-amber-600" />}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Feedback Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => soundManager.playHover()}
            title={soundEnabled ? "Mute interactive audio" : "Enable tactile sound feedback"}
            className="p-2 rounded-full border border-slate-200 text-slate-600 hover:text-blue-700 hover:border-amber-300 hover:bg-amber-50/40 transition-colors"
            data-cursor="pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-700" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Resume CTA */}
          <button
            onClick={() => {
              soundManager.playClick();
              if (onOpenResume) onOpenResume();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-amber-300/80 text-slate-800 bg-amber-50/30 hover:border-blue-600 hover:text-blue-700 hover:bg-blue-50/50 transition-all duration-200"
            data-cursor="pointer"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-amber-600" />
          </button>

          {/* Primary Let's Talk CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              soundManager.playClick();
              const target = document.querySelector("#contact");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white text-xs font-semibold border border-amber-400/60 shadow-md shadow-blue-900/20 transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/30 hover:border-amber-300 hover:scale-[1.02]"
            data-cursor="pointer"
          >
            <span>Let's Connect</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-full text-slate-800 hover:bg-slate-100"
            data-cursor="pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 max-w-7xl mx-auto bg-white border border-amber-200/80 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-mono text-xs text-slate-800 font-semibold">{profileData.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleItemClick(item)}
                    className="p-2.5 rounded-xl text-left text-sm font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    {item.isAction && <Sparkles className="w-3 h-3 text-amber-500" />}
                  </button>
                ))}
              </div>
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLearning) onOpenLearning();
                  }}
                  className="w-full py-2.5 rounded-full bg-amber-50 text-blue-900 border border-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Open Learning & Specializations</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenResume) onOpenResume();
                  }}
                  className="w-full py-2.5 rounded-full border border-slate-300 text-slate-700 hover:border-blue-700 hover:text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>View Complete Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const target = document.querySelector("#contact");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white text-xs font-semibold text-center shadow-md border border-amber-400/50 shadow-blue-900/20"
                >
                  Let's Connect →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
