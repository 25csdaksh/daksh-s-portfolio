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
          className="fixed inset-0 bg-[#111111]/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          className="relative w-full max-w-4xl bg-[#F7F7F3] rounded-3xl border border-[#123C2F]/20 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col overscroll-contain"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#123C2F]/10 bg-white/80 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#123C2F] text-[#F7F7F3] font-mono text-xs font-semibold">
                {project.category}
              </span>
              <span className="font-mono text-xs text-[#666666]">{project.year}</span>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2 rounded-full hover:bg-[#123C2F]/10 text-[#111111] transition-colors"
              data-cursor="pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div
            data-lenis-prevent="true"
            className="overflow-y-auto modal-scrollbar p-6 sm:p-8 space-y-8 flex-1"
          >
            {/* Title & Tagline */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#123C2F] font-semibold">
                  Role: {project.role}
                </span>
                {project.featuredBadge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#D4AF37]/20 text-[#8A7114] font-semibold">
                    {project.featuredBadge}
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#111111] tracking-tight">
                {project.title}
              </h2>
              <p className="text-base text-[#666666] mt-2 font-sans font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#123C2F]/10 pb-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab("overview");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "overview"
                    ? "bg-[#123C2F] text-[#F7F7F3] shadow-sm"
                    : "text-[#666666] hover:text-[#111111] hover:bg-black/5"
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
                    ? "bg-[#123C2F] text-[#F7F7F3] shadow-sm"
                    : "text-[#666666] hover:text-[#111111] hover:bg-black/5"
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
                    ? "bg-[#123C2F] text-[#F7F7F3] shadow-sm"
                    : "text-[#123C2F] bg-[#123C2F]/10 hover:bg-[#123C2F]/15"
                }`}
                data-cursor="pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Live Interactive Sandbox</span>
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Full Width Project High-Res Cover Preview */}
                {project.coverImage && (
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#123C2F]/20 shadow-md bg-stone-900 group">
                    <img
                      src={project.coverImage}
                      alt={`${project.title} Cover`}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                      <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                        {project.title} • Production Interface
                      </span>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-[#123C2F] hover:bg-[#1A5442] text-white px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
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
                  <div className="p-5 rounded-2xl bg-white border border-red-500/20 shadow-xs">
                    <div className="flex items-center gap-2 text-red-700 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>The Problem</span>
                    </div>
                    <p className="text-sm text-[#444444] leading-relaxed">
                      {project.problemSolved}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#123C2F]/20 shadow-xs">
                    <div className="flex items-center gap-2 text-[#123C2F] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>The Engineered Solution</span>
                    </div>
                    <p className="text-sm text-[#444444] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Key Features List */}
                {project.keyFeatures && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#123C2F] font-bold mb-3">
                      Core Capabilities & Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.keyFeatures.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/70 border border-[#123C2F]/10 text-xs text-[#222222] font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#123C2F] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Badges */}
                {project.technologies && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#123C2F] font-bold mb-3">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg bg-white border border-[#123C2F]/15 font-mono text-xs font-semibold text-[#123C2F]"
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
                <div className="p-5 rounded-2xl bg-white border border-[#123C2F]/15">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#123C2F] font-bold mb-2">
                    System Architecture & Design Decisions
                  </h3>
                  <p className="text-sm text-[#444444] leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Code Terminal */}
                {project.codeSnippet && (
                  <div className="rounded-2xl bg-[#111111] text-[#F7F7F3] overflow-hidden border border-white/10 shadow-xl">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-mono text-xs text-white/70">
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
                    <pre className="p-5 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                      <code>{project.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Live Simulator Sandbox */}
            {activeTab === "liveSimulator" && (
              <div className="p-6 rounded-2xl bg-white border border-[#123C2F]/20 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#111111]">
                      Interactive {project.title} Engine Simulator
                    </h3>
                    <p className="text-xs text-[#666666]">
                      Execute a simulated payload to observe the algorithmic evaluation pipeline in real time.
                    </p>
                  </div>
                  <button
                    onClick={runSimulation}
                    disabled={simulationState.running}
                    className="px-4 py-2 rounded-xl bg-[#123C2F] text-[#F7F7F3] text-xs font-semibold hover:bg-[#1A5442] disabled:opacity-50 flex items-center gap-2 shadow-md"
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
                <div className="p-4 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/10 font-mono text-xs">
                  {simulationState.running ? (
                    <div className="space-y-2 py-4">
                      <div className="flex items-center gap-2 text-[#123C2F]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span>Step {simulationState.step}/3: Parsing ingested payload & running model inference...</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#123C2F]/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#123C2F] animate-pulse w-3/4 rounded-full" />
                      </div>
                    </div>
                  ) : simulationState.output ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#123C2F]/10 text-emerald-800 font-bold">
                        <span>● STATUS: {simulationState.output.status}</span>
                        <span className="text-[10px] text-[#666666]">LIVE RESULT</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {Object.entries(simulationState.output).map(([key, val]) => {
                          if (key === "status") return null;
                          return (
                            <div key={key} className="p-2 rounded bg-white border border-[#123C2F]/10">
                              <span className="text-[#666666] capitalize">{key.replace(/([A-Z])/g, " $1")}: </span>
                              <span className="font-semibold text-[#111111]">{Array.isArray(val) ? val.join(", ") : val}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[#666666] py-3 text-center">
                      Click <strong className="text-[#123C2F]">"Run Live Pipeline"</strong> to test model response and API data pipeline.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#123C2F]/10 bg-white/90">
            <div className="text-xs text-[#666666]">
              Designed & Engineered by <span className="font-semibold text-[#111111]">Daksh Soni</span>
            </div>
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#123C2F]/20 text-xs font-semibold text-[#111111] hover:bg-[#123C2F]/10 transition-colors"
                  data-cursor="pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#123C2F] text-[#F7F7F3] text-xs font-semibold hover:bg-[#1A5442] shadow-sm transition-all"
                  data-cursor="pointer"
                >
                  <span>Live Demo</span>
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
