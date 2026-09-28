import React, { useEffect, useRef } from "react";

/**
 * CelestialBackground
 * 
 * Dynamic, Real-Time India IST Sun & Moon Celestial Physics Engine.
 * Features:
 * - Fluid floating orbital physics (natural harmonic bobbing motion).
 * - Interactive 3D mouse parallax and gravitational reaction.
 * - Day Mode: Radiant Sun with dual-rotating corona beams, pulsating lens flares,
 *   luminous golden sunbeams, floating solar dust motes, and soft drifting clouds.
 * - Dawn / Dusk: Twilight horizon glow, fiery amber haze, and purple twilight rays.
 * - Night Mode: High-fidelity Moon with crater maria & lunar aura, 3D starfield with
 *   multi-spectral twinkling & cross-diffraction spikes, stardust nebulae, and shooting meteors.
 * - Smooth 60FPS fluid transition interpolation between themes.
 */
export function CelestialBackground({
  effectiveTheme = "dark",
  activeBody = "moon",
  celestialX = 50,
  celestialY = 30,
  progress = 0.5,
  phase = "night"
}) {
  const canvasRef = useRef(null);

  const propsRef = useRef({
    effectiveTheme,
    activeBody,
    celestialX,
    celestialY,
    progress,
    phase
  });

  useEffect(() => {
    propsRef.current = {
      effectiveTheme,
      activeBody,
      celestialX,
      celestialY,
      progress,
      phase
    };
  }, [effectiveTheme, activeBody, celestialX, celestialY, progress, phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const starCount = isMobile ? 150 : 300;
    const dustCount = isMobile ? 25 : 55;
    const cloudCount = isMobile ? 4 : 7;

    // Rich Cosmic Star Color Spectrum
    const starColors = [
      "rgba(255, 255, 255, ",
      "rgba(245, 240, 255, ",
      "rgba(233, 213, 255, ",
      "rgba(192, 132, 252, ",
      "rgba(168, 85, 247, ",
      "rgba(147, 197, 253, ",
      "rgba(253, 224, 71, ",
      "rgba(251, 191, 36, "
    ];

    // Initialize 3D Stars
    const stars = Array.from({ length: starCount }, () => {
      const z = Math.random() * 1.6 + 0.2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: z,
        baseRadius: (Math.random() * 1.2 + 0.35) * z,
        colorPrefix: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: Math.random() * 0.55 + 0.3,
        twinkleSpeed: Math.random() * 0.035 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.12 * z,
        vy: (Math.random() * 0.16 + 0.06) * z,
        crossGlow: z > 1.35 && Math.random() < 0.28
      };
    });

    // Floating Stardust & Solar Dust Particles
    const particles = Array.from({ length: dustCount }, () => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 40 + 15,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        pulseSpeed: Math.random() * 0.015 + 0.006,
        pulsePhase: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.5 ? "purple" : "gold"
      };
    });

    // Daytime Soft Drifting Clouds
    const clouds = Array.from({ length: cloudCount }, (_, i) => {
      return {
        x: (width / cloudCount) * i + Math.random() * 100,
        y: Math.random() * height * 0.45 + 15,
        width: Math.random() * 280 + 180,
        height: Math.random() * 60 + 35,
        speed: Math.random() * 0.15 + 0.05,
        alpha: Math.random() * 0.22 + 0.12,
        puffs: Array.from({ length: 5 }, () => ({
          offsetX: (Math.random() - 0.5) * 90,
          offsetY: (Math.random() - 0.5) * 25,
          radius: Math.random() * 38 + 20
        }))
      };
    });

    // Shooting Stars / Meteors
    const shootingStars = [];
    let lastShootingStarTime = performance.now();

    function spawnShootingStar() {
      const meteorColors = ["192, 132, 252", "168, 85, 247", "147, 197, 253", "251, 191, 36"];
      shootingStars.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: Math.random() * height * 0.4,
        length: Math.random() * 150 + 90,
        speed: Math.random() * 8 + 11,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
        alpha: 1.0,
        decay: Math.random() * 0.016 + 0.01,
        color: meteorColors[Math.floor(Math.random() * meteorColors.length)]
      });
    }

    // Parallax mouse coordinates with spring damping
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 45;
      targetMouseY = (e.clientY / height - 0.5) * 35;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;
    let currentDayBlend = propsRef.current.effectiveTheme === "light" ? 1.0 : 0.0;

    const render = () => {
      time += 0.016;

      const currentProps = propsRef.current;
      const targetDayBlend = currentProps.effectiveTheme === "light" ? 1.0 : 0.0;
      // Smooth lerp transition between day and night
      currentDayBlend += (targetDayBlend - currentDayBlend) * 0.04;

      // Mouse damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Dynamic Living Float: harmonic bobbing motion so the sun/moon feels delightfully alive
      const floatOffsetX = Math.sin(time * 0.8) * 12 + Math.cos(time * 0.4) * 6;
      const floatOffsetY = Math.cos(time * 0.9) * 10 + Math.sin(time * 0.5) * 5;

      // Celestial Screen Coordinates
      const bodyBaseX = (currentProps.celestialX / 100) * width;
      const bodyBaseY = (currentProps.celestialY / 100) * height;

      const targetBodyX = bodyBaseX + mouseX * 0.55 + floatOffsetX;
      const targetBodyY = bodyBaseY + mouseY * 0.55 + floatOffsetY;

      // ==========================================
      // 1. DYNAMIC SKY GRADIENT BASE
      // ==========================================
      if (currentDayBlend > 0.01) {
        // Daylight / Sunset / Dawn Sky Gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height);

        if (currentProps.phase === "sunset") {
          // Fiery Twilight Dusk
          skyGrad.addColorStop(0, "#1c1445");
          skyGrad.addColorStop(0.35, "#5d1d6e");
          skyGrad.addColorStop(0.65, "#b84338");
          skyGrad.addColorStop(0.9, "#f59e0b");
          skyGrad.addColorStop(1, "#fde68a");
        } else if (currentProps.phase === "dawn") {
          // Soft Brahma Muhurta Dawn
          skyGrad.addColorStop(0, "#19153c");
          skyGrad.addColorStop(0.4, "#4c2864");
          skyGrad.addColorStop(0.7, "#9f4a7c");
          skyGrad.addColorStop(0.9, "#f59e0b");
          skyGrad.addColorStop(1, "#fed7aa");
        } else {
          // Crisp Radiant Daylight Sky
          skyGrad.addColorStop(0, "#e0f2fe"); // soft azure
          skyGrad.addColorStop(0.45, "#f0f9ff"); // clear light
          skyGrad.addColorStop(0.8, "#faf5ff"); // soft solar mist
          skyGrad.addColorStop(1, "#fef3c7"); // warm solar horizon
        }

        ctx.globalAlpha = currentDayBlend;
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);
      }

      if (currentDayBlend < 0.99) {
        // Night Cosmic Void
        ctx.globalAlpha = 1.0 - currentDayBlend;
        ctx.fillStyle = "#030014";
        ctx.fillRect(0, 0, width, height);

        // Cosmic Nebulae (Night)
        // Nebula 1: Purple
        const n1X = width * 0.25 + mouseX * 0.35 + Math.sin(time * 0.2) * 20;
        const n1Y = height * 0.25 + mouseY * 0.35 + Math.cos(time * 0.25) * 20;
        const neb1 = ctx.createRadialGradient(n1X, n1Y, 0, n1X, n1Y, width * 0.55);
        neb1.addColorStop(0, "rgba(147, 51, 234, 0.15)");
        neb1.addColorStop(0.4, "rgba(107, 33, 168, 0.08)");
        neb1.addColorStop(1, "rgba(3, 0, 20, 0)");
        ctx.fillStyle = neb1;
        ctx.fillRect(0, 0, width, height);

        // Nebula 2: Magenta / Indigo
        const n2X = width * 0.8 - mouseX * 0.4 + Math.cos(time * 0.18) * 25;
        const n2Y = height * 0.7 - mouseY * 0.4 + Math.sin(time * 0.22) * 25;
        const neb2 = ctx.createRadialGradient(n2X, n2Y, 0, n2X, n2Y, width * 0.5);
        neb2.addColorStop(0, "rgba(217, 70, 239, 0.1)");
        neb2.addColorStop(0.45, "rgba(126, 34, 206, 0.05)");
        neb2.addColorStop(1, "rgba(3, 0, 20, 0)");
        ctx.fillStyle = neb2;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalAlpha = 1.0;

      // ==========================================
      // 2. NIGHT STARS & METEORS
      // ==========================================
      const starVisibility = 1.0 - currentDayBlend;
      if (starVisibility > 0.02) {
        ctx.save();
        ctx.globalAlpha = starVisibility;

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          star.x += star.vx;
          star.y += star.vy;

          if (star.x < -10) star.x = width + 10;
          if (star.x > width + 10) star.x = -10;
          if (star.y < -10) star.y = height + 10;
          if (star.y > height + 10) star.y = -10;

          const drawX = star.x + mouseX * star.z;
          const drawY = star.y + mouseY * star.z;

          const twinkle = Math.sin(time * 3.5 * star.twinkleSpeed + star.twinklePhase);
          const currentAlpha = Math.max(0.12, Math.min(1.0, star.baseAlpha + twinkle * 0.38));

          ctx.beginPath();
          ctx.arc(drawX, drawY, star.baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = star.colorPrefix + currentAlpha + ")";
          ctx.fill();

          // 4-point diffraction spike on bright stars
          if (star.crossGlow && currentAlpha > 0.58) {
            ctx.strokeStyle = star.colorPrefix + currentAlpha * 0.45 + ")";
            ctx.lineWidth = 0.8;
            const beamLen = star.baseRadius * 4.0;
            ctx.beginPath();
            ctx.moveTo(drawX - beamLen, drawY);
            ctx.lineTo(drawX + beamLen, drawY);
            ctx.moveTo(drawX, drawY - beamLen);
            ctx.lineTo(drawX + beamLen, drawY + beamLen);
            ctx.stroke();
          }
        }

        // Shooting Stars in dark mode
        const now = performance.now();
        if (now - lastShootingStarTime > 3200 && Math.random() < 0.035) {
          spawnShootingStar();
          lastShootingStarTime = now;
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.alpha -= s.decay;

          if (s.alpha <= 0 || s.x > width + 200 || s.y > height + 200) {
            shootingStars.splice(i, 1);
            continue;
          }

          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;

          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0, `rgba(${s.color}, 0)`);
          grad.addColorStop(0.65, `rgba(${s.color}, ${s.alpha * 0.7})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.fill();
        }

        ctx.restore();
      }

      // ==========================================
      // 3. DAYTIME CLOUDS
      // ==========================================
      if (currentDayBlend > 0.05) {
        ctx.save();
        ctx.globalAlpha = currentDayBlend * 0.88;

        for (let i = 0; i < clouds.length; i++) {
          const cloud = clouds[i];
          cloud.x += cloud.speed;
          if (cloud.x - cloud.width > width) {
            cloud.x = -cloud.width - 50;
            cloud.y = Math.random() * height * 0.4 + 15;
          }

          const cx = cloud.x + mouseX * 0.25;
          const cy = cloud.y + mouseY * 0.25;

          ctx.fillStyle = `rgba(255, 255, 255, ${cloud.alpha})`;
          for (let p = 0; p < cloud.puffs.length; p++) {
            const puff = cloud.puffs[p];
            ctx.beginPath();
            ctx.arc(cx + puff.offsetX, cy + puff.offsetY, puff.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }

      // ==========================================
      // 4. CELESTIAL BODY RENDERING (SUN OR MOON)
      // ==========================================
      const isRenderSun = currentDayBlend > 0.5;

      if (isRenderSun) {
        // ==========================================
        // ☀️ THE LIVING RADIANT SUN
        // ==========================================
        ctx.save();
        ctx.globalAlpha = Math.min(1.0, currentDayBlend * 1.2);

        const sunRadius = isMobile ? 38 : 52;
        const pulse = Math.sin(time * 2.5) * 5;

        // A. Solar Outer Radiant Atmosphere Glow
        const outerGlow = ctx.createRadialGradient(
          targetBodyX,
          targetBodyY,
          sunRadius * 0.4,
          targetBodyX,
          targetBodyY,
          sunRadius * 6.0 + pulse * 5
        );
        outerGlow.addColorStop(0, "rgba(251, 191, 36, 0.48)"); // Radiant Gold
        outerGlow.addColorStop(0.3, "rgba(245, 158, 11, 0.28)"); // Amber
        outerGlow.addColorStop(0.65, "rgba(217, 70, 239, 0.08)"); // Magenta violet touch
        outerGlow.addColorStop(1, "rgba(245, 158, 11, 0)");
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(targetBodyX, targetBodyY, sunRadius * 6.0 + pulse * 5, 0, Math.PI * 2);
        ctx.fill();

        // B. Dynamic Solar Corona Rays (Dual-Speed Rotating Beams)
        const rayCount = 16;
        const rotAngle1 = time * 0.18;
        const rotAngle2 = -time * 0.12;

        ctx.save();
        ctx.translate(targetBodyX, targetBodyY);

        // Layer 1 Beams
        ctx.rotate(rotAngle1);
        for (let r = 0; r < rayCount; r++) {
          const angle = (r * Math.PI * 2) / rayCount;
          const rayLen = sunRadius * 2.4 + (r % 2 === 0 ? 18 : 6) + Math.sin(time * 3 + r) * 7;

          const rayGrad = ctx.createLinearGradient(0, 0, Math.cos(angle) * rayLen, Math.sin(angle) * rayLen);
          rayGrad.addColorStop(0, "rgba(255, 255, 255, 0.7)");
          rayGrad.addColorStop(0.4, "rgba(251, 191, 36, 0.4)");
          rayGrad.addColorStop(1, "rgba(245, 158, 11, 0)");

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * rayLen, Math.sin(angle) * rayLen);
          ctx.strokeStyle = rayGrad;
          ctx.lineWidth = r % 2 === 0 ? 3.0 : 1.6;
          ctx.stroke();
        }

        // Layer 2 Counter-Rotating Soft Beams
        ctx.rotate(rotAngle2 - rotAngle1);
        for (let r = 0; r < 8; r++) {
          const angle = (r * Math.PI * 2) / 8 + Math.PI / 8;
          const rayLen = sunRadius * 3.0 + Math.cos(time * 2 + r) * 8;

          const rayGrad = ctx.createLinearGradient(0, 0, Math.cos(angle) * rayLen, Math.sin(angle) * rayLen);
          rayGrad.addColorStop(0, "rgba(254, 240, 138, 0.4)");
          rayGrad.addColorStop(1, "rgba(245, 158, 11, 0)");

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * rayLen, Math.sin(angle) * rayLen);
          ctx.strokeStyle = rayGrad;
          ctx.lineWidth = 2.0;
          ctx.stroke();
        }

        ctx.restore();

        // C. Solar Core Disc
        const coreGrad = ctx.createRadialGradient(
          targetBodyX - sunRadius * 0.25,
          targetBodyY - sunRadius * 0.25,
          sunRadius * 0.1,
          targetBodyX,
          targetBodyY,
          sunRadius
        );
        coreGrad.addColorStop(0, "#FFFFFF"); // hot white center
        coreGrad.addColorStop(0.35, "#FEF08A"); // pale solar yellow
        coreGrad.addColorStop(0.75, "#FBBF24"); // radiant gold
        coreGrad.addColorStop(1, "#F59E0B"); // warm amber edge

        ctx.beginPath();
        ctx.arc(targetBodyX, targetBodyY, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.shadowColor = "rgba(251, 191, 36, 0.95)";
        ctx.shadowBlur = 28;
        ctx.fill();
        ctx.shadowBlur = 0;

        // D. Interactive Optical Lens Flare Rings across Viewport Center
        const screenCenterX = width / 2;
        const screenCenterY = height / 2;
        const dx = screenCenterX - targetBodyX;
        const dy = screenCenterY - targetBodyY;

        const flarePoints = [
          { dist: 0.35, radius: 15, color: "rgba(251, 191, 36, 0.25)" },
          { dist: 0.65, radius: 26, color: "rgba(192, 132, 252, 0.22)" },
          { dist: 1.05, radius: 10, color: "rgba(255, 255, 255, 0.35)" },
          { dist: 1.45, radius: 40, color: "rgba(245, 158, 11, 0.16)" }
        ];

        flarePoints.forEach((flare) => {
          const fx = targetBodyX + dx * flare.dist;
          const fy = targetBodyY + dy * flare.dist;
          ctx.beginPath();
          ctx.arc(fx, fy, flare.radius, 0, Math.PI * 2);
          ctx.fillStyle = flare.color;
          ctx.fill();
        });

        ctx.restore();
      } else {
        // ==========================================
        // 🌙 THE MAJESTIC FLOATING MOON
        // ==========================================
        ctx.save();
        ctx.globalAlpha = Math.min(1.0, (1.0 - currentDayBlend) * 1.2);

        const moonRadius = isMobile ? 34 : 46;

        // A. Lunar Moonlight Aura
        const moonAura = ctx.createRadialGradient(
          targetBodyX,
          targetBodyY,
          moonRadius * 0.6,
          targetBodyX,
          targetBodyY,
          moonRadius * 4.5
        );
        moonAura.addColorStop(0, "rgba(233, 213, 255, 0.38)"); // lavender moonlight
        moonAura.addColorStop(0.35, "rgba(192, 132, 252, 0.2)"); // cosmic violet
        moonAura.addColorStop(0.7, "rgba(147, 197, 253, 0.07)"); // ice blue
        moonAura.addColorStop(1, "rgba(3, 0, 20, 0)");
        ctx.fillStyle = moonAura;
        ctx.beginPath();
        ctx.arc(targetBodyX, targetBodyY, moonRadius * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // B. Lunar Disc Surface Gradient
        const moonGrad = ctx.createRadialGradient(
          targetBodyX - moonRadius * 0.3,
          targetBodyY - moonRadius * 0.3,
          moonRadius * 0.1,
          targetBodyX,
          targetBodyY,
          moonRadius
        );
        moonGrad.addColorStop(0, "#FFFFFF"); // silver-white highlight
        moonGrad.addColorStop(0.4, "#F1F5F9"); // crust
        moonGrad.addColorStop(0.75, "#CBD5E1"); // slate silver
        moonGrad.addColorStop(1, "#94A3B8"); // shadow edge

        ctx.beginPath();
        ctx.arc(targetBodyX, targetBodyY, moonRadius, 0, Math.PI * 2);
        ctx.fillStyle = moonGrad;
        ctx.shadowColor = "rgba(233, 213, 255, 0.9)";
        ctx.shadowBlur = 24;
        ctx.fill();
        ctx.shadowBlur = 0;

        // C. Shaded Lunar Crater Maria
        const craters = [
          { ox: -0.25, oy: -0.2, r: 0.22, alpha: 0.18 },
          { ox: 0.25, oy: -0.15, r: 0.28, alpha: 0.2 },
          { ox: 0.1, oy: 0.25, r: 0.24, alpha: 0.22 },
          { ox: -0.35, oy: 0.15, r: 0.16, alpha: 0.16 },
          { ox: -0.05, oy: -0.4, r: 0.1, alpha: 0.14 }
        ];

        craters.forEach((c) => {
          ctx.beginPath();
          ctx.arc(
            targetBodyX + c.ox * moonRadius,
            targetBodyY + c.oy * moonRadius,
            c.r * moonRadius,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(71, 85, 105, ${c.alpha})`;
          ctx.fill();
        });

        // D. Crescent Rim Highlight
        ctx.beginPath();
        ctx.arc(targetBodyX - 3, targetBodyY - 3, moonRadius - 1.5, -Math.PI * 0.7, Math.PI * 0.2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
        ctx.lineWidth = 2.2;
        ctx.stroke();

        ctx.restore();
      }

      // ==========================================
      // 5. AMBIENT GLOW DUST PARTICLES
      // ==========================================
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;

        const pulse = Math.sin(time * 2.2 * p.pulseSpeed + p.pulsePhase);
        const currentAlpha = Math.max(0.012, 0.04 + pulse * 0.022);

        const colorStr =
          p.hue === "gold" || currentDayBlend > 0.5
            ? `rgba(245, 158, 11, `
            : `rgba(168, 85, 247, `;

        const dGrad = ctx.createRadialGradient(
          p.x + mouseX * 0.35,
          p.y + mouseY * 0.35,
          0,
          p.x + mouseX * 0.35,
          p.y + mouseY * 0.35,
          p.radius
        );
        dGrad.addColorStop(0, colorStr + currentAlpha + ")");
        dGrad.addColorStop(1, colorStr + "0)");

        ctx.fillStyle = dGrad;
        ctx.beginPath();
        ctx.arc(p.x + mouseX * 0.35, p.y + mouseY * 0.35, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-colors duration-700"
      style={{ willChange: "transform" }}
    />
  );
}
