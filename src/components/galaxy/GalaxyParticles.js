import * as THREE from "three";
import { galaxyConfig } from "./galaxyConfig";
import { galaxyParticlesShader } from "./galaxyShaders";

/**
 * Creates the main 3D Procedural Spiral Galaxy particle system.
 * Distributes thousands of particles across logarithmic spiral arms with rich color variations.
 *
 * @param {number} count - Total particle count to generate
 * @returns {{ points: THREE.Points, material: THREE.ShaderMaterial, geometry: THREE.BufferGeometry }}
 */
export function createGalaxyParticles(count = galaxyConfig.particleCountDesktop) {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const brightness = new Float32Array(count);
  const speeds = new Float32Array(count);
  const randomAngles = new Float32Array(count);
  const distances = new Float32Array(count);
  const randomnessArr = new Float32Array(count * 3);

  // Parse color palettes into THREE.Color instances
  const whiteColors = galaxyConfig.colors.whiteColors.map((c) => new THREE.Color(c));
  const blueColors = galaxyConfig.colors.blueColors.map((c) => new THREE.Color(c));
  const goldColors = galaxyConfig.colors.goldColors.map((c) => new THREE.Color(c));
  const cyanColors = galaxyConfig.colors.cyanColors.map((c) => new THREE.Color(c));

  const {
    arms,
    radius: maxRadius,
    spiralFactor,
    randomness: baseRandomness,
    power,
    thickness,
    outerThicknessMultiplier
  } = galaxyConfig;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // 1. Exponential radius distribution: densely packed near core, tapering outwards
    const rawRatio = Math.random();
    const radius = Math.pow(rawRatio, power) * maxRadius + 0.15;
    distances[i] = radius;

    // 2. Select spiral arm angle with natural branch variations
    // Major arms + 15% stray/sub-arm particles
    let branchAngle;
    if (Math.random() < 0.85) {
      const armIndex = i % arms;
      branchAngle = (armIndex / arms) * Math.PI * 2;
    } else {
      // Sub-arm and inter-arm stray stars for natural galactic irregularity
      branchAngle = Math.random() * Math.PI * 2;
    }

    // 3. Logarithmic galactic pitch angle curvature
    const spinAngle = radius * spiralFactor;
    const finalAngle = branchAngle + spinAngle;

    // 4. Controlled 3D noise/randomness that scales with radius
    const randomRadiusFactor = Math.pow(Math.random(), 2.0) * (Math.random() < 0.5 ? 1 : -1) * baseRandomness * (radius * 0.45 + 0.2);
    const randomAngleOffset = (Math.random() - 0.5) * 0.4;
    const randX = Math.cos(finalAngle + Math.PI / 2) * randomRadiusFactor;
    const randZ = Math.sin(finalAngle + Math.PI / 2) * randomRadiusFactor;

    // Vertical thickness disk (thicker at core bulge and outer flares)
    const normalizedR = radius / maxRadius;
    const localThickness = thickness * (1.0 - normalizedR * 0.5 + Math.pow(normalizedR, 2.0) * outerThicknessMultiplier);
    const randY = Math.pow(Math.random(), 2.2) * (Math.random() < 0.5 ? 1 : -1) * localThickness;

    randomnessArr[i3] = randX;
    randomnessArr[i3 + 1] = randY;
    randomnessArr[i3 + 2] = randZ;

    // Base position
    positions[i3] = Math.cos(finalAngle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(finalAngle) * radius;

    // 5. Color distribution (70% white/cool, 20% soft blue, 8% warm gold, 2% cyan)
    const colorRoll = Math.random();
    let pickedColor;

    if (colorRoll < galaxyConfig.colors.whiteRatio) {
      // 70% White / Cool White
      pickedColor = whiteColors[Math.floor(Math.random() * whiteColors.length)];
    } else if (colorRoll < galaxyConfig.colors.whiteRatio + galaxyConfig.colors.blueRatio) {
      // 20% Soft Blue
      pickedColor = blueColors[Math.floor(Math.random() * blueColors.length)];
    } else if (colorRoll < galaxyConfig.colors.whiteRatio + galaxyConfig.colors.blueRatio + galaxyConfig.colors.goldRatio) {
      // 8% Warm Gold / Orange
      pickedColor = goldColors[Math.floor(Math.random() * goldColors.length)];
    } else {
      // 2% Subtle Cyan
      pickedColor = cyanColors[Math.floor(Math.random() * cyanColors.length)];
    }

    // Near the white-hot core, bias towards bright white & gold corona
    if (radius < 1.2) {
      if (Math.random() < 0.75) {
        pickedColor = new THREE.Color("#FFFFFF");
      } else {
        pickedColor = new THREE.Color("#FDE047");
      }
    }

    colors[i3] = pickedColor.r;
    colors[i3 + 1] = pickedColor.g;
    colors[i3 + 2] = pickedColor.b;

    // 6. Particle size & brightness variations (dim stars, medium, bright, rare giants)
    const sizeRoll = Math.random();
    let starScale;
    let starBrightness;

    if (sizeRoll < 0.65) {
      // 65% Small / Dim background stars
      starScale = 0.6 + Math.random() * 0.8;
      starBrightness = 0.45 + Math.random() * 0.35;
    } else if (sizeRoll < 0.92) {
      // 27% Medium luminous stars
      starScale = 1.3 + Math.random() * 1.2;
      starBrightness = 0.8 + Math.random() * 0.2;
    } else if (sizeRoll < 0.985) {
      // 6.5% Bright prominent stars
      starScale = 2.4 + Math.random() * 1.8;
      starBrightness = 1.0;
    } else {
      // 1.5% Occasional large glowing cosmic giants / supernovas
      starScale = 4.5 + Math.random() * 3.0;
      starBrightness = 1.2;
    }

    scales[i] = starScale;
    brightness[i] = starBrightness;

    // 7. Individual orbital velocities & oscillation phase
    speeds[i] = 0.92 + Math.random() * 0.16;
    randomAngles[i] = Math.random() * Math.PI * 2;
  }

  // Set geometry buffer attributes
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("aBrightness", new THREE.BufferAttribute(brightness, 1));
  geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute("aRandomAngle", new THREE.BufferAttribute(randomAngles, 1));
  geometry.setAttribute("aDistance", new THREE.BufferAttribute(distances, 1));
  geometry.setAttribute("aRandomness", new THREE.BufferAttribute(randomnessArr, 3));

  // Custom Shader Material
  const material = new THREE.ShaderMaterial({
    vertexShader: galaxyParticlesShader.vertexShader,
    fragmentShader: galaxyParticlesShader.fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 38.0 },
      uRotationSpeed: { value: galaxyConfig.rotationSpeed },
      uDifferentialSpeed: { value: galaxyConfig.differentialSpeed }
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;

  return { points, material, geometry };
}
