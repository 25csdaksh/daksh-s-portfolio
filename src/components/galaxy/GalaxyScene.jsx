import React, { useEffect, useRef, useState, useCallback } from "react";
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
import { Sparkles, Maximize2, Minimize2, RotateCw, Play, Pause, Eye, Sliders, Shield } from "lucide-react";

/**
 * Interactive 3D Procedural Spiral Galaxy Scene
 * Powered by Three.js BufferGeometry, GPU Shaders, 720° Dual-Cycle Rotation,
 * Mouse Parallax Damping, and Cinematic Post-Processing Bloom.
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
    rotationPhaseDeg: 0,
    isFullscreen: false
  });

  const [uiState, setUiState] = useState({
    isPaused: false,
    speedMultiplier: 1.0,
    bloomEnabled: true,
    rotationDeg: "0°",
    fps: 60,
    particleCount: galaxyConfig.particleCountDesktop,
    isFullscreen: false
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect mobile / low-power devices
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
    scene.fog = new THREE.FogExp2(galaxyConfig.background.color, 0.008);

    // 2. Camera Setup (35-45 degree perspective inclination)
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
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Post-Processing: EffectComposer & UnrealBloomPass
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
      console.warn("Post-processing bloom fallback active:", err);
      composer = null;
    }

    // 5. Galaxy Root Group
    const galaxyRoot = new THREE.Group();
    scene.add(galaxyRoot);

    // Set initial natural galactic pitch tilt
    galaxyRoot.rotation.x = THREE.MathUtils.degToRad(18);
    galaxyRoot.rotation.z = THREE.MathUtils.degToRad(-12);

    // 6. Spawn Sub-Systems
    // Main Spiral Particles
    const mainParticles = createGalaxyParticles(particleCount);
    galaxyRoot.add(mainParticles.points);

    // Volumetric Glowing Core
    const coreSystem = createGalaxyCore(
      isMobile ? Math.floor(galaxyConfig.core.particleCount * 0.5) : galaxyConfig.core.particleCount
    );
    galaxyRoot.add(coreSystem.group);

    // Cosmic Dust Layer
    const dustSystem = createGalaxyDust(dustCount);
    galaxyRoot.add(dustSystem.points);

    // Deep Space Background Star Field
    const backgroundStars = createBackgroundStars(starCount);
    scene.add(backgroundStars.points);

    // Orbiting Celestial Bodies (Planets)
    const planetsSystem = createGalaxyPlanets();
    galaxyRoot.add(planetsSystem.group);

    // 7. Mouse Parallax Tracking
    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      sceneStateRef.current.mouseTarget.x = x * galaxyConfig.mouse.maxTiltX;
      sceneStateRef.current.mouseTarget.y = y * galaxyConfig.mouse.maxTiltY;
    };

    const handleMouseLeave = () => {
      sceneStateRef.current.mouseTarget.x = 0;
      sceneStateRef.current.mouseTarget.y = 0;
    };

    const handleTouchMove = (e) => {
      if (!interactive || e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;

      sceneStateRef.current.mouseTarget.x = x * galaxyConfig.mouse.maxTiltX * 0.8;
      sceneStateRef.current.mouseTarget.y = y * galaxyConfig.mouse.maxTiltY * 0.8;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

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

      // Update shader uniforms
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      mainParticles.material.uniforms.uPixelRatio.value = pixelRatio;
      coreSystem.coreMaterial.uniforms.uPixelRatio.value = pixelRatio;
      dustSystem.material.uniforms.uPixelRatio.value = pixelRatio;
      backgroundStars.material.uniforms.uPixelRatio.value = pixelRatio;
    };

    window.addEventListener("resize", handleResize);

    // 9. Animation Loop with 720° Dual-Cycle Rotation
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

      // FPS Telemetry
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

      // Smooth Mouse Tilt Interpolation (Damping)
      const mouse = sceneStateRef.current.mouseCurrent;
      const target = sceneStateRef.current.mouseTarget;
      const damp = galaxyConfig.mouse.damping;

      mouse.x += (target.x - mouse.x) * damp;
      mouse.y += (target.y - mouse.y) * damp;

      // 720-Degree Dual Cycle Progression (0 -> 720 degrees seamless loop)
      const twoPi2 = galaxyConfig.twoCycleRotationPeriod; // 4 * PI
      const currentRotationRad = (accumulatedTime * galaxyConfig.rotationSpeed * 10.0) % twoPi2;
      const rotationDegNum = Math.round((currentRotationRad / twoPi2) * 720);

      // Camera parallax tilt
      camera.position.x = initX + mouse.x * 3.5;
      camera.position.y = initY - mouse.y * 2.2;
      camera.lookAt(mouse.x * 0.8, -mouse.y * 0.5, 0);

      // Update Subsystem Shaders
      mainParticles.material.uniforms.uTime.value = accumulatedTime;
      dustSystem.material.uniforms.uTime.value = accumulatedTime;
      backgroundStars.material.uniforms.uTime.value = accumulatedTime;
      coreSystem.update(accumulatedTime);
      planetsSystem.update(accumulatedTime);

      // Global subtle galaxy tilt oscillation
      galaxyRoot.rotation.x = THREE.MathUtils.degToRad(18) + mouse.y * 0.15;
      galaxyRoot.rotation.y = currentRotationRad * 0.15;
      galaxyRoot.rotation.z = THREE.MathUtils.degToRad(-12) + mouse.x * 0.15;

      // Render Scene
      if (composer && sceneStateRef.current.bloomEnabled) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    animate();

    // 10. Cleanup
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchmove", handleTouchMove);

      // Dispose geometries and materials
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

  // UI Handlers
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
      className={`relative w-full overflow-hidden select-none bg-[#02060A] ${className}`}
      style={{ height }}
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Cinematic Top-Left Telemetry Overlay */}
      {showControls && (
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 pointer-events-none font-mono text-[10px] text-amber-300">
          <div className="flex items-center gap-2 bg-[#070E20]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/40 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold tracking-wider uppercase text-white">Milky Way Spiral Matrix</span>
            <span className="text-slate-400">|</span>
            <span className="text-amber-300 font-bold">720° Dual-Cycle</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 px-3 py-1 text-slate-300 bg-[#070E20]/60 backdrop-blur-xs rounded-lg w-fit border border-[#1E2E5D]/60 mt-1">
            <span>STARS: {uiState.particleCount.toLocaleString()}</span>
            <span>•</span>
            <span>FPS: <strong className="text-emerald-400">{uiState.fps}</strong></span>
            <span>•</span>
            <span>ARMS: {galaxyConfig.arms}</span>
          </div>
        </div>
      )}

      {/* Interactive HUD Controls Bar */}
      {showControls && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-[#070E20]/85 backdrop-blur-md p-1.5 rounded-2xl border border-amber-400/40 shadow-2xl">
          {/* Pause / Resume Button */}
          <button
            onClick={togglePause}
            className="p-2 rounded-xl bg-[#0D1B3E] hover:bg-[#122452] border border-[#1E2E5D] text-slate-200 hover:text-amber-300 transition-colors"
            title={uiState.isPaused ? "Resume Rotation" : "Pause Rotation"}
            data-cursor="pointer"
          >
            {uiState.isPaused ? <Play className="w-3.5 h-3.5 fill-current text-amber-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Speed Multiplier Button */}
          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1.5 rounded-xl bg-[#0D1B3E] hover:bg-[#122452] border border-[#1E2E5D] text-xs font-mono font-bold text-amber-300 hover:border-amber-400 transition-all flex items-center gap-1"
            title="Cycle Orbit Velocity"
            data-cursor="pointer"
          >
            <RotateCw className="w-3 h-3 text-amber-400" />
            <span>{uiState.speedMultiplier}x</span>
          </button>

          {/* Bloom Toggle */}
          <button
            onClick={toggleBloom}
            className={`p-2 rounded-xl border transition-all ${
              uiState.bloomEnabled
                ? "bg-amber-400/15 border-amber-400/60 text-amber-300"
                : "bg-[#0D1B3E] border-[#1E2E5D] text-slate-400"
            }`}
            title="Toggle Cinematic Bloom"
            data-cursor="pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#0D1B3E] hover:bg-[#122452] border border-[#1E2E5D] text-slate-200 hover:text-amber-300 transition-colors"
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
