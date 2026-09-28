import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Gift, 
  Sparkles, 
  BookOpen, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Code, 
  FileCode2, 
  Palette, 
  ArrowUpRight,
  Terminal,
  Cpu,
  Layers,
  ChevronRight,
  FileCheck,
  Eye
} from "lucide-react";
import { giftNotesData } from "../data/giftNotes";
import { soundManager } from "../utils/sound";

export function GiftForCodersSection({ onOpenGiftModal }) {
  const [activePreviewId, setActivePreviewId] = useState("c-lang");

  const getIcon = (id) => {
    if (id === "c-lang") return <Code className="w-6 h-6 text-blue-400" />;
    if (id === "html-course") return <FileCode2 className="w-6 h-6 text-orange-400" />;
    if (id === "css-notes") return <Palette className="w-6 h-6 text-teal-400" />;
    if (id === "js-notes") return <Sparkles className="w-6 h-6 text-amber-400" />;
    return <Layers className="w-6 h-6 text-cyan-400" />;
  };

  const getTagColor = (id) => {
    if (id === "c-lang") return "bg-blue-500/15 text-blue-300 border-blue-500/30";
    if (id === "html-course") return "bg-orange-500/15 text-orange-300 border-orange-500/30";
    if (id === "css-notes") return "bg-teal-500/15 text-teal-300 border-teal-500/30";
    if (id === "js-notes") return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
  };

  const getNoteShortName = (id) => {
    if (id === "c-lang") return "C Notes";
    if (id === "html-course") return "HTML Course";
    if (id === "css-notes") return "CSS Notes";
    if (id === "js-notes") return "JavaScript";
    if (id === "react-notes") return "React.js";
    return "Notes";
  };

  const handleOpenNote = (id) => {
    soundManager.playClick();
    if (onOpenGiftModal) {
      onOpenGiftModal(id);
    }
  };

  return (
    <section id="gift-for-coders" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#050117] text-white overflow-hidden border-t border-purple-500/20">
      {/* Background Decorative Cosmic Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-purple-500/20">
          <div className="space-y-3">
            {/* Section Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 font-mono text-xs uppercase tracking-widest font-bold">
              <Gift className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>FREE DEVELOPER RESOURCES</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Gift for <span className="gradient-text-gold">Coders.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
              Carefully curated, self-contained, dark-mode cheat sheets and full courses. Designed for rapid exam revision, interview prep, and zero-distraction coding reference.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="/gift-for-coders.html"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="px-5 py-2.5 rounded-full bg-purple-500/15 hover:bg-purple-500/30 text-purple-200 hover:text-white border border-purple-400/30 font-mono text-xs font-bold transition-all flex items-center gap-2"
            >
              <span>Dedicated Portal View</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-purple-300" />
            </a>

            <button
              onClick={() => handleOpenNote("c-lang")}
              onMouseEnter={() => soundManager.playHover()}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 font-mono text-xs font-extrabold shadow-md shadow-amber-500/20 hover:scale-[1.03] transition-all flex items-center gap-2 border border-yellow-300"
            >
              <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Launch Reader</span>
            </button>
          </div>
        </div>

        {/* 5 Prominent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {giftNotesData.map((note) => (
            <motion.div
              key={note.id}
              whileHover={{ y: -6 }}
              onMouseEnter={() => soundManager.playHover()}
              className="p-6 sm:p-8 rounded-3xl bg-[#0e072e]/90 border border-purple-500/30 hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-purple-900/30 backdrop-blur-md relative overflow-hidden"
            >
              {/* Subtle Card Header Tone Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-amber-400/10 transition-colors pointer-events-none" />

              <div className="space-y-5">
                {/* Badge & Tagline */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#160b45] border border-purple-400/30 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {getIcon(note.id)}
                  </div>
                  <span className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold border ${getTagColor(note.id)}`}>
                    {note.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <span className="font-mono text-xs text-amber-400 font-bold block mb-1">
                    //{note.tagline}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {note.subtitle}
                  </p>
                </div>

                {/* Key Features Bullet List */}
                <div className="space-y-2 pt-2 border-t border-purple-500/20">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-purple-300 font-bold block">
                    What's Included ({note.topicsCount}):
                  </span>
                  <ul className="space-y-1.5">
                    {note.features.slice(0, 4).map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-200 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-purple-500/20 flex flex-col gap-2.5">
                {/* Primary Direct Open in New Tab */}
                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 font-mono text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 hover:scale-[1.02] transition-all border border-yellow-300"
                >
                  <span>🚀 Open {getNoteShortName(note.id)} (New Tab)</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenNote(note.id)}
                    className="py-2 px-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/35 border border-purple-400/40 text-purple-200 hover:text-white font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Quick Preview</span>
                  </button>

                  <a
                    href={note.fileUrl}
                    download={note.downloadName}
                    onClick={() => soundManager.playClick()}
                    className="py-2 px-3 rounded-xl bg-[#140a3e] hover:bg-[#1f1057] text-purple-200 hover:text-white font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all border border-purple-500/30"
                    title="Download standalone single-file HTML"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capstone Box: Quick Explore All 5 Notes */}
        <div className="editorial-card p-6 sm:p-10 rounded-3xl border border-amber-400/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-purple-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
              <Sparkles className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-lg sm:text-2xl font-black text-white">
                Share with your classmates & coding buddies
              </h3>
              <p className="text-xs sm:text-sm text-purple-200">
                All 5 master cheat sheets work 100% offline in any browser with zero dependencies or installation.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => handleOpenNote("c-lang")}
              className="flex-1 md:flex-none px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 font-mono text-xs font-extrabold shadow-lg shadow-amber-500/25 hover:scale-105 transition-all border border-yellow-300 flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>Explore All 5 Notes</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
