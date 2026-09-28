import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles, BookOpen, Gift } from "lucide-react";
import { soundManager } from "../utils/sound";
import { profileData } from "../data/profile";
import { CelestialThemeToggle } from "./CelestialThemeToggle";

export function Navbar({
  activeSection,
  onNavigate,
  onOpenResume,
  onOpenLearning,
  onOpenGift,
  // Celestial Theme Props
  themeMode,
  setThemeMode,
  toggleTheme,
  effectiveTheme,
  indiaTime,
  formattedIstTime,
  shortIstTime,
  activeBody,
  phaseLabel,
  phaseEmoji,
  elevationDeg,
  x,
  y,
}) {
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
    { label: "Projects", href: "#projects" },
    { label: "Certificates", href: "#certificates" },
    { label: "Gift for Coders", href: "/gift-for-coders.html", isLink: true, hasGiftIcon: true },
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

    if (item.isLink && item.href) {
      window.location.href = item.href;
      return;
    }

    if (item.href) {
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isLight = effectiveTheme === "light";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 md:px-8 py-2.5 sm:py-4">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-400 px-3 sm:px-5 py-2 flex items-center justify-between gap-2 sm:gap-4 ${
          isLight
            ? isScrolled
              ? "bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/8"
              : "bg-white/85 backdrop-blur-md border border-slate-200/70 shadow-lg shadow-slate-900/5"
            : isScrolled
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
          className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
          data-cursor="pointer"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-800 via-indigo-900 to-slate-950 text-amber-400 border-2 border-purple-400/80 flex items-center justify-center font-sans text-xs font-black shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.6)]">
            DS
          </div>
          <div className="flex flex-col">
            <span
              className={`font-heading text-sm sm:text-base font-extrabold tracking-tight transition-colors leading-tight ${
                isLight ? "text-slate-900 group-hover:text-purple-700" : "text-white group-hover:text-purple-300"
              }`}
            >
              Daksh Soni
            </span>
            <span
              className={`hidden sm:inline-block font-mono text-[9px] tracking-wider uppercase font-semibold leading-tight ${
                isLight ? "text-slate-500" : "text-purple-300/90"
              }`}
            >
              Engineer • AI & Full Stack
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                item.hasGiftIcon
                  ? isLight
                    ? "text-amber-800 bg-amber-100/90 hover:bg-amber-200 border border-amber-300/60 font-semibold shadow-xs"
                    : "text-amber-300 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 font-semibold shadow-xs"
                  : item.isAction
                  ? isLight
                    ? "text-purple-800 bg-purple-100/90 hover:bg-purple-200 font-bold border border-purple-300/60 shadow-xs"
                    : "text-purple-200 bg-purple-500/20 hover:bg-purple-500 hover:text-white font-bold border border-purple-400/50 shadow-xs"
                  : isLight
                  ? "text-slate-700 hover:text-purple-700 hover:bg-slate-100"
                  : "text-slate-200 hover:text-purple-300 hover:bg-purple-500/10"
              }`}
              data-cursor="pointer"
            >
              {item.hasGiftIcon && <span className="text-xs">🎁</span>}
              {item.isAction && <BookOpen className="w-3.5 h-3.5 opacity-80" />}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* India IST Sun & Moon Celestial Theme Controller */}
          <CelestialThemeToggle
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            toggleTheme={toggleTheme}
            effectiveTheme={effectiveTheme}
            indiaTime={indiaTime}
            formattedIstTime={formattedIstTime}
            shortIstTime={shortIstTime}
            activeBody={activeBody}
            phaseLabel={phaseLabel}
            phaseEmoji={phaseEmoji}
            elevationDeg={elevationDeg}
            x={x}
            y={y}
          />

          {/* Audio Feedback Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => soundManager.playHover()}
            title={soundEnabled ? "Mute audio" : "Enable sound"}
            className={`p-1.5 sm:p-2 rounded-full border transition-colors shrink-0 ${
              isLight
                ? "border-slate-300/80 text-slate-600 hover:text-purple-700 hover:border-purple-400 hover:bg-purple-50"
                : "border-purple-400/30 text-purple-300 hover:text-white hover:border-purple-400 hover:bg-purple-400/20"
            }`}
            data-cursor="pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Resume CTA (Visible on Mobile & Desktop) */}
          <button
            onClick={() => {
              soundManager.playClick();
              if (onOpenResume) onOpenResume();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold border transition-all duration-200 whitespace-nowrap shrink-0 ${
              isLight
                ? "border-purple-300/80 text-purple-800 bg-purple-50 hover:bg-purple-600 hover:text-white hover:border-purple-600"
                : "border-purple-400/40 text-purple-200 bg-purple-500/15 hover:bg-purple-500 hover:text-white"
            }`}
            data-cursor="pointer"
            title="Open Resume Document"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
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
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 text-xs font-extrabold border border-yellow-300 shadow-md shadow-amber-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/40 hover:scale-[1.03] whitespace-nowrap shrink-0"
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
            className={`lg:hidden p-1.5 sm:p-2 rounded-full transition-colors shrink-0 ${
              isLight
                ? "text-slate-700 hover:bg-slate-100"
                : "text-purple-300 hover:bg-purple-500/20"
            }`}
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
            className={`lg:hidden mt-2 max-w-7xl mx-auto rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-2xl border ${
              isLight
                ? "bg-white/98 border-slate-200 text-slate-900 shadow-slate-900/15"
                : "bg-[#0f072e]/98 border-purple-400/50 text-white shadow-black/80"
            }`}
          >
            <div className="flex flex-col gap-3">
              {/* IST Time in Mobile Drawer */}
              <div className={`flex items-center justify-between pb-3 border-b ${
                isLight ? "border-slate-200" : "border-purple-400/20"
              }`}>
                <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-300 font-bold">
                  <span>🇮🇳</span>
                  <span>IST {formattedIstTime}</span>
                  <span className="text-sm">{phaseEmoji}</span>
                </div>
                <span className="font-mono text-[11px] text-purple-600 dark:text-purple-300 font-semibold">{profileData.status}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 py-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleItemClick(item)}
                    className={`p-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                      isLight
                        ? "text-slate-800 hover:bg-purple-50 hover:text-purple-700"
                        : "text-slate-200 hover:bg-purple-500/20 hover:text-purple-300"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.isAction && <Sparkles className="w-3 h-3 text-purple-400" />}
                  </button>
                ))}
              </div>

              <div className={`pt-3 border-t flex flex-col gap-2 ${
                isLight ? "border-slate-200" : "border-purple-400/20"
              }`}>
                <a
                  href="/gift-for-coders.html"
                  onClick={() => {
                    soundManager.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 border border-yellow-300"
                >
                  <span>🎁 Open Gift for Coders Page (5 Notes)</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLearning) onOpenLearning();
                  }}
                  className={`w-full py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 border ${
                    isLight
                      ? "bg-purple-50 text-purple-800 border-purple-300"
                      : "bg-purple-500/20 text-purple-300 border-purple-400/50"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>Open Learning & Specializations</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenResume) onOpenResume();
                  }}
                  className={`w-full py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 border ${
                    isLight
                      ? "border-slate-300 text-slate-800 hover:bg-slate-100"
                      : "border-purple-400/40 text-white hover:bg-purple-500 hover:text-white"
                  }`}
                >
                  <span>View Resume Document</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const target = document.querySelector("#contact");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-2.5 rounded-full text-xs font-extrabold text-center shadow-md border ${
                    isLight
                      ? "bg-slate-900 text-white hover:bg-purple-950 border-slate-900"
                      : "bg-[#160b45] hover:bg-[#1e0f5c] text-purple-200 border-purple-400/40"
                  }`}
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
