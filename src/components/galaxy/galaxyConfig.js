/**
 * galaxyConfig.js
 * Central configuration for the 3D Procedural Spiral Galaxy.
 * Easily tweakable parameters for arms, particle counts, colors, speeds, bloom, and camera.
 */

export const galaxyConfig = {
  // Particle counts
  particleCountDesktop: 75000,
  particleCountMobile: 26000,

  // Spiral geometry
  arms: 5,
  radius: 8.6,
  spiralFactor: 2.85,
  randomness: 0.35,
  power: 3.2, // exponential clustering toward the core
  thickness: 0.60,
  outerThicknessMultiplier: 1.45, // vertical flaring near outer arms

  // Rotation & Physics
  rotationSpeed: 0.0012, // Slow cinematic base speed
  twoCycleRotationPeriod: 4 * Math.PI, // 720 degrees in radians
  differentialSpeed: 0.82, // inner particles orbit faster than outer particles
  particleDriftSpeed: 0.25,

  // Color distribution ratios: 70% white, 20% soft blue, 8% warm gold, 2% cyan
  colors: {
    whiteRatio: 0.70,
    blueRatio: 0.20,
    goldRatio: 0.08,
    cyanRatio: 0.02,

    whiteColors: [
      "#FFFFFF",
      "#F8FAFC",
      "#F0F4FF",
      "#E2E8F0"
    ],
    blueColors: [
      "#3B82F6",
      "#60A5FA",
      "#93C5FD",
      "#1D4ED8",
      "#2563EB"
    ],
    goldColors: [
      "#F59E0B",
      "#FBBF24",
      "#FDE047",
      "#D97706",
      "#FEF08A"
    ],
    cyanColors: [
      "#06B6D4",
      "#38BDF8",
      "#67E8F9"
    ]
  },

  // Dense glowing core
  core: {
    particleCount: 8500,
    radius: 1.6,
    glowSize: 3.4,
    innerColor: "#FFFFFF",
    haloColor: "#3B82F6",
    coronaColor: "#F59E0B",
    intensity: 2.0
  },

  // Cosmic Dust clouds
  dust: {
    particleCountDesktop: 3800,
    particleCountMobile: 1400,
    size: 20.0,
    opacity: 0.15,
    color: "#1E40AF",
    secondaryColor: "#D97706"
  },

  // Background deep space stars
  backgroundStars: {
    countDesktop: 12000,
    countMobile: 4500,
    fieldRadius: 150,
    minSize: 0.8,
    maxSize: 2.5,
    twinkleSpeed: 1.6
  },

  // Orbiting planets
  planets: [
    {
      name: "Astra-I (Golden Terrestrial)",
      radius: 5.2,
      size: 0.15,
      speed: 0.0032,
      inclination: 0.08,
      color: "#FBBF24",
      glowColor: "#F59E0B",
      hasRing: true
    },
    {
      name: "Neptis-Prime (Deep Azure)",
      radius: 7.6,
      size: 0.18,
      speed: 0.0021,
      inclination: -0.12,
      color: "#3B82F6",
      glowColor: "#60A5FA",
      hasRing: true
    },
    {
      name: "Chronos-IV (Outer Gilded Sphere)",
      radius: 9.8,
      size: 0.13,
      speed: 0.0014,
      inclination: 0.14,
      color: "#FDE047",
      glowColor: "#D97706",
      hasRing: false
    }
  ],

  // Camera settings (35-45 degree inclination perspective)
  camera: {
    fov: 46,
    near: 0.1,
    far: 500,
    initialPosition: [0, 5.4, 9.8],
    lookAt: [0, 0, 0],
    pitchAngleDeg: 40
  },

  // Mouse interaction & parallax
  mouse: {
    influence: 0.08,
    damping: 0.05,
    maxTiltX: 0.35,
    maxTiltY: 0.25
  },

  // Postprocessing Bloom
  bloom: {
    enabled: true,
    strength: 1.2,
    radius: 0.75,
    threshold: 0.2
  },

  // Background color - matches portfolio Royal Dark Blue seamlessly
  background: {
    color: "#070E20",
    hazeColor: "#0D1B3E"
  }
};
