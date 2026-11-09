import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Award, GraduationCap, Code } from "lucide-react";
import { resumeData } from "../data/resume";
import { soundManager } from "../utils/sound";

export function ResumeSection() {
  return (
    <section id="resume" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#080321]/80 backdrop-blur-sm text-white border-t border-b border-purple-500/20">
      {/* Background Cosmic Purple Ambiance */}
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/40 font-mono text-xs font-bold uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>07 // Verified Credentials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight">
            Want the <span className="gradient-text-cosmic">complete story?</span>
          </h2>
          <p className="text-base text-slate-200 font-sans font-normal">
            A comprehensive overview of academic records, technical proficiencies, production engineering milestones, and hackathon leadership.
          </p>

          {/* Single Direct PDF Download Button */}
          <div className="flex items-center justify-center pt-2">
            <a
              href={resumeData.personal.pdfUrl}
              download="Daksh_Soni_Resume.pdf"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 border border-yellow-300 text-sm font-extrabold shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all flex items-center gap-2.5 group"
              data-cursor="pointer"
              title="Direct Download Daksh Soni Resume PDF"
            >
              <Download className="w-5 h-5 text-purple-950 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
              <span>Download Resume PDF</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-950/15 border border-purple-950/20 font-bold">
                ATS PDF
              </span>
            </a>
          </div>
        </div>

        {/* Direct Download Teaser Card */}
        <motion.a
          href={resumeData.personal.pdfUrl}
          download="Daksh_Soni_Resume.pdf"
          whileHover={{ y: -4 }}
          onClick={() => soundManager.playClick()}
          onMouseEnter={() => soundManager.playHover()}
          className="editorial-card block p-6 sm:p-10 bg-[#0f072e]/95 hover:bg-[#170c43] border border-purple-500/25 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-950/80 rounded-2xl max-w-4xl mx-auto space-y-6 cursor-pointer group transition-all duration-300"
          data-cursor="pointer"
          title="Click to Download Resume PDF"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-purple-400/15 gap-3">
            <div>
              <span className="font-heading text-2xl sm:text-3xl font-extrabold text-white group-hover:text-purple-300 transition-colors">
                {resumeData.personal.name}
              </span>
              <p className="text-xs font-mono text-purple-300 font-bold mt-0.5">
                {resumeData.personal.title}
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold group-hover:underline">
              <Download className="w-4 h-4 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
              <span>DOWNLOAD RESUME PDF</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-2 p-4 rounded-xl bg-[#080321] border border-purple-400/20 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Education</span>
              </div>
              <p className="text-slate-200">B.Tech in Computer Science & Engineering</p>
              <p className="font-mono text-purple-300 font-semibold">CHARUSAT University (2026–2029)</p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-[#080321] border border-purple-400/20 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Leadership</span>
              </div>
              <p className="text-slate-200">Smart India Hackathon 2026 (Lead)</p>
              <p className="font-mono text-purple-300 font-semibold">IBM BoB Hackathon (TrialGuard Lead)</p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-[#080321] border border-purple-400/20 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <Code className="w-4 h-4 text-purple-400" />
                <span>Full Stack & AI</span>
              </div>
              <p className="text-slate-200">FastAPI, React, NestJS, Node.js</p>
              <p className="font-mono text-purple-300 font-semibold">PyTorch, Gemini, PostgreSQL</p>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
