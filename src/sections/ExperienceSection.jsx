import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { experienceJourneyData } from "../data/experience";
import { soundManager } from "../utils/sound";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#070E20] text-white border-t border-b border-[#1E2E5D]">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1E2E5D]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>05 // Timeline & Progression</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-white tracking-tight">
              The Journey & <span className="gradient-text-gold">Milestones.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-slate-300 max-w-xs">
            CHRONOLOGICAL EVOLUTION FROM ALGORITHMIC FOUNDATIONS TO PRODUCTION PLATFORMS.
          </p>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-amber-400/50 space-y-12 sm:space-y-16 ml-3 sm:ml-6">
          {experienceJourneyData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Marker Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#070E20] border-2 border-amber-400 flex items-center justify-center group-hover:bg-amber-400 transition-colors shadow-md shadow-amber-400/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:bg-blue-950" />
              </div>

              {/* Milestone Card */}
              <div
                onMouseEnter={() => soundManager.playHover()}
                className="editorial-card p-6 sm:p-8 bg-[#0D1B3E] hover:bg-[#122452] border border-[#1E2E5D] hover:border-amber-400 hover:shadow-2xl hover:shadow-blue-950/80 rounded-2xl space-y-5 transition-all duration-300"
              >
                {/* Year & Badge Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-2xl sm:text-3xl font-extrabold text-amber-400">
                      {item.year}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 font-mono text-[10px] font-black uppercase tracking-wider shadow-xs">
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-300">{item.subtitle}</span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-200 mt-2 leading-relaxed font-sans font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
                    Key Outcomes & Contributions:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                    {item.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 bg-[#070E20] p-2.5 rounded-xl border border-[#1E2E5D] shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Chips */}
                <div className="pt-3 border-t border-[#1E2E5D] flex flex-wrap gap-1.5">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md bg-[#070E20] border border-amber-400/30 font-mono text-[10px] text-amber-300 font-bold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
