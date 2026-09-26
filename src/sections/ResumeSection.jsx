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
    <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#070E20] text-white border-t border-b border-[#1E2E5D]">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/40 font-mono text-xs font-bold uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>07 // Verified Credentials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-white tracking-tight">
            Want the <span className="gradient-text-gold">complete story?</span>
          </h2>
          <p className="text-base text-slate-200 font-sans font-normal">
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
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-blue-950 border border-amber-300 text-xs sm:text-sm font-black shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-blue-950 stroke-[2.5]" />
              <span>View Interactive Resume</span>
            </button>

            <a
              href={resumeData.personal.pdfUrl}
              download="Daksh_Soni_Resume.pdf"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="px-7 py-3.5 rounded-full bg-[#0D1B3E] border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold hover:bg-[#122452] hover:border-amber-400 transition-all flex items-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Official PDF</span>
            </a>
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
          className="editorial-card p-6 sm:p-10 bg-[#0D1B3E] hover:bg-[#122452] border border-[#1E2E5D] hover:border-amber-400 hover:shadow-2xl hover:shadow-blue-950/80 rounded-2xl max-w-4xl mx-auto space-y-6 cursor-pointer group transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1E2E5D] gap-3">
            <div>
              <span className="font-sans text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                {resumeData.personal.name}
              </span>
              <p className="text-xs font-mono text-amber-400 font-bold mt-0.5">
                {resumeData.personal.title}
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-amber-300 font-bold group-hover:underline">
              <span>EXPAND FULL RESUME</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-2 p-4 rounded-xl bg-[#070E20] border border-[#1E2E5D] shadow-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Education</span>
              </div>
              <p className="text-slate-200">B.Tech in Computer Science & Engineering</p>
              <p className="font-mono text-amber-300 font-semibold">CHARUSAT University (2026–2029)</p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-[#070E20] border border-[#1E2E5D] shadow-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Leadership</span>
              </div>
              <p className="text-slate-200">Smart India Hackathon 2026 (Lead)</p>
              <p className="font-mono text-amber-300 font-semibold">IBM BoB Hackathon (TrialGuard Lead)</p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-[#070E20] border border-[#1E2E5D] shadow-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <Code className="w-4 h-4 text-amber-400" />
                <span>Full Stack & AI</span>
              </div>
              <p className="text-slate-200">FastAPI, React, NestJS, Node.js</p>
              <p className="font-mono text-amber-300 font-semibold">PyTorch, Gemini, PostgreSQL</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
