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
      title: "Artificial Intelligence",
      label: "Applied ML & LLM Workflows",
      icon: Cpu,
    },
    {
      step: "06",
      title: "Entrepreneurship",
      label: "End-to-End Product Vision",
      icon: Rocket,
    },
  ];

  // Tripled dataset to make continuous auto-scroll feel infinite and seamless
  const infiniteJourneyFlow = [...baseJourneyFlow, ...baseJourneyFlow, ...baseJourneyFlow];

  // Auto-scroll logic with pause on hover/drag
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    const speed = 0.6; // Subtle, elegant glide speed

    const stepScroll = () => {
      if (isPlaying && !isHovered && !isDragging) {
        container.scrollLeft += speed;

        // Infinite loop reset calculation
        const maxScroll = container.scrollWidth / 3;
        if (container.scrollLeft >= maxScroll * 2) {
          container.scrollLeft -= maxScroll;
        }
      }

      // Update progress bar
      if (container.scrollWidth > container.clientWidth) {
        const progress = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
        setScrollProgress(progress);
      }

      animationFrameId = requestAnimationFrame(stepScroll);
    };

    animationFrameId = requestAnimationFrame(stepScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, isHovered, isDragging]);

  // Arrow button click step scroll
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
    <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#050B1A]/80 backdrop-blur-sm relative border-t border-b border-amber-400/20 text-white">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>01 // About & Identity</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight">
              More than <span className="gradient-text-gold">just code.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-xs leading-relaxed">
            TRANSFORMING ALGORITHMIC RIGOR INTO COMPELLING DIGITAL PRODUCTS.
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left: Deep Narrative Story */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-sans">
            <p>
              My path in technology is rooted in a simple belief: computer science isn't merely an academic study of data structures and algorithms—it is the ultimate lever for constructing tools that elevate human capability.
            </p>
            <p>
              As a <strong className="text-amber-300">Computer Science Engineering student</strong>, I spend my days pushing beyond classroom theory. Whether architecting high-throughput backend services in Node.js and NestJS, designing fluid client-side interfaces in React, or training and serving AI anomaly detection models in Python, I strive to master the full engineering stack.
            </p>
            <p>
              Leading hackathon squads through grueling 36-hour sprints taught me how to architect under constraints, bridge cross-functional talents, and pitch solutions with uncompromising clarity. My ultimate ambition is software entrepreneurship—crafting enduring digital products that solve genuine real-world friction.
            </p>

            {/* Editorial Philosophy Quote Block */}
            <div className="p-5 sm:p-8 rounded-2xl bg-[#091328] border-l-4 border-amber-400 border border-amber-400/40 shadow-xl my-4 sm:my-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-amber-400 font-bold block mb-2">
                CORE PHILOSOPHY
              </span>
              <blockquote className="font-heading italic text-lg sm:text-2xl md:text-3xl text-white leading-snug">
                "{profileData.philosophy}"
              </blockquote>
              <div className="mt-3 flex items-center gap-2 text-xs font-mono text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Daksh Soni • Engineering Mindset</span>
              </div>
            </div>
          </div>

          {/* Right: Key Stats & Highlights */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {profileData.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-4 sm:p-6 rounded-2xl bg-[#091328] border border-amber-400/30 shadow-lg hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/10 transition-all duration-300 flex flex-col justify-between group"
                  data-cursor="pointer"
                >
                  <div className="font-heading text-2xl sm:text-4xl font-black text-amber-400 group-hover:text-yellow-300 transition-colors">
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 sm:mt-3">
                    <h3 className="font-heading font-bold text-xs sm:text-sm text-white">{stat.label}</h3>
                    <p className="text-[10px] sm:text-xs text-slate-300 font-mono mt-0.5">{stat.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Pillars Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0E1D3E] text-white space-y-3 sm:space-y-4 shadow-xl border border-amber-400/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-amber-300 font-bold">
                  Core Engineering Pillars
                </span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">01.</span>
                  <span>Algorithmic Efficiency (C++ / DSA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">02.</span>
                  <span>Scalable Distributed Systems (Redis / NestJS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">03.</span>
                  <span>Applied Artificial Intelligence (FastAPI / Gemini)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">04.</span>
                  <span>Product-Led Value & User Empathy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Evolutionary Journey Flow Timeline */}
        <div className="space-y-4 sm:space-y-5 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                The Evolution: Journey Pipeline
              </h3>
              <p className="text-[11px] sm:text-xs font-mono text-slate-400 mt-0.5">
                Swipe or drag horizontally
              </p>
            </div>

            {/* Navigation Arrow Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center text-amber-300 hover:bg-amber-400 hover:text-blue-950 transition-all duration-200"
                data-cursor="pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center text-amber-300 hover:bg-amber-400 hover:text-blue-950 transition-all duration-200"
                data-cursor="pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Curved Edge Mask Container */}
          <div
            className="relative overflow-hidden py-1 sm:py-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              handleMouseLeaveOrUp();
            }}
          >
            {/* Horizontal Scroll Track */}
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              className={`overflow-x-auto pb-3 pt-1 no-scrollbar flex gap-3 sm:gap-4 select-none ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              {infiniteJourneyFlow.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => soundManager.playHover()}
                    className="relative flex-shrink-0 w-[180px] sm:w-[230px] p-3.5 sm:p-5 rounded-2xl bg-[#091328] border border-amber-400/30 flex flex-col justify-between group hover:border-amber-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    data-cursor="pointer"
                  >
                    {/* Top Row: Icon & Step Number */}
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-2xs group-hover:bg-amber-400 group-hover:text-blue-950 transition-all duration-300">
                        <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs text-amber-400 font-bold">
                          {step.step}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40 group-hover:bg-amber-400 transition-all" />
                      </div>
                    </div>

                    {/* Bottom: Title & Label */}
                    <div>
                      <h4 className="font-heading font-bold text-xs sm:text-base text-white group-hover:text-amber-300 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] font-mono text-slate-300 font-medium mt-0.5 sm:mt-1 leading-snug">
                        {step.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full bg-[#02040A] h-1.5 rounded-full overflow-hidden border border-amber-400/20">
            <div
              className="bg-gradient-to-r from-blue-600 via-amber-400 to-yellow-400 h-full transition-all duration-100 rounded-full"
              style={{ width: `${Math.max(10, scrollProgress)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
