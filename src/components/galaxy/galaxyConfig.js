/**
 * galaxyConfig.js
 * Central Configuration for the True 3D Milky Way Spiral Galaxy.
 * Designed according to astronomical grand-design logarithmic spiral specifications.
 */

export const galaxyConfig = {
  // Star Counts (Adaptive Desktop & Mobile)
  particleCountDesktop: 75000,
  particleCountMobile: 26000,

  // Spiral Arm Geometry
  arms: 4, // 4 continuous major flowing spiral arms
  radius: 13.5, // Overall galaxy radius
  coreRadius: 1.6, // Central galactic bulge (~12% of diameter)
  spiralTightness: 1.85, // Logarithmic pitch curve
  armWidthFactor: 0.72, // Arm width control for clean dark inter-arm gaps
  armCurvature: 1.25, // Sweeping natural curvature

  // 3D Disk Thickness
  thickness: 0.75, // Core bulge thickness
  outerThickness: 0.15, // Thinner outer edge (flattened cosmic disk)
  
  // Rotation & Physics
  rotationSpeed: 0.00065, // Smooth cinematic slow rotation
  twoCycleRotationPeriod: 4 * Math.PI, // 720 degrees (two full revolutions)
  
  // Color Temperature & Palette (Astrophysical Milky Way Spectrum)
  colors: {
    whiteRatio: 0.68, // 68% White / Cool White
    blueRatio: 0.22,  // 22% Soft Blue & Electric Blue
    goldRatio: 0.08,  // 8% Warm Gold & Soft Orange
    cyanRatio: 0.02,  // 2% Vibrant Cyan / H-II Star Forming Regions

    whitePalette: [
      "#FFFFFF",
      "#F8FAFC",
      "#F1F5F9",
      "#E2E8F0"
    ],
    bluePalette: [
      "#93C5FD",
      "#60A5FA",
      "#3B82F6",
      "#2563EB",
      "#1D4ED8"
    ],
    goldPalette: [
      "#FDE047",
      "#FBBF24",
      "#F59E0B",
      "#D97706",
      "#FED7AA"
    ],
    cyanPalette: [
      "#67E8F9",
      "#38BDF8",
      "#06B6D4"
    ]
  },

  // Central Galactic Bulge
  core: {
    particleCountDesktop: 7500,
    particleCountMobile: 2800,
    radius: 1.6,
    bulgeHeight: 1.1,
    innerColor: "#FFFFFF",
    midColor: "#FDE047",
    outerColor: "#60A5FA",
    glowIntensity: 0.75
  },

  // Cosmic Dust & Nebula Clouds
  dust: {
    particleCountDesktop: 6500,
    particleCountMobile: 2200,
    size: 24.0,
    opacity: 0.15,
    darkLaneColor: "#02040A",
    nebulaBlue: "#1E40AF",
    nebulaAmber: "#B45309"
  },

  // Deep Space Background Stars
  backgroundStars: {
    countDesktop: 8000,
    countMobile: 3000,
    radius: 200,
    fieldRadius: 200,
    twinkleSpeed: 1.0
  },

  // Camera Settings (30-40 degrees above galactic plane)
  camera: {
    fov: 42,
    near: 0.1,
    far: 600,
    initialPosition: [0, 8.2, 16.2], // Angled perspective
    pitchAngleDeg: 55, // Incline galactic plane ~55° to camera for true 35° view
    lookAt: [0, 0, 0]
  },

  // Mouse Parallax & Interaction
  mouse: {
    maxTiltX: 0.20,
    maxTiltY: 0.15,
    damping: 0.05
  },

  // Interactive Mouse Drag & Physics
  interaction: {
    dragSensitivity: 0.004,
    damping: 0.05,
    autoResumeDelay: 2200,
    minPitchDeg: 20,
    maxPitchDeg: 75
  },

  // Postprocessing Bloom (Cinematic, stars remain distinct)
  bloom: {
    strength: 0.65,
    radius: 0.55,
    threshold: 0.40
  },

  // Deep Space Black Background
  background: {
    color: "#02040A"
  }
};
