import React, { useEffect, useRef } from "react";

/**
 * WinterSnowfall
 * 
 * High-performance, atmospheric 60FPS winter snowfall physics engine.
 * - Multi-depth parallax snowflake layers (micro distant flakes, mid-air flakes, and foreground crystalline flakes).
 * - Crystalline dendritic 6-arm snowflakes with natural rotational tumble.
 * - Fluid wind oscillation & interactive mouse breeze reaction.
 * - Smooth fade-in/fade-out transitions when entering/exiting night mode.
 * - Automatically pauses when inactive or hidden to conserve 100% CPU/GPU.
 */
export function WinterSnowfall({ isActive = true }) {
  const canvasRef = useRef(null);
  const activeRef = useRef(isActive);

  useEffect(() => {
    activeRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const flakeCount = isMobile ? 55 : 120;

    // Mouse velocity & position tracking for subtle dynamic wind
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseVelocityX = 0;
    let lastMouseX = 0;
    let lastMouseMoveTime = performance.now();

    const handleMouseMove = (e) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastMouseMoveTime);
      mouseVelocityX = (e.clientX - lastMouseX) / dt;
      lastMouseX = e.clientX;
      lastMouseMoveTime = now;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      mouseVelocityX = 0;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Initialize 3D Multi-Layer Snowflakes
    const flakes = Array.from({ length: flakeCount }, () => {
      const z = Math.random(); // 0 (far) to 1 (near)
      const isCrystal = z > 0.72 && Math.random() < 0.35; // detailed 6-point dendritic flakes
      const radius = isCrystal
        ? Math.random() * 2.5 + 3.0
        : z < 0.4
        ? Math.random() * 1.2 + 0.8
        : Math.random() * 2.0 + 1.6;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        radius,
        isCrystal,
        opacity: Math.random() * 0.4 + (z < 0.4 ? 0.35 : 0.6),
        speedY: (Math.random() * 0.9 + 0.6) * (z * 0.8 + 0.6),
        speedX: (Math.random() - 0.5) * 0.3,
        swayAmp: Math.random() * 1.8 + 0.6,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAngle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
      };
    });

    let time = 0;
    let currentAlpha = activeRef.current ? 1.0 : 0.0;
    let isRunning = true;

    // Draw intricate 6-point snowflake crystal
    const drawSnowflakeCrystal = (x, y, r, alpha, rot) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = `rgba(240, 249, 255, ${alpha * 0.92})`;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 1.0;
      ctx.lineCap = "round";

      // 6 dendritic branches
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);

        // Main spine
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        ctx.stroke();

        // Sub-branches / barbs (V-shapes)
        const barbY = -r * 0.55;
        const barbLen = r * 0.32;
        ctx.beginPath();
        ctx.moveTo(0, barbY);
        ctx.lineTo(-barbLen, barbY + barbLen * 0.6);
        ctx.moveTo(0, barbY);
        ctx.lineTo(barbLen, barbY + barbLen * 0.6);
        ctx.stroke();

        ctx.restore();
      }

      // Center crystalline dot
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0.8, r * 0.2), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      if (!isRunning) return;

      time += 0.016;

      // Dampen mouse velocity
      mouseVelocityX *= 0.94;

      // Target alpha based on active state
      const targetAlpha = activeRef.current ? 1.0 : 0.0;
      currentAlpha += (targetAlpha - currentAlpha) * 0.06;

      // Clear previous canvas frame
      ctx.clearRect(0, 0, width, height);

      // If virtually invisible and activeRef is false, sleep rendering loop
      if (currentAlpha <= 0.005 && !activeRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.globalAlpha = currentAlpha;

      // Ambient oscillating winter wind
      const ambientWind = Math.sin(time * 0.4) * 0.45;

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];

        // Update physics
        flake.swayAngle += flake.swaySpeed;
        const sway = Math.sin(flake.swayAngle) * flake.swayAmp;

        // Mouse proximity wind blast
        let mouseForceX = 0;
        let mouseForceY = 0;
        if (mouseX > -9000) {
          const dx = flake.x - mouseX;
          const dy = flake.y - mouseY;
          const dist = Math.hypot(dx, dy);
          const maxDist = 110;

          if (dist < maxDist && dist > 0.1) {
            const push = (1 - dist / maxDist) * 1.5;
            mouseForceX = (dx / dist) * push + mouseVelocityX * 0.6 * (1 - dist / maxDist);
            mouseForceY = (dy / dist) * push * 0.5;
          }
        }

        flake.x += flake.speedX + ambientWind * (flake.z * 0.6 + 0.4) + sway * 0.5 + mouseForceX;
        flake.y += flake.speedY + mouseForceY;
        flake.rotation += flake.rotationSpeed;

        // Wrap around screen boundaries with natural reset
        if (flake.y > height + 20) {
          flake.y = -20;
          flake.x = Math.random() * width;
        } else if (flake.y < -30) {
          flake.y = height + 10;
        }

        if (flake.x > width + 20) {
          flake.x = -20;
        } else if (flake.x < -20) {
          flake.x = width + 20;
        }

        // Draw Snowflake
        if (flake.isCrystal) {
          drawSnowflakeCrystal(flake.x, flake.y, flake.radius, flake.opacity, flake.rotation);
        } else {
          // Soft luminous round flake with subtle glow
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);

          if (flake.z > 0.65) {
            // Foreground flake: soft radial gradient for a magical fluffy snow look
            const grad = ctx.createRadialGradient(
              flake.x,
              flake.y,
              0,
              flake.x,
              flake.y,
              flake.radius * 1.4
            );
            grad.addColorStop(0, `rgba(255, 255, 255, ${flake.opacity})`);
            grad.addColorStop(0.65, `rgba(240, 249, 255, ${flake.opacity * 0.75})`);
            grad.addColorStop(1, "rgba(224, 242, 254, 0)");
            ctx.fillStyle = grad;
          } else {
            ctx.fillStyle = `rgba(248, 250, 252, ${flake.opacity})`;
          }

          ctx.fill();
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause animation when page tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastMouseMoveTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-20"
      aria-hidden="true"
      style={{ willChange: "transform" }}
    />
  );
}

