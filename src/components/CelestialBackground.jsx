import React, { useEffect, useRef } from "react";

/**
 * CelestialBackground
 * 
 * Dynamic Real-Time India IST Sun & Moon Celestial Canvas Engine.
 * - During Day / Light Mode: Renders radiant Sun with pulsating solar corona,
 *   golden diffraction rays, optical lens flare rings, drifting soft clouds, and warm daylight sky.
 * - During Dawn / Sunset: Renders fiery twilight sky, horizon haze, and golden amber solar glows.
 * - During Night / Dark Mode: Renders realistic Moon with crater maria & lunar halo,
 *   multi-layered cosmic purple nebulae, 3D starfield with twinkle & diffraction crosses,
 *   glowing stardust, and shooting meteors.
 * - Smoothly interpolates transitions between Day and Night.
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

  // Store latest props in refs for animation loop
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
    const starCount = isMobile ? 140 : 280;
    const dustCount = isMobile ? 20 : 45;
    const cloudCount = isMobile ? 4 : 7;

    // Rich Night Star Palette
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

    // Initialize Night Stars
    const stars = Array.from({ length: starCount }, () => {
      const z = Math.random() * 1.6 + 0.2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: z,
        baseRadius: (Math.random() * 1.25 + 0.35) * z,
        colorPrefix: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: Math.random() * 0.55 + 0.3,
        twinkleSpeed: Math.random() * 0.035 + 0.012,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.1 * z,
        vy: (Math.random() * 0.15 + 0.05) * z,
        crossGlow: z > 1.35 && Math.random() < 0.25
      };
    });

    // Cosmic Dust & Daylight Solar Particles
    const dustParticles = Array.from({ length: dustCount }, () => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 45 + 20,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        pulseSpeed: Math.random() * 0.012 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.5 ? "purple" : "gold"
      };
    });

    // Daytime Soft Clouds
    const clouds = Array.from({ length: cloudCount }, (_, i) => {
      return {
        x: (width / cloudCount) * i + Math.random() * 100,
        y: Math.random() * height * 0.45 + 20,
        width: Math.random() * 260 + 160,
        height: Math.random() * 60 + 35,
        speed: Math.random() * 0.12 + 0.04,
        alpha: Math.random() * 0.25 + 0.15,
        puffs: Array.from({ length: 5 }, () => ({
          offsetX: (Math.random() - 0.5) * 80,
          offsetY: (Math.random() - 0.5) * 20,
          radius: Math.random() * 35 + 20
        }))
      };
    });

    // Shooting stars / Meteors
    const shootingStars = [];
    let lastShootingStarTime = performance.now();

    function spawnShootingStar() {
      const meteorColors = ["192, 132, 252", "168, 85, 247", "147, 197, 253", "251, 191, 36"];
      shootingStars.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: Math.random() * height * 0.45,
        length: Math.random() * 140 + 80,
        speed: Math.random() * 7 + 10,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
        alpha: 1.0,
        decay: Math.random() * 0.018 + 0.012,
        color: meteorColors[Math.floor(Math.random() * meteorColors.length)]
      });
    }

    // Parallax mouse variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 35;
      targetMouseY = (e.clientY / height - 0.5) * 25;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;
    // Current daylight blend factor: 0 = night, 1 = day
    let currentDayBlend = propsRef.current.effectiveTheme === "light" ? 1.0 : 0.0;

    const render = () => {
      time += 0.016;

      const currentProps = propsRef.current;
      const targetDayBlend = currentProps.effectiveTheme === "light" ? 1.0 : 0.0;
      // Smooth lerp transition between day and night
      currentDayBlend += (targetDayBlend - currentDayBlend) * 0.04;

      // Mouse damping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Compute target celestial screen coordinates
      const targetBodyX = (currentProps.celestialX / 100) * width + mouseX * 0.4;
      const targetBodyY = (currentProps.celestialY / 100) * height + mouseY * 0.4;

      // ==========================================
      // 1. SKY BACKGROUND BASE GRADIENT
      // ==========================================
      if (currentDayBlend > 0.01) {
        // Daytime / Sunset / Dawn Sky Gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height);

        if (currentProps.phase === "sunset") {
          // Fiery Twilight Dusk Gradient
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
          skyGrad.addColorStop(0, "#e0f2fe"); // soft azure sky
          skyGrad.addColorStop(0.4, "#f0f9ff"); // crisp clear air
          skyGrad.addColorStop(0.75, "#faf5ff"); // soft purple/solar mist
          skyGrad.addColorStop(1, "#fef3c7"); // warm solar horizon
        }

        ctx.globalAlpha = currentDayBlend;
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);
      }

      if (currentDayBlend < 0.99) {
        // Night Cosmic Void Gradient
        ctx.globalAlpha = 1.0 - currentDayBlend;
        ctx.fillStyle = "#030014";
        ctx.fillRect(0, 0, width, height);

        // Cosmic Nebulae (Night)
        // Nebula 1: Purple
        const n1X = width * 0.25 + mouseX * 0.35 + Math.sin(time * 0.2) * 15;
        const n1Y = height * 0.25 + mouseY * 0.35 + Math.cos(time * 0.25) * 15;
        const neb1 = ctx.createRadialGradient(n1X, n1Y, 0, n1X, n1Y, width * 0.55);
        neb1.addColorStop(0, "rgba(147, 51, 234, 0.14)");
        neb1.addColorStop(0.4, "rgba(107, 33, 168, 0.08)");
        neb1.addColorStop(1, "rgba(3, 0, 20, 0)");
        ctx.fillStyle = neb1;
        ctx.fillRect(0, 0, width, height);

        // Nebula 2: Magenta / Violet
        const n2X = width * 0.8 - mouseX * 0.4 + Math.cos(time * 0.18) * 20;
        const n2Y = height * 0.7 - mouseY * 0.4 + Math.sin(time * 0.22) * 20;
        const neb2 = ctx.createRadialGradient(n2X, n2Y, 0, n2X, n2Y, width * 0.5);
        neb2.addColorStop(0, "rgba(217, 70, 239, 0.09)");
        neb2.addColorStop(0.45, "rgba(126, 34, 206, 0.05)");
        neb2.addColorStop(1, "rgba(3, 0, 20, 0)");
        ctx.fillStyle = neb2;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalAlpha = 1.0;

      // ==========================================
      // 2. NIGHT STARS & METEORS (Fades in Night)
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

          const twinkle = Math.sin(time * 3.2 * star.twinkleSpeed + star.twinklePhase);
          const currentAlpha = Math.max(0.12, Math.min(1.0, star.baseAlpha + twinkle * 0.35));

          ctx.beginPath();
          ctx.arc(drawX, drawY, star.baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = star.colorPrefix + currentAlpha + ")";
          ctx.fill();

          // 4-point cross diffraction on bright stars
          if (star.crossGlow && currentAlpha > 0.6) {
            ctx.strokeStyle = star.colorPrefix + currentAlpha * 0.45 + ")";
            ctx.lineWidth = 0.8;
            const beamLen = star.baseRadius * 3.8;
            ctx.beginPath();
            ctx.moveTo(drawX - beamLen, drawY);
            ctx.lineTo(drawX + beamLen, drawY);
            ctx.moveTo(drawX, drawY - beamLen);
            ctx.lineTo(drawX, drawY + beamLen);
            ctx.stroke();
          }
        }

        // Shooting stars in dark mode
        const now = performance.now();
        if (now - lastShootingStarTime > 3800 && Math.random() < 0.03) {
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
          ctx.lineWidth = 1.6;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(s.x, s.y, 2.0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.fill();
        }

        ctx.restore();
      }

      // ==========================================
      // 3. DAYTIME CLOUDS (Drifts during Day)
      // ==========================================
      if (currentDayBlend > 0.05) {
        ctx.save();
        ctx.globalAlpha = currentDayBlend * 0.85;

        for (let i = 0; i < clouds.length; i++) {
          const cloud = clouds[i];
          cloud.x += cloud.speed;
          if (cloud.x - cloud.width > width) {
            cloud.x = -cloud.width - 50;
            cloud.y = Math.random() * height * 0.4 + 20;
          }

          const cx = cloud.x + mouseX * 0.2;
          const cy = cloud.y + mouseY * 0.2;

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
        // ☀️ THE RADIANT SUN
        // ==========================================
        ctx.save();
        ctx.globalAlpha = Math.min(1.0, currentDayBlend * 1.2);

        const sunRadius = isMobile ? 36 : 48;
        const pulse = Math.sin(time * 2.0) * 4;

        // A. Solar Outer Radiant Atmosphere Glow (Large)
        const outerGlow = ctx.createRadialGradient(
          targetBodyX,
          targetBodyY,
          sunRadius * 0.5,
          targetBodyX,
          targetBodyY,
          sunRadius * 5.5 + pulse * 4
        );
        outerGlow.addColorStop(0, "rgba(251, 191, 36, 0.45)"); // Radiant Gold
        outerGlow.addColorStop(0.3, "rgba(245, 158, 11, 0.25)"); // Amber
        outerGlow.addColorStop(0.65, "rgba(217, 70, 239, 0.08)"); // Soft Magenta violet touch
        outerGlow.addColorStop(1, "rgba(245, 158, 11, 0)");
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(targetBodyX, targetBodyY, sunRadius * 5.5 + pulse * 4, 0, Math.PI * 2);
        ctx.fill();

        // B. Solar Corona Rays (Rotating Diffraction Beams)
        const rayCount = 12;
        const rotAngle = time * 0.15;
        ctx.save();
        ctx.translate(targetBodyX, targetBodyY);
        ctx.rotate(rotAngle);
        for (let r = 0; r < rayCount; r++) {
          const angle = (r * Math.PI * 2) / rayCount;
          const rayLen = sunRadius * 2.2 + (r % 2 === 0 ? 15 : 5) + Math.sin(time * 3 + r) * 6;

          const rayGrad = ctx.createLinearGradient(0, 0, Math.cos(angle) * rayLen, Math.sin(angle) * rayLen);
          rayGrad.addColorStop(0, "rgba(255, 255, 255, 0.6)");
          rayGrad.addColorStop(0.4, "rgba(251, 191, 36, 0.35)");
          rayGrad.addColorStop(1, "rgba(245, 158, 11, 0)");

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * rayLen, Math.sin(angle) * rayLen);
          ctx.strokeStyle = rayGrad;
          ctx.lineWidth = r % 2 === 0 ? 2.8 : 1.6;
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
        coreGrad.addColorStop(0, "#FFFFFF"); // Pure brilliant white hot center
        coreGrad.addColorStop(0.35, "#FEF08A"); // Pale solar yellow
        coreGrad.addColorStop(0.75, "#FBBF24"); // Radiant Gold
        coreGrad.addColorStop(1, "#F59E0B"); // Warm Amber edge

        ctx.beginPath();
        ctx.arc(targetBodyX, targetBodyY, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.shadowColor = "rgba(251, 191, 36, 0.9)";
        ctx.shadowBlur = 24;
        ctx.fill();
        ctx.shadowBlur = 0;

        // D. Optical Lens Flare Rings across viewport center
        const screenCenterX = width / 2;
        const screenCenterY = height / 2;
        const dx = screenCenterX - targetBodyX;
        const dy = screenCenterY - targetBodyY;

        const flarePoints = [
          { dist: 0.4, radius: 14, color: "rgba(251, 191, 36, 0.25)" },
          { dist: 0.7, radius: 24, color: "rgba(192, 132, 252, 0.2)" },
          { dist: 1.1, radius: 8, color: "rgba(255, 255, 255, 0.3)" },
          { dist: 1.4, radius: 35, color: "rgba(245, 158, 11, 0.15)" }
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
        // 🌙 THE MAJESTIC MOON
        // ==========================================
        ctx.save();
        ctx.globalAlpha = Math.min(1.0, (1.0 - currentDayBlend) * 1.2);

        const moonRadius = isMobile ? 32 : 44;

        // A. Lunar Outer Moonlight Aura
        const moonAura = ctx.createRadialGradient(
          targetBodyX,
          targetBodyY,
          moonRadius * 0.6,
          targetBodyX,
          targetBodyY,
          moonRadius * 4.2
        );
        moonAura.addColorStop(0, "rgba(233, 213, 255, 0.35)"); // Lavender moonlight
        moonAura.addColorStop(0.35, "rgba(192, 132, 252, 0.18)"); // Cosmic violet
        moonAura.addColorStop(0.7, "rgba(147, 197, 253, 0.06)"); // Ice blue
        moonAura.addColorStop(1, "rgba(3, 0, 20, 0)");
        ctx.fillStyle = moonAura;
        ctx.beginPath();
        ctx.arc(targetBodyX, targetBodyY, moonRadius * 4.2, 0, Math.PI * 2);
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
        moonGrad.addColorStop(0, "#FFFFFF"); // Bright silver-white highlight
        moonGrad.addColorStop(0.4, "#F1F5F9"); // Lunar crust
        moonGrad.addColorStop(0.75, "#CBD5E1"); // Slate silver
        moonGrad.addColorStop(1, "#94A3B8"); // Shadowed terminator edge

        ctx.beginPath();
        ctx.arc(targetBodyX, targetBodyY, moonRadius, 0, Math.PI * 2);
        ctx.fillStyle = moonGrad;
        ctx.shadowColor = "rgba(233, 213, 255, 0.85)";
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        // C. Shaded Lunar Crater Maria (Realistic Moon Features)
        const craters = [
          { ox: -0.25, oy: -0.2, r: 0.22, alpha: 0.18 }, // Mare Imbrium
          { ox: 0.25, oy: -0.15, r: 0.28, alpha: 0.2 },  // Mare Serenitatis
          { ox: 0.1, oy: 0.25, r: 0.24, alpha: 0.22 },   // Mare Tranquillitatis
          { ox: -0.35, oy: 0.15, r: 0.16, alpha: 0.16 }, // Oceanus Procellarum
          { ox: -0.05, oy: -0.4, r: 0.1, alpha: 0.14 }   // Tycho ray crater
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

        // D. Subtle Soft Lunar Crescent Ring Highlight
        ctx.beginPath();
        ctx.arc(targetBodyX - 3, targetBodyY - 3, moonRadius - 1.5, -Math.PI * 0.7, Math.PI * 0.2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = 2.0;
        ctx.stroke();

        ctx.restore();
      }

      // ==========================================
      // 5. AMBIENT GLOW DUST PARTICLES
      // ==========================================
      for (let i = 0; i < dustParticles.length; i++) {
        const dust = dustParticles[i];
        dust.x += dust.speedX;
        dust.y += dust.speedY;

        if (dust.x < -dust.radius) dust.x = width + dust.radius;
        if (dust.x > width + dust.radius) dust.x = -dust.radius;
        if (dust.y < -dust.radius) dust.y = height + dust.radius;
        if (dust.y > height + dust.radius) dust.y = -dust.radius;

        const pulse = Math.sin(time * 2.0 * dust.pulseSpeed + dust.pulsePhase);
        const currentAlpha = Math.max(0.01, 0.035 + pulse * 0.02);

        const colorStr =
          dust.hue === "gold" || currentDayBlend > 0.5
            ? `rgba(245, 158, 11, `
            : `rgba(168, 85, 247, `;

        const dGrad = ctx.createRadialGradient(
          dust.x + mouseX * 0.3,
          dust.y + mouseY * 0.3,
          0,
          dust.x + mouseX * 0.3,
          dust.y + mouseY * 0.3,
          dust.radius
        );
        dGrad.addColorStop(0, colorStr + currentAlpha + ")");
        dGrad.addColorStop(1, colorStr + "0)");

        ctx.fillStyle = dGrad;
        ctx.beginPath();
        ctx.arc(dust.x + mouseX * 0.3, dust.y + mouseY * 0.3, dust.radius, 0, Math.PI * 2);
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
