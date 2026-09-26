import React, { useEffect, useRef } from "react";

/**
 * SpaceBackground
 * Ultra-Deep Cosmic Space Starfield with multi-layered purple & indigo nebulae,
 * drifting stardust particles, 3D depth parallax, twinkling star spectrum,
 * diffraction spikes, and cosmic shooting stars / meteors.
 */
export function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const starCount = isMobile ? 160 : 320;
    const dustCount = isMobile ? 25 : 50;

    // Rich Cosmic Star color palette: White, Lavender, Electric Violet, Purple, Cyan, Gold
    const starColors = [
      "rgba(255, 255, 255, ",     // Pure Starlight White
      "rgba(245, 240, 255, ",     // Soft Stellar White
      "rgba(233, 213, 255, ",     // Lavender Nebula
      "rgba(192, 132, 252, ",     // Cosmic Violet
      "rgba(168, 85, 247, ",      // Electric Purple
      "rgba(147, 197, 253, ",     // Celestial Ice Blue
      "rgba(165, 243, 252, ",     // Cyan Glow
      "rgba(253, 224, 71, ",      // Warm Amber Star
      "rgba(251, 191, 36, "       // Radiant Gold
    ];

    // Initialize stars with 3D depth (z)
    const stars = Array.from({ length: starCount }, () => {
      const z = Math.random() * 1.6 + 0.2; // depth layer: 0.2 (distant) to 1.8 (near)
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: z,
        baseRadius: (Math.random() * 1.25 + 0.35) * z,
        colorPrefix: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: Math.random() * 0.55 + 0.3,
        twinkleSpeed: Math.random() * 0.035 + 0.012,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.12 * z,
        vy: (Math.random() * 0.18 + 0.06) * z, // gentle downward cosmic drift
        crossGlow: z > 1.35 && Math.random() < 0.28 // Brightest stars have 4-point cross diffraction
      };
    });

    // Cosmic stardust / glowing interstellar gas particles
    const dustParticles = Array.from({ length: dustCount }, () => {
      const colors = [
        "rgba(168, 85, 247, ", // Purple
        "rgba(192, 132, 252, ", // Violet
        "rgba(99, 102, 241, ",  // Indigo
        "rgba(56, 189, 248, ",  // Celestial Cyan
        "rgba(245, 158, 11, "   // Amber Gold
      ];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 40 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.04 + 0.015,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.5) * 0.08,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2
      };
    });

    // Shooting stars / meteors
    const shootingStars = [];
    let lastShootingStarTime = performance.now();

    function spawnShootingStar() {
      const meteorColors = [
        "192, 132, 252", // Cosmic Purple
        "168, 85, 247", // Violet
        "147, 197, 253", // Celestial Cyan/Blue
        "251, 191, 36"   // Gold
      ];
      shootingStars.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: Math.random() * height * 0.45,
        length: Math.random() * 130 + 80,
        speed: Math.random() * 7 + 10,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25, // ~45 deg diagonal streak
        alpha: 1.0,
        decay: Math.random() * 0.018 + 0.012,
        color: meteorColors[Math.floor(Math.random() * meteorColors.length)]
      });
    }

    // Mouse Parallax
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

    const render = () => {
      time += 0.016;

      // Mouse damping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Deep Cosmic Space Clear (Rich Purple-Black Void #030014)
      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, width, height);

      // 1. Dynamic Deep Space Purple & Violet Nebulae
      // Nebula 1: Upper-Left Cosmic Purple & Violet Cloud
      const nebula1X = width * 0.25 + mouseX * 0.35 + Math.sin(time * 0.2) * 15;
      const nebula1Y = height * 0.25 + mouseY * 0.35 + Math.cos(time * 0.25) * 15;
      const nebula1 = ctx.createRadialGradient(
        nebula1X,
        nebula1Y,
        0,
        nebula1X,
        nebula1Y,
        width * 0.55
      );
      nebula1.addColorStop(0, "rgba(147, 51, 234, 0.13)");   // Vibrant Purple core
      nebula1.addColorStop(0.35, "rgba(107, 33, 168, 0.08)"); // Deep Violet
      nebula1.addColorStop(0.7, "rgba(46, 16, 101, 0.03)");  // Indigo dust
      nebula1.addColorStop(1, "rgba(3, 0, 20, 0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      // Nebula 2: Lower-Right Cosmic Magenta & Indigo Glow
      const nebula2X = width * 0.8 - mouseX * 0.4 + Math.cos(time * 0.18) * 20;
      const nebula2Y = height * 0.7 - mouseY * 0.4 + Math.sin(time * 0.22) * 20;
      const nebula2 = ctx.createRadialGradient(
        nebula2X,
        nebula2Y,
        0,
        nebula2X,
        nebula2Y,
        width * 0.5
      );
      nebula2.addColorStop(0, "rgba(217, 70, 239, 0.09)");   // Electric Magenta / Fuchsia
      nebula2.addColorStop(0.4, "rgba(126, 34, 206, 0.06)");  // Purple mist
      nebula2.addColorStop(0.75, "rgba(67, 56, 202, 0.03)");  // Royal Indigo
      nebula2.addColorStop(1, "rgba(3, 0, 20, 0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Nebula 3: Center-Bottom Subtle Amber & Gold Starlight Dust
      const nebula3X = width * 0.5 + Math.sin(time * 0.15) * 25;
      const nebula3Y = height * 0.85 + Math.cos(time * 0.15) * 15;
      const nebula3 = ctx.createRadialGradient(
        nebula3X,
        nebula3Y,
        0,
        nebula3X,
        nebula3Y,
        width * 0.42
      );
      nebula3.addColorStop(0, "rgba(245, 158, 11, 0.05)");   // Amber Gold
      nebula3.addColorStop(0.5, "rgba(147, 51, 234, 0.03)"); // Soft Purple
      nebula3.addColorStop(1, "rgba(3, 0, 20, 0)");
      ctx.fillStyle = nebula3;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Cosmic Stardust Clusters
      for (let i = 0; i < dustParticles.length; i++) {
        const dust = dustParticles[i];
        dust.x += dust.speedX;
        dust.y += dust.speedY;

        if (dust.x < -dust.radius) dust.x = width + dust.radius;
        if (dust.x > width + dust.radius) dust.x = -dust.radius;
        if (dust.y < -dust.radius) dust.y = height + dust.radius;
        if (dust.y > height + dust.radius) dust.y = -dust.radius;

        const pulse = Math.sin(time * 2.0 * dust.pulseSpeed + dust.pulsePhase);
        const currentAlpha = Math.max(0.008, dust.alpha + pulse * 0.015);

        const dustGrad = ctx.createRadialGradient(
          dust.x + mouseX * 0.5,
          dust.y + mouseY * 0.5,
          0,
          dust.x + mouseX * 0.5,
          dust.y + mouseY * 0.5,
          dust.radius
        );
        dustGrad.addColorStop(0, dust.color + currentAlpha + ")");
        dustGrad.addColorStop(1, dust.color + "0)");
        ctx.fillStyle = dustGrad;
        ctx.beginPath();
        ctx.arc(dust.x + mouseX * 0.5, dust.y + mouseY * 0.5, dust.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Render & Move Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star
        star.x += star.vx;
        star.y += star.vy;

        // Screen wrap
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;
        if (star.y < -10) star.y = height + 10;
        if (star.y > height + 10) star.y = -10;

        // Parallax position
        const drawX = star.x + mouseX * star.z;
        const drawY = star.y + mouseY * star.z;

        // Twinkle Alpha calculation
        const twinkle = Math.sin(time * 3.2 * star.twinkleSpeed + star.twinklePhase);
        const currentAlpha = Math.max(0.12, Math.min(1.0, star.baseAlpha + twinkle * 0.35));

        // Draw Star Disc
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = star.colorPrefix + currentAlpha + ")";
        ctx.fill();

        // 4-Point Diffraction Cross for prominent bright foreground stars
        if (star.crossGlow && currentAlpha > 0.58) {
          ctx.strokeStyle = star.colorPrefix + (currentAlpha * 0.48) + ")";
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

      // 4. Spawn & Render Shooting Stars / Meteors
      const now = performance.now();
      if (now - lastShootingStarTime > 4000 && Math.random() < 0.025) {
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
        grad.addColorStop(0.65, `rgba(${s.color}, ${s.alpha * 0.65})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Bright meteor head
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.shadowColor = `rgba(${s.color}, 0.8)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#030014]"
      style={{ willChange: "transform" }}
    />
  );
}
