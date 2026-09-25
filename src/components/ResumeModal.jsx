import React from "react";
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
  BookOpen,
  Sparkles
} from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { resumeData } from "../data/resume";
import { soundManager } from "../utils/sound";

export function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 overflow-y-auto overscroll-contain"
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
          className="fixed inset-0 bg-[#111111]/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#123C2F]/20 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col overscroll-contain"
        >
          {/* Action Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#123C2F]/10 bg-[#F7F7F3] print:hidden shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-[#111111]">Curriculum Vitae</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold">
                Official PDF • 2026
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#123C2F]/20 text-xs font-semibold text-[#111111] hover:bg-[#123C2F]/10 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <a
                href={resumeData.personal.pdfUrl}
                download="Daksh_Soni_Resume.pdf"
                onClick={() => soundManager.playClick()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#123C2F] text-[#F7F7F3] text-xs font-semibold hover:bg-[#1A5442] shadow-sm transition-all hover:scale-105"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-full hover:bg-black/10 text-[#111111] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document (Matches PDF Structure) */}
          <div
            data-lenis-prevent="true"
            className="overflow-y-auto modal-scrollbar p-6 sm:p-10 text-[#111111] space-y-7 font-sans bg-white print:p-0 flex-1"
          >
            {/* Header / Personal Info */}
            <div className="border-b border-[#123C2F]/20 pb-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#111111] tracking-tight">
                    {resumeData.personal.name}
                  </h1>
                  <p className="text-sm font-semibold text-[#123C2F] mt-1">
                    {resumeData.personal.title}
                  </p>
                </div>
                <div className="text-xs text-[#444444] space-y-1 font-mono sm:text-right">
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#123C2F]" />
                    <span>{resumeData.personal.location}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#123C2F]" />
                    <a href={`mailto:${resumeData.personal.email}`} className="hover:underline text-[#123C2F]">
                      {resumeData.personal.email}
                    </a>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#123C2F]" />
                    <span>{resumeData.personal.phone}</span>
                  </div>
                </div>
              </div>

              {/* Social / Portfolio Links Bar */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-3 mt-3 border-t border-black/5 text-xs font-mono">
                <a
                  href={resumeData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#123C2F] hover:underline font-semibold"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{resumeData.personal.githubDisplay}</span>
                </a>
                <a
                  href={resumeData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#123C2F] hover:underline font-semibold"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>{resumeData.personal.linkedinDisplay}</span>
                </a>
                <a
                  href={resumeData.personal.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#123C2F] hover:underline font-semibold"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{resumeData.personal.websiteDisplay}</span>
                </a>
              </div>
            </div>

            {/* 1. PROFESSIONAL SUMMARY */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold border-b border-[#123C2F]/15 pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                {resumeData.summary}
              </p>
            </div>

            {/* 2. TECHNICAL SKILLS */}
            <div className="space-y-2.5">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold border-b border-[#123C2F]/15 pb-1">
                TECHNICAL SKILLS
              </h2>
              <div className="space-y-1.5 text-xs">
                <div>
                  <strong className="text-[#111111]">Programming: </strong>
                  <span className="text-[#444444]">{resumeData.technicalSkills.programming.join(", ")}</span>
                </div>
                <div>
                  <strong className="text-[#111111]">Frontend: </strong>
                  <span className="text-[#444444]">{resumeData.technicalSkills.frontend.join(", ")}</span>
                </div>
                <div>
                  <strong className="text-[#111111]">Backend: </strong>
                  <span className="text-[#444444]">{resumeData.technicalSkills.backend.join(", ")}</span>
                </div>
                <div>
                  <strong className="text-[#111111]">Databases: </strong>
                  <span className="text-[#444444]">{resumeData.technicalSkills.databases.join(", ")}</span>
                </div>
                <div>
                  <strong className="text-[#111111]">AI / ML: </strong>
                  <span className="text-[#444444]">{resumeData.technicalSkills.ai_ml.join(", ")}</span>
                </div>
                <div>
                  <strong className="text-[#111111]">Tools / Cloud: </strong>
                  <span className="text-[#444444]">{resumeData.technicalSkills.tools_cloud.join(", ")}</span>
                </div>
                <div>
                  <strong className="text-[#111111]">Core Concepts: </strong>
                  <span className="text-[#444444]">{resumeData.technicalSkills.coreConcepts.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* 3. EDUCATION */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold border-b border-[#123C2F]/15 pb-1">
                EDUCATION
              </h2>
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-sm text-[#111111]">{edu.degree}</h3>
                    <span className="font-mono text-xs text-[#123C2F] font-semibold">{edu.period}</span>
                  </div>
                  <p className="text-[#555555] font-medium">{edu.institution}</p>
                  <p className="text-[#444444] pt-0.5">
                    <span className="font-semibold text-[#111111]">Relevant Coursework: </span>
                    {edu.coursework.join(" · ")}
                  </p>
                </div>
              ))}
            </div>

            {/* 4. SELECTED PROJECTS */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold border-b border-[#123C2F]/15 pb-1">
                SELECTED PROJECTS
              </h2>
              <div className="space-y-4">
                {resumeData.selectedProjects.map((p, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="font-bold text-sm text-[#111111]">{p.name}</h3>
                      <span className="font-mono text-[11px] text-[#123C2F] font-bold">{p.tech}</span>
                    </div>
                    <p className="text-[#555555] font-medium italic">{p.subtitle}</p>
                    <ul className="list-disc list-outside pl-4 space-y-1 text-[#333333] leading-relaxed">
                      {p.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. HACKATHONS & LEADERSHIP */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold border-b border-[#123C2F]/15 pb-1">
                HACKATHONS & LEADERSHIP
              </h2>
              <div className="space-y-3 text-xs">
                {resumeData.hackathonsAndLeadership.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <h3 className="font-bold text-[#111111] text-xs sm:text-sm">
                      {item.title}
                    </h3>
                    <p className="text-[#444444] leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. CURRENT LEARNING */}
            <div className="space-y-2 pt-2 border-t border-[#123C2F]/20">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold">
                CURRENT LEARNING
              </h2>
              <div className="space-y-1.5 text-xs">
                <p>
                  <strong className="text-[#111111]">Computer Science: </strong>
                  <span className="text-[#444444]">{resumeData.currentLearning.computerScience}</span>
                </p>
                <p>
                  <strong className="text-[#111111]">Full-Stack: </strong>
                  <span className="text-[#444444]">{resumeData.currentLearning.fullStack}</span>
                </p>
                <p>
                  <strong className="text-[#111111]">AI / ML: </strong>
                  <span className="text-[#444444]">{resumeData.currentLearning.aiMl}</span>
                </p>
                <p>
                  <strong className="text-[#111111]">Engineering: </strong>
                  <span className="text-[#444444]">{resumeData.currentLearning.engineering}</span>
                </p>
                <p>
                  <strong className="text-[#111111]">Product: </strong>
                  <span className="text-[#444444]">{resumeData.currentLearning.product}</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
