import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Flame, Users, Clock, ArrowUpRight, ShieldCheck, CheckCircle2, Sparkles, Award, Eye, X, Download, ExternalLink } from "lucide-react";
import { hackathonsData, hackathonStats } from "../data/hackathons";
import { soundManager } from "../utils/sound";

export function HackathonsSection({ onSelectProject }) {
  const [activeCertificate, setActiveCertificate] = useState(null);

  return (
    <section id="hackathons" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#070E20] text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1E2E5D]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>04 // High-Stakes Engineering & Awards</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-white tracking-tight">
              Building Under <span className="gradient-text-gold">Pressure.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-slate-300 max-w-xs">
            HACKATHON LEADERSHIP, TOP 37 NATIONAL STANDING & VERIFIED ACHIEVEMENTS.
          </p>
        </div>

        {/* Hackathon Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hackathonStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0D1B3E] border border-amber-400/30 hover:border-amber-400 shadow-md transition-all flex flex-col justify-between"
            >
              <span className="font-sans text-3xl sm:text-4xl font-extrabold text-amber-400">
                {stat.number}
              </span>
              <div className="mt-2">
                <h3 className="font-sans font-bold text-xs sm:text-sm text-white">{stat.label}</h3>
                <p className="text-[11px] font-mono text-slate-300 mt-0.5">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Sprint Showcases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {hackathonsData.map((hackathon, idx) => {
            const hasCertificate = !!hackathon.certificateImage;
            return (
              <motion.div
                key={hackathon.id}
                whileHover={{ y: -4 }}
                onMouseEnter={() => soundManager.playHover()}
                className={`editorial-card p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-[#0D1B3E] rounded-2xl relative overflow-hidden border border-[#1E2E5D] hover:border-amber-400 hover:shadow-2xl hover:shadow-blue-950/80 transition-all duration-300 ${
                  hasCertificate ? "ring-1 ring-amber-400/40 shadow-xl" : ""
                }`}
              >
                {/* Ribbon for Verified Certificate */}
                {hasCertificate && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-yellow-500 text-blue-950 px-3 py-0.5 rounded-bl-xl font-mono text-[9px] font-black tracking-widest uppercase border-b border-l border-amber-300 shadow-sm">
                    Verified Credential
                  </div>
                )}

                <div className="space-y-4">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 font-mono text-[10px] font-black uppercase tracking-wider shadow-xs">
                        {hackathon.tag}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-amber-400/15 text-amber-300 font-bold border border-amber-400/40">
                        {hackathon.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Role */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-white group-hover:text-amber-300 leading-tight">
                      {hackathon.title}
                    </h3>
                    <div className="flex flex-col gap-0.5 mt-1 text-xs font-mono text-amber-400 font-bold">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>{hackathon.role}</span>
                      </div>
                      <span className="text-slate-300 font-normal text-[11px]">{hackathon.organization}</span>
                    </div>
                  </div>

                  {/* Certificate Thumbnail Preview if Available */}
                  {hasCertificate && (
                    <div
                      onClick={() => {
                        soundManager.playClick();
                        setActiveCertificate(hackathon);
                      }}
                      className="relative rounded-xl overflow-hidden border border-[#1E2E5D] group/cert cursor-pointer bg-[#070E20] p-1.5 shadow-inner"
                      data-cursor="pointer"
                    >
                      <img
                        src={hackathon.certificateImage}
                        alt={`${hackathon.title} Certificate`}
                        className="w-full h-36 sm:h-40 object-cover object-top rounded-lg group-hover/cert:scale-[1.02] transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-[#070E20]/85 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center gap-2 text-amber-300 font-mono text-xs font-bold rounded-lg backdrop-blur-xs">
                        <Eye className="w-4 h-4 text-amber-400" />
                        <span>Inspect Official Certificate</span>
                      </div>
                    </div>
                  )}

                  {/* Description & Impact */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-normal">
                    {hackathon.description}
                  </p>

                  {/* Key Sprint Highlights */}
                  <div className="space-y-2 pt-1">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                      Sprint Highlights:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-200 font-normal">
                      {hackathon.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action / Certificate View Trigger */}
                <div className="pt-4 border-t border-[#1E2E5D] space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {hackathon.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-[#070E20] border border-[#1E2E5D] font-mono text-[10px] font-bold text-amber-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {hasCertificate && (
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        setActiveCertificate(hackathon);
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-blue-950 border border-amber-300 text-xs font-mono font-black flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 hover:scale-[1.02] transition-all"
                      data-cursor="pointer"
                    >
                      <Award className="w-4 h-4 text-blue-950 stroke-[2.5]" />
                      <span>View Official Certificate (Top 37)</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Official Certificate Lightbox / Full Modal */}
      <AnimatePresence>
        {activeCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                soundManager.playClick();
                setActiveCertificate(null);
              }}
              className="fixed inset-0 bg-[#040814]/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-[#0D1B3E] rounded-3xl border border-amber-400/50 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col text-white"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2E5D] bg-[#070E20]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 text-blue-950 border border-amber-300 flex items-center justify-center font-bold">
                    <Award className="w-4 h-4 text-blue-950 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-bold text-white">
                      {activeCertificate.title}
                    </h3>
                    <p className="font-mono text-[10px] text-amber-300 font-semibold">
                      Recipient: Daksh Rakeshbhai Soni • Team KrishiSeva
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeCertificate.certificateImage}
                    download="Daksh-Soni-Tech-For-Agriculture-Certificate.jpg"
                    onClick={() => soundManager.playClick()}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 border border-amber-300 font-mono text-xs font-black hover:scale-105 transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-950 stroke-[2.5]" />
                    <span className="hidden sm:inline">Save Image</span>
                  </a>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveCertificate(null);
                    }}
                    className="p-1.5 rounded-full bg-[#0D1B3E] hover:bg-[#122452] text-slate-300 hover:text-white border border-[#1E2E5D]"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Certificate Image Viewer */}
              <div className="overflow-y-auto p-4 sm:p-8 bg-[#070E20]/60 flex flex-col items-center justify-center space-y-6 modal-scrollbar">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-400/40 max-w-full">
                  <img
                    src={activeCertificate.certificateImage}
                    alt="Certificate of Achievement - Daksh Rakeshbhai Soni"
                    className="w-full max-h-[62vh] object-contain"
                  />
                </div>

                {/* Accreditations & Badges */}
                <div className="w-full p-4 rounded-2xl bg-[#0D1B3E] border border-[#1E2E5D] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-amber-400 font-bold block">
                      OFFICIAL ACCREDITATION
                    </span>
                    <div className="flex flex-wrap gap-2 text-slate-200 font-bold">
                      <span>• JAIN (Deemed-to-be University)</span>
                      <span>• ACM (Association for Computing Machinery)</span>
                      <span>• Institution's Innovation Council</span>
                      <span>• Co-Sponsored by IBM</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 font-bold text-[11px] border border-amber-400/40">
                    ✓ Official Verified Credential
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
