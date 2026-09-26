import * as THREE from "three";
import { galaxyConfig } from "./galaxyConfig";

/**
 * Creates subtle orbiting planets along the outer spiral tracks.
 *
 * @returns {{ group: THREE.Group, update: (time: number) => void }}
 */
export function createGalaxyPlanets() {
  const group = new THREE.Group();
  const planetMeshes = [];

  galaxyConfig.planets.forEach((pConfig) => {
    const planetGroup = new THREE.Group();

    // 1. Planet Sphere with Custom Shader or Phong
    const sphereGeo = new THREE.SphereGeometry(pConfig.size, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(pConfig.color)
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    planetGroup.add(sphere);

    // 2. Subtle Glow Atmosphere Ring
    const atmosphereGeo = new THREE.SphereGeometry(pConfig.size * 1.35, 16, 16);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(pConfig.glowColor),
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    planetGroup.add(atmosphere);

    // 3. Optional Planetary Ring
    if (pConfig.hasRing) {
      const ringGeo = new THREE.RingGeometry(pConfig.size * 1.5, pConfig.size * 2.3, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(pConfig.glowColor),
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + 0.3;
      planetGroup.add(ring);
    }

    // 4. Faint Orbital Path Line
    const orbitCurve = new THREE.EllipseCurve(
      0, 0,
      pConfig.radius, pConfig.radius,
      0, 2 * Math.PI,
      false,
      0
    );
    const orbitPoints = orbitCurve.getPoints(90);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(
      orbitPoints.map(p => new THREE.Vector3(p.x, 0, p.y))
    );
    const orbitMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(pConfig.glowColor),
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitLine.rotation.x = pConfig.inclination;
    group.add(orbitLine);

    group.add(planetGroup);

    planetMeshes.push({
      group: planetGroup,
      radius: pConfig.radius,
      speed: pConfig.speed,
      inclination: pConfig.inclination
    });
  });

  const update = (time) => {
    planetMeshes.forEach((item, idx) => {
      const angle = time * item.speed * 8.0 + (idx * Math.PI * 0.7);
      const x = Math.cos(angle) * item.radius;
      const z = Math.sin(angle) * item.radius;
      const y = Math.sin(angle) * item.radius * Math.sin(item.inclination);

      item.group.position.set(x, y, z);
      item.group.rotation.y += 0.02;
    });
  };

  return { group, update };
}
