import * as THREE from "three";
import { galaxyConfig } from "./galaxyConfig";
import { backgroundStarsShader } from "./galaxyShaders";

/**
 * Creates the deep space twinkling star field.
 *
 * @param {number} count - Background star count
 * @returns {{ points: THREE.Points, material: THREE.ShaderMaterial, geometry: THREE.BufferGeometry }}
 */
export function createBackgroundStars(count = galaxyConfig.backgroundStars.countDesktop) {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const twinkleSpeeds = new Float32Array(count);
  const phases = new Float32Array(count);

  const starColors = [
    new THREE.Color("#FFFFFF"),
    new THREE.Color("#F8FAFC"),
    new THREE.Color("#BFDBFE"),
    new THREE.Color("#93C5FD"),
    new THREE.Color("#FDE68A"),
    new THREE.Color("#FED7AA")
  ];

  const maxR = galaxyConfig.backgroundStars.fieldRadius;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Uniform distribution on a 3D sphere / volume shell
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * maxR * 0.7 + maxR * 0.3;

    const sinPhi = Math.sin(phi);
    positions[i3] = r * sinPhi * Math.cos(theta);
    positions[i3 + 1] = r * sinPhi * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);

    const c = starColors[Math.floor(Math.random() * starColors.length)];
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;

    scales[i] = 0.5 + Math.random() * 1.8;
    twinkleSpeeds[i] = 0.8 + Math.random() * 2.4;
    phases[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("aTwinkleSpeed", new THREE.BufferAttribute(twinkleSpeeds, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: backgroundStarsShader.vertexShader,
    fragmentShader: backgroundStarsShader.fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 16.0 }
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;

  return { points, material, geometry };
}
