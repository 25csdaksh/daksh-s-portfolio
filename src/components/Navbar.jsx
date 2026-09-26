import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles, BookOpen, FileText } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 md:px-10 py-3 sm:py-5">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-400 px-3.5 sm:px-6 py-2 sm:py-3 flex items-center justify-between ${
          isScrolled
            ? "bg-[#0f072e]/95 backdrop-blur-xl border border-purple-500/40 shadow-2xl shadow-black/80"
            : "bg-[#0f072e]/85 backdrop-blur-md border border-purple-500/25 shadow-lg shadow-black/50"
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
          className="flex items-center gap-2.5 sm:gap-3 group"
          data-cursor="pointer"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-amber-400 border-2 border-purple-400/80 flex items-center justify-center font-sans text-xs font-black shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.6)]">
            DS
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-sm sm:text-lg font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Daksh Soni
            </span>
            <span className="hidden sm:inline-block font-mono text-[9px] tracking-widest text-purple-300/90 font-bold uppercase">
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
                  ? "text-purple-200 bg-purple-500/20 hover:bg-purple-500 hover:text-white font-bold border border-purple-400/50 shadow-xs"
                  : "text-slate-200 hover:text-purple-300 hover:bg-purple-500/10"
              }`}
              data-cursor="pointer"
            >
              {item.isAction && <BookOpen className="w-3.5 h-3.5 text-purple-300" />}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Audio Feedback Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => soundManager.playHover()}
            title={soundEnabled ? "Mute audio" : "Enable sound"}
            className="p-1.5 sm:p-2 rounded-full border border-purple-400/30 text-purple-300 hover:text-white hover:border-purple-400 hover:bg-purple-400/20 transition-colors"
            data-cursor="pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-purple-300" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Resume CTA (Visible on Mobile & Desktop) */}
          <button
            onClick={() => {
              soundManager.playClick();
              if (onOpenResume) onOpenResume();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold border border-purple-400/40 text-purple-200 bg-purple-500/15 hover:bg-purple-500 hover:text-white transition-all duration-200"
            data-cursor="pointer"
            title="Open Resume Document"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-purple-300" />
          </button>

          {/* Primary Let's Talk CTA (Desktop Only) */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              soundManager.playClick();
              const target = document.querySelector("#contact");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 text-xs font-extrabold border border-yellow-300 shadow-md shadow-amber-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/40 hover:scale-[1.03]"
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
            className="lg:hidden p-1.5 sm:p-2 rounded-full text-purple-300 hover:bg-purple-500/20"
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
            className="lg:hidden mt-2 max-w-7xl mx-auto bg-[#0f072e]/95 border border-purple-400/50 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-2xl text-white"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-400/20">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="font-mono text-xs text-purple-300 font-semibold">{profileData.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleItemClick(item)}
                    className="p-2.5 rounded-xl text-left text-xs sm:text-sm font-medium text-slate-200 hover:bg-purple-500/20 hover:text-purple-300 transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    {item.isAction && <Sparkles className="w-3 h-3 text-purple-400" />}
                  </button>
                ))}
              </div>
              <div className="pt-3 border-t border-purple-400/20 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLearning) onOpenLearning();
                  }}
                  className="w-full py-2.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/50 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>Open Learning & Specializations</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenResume) onOpenResume();
                  }}
                  className="w-full py-2.5 rounded-full border border-purple-400/40 text-white hover:bg-purple-500 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <span>View Resume Document</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-purple-300" />
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const target = document.querySelector("#contact");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 text-xs font-extrabold text-center shadow-md border border-yellow-300"
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
