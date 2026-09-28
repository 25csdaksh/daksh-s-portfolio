import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gift, 
  X, 
  ExternalLink, 
  Download, 
  Maximize2, 
  Check, 
  Copy, 
  BookOpen, 
  Code, 
  FileCode2, 
  Palette, 
  Sparkles, 
  Search,
  Layers,
  HelpCircle,
  FolderDown
} from "lucide-react";
import { giftNotesData } from "../data/giftNotes";
import { soundManager } from "../utils/sound";

export function GiftForCodersModal({ isOpen, onClose, initialNoteId = "c-lang" }) {
  const [selectedNoteId, setSelectedNoteId] = useState(initialNoteId);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (initialNoteId) {
      setSelectedNoteId(initialNoteId);
    }
  }, [initialNoteId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentNote = giftNotesData.find((n) => n.id === selectedNoteId) || giftNotesData[0];

  const handleCopyLink = () => {
    soundManager.playClick();
    const url = `${window.location.origin}/notes/${currentNote.id === "c-lang" ? "c-notes.html" : currentNote.id === "html-course" ? "html-course.html" : "css-notes.html"}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getIcon = (id) => {
    if (id === "c-lang") return <Code className="w-4 h-4 text-blue-400" />;
    if (id === "html-course") return <FileCode2 className="w-4 h-4 text-orange-400" />;
    if (id === "css-notes") return <Palette className="w-4 h-4 text-teal-400" />;
    if (id === "js-notes") return <Sparkles className="w-4 h-4 text-amber-400" />;
    return <Layers className="w-4 h-4 text-cyan-400" />;
  };

  const getNoteLabel = (id) => {
    if (id === "c-lang") return "C Language";
    if (id === "html-course") return "HTML (32 Ch)";
    if (id === "css-notes") return "CSS Notes";
    if (id === "js-notes") return "JavaScript";
    if (id === "react-notes") return "React.js";
    return "Note";
  };

  const filteredChapters = currentNote.chapters.filter((ch) =>
    ch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Dark Cosmic Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          soundManager.playClick();
          onClose();
        }}
        className="fixed inset-0 bg-[#02000c]/90 backdrop-blur-xl"
      />

      {/* Main Reader Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 25 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-7xl bg-[#0b0526] rounded-3xl border border-purple-400/40 shadow-2xl overflow-hidden z-10 flex flex-col text-white transition-all duration-300 ${
          isFullscreen ? "h-[98vh] max-h-[98vh]" : "h-[90vh] max-h-[90vh]"
        }`}
      >
        {/* Top App Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-purple-500/20 bg-[#08021d]/95 backdrop-blur-md">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-purple-950 flex items-center justify-center shadow-lg shadow-amber-500/25 border border-yellow-300">
              <Gift className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>Gift for Coders</span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-400/40">
                    5 MASTER NOTES
                  </span>
                </h3>
              </div>
              <p className="font-mono text-[11px] text-purple-300 hidden sm:block">
                Curated by Daksh Soni • Interactive Complete Cheatsheets
              </p>
            </div>
          </div>

          {/* Quick Actions & Close */}
          <div className="flex items-center gap-2">
            {/* Direct Open in New Tab */}
            <a
              href={currentNote.fileUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/15 hover:bg-purple-500/30 text-purple-200 hover:text-white border border-purple-400/30 text-xs font-mono font-bold transition-colors"
              title="Open currently selected note in full standalone browser tab"
            >
              <span>Full Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Offline HTML Download */}
            <a
              href={currentNote.fileUrl}
              download={currentNote.downloadName}
              onClick={() => soundManager.playClick()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 text-xs font-mono font-black shadow-md shadow-amber-500/20 hover:scale-[1.03] transition-all border border-yellow-300"
              title="Download standalone single-file HTML for offline study"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden md:inline">Download HTML</span>
              <span className="md:hidden">HTML</span>
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => {
                soundManager.playClick();
                setIsFullscreen(!isFullscreen);
              }}
              className="p-2 rounded-full bg-purple-500/15 hover:bg-purple-500/30 text-purple-300 hover:text-white border border-purple-400/30 transition-colors"
              title="Toggle modal height"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-purple-500/20 hover:bg-red-500/80 text-purple-200 hover:text-white transition-colors border border-purple-400/30"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher Bar */}
        <div className="px-3 sm:px-6 py-2.5 bg-[#0e0631] border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-2">
          {/* Note Selection Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 max-w-full">
            {giftNotesData.map((note) => {
              const isSelected = note.id === selectedNoteId;
              return (
                <button
                  key={note.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedNoteId(note.id);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30 border border-purple-300"
                      : "bg-[#140a3e] text-slate-300 hover:text-white hover:bg-[#1f1057] border border-purple-500/20"
                  }`}
                >
                  {getIcon(note.id)}
                  <span>{getNoteLabel(note.id)}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Info & Copy Link */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <span className="hidden lg:inline-block text-purple-300">
              {currentNote.topicsCount}
            </span>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#140a3e] hover:bg-[#1f1057] text-purple-200 border border-purple-400/30 transition-colors text-[11px]"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
            </button>
          </div>
        </div>

        {/* Modal Main Content (Split on desktop if user searches or sidebar, full iframe viewer) */}
        <div className="flex-1 relative bg-[#070217] overflow-hidden flex flex-col">
          <iframe
            key={currentNote.id}
            src={currentNote.fileUrl}
            title={currentNote.title}
            className="w-full h-full border-0 bg-[#0f1115]"
          />
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="px-4 sm:px-6 py-2 bg-[#08021d] border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">{currentNote.title}</span>
            <span className="text-purple-400 hidden sm:inline">• Free for all students & developers</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/gift-for-coders.html"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:text-amber-300 underline font-bold"
            >
              Open Dedicated Portal ↗
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
