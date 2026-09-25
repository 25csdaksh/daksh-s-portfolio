import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Flame, Users, Clock, ArrowUpRight, ShieldCheck, CheckCircle2, Sparkles, Award, Eye, X, Download, ExternalLink } from "lucide-react";
import { hackathonsData, hackathonStats } from "../data/hackathons";
import { soundManager } from "../utils/sound";

export function HackathonsSection({ onSelectProject }) {
  const [activeCertificate, setActiveCertificate] = useState(null);

  return (
    <section id="hackathons" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#123C2F]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#123C2F] font-bold">
              <Flame className="w-4 h-4 text-[#D4AF37]" />
              <span>04 // High-Stakes Engineering & Awards</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#111111] tracking-tight">
              Building Under <span className="italic font-normal text-[#123C2F]">Pressure.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-[#666666] max-w-xs">
            HACKATHON LEADERSHIP, TOP 37 NATIONAL STANDING & VERIFIED ACHIEVEMENTS.
          </p>
        </div>

        {/* Hackathon Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hackathonStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#123C2F]/10 shadow-xs flex flex-col justify-between"
            >
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#123C2F]">
                {stat.number}
              </span>
              <div className="mt-2">
                <h3 className="font-sans font-bold text-xs sm:text-sm text-[#111111]">{stat.label}</h3>
                <p className="text-[11px] font-mono text-[#666666] mt-0.5">{stat.sub}</p>
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
                className={`editorial-card p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-white/95 relative overflow-hidden ${
                  hasCertificate ? "border-[#123C2F]/30 ring-1 ring-[#D4AF37]/40 shadow-lg" : ""
                }`}
              >
                {/* Gold Ribbon for Verified Certificate */}
                {hasCertificate && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#D4AF37] to-[#8A7114] text-white px-3 py-0.5 rounded-bl-xl font-mono text-[9px] font-bold tracking-widest uppercase shadow-xs">
                    Verified Credential
                  </div>
                )}

                <div className="space-y-4">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#123C2F] text-[#F7F7F3] font-mono text-[10px] font-bold uppercase tracking-wider">
                        {hackathon.tag}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#D4AF37]/20 text-[#8A7114] font-semibold">
                        {hackathon.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Role */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] leading-tight">
                      {hackathon.title}
                    </h3>
                    <div className="flex flex-col gap-0.5 mt-1 text-xs font-mono text-[#123C2F] font-bold">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{hackathon.role}</span>
                      </div>
                      <span className="text-[#888888] font-normal text-[11px]">{hackathon.organization}</span>
                    </div>
                  </div>

                  {/* Certificate Thumbnail Preview if Available */}
                  {hasCertificate && (
                    <div
                      onClick={() => {
                        soundManager.playClick();
                        setActiveCertificate(hackathon);
                      }}
                      className="relative rounded-xl overflow-hidden border border-[#123C2F]/20 group/cert cursor-pointer bg-[#F7F7F3] p-1.5 shadow-inner"
                      data-cursor="pointer"
                    >
                      <img
                        src={hackathon.certificateImage}
                        alt={`${hackathon.title} Certificate`}
                        className="w-full h-36 sm:h-40 object-cover object-top rounded-lg group-hover/cert:scale-[1.02] transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-[#123C2F]/70 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold rounded-lg backdrop-blur-xs">
                        <Eye className="w-4 h-4 text-[#D4AF37]" />
                        <span>Inspect Official Certificate</span>
                      </div>
                    </div>
                  )}

                  {/* Description & Impact */}
                  <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                    {hackathon.description}
                  </p>

                  {/* Key Sprint Highlights */}
                  <div className="space-y-2 pt-1">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#123C2F] font-bold">
                      Sprint Highlights:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#333333]">
                      {hackathon.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#123C2F] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action / Certificate View Trigger */}
                <div className="pt-4 border-t border-[#123C2F]/10 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {hackathon.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-[#F7F7F3] border border-[#123C2F]/10 font-mono text-[10px] font-semibold text-[#123C2F]"
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
                      className="w-full py-2.5 rounded-xl bg-[#123C2F] hover:bg-[#1A5442] text-[#F7F7F3] text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                      data-cursor="pointer"
                    >
                      <Award className="w-4 h-4 text-[#D4AF37]" />
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
              className="fixed inset-0 bg-[#111111]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#D4AF37]/30 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#123C2F]/10 bg-[#F7F7F3]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#123C2F] text-[#D4AF37] flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#111111]">
                      {activeCertificate.title}
                    </h3>
                    <p className="font-mono text-[10px] text-[#666666]">
                      Recipient: Daksh Rakeshbhai Soni • Team KrishiSeva
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeCertificate.certificateImage}
                    download="Daksh-Soni-Tech-For-Agriculture-Certificate.jpg"
                    onClick={() => soundManager.playClick()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#123C2F] text-[#F7F7F3] font-mono text-xs font-semibold hover:bg-[#1A5442] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Save Image</span>
                  </a>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveCertificate(null);
                    }}
                    className="p-1.5 rounded-full hover:bg-black/10 text-[#111111]"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Certificate Image Viewer */}
              <div className="overflow-y-auto p-4 sm:p-8 bg-[#111111]/5 flex flex-col items-center justify-center space-y-6">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-full">
                  <img
                    src={activeCertificate.certificateImage}
                    alt="Certificate of Achievement - Daksh Rakeshbhai Soni"
                    className="w-full max-h-[62vh] object-contain"
                  />
                </div>

                {/* Accreditations & Badges */}
                <div className="w-full p-4 rounded-2xl bg-white border border-[#123C2F]/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-[#888888] font-bold block">
                      OFFICIAL ACCREDITATION
                    </span>
                    <div className="flex flex-wrap gap-2 text-[#123C2F] font-bold">
                      <span>• JAIN (Deemed-to-be University)</span>
                      <span>• ACM (Association for Computing Machinery)</span>
                      <span>• Institution's Innovation Council</span>
                      <span>• Co-Sponsored by IBM</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
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
