import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Check } from "lucide-react";
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
  winterSnowEnabled = true,
  toggleWinterSnow,
  isSnowActive = true,
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
      {/* Sleek, Modern Micro-Island Celestial Switch */}
      <div
        className={`flex items-center rounded-full transition-all duration-300 border ${
          isLight
            ? "bg-slate-100/90 border-slate-200 text-slate-800 shadow-xs"
            : "bg-[#14083a]/80 border-purple-400/30 text-purple-200 shadow-xs"
        }`}
      >
        {/* IST Clock Pill */}
        <button
          onClick={() => {
            soundManager.playClick();
            setDropdownOpen(!dropdownOpen);
          }}
          onMouseEnter={() => soundManager.playHover()}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-bold transition-colors whitespace-nowrap ${
            isLight
              ? "text-slate-700 hover:text-purple-700"
              : "text-purple-200 hover:text-white"
          }`}
          title={`India Time: ${formattedIstTime} (${phaseLabel})`}
          data-cursor="pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] text-amber-500 font-extrabold">IST</span>
          <span className="font-mono text-[11px]">{shortIstTime}</span>
        </button>

        {/* Tactile Sun / Moon Circular Toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            toggleTheme();
          }}
          onMouseEnter={() => soundManager.playHover()}
          className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 m-0.5 shrink-0 ${
            isLight
              ? "bg-amber-400 text-slate-950 shadow-xs hover:bg-amber-300 hover:scale-105"
              : "bg-purple-600 text-white shadow-xs hover:bg-purple-500 hover:scale-105"
          }`}
          title={`Active: ${themeMode.toUpperCase()} (${isLight ? "Day Mode" : "Night Mode"}). Click to switch.`}
          data-cursor="pointer"
          aria-label="Toggle Day / Night Mode"
        >
          <motion.div
            key={effectiveTheme}
            initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {isLight ? (
              <Sun className="w-3.5 h-3.5 fill-slate-950 stroke-[2.5]" />
            ) : (
              <Moon className="w-3.5 h-3.5 fill-white stroke-[2.5]" />
            )}
          </motion.div>

          {/* Winter Snow Indicator */}
          {!isLight && isSnowActive && (
            <span
              className="absolute -top-1 -right-1 text-[9px] leading-none select-none pointer-events-none drop-shadow-sm"
              title="Winter Snowfall Active"
            >
              ❄️
            </span>
          )}
        </button>
      </div>

      {/* Mode Select Dropdown */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-full right-0 mt-2 w-64 rounded-2xl p-3 shadow-2xl z-50 border backdrop-blur-2xl ${
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

            {/* Current Phase */}
            <div className={`px-2.5 py-1.5 mb-2 rounded-xl text-[11px] space-y-1 border ${
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
            </div>

            {/* Mode Selectors */}
            <div className="space-y-1">
              <button
                onClick={() => handleSelectMode("auto")}
                className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  themeMode === "auto"
                    ? isLight
                      ? "bg-purple-100 text-purple-900 font-bold"
                      : "bg-purple-600/30 text-amber-300 font-bold"
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

              <button
                onClick={() => handleSelectMode("light")}
                className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  themeMode === "light"
                    ? isLight
                      ? "bg-amber-100 text-amber-900 font-bold"
                      : "bg-amber-500/20 text-amber-300 font-bold"
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
                      Radiant daylight solar theme
                    </span>
                  </div>
                </div>
                {themeMode === "light" && <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
              </button>

              <button
                onClick={() => handleSelectMode("dark")}
                className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  themeMode === "dark"
                    ? isLight
                      ? "bg-purple-100 text-purple-900 font-bold"
                      : "bg-purple-600/30 text-purple-300 font-bold"
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
                      Cosmic void & starfield
                    </span>
                  </div>
                </div>
                {themeMode === "dark" && <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
              </button>
            </div>

            {/* Winter Season Snowfall Control */}
            <div
              className={`mt-2.5 pt-2.5 border-t flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs ${
                isLight
                  ? "border-slate-200/80 bg-slate-50 text-slate-700"
                  : "border-purple-400/20 bg-purple-950/40 text-purple-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base select-none">❄️</span>
                <div className="flex flex-col">
                  <span className="font-bold leading-tight flex items-center gap-1.5">
                    Winter Snowfall
                    {!isLight && isSnowActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </span>
                  <span className="text-[9px] opacity-75 font-mono">
                    {!isLight
                      ? winterSnowEnabled
                        ? "Active in Night Mode"
                        : "Turned Off"
                      : "Active in Night Mode"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playClick();
                  if (toggleWinterSnow) toggleWinterSnow();
                }}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  winterSnowEnabled ? "bg-cyan-500" : "bg-slate-400/40"
                }`}
                title="Toggle Winter Snowfall"
                data-cursor="pointer"
                aria-label="Toggle Winter Snowfall"
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                    winterSnowEnabled ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
