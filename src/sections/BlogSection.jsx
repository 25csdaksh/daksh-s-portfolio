import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, Calendar, Sparkles } from "lucide-react";
import { blogPostsData } from "../data/blog";
import { soundManager } from "../utils/sound";

export function BlogSection({ onSelectPost }) {
  return (
    <section id="blog" className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#080321]/80 backdrop-blur-sm text-white border-t border-b border-purple-500/20">
      {/* Background Cosmic Purple Ambiance */}
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-purple-400/15">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-purple-300 font-bold">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>05 // Thoughts & Essays</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
              Insights & <span className="gradient-text-cosmic">Perspectives.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-purple-200/80 max-w-xs leading-relaxed">
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
              className="editorial-card p-5 sm:p-8 bg-[#0f072e] hover:bg-[#170c43] border border-purple-400/30 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-400/20 rounded-2xl space-y-4 sm:space-y-5 flex flex-col justify-between group cursor-pointer transition-all duration-300"
              data-cursor="pointer"
            >
              <div className="space-y-3 sm:space-y-4">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-950 font-mono text-[10px] font-black uppercase tracking-wider shadow-xs">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-purple-400" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-heading font-extrabold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 mt-2 line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Link Action */}
              <div className="pt-3 sm:pt-4 border-t border-purple-400/15 flex items-center justify-between text-xs font-mono font-bold text-purple-300 group-hover:text-purple-200 transition-colors">
                <span className="group-hover:underline font-extrabold">Read Complete Essay</span>
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-950 flex items-center justify-center font-bold transition-all transform group-hover:translate-x-1 shadow-sm">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
