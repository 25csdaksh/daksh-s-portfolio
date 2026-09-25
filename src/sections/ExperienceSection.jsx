import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { experienceJourneyData } from "../data/experience";
import { soundManager } from "../utils/sound";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-white/70 border-t border-b border-[#123C2F]/10">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#123C2F]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#123C2F] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#123C2F]" />
              <span>05 // Timeline & Progression</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#111111] tracking-tight">
              The Journey & <span className="italic font-normal text-[#123C2F]">Milestones.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-[#666666] max-w-xs">
            CHRONOLOGICAL EVOLUTION FROM ALGORITHMIC FOUNDATIONS TO PRODUCTION PLATFORMS.
          </p>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-[#123C2F]/20 space-y-12 sm:space-y-16 ml-3 sm:ml-6">
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
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#F7F7F3] border-2 border-[#123C2F] flex items-center justify-center group-hover:bg-[#123C2F] transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] group-hover:bg-white" />
              </div>

              {/* Milestone Card */}
              <div
                onMouseEnter={() => soundManager.playHover()}
                className="editorial-card p-6 sm:p-8 bg-[#F7F7F3] space-y-5"
              >
                {/* Year & Badge Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2F]">
                      {item.year}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#123C2F]/10 text-[#123C2F] font-mono text-[10px] font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#888888]">{item.subtitle}</span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#444444] mt-2 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#123C2F] font-bold block">
                    Key Outcomes & Contributions:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#333333]">
                    {item.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 bg-white/70 p-2.5 rounded-lg border border-[#123C2F]/5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#123C2F] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Chips */}
                <div className="pt-3 border-t border-[#123C2F]/10 flex flex-wrap gap-1.5">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md bg-white border border-[#123C2F]/10 font-mono text-[10px] text-[#222222]"
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
