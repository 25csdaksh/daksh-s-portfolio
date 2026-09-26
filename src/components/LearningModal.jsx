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
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 md:p-8 overscroll-contain select-none"
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
            className="fixed inset-0 bg-[#030014]/90 backdrop-blur-md"
          />

          {/* Main Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            className="relative w-full max-w-6xl h-[92vh] sm:h-[90vh] max-h-[860px] bg-[#0f072e] rounded-[24px] sm:rounded-3xl border border-purple-500/40 shadow-2xl shadow-purple-950/80 overflow-hidden z-10 flex flex-col overscroll-contain text-white"
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-8 py-3.5 sm:py-4.5 border-b border-purple-500/20 bg-[#080321] shrink-0 shadow-xs z-20">
              <div className="flex items-center gap-3">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-blue-950 border border-amber-300 flex items-center justify-center shadow-md font-bold shrink-0">
                  <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 text-blue-950 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                      Curriculum & Honors
                    </h2>
                    <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/40 font-bold">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>7 Pillars</span>
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-mono text-slate-300 mt-0.5">
                    Engineering Roadmap & Verified Credentials
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                {/* Tab Switcher Pills */}
                <div className="flex items-center bg-[#080321] p-1 rounded-full border border-purple-500/20">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab("roadmap");
                    }}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                      activeTab === "roadmap"
                        ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 shadow-md font-black"
                        : "text-slate-300 hover:text-white"
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
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                      activeTab === "credentials"
                        ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 shadow-md font-black"
                        : "text-slate-300 hover:text-white"
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
                  className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#080321] hover:bg-[#170c43] border border-purple-500/20 flex items-center justify-center text-slate-300 hover:text-white transition-all shrink-0"
                  aria-label="Close"
                  data-cursor="pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body Container */}
            <div
              data-lenis-prevent="true"
              className="overflow-y-auto overscroll-contain modal-scrollbar p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1"
            >
              {activeTab === "roadmap" ? (
                /* Tab 1: Interactive Engineering Roadmap */
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-white/10">
                    <div>
                      <h3 className="font-heading text-lg sm:text-2xl font-bold text-white">
                        CSE Curriculum & Architectural Roadmap
                      </h3>
                      <p className="text-xs font-mono text-slate-300 mt-0.5">
                        Select an engineering domain to inspect detailed focus areas
                      </p>
                    </div>
                    <span className="text-xs font-mono text-blue-950 font-black bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-1 rounded-full border border-amber-300 shrink-0 self-start sm:self-auto">
                      7 Core Pillars
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                    {/* Left Roadmap Selector List */}
                    <div className="lg:col-span-5 space-y-2">
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
                            className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                              isSelected
                                ? "bg-gradient-to-r from-[#170c43] via-[#220e58] to-[#0f072e] text-white border-purple-400 shadow-md scale-[1.01]"
                                : "bg-[#080321] border-purple-500/20 hover:border-purple-400/80 text-white hover:bg-[#170c43]"
                            }`}
                            data-cursor="pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={`w-8 sm:w-9 h-8 sm:h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                                  isSelected
                                    ? "bg-amber-400 text-blue-950 font-black shadow-xs"
                                    : "bg-[#0f072e] text-purple-300 group-hover:bg-amber-400 group-hover:text-blue-950"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-heading text-sm sm:text-base font-bold truncate text-white">
                                  {node.title}
                                </h4>
                                <p
                                  className={`text-[10px] sm:text-[11px] font-mono truncate ${
                                    isSelected ? "text-purple-200 font-semibold" : "text-slate-300"
                                  }`}
                                >
                                  {node.category}
                                </p>
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 shrink-0 transition-transform ${
                                isSelected ? "translate-x-1 text-purple-300" : "text-slate-400 group-hover:translate-x-1 group-hover:text-purple-300"
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
                          className="editorial-card p-5 sm:p-8 bg-[#080321] space-y-5 sm:space-y-6 rounded-3xl border border-purple-500/40 shadow-xl"
                        >
                          {/* Header */}
                          <div className="space-y-2.5 sm:space-y-3 pb-5 sm:pb-6 border-b border-purple-500/20">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/40 font-mono text-xs font-bold">
                                {selectedTopic.category}
                              </span>
                              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 font-black">
                                {selectedTopic.status}
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-3xl font-heading font-extrabold text-white">
                              {selectedTopic.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-normal">
                              {selectedTopic.summary}
                            </p>
                          </div>

                          {/* Subtopic Modules */}
                          <div className="space-y-3 sm:space-y-4">
                            <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                              Key Topics & Practical Focus Areas:
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                              {selectedTopic.topics.map((topic, tIdx) => (
                                <div
                                  key={tIdx}
                                  className="p-3 sm:p-3.5 rounded-xl bg-[#0f072e] border border-purple-500/20 text-xs text-slate-200 font-medium flex items-start gap-2.5 hover:border-purple-400 transition-colors"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                  <span>{topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Growth Commitment Callout */}
                          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0f072e] border border-purple-500/30 flex items-center justify-between text-xs font-mono text-purple-300 shadow-md">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                              <span className="text-[11px] sm:text-xs">Applied directly in production & hackathons.</span>
                            </div>
                            <span className="font-bold text-amber-400 shrink-0 ml-2">2026 ROADMAP</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Tab 2: Verified Credentials & Specializations Gallery */
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-purple-500/20">
                    <div>
                      <h3 className="font-heading text-lg sm:text-2xl font-bold text-white">
                        Verified Specializations & Credentials
                      </h3>
                      <p className="text-xs font-mono text-slate-300 mt-0.5">
                        University of London, Meta, Cisco & Udemy accredited credentials
                      </p>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                      <Search className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search credentials..."
                        className="w-full pl-9 pr-3 py-2 rounded-full text-base sm:text-xs font-mono bg-[#080321] border border-purple-500/30 text-white focus:outline-hidden focus:border-purple-400 focus:ring-1 focus:ring-purple-400 placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredCerts.map((cert) => (
                      <div
                        key={cert.id}
                        onMouseEnter={() => soundManager.playHover()}
                        className="editorial-card p-4 sm:p-5 bg-[#080321] flex flex-col justify-between border border-purple-500/20 rounded-2xl relative group overflow-hidden shadow-xl hover:border-purple-400 hover:shadow-2xl transition-all duration-300"
                      >
                        <div className="space-y-3">
                          {/* Thumbnail Preview with Inspect Button */}
                          <div
                            onClick={() => {
                              soundManager.playClick();
                              setActiveCertDetail(cert);
                            }}
                            className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#0f072e] border border-purple-500/20 cursor-pointer group/thumb shadow-inner"
                            data-cursor="pointer"
                          >
                            <img
                              src={cert.imagePreview}
                              alt={`${cert.title} Certificate`}
                              className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-[#080321]/85 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-2 text-purple-300 font-mono text-xs font-bold">
                              <Eye className="w-4 h-4 text-purple-400" />
                              <span>Inspect Certificate</span>
                            </div>
                            <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 font-mono text-[9px] font-black shadow-sm">
                              {cert.badge}
                            </span>
                          </div>

                          {/* Info */}
                          <div>
                            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                              <span className="text-purple-300 font-bold">✓ Verified</span>
                              <span>{cert.date}</span>
                            </div>
                            <h4
                              onClick={() => {
                                soundManager.playClick();
                                setActiveCertDetail(cert);
                              }}
                              className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer leading-snug"
                            >
                              {cert.title}
                            </h4>
                            <p className="font-mono text-xs font-bold text-amber-400 mt-0.5">
                              {cert.organization}
                            </p>
                          </div>

                          <p className="text-xs text-slate-200 leading-relaxed line-clamp-2 font-normal">
                            {cert.capstone}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-purple-500/20 grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              soundManager.playClick();
                              setActiveCertDetail(cert);
                            }}
                            className="py-2 px-2.5 rounded-xl bg-[#0f072e] hover:bg-[#170c43] border border-purple-500/20 hover:border-purple-400 text-slate-200 hover:text-purple-300 font-mono text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                            data-cursor="pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Inspect</span>
                          </button>
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 font-mono text-[11px] font-black flex items-center justify-center gap-1 shadow-md shadow-amber-500/20 hover:scale-105 transition-all"
                            data-cursor="pointer"
                          >
                            <span>Verify ↗</span>
                            <ExternalLink className="w-3 h-3 text-blue-950 stroke-[2.5]" />
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
                  className="fixed inset-0 bg-[#030014]/90 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  onClick={(e) => e.stopPropagation()}
                  data-lenis-prevent="true"
                  className="relative w-full max-w-4xl bg-[#0f072e] rounded-3xl border border-purple-500/40 shadow-2xl overflow-hidden z-20 max-h-[90vh] flex flex-col overscroll-contain text-white"
                >
                  <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-purple-500/20 bg-[#080321] shrink-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-blue-950 border border-amber-300 flex items-center justify-center font-bold shrink-0">
                        <Award className="w-4 sm:w-5 h-4 sm:h-5 text-blue-950 stroke-[2.5]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading text-sm sm:text-base font-bold text-white truncate">
                          {activeCertDetail.title}
                        </h3>
                        <p className="font-mono text-xs text-purple-300 font-bold truncate">
                          {activeCertDetail.organization} • {activeCertDetail.instructor}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundManager.playClick();
                        setActiveCertDetail(null);
                      }}
                      className="p-1.5 rounded-full bg-[#080321] hover:bg-[#170c43] text-slate-300 hover:text-white border border-purple-500/20 shrink-0 ml-2"
                      aria-label="Close"
                      data-cursor="pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div
                    data-lenis-prevent="true"
                    className="overflow-y-auto modal-scrollbar p-4 sm:p-6 space-y-4 sm:space-y-6 flex-1"
                  >
                    {activeCertDetail.imagePreview && (
                      <div className="rounded-2xl overflow-hidden border border-purple-500/20 shadow-md bg-[#080321]">
                        <img
                          src={activeCertDetail.imagePreview}
                          alt={`${activeCertDetail.title} Certificate`}
                          className="w-full max-h-[48vh] sm:max-h-[50vh] object-contain mx-auto"
                        />
                      </div>
                    )}

                    <div className="p-3.5 sm:p-4 rounded-xl bg-[#080321] border border-purple-500/30 space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                        Specialization Capstone Deliverable
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {activeCertDetail.capstone}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs pt-2">
                      <span className="text-slate-400">ID: {activeCertDetail.credentialId}</span>
                      <a
                        href={activeCertDetail.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-105 transition-all text-xs"
                        data-cursor="pointer"
                      >
                        <span>Verify Credential Online</span>
                        <ExternalLink className="w-3.5 h-3.5 text-blue-950 stroke-[2.5]" />
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
