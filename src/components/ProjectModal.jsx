import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, Copy, Check, Terminal, Play, Sparkles, AlertCircle } from "lucide-react";
import { Github } from "./Icons";
import { soundManager } from "../utils/sound";

export function ProjectModal({ project, onClose }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // overview, architecture, liveSimulator
  const [simulationState, setSimulationState] = useState({
    running: false,
    output: null,
    step: 0
  });

  if (!project) return null;

  const handleCopyCode = () => {
    soundManager.playClick();
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const runSimulation = () => {
    soundManager.playClick();
    setSimulationState({ running: true, output: null, step: 1 });

    setTimeout(() => {
      setSimulationState(prev => ({ ...prev, step: 2 }));
    }, 800);

    setTimeout(() => {
      let result = {};
      if (project.id === "netram-deepfake-defense") {
        result = {
          streamSource: "Google Meet / WebRTC (1080p @ 30fps)",
          cascadeTriage: "PASSED (0.14s Triage)",
          facialMeshLandmarks: "468 points aligned (MediaPipe)",
          spectralFFTArtifacts: "None detected (Log-magnitude: 0.04)",
          audioSyncScore: "98.2% Lip-Sync Alignment (Wav2Lip)",
          livenessCheck: "Micro-motion verified (Blink dynamic natural)",
          finalVerdict: "AUTHENTIC / REAL STREAM",
          status: "SUCCESS (Processed in 18ms via WebSocket Engine)"
        };
      } else if (project.id === "shreejee-education") {
        result = {
          invoiceId: "INV-2026-SHREEJEE-8841",
          studentName: "Aarav S. Patel (Class 10-A)",
          termBilling: "Quarter 2 Tuition & Activity Fee",
          amountPaid: "₹38,500 (Razorpay Secured)",
          smsNotification: "WhatsApp & SMS dispatched to parent",
          ledgerReconciliation: "100% RECONCILED",
          status: "INVOICE DISPATCHED & ARCHIVED"
        };
      } else if (project.id === "devkrupa-jewellers") {
        result = {
          productSample: "22K Hallmark Antique Gold Bridal Necklace (48.5g)",
          liveBullionRate: "₹7,450 / gram (24K Pure Benchmark)",
          baseMetalValue: "₹3,31,048",
          makingCharges: "₹33,104 (10% Handcrafted)",
          gst3Percent: "₹10,924",
          estimatedTotal: "₹3,75,076",
          status: "CALCULATED & READY FOR WHATSAPP INQUIRY"
        };
      } else if (project.id === "swayur-agrotech") {
        result = {
          biologicalStrain: "KshetraPal Bio-NPK Consortia (Liquid 500 ml)",
          viableCellCount: "1.5 x 10^8 CFU/ml (High-Density Inoculant)",
          targetCrops: "Cotton, Groundnut, Paddy, Sugarcane, Vegetables",
          fcoCompliance: "FCO 1985 Schedule I Certified • Anand, Gujarat",
          recommendedDosage: "500 ml / acre via Drip Irrigation or Soil Drenching",
          whatsappPayload: "Generated instant inquiry for Gujarat regional dealer",
          status: "CALCULATED & READY FOR DISPATCH"
        };
      } else if (project.id === "vidyapath-learning") {
        result = {
          curriculumTrack: "Semester 5: Advanced Data Structures & Operating Systems",
          activeModule: "Dynamic Programming: Longest Common Subsequence",
          testCaseExecution: "15/15 Test Cases Passed (0.02s Execution)",
          placementReadiness: "88.5% Core CS Benchmark Score",
          aiDoubtResolution: "Live code explanation generated in JetBrains Mono interface",
          status: "STUDENT MILESTONE LOGGED & REWARD UNLOCKED"
        };
      } else {
        result = {
          marketOracle: "MCX Gold & Bullion Telemetry",
          gold24KPurity: "₹74,500 / 10g",
          gold22KPurity: "₹68,242 / 10g (91.6 Hallmark)",
          silverPurity: "₹89,200 / 1 kg",
          appointmentSlot: "Bridal Suite Consultation Confirmed",
          status: "LIVE RATE SYNCED & APPOINTMENT BOOKED"
        };
      }
      setSimulationState({ running: false, output: result, step: 3 });
      soundManager.playChime();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-8 overflow-y-auto overscroll-contain"
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

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          className="relative w-full max-w-4xl bg-[#091328] rounded-3xl border border-amber-400/40 shadow-2xl shadow-blue-950/80 overflow-hidden z-10 max-h-[92vh] flex flex-col overscroll-contain text-white"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#050B1A] shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 font-mono text-[11px] sm:text-xs font-bold shadow-xs shrink-0">
                {project.category}
              </span>
              <span className="font-mono text-xs text-amber-300/80 hidden sm:inline">{project.year}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playClick();
                    window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-blue-950 font-mono text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:shadow-amber-400/30 transition-all hover:scale-105"
                  title="Launch Live Project in New Tab"
                >
                  <span className="hidden sm:inline">Launch Live App</span>
                  <span className="sm:hidden">Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-950 stroke-[2.5]" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playClick();
                    window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-2 rounded-xl border border-white/15 bg-[#091328] hover:bg-[#0E1D3E] hover:border-amber-400 text-slate-200 hover:text-amber-300 transition-colors hidden sm:flex items-center"
                  title="View Source on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="p-2 rounded-full bg-[#091328] hover:bg-[#0E1D3E] text-slate-300 hover:text-white border border-white/15 transition-colors"
                data-cursor="pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div
            data-lenis-prevent="true"
            className="overflow-y-auto modal-scrollbar p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1"
          >
            {/* Title & Tagline */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Role: {project.role}
                </span>
                {project.featuredBadge && (
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-amber-400/15 text-amber-300 font-bold border border-amber-400/40">
                    {project.featuredBadge}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-200 mt-2 font-sans font-normal leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Navigation Tabs - Mobile Horizontally Scrollable */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar shrink-0">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab("overview");
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all shrink-0 ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 shadow-md shadow-amber-500/20"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                data-cursor="pointer"
              >
                Overview & Impact
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab("architecture");
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all shrink-0 ${
                  activeTab === "architecture"
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 shadow-md shadow-amber-500/20"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                data-cursor="pointer"
              >
                Architecture & Code
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab("liveSimulator");
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all shrink-0 ${
                  activeTab === "liveSimulator"
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 shadow-md shadow-amber-500/20"
                    : "text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30"
                }`}
                data-cursor="pointer"
              >
                <Play className="w-3 h-3 fill-current text-amber-400 group-hover:text-blue-950" />
                <span>Live Interactive Sandbox</span>
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Full Width Project High-Res Cover Preview */}
                {project.coverImage && (
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-amber-400/30 shadow-xl bg-[#050B1A] group">
                    <img
                      src={project.coverImage}
                      alt={`${project.title} Cover`}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050B1A]/90 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white font-mono text-xs gap-2">
                      <span className="bg-[#050B1A]/85 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-lg border border-amber-400/30 text-amber-300 font-bold text-[11px] truncate">
                        {project.title} • Production App
                      </span>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.playClick();
                            window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                          }}
                          className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-blue-950 font-extrabold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md hover:scale-105 font-mono text-xs transition-all shrink-0"
                        >
                          <span>Open Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Problem vs Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-red-950/20 border border-red-800/40 shadow-xs">
                    <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                      <span>The Problem</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {project.problemSolved}
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1D3E]/80 border border-amber-400/40 shadow-xs">
                    <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>The Engineered Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Key Features List */}
                {project.keyFeatures && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-3">
                      Core Capabilities & Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {project.keyFeatures.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-[#050B1A] border border-white/10 text-xs text-slate-200 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Badges */}
                {project.technologies && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-3">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 sm:px-3 py-1 rounded-lg bg-[#050B1A] border border-amber-400/30 font-mono text-xs font-bold text-amber-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Architecture & Code Snippet */}
            {activeTab === "architecture" && (
              <div className="space-y-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#050B1A] border border-white/10">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
                    System Architecture & Design Decisions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    {project.summary}
                  </p>
                </div>

                {/* Code Terminal */}
                {project.codeSnippet && (
                  <div className="rounded-2xl bg-[#050A17] text-slate-100 overflow-hidden border border-amber-400/30 shadow-xl">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#050B1A]">
                      <div className="flex items-center gap-2 min-w-0">
                        <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-mono text-xs text-amber-300 font-semibold truncate">
                          {project.title.toLowerCase().replace(/\s+/g, "-")}.core
                        </span>
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/40 transition-colors shrink-0"
                        data-cursor="pointer"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 sm:p-5 text-xs font-mono text-amber-200 overflow-x-auto leading-relaxed">
                      <code>{project.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Live Simulator Sandbox */}
            {activeTab === "liveSimulator" && (
              <div className="p-4 sm:p-6 rounded-2xl bg-[#050B1A] border border-amber-400/40 space-y-4 sm:space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Interactive {project.title} Engine Simulator
                    </h3>
                    <p className="text-xs text-slate-300">
                      Execute a simulated payload to observe the algorithmic evaluation pipeline in real time.
                    </p>
                  </div>
                  <button
                    onClick={runSimulation}
                    disabled={simulationState.running}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-blue-950 text-xs font-extrabold disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 shrink-0"
                    data-cursor="pointer"
                  >
                    {simulationState.running ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-blue-950/30 border-t-blue-950 animate-spin" />
                        <span>Evaluating...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Run Live Pipeline</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Simulation Output Window */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#050A17] border border-white/10 font-mono text-xs">
                  {simulationState.running ? (
                    <div className="space-y-2 py-4">
                      <div className="flex items-center gap-2 text-amber-400">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <span className="text-[11px] sm:text-xs">Step {simulationState.step}/3: Parsing ingested payload & running model inference...</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#091328] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 animate-pulse w-3/4 rounded-full" />
                      </div>
                    </div>
                  ) : simulationState.output ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 text-emerald-400 font-bold">
                        <span className="text-xs truncate">● STATUS: {simulationState.output.status}</span>
                        <span className="text-[10px] text-amber-300 font-medium shrink-0 ml-2">LIVE RESULT</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {Object.entries(simulationState.output).map(([key, val]) => {
                          if (key === "status") return null;
                          return (
                            <div key={key} className="p-2.5 rounded-lg bg-[#050B1A] border border-white/10">
                              <span className="text-amber-400/80 capitalize">{key.replace(/([A-Z])/g, " $1")}: </span>
                              <span className="font-semibold text-white">{Array.isArray(val) ? val.join(", ") : val}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-400 py-3 text-center text-xs">
                      Click <strong className="text-amber-400">"Run Live Pipeline"</strong> to test model response and API data pipeline.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-t border-white/10 bg-[#050B1A] gap-3">
            <div className="text-xs text-slate-300 font-mono text-center sm:text-left">
              Designed & Engineered by <span className="font-bold text-amber-300">Daksh Soni</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playClick();
                    window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full border border-white/15 bg-[#091328] text-xs font-bold text-slate-200 hover:text-amber-300 hover:border-amber-400 transition-colors font-mono"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playClick();
                    window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-blue-950 text-xs font-extrabold shadow-md shadow-amber-500/20 hover:scale-105 transition-all font-mono"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
