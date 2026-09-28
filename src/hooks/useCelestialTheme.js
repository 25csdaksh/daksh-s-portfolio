import { useState, useEffect, useCallback, useMemo } from "react";

/**
 * useCelestialTheme
 * 
 * Computes live Indian Standard Time (Asia/Kolkata, UTC+5:30) and determines:
 * - Real-time continuous solar & lunar celestial arc positions (x, y coordinates).
 * - Exact day/night phase (Brahma Muhurta Dawn, Morning, High Noon, Afternoon, Dusk Twilight, Night, Deep Midnight).
 * - Theme state ('auto' synced to India IST, or manual 'light' / 'dark').
 * - Synchronizes .light / .dark classes on document.documentElement.
 */

// India Timezone
const INDIA_TIMEZONE = "Asia/Kolkata";

export function getIndiaTime() {
  const now = new Date();
  const istDateString = now.toLocaleString("en-US", { timeZone: INDIA_TIMEZONE });
  const istDate = new Date(istDateString);
  
  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const seconds = istDate.getSeconds();
  const totalHours = hours + minutes / 60 + seconds / 3600;

  return {
    date: istDate,
    hours,
    minutes,
    seconds,
    totalHours,
  };
}

/**
 * Calculate celestial position & phase based on Indian Standard Time.
 * Sun arc is defined between 05:30 AM (rise) and 18:30 PM (set) - 13 hours.
 * Moon arc is defined between 18:30 PM (rise) and 05:30 AM (set) - 11 hours.
 */
export function calculateCelestialState(totalHours) {
  // Sunrise at ~05:30 (5.5h), Sunset at ~18:30 (18.5h)
  const SUNRISE = 5.5;
  const SUNSET = 18.5;
  
  const isDaytime = totalHours >= SUNRISE && totalHours < SUNSET;

  let activeBody = isDaytime ? "sun" : "moon";
  let progress = 0; // 0 (rising) -> 0.5 (peak zenith) -> 1.0 (setting)
  let phase = "night";
  let phaseLabel = "Night Sky";
  let phaseEmoji = "🌙";
  let skyTheme = "dark";

  if (totalHours >= 5.0 && totalHours < 6.5) {
    phase = "dawn";
    phaseLabel = "Brahma Muhurta / Sunrise";
    phaseEmoji = "🌅";
    skyTheme = totalHours >= 6.0 ? "light" : "dark";
  } else if (totalHours >= 6.5 && totalHours < 11.5) {
    phase = "morning";
    phaseLabel = "Morning Radiant Sun";
    phaseEmoji = "☀️";
    skyTheme = "light";
  } else if (totalHours >= 11.5 && totalHours < 14.5) {
    phase = "midday";
    phaseLabel = "Midday High Noon";
    phaseEmoji = "☀️";
    skyTheme = "light";
  } else if (totalHours >= 14.5 && totalHours < 17.5) {
    phase = "afternoon";
    phaseLabel = "Golden Afternoon";
    phaseEmoji = "🌤️";
    skyTheme = "light";
  } else if (totalHours >= 17.5 && totalHours < 19.0) {
    phase = "sunset";
    phaseLabel = "Godhuli Bela / Twilight";
    phaseEmoji = "🌇";
    skyTheme = totalHours < 18.2 ? "light" : "dark";
  } else if (totalHours >= 19.0 && totalHours < 23.5) {
    phase = "night";
    phaseLabel = "Starlit Night";
    phaseEmoji = "🌙";
    skyTheme = "dark";
  } else {
    phase = "deep_night";
    phaseLabel = "Midnight Cosmic Void";
    phaseEmoji = "🌌";
    skyTheme = "dark";
  }

  // Calculate normalized arc progress
  if (isDaytime) {
    progress = (totalHours - SUNRISE) / (SUNSET - SUNRISE); // 0 to 1
  } else {
    if (totalHours >= SUNSET) {
      progress = (totalHours - SUNSET) / (24 - SUNSET + SUNRISE);
    } else {
      progress = (totalHours + (24 - SUNSET)) / (24 - SUNSET + SUNRISE);
    }
  }

  progress = Math.max(0, Math.min(1, progress));

  // Celestial coordinates along parabolic arc
  // x: 12% (East/Left) to 88% (West/Right)
  // y: 80% (Horizon) to 18% (Zenith Peak)
  const x = 12 + progress * 76;
  const y = 80 - Math.sin(progress * Math.PI) * 62;

  // Elevation angle in degrees (0 at horizon, 90 at zenith)
  const elevationDeg = Math.round(Math.sin(progress * Math.PI) * 90);

  return {
    isDaytime,
    activeBody,
    progress,
    phase,
    phaseLabel,
    phaseEmoji,
    naturalSkyTheme: skyTheme,
    x,
    y,
    elevationDeg,
  };
}

export function useCelestialTheme() {
  // Theme mode: 'auto' (synced to India IST), 'light', or 'dark'
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const saved = localStorage.getItem("daksh_theme_mode");
      if (saved === "light" || saved === "dark" || saved === "auto") {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return "auto";
  });

  const [indiaTime, setIndiaTime] = useState(getIndiaTime);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setIndiaTime(getIndiaTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute celestial physics from IST
  const celestialState = useMemo(() => {
    return calculateCelestialState(indiaTime.totalHours);
  }, [indiaTime.totalHours]);

  // Effective visual theme: 'light' or 'dark'
  const effectiveTheme = useMemo(() => {
    if (themeMode === "light") return "light";
    if (themeMode === "dark") return "dark";
    return celestialState.naturalSkyTheme;
  }, [themeMode, celestialState.naturalSkyTheme]);

  // Apply to document DOM
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (effectiveTheme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      body.classList.add("light");
      body.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      body.classList.add("dark");
      body.classList.remove("light");
    }

    // Set CSS custom variables for celestial positions
    root.style.setProperty("--celestial-x", `${celestialState.x}%`);
    root.style.setProperty("--celestial-y", `${celestialState.y}%`);
    root.style.setProperty("--celestial-progress", celestialState.progress.toFixed(4));
    
    try {
      localStorage.setItem("daksh_theme_mode", themeMode);
    } catch (e) {
      // ignore
    }
  }, [effectiveTheme, themeMode, celestialState]);

  // Toggle helper: cycles auto -> light -> dark -> auto
  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => {
      if (prev === "auto") return "light";
      if (prev === "light") return "dark";
      return "auto";
    });
  }, []);

  // Set explicit mode
  const setMode = useCallback((mode) => {
    if (mode === "auto" || mode === "light" || mode === "dark") {
      setThemeMode(mode);
    }
  }, []);

  // Formatted IST clock strings
  const formattedIstTime = useMemo(() => {
    const h = indiaTime.hours % 12 || 12;
    const m = String(indiaTime.minutes).padStart(2, "0");
    const s = String(indiaTime.seconds).padStart(2, "0");
    const ampm = indiaTime.hours >= 12 ? "PM" : "AM";
    return `${h}:${m}:${s} ${ampm}`;
  }, [indiaTime]);

  const shortIstTime = useMemo(() => {
    const h = indiaTime.hours % 12 || 12;
    const m = String(indiaTime.minutes).padStart(2, "0");
    const ampm = indiaTime.hours >= 12 ? "PM" : "AM";
    return `${h}:${m} ${ampm}`;
  }, [indiaTime]);

  return {
    themeMode,
    setThemeMode: setMode,
    toggleTheme,
    effectiveTheme,
    isLight: effectiveTheme === "light",
    isDark: effectiveTheme === "dark",
    indiaTime,
    formattedIstTime,
    shortIstTime,
    ...celestialState,
  };
}
