import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Activity, ShieldCheck, Cpu, Code2, Globe } from "lucide-react";
import { soundManager } from "../utils/sound";

export function HeroVisual3D() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState("");

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Parallax tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Canvas 3D Geometric Polyhedron & Particle Nodal Mesh
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 500);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 500);

    // 3D Nodes for an Icosahedron / Nodal Sphere
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ];

    // Normalize and scale vertices
    const radius = Math.min(width, height) * 0.28;
    const vertices = baseVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [(x / len) * radius, (y / len) * radius, (z / len) * radius];
    });

    // Particle field around mesh
    const particles = Array.from({ length: 40 }, () => ({
      x: (Math.random() - 0.5) * radius * 2.8,
      y: (Math.random() - 0.5) * radius * 2.8,
      z: (Math.random() - 0.5) * radius * 2.8,
      size: Math.random() * 2 + 1,
      speed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1)
    }));

    let rotX = 0.3;
    let rotY = 0.4;
    let rotZ = 0.1;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth auto-rotation + mouse influence
      rotY += 0.006 + mouseOffset.x * 0.02;
      rotX += 0.004 + mouseOffset.y * 0.02;
      rotZ += 0.002;

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      // Rotate vertex helper
      const project = ([vx, vy, vz]) => {
        // Y-axis rotation
        let x1 = vx * cosY + vz * sinY;
        let y1 = vy;
        let z1 = -vx * sinY + vz * cosY;

        // X-axis rotation
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Z-axis rotation
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        const fov = 400;
        const scale = Math.max(0.1, fov / Math.max(20, fov + z3 + 120));
        return {
          x: width / 2 + x3 * scale,
          y: height / 2 + y3 * scale,
          z: z3,
          scale
        };
      };

      const projected = vertices.map(project);

      // Draw subtle connections between vertices
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius * 1.5) {
            const alpha = Math.max(0.04, 0.22 - dist / (radius * 1.5));
            ctx.strokeStyle = `rgba(18, 60, 47, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw projected nodes
      projected.forEach((p, idx) => {
        const nodeAlpha = Math.min(1, Math.max(0.2, (p.z + radius) / (2 * radius)));
        ctx.fillStyle = idx % 2 === 0 ? `rgba(18, 60, 47, ${nodeAlpha})` : `rgba(212, 175, 55, ${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, 3 * p.scale), 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw floating subtle ambient particles
      particles.forEach((pt) => {
        pt.x += Math.sin(rotX) * 0.4;
        pt.y += Math.cos(rotY) * 0.4;
        const pProj = project([pt.x, pt.y, pt.z]);
        const pAlpha = Math.min(1, Math.max(0.02, 0.15 * pProj.scale));
        ctx.fillStyle = `rgba(18, 60, 47, ${pAlpha})`;
        ctx.beginPath();
        ctx.arc(pProj.x, pProj.y, Math.max(0.5, pt.size * pProj.scale), 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 500;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 500;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseOffset]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center select-none"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#123C2F]/5 via-transparent to-[#D4AF37]/10 rounded-3xl blur-2xl -z-10" />

      {/* Decorative Grid Frame */}
      <div className="absolute inset-4 rounded-3xl border border-[#123C2F]/10 bg-white/40 backdrop-blur-xs pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-40" />
        <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-[#123C2F]/60 uppercase">
          SYS.ID // DAKSH.ENGINEERING
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[10px] text-[#123C2F]/70">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{currentTime || "IST / LIVE"}</span>
        </div>
        <div className="absolute bottom-4 left-4 font-mono text-[9px] text-[#666666]/60">
          LATENCY: &lt;14ms • ML_CORE: ACTIVE
        </div>
        <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#666666]/60">
          2026.V1
        </div>
      </div>

      {/* Canvas 3D Nodal Mesh */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none z-0"
        style={{
          transform: `perspective(1000px) rotateY(${mouseOffset.x * 8}deg) rotateX(${-mouseOffset.y * 8}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      />

      {/* Floating Micro-Element 1: Netram AI Telemetry */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          x: mouseOffset.x * -18,
        }}
        transition={{
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.2 },
        }}
        onMouseEnter={() => soundManager.playHover()}
        className="absolute -top-3 -right-2 md:top-6 md:-right-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#123C2F]/15 shadow-xl shadow-[#123C2F]/5 flex items-center gap-3 z-10"
      >
        <div className="w-8 h-8 rounded-lg bg-[#123C2F] text-[#F7F7F3] flex items-center justify-center shadow-inner">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] tracking-wider text-[#123C2F] font-bold">Netram God's Eye</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-100 text-emerald-800 font-semibold">98.2% Acc</span>
          </div>
          <p className="text-[11px] text-[#666666]">Real-time Deepfake Defense</p>
        </div>
      </motion.div>

      {/* Floating Micro-Element 2: Code Snippet Card */}
      <motion.div
        animate={{
          y: [0, 10, 0],
          x: mouseOffset.x * 20,
        }}
        transition={{
          y: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          x: { duration: 0.2 },
        }}
        onMouseEnter={() => soundManager.playHover()}
        className="absolute -bottom-4 -left-2 md:bottom-6 md:-left-6 bg-[#111111] text-[#F7F7F3] p-3.5 rounded-xl border border-white/10 shadow-2xl shadow-black/20 font-mono text-[11px] max-w-[240px] z-10"
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[9px] text-white/40">daksh.architecture()</span>
        </div>
        <div className="text-emerald-400 text-[10px] leading-tight">
          <span className="text-purple-300">const</span> product = <span className="text-yellow-300">await</span> build({`{`}
          <div className="pl-3 text-white/80">
            craft: <span className="text-emerald-300">"Production"</span>,
            impact: <span className="text-yellow-300">"Unforgettable"</span>
          </div>
          {`}`});
        </div>
      </motion.div>

      {/* Floating Micro-Element 3: SIH Hackathon Leadership Badge */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          x: mouseOffset.x * -12,
        }}
        transition={{
          y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 },
          x: { duration: 0.2 },
        }}
        onMouseEnter={() => soundManager.playHover()}
        className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg border border-[#123C2F]/15 shadow-lg flex items-center gap-2 z-10"
      >
        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
        <div>
          <p className="font-mono text-[9px] tracking-wider text-[#123C2F] font-bold uppercase">SIH 2026</p>
          <p className="text-[10px] font-medium text-[#111111]">Team Leader • 36h Sprint</p>
        </div>
      </motion.div>

      {/* Center Avatar Badge / Monogram */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#123C2F] to-[#0A231B] text-[#F7F7F3] border-2 border-[#D4AF37]/40 shadow-2xl flex flex-col items-center justify-center pointer-events-none group">
        <span className="font-serif italic text-3xl md:text-4xl font-bold tracking-tighter text-[#F7F7F3]">
          DS
        </span>
        <span className="text-[8px] tracking-widest font-mono text-[#D4AF37] uppercase">
          ENGINEER
        </span>
      </div>
    </div>
  );
}
