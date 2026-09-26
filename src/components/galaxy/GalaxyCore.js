import * as THREE from "three";
import { galaxyConfig } from "./galaxyConfig";
import { coreGlowShader, galaxyParticlesShader } from "./galaxyShaders";

/**
 * Creates the ultra-dense glowing core of the galaxy.
 * Contains:
 * 1. High-density central star swarm converging on the core
 * 2. Multi-layer volumetric radial glow planes with additive blending (white-hot inner + blue/gold halo)
 *
 * @param {number} count - Particle count for core star cluster
 * @returns {{ group: THREE.Group, update: (time: number) => void }}
 */
export function createGalaxyCore(count = galaxyConfig.core.particleCount) {
  const group = new THREE.Group();

  // 1. High Density Core Star Swarm (Exponential spherical / disk convergence)
  const coreGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const brightness = new Float32Array(count);
  const speeds = new Float32Array(count);
  const randomAngles = new Float32Array(count);
  const distances = new Float32Array(count);
  const randomnessArr = new Float32Array(count * 3);

  const white = new THREE.Color("#FFFFFF");
  const gold = new THREE.Color("#FDE047");
  const blue = new THREE.Color("#60A5FA");

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Exponential radius distribution towards center
    const rRatio = Math.pow(Math.random(), 3.5);
    const radius = rRatio * galaxyConfig.core.radius;
    distances[i] = radius;

    const angle = Math.random() * Math.PI * 2;
    const height = (Math.random() - 0.5) * (1.0 - rRatio * 0.4) * galaxyConfig.thickness * 0.8;

    positions[i3] = Math.cos(angle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(angle) * radius;

    randomnessArr[i3] = (Math.random() - 0.5) * 0.15;
    randomnessArr[i3 + 1] = height;
    randomnessArr[i3 + 2] = (Math.random() - 0.5) * 0.15;

    // Color gradient from white-hot center to golden/blue rim
    let c;
    if (radius < 0.45) {
      c = white;
    } else if (radius < 1.0) {
      c = Math.random() < 0.7 ? gold : white;
    } else {
      c = Math.random() < 0.6 ? blue : gold;
    }

    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;

    scales[i] = (1.2 + Math.random() * 2.8) * (1.0 - radius / galaxyConfig.core.radius * 0.5);
    brightness[i] = 0.8 + Math.random() * 0.5;
    speeds[i] = 1.05 + Math.random() * 0.2;
    randomAngles[i] = Math.random() * Math.PI * 2;
  }

  coreGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  coreGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  coreGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  coreGeometry.setAttribute("aBrightness", new THREE.BufferAttribute(brightness, 1));
  coreGeometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
  coreGeometry.setAttribute("aRandomAngle", new THREE.BufferAttribute(randomAngles, 1));
  coreGeometry.setAttribute("aDistance", new THREE.BufferAttribute(distances, 1));
  coreGeometry.setAttribute("aRandomness", new THREE.BufferAttribute(randomnessArr, 3));

  const coreMaterial = new THREE.ShaderMaterial({
    vertexShader: galaxyParticlesShader.vertexShader,
    fragmentShader: galaxyParticlesShader.fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 42.0 },
      uRotationSpeed: { value: galaxyConfig.rotationSpeed * 1.3 },
      uDifferentialSpeed: { value: galaxyConfig.differentialSpeed }
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });

  const corePoints = new THREE.Points(coreGeometry, coreMaterial);
  group.add(corePoints);

  // 2. Volumetric Glow Sprites / Planar Bilboards (Layered for depth)
  const glowLayers = [
    // White-hot dense central core
    {
      size: galaxyConfig.core.glowSize * 0.8,
      innerColor: new THREE.Color("#FFFFFF"),
      outerColor: new THREE.Color("#FDE047"),
      intensity: 2.2,
      rotation: 0
    },
    // Celestial Azure Halo
    {
      size: galaxyConfig.core.glowSize * 1.8,
      innerColor: new THREE.Color("#60A5FA"),
      outerColor: new THREE.Color("#1D4ED8"),
      intensity: 1.4,
      rotation: Math.PI / 4
    },
    // Golden Corona
    {
      size: galaxyConfig.core.glowSize * 2.6,
      innerColor: new THREE.Color("#F59E0B"),
      outerColor: new THREE.Color("#070E20"),
      intensity: 0.9,
      rotation: Math.PI / 2
    }
  ];

  const glowMaterials = [];

  glowLayers.forEach((layer) => {
    const planeGeo = new THREE.PlaneGeometry(layer.size, layer.size);
    const planeMat = new THREE.ShaderMaterial({
      vertexShader: coreGlowShader.vertexShader,
      fragmentShader: coreGlowShader.fragmentShader,
      uniforms: {
        uColorInner: { value: layer.innerColor },
        uColorOuter: { value: layer.outerColor },
        uIntensity: { value: layer.intensity },
        uTime: { value: 0 }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    glowMaterials.push(planeMat);

    const glowMesh = new THREE.Mesh(planeGeo, planeMat);
    glowMesh.rotation.x = Math.PI / 2; // Lie flat along the galaxy disc
    glowMesh.rotation.z = layer.rotation;
    group.add(glowMesh);
  });

  const update = (time) => {
    coreMaterial.uniforms.uTime.value = time;
    glowMaterials.forEach((mat) => {
      mat.uniforms.uTime.value = time;
    });
  };

  return { group, update, coreMaterial };
}
