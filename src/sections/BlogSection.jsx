import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, Calendar, Sparkles } from "lucide-react";
import { blogPostsData } from "../data/blog";
import { soundManager } from "../utils/sound";

export function BlogSection({ onSelectPost }) {
  return (
    <section id="blog" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-white/70 border-t border-b border-[#123C2F]/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#123C2F]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#123C2F] font-bold">
              <BookOpen className="w-4 h-4 text-[#123C2F]" />
              <span>05 // Thoughts & Essays</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#111111] tracking-tight">
              Insights & <span className="italic font-normal text-[#123C2F]">Perspectives.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-[#666666] max-w-xs">
            REFLECTIONS ON SOFTWARE CRAFTSMANSHIP, AI INTEGRATIONS & ENTREPRENEURSHIP.
          </p>
        </div>

        {/* Editorial Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {blogPostsData.map((post, idx) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -4 }}
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => {
                soundManager.playClick();
                onSelectPost(post);
              }}
              className="editorial-card p-6 sm:p-8 bg-[#F7F7F3] space-y-5 flex flex-col justify-between group cursor-pointer"
              data-cursor="pointer"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#123C2F]/10 text-[#123C2F] font-mono text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#888888]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] group-hover:text-[#123C2F] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Link Action */}
              <div className="pt-4 border-t border-[#123C2F]/10 flex items-center justify-between text-xs font-mono font-bold text-[#123C2F]">
                <span className="group-hover:underline">Read Complete Essay</span>
                <div className="w-7 h-7 rounded-full bg-white border border-[#123C2F]/10 flex items-center justify-center group-hover:bg-[#123C2F] group-hover:text-white transition-all transform group-hover:translate-x-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
