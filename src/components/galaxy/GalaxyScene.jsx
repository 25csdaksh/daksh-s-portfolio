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
import { soundManager } from "../../utils/sound";
import { Sparkles, Maximize2, Minimize2, RotateCw, Play, Pause, Compass } from "lucide-react";

/**
 * 3D Milky Way Spiral Galaxy Scene
 * 
 * Features:
 * - 85,000+ GPU Procedural Particles across 4 Continuous Logarithmic Spiral Arms
 * - True 3D Density Wave Cohesive Polar Rotation (0° -> 720° Seamless Two-Cycle)
 * - 34° Astronomical Inclination View with 3D Depth
 * - Interactive Mouse Drag-to-Rotate with Smooth Inertia Damping & Auto-Resume
 * - Dense Plummer Core Bulge with Individual Visible Stars & Volumetric Multi-Layer Glow
 * - Realistic Cosmic Dust Lanes & H-II Star-Forming Emission Nebulae
 * - UnrealBloomPass Cinematic Post-Processing
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
    lastInteractionTime: performance.now(),
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
    scene.fog = new THREE.FogExp2(galaxyConfig.background.color, 0.005);

    // 2. Camera Setup (30-40 degrees above the galactic plane)
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

    // 5. Galaxy Galactic Plane Hierarchy
    // galaxyTiltGroup applies the fixed natural astronomical inclination angle (~34°)
    const galaxyTiltGroup = new THREE.Group();
    galaxyTiltGroup.rotation.x = THREE.MathUtils.degToRad(galaxyConfig.camera.pitchAngleDeg || 34);
    galaxyTiltGroup.rotation.z = THREE.MathUtils.degToRad(-6);
    scene.add(galaxyTiltGroup);

    // galaxySpinGroup performs the continuous 3D rotation around the galactic polar axis (Y-axis)
    const galaxySpinGroup = new THREE.Group();
    galaxyTiltGroup.add(galaxySpinGroup);

    // 6. Subsystem Instantiation
    const mainParticles = createGalaxyParticles(particleCount);
    galaxySpinGroup.add(mainParticles.points);

    const coreSystem = createGalaxyCore(
      isMobile ? galaxyConfig.core.particleCountMobile : galaxyConfig.core.particleCountDesktop
    );
    galaxySpinGroup.add(coreSystem.group);

    const dustSystem = createGalaxyDust(dustCount);
    galaxySpinGroup.add(dustSystem.points);

    const backgroundStars = createBackgroundStars(starCount);
    scene.add(backgroundStars.points);

    // 7. Interactive Mouse Parallax & Drag-to-Rotate
    const handleMouseDown = (e) => {
      if (!interactive) return;
      sceneStateRef.current.isDragging = true;
      sceneStateRef.current.lastMousePos = { x: e.clientX, y: e.clientY };
      sceneStateRef.current.lastInteractionTime = performance.now();
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

        sceneStateRef.current.dragVelocity.x = deltaX * galaxyConfig.interaction.dragSensitivity;
        sceneStateRef.current.dragVelocity.y = deltaY * galaxyConfig.interaction.dragSensitivity;

        sceneStateRef.current.dragRotation.y += deltaX * galaxyConfig.interaction.dragSensitivity;
        sceneStateRef.current.dragRotation.x += deltaY * galaxyConfig.interaction.dragSensitivity;

        sceneStateRef.current.lastMousePos = { x: e.clientX, y: e.clientY };
        sceneStateRef.current.lastInteractionTime = performance.now();
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
      sceneStateRef.current.lastInteractionTime = performance.now();
    };

    const handleTouchMove = (e) => {
      if (!interactive || e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;

      sceneStateRef.current.mouseTarget.x = x * galaxyConfig.mouse.maxTiltX * 0.7;
      sceneStateRef.current.mouseTarget.y = y * galaxyConfig.mouse.maxTiltY * 0.7;

      if (sceneStateRef.current.isDragging) {
        const deltaX = touch.clientX - sceneStateRef.current.lastMousePos.x;
        const deltaY = touch.clientY - sceneStateRef.current.lastMousePos.y;

        sceneStateRef.current.dragRotation.y += deltaX * (galaxyConfig.interaction.dragSensitivity * 1.2);
        sceneStateRef.current.dragRotation.x += deltaY * (galaxyConfig.interaction.dragSensitivity * 1.2);

        sceneStateRef.current.lastMousePos = { x: touch.clientX, y: touch.clientY };
        sceneStateRef.current.lastInteractionTime = performance.now();
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

    // 9. Animation Loop (Continuous 720° Dual Cycle Rotation & Inertia Damping)
    const clock = new THREE.Clock();
    let accumulatedTime = 0;
    let frameCount = 0;
    let lastFpsUpdate = performance.now();
    let autoRotationAngle = 0;

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);

      if (!sceneStateRef.current.isPaused) {
        accumulatedTime += delta * sceneStateRef.current.speedMultiplier;
        // Continuous 720° (4 * Math.PI) seamless rotation progression
        const speed = galaxyConfig.rotationSpeed * sceneStateRef.current.speedMultiplier * 6.0;
        autoRotationAngle = (autoRotationAngle + speed) % galaxyConfig.twoCycleRotationPeriod;
      }

      // FPS Monitoring
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

      // Apply Drag Inertia & Auto-Damping
      if (!sceneStateRef.current.isDragging) {
        sceneStateRef.current.dragVelocity.x *= 0.94;
        sceneStateRef.current.dragVelocity.y *= 0.94;
        sceneStateRef.current.dragRotation.y += sceneStateRef.current.dragVelocity.x;
        sceneStateRef.current.dragRotation.x += sceneStateRef.current.dragVelocity.y;

        // Smoothly decay user elevation drag back to resting angle after delay
        const timeSinceDrag = now - sceneStateRef.current.lastInteractionTime;
        if (timeSinceDrag > galaxyConfig.interaction.autoResumeDelay) {
          sceneStateRef.current.dragRotation.x *= 0.985;
        }
      }

      // Camera Parallax
      camera.position.x = initX + mouse.x * 2.2;
      camera.position.y = initY - mouse.y * 1.5;
      camera.lookAt(mouse.x * 0.4, -mouse.y * 0.3, 0);

      // Cohesive 3D Galaxy Polar Rotation
      // Rotate the entire galaxy system as one astronomical entity around its Y-axis
      galaxySpinGroup.rotation.y = autoRotationAngle + sceneStateRef.current.dragRotation.y;
      
      // User vertical drag tilts the galactic plane dynamically
      const baseTiltX = THREE.MathUtils.degToRad(galaxyConfig.camera.pitchAngleDeg || 34);
      galaxyTiltGroup.rotation.x = baseTiltX + sceneStateRef.current.dragRotation.x + mouse.y * 0.08;
      galaxyTiltGroup.rotation.z = THREE.MathUtils.degToRad(-6) + mouse.x * 0.08;

      // Update Shader Uniforms
      mainParticles.material.uniforms.uTime.value = accumulatedTime;
      dustSystem.material.uniforms.uTime.value = accumulatedTime;
      backgroundStars.material.uniforms.uTime.value = accumulatedTime;
      coreSystem.update(accumulatedTime);

      // Render Scene with Bloom
      if (composer && sceneStateRef.current.bloomEnabled) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    animate();

    // 10. Cleanup on Unmount
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
    const speeds = [0.5, 1.0, 1.5, 2.0];
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

  const resetOrientation = () => {
    soundManager.playClick();
    sceneStateRef.current.dragRotation.x = 0;
    sceneStateRef.current.dragRotation.y = 0;
    sceneStateRef.current.dragVelocity.x = 0;
    sceneStateRef.current.dragVelocity.y = 0;
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
      className={`relative w-full h-full overflow-hidden select-none bg-[#02040A] ${className}`}
      style={{ minHeight: height }}
    >
      {/* Three.js Galaxy Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Status Badge */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none font-mono text-[10px] text-amber-300 flex items-center gap-2 bg-[#070E20]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-400/40 shadow-xl">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-bold tracking-wider uppercase text-white">Milky Way Galaxy</span>
        <span className="text-slate-500">|</span>
        <span className="text-amber-300/90 hidden sm:inline">3D Interactive Simulation</span>
      </div>

      {/* HUD Controls Bar */}
      {showControls && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-[#070E20]/85 backdrop-blur-md p-1.5 rounded-2xl border border-amber-400/35 shadow-2xl">
          <button
            onClick={togglePause}
            className="p-2 rounded-xl bg-[#0B1528] hover:bg-[#122452] border border-[#1E2E5D] text-slate-200 hover:text-amber-300 transition-colors"
            title={uiState.isPaused ? "Resume Rotation" : "Pause Rotation"}
            data-cursor="pointer"
          >
            {uiState.isPaused ? <Play className="w-3.5 h-3.5 fill-current text-amber-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1.5 rounded-xl bg-[#0B1528] hover:bg-[#122452] border border-[#1E2E5D] text-xs font-mono font-bold text-amber-300 hover:border-amber-400/60 transition-all flex items-center gap-1"
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
                : "bg-[#0B1528] border-[#1E2E5D] text-slate-400"
            }`}
            title="Toggle Cinematic Bloom"
            data-cursor="pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetOrientation}
            className="p-2 rounded-xl bg-[#0B1528] hover:bg-[#122452] border border-[#1E2E5D] text-slate-200 hover:text-amber-300 transition-colors"
            title="Reset Perspective"
            data-cursor="pointer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#0B1528] hover:bg-[#122452] border border-[#1E2E5D] text-slate-200 hover:text-amber-300 transition-colors"
            title="Toggle Fullscreen"
            data-cursor="pointer"
          >
            {uiState.isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-amber-400" /> : <Maximize2 className="w-3.5 h-3.5 text-amber-400" />}
          </button>
        </div>
      )}
    </div>
  );
}
