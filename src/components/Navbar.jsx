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
            ? "bg-[#F7F7F3]/90 backdrop-blur-xl border border-[#123C2F]/15 shadow-lg shadow-[#123C2F]/5"
            : "bg-white/60 backdrop-blur-md border border-black/5"
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
          <div className="w-8 h-8 rounded-full bg-[#123C2F] text-[#F7F7F3] flex items-center justify-center font-serif italic text-base font-bold shadow-sm transition-transform duration-300 group-hover:scale-110">
            D
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#111111] group-hover:text-[#123C2F] transition-colors">
              Daksh Soni
            </span>
            <span className="hidden sm:inline-block font-mono text-[9px] tracking-widest text-[#666666] uppercase">
              Engineer • Builder
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
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                item.isAction
                  ? "text-[#123C2F] bg-emerald-500/10 hover:bg-[#123C2F] hover:text-[#F7F7F3] font-semibold border border-[#123C2F]/10"
                  : "text-[#666666] hover:text-[#111111] hover:bg-[#123C2F]/5"
              }`}
              data-cursor="pointer"
            >
              {item.isAction && <BookOpen className="w-3 h-3" />}
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
            className="p-2 rounded-full border border-[#123C2F]/15 text-[#123C2F] hover:bg-[#123C2F]/10 transition-colors"
            data-cursor="pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-[#666666]" />}
          </button>

          {/* Resume CTA */}
          <button
            onClick={() => {
              soundManager.playClick();
              if (onOpenResume) onOpenResume();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#123C2F]/20 text-[#123C2F] hover:bg-[#123C2F] hover:text-[#F7F7F3] transition-all duration-200"
            data-cursor="pointer"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
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
            className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#123C2F] text-[#F7F7F3] text-xs font-semibold hover:bg-[#1A5442] shadow-sm transition-all duration-200 hover:shadow-md hover:shadow-[#123C2F]/15"
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
            className="lg:hidden p-2 rounded-full text-[#111111] hover:bg-black/5"
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
            className="lg:hidden mt-2 max-w-7xl mx-auto bg-[#F7F7F3] border border-[#123C2F]/15 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 pb-3 border-b border-[#123C2F]/10">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-mono text-xs text-[#123C2F] font-semibold">{profileData.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleItemClick(item)}
                    className="p-2.5 rounded-xl text-left text-sm font-medium text-[#111111] hover:bg-[#123C2F]/10 hover:text-[#123C2F] transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    {item.isAction && <Sparkles className="w-3 h-3 text-[#D4AF37]" />}
                  </button>
                ))}
              </div>
              <div className="pt-3 border-t border-[#123C2F]/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLearning) onOpenLearning();
                  }}
                  className="w-full py-2.5 rounded-full bg-emerald-50 text-[#123C2F] border border-emerald-200 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Learning & Specializations</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenResume) onOpenResume();
                  }}
                  className="w-full py-2.5 rounded-full border border-[#123C2F]/20 text-[#123C2F] text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>View Complete Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const target = document.querySelector("#contact");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-2.5 rounded-full bg-[#123C2F] text-[#F7F7F3] text-xs font-semibold text-center shadow-md"
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

