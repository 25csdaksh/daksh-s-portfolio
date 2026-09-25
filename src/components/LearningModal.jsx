import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Binary,
  Layers,
  Brain,
  Cpu,
  Cloud,
  Rocket,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Award,
  ExternalLink,
  Download,
  Eye,
  FileCheck,
  X,
  Search,
  Check
} from "lucide-react";
import { learningRoadmapData, verifiedCertifications } from "../data/learning";
import { soundManager } from "../utils/sound";

export function LearningModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [selectedTopic, setSelectedTopic] = useState(learningRoadmapData[0]);
  const [activeCertDetail, setActiveCertDetail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (activeCertDetail) {
          setActiveCertDetail(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeCertDetail, onClose]);

  const iconMap = {
    GraduationCap,
    Binary,
    Layers,
    Brain,
    Cpu,
    Cloud,
    Rocket,
  };

  const filteredCerts = verifiedCertifications.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overscroll-contain select-none"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-[#111111]/80 backdrop-blur-md"
          />

          {/* Main Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            className="relative w-full max-w-6xl h-[90vh] max-h-[860px] bg-[#F7F7F3] rounded-[28px] sm:rounded-3xl border border-[#123C2F]/20 shadow-2xl overflow-hidden z-10 flex flex-col overscroll-contain"
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 sm:px-8 py-4.5 border-b border-[#123C2F]/10 bg-white shrink-0 shadow-xs z-20">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#123C2F] text-[#F7F7F3] flex items-center justify-center shadow-sm shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                      Continuous Learning & Specializations
                    </h2>
                    <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>Curriculum & Honors</span>
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#666666] mt-0.5">
                    Engineering Roadmap, Academic Specializations & Verified Credentials
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Tab Switcher Pills */}
                <div className="flex items-center bg-[#F7F7F3] p-1 rounded-full border border-[#123C2F]/15">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab("roadmap");
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                      activeTab === "roadmap"
                        ? "bg-[#123C2F] text-[#F7F7F3] shadow-sm"
                        : "text-[#666666] hover:text-[#111111]"
                    }`}
                    data-cursor="pointer"
                  >
                    Roadmap (7)
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab("credentials");
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                      activeTab === "credentials"
                        ? "bg-[#123C2F] text-[#F7F7F3] shadow-sm"
                        : "text-[#666666] hover:text-[#111111]"
                    }`}
                    data-cursor="pointer"
                  >
                    Credentials ({verifiedCertifications.length})
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="w-9 h-9 rounded-full bg-[#F7F7F3] hover:bg-[#123C2F] hover:text-[#F7F7F3] border border-[#123C2F]/15 flex items-center justify-center text-[#111111] transition-all"
                  aria-label="Close"
                  data-cursor="pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body Container with Independent Smooth Scroll */}
            <div
              data-lenis-prevent="true"
              className="overflow-y-auto overscroll-contain modal-scrollbar p-6 sm:p-8 space-y-8 flex-1"
            >
              {activeTab === "roadmap" ? (
                /* Tab 1: Interactive Engineering Roadmap */
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#123C2F]/10">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
                        CSE Curriculum & Architectural Roadmap
                      </h3>
                      <p className="text-xs font-mono text-[#666666] mt-0.5">
                        Select an engineering domain on the left to inspect detailed curriculum & focus areas
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#123C2F] font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
                      7 Core Pillars
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                    {/* Left Roadmap Selector List */}
                    <div className="lg:col-span-5 space-y-2.5">
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
                            className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                              isSelected
                                ? "bg-[#123C2F] text-[#F7F7F3] border-[#123C2F] shadow-md scale-[1.01]"
                                : "bg-white border-[#123C2F]/10 hover:border-[#123C2F]/30 text-[#111111] hover:bg-[#FDFDFB]"
                            }`}
                            data-cursor="pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                                  isSelected
                                    ? "bg-white/15 text-[#D4AF37]"
                                    : "bg-[#123C2F]/10 text-[#123C2F] group-hover:bg-[#123C2F] group-hover:text-white"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-serif text-base font-bold truncate">
                                  {node.title}
                                </h4>
                                <p
                                  className={`text-[11px] font-mono truncate ${
                                    isSelected ? "text-white/70" : "text-[#666666]"
                                  }`}
                                >
                                  {node.category}
                                </p>
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 shrink-0 transition-transform ${
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
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="editorial-card p-6 sm:p-8 bg-white space-y-6 rounded-3xl border border-[#123C2F]/15 shadow-sm"
                        >
                          {/* Header */}
                          <div className="space-y-3 pb-6 border-b border-[#123C2F]/10">
                            <div className="flex items-center justify-between flex-wrap gap-2">
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
                          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-mono text-emerald-900">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                              <span>Applied directly in production & hackathons.</span>
                            </div>
                            <span className="font-bold">2026 ROADMAP</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Tab 2: Verified Credentials & Specializations Gallery */
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#123C2F]/10">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
                        Verified Specializations & Credentials
                      </h3>
                      <p className="text-xs font-mono text-[#666666] mt-0.5">
                        University of London, Meta, Cisco & Udemy accredited credentials
                      </p>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                      <Search className="w-3.5 h-3.5 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search credentials..."
                        className="w-full pl-9 pr-3 py-2 rounded-full text-xs font-mono bg-white border border-[#123C2F]/20 focus:outline-none focus:border-[#123C2F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCerts.map((cert) => (
                      <div
                        key={cert.id}
                        onMouseEnter={() => soundManager.playHover()}
                        className="editorial-card p-5 bg-white flex flex-col justify-between border border-[#123C2F]/15 rounded-2xl relative group overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300"
                      >
                        <div className="space-y-3">
                          {/* Thumbnail Preview with Inspect Button */}
                          <div
                            onClick={() => {
                              soundManager.playClick();
                              setActiveCertDetail(cert);
                            }}
                            className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-100 border border-[#123C2F]/15 cursor-pointer group/thumb shadow-inner"
                            data-cursor="pointer"
                          >
                            <img
                              src={cert.imagePreview}
                              alt={`${cert.title} Certificate`}
                              className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-[#123C2F]/70 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold">
                              <Eye className="w-4 h-4 text-[#D4AF37]" />
                              <span>Inspect Certificate</span>
                            </div>
                            <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-[#123C2F]/90 text-[#F7F7F3] font-mono text-[9px] font-bold shadow-xs">
                              {cert.badge}
                            </span>
                          </div>

                          {/* Info */}
                          <div>
                            <div className="flex items-center justify-between text-[11px] font-mono text-[#888888] mb-1">
                              <span className="text-emerald-700 font-bold">✓ Verified</span>
                              <span>{cert.date}</span>
                            </div>
                            <h4
                              onClick={() => {
                                soundManager.playClick();
                                setActiveCertDetail(cert);
                              }}
                              className="font-serif text-base sm:text-lg font-bold text-[#111111] group-hover:text-[#123C2F] transition-colors cursor-pointer leading-snug"
                            >
                              {cert.title}
                            </h4>
                            <p className="font-mono text-xs font-bold text-[#123C2F] mt-0.5">
                              {cert.organization}
                            </p>
                          </div>

                          <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                            {cert.capstone}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#123C2F]/10 grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              soundManager.playClick();
                              setActiveCertDetail(cert);
                            }}
                            className="py-2 px-2.5 rounded-xl bg-[#F7F7F3] hover:bg-[#123C2F]/10 text-[#123C2F] font-mono text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                            data-cursor="pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Inspect</span>
                          </button>
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2 px-2.5 rounded-xl bg-[#123C2F] hover:bg-[#1A5442] text-[#F7F7F3] font-mono text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                            data-cursor="pointer"
                          >
                            <span>Verify ↗</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* High-Resolution Certificate Lightbox Detail Modal */}
          <AnimatePresence>
            {activeCertDetail && (
              <div
                data-lenis-prevent="true"
                className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveCertDetail(null);
                  }}
                  className="fixed inset-0 bg-[#111111]/85 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  onClick={(e) => e.stopPropagation()}
                  data-lenis-prevent="true"
                  className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#123C2F]/20 shadow-2xl overflow-hidden z-20 max-h-[90vh] flex flex-col overscroll-contain"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#123C2F]/10 bg-[#F7F7F3] shrink-0">
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
                      className="p-1.5 rounded-full hover:bg-black/10 text-[#111111] transition-colors"
                      aria-label="Close"
                      data-cursor="pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div
                    data-lenis-prevent="true"
                    className="overflow-y-auto modal-scrollbar p-6 space-y-6 flex-1"
                  >
                    {activeCertDetail.imagePreview && (
                      <div className="rounded-2xl overflow-hidden border border-[#123C2F]/20 shadow-md bg-stone-50">
                        <img
                          src={activeCertDetail.imagePreview}
                          alt={`${activeCertDetail.title} Certificate`}
                          className="w-full max-h-[50vh] object-contain mx-auto"
                        />
                      </div>
                    )}

                    <div className="p-4 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/10 space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#123C2F] font-bold">
                        Specialization Capstone Deliverable
                      </span>
                      <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                        {activeCertDetail.capstone}
                      </p>
                    </div>

                    <div className="flex items-center justify-between font-mono text-xs pt-2">
                      <span className="text-[#666666]">ID: {activeCertDetail.credentialId}</span>
                      <a
                        href={activeCertDetail.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#123C2F] text-[#F7F7F3] font-bold flex items-center gap-1.5 hover:bg-[#1A5442] transition-colors shadow-xs"
                        data-cursor="pointer"
                      >
                        <span>Verify Credential Online</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
