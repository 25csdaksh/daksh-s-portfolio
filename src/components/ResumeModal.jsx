import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, ExternalLink, Mail, MapPin, Globe, Award, Briefcase, GraduationCap, Code } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { resumeData } from "../data/resume";
import { soundManager } from "../utils/sound";

export function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const handleDownload = () => {
    soundManager.playClick();
    // Creates a clean printable view trigger
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 overflow-y-auto">
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
          className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#123C2F]/20 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
        >
          {/* Action Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#123C2F]/10 bg-[#F7F7F3] print:hidden">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-[#111111]">Curriculum Vitae</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 font-semibold">
                Updated 2026
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#123C2F]/20 text-xs font-semibold text-[#111111] hover:bg-[#123C2F]/10 transition-colors"
                data-cursor="pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#123C2F] text-[#F7F7F3] text-xs font-semibold hover:bg-[#1A5442] shadow-sm transition-all"
                data-cursor="pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-full hover:bg-black/10 text-[#111111]"
                data-cursor="pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document */}
          <div className="overflow-y-auto p-6 sm:p-10 text-[#111111] space-y-6 font-sans bg-white print:p-0">
            {/* Header / Personal Info */}
            <div className="border-b border-black/10 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#111111] tracking-tight">
                    {resumeData.personal.name}
                  </h1>
                  <p className="text-sm font-semibold text-[#123C2F] mt-1">
                    {resumeData.personal.title}
                  </p>
                </div>
                <div className="text-xs text-[#555555] space-y-1 font-mono sm:text-right">
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Mail className="w-3 h-3 text-[#123C2F]" />
                    <span>{resumeData.personal.email}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <MapPin className="w-3 h-3 text-[#123C2F]" />
                    <span>{resumeData.personal.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold">
                Professional Profile
              </h2>
              <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                {resumeData.summary}
              </p>
            </div>

            {/* Technical Skills Grid */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold">
                Technical Expertise
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F7F7F3] border border-black/5">
                  <span className="font-bold text-[#111111]">Languages: </span>
                  <span className="text-[#555555]">{resumeData.skills.languages.join(", ")}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F7F3] border border-black/5">
                  <span className="font-bold text-[#111111]">Frontend: </span>
                  <span className="text-[#555555]">{resumeData.skills.frontend.join(", ")}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F7F3] border border-black/5">
                  <span className="font-bold text-[#111111]">Backend & Systems: </span>
                  <span className="text-[#555555]">{resumeData.skills.backend.join(", ")}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F7F3] border border-black/5">
                  <span className="font-bold text-[#111111]">AI & Machine Learning: </span>
                  <span className="text-[#555555]">{resumeData.skills.ai_ml.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Verified Certifications */}
            {resumeData.certifications && (
              <div className="space-y-3">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold">
                  Verified Certifications & Academic Specializations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {resumeData.certifications.map((cert, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#F7F7F3] border border-black/5 text-xs flex flex-col justify-between space-y-2">
                      <div>
                        <h3 className="font-bold text-[#111111] leading-snug">{cert.title}</h3>
                        <p className="text-[#666666] text-[11px] mt-0.5">{cert.institution}</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-black/5">
                        <span className="text-[#888888]">ID: {cert.credentialId}</span>
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#123C2F] font-bold underline"
                        >
                          Verify ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Major Projects Showcase */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold">
                Key Engineering Projects
              </h2>
              <div className="space-y-4">
                {resumeData.majorProjects.map((p, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-black/10 bg-white shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                      <h3 className="text-sm font-bold text-[#111111]">{p.name}</h3>
                      <span className="text-xs font-mono text-[#123C2F] font-semibold">{p.role}</span>
                    </div>
                    <p className="text-[11px] font-mono text-[#777777] mb-2">{p.tech}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-[#444444]">
                      {p.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Hackathons & Leadership */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold">
                Hackathons & Leadership
              </h2>
              <div className="space-y-2.5">
                {resumeData.hackathonsAndLeadership.map((h, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#F7F7F3] border border-black/5 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#111111] mb-1">
                      <span>{h.title}</span>
                      <span className="text-[10px] font-mono text-[#666666]">{h.organization}</span>
                    </div>
                    <p className="text-[#555555] leading-relaxed">{h.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-bold">
                Education
              </h2>
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F7F7F3] border border-black/5 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-[#111111] mb-1">
                    <span className="text-sm">{edu.degree}</span>
                    <span className="font-mono text-[#123C2F]">{edu.period}</span>
                  </div>
                  <p className="text-[#666666] mb-2">{edu.institution} • <span className="font-semibold text-emerald-800">{edu.grade}</span></p>
                  <p className="text-[#555555]">
                    <strong>Coursework:</strong> {edu.coursework.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
