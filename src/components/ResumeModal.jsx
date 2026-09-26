import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Printer,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  CheckCircle2,
  FileText,
  Sparkles,
  Layers,
  FileImage,
  Eye
} from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { resumeData } from "../data/resume";
import { soundManager } from "../utils/sound";

export function ResumeModal({ isOpen, onClose }) {
  const [viewMode, setViewMode] = useState("pdf"); // "pdf" | "image" | "web"

  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    if (viewMode === "pdf") {
      window.open(resumeData.personal.pdfUrl, "_blank");
    } else {
      window.print();
    }
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto overscroll-contain"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-[#02040A]/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          className="relative w-full max-w-5xl bg-[#091328] rounded-3xl border border-amber-400/50 shadow-2xl shadow-blue-950/90 overflow-hidden z-10 max-h-[94vh] flex flex-col overscroll-contain text-white"
        >
          {/* Action Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/10 bg-[#050B1A] shrink-0">
            {/* Title & Mode Switcher */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-heading text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Daksh Soni — Resume</span>
              </span>
              
              {/* Tab Selector */}
              <div className="flex items-center bg-[#091328] p-1 rounded-xl border border-amber-400/30 text-xs font-mono">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode("pdf");
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold transition-all ${
                    viewMode === "pdf"
                      ? "bg-amber-400 text-blue-950 shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Interactive PDF Viewer"
                >
                  📄 PDF Viewer
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode("image");
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold transition-all ${
                    viewMode === "image"
                      ? "bg-amber-400 text-blue-950 shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="High-Res Document Page"
                >
                  🖼️ Document Page
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode("web");
                  }}
                  className={`hidden sm:inline-block px-2.5 sm:px-3 py-1 rounded-lg font-bold transition-all ${
                    viewMode === "web"
                      ? "bg-amber-400 text-blue-950 shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Interactive Web Profile"
                >
                  ⚡ Web View
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <a
                href="/Daksh_Soni_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-400/40 bg-[#091328] text-xs font-mono font-bold text-amber-300 hover:bg-amber-400 hover:text-blue-950 transition-all shadow-sm"
                title="Open PDF directly in new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open in Tab</span>
              </a>

              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#091328] text-xs font-mono font-bold text-slate-200 hover:text-amber-300 hover:border-amber-400/40 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Print</span>
              </button>

              <a
                href="/Daksh_Soni_Resume.pdf"
                download="Daksh_Soni_Resume.pdf"
                onClick={() => soundManager.playClick()}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-blue-950 font-mono text-xs font-black shadow-md shadow-amber-500/20 hover:scale-105 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-blue-950 stroke-[2.5]" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-full bg-[#091328] hover:bg-[#122452] text-slate-300 hover:text-white border border-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          {viewMode === "pdf" ? (
            /* 1. EMBEDDED REAL PDF VIEWER */
            <div className="flex-1 w-full h-[78vh] bg-[#02040A] p-2 sm:p-4 flex flex-col">
              <iframe
                src="/Daksh_Soni_Resume.pdf#toolbar=1&navpanes=0&view=FitH"
                title="Daksh Soni Resume PDF Document"
                className="w-full h-full rounded-2xl bg-white border border-amber-400/30 shadow-inner"
              />
            </div>
          ) : viewMode === "image" ? (
            /* 2. HIGH-RESOLUTION DOCUMENT PAGE VIEW */
            <div
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto modal-scrollbar bg-[#02040A] p-4 sm:p-8 flex justify-center items-start"
            >
              <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl shadow-blue-950/80 border border-amber-400/40">
                <img
                  src="/resume-preview.png"
                  alt="Daksh Soni Resume Document"
                  className="w-full h-auto object-contain select-none"
                />
              </div>
            </div>
          ) : (
            /* 3. INTERACTIVE WEB RESUME DOCUMENT */
            <div
              data-lenis-prevent="true"
              className="overflow-y-auto modal-scrollbar p-6 sm:p-10 text-white space-y-7 font-sans bg-[#091328] print:bg-white print:text-slate-900 print:p-0 flex-1"
            >
              {/* Header / Personal Info */}
              <div className="border-b border-amber-400/40 pb-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white print:text-slate-900 tracking-tight">
                      {resumeData.personal.name}
                    </h1>
                    <p className="text-sm font-bold text-amber-400 print:text-blue-800 mt-1">
                      {resumeData.personal.title}
                    </p>
                  </div>
                  <div className="text-xs text-slate-200 print:text-slate-600 space-y-1 font-mono sm:text-right">
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{resumeData.personal.location}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <a href={`mailto:${resumeData.personal.email}`} className="hover:underline text-amber-300 print:text-blue-800 font-semibold">
                        {resumeData.personal.email}
                      </a>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{resumeData.personal.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Social / Portfolio Links Bar */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-3 mt-3 border-t border-white/10 text-xs font-mono">
                  <a
                    href={resumeData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-amber-300 print:text-blue-800 hover:text-amber-200 font-bold"
                  >
                    <Github className="w-3.5 h-3.5 text-amber-400" />
                    <span>{resumeData.personal.githubDisplay}</span>
                  </a>
                  <a
                    href={resumeData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-amber-300 print:text-blue-800 hover:text-amber-200 font-bold"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{resumeData.personal.linkedinDisplay}</span>
                  </a>
                  <a
                    href={resumeData.personal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-amber-300 print:text-blue-800 hover:text-amber-200 font-bold"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>{resumeData.personal.websiteDisplay}</span>
                  </a>
                </div>
              </div>

              {/* 1. PROFESSIONAL SUMMARY */}
              <div className="space-y-2">
                <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-blue-800 font-bold border-b border-amber-400/40 pb-1">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 print:text-slate-700 leading-relaxed font-normal">
                  {resumeData.summary}
                </p>
              </div>

              {/* 2. TECHNICAL SKILLS */}
              <div className="space-y-2.5">
                <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-blue-800 font-bold border-b border-amber-400/40 pb-1">
                  TECHNICAL SKILLS
                </h2>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <strong className="text-white print:text-slate-900">Programming: </strong>
                    <span className="text-slate-200 print:text-slate-600">{resumeData.technicalSkills.programming.join(", ")}</span>
                  </div>
                  <div>
                    <strong className="text-white print:text-slate-900">Frontend: </strong>
                    <span className="text-slate-200 print:text-slate-600">{resumeData.technicalSkills.frontend.join(", ")}</span>
                  </div>
                  <div>
                    <strong className="text-white print:text-slate-900">Backend: </strong>
                    <span className="text-slate-200 print:text-slate-600">{resumeData.technicalSkills.backend.join(", ")}</span>
                  </div>
                  <div>
                    <strong className="text-white print:text-slate-900">Databases: </strong>
                    <span className="text-slate-200 print:text-slate-600">{resumeData.technicalSkills.databases.join(", ")}</span>
                  </div>
                  <div>
                    <strong className="text-white print:text-slate-900">AI / ML: </strong>
                    <span className="text-slate-200 print:text-slate-600">{resumeData.technicalSkills.ai_ml.join(", ")}</span>
                  </div>
                  <div>
                    <strong className="text-white print:text-slate-900">Tools & Cloud: </strong>
                    <span className="text-slate-200 print:text-slate-600">{resumeData.technicalSkills.tools_cloud.join(", ")}</span>
                  </div>
                  <div>
                    <strong className="text-white print:text-slate-900">Core CS: </strong>
                    <span className="text-slate-200 print:text-slate-600">{resumeData.technicalSkills.coreConcepts.join(", ")}</span>
                  </div>
                </div>
              </div>

              {/* 3. EDUCATION */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-blue-800 font-bold border-b border-amber-400/40 pb-1">
                  EDUCATION
                </h2>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1">
                    <div>
                      <span className="font-bold text-white print:text-slate-900">{edu.degree}</span>
                      <p className="text-slate-300 print:text-slate-600">{edu.institution}</p>
                    </div>
                    <div className="sm:text-right font-mono text-[11px] text-amber-400 print:text-slate-600 font-semibold shrink-0">
                      <span>{edu.period}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 4. SELECTED PROJECTS */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-blue-800 font-bold border-b border-amber-400/40 pb-1">
                  SELECTED PROJECTS
                </h2>
                <div className="space-y-3">
                  {resumeData.selectedProjects.map((p, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white print:text-slate-900">{p.name}</span>
                        <span className="font-mono text-[10px] text-amber-300 print:text-slate-600">{p.tech}</span>
                      </div>
                      <p className="text-slate-200 print:text-slate-600 leading-relaxed">
                        {p.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. HACKATHONS & LEADERSHIP */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-blue-800 font-bold border-b border-amber-400/40 pb-1">
                  HACKATHONS & ACHIEVEMENTS
                </h2>
                <div className="space-y-2">
                  {resumeData.hackathonsAndLeadership.map((item, idx) => (
                    <div key={idx} className="text-xs flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white print:text-slate-900">{item.title} </strong>
                        <span className="text-slate-200 print:text-slate-600">— {item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
