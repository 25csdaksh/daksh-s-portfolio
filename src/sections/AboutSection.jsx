import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Rocket, Cpu, Layers, Trophy, GraduationCap, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { profileData } from "../data/profile";
import { StatCounter } from "../components/StatCounter";
import { soundManager } from "../utils/sound";

export function AboutSection() {
  const scrollContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Concise, clean journey stages without heavy text clutter
  const baseJourneyFlow = [
    {
      step: "01",
      title: "Education",
      label: "Core CS Fundamentals",
      icon: GraduationCap,
    },
    {
      step: "02",
      title: "Development",
      label: "Full-Stack Web Architectures",
      icon: Layers,
    },
    {
      step: "03",
      title: "Projects",
      label: "Complex Production ERPs",
      icon: Terminal,
    },
    {
      step: "04",
      title: "Hackathons",
      label: "Pressure Sprints & Team Lead",
      icon: Trophy,
    },
    {
      step: "05",
      title: "Product Building",
      label: "Applied AI Solutions",
      icon: Cpu,
    },
    {
      step: "06",
      title: "Entrepreneurship",
      label: "Scalable Digital Ventures",
      icon: Rocket,
    },
  ];

  // Triplicate the journey list for seamless infinite circular looping
  const infiniteJourneyFlow = [...baseJourneyFlow, ...baseJourneyFlow, ...baseJourneyFlow];

  // Continuous Auto-Scroll Engine with seamless looping
  useEffect(() => {
    let animFrameId;
    const speed = 0.75; // pixels per frame (luxurious gentle glide)

    const loop = () => {
      const el = scrollContainerRef.current;
      if (el && isPlaying && !isHovered && !isDragging) {
        el.scrollLeft += speed;

        // Reset scroll seamlessly when reaching 1/3 of total scrollWidth
        const singleSetWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        }

        // Calculate progress within the 6-step loop
        const normalizedScroll = el.scrollLeft % singleSetWidth;
        setScrollProgress((normalizedScroll / singleSetWidth) * 100);
      }
      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId);
  }, [isPlaying, isHovered, isDragging]);

  const handleScroll = (direction) => {
    soundManager.playClick();
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -280 : 280;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-white/70 relative border-t border-b border-[#123C2F]/10">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#123C2F]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#123C2F] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#123C2F]" />
              <span>01 // About & Identity</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#111111] tracking-tight">
              More than <span className="italic font-normal text-[#123C2F]">just code.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-[#666666] max-w-xs">
            TRANSFORMING ALGORITHMIC RIGOR INTO COMPELLING DIGITAL PRODUCTS.
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Deep Narrative Story */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#444444] leading-relaxed font-sans">
            <p>
              My path in technology is rooted in a simple belief: computer science isn't merely an academic study of data structures and algorithms—it is the ultimate lever for constructing tools that elevate human capability.
            </p>
            <p>
              As a <strong>Computer Science Engineering student</strong>, I spend my days pushing beyond classroom theory. Whether architecting high-throughput backend services in Node.js and NestJS, designing fluid client-side interfaces in React, or training and serving AI anomaly detection models in Python, I strive to master the full engineering stack.
            </p>
            <p>
              Leading hackathon squads through grueling 36-hour sprints taught me how to architect under constraints, bridge cross-functional talents, and pitch solutions with uncompromising clarity. My ultimate ambition is software entrepreneurship—crafting enduring digital products that solve genuine real-world friction.
            </p>

            {/* Editorial Philosophy Quote Block */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F7F3] border-l-4 border-[#123C2F] shadow-sm my-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#123C2F] font-bold block mb-2">
                CORE PHILOSOPHY
              </span>
              <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#111111] leading-snug">
                "{profileData.philosophy}"
              </blockquote>
              <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#666666]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Daksh Soni • Engineering Mindset</span>
              </div>
            </div>
          </div>

          {/* Right: Key Stats & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {profileData.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-5 sm:p-6 rounded-2xl bg-[#F7F7F3] border border-[#123C2F]/10 shadow-xs flex flex-col justify-between"
                  data-cursor="pointer"
                >
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#123C2F]">
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-3">
                    <h3 className="font-sans font-bold text-sm text-[#111111]">{stat.label}</h3>
                    <p className="text-xs text-[#666666] font-mono mt-0.5">{stat.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Pillars Box */}
            <div className="p-6 rounded-2xl bg-[#123C2F] text-[#F7F7F3] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-wider uppercase text-[#D4AF37] font-bold">
                  Core Engineering Pillars
                </span>
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <ul className="space-y-2 text-xs font-mono text-white/90">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">01.</span> Algorithmic Efficiency (C++ / DSA)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">02.</span> Scalable Distributed Systems (Redis / NestJS)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">03.</span> Applied Artificial Intelligence (FastAPI / Gemini)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">04.</span> Product-Led Value & User Empathy
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Evolutionary Journey Flow Timeline (Clean Concise Round Auto-Scrolling Pipeline) */}
        <div className="space-y-5 pt-8 border-t border-[#123C2F]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#123C2F] font-bold">
                  The Evolution: Journey Pipeline
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-[#123C2F] border border-emerald-600/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  <span>INFINITE FLOW</span>
                </span>
              </div>
              <p className="text-xs font-mono text-[#666666] mt-0.5">
                End-to-End Progression
              </p>
            </div>

            {/* Navigation & Play/Pause Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#123C2F]/20 text-xs font-mono font-semibold text-[#123C2F] hover:bg-[#123C2F] hover:text-[#F7F7F3] transition-all duration-200"
                data-cursor="pointer"
                title={isPlaying ? "Pause auto-scroll" : "Resume auto-scroll"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 fill-current" />
                    <span className="text-[11px]">Auto-Scroll</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span className="text-[11px]">Paused</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full border border-[#123C2F]/20 flex items-center justify-center text-[#123C2F] hover:bg-[#123C2F] hover:text-[#F7F7F3] transition-all duration-200"
                data-cursor="pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full border border-[#123C2F]/20 flex items-center justify-center text-[#123C2F] hover:bg-[#123C2F] hover:text-[#F7F7F3] transition-all duration-200"
                data-cursor="pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Curved Edge Mask Container for Smooth Round Carousel Horizon */}
          <div
            className="relative overflow-hidden py-2"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              handleMouseLeaveOrUp();
            }}
          >
            {/* Horizontal Scroll Track Container with Clean Compact Cards */}
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              className={`overflow-x-auto pb-3 pt-1 no-scrollbar flex gap-4 select-none ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              {infiniteJourneyFlow.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => soundManager.playHover()}
                    className="relative flex-shrink-0 w-[210px] sm:w-[230px] p-4 sm:p-5 rounded-2xl bg-[#F7F7F3] border border-[#123C2F]/15 flex flex-col justify-between group hover:border-[#123C2F] hover:shadow-md hover:-translate-y-1 hover:bg-white transition-all duration-300"
                    data-cursor="pointer"
                  >
                    {/* Top Row: Icon & Step Number */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-[#123C2F]/10 flex items-center justify-center text-[#123C2F] shadow-2xs group-hover:bg-[#123C2F] group-hover:text-white transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs text-[#888888] font-bold group-hover:text-[#123C2F] transition-colors">
                          {step.step}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#123C2F]/20 group-hover:bg-emerald-500 transition-all" />
                      </div>
                    </div>

                    {/* Bottom: Title & Label */}
                    <div>
                      <h4 className="font-sans font-bold text-sm sm:text-base text-[#111111] group-hover:text-[#123C2F] transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-[11px] font-mono text-[#666666] group-hover:text-[#123C2F] font-medium mt-1 leading-snug">
                        {step.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full bg-[#EAEAE4] h-1 rounded-full overflow-hidden">
            <div
              className="bg-[#123C2F] h-full transition-all duration-100 rounded-full"
              style={{ width: `${Math.max(10, scrollProgress)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}



