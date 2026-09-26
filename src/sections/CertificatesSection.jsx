import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  ExternalLink, 
  Download, 
  Eye, 
  CheckCircle2, 
  X, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  BookOpen, 
  FileCheck2,
  Flame,
  Check
} from "lucide-react";
import { certificatesData, certificateStats } from "../data/certificates";
import { soundManager } from "../utils/sound";

export function CertificatesSection({ onOpenLearning }) {
  const [activeCertificate, setActiveCertificate] = useState(null);

  return (
    <section id="certificates" className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#02040A]/75 backdrop-blur-xs text-white">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>02 // Verified Credentials & Honors</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight">
              Certifications & <span className="gradient-text-gold">Achievements.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-xs leading-relaxed">
            RIGOROUS ACADEMIC SPECIALIZATIONS, META CERTIFICATES & PODIUM AWARDS.
          </p>
        </div>

        {/* Top Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {certificateStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-[#091328] border border-amber-400/30 hover:border-amber-400 shadow-lg transition-all flex flex-col justify-between"
            >
              <span className="font-heading text-2xl sm:text-4xl font-black text-amber-400">
                {stat.value}
              </span>
              <div className="mt-2">
                <h3 className="font-heading font-bold text-xs sm:text-sm text-white">
                  {stat.label}
                </h3>
                <p className="text-[10px] sm:text-[11px] font-mono text-slate-300 mt-0.5">
                  {stat.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {certificatesData.map((cert, idx) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="editorial-card p-5 sm:p-7 bg-[#091328] flex flex-col justify-between space-y-5 sm:space-y-6 border border-amber-400/30 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/10 transition-all duration-300 group relative overflow-hidden rounded-2xl text-white"
              >
                <div className="space-y-4">
                  {/* Top Badge & Date */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/50 font-mono text-[10px] font-bold">
                      {cert.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-400">{cert.date}</span>
                  </div>

                  {/* Certificate High-Res Thumbnail Image */}
                  <div
                    onClick={() => {
                      soundManager.playClick();
                      setActiveCertificate(cert);
                    }}
                    className="relative rounded-xl overflow-hidden border border-amber-400/30 group/thumb cursor-pointer bg-[#050B1A] p-1 shadow-inner"
                    data-cursor="pointer"
                  >
                    <img
                      src={cert.imagePreview}
                      alt={`${cert.title} Certificate`}
                      className="w-full h-40 sm:h-48 object-cover object-top rounded-lg group-hover/thumb:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-2 text-amber-300 font-mono text-xs font-bold rounded-lg backdrop-blur-xs">
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Inspect Certificate</span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="font-heading text-lg sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-xs font-bold text-amber-400 mt-1">
                      {cert.organization}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {cert.instructor}
                    </p>
                  </div>

                  {/* Capstone Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {cert.capstone}
                  </p>

                  {/* Courses List Preview */}
                  <div className="pt-2 border-t border-white/10">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400/80 block mb-1 font-semibold">
                      Key Modules ({cert.courses.length}):
                    </span>
                    <p className="font-mono text-[11px] text-slate-300 truncate">
                      {cert.courses.join(" • ")}
                    </p>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400 truncate max-w-[150px]">ID: {cert.credentialId}</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        setActiveCertificate(cert);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-400/15 hover:bg-amber-400 hover:text-blue-950 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                      data-cursor="pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>

                    {cert.verifyUrl.startsWith("http") && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 rounded-xl bg-[#050B1A] hover:bg-[#0E1D3E] border border-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1 transition-all"
                        title="Verify Live Credential on Coursera"
                        data-cursor="pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Banner Calling Learning & Specializations Modal */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#091328] via-[#0E1D3E] to-[#091328] border border-amber-400/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl text-center md:text-left">
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-amber-300 font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>CONTINUOUS ENGINEERING EXCELLENCE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Interested in my complete learning pipeline & specializations?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Inspect in-depth course breakdowns, CS fundamentals syllabus, backend distributed architecture notes, and AI modules.
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              if (onOpenLearning) onOpenLearning();
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-blue-950 font-sans text-xs sm:text-sm font-extrabold shadow-lg shadow-amber-500/25 hover:scale-105 transition-all flex items-center gap-2 shrink-0 border border-yellow-300"
            data-cursor="pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-950" />
            <span>Open Specializations Matrix</span>
          </button>
        </div>
      </div>

      {/* Certificate Detailed Inspector Modal */}
      <AnimatePresence>
        {activeCertificate && (
          <div
            data-lenis-prevent="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto overscroll-contain"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                soundManager.playClick();
                setActiveCertificate(null);
              }}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-[#091328] rounded-3xl border border-amber-400/60 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col text-white"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-[#050B1A]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 text-blue-950 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-blue-950" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm sm:text-lg font-bold text-white truncate max-w-[200px] sm:max-w-md">
                      {activeCertificate.title}
                    </h3>
                    <p className="font-mono text-[10px] sm:text-xs text-amber-300 font-semibold">
                      {activeCertificate.organization} • {activeCertificate.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeCertificate.pdfUrl || activeCertificate.imagePreview}
                    download
                    onClick={() => soundManager.playClick()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-blue-950 font-mono text-xs font-bold hover:bg-yellow-300 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-950" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveCertificate(null);
                    }}
                    className="p-1.5 rounded-full hover:bg-white/10 text-slate-300"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Certificate Image View & Curriculum */}
              <div className="overflow-y-auto p-4 sm:p-8 space-y-5 sm:space-y-6 modal-scrollbar">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-400/30 max-w-full bg-[#050B1A]">
                  <img
                    src={activeCertificate.imagePreview}
                    alt={activeCertificate.title}
                    className="w-full max-h-[50vh] object-contain mx-auto"
                  />
                </div>

                {/* Course Modules & Capstone breakdown */}
                <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-[#0E1D3E] border border-amber-400/30">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-300 font-bold block">
                    Curriculum & Course Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeCertificate.courses.map((course, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-2.5 rounded-xl bg-[#091328] border border-amber-400/20 flex items-center gap-2 text-slate-200 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accreditations & Verify Link */}
                <div className="p-4 rounded-2xl bg-[#050B1A] border border-amber-400/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">
                      VERIFICATION CODE
                    </span>
                    <span className="font-bold text-amber-300">{activeCertificate.credentialId}</span>
                  </div>

                  {activeCertificate.verifyUrl.startsWith("http") && (
                    <a
                      href={activeCertificate.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-blue-950 font-extrabold flex items-center gap-2 shadow-md shadow-amber-500/20 hover:shadow-lg transition-all text-xs"
                    >
                      <span>Verify on Coursera</span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-950 stroke-[2.5]" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
