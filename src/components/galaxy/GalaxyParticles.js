import * as THREE from "three";
import { galaxyConfig } from "./galaxyConfig";
import { galaxyParticlesShader } from "./galaxyShaders";

/**
 * Procedural Grand-Design Spiral Galaxy Star Generator.
 * Implements continuous logarithmic spiral curves with Gaussian arm dispersion,
 * creating sweeping continuous ribbons of stars with clear dark lanes between arms.
 *
 * @param {number} count - Total star particle count
 * @returns {{ points: THREE.Points, material: THREE.ShaderMaterial, geometry: THREE.BufferGeometry }}
 */
export function createGalaxyParticles(count = galaxyConfig.particleCountDesktop) {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const brightness = new Float32Array(count);
  const twinkleSpeeds = new Float32Array(count);
  const phases = new Float32Array(count);
  const streamVectors = new Float32Array(count * 3);

  const whitePalette = galaxyConfig.colors.whitePalette.map((c) => new THREE.Color(c));
  const bluePalette = galaxyConfig.colors.bluePalette.map((c) => new THREE.Color(c));
  const goldPalette = galaxyConfig.colors.goldPalette.map((c) => new THREE.Color(c));
  const cyanPalette = galaxyConfig.colors.cyanPalette.map((c) => new THREE.Color(c));

  const {
    arms,
    radius: maxRadius,
    coreRadius,
    spiralTightness,
    armWidthFactor,
    armCurvature,
    thickness,
    outerThickness
  } = galaxyConfig;

  // Box-Muller Gaussian
  function randomGaussian(mean = 0, stdev = 1) {
    let u = 1 - Math.random();
    let v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
  }

  // Pre-determined major star-forming cluster centers along the arms
  const clusterNodes = [0.18, 0.36, 0.54, 0.72, 0.88];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // 1. Determine particle archetype
    const typeRoll = Math.random();
    let armIndex;
    let t; // Progression along the arm [0.0 to 1.0]
    let baseArmAngle;
    let isSpur = false;
    let isClusterMember = false;

    if (typeRoll < 0.80) {
      // 80% Major Spiral Arm Stars
      armIndex = i % arms;
      baseArmAngle = (armIndex / arms) * Math.PI * 2;
      
      // Star density concentration: more stars in inner/mid region, tapering outward
      if (Math.random() < 0.35) {
        // Cluster along one of the star-forming nodes
        const node = clusterNodes[Math.floor(Math.random() * clusterNodes.length)];
        t = Math.max(0.02, Math.min(0.98, randomGaussian(node, 0.045)));
        isClusterMember = true;
      } else {
        t = Math.pow(Math.random(), 1.25);
      }
    } else if (typeRoll < 0.92) {
      // 12% Branching spurs (sub-arms splitting off from major arms)
      armIndex = i % arms;
      isSpur = true;
      baseArmAngle = (armIndex / arms) * Math.PI * 2 + (Math.random() > 0.5 ? 0.32 : -0.32);
      t = 0.20 + Math.random() * 0.72;
    } else {
      // 8% Diffuse inter-arm disk stars
      armIndex = Math.floor(Math.random() * arms);
      baseArmAngle = Math.random() * Math.PI * 2;
      t = Math.random();
    }

    // 2. Continuous Logarithmic spiral curve calculation
    const currentRadius = coreRadius + (maxRadius - coreRadius) * Math.pow(t, 1.08);
    const curveAngle = baseArmAngle + spiralTightness * Math.log(1.0 + 3.8 * t) + armCurvature * t;

    // Calculate tangent and perpendicular normal vector along the arm curve
    const deltaT = 0.01;
    const nextRadius = coreRadius + (maxRadius - coreRadius) * Math.pow(t + deltaT, 1.08);
    const nextAngle = baseArmAngle + spiralTightness * Math.log(1.0 + 3.8 * (t + deltaT)) + armCurvature * (t + deltaT);

    const x0 = Math.cos(curveAngle) * currentRadius;
    const z0 = Math.sin(curveAngle) * currentRadius;
    const x1 = Math.cos(nextAngle) * nextRadius;
    const z1 = Math.sin(nextAngle) * nextRadius;

    const tx = x1 - x0;
    const tz = z1 - z0;
    const tLen = Math.sqrt(tx * tx + tz * tz) || 1.0;
    const tangentX = tx / tLen;
    const tangentZ = tz / tLen;

    // Perpendicular normal vector in XZ plane
    const normalX = -tangentZ;
    const normalZ = tangentX;

    // 3. Gaussian dispersion across the arm width (tight near core, widening outward)
    const localWidth = armWidthFactor * (0.32 + 1.1 * Math.pow(t, 0.85)) * (isSpur ? 0.65 : 1.0);
    const dispersionSigma = isClusterMember ? localWidth * 0.22 : localWidth * 0.42;
    const perpOffset = randomGaussian(0, dispersionSigma);
    const tangOffset = randomGaussian(0, dispersionSigma * 0.5);

    // 4. Vertical disk thickness (thicker near galactic bulge, razor-thin near outer rim)
    const localHeight = thickness * (1.0 - t * 0.68) + outerThickness * t;
    const posY = randomGaussian(0, localHeight * 0.32);

    // 5. Final 3D Position
    const posX = x0 + normalX * perpOffset + tangentX * tangOffset;
    const posZ = z0 + normalZ * perpOffset + tangentZ * tangOffset;

    positions[i3] = posX;
    positions[i3 + 1] = posY;
    positions[i3 + 2] = posZ;

    // Streamline velocity vector for subtle alive particle drift
    streamVectors[i3] = tangentX;
    streamVectors[i3 + 1] = 0;
    streamVectors[i3 + 2] = tangentZ;

    // 6. Color Temperature Distribution (Astrophysical Milky Way Palette)
    const colorRoll = Math.random();
    let starColor;

    if (isClusterMember && Math.random() < 0.45) {
      // High fraction of hot young blue / cyan stars in cluster nodes
      starColor = Math.random() < 0.6 ? bluePalette[0] : cyanPalette[0];
    } else if (colorRoll < galaxyConfig.colors.whiteRatio) {
      // ~68% White / Cool White
      starColor = whitePalette[Math.floor(Math.random() * whitePalette.length)];
    } else if (colorRoll < galaxyConfig.colors.whiteRatio + galaxyConfig.colors.blueRatio) {
      // 22% Celestial Blue / Electric Blue
      starColor = bluePalette[Math.floor(Math.random() * bluePalette.length)];
    } else if (colorRoll < galaxyConfig.colors.whiteRatio + galaxyConfig.colors.blueRatio + galaxyConfig.colors.goldRatio) {
      // 8% Warm Gold / Soft Orange
      starColor = goldPalette[Math.floor(Math.random() * goldPalette.length)];
    } else {
      // 2% Vibrant Cyan Star-Forming Nurseries
      starColor = cyanPalette[Math.floor(Math.random() * cyanPalette.length)];
    }

    // Near inner galactic ring, blend into warm golden starlight
    if (currentRadius < 3.0 && Math.random() < 0.45) {
      starColor = goldPalette[Math.floor(Math.random() * goldPalette.length)];
    }

    colors[i3] = starColor.r;
    colors[i3 + 1] = starColor.g;
    colors[i3 + 2] = starColor.b;

    // 7. Star Magnitude Spectrum (70% tiny, 20% medium, 8% bright, 2% hyper-luminous clusters)
    const sizeRoll = Math.random();
    let s;
    let b;

    if (isClusterMember && Math.random() < 0.3) {
      s = 2.8 + Math.random() * 2.2;
      b = 1.35;
    } else if (sizeRoll < 0.70) {
      // 70% Tiny pinpoint stars
      s = 0.55 + Math.random() * 0.55;
      b = 0.60 + Math.random() * 0.35;
    } else if (sizeRoll < 0.90) {
      // 20% Medium stars
      s = 1.15 + Math.random() * 0.75;
      b = 0.85 + Math.random() * 0.25;
    } else if (sizeRoll < 0.98) {
      // 8% Bright prominent stars
      s = 1.95 + Math.random() * 1.15;
      b = 1.10;
    } else {
      // 2% Hyper-luminous stellar nurseries
      s = 3.2 + Math.random() * 2.0;
      b = 1.40;
    }

    scales[i] = s;
    brightness[i] = b;
    twinkleSpeeds[i] = 0.8 + Math.random() * 2.2;
    phases[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("aBrightness", new THREE.BufferAttribute(brightness, 1));
  geometry.setAttribute("aTwinkleSpeed", new THREE.BufferAttribute(twinkleSpeeds, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute("aStreamVector", new THREE.BufferAttribute(streamVectors, 3));

  const material = new THREE.ShaderMaterial({
    vertexShader: galaxyParticlesShader.vertexShader,
    fragmentShader: galaxyParticlesShader.fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 24.0 }
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
