import React, { useEffect, useRef } from "react";

/**
 * SpaceBackground
 * Deep Space Cosmic Starfield with moving stars, depth parallax,
 * subtle twinkling, soft nebula dust clouds, and occasional shooting stars.
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
    const starCount = isMobile ? 140 : 280;

    // Star color palette (White, Ice Blue, Celestial Gold)
    const starColors = [
      "rgba(255, 255, 255, ",
      "rgba(240, 246, 255, ",
      "rgba(147, 197, 253, ",
      "rgba(96, 165, 250, ",
      "rgba(253, 224, 71, ",
      "rgba(251, 191, 36, "
    ];

    // Initialize stars with 3D depth (z)
    const stars = Array.from({ length: starCount }, () => {
      const z = Math.random() * 1.5 + 0.2; // depth layer: 0.2 (distant) to 1.7 (near)
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: z,
        baseRadius: (Math.random() * 1.2 + 0.4) * z,
        colorPrefix: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: Math.random() * 0.5 + 0.35,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.15 * z,
        vy: (Math.random() * 0.2 + 0.08) * z, // gentle downward cosmic drift
        crossGlow: z > 1.4 && Math.random() < 0.25 // Brightest stars have subtle 4-point cross diffraction
      };
    });

    // Shooting stars / meteors
    const shootingStars = [];
    let lastShootingStarTime = performance.now();

    function spawnShootingStar() {
      shootingStars.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: Math.random() * height * 0.4,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 8 + 12,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg diagonal streak
        alpha: 1.0,
        decay: Math.random() * 0.02 + 0.015,
        color: Math.random() < 0.7 ? "251, 191, 36" : "147, 197, 253"
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

      // Deep Cosmic Space Clear (Rich Deep Space Black #02040A)
      ctx.fillStyle = "#02040A";
      ctx.fillRect(0, 0, width, height);

      // 1. Soft Cosmic Nebula Glows in Background
      const nebula1 = ctx.createRadialGradient(
        width * 0.2 + mouseX * 0.3,
        height * 0.3 + mouseY * 0.3,
        0,
        width * 0.2,
        height * 0.3,
        width * 0.45
      );
      nebula1.addColorStop(0, "rgba(29, 78, 216, 0.07)");
      nebula1.addColorStop(0.6, "rgba(30, 58, 138, 0.03)");
      nebula1.addColorStop(1, "rgba(2, 4, 10, 0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.8 - mouseX * 0.4,
        height * 0.7 - mouseY * 0.4,
        0,
        width * 0.8,
        height * 0.7,
        width * 0.5
      );
      nebula2.addColorStop(0, "rgba(245, 158, 11, 0.05)");
      nebula2.addColorStop(0.5, "rgba(180, 83, 9, 0.02)");
      nebula2.addColorStop(1, "rgba(2, 4, 10, 0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // 2. Render & Move Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen boundaries
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;
        if (star.y < -10) star.y = height + 10;
        if (star.y > height + 10) star.y = -10;

        // Parallax position
        const drawX = star.x + mouseX * star.z;
        const drawY = star.y + mouseY * star.z;

        // Twinkle Alpha calculation
        const twinkle = Math.sin(time * 3.0 * star.twinkleSpeed + star.twinklePhase);
        const currentAlpha = Math.max(0.1, Math.min(1.0, star.baseAlpha + twinkle * 0.3));

        // Draw Star Disc
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = star.colorPrefix + currentAlpha + ")";
        ctx.fill();

        // 4-Point Diffraction Cross for prominent bright foreground stars
        if (star.crossGlow && currentAlpha > 0.6) {
          ctx.strokeStyle = star.colorPrefix + (currentAlpha * 0.45) + ")";
          ctx.lineWidth = 0.75;
          const beamLen = star.baseRadius * 3.5;

          ctx.beginPath();
          ctx.moveTo(drawX - beamLen, drawY);
          ctx.lineTo(drawX + beamLen, drawY);
          ctx.moveTo(drawX, drawY - beamLen);
          ctx.lineTo(drawX, drawY + beamLen);
          ctx.stroke();
        }
      }

      // 3. Spawn & Render Shooting Stars / Meteors
      const now = performance.now();
      if (now - lastShootingStarTime > 4500 && Math.random() < 0.02) {
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
        grad.addColorStop(0.7, `rgba(${s.color}, ${s.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Bright meteor head
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#02040A]"
      style={{ willChange: "transform" }}
    />
  );
}
