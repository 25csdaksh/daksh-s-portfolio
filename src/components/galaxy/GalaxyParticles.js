import * as THREE from "three";
import { galaxyConfig } from "./galaxyConfig";
import { galaxyParticlesShader } from "./galaxyShaders";

/**
 * Creates the main 3D Procedural Spiral Galaxy particle system.
 * Uses logarithmic spiral arm mathematics, Gaussian arm dispersion,
 * and cinematic color temperature variations.
 *
 * @param {number} count - Total particle count
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
  const twinkleSpeeds = new Float32Array(count);

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

    // 1. Exponential radius distribution: dense core, gracefully thinning outer perimeter
    const rawRatio = Math.random();
    // Power factor creates dense inner concentration while extending arms far out
    const radius = Math.pow(rawRatio, power) * maxRadius + 0.2;
    distances[i] = radius;

    // 2. Spiral arm allocation with secondary branches
    let branchAngle;
    const armRoll = Math.random();

    if (armRoll < 0.82) {
      // 82% particles strictly follow the major spiral arms
      const armIndex = i % arms;
      branchAngle = (armIndex / arms) * Math.PI * 2;
    } else if (armRoll < 0.94) {
      // 12% particles form intermediate sub-arms and star spurs
      const armIndex = i % arms;
      branchAngle = (armIndex / arms) * Math.PI * 2 + 0.35 * (Math.random() - 0.5);
    } else {
      // 6% diffuse inter-arm galactic disk stars
      branchAngle = Math.random() * Math.PI * 2;
    }

    // 3. Logarithmic Spiral angle calculation
    const spinAngle = radius * spiralFactor;
    const finalAngle = branchAngle + spinAngle;

    // 4. Gaussian dispersion perpendicular to the spiral arm
    // Inner region is tight; outer arms spread slightly wider
    const armTightness = (radius / maxRadius) * 0.45 + 0.18;
    const gaussianOffset = (Math.pow(Math.random(), 2.4) * (Math.random() < 0.5 ? 1 : -1)) * baseRandomness * armTightness;

    // Perpendicular unit vector in XZ plane
    const perpX = -Math.sin(finalAngle) * gaussianOffset;
    const perpZ = Math.cos(finalAngle) * gaussianOffset;

    // Vertical 3D thickness with flaring near edges
    const normalizedR = radius / maxRadius;
    const localThickness = thickness * (0.4 + 0.6 * (1.0 - normalizedR * 0.3) + Math.pow(normalizedR, 2.0) * outerThicknessMultiplier);
    const randY = Math.pow(Math.random(), 2.0) * (Math.random() < 0.5 ? 1 : -1) * localThickness;

    randomnessArr[i3] = perpX;
    randomnessArr[i3 + 1] = randY;
    randomnessArr[i3 + 2] = perpZ;

    // Base position on spiral curve
    positions[i3] = Math.cos(finalAngle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(finalAngle) * radius;

    // 5. Color distribution (70% white, 20% soft blue, 8% warm gold, 2% cyan)
    const colorRoll = Math.random();
    let pickedColor;

    if (colorRoll < galaxyConfig.colors.whiteRatio) {
      pickedColor = whiteColors[Math.floor(Math.random() * whiteColors.length)];
    } else if (colorRoll < galaxyConfig.colors.whiteRatio + galaxyConfig.colors.blueRatio) {
      pickedColor = blueColors[Math.floor(Math.random() * blueColors.length)];
    } else if (colorRoll < galaxyConfig.colors.whiteRatio + galaxyConfig.colors.blueRatio + galaxyConfig.colors.goldRatio) {
      pickedColor = goldColors[Math.floor(Math.random() * goldColors.length)];
    } else {
      pickedColor = cyanColors[Math.floor(Math.random() * cyanColors.length)];
    }

    // Core stars bias towards brilliant white & warm amber
    if (radius < 1.4) {
      if (Math.random() < 0.7) {
        pickedColor = new THREE.Color("#FFFFFF");
      } else {
        pickedColor = new THREE.Color("#FDE047");
      }
    }

    colors[i3] = pickedColor.r;
    colors[i3 + 1] = pickedColor.g;
    colors[i3 + 2] = pickedColor.b;

    // 6. Particle size & brightness variations
    const sizeRoll = Math.random();
    let starScale;
    let starBrightness;

    if (sizeRoll < 0.62) {
      // 62% Small dim stars
      starScale = 0.8 + Math.random() * 0.7;
      starBrightness = 0.5 + Math.random() * 0.35;
    } else if (sizeRoll < 0.90) {
      // 28% Medium luminous stars
      starScale = 1.6 + Math.random() * 1.3;
      starBrightness = 0.85 + Math.random() * 0.25;
    } else if (sizeRoll < 0.985) {
      // 8.5% Bright prominent stars
      starScale = 2.8 + Math.random() * 2.0;
      starBrightness = 1.1;
    } else {
      // 1.5% Giant glowing stars / stellar beacons
      starScale = 5.2 + Math.random() * 3.5;
      starBrightness = 1.35;
    }

    scales[i] = starScale;
    brightness[i] = starBrightness;

    // 7. Individual orbital velocities & twinkle
    speeds[i] = 0.94 + Math.random() * 0.12;
    randomAngles[i] = Math.random() * Math.PI * 2;
    twinkleSpeeds[i] = 1.0 + Math.random() * 2.5;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("aBrightness", new THREE.BufferAttribute(brightness, 1));
  geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute("aRandomAngle", new THREE.BufferAttribute(randomAngles, 1));
  geometry.setAttribute("aDistance", new THREE.BufferAttribute(distances, 1));
  geometry.setAttribute("aRandomness", new THREE.BufferAttribute(randomnessArr, 3));
  geometry.setAttribute("aTwinkleSpeed", new THREE.BufferAttribute(twinkleSpeeds, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: galaxyParticlesShader.vertexShader,
    fragmentShader: galaxyParticlesShader.fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 45.0 },
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
