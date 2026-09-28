import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Check, ChevronDown } from "lucide-react";
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
    <div className="relative inline-flex items-center shrink-0" ref={dropdownRef}>
      {/* Sleek, Single-Line Celestial Control Capsule */}
      <div
        className={`flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded-full border transition-all duration-300 shadow-sm ${
          isLight
            ? "bg-slate-100/95 border-slate-200/90 text-slate-800 shadow-slate-200/50"
            : "bg-[#14083a]/90 border-purple-400/30 text-purple-200 shadow-black/50"
        }`}
      >
        {/* Live IST Clock Badge */}
        <button
          onClick={() => {
            soundManager.playClick();
            setDropdownOpen(!dropdownOpen);
          }}
          onMouseEnter={() => soundManager.playHover()}
          className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-full text-[11px] font-mono font-bold transition-colors whitespace-nowrap ${
            isLight
              ? "text-slate-700 hover:text-purple-700"
              : "text-purple-200 hover:text-white"
          }`}
          title={`India Time (IST): ${formattedIstTime} • ${phaseLabel}. Click for celestial controls.`}
          data-cursor="pointer"
        >
          {/* High-Tech India Flag Icon SVG (Always crisp on Windows/Mac/Mobile) */}
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full overflow-hidden shrink-0 border border-slate-300/40 shadow-xs">
            <svg viewBox="0 0 36 24" className="w-full h-full object-cover">
              <rect width="36" height="8" fill="#FF9933" />
              <rect y="8" width="36" height="8" fill="#FFFFFF" />
              <rect y="16" width="36" height="8" fill="#138808" />
              <circle cx="18" cy="12" r="3" fill="#000080" />
            </svg>
          </span>

          <span className="text-[10px] tracking-wider text-amber-500 dark:text-amber-300 font-extrabold uppercase">
            IST
          </span>

          <span className="font-mono text-[11px] font-bold tracking-tight">
            {shortIstTime}
          </span>

          <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
        </button>

        {/* Tactile Sun / Moon Animated Toggle Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            toggleTheme();
          }}
          onMouseEnter={() => soundManager.playHover()}
          className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 flex items-center justify-center shrink-0 ${
            isLight
              ? "bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-400 text-purple-950 shadow-md shadow-amber-400/30 border border-amber-200 hover:scale-105"
              : "bg-gradient-to-tr from-purple-800 via-indigo-900 to-slate-900 text-purple-200 shadow-md shadow-purple-900/40 border border-purple-400/40 hover:scale-105"
          }`}
          title={`Active Mode: ${themeMode.toUpperCase()} (${isLight ? "Day / Light" : "Night / Dark"}). Click to switch.`}
          data-cursor="pointer"
          aria-label="Toggle Day / Night Theme"
        >
          <motion.div
            key={effectiveTheme}
            initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {isLight ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-950 fill-amber-300 animate-[spin_16s_linear_infinite]" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300 fill-purple-400/30" />
            )}
          </motion.div>

          {/* Auto Mode Indicator Dot */}
          {themeMode === "auto" && (
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 border border-purple-950 animate-pulse"
              title="Auto-synced to India Time"
            />
          )}
        </button>
      </div>

      {/* Floating Mode Dropdown Menu */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-full right-0 mt-2 w-64 sm:w-72 rounded-2xl p-3 shadow-2xl z-50 border backdrop-blur-2xl ${
              isLight
                ? "bg-white/98 border-slate-200 text-slate-800 shadow-slate-900/15"
                : "bg-[#0f072e]/98 border-purple-400/40 text-white shadow-black/80"
            }`}
          >
            {/* Header: Live India Celestial Status */}
            <div className={`flex items-center justify-between pb-2 mb-2 border-b text-xs ${
              isLight ? "border-slate-100" : "border-purple-400/20"
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-300">
                <span>🇮🇳</span>
                <span>India Time (IST)</span>
              </div>
              <span className="font-mono font-bold">{formattedIstTime}</span>
            </div>

            {/* Celestial Arc Position Status Box */}
            <div className={`px-2.5 py-2 mb-2 rounded-xl text-[11px] space-y-1 border ${
              isLight
                ? "bg-slate-50 border-slate-200/80 text-slate-600"
                : "bg-purple-950/60 border-purple-400/20 text-slate-300"
            }`}>
              <div className="flex items-center justify-between">
                <span>Current Phase:</span>
                <span className="font-bold flex items-center gap-1 text-slate-900 dark:text-white">
                  <span>{phaseEmoji}</span>
                  <span>{phaseLabel}</span>
                </span>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span>Celestial Body:</span>
                <span className="text-amber-600 dark:text-amber-300 font-bold uppercase">{activeBody}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span>Sky Elevation:</span>
                <span className="text-purple-600 dark:text-purple-300">{elevationDeg}° altitude</span>
              </div>
            </div>

            {/* Mode Selectors */}
            <div className="space-y-1">
              {/* 1. Auto (Live India IST) */}
              <button
                onClick={() => handleSelectMode("auto")}
                className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  themeMode === "auto"
                    ? isLight
                      ? "bg-purple-100 text-purple-900 border border-purple-300 font-bold"
                      : "bg-purple-600/30 text-amber-300 border border-purple-400/50 font-bold"
                    : isLight
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-slate-300 hover:bg-purple-500/15 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">🇮🇳</span>
                  <div className="flex flex-col">
                    <span className="font-bold leading-tight">Auto (India IST Live)</span>
                    <span className="text-[9px] font-mono opacity-70">
                      Moves Sun & Moon with Indian Time
                    </span>
                  </div>
                </div>
                {themeMode === "auto" && <Check className="w-3.5 h-3.5 text-purple-600 dark:text-amber-400" />}
              </button>

              {/* 2. Light Mode (Day) */}
              <button
                onClick={() => handleSelectMode("light")}
                className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  themeMode === "light"
                    ? isLight
                      ? "bg-amber-100 text-amber-900 border border-amber-300 font-bold"
                      : "bg-amber-500/20 text-amber-300 border border-amber-400/50 font-bold"
                    : isLight
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-slate-300 hover:bg-purple-500/15 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <div className="flex flex-col">
                    <span className="font-bold leading-tight">Light Mode (☀️ Day)</span>
                    <span className="text-[9px] font-mono opacity-70">
                      Radiant daylight & crisp solar theme
                    </span>
                  </div>
                </div>
                {themeMode === "light" && <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
              </button>

              {/* 3. Dark Mode (Night) */}
              <button
                onClick={() => handleSelectMode("dark")}
                className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  themeMode === "dark"
                    ? isLight
                      ? "bg-purple-100 text-purple-900 border border-purple-300 font-bold"
                      : "bg-purple-600/30 text-purple-300 border border-purple-400/50 font-bold"
                    : isLight
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-slate-300 hover:bg-purple-500/15 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Moon className="w-3.5 h-3.5 text-purple-500 dark:text-purple-300" />
                  <div className="flex flex-col">
                    <span className="font-bold leading-tight">Dark Mode (🌙 Night)</span>
                    <span className="text-[9px] font-mono opacity-70">
                      Cosmic void, starfield & moon
                    </span>
                  </div>
                </div>
                {themeMode === "dark" && <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
