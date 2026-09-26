import * as THREE from "three";
import { galaxyConfig } from "./galaxyConfig";
import { dustCloudShader } from "./galaxyShaders";

/**
 * Creates realistic cosmic dust lanes & nebula clouds along the logarithmic spiral arms.
 * Follows the inner edge of each spiral arm to create authentic astronomical dark lanes
 * and glowing star-forming regions (Milky Way / NGC 1232 style).
 *
 * @param {number} count - Dust particle count
 * @returns {{ points: THREE.Points, material: THREE.ShaderMaterial, geometry: THREE.BufferGeometry }}
 */
export function createGalaxyDust(count = galaxyConfig.dust.particleCountDesktop) {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const phases = new Float32Array(count);
  const streamVectors = new Float32Array(count * 3);

  const darkLaneColor = new THREE.Color(galaxyConfig.dust.darkLaneColor || "#030712");
  const nebulaBlue1 = new THREE.Color("#1E3A8A");
  const nebulaBlue2 = new THREE.Color("#2563EB");
  const nebulaCyan = new THREE.Color("#06B6D4");
  const nebulaAmber = new THREE.Color("#D97706");
  const nebulaRose = new THREE.Color("#9D174D");

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

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Follow the 4 major spiral arms
    const armIndex = i % arms;
    const baseArmAngle = (armIndex / arms) * Math.PI * 2;

    // Progression along arm [0.0 to 1.0]
    const t = Math.pow(Math.random(), 1.15);

    const currentRadius = coreRadius + (maxRadius - coreRadius) * Math.pow(t, 1.12);
    // Dark dust lanes typically lead the stellar arm slightly (-0.08 rad offset)
    const curveAngle = baseArmAngle + spiralTightness * Math.log(1.0 + 3.2 * t) + armCurvature * t - 0.08;

    // Tangent & normal vectors
    const deltaT = 0.01;
    const nextRadius = coreRadius + (maxRadius - coreRadius) * Math.pow(t + deltaT, 1.12);
    const nextAngle = baseArmAngle + spiralTightness * Math.log(1.0 + 3.2 * (t + deltaT)) + armCurvature * (t + deltaT) - 0.08;

    const x0 = Math.cos(curveAngle) * currentRadius;
    const z0 = Math.sin(curveAngle) * currentRadius;
    const x1 = Math.cos(nextAngle) * nextRadius;
    const z1 = Math.sin(nextAngle) * nextRadius;

    const tx = x1 - x0;
    const tz = z1 - z0;
    const tLen = Math.sqrt(tx * tx + tz * tz) || 1.0;
    const tangentX = tx / tLen;
    const tangentZ = tz / tLen;

    const normalX = -tangentZ;
    const normalZ = tangentX;

    // Dust dispersion: fluffy cloud puffs concentrated along the inner arm
    const localWidth = armWidthFactor * (0.45 + 1.25 * Math.pow(t, 0.85));
    const perpOffset = randomGaussian(-0.12 * localWidth, localWidth * 0.5);
    const tangOffset = randomGaussian(0, localWidth * 0.35);

    // Vertical thickness
    const localHeight = thickness * (1.0 - t * 0.6) + outerThickness * t;
    const posY = randomGaussian(0, localHeight * 0.4);

    const posX = x0 + normalX * perpOffset + tangentX * tangOffset;
    const posZ = z0 + normalZ * perpOffset + tangentZ * tangOffset;

    positions[i3] = posX;
    positions[i3 + 1] = posY;
    positions[i3 + 2] = posZ;

    streamVectors[i3] = tangentX;
    streamVectors[i3 + 1] = 0;
    streamVectors[i3 + 2] = tangentZ;

    // Dust Color Distribution:
    // 50% Deep blue/indigo nebula haze
    // 25% Dark absorption dust
    // 15% Warm amber/gold star-forming gas
    // 10% Cyan/H-II emission nebula
    const dustRoll = Math.random();
    let dustColor;

    if (dustRoll < 0.50) {
      dustColor = Math.random() < 0.6 ? nebulaBlue1 : nebulaBlue2;
    } else if (dustRoll < 0.75) {
      dustColor = darkLaneColor;
    } else if (dustRoll < 0.90) {
      dustColor = nebulaAmber;
    } else {
      dustColor = Math.random() < 0.5 ? nebulaCyan : nebulaRose;
    }

    colors[i3] = dustColor.r;
    colors[i3 + 1] = dustColor.g;
    colors[i3 + 2] = dustColor.b;

    scales[i] = 1.2 + Math.random() * 2.8;
    phases[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute("aStreamVector", new THREE.BufferAttribute(streamVectors, 3));

  const material = new THREE.ShaderMaterial({
    vertexShader: dustCloudShader.vertexShader,
    fragmentShader: dustCloudShader.fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: galaxyConfig.dust.size || 34.0 }
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
