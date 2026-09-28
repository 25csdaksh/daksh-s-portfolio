import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles, Compass, Clock, Check } from "lucide-react";
import { soundManager } from "../utils/sound";

export function CelestialThemeToggle({
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMode = (mode) => {
    soundManager.playClick();
    setThemeMode(mode);
    setDropdownOpen(false);
  };

  const isLight = effectiveTheme === "light";

  return (
    <div className="relative inline-flex items-center" ref={dropdownRef}>
      {/* Combined Indian Time & Celestial Toggle Pill */}
      <div className="flex items-center rounded-full p-0.5 sm:p-1 bg-purple-950/40 border border-purple-400/30 backdrop-blur-md shadow-md">
        {/* Live India IST Clock Badge (Hidden on extra small mobile, visible on sm+) */}
        <button
          onClick={() => {
            soundManager.playClick();
            setDropdownOpen(!dropdownOpen);
          }}
          onMouseEnter={() => soundManager.playHover()}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all text-purple-200 hover:text-white hover:bg-purple-500/20"
          title={`Indian Standard Time: ${formattedIstTime} (${phaseLabel})`}
          data-cursor="pointer"
        >
          <span className="text-xs">🇮🇳</span>
          <span className="text-[10px] tracking-wider text-amber-300 font-extrabold uppercase">IST</span>
          <span className="text-white font-mono text-[11px]">{shortIstTime}</span>
          <span className="text-xs">{phaseEmoji}</span>
        </button>

        {/* Dynamic Celestial Sun / Moon Toggle Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            toggleTheme();
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            soundManager.playClick();
            setDropdownOpen(!dropdownOpen);
          }}
          onMouseEnter={() => soundManager.playHover()}
          className={`relative p-1.5 sm:p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
            isLight
              ? "bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 text-purple-950 shadow-[0_0_15px_rgba(251,191,36,0.6)] border border-amber-200"
              : "bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/50"
          }`}
          title={`Theme: ${themeMode.toUpperCase()} (${effectiveTheme === "light" ? "Day / Light Mode" : "Night / Dark Mode"}). Click to toggle or right-click for options.`}
          data-cursor="pointer"
          aria-label="Toggle Celestial Theme"
        >
          <motion.div
            key={effectiveTheme}
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {isLight ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-[spin_12s_linear_infinite]" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" />
            )}
          </motion.div>

          {/* Auto Mode Indicator Dot */}
          {themeMode === "auto" && (
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 border border-purple-950 animate-pulse"
              title="Synced to Live India IST"
            />
          )}
        </button>
      </div>

      {/* Quick Dropdown Menu for Theme Modes & IST Celestial Info */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full right-0 mt-2 w-64 sm:w-72 bg-[#0f072e]/95 backdrop-blur-2xl border border-purple-400/40 rounded-2xl p-3 shadow-2xl z-50 text-white"
          >
            {/* Header: Live India Celestial Status */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-400/20 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <span>🇮🇳</span>
                <span>India Time (IST)</span>
              </div>
              <span className="font-mono text-purple-200 font-extrabold">{formattedIstTime}</span>
            </div>

            {/* Celestial Arc Position Status */}
            <div className="px-2 py-1.5 mb-2.5 rounded-xl bg-purple-950/60 border border-purple-400/20 text-[11px] space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span>Current Phase:</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <span>{phaseEmoji}</span>
                  <span>{phaseLabel}</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300 font-mono text-[10px]">
                <span>Celestial Body:</span>
                <span className="text-amber-300 font-bold uppercase">{activeBody}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 font-mono text-[10px]">
                <span>Sky Elevation:</span>
                <span className="text-purple-300">{elevationDeg}° altitude</span>
              </div>
            </div>

            {/* Mode Selectors */}
            <div className="space-y-1">
              {/* 1. Auto (Live India IST) */}
              <button
                onClick={() => handleSelectMode("auto")}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  themeMode === "auto"
                    ? "bg-purple-600/30 text-amber-300 border border-purple-400/50"
                    : "text-slate-300 hover:bg-purple-500/15 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🇮🇳</span>
                  <div className="flex flex-col">
                    <span className="font-bold">Auto (India IST Live)</span>
                    <span className="text-[9px] font-mono text-slate-400">
                      Moves Sun & Moon with Indian Time
                    </span>
                  </div>
                </div>
                {themeMode === "auto" && <Check className="w-4 h-4 text-amber-400" />}
              </button>

              {/* 2. Light Mode (Day) */}
              <button
                onClick={() => handleSelectMode("light")}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  themeMode === "light"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-400/50"
                    : "text-slate-300 hover:bg-purple-500/15 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <div className="flex flex-col">
                    <span className="font-bold">Light Mode (☀️ Day)</span>
                    <span className="text-[9px] font-mono text-slate-400">
                      Radiant daylight & crisp solar theme
                    </span>
                  </div>
                </div>
                {themeMode === "light" && <Check className="w-4 h-4 text-amber-400" />}
              </button>

              {/* 3. Dark Mode (Night) */}
              <button
                onClick={() => handleSelectMode("dark")}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  themeMode === "dark"
                    ? "bg-purple-600/30 text-purple-300 border border-purple-400/50"
                    : "text-slate-300 hover:bg-purple-500/15 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-purple-300" />
                  <div className="flex flex-col">
                    <span className="font-bold">Dark Mode (🌙 Night)</span>
                    <span className="text-[9px] font-mono text-slate-400">
                      Cosmic void, starfield & moon
                    </span>
                  </div>
                </div>
                {themeMode === "dark" && <Check className="w-4 h-4 text-purple-400" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
