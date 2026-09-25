import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Binary, Layers, Brain, Cpu, Cloud, Rocket, CheckCircle2, ChevronRight, Sparkles, Award, ExternalLink, Download, Eye, FileCheck, X } from "lucide-react";
import { learningRoadmapData, verifiedCertifications } from "../data/learning";
import { soundManager } from "../utils/sound";

export function LearningSection() {
  const [selectedTopic, setSelectedTopic] = useState(learningRoadmapData[0]);
  const [activeCertDetail, setActiveCertDetail] = useState(null);

  const iconMap = {
    GraduationCap,
    Binary,
    Layers,
    Brain,
    Cpu,
    Cloud,
    Rocket,
  };

  return (
    <section id="learning" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#123C2F]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#123C2F] font-bold">
              <BookOpen className="w-4 h-4 text-[#123C2F]" />
              <span>05 // Continuous Mastery & Specializations</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#111111] tracking-tight">
              Always <span className="italic font-normal text-[#123C2F]">Learning.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-[#666666] max-w-xs">
            RIGOROUS ACADEMIC SPECIALIZATIONS, INDUSTRY CERTIFICATES & ARCHITECTURAL ROADMAP.
          </p>
        </div>

        {/* 1. Verified Certifications & Specializations Gallery */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#123C2F] font-bold">
                Verified Specializations & Professional Credentials
              </h3>
            </div>
            <span className="text-xs font-mono text-[#666666]">University & Meta Accredited</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {verifiedCertifications.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -6 }}
                onMouseEnter={() => soundManager.playHover()}
                className="editorial-card p-5 sm:p-6 bg-white flex flex-col justify-between border border-[#123C2F]/15 relative group overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Visible Certificate Document Thumbnail Preview */}
                  <div
                    onClick={() => {
                      soundManager.playClick();
                      setActiveCertDetail(cert);
                    }}
                    className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-100 border border-[#123C2F]/20 cursor-pointer group/thumb shadow-inner"
                    data-cursor="pointer"
                    title="Click to view full certificate"
                  >
                    <img
                      src={cert.imagePreview}
                      alt={`${cert.title} Certificate`}
                      className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Hover Overlay with Inspect Badge */}
                    <div className="absolute inset-0 bg-[#123C2F]/70 opacity-0 group-hover/thumb:opacity-100 backdrop-blur-xs transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-[#F7F7F3] space-y-1.5">
                      <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center shadow-md">
                        <Eye className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold tracking-wider uppercase">
                        View Full Certificate
                      </span>
                      <span className="text-[10px] font-mono text-white/70">
                        Official Document Preview
                      </span>
                    </div>

                    {/* Category Overlay Tag */}
                    <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md bg-[#123C2F]/90 text-[#F7F7F3] font-mono text-[9px] font-bold tracking-wide backdrop-blur-xs shadow-xs">
                        {cert.badge}
                      </span>
                    </div>
                  </div>

                  {/* Meta Bar: Date & Status */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-800 font-bold flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Verified Credential</span>
                    </span>
                    <span className="text-[#888888]">{cert.date}</span>
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1">
                    <h4
                      onClick={() => {
                        soundManager.playClick();
                        setActiveCertDetail(cert);
                      }}
                      className="font-serif text-lg sm:text-xl font-bold text-[#111111] leading-snug group-hover:text-[#123C2F] transition-colors cursor-pointer"
                    >
                      {cert.title}
                    </h4>
                    <p className="font-mono text-xs font-bold text-[#123C2F]">
                      {cert.organization}
                    </p>
                    <p className="text-[11px] text-[#666666] font-mono">
                      {cert.instructor}
                    </p>
                  </div>

                  {/* Capstone Summary */}
                  <p className="text-xs text-[#555555] leading-relaxed line-clamp-3">
                    {cert.capstone}
                  </p>

                  {/* Curriculum Modules Pill Preview */}
                  {cert.courses && cert.courses.length > 0 && (
                    <div className="pt-2 border-t border-black/5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888] block mb-1">
                        Key Modules ({cert.courses.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cert.courses.slice(0, 2).map((crs, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-2 py-0.5 rounded bg-[#F7F7F3] border border-[#123C2F]/10 font-mono text-[10px] text-[#333333] truncate max-w-full"
                          >
                            {crs}
                          </span>
                        ))}
                        {cert.courses.length > 2 && (
                          <span className="px-1.5 py-0.5 rounded bg-[#F7F7F3] font-mono text-[10px] text-[#888888]">
                            +{cert.courses.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions: View Details / Verify Online */}
                <div className="pt-4 mt-4 border-t border-[#123C2F]/10 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#888888]">
                    <span className="truncate max-w-[170px]">ID: {cert.credentialId}</span>
                    <span className="text-emerald-700 font-bold shrink-0">✓ Verified</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        setActiveCertDetail(cert);
                      }}
                      className="py-2 px-3 rounded-xl bg-[#F7F7F3] hover:bg-[#123C2F]/10 text-[#123C2F] font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      data-cursor="pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>

                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 rounded-xl bg-[#123C2F] hover:bg-[#1A5442] text-[#F7F7F3] font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      data-cursor="pointer"
                    >
                      <span>Verify / PDF</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. Interactive Roadmap Layout: Left List + Right Focus Node */}
        <div className="space-y-6 pt-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#123C2F] font-bold">
            Interactive Engineering & Architecture Roadmap
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Roadmap Nodes */}
            <div className="lg:col-span-5 space-y-3">
              {learningRoadmapData.map((node) => {
                const Icon = iconMap[node.icon] || Sparkles;
                const isSelected = selectedTopic?.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedTopic(node);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                      isSelected
                        ? "bg-[#123C2F] text-[#F7F7F3] border-[#123C2F] shadow-lg shadow-[#123C2F]/10 scale-[1.01]"
                        : "bg-white border-[#123C2F]/10 hover:border-[#123C2F]/30 text-[#111111]"
                    }`}
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-white/15 text-[#D4AF37]"
                            : "bg-[#123C2F]/10 text-[#123C2F] group-hover:bg-[#123C2F] group-hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold">
                          {node.title}
                        </h4>
                        <p
                          className={`text-[11px] font-mono ${
                            isSelected ? "text-white/70" : "text-[#666666]"
                          }`}
                        >
                          {node.category}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? "translate-x-1 text-[#D4AF37]" : "text-[#888888] group-hover:translate-x-1"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Selected Discipline Deep Dive */}
            <div className="lg:col-span-7">
              {selectedTopic && (
                <motion.div
                  key={selectedTopic.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="editorial-card p-6 sm:p-10 bg-white space-y-8"
                >
                  {/* Header */}
                  <div className="space-y-3 pb-6 border-b border-[#123C2F]/10">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#123C2F]/10 text-[#123C2F] font-mono text-xs font-semibold">
                        {selectedTopic.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-100 text-emerald-800 font-semibold">
                        {selectedTopic.status}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
                      {selectedTopic.title}
                    </h3>

                    <p className="text-sm text-[#555555] leading-relaxed font-sans">
                      {selectedTopic.summary}
                    </p>
                  </div>

                  {/* Subtopic Modules */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#123C2F] font-bold">
                      Key Topics & Practical Focus Areas:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedTopic.topics.map((topic, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-3.5 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/10 text-xs text-[#222222] font-medium flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#123C2F] shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Growth Commitment Callout */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-mono text-emerald-900">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>Applied to real-world software & hackathon projects daily.</span>
                    </div>
                    <span className="font-bold">2026 ROADMAP</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Certification Detail Modal */}
      <AnimatePresence>
        {activeCertDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                soundManager.playClick();
                setActiveCertDetail(null);
              }}
              className="fixed inset-0 bg-[#111111]/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#123C2F]/20 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#123C2F]/10 bg-[#F7F7F3]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#123C2F] text-[#D4AF37] flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#111111]">
                      {activeCertDetail.title}
                    </h3>
                    <p className="font-mono text-xs text-[#123C2F]">
                      {activeCertDetail.organization} • {activeCertDetail.instructor}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveCertDetail(null);
                  }}
                  className="p-1.5 rounded-full hover:bg-black/10 text-[#111111]"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                {/* Capstone Description */}
                <div className="p-4 rounded-2xl bg-[#F7F7F3] border border-[#123C2F]/10 space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#123C2F] font-bold">
                    Specialization & Capstone Project
                  </span>
                  <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                    {activeCertDetail.capstone}
                  </p>
                </div>

                {/* Certificate High-Res Document Preview */}
                {activeCertDetail.imagePreview && (
                  <div className="rounded-2xl overflow-hidden border border-[#123C2F]/20 shadow-md bg-stone-50">
                    <img
                      src={activeCertDetail.imagePreview}
                      alt={`${activeCertDetail.title} Certificate`}
                      className="w-full max-h-[48vh] object-contain mx-auto"
                    />
                  </div>
                )}

                {/* Course Modules List */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#123C2F] font-bold">
                    Completed Courses ({activeCertDetail.courses.length}):
                  </h4>
                  <div className="space-y-2">
                    {activeCertDetail.courses.map((courseName, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-[#123C2F]/10 flex items-center gap-3 text-xs text-[#222222] font-medium"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#123C2F]/10 text-[#123C2F] flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span>{courseName}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Metadata Box */}
                <div className="p-4 rounded-2xl bg-white border border-black/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div>
                    <span className="text-[#888888] block text-[10px]">VERIFICATION ID</span>
                    <span className="font-bold text-[#111111]">{activeCertDetail.credentialId}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={activeCertDetail.pdfUrl || activeCertDetail.imagePreview}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#F7F7F3] hover:bg-[#123C2F]/10 text-[#123C2F] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{activeCertDetail.pdfUrl?.endsWith(".pdf") ? "Download PDF" : "View Full Size"}</span>
                    </a>
                    <a
                      href={activeCertDetail.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#123C2F] hover:bg-[#1A5442] text-[#F7F7F3] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>
                        {activeCertDetail.verifyUrl?.includes("coursera")
                          ? "Verify on Coursera"
                          : activeCertDetail.verifyUrl?.includes("ude.my")
                          ? "Verify on Udemy"
                          : "Verify Credential"}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
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
