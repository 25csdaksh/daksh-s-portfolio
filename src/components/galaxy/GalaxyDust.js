import * as THREE from "three";
import { galaxyConfig } from "./galaxyConfig";
import { dustParticlesShader } from "./galaxyShaders";

/**
 * Creates the cosmic dust & nebular cloud layer along the spiral arms.
 *
 * @param {number} count - Dust particle count
 * @returns {{ points: THREE.Points, material: THREE.ShaderMaterial, geometry: THREE.BufferGeometry }}
 */
export function createGalaxyDust(count = galaxyConfig.dust.particleCountDesktop) {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const speeds = new Float32Array(count);
  const randomAngles = new Float32Array(count);
  const randomnessArr = new Float32Array(count * 3);

  const baseBlue = new THREE.Color(galaxyConfig.dust.color);
  const accentGold = new THREE.Color(galaxyConfig.dust.secondaryColor);
  const deepIndigo = new THREE.Color("#1E1B4B");

  const { arms, radius: maxRadius, spiralFactor, randomness: baseRandomness, power, thickness } = galaxyConfig;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const rawRatio = Math.random();
    const radius = Math.pow(rawRatio, power * 0.9) * maxRadius + 0.3;

    // Follow spiral arms closely
    const armIndex = i % arms;
    const branchAngle = (armIndex / arms) * Math.PI * 2;
    const spinAngle = radius * spiralFactor;
    const finalAngle = branchAngle + spinAngle;

    // Slightly wider dispersion than stars for fluffy cloud effect
    const randomRadiusFactor = Math.pow(Math.random(), 1.6) * (Math.random() < 0.5 ? 1 : -1) * (baseRandomness * 1.5) * (radius * 0.5 + 0.3);
    const randX = Math.cos(finalAngle + Math.PI / 2) * randomRadiusFactor;
    const randZ = Math.sin(finalAngle + Math.PI / 2) * randomRadiusFactor;
    const randY = (Math.random() - 0.5) * thickness * 1.6;

    positions[i3] = Math.cos(finalAngle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(finalAngle) * radius;

    randomnessArr[i3] = randX;
    randomnessArr[i3 + 1] = randY;
    randomnessArr[i3 + 2] = randZ;

    // Colors: 75% deep blue/indigo nebula, 25% amber/gold cosmic dust
    const dustColor = Math.random() < 0.75 ? (Math.random() < 0.5 ? baseBlue : deepIndigo) : accentGold;
    colors[i3] = dustColor.r;
    colors[i3 + 1] = dustColor.g;
    colors[i3 + 2] = dustColor.b;

    scales[i] = 1.0 + Math.random() * 2.2;
    speeds[i] = 0.9 + Math.random() * 0.2;
    randomAngles[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute("aRandomAngle", new THREE.BufferAttribute(randomAngles, 1));
  geometry.setAttribute("aRandomness", new THREE.BufferAttribute(randomnessArr, 3));

  const material = new THREE.ShaderMaterial({
    vertexShader: dustParticlesShader.vertexShader,
    fragmentShader: dustParticlesShader.fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: galaxyConfig.dust.size * 5.0 },
      uRotationSpeed: { value: galaxyConfig.rotationSpeed }
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
