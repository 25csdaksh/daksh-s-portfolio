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
          className="fixed inset-0 bg-[#111111]/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          className="relative w-full max-w-3xl bg-[#F7F7F3] rounded-3xl border border-[#123C2F]/20 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col overscroll-contain"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#123C2F]/10 bg-white/80 backdrop-blur-sm shrink-0">
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#123C2F] hover:underline"
              data-cursor="pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Insights</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-[#123C2F]/10 text-[#666666] hover:text-[#111111] transition-colors"
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
                className="p-2 rounded-full hover:bg-[#123C2F]/10 text-[#111111] transition-colors"
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
            <div className="space-y-3 pb-6 border-b border-[#123C2F]/10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#123C2F]/10 text-[#123C2F] font-mono text-xs font-semibold">
                  {post.category}
                </span>
                <div className="flex items-center gap-1 font-mono text-xs text-[#666666]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs text-[#666666]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#111111] leading-tight">
                {post.title}
              </h1>
              <p className="text-base text-[#666666] italic font-serif">
                "{post.excerpt}"
              </p>
            </div>

            {/* Rendered content */}
            <div className="prose prose-stone max-w-none text-[#333333] font-sans leading-relaxed text-sm sm:text-base space-y-4">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-serif font-bold text-[#111111] pt-4">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("```")) {
                  const cleanedCode = paragraph.replace(/```[a-z]*/g, "").trim();
                  return (
                    <pre key={index} className="p-4 rounded-xl bg-[#111111] text-emerald-300 font-mono text-xs overflow-x-auto my-3">
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
            <div className="mt-8 p-6 rounded-2xl bg-white border border-[#123C2F]/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#123C2F] text-[#F7F7F3] flex items-center justify-center font-serif font-bold text-lg">
                  D
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111111]">Daksh Soni</h4>
                  <p className="text-xs text-[#666666]">Computer Science Engineer & Product Builder</p>
                </div>
              </div>
              <a
                href="#contact"
                onClick={() => onClose()}
                className="px-4 py-2 rounded-full bg-[#123C2F] text-[#F7F7F3] text-xs font-semibold"
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
