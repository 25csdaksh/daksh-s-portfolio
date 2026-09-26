import * as THREE from "three";
import { galaxyConfig } from "./galaxyConfig";
import { coreGlowShader, galaxyParticlesShader } from "./galaxyShaders";

/**
 * Creates the Central Galactic Bulge.
 * Uses a Plummer astronomical profile with thousands of sparkling stars
 * and multi-layered volumetric additive light planes.
 *
 * @param {number} count - Core star particle count
 * @returns {{ group: THREE.Group, update: (time: number) => void }}
 */
export function createGalaxyCore(count = galaxyConfig.core.particleCountDesktop) {
  const group = new THREE.Group();

  // 1. Core Stellar Bulge (3D Plummer Spheroid Distribution)
  const coreGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const brightness = new Float32Array(count);
  const twinkleSpeeds = new Float32Array(count);
  const phases = new Float32Array(count);
  const streamVectors = new Float32Array(count * 3);

  const white = new THREE.Color("#FFFFFF");
  const gold = new THREE.Color("#FDE047");
  const warmAmber = new THREE.Color("#F59E0B");
  const softBlue = new THREE.Color("#93C5FD");

  const coreR = galaxyConfig.core.radius || 1.6;
  const bulgeH = galaxyConfig.core.bulgeHeight || 1.1;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Plummer sphere radial density: r = a / sqrt(u^(-2/3) - 1)
    const u = Math.max(0.002, Math.random());
    const rNorm = Math.pow(Math.pow(u, -2.0 / 3.0) - 1.0, -0.5);
    const radius = Math.min(coreR * 1.3, rNorm * coreR * 0.38);

    // Random uniform spherical direction
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2.0 * Math.random() - 1.0);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi) * (bulgeH / coreR) * 0.6;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    // Velocity vector
    streamVectors[i3] = -Math.sin(theta);
    streamVectors[i3 + 1] = 0;
    streamVectors[i3 + 2] = Math.cos(theta);

    // Color gradient: Warm gold & white-hot center -> celestial blue boundary
    const distRatio = radius / coreR;
    let pickedColor;

    if (distRatio < 0.25) {
      // White-hot nucleus
      pickedColor = Math.random() < 0.75 ? white : gold;
    } else if (distRatio < 0.65) {
      // Warm gold & amber
      pickedColor = Math.random() < 0.65 ? gold : warmAmber;
    } else {
      // Outer core boundary
      pickedColor = Math.random() < 0.55 ? softBlue : gold;
    }

    colors[i3] = pickedColor.r;
    colors[i3 + 1] = pickedColor.g;
    colors[i3 + 2] = pickedColor.b;

    // Individual star scales
    const s = 0.6 + Math.random() * 1.4;
    scales[i] = s;
    brightness[i] = 0.85 + (1.0 - Math.min(1.0, distRatio)) * 0.35;
    twinkleSpeeds[i] = 1.0 + Math.random() * 2.2;
    phases[i] = Math.random() * Math.PI * 2;
  }

  coreGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  coreGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  coreGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  coreGeometry.setAttribute("aBrightness", new THREE.BufferAttribute(brightness, 1));
  coreGeometry.setAttribute("aTwinkleSpeed", new THREE.BufferAttribute(twinkleSpeeds, 1));
  coreGeometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  coreGeometry.setAttribute("aStreamVector", new THREE.BufferAttribute(streamVectors, 3));

  const coreMaterial = new THREE.ShaderMaterial({
    vertexShader: galaxyParticlesShader.vertexShader,
    fragmentShader: galaxyParticlesShader.fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 22.0 }
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });

  const corePoints = new THREE.Points(coreGeometry, coreMaterial);
  group.add(corePoints);

  // 2. Volumetric Bulge Halo Planes
  const glowLayers = [
    {
      size: coreR * 2.2,
      inner: new THREE.Color("#FFFFFF"),
      mid: new THREE.Color("#FDE047"),
      outer: new THREE.Color("#3B82F6"),
      intensity: 0.85,
      rotation: 0
    },
    {
      size: coreR * 3.6,
      inner: new THREE.Color("#F59E0B"),
      mid: new THREE.Color("#1D4ED8"),
      outer: new THREE.Color("#02040A"),
      intensity: 0.55,
      rotation: Math.PI / 4
    }
  ];

  const glowMaterials = [];

  glowLayers.forEach((layer) => {
    const planeGeo = new THREE.PlaneGeometry(layer.size, layer.size);
    const planeMat = new THREE.ShaderMaterial({
      vertexShader: coreGlowShader.vertexShader,
      fragmentShader: coreGlowShader.fragmentShader,
      uniforms: {
        uColorInner: { value: layer.inner },
        uColorMid: { value: layer.mid },
        uColorOuter: { value: layer.outer },
        uIntensity: { value: layer.intensity },
        uTime: { value: 0 }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    glowMaterials.push(planeMat);

    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI / 2; // Flat on disk
    mesh.rotation.z = layer.rotation;
    group.add(mesh);
  });

  const update = (time) => {
    coreMaterial.uniforms.uTime.value = time;
    glowMaterials.forEach((mat) => {
      mat.uniforms.uTime.value = time;
    });
  };

  return { group, update, coreMaterial };
}
