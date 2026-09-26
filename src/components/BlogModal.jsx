import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Calendar, Bookmark, Share2, ArrowLeft } from "lucide-react";
import { soundManager } from "../utils/sound";

export function BlogModal({ post, onClose }) {
  if (!post) return null;

  const handleShare = () => {
    soundManager.playClick();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
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
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          className="relative w-full max-w-3xl bg-white rounded-3xl border border-amber-200/80 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col overscroll-contain"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-blue-800 hover:text-amber-700"
              data-cursor="pointer"
            >
              <ArrowLeft className="w-4 h-4 text-amber-600" />
              <span>Back to Insights</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-amber-50 text-slate-600 hover:text-blue-900 transition-colors"
                title="Share article"
                data-cursor="pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-700 transition-colors"
                data-cursor="pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Article Scroll Body */}
          <div
            data-lenis-prevent="true"
            className="overflow-y-auto modal-scrollbar p-6 sm:p-10 space-y-6 flex-1"
          >
            <div className="space-y-3 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-mono text-xs font-bold">
                  {post.category}
                </span>
                <div className="flex items-center gap-1 font-mono text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-900 leading-tight">
                {post.title}
              </h1>
              <p className="text-base text-slate-600 italic font-serif">
                "{post.excerpt}"
              </p>
            </div>

            {/* Rendered content */}
            <div className="prose prose-slate max-w-none text-slate-700 font-sans leading-relaxed text-sm sm:text-base space-y-4">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-sans font-bold text-slate-900 pt-4">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("```")) {
                  const cleanedCode = paragraph.replace(/```[a-z]*/g, "").trim();
                  return (
                    <pre key={index} className="p-4 rounded-xl bg-slate-950 text-amber-300 font-mono text-xs overflow-x-auto my-3 border border-amber-500/20">
                      <code>{cleanedCode}</code>
                    </pre>
                  );
                }
                return (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Author Footer */}
            <div className="mt-8 p-6 rounded-2xl bg-amber-50/40 border border-amber-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 text-amber-300 border border-amber-400/80 flex items-center justify-center font-sans font-black text-base shadow-sm">
                  DS
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Daksh Soni</h4>
                  <p className="text-xs text-slate-500">Computer Science Engineer & Product Builder</p>
                </div>
              </div>
              <a
                href="#contact"
                onClick={() => onClose()}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-950 text-white border border-amber-400/50 hover:border-amber-300 text-xs font-semibold shadow-sm transition-colors"
              >
                Discuss Topic →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
