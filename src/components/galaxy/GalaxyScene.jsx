import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { galaxyConfig } from "./galaxyConfig";
import { createGalaxyParticles } from "./GalaxyParticles";
import { createGalaxyCore } from "./GalaxyCore";
import { createGalaxyDust } from "./GalaxyDust";
import { createBackgroundStars } from "./BackgroundStars";
import { createGalaxyPlanets } from "./GalaxyPlanets";
import { soundManager } from "../../utils/sound";
import { Sparkles, Maximize2, Minimize2, RotateCw, Play, Pause, Move3D } from "lucide-react";

/**
 * Interactive 3D Procedural Spiral Galaxy Scene
 * Features:
 * - 75,000+ GPU Procedural Particles across 5 Logarithmic Spiral Arms
 * - 720° Dual-Cycle Smooth Continuous Rotation
 * - Interactive 3D Mouse Parallax & Drag-to-Rotate with Inertia Damping
 * - Multi-layer Volumetric Core Glow & Cosmic Dust Nebulae
 * - Three.js EffectComposer UnrealBloomPass Cinematic Post-Processing
 */
export function GalaxyScene({
  className = "",
  showControls = true,
  height = "100%",
  interactive = true,
  onSpeedChange = null
}) {
  const mountRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const sceneStateRef = useRef({
    isPaused: false,
    speedMultiplier: 1.0,
    bloomEnabled: true,
    mouseTarget: { x: 0, y: 0 },
    mouseCurrent: { x: 0, y: 0 },
    dragRotation: { x: 0, y: 0 },
    dragVelocity: { x: 0, y: 0 },
    isDragging: false,
    lastMousePos: { x: 0, y: 0 },
    isFullscreen: false
  });

  const [uiState, setUiState] = useState({
    isPaused: false,
    speedMultiplier: 1.0,
    bloomEnabled: true,
    fps: 60,
    particleCount: galaxyConfig.particleCountDesktop,
    isFullscreen: false
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile
      ? galaxyConfig.particleCountMobile
      : galaxyConfig.particleCountDesktop;
    const dustCount = isMobile
      ? galaxyConfig.dust.particleCountMobile
      : galaxyConfig.dust.particleCountDesktop;
    const starCount = isMobile
      ? galaxyConfig.backgroundStars.countMobile
      : galaxyConfig.backgroundStars.countDesktop;

    setUiState((prev) => ({ ...prev, particleCount }));

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(galaxyConfig.background.color);
    scene.fog = new THREE.FogExp2(galaxyConfig.background.color, 0.007);

    // 2. Perspective Camera (35-45 degree inclination)
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(
      galaxyConfig.camera.fov,
      aspect,
      galaxyConfig.camera.near,
      galaxyConfig.camera.far
    );
    const [initX, initY, initZ] = galaxyConfig.camera.initialPosition;
    camera.position.set(initX, initY, initZ);
    camera.lookAt(
      galaxyConfig.camera.lookAt[0],
      galaxyConfig.camera.lookAt[1],
      galaxyConfig.camera.lookAt[2]
    );

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      powerPreference: "high-performance",
      alpha: false,
      stencil: false,
      depth: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Post-Processing: UnrealBloomPass
    let composer = null;
    let bloomPass = null;
    try {
      const renderScene = new RenderPass(scene, camera);
      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(container.clientWidth, container.clientHeight),
        galaxyConfig.bloom.strength,
        galaxyConfig.bloom.radius,
        galaxyConfig.bloom.threshold
      );
      composer = new EffectComposer(renderer);
      composer.addPass(renderScene);
      composer.addPass(bloomPass);
    } catch (err) {
      console.warn("Postprocessing bloom fallback active:", err);
      composer = null;
    }

    // 5. Galaxy Root Group
    const galaxyRoot = new THREE.Group();
    scene.add(galaxyRoot);

    // Initial natural galactic pitch tilt
    const baseTiltX = THREE.MathUtils.degToRad(galaxyConfig.camera.pitchAngleDeg || 38);
    galaxyRoot.rotation.x = baseTiltX;
    galaxyRoot.rotation.z = THREE.MathUtils.degToRad(-10);

    // 6. Subsystem Instantiation
    const mainParticles = createGalaxyParticles(particleCount);
    galaxyRoot.add(mainParticles.points);

    const coreSystem = createGalaxyCore(
      isMobile ? Math.floor(galaxyConfig.core.particleCount * 0.5) : galaxyConfig.core.particleCount
    );
    galaxyRoot.add(coreSystem.group);

    const dustSystem = createGalaxyDust(dustCount);
    galaxyRoot.add(dustSystem.points);

    const backgroundStars = createBackgroundStars(starCount);
    scene.add(backgroundStars.points);

    const planetsSystem = createGalaxyPlanets();
    galaxyRoot.add(planetsSystem.group);

    // 7. Interactive Mouse Parallax & Drag-to-Rotate
    const handleMouseDown = (e) => {
      if (!interactive) return;
      sceneStateRef.current.isDragging = true;
      sceneStateRef.current.lastMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      sceneStateRef.current.mouseTarget.x = x * galaxyConfig.mouse.maxTiltX;
      sceneStateRef.current.mouseTarget.y = y * galaxyConfig.mouse.maxTiltY;

      if (sceneStateRef.current.isDragging) {
        const deltaX = e.clientX - sceneStateRef.current.lastMousePos.x;
        const deltaY = e.clientY - sceneStateRef.current.lastMousePos.y;

        sceneStateRef.current.dragVelocity.x = deltaX * 0.005;
        sceneStateRef.current.dragVelocity.y = deltaY * 0.005;

        sceneStateRef.current.dragRotation.y += deltaX * 0.005;
        sceneStateRef.current.dragRotation.x += deltaY * 0.005;

        sceneStateRef.current.lastMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      sceneStateRef.current.isDragging = false;
    };

    const handleMouseLeave = () => {
      sceneStateRef.current.isDragging = false;
      sceneStateRef.current.mouseTarget.x = 0;
      sceneStateRef.current.mouseTarget.y = 0;
    };

    const handleTouchStart = (e) => {
      if (!interactive || e.touches.length === 0) return;
      sceneStateRef.current.isDragging = true;
      sceneStateRef.current.lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e) => {
      if (!interactive || e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;

      sceneStateRef.current.mouseTarget.x = x * galaxyConfig.mouse.maxTiltX * 0.8;
      sceneStateRef.current.mouseTarget.y = y * galaxyConfig.mouse.maxTiltY * 0.8;

      if (sceneStateRef.current.isDragging) {
        const deltaX = touch.clientX - sceneStateRef.current.lastMousePos.x;
        const deltaY = touch.clientY - sceneStateRef.current.lastMousePos.y;

        sceneStateRef.current.dragRotation.y += deltaX * 0.006;
        sceneStateRef.current.dragRotation.x += deltaY * 0.006;

        sceneStateRef.current.lastMousePos = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchEnd = () => {
      sceneStateRef.current.isDragging = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (composer) {
        composer.setSize(width, height);
      }

      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      mainParticles.material.uniforms.uPixelRatio.value = pixelRatio;
      coreSystem.coreMaterial.uniforms.uPixelRatio.value = pixelRatio;
      dustSystem.material.uniforms.uPixelRatio.value = pixelRatio;
      backgroundStars.material.uniforms.uPixelRatio.value = pixelRatio;
    };

    window.addEventListener("resize", handleResize);

    // 9. Animation Loop (Continuous 720° Dual Cycle Rotation & Parallax)
    const clock = new THREE.Clock();
    let accumulatedTime = 0;
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);

      if (!sceneStateRef.current.isPaused) {
        accumulatedTime += delta * sceneStateRef.current.speedMultiplier;
      }

      // FPS Counter
      frameCount++;
      const now = performance.now();
      if (now - lastFpsUpdate >= 1000) {
        setUiState((prev) => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (now - lastFpsUpdate))
        }));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      // Smooth Mouse Parallax Damping
      const mouse = sceneStateRef.current.mouseCurrent;
      const target = sceneStateRef.current.mouseTarget;
      const damp = galaxyConfig.mouse.damping;

      mouse.x += (target.x - mouse.x) * damp;
      mouse.y += (target.y - mouse.y) * damp;

      // Apply drag inertia
      if (!sceneStateRef.current.isDragging) {
        sceneStateRef.current.dragVelocity.x *= 0.95;
        sceneStateRef.current.dragVelocity.y *= 0.95;
        sceneStateRef.current.dragRotation.y += sceneStateRef.current.dragVelocity.x;
        sceneStateRef.current.dragRotation.x += sceneStateRef.current.dragVelocity.y;
      }

      // 720° Dual Cycle Progression (4 * PI)
      const twoPi2 = galaxyConfig.twoCycleRotationPeriod;
      const currentRotationRad = (accumulatedTime * galaxyConfig.rotationSpeed * 8.0) % twoPi2;

      // Camera parallax position
      camera.position.x = initX + mouse.x * 2.8;
      camera.position.y = initY - mouse.y * 1.8;
      camera.lookAt(mouse.x * 0.6, -mouse.y * 0.4, 0);

      // Update Subsystem Shaders
      mainParticles.material.uniforms.uTime.value = accumulatedTime;
      dustSystem.material.uniforms.uTime.value = accumulatedTime;
      backgroundStars.material.uniforms.uTime.value = accumulatedTime;
      coreSystem.update(accumulatedTime);
      planetsSystem.update(accumulatedTime);

      // Galaxy 3D Orientation
      const drag = sceneStateRef.current.dragRotation;
      galaxyRoot.rotation.x = baseTiltX + mouse.y * 0.12 + drag.x;
      galaxyRoot.rotation.y = currentRotationRad * 0.12 + drag.y;
      galaxyRoot.rotation.z = THREE.MathUtils.degToRad(-10) + mouse.x * 0.12;

      // Render Scene
      if (composer && sceneStateRef.current.bloomEnabled) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    animate();

    // 10. Cleanup on unmount
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);

      mainParticles.geometry.dispose();
      mainParticles.material.dispose();
      dustSystem.geometry.dispose();
      dustSystem.material.dispose();
      backgroundStars.geometry.dispose();
      backgroundStars.material.dispose();

      if (composer) composer.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  const togglePause = () => {
    soundManager.playClick();
    sceneStateRef.current.isPaused = !sceneStateRef.current.isPaused;
    setUiState((prev) => ({ ...prev, isPaused: sceneStateRef.current.isPaused }));
  };

  const cycleSpeed = () => {
    soundManager.playClick();
    const speeds = [0.5, 1.0, 1.8, 2.5];
    const currentIdx = speeds.indexOf(sceneStateRef.current.speedMultiplier);
    const nextSpeed = speeds[(currentIdx + 1) % speeds.length];
    sceneStateRef.current.speedMultiplier = nextSpeed;
    setUiState((prev) => ({ ...prev, speedMultiplier: nextSpeed }));
    if (onSpeedChange) onSpeedChange(nextSpeed);
  };

  const toggleBloom = () => {
    soundManager.playClick();
    sceneStateRef.current.bloomEnabled = !sceneStateRef.current.bloomEnabled;
    setUiState((prev) => ({ ...prev, bloomEnabled: sceneStateRef.current.bloomEnabled }));
  };

  const toggleFullscreen = () => {
    soundManager.playClick();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      sceneStateRef.current.isFullscreen = true;
      setUiState((prev) => ({ ...prev, isFullscreen: true }));
    } else {
      document.exitFullscreen().catch(() => {});
      sceneStateRef.current.isFullscreen = false;
      setUiState((prev) => ({ ...prev, isFullscreen: false }));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none bg-[#070E20] ${className}`}
      style={{ minHeight: height }}
    >
      {/* Three.js Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Subtle Hint */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none font-mono text-[10px] text-amber-300 flex items-center gap-2 bg-[#0D1B3E]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400/40 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-bold tracking-wider uppercase text-white">3D Spiral Galaxy</span>
        <span className="text-slate-400">|</span>
        <span className="text-amber-300 hidden sm:inline">Drag to Rotate in 3D</span>
      </div>

      {/* HUD Controls Bar */}
      {showControls && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-[#0D1B3E]/90 backdrop-blur-md p-1.5 rounded-2xl border border-amber-400/40 shadow-2xl">
          <button
            onClick={togglePause}
            className="p-2 rounded-xl bg-[#070E20] hover:bg-[#122452] border border-[#1E2E5D] text-slate-200 hover:text-amber-300 transition-colors"
            title={uiState.isPaused ? "Resume Rotation" : "Pause Rotation"}
            data-cursor="pointer"
          >
            {uiState.isPaused ? <Play className="w-3.5 h-3.5 fill-current text-amber-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1.5 rounded-xl bg-[#070E20] hover:bg-[#122452] border border-[#1E2E5D] text-xs font-mono font-bold text-amber-300 hover:border-amber-400 transition-all flex items-center gap-1"
            title="Cycle Orbit Velocity"
            data-cursor="pointer"
          >
            <RotateCw className="w-3 h-3 text-amber-400" />
            <span>{uiState.speedMultiplier}x</span>
          </button>

          <button
            onClick={toggleBloom}
            className={`p-2 rounded-xl border transition-all ${
              uiState.bloomEnabled
                ? "bg-amber-400/20 border-amber-400/70 text-amber-300"
                : "bg-[#070E20] border-[#1E2E5D] text-slate-400"
            }`}
            title="Toggle Cinematic Bloom"
            data-cursor="pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#070E20] hover:bg-[#122452] border border-[#1E2E5D] text-slate-200 hover:text-amber-300 transition-colors"
            title="Toggle Fullscreen"
            data-cursor="pointer"
          >
            {uiState.isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
}
