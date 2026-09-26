import React, { useState } from "react";
import { X, ExternalLink, CheckCircle2, Copy, Check, Terminal, Play, ShieldAlert, Cpu, Sparkles, AlertCircle } from "lucide-react";
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
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto overscroll-contain"
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
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          className="relative w-full max-w-4xl bg-white rounded-3xl border border-amber-200/80 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col overscroll-contain"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-200 bg-slate-50 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 to-indigo-950 text-amber-200 border border-amber-400/50 font-mono text-xs font-semibold">
                {project.category}
              </span>
              <span className="font-mono text-xs text-slate-500 hidden sm:inline">{project.year}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
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
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-950 text-white border border-amber-400/50 hover:border-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-900/20 transition-all hover:scale-105"
                  title="Launch Live Project in New Tab"
                >
                  <span>Launch Live App</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
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
                  className="p-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors hidden sm:flex items-center"
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
                className="p-2 rounded-full hover:bg-slate-200 text-slate-700 transition-colors"
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
            className="overflow-y-auto modal-scrollbar p-6 sm:p-8 space-y-8 flex-1"
          >
            {/* Title & Tagline */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-800 font-bold">
                  Role: {project.role}
                </span>
                {project.featuredBadge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-50 text-amber-900 font-bold border border-amber-300">
                    {project.featuredBadge}
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-900 tracking-tight">
                {project.title}
              </h2>
              <p className="text-base text-slate-600 mt-2 font-sans font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab("overview");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-blue-700 to-indigo-950 text-white border border-amber-400/50 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "architecture"
                    ? "bg-gradient-to-r from-blue-700 to-indigo-950 text-white border border-amber-400/50 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
                data-cursor="pointer"
              >
                Technical Architecture
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab("liveSimulator");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === "liveSimulator"
                    ? "bg-gradient-to-r from-blue-700 to-indigo-950 text-amber-200 border border-amber-400/50 shadow-sm"
                    : "text-blue-900 bg-amber-50 hover:bg-amber-100 border border-amber-300"
                }`}
                data-cursor="pointer"
              >
                <Play className="w-3 h-3 fill-current text-amber-600" />
                <span>Live Interactive Sandbox</span>
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Full Width Project High-Res Cover Preview */}
                {project.coverImage && (
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 group">
                    <img
                      src={project.coverImage}
                      alt={`${project.title} Cover`}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                      <span className="bg-slate-900/75 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                        {project.title} • Production Interface
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
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 font-mono text-xs font-semibold"
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
                  <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200 shadow-xs">
                    <div className="flex items-center gap-2 text-red-700 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>The Problem</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {project.problemSolved}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 shadow-xs">
                    <div className="flex items-center gap-2 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>The Engineered Solution</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Key Features List */}
                {project.keyFeatures && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold mb-3">
                      Core Capabilities & Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.keyFeatures.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Badges */}
                {project.technologies && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold mb-3">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs font-semibold text-slate-700"
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
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold mb-2">
                    System Architecture & Design Decisions
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Code Terminal */}
                {project.codeSnippet && (
                  <div className="rounded-2xl bg-slate-900 text-slate-100 overflow-hidden border border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/60">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-sky-400" />
                        <span className="font-mono text-xs text-slate-400">
                          {project.title.toLowerCase().replace(/\s+/g, "-")}.core
                        </span>
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono bg-white/10 hover:bg-white/20 text-white transition-colors"
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
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-5 text-xs font-mono text-sky-300 overflow-x-auto leading-relaxed">
                      <code>{project.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Live Simulator Sandbox */}
            {activeTab === "liveSimulator" && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Interactive {project.title} Engine Simulator
                    </h3>
                    <p className="text-xs text-slate-500">
                      Execute a simulated payload to observe the algorithmic evaluation pipeline in real time.
                    </p>
                  </div>
                  <button
                    onClick={runSimulation}
                    disabled={simulationState.running}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 shadow-sm shadow-blue-500/20"
                    data-cursor="pointer"
                  >
                    {simulationState.running ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
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
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs">
                  {simulationState.running ? (
                    <div className="space-y-2 py-4">
                      <div className="flex items-center gap-2 text-blue-600">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                        <span>Step {simulationState.step}/3: Parsing ingested payload & running model inference...</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 animate-pulse w-3/4 rounded-full" />
                      </div>
                    </div>
                  ) : simulationState.output ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-emerald-700 font-bold">
                        <span>● STATUS: {simulationState.output.status}</span>
                        <span className="text-[10px] text-slate-500 font-medium">LIVE RESULT</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {Object.entries(simulationState.output).map(([key, val]) => {
                          if (key === "status") return null;
                          return (
                            <div key={key} className="p-2 rounded bg-white border border-slate-200">
                              <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, " $1")}: </span>
                              <span className="font-semibold text-slate-900">{Array.isArray(val) ? val.join(", ") : val}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-500 py-3 text-center">
                      Click <strong className="text-blue-600">"Run Live Pipeline"</strong> to test model response and API data pipeline.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
            <div className="text-xs text-slate-500">
              Designed & Engineered by <span className="font-semibold text-slate-900">Daksh Soni</span>
            </div>
            <div className="flex items-center gap-3">
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
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
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all hover:scale-105"
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
