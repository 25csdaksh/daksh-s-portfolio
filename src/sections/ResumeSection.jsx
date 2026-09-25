import React from "react";
import { motion } from "framer-motion";
import { FileText, Eye, Download, CheckCircle2, ArrowRight, Award, GraduationCap, Code } from "lucide-react";
import { resumeData } from "../data/resume";
import { soundManager } from "../utils/sound";

export function ResumeSection({ onOpenResume }) {
  const handleDownload = () => {
    soundManager.playClick();
    onOpenResume();
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-white/80 border-t border-b border-[#123C2F]/10">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#123C2F]/10 text-[#123C2F] font-mono text-xs font-bold uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5" />
            <span>07 // Verified Credentials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#111111] tracking-tight">
            Want the <span className="italic font-normal text-[#123C2F]">complete story?</span>
          </h2>
          <p className="text-base text-[#666666] font-sans">
            A comprehensive overview of academic records, technical proficiencies, production engineering milestones, and hackathon leadership.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenResume();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="px-7 py-3.5 rounded-full bg-[#123C2F] text-[#F7F7F3] text-xs sm:text-sm font-semibold hover:bg-[#1A5442] shadow-lg shadow-[#123C2F]/15 transition-all flex items-center gap-2"
              data-cursor="pointer"
            >
              <Eye className="w-4 h-4" />
              <span>View Interactive Resume</span>
            </button>

            <button
              onClick={handleDownload}
              onMouseEnter={() => soundManager.playHover()}
              className="px-7 py-3.5 rounded-full bg-white border border-[#123C2F]/20 text-[#111111] text-xs sm:text-sm font-semibold hover:bg-[#123C2F]/5 transition-all flex items-center gap-2"
              data-cursor="pointer"
            >
              <Download className="w-4 h-4 text-[#123C2F]" />
              <span>Download Printable PDF</span>
            </button>
          </div>
        </div>

        {/* Clean Interactive Resume Teaser Preview */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => {
            soundManager.playClick();
            onOpenResume();
          }}
          onMouseEnter={() => soundManager.playHover()}
          className="editorial-card p-6 sm:p-10 bg-[#F7F7F3] max-w-4xl mx-auto space-y-6 cursor-pointer group"
          data-cursor="pointer"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#123C2F]/10 gap-3">
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] group-hover:text-[#123C2F] transition-colors">
                {resumeData.personal.name}
              </span>
              <p className="text-xs font-mono text-[#123C2F] font-semibold mt-0.5">
                {resumeData.personal.title}
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#123C2F] font-bold group-hover:underline">
              <span>EXPAND FULL RESUME</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-2 p-4 rounded-xl bg-white border border-black/5">
              <div className="flex items-center gap-2 font-bold text-[#111111]">
                <GraduationCap className="w-4 h-4 text-[#123C2F]" />
                <span>Education</span>
              </div>
              <p className="text-[#555555]">B.Tech in Computer Science</p>
              <p className="font-mono text-emerald-800 font-semibold">Top 5% Cohort</p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-white border border-black/5">
              <div className="flex items-center gap-2 font-bold text-[#111111]">
                <Award className="w-4 h-4 text-[#123C2F]" />
                <span>Leadership</span>
              </div>
              <p className="text-[#555555]">SIH 2026 Team Leader</p>
              <p className="font-mono text-emerald-800 font-semibold">IBM AI Finalist</p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-white border border-black/5">
              <div className="flex items-center gap-2 font-bold text-[#111111]">
                <Code className="w-4 h-4 text-[#123C2F]" />
                <span>Full Stack</span>
              </div>
              <p className="text-[#555555]">FastAPI, React, NestJS</p>
              <p className="font-mono text-emerald-800 font-semibold">5+ Production Systems</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
