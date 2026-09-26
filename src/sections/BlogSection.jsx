import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, Calendar, Sparkles } from "lucide-react";
import { blogPostsData } from "../data/blog";
import { soundManager } from "../utils/sound";

export function BlogSection({ onSelectPost }) {
  return (
    <section id="blog" className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#050B1A]/80 backdrop-blur-sm text-white border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>05 // Thoughts & Essays</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
              Insights & <span className="gradient-text-gold">Perspectives.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-xs leading-relaxed">
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
              className="editorial-card p-5 sm:p-8 bg-[#091328] hover:bg-[#0E1D3E] border border-amber-400/30 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/10 rounded-2xl space-y-4 sm:space-y-5 flex flex-col justify-between group cursor-pointer transition-all duration-300"
              data-cursor="pointer"
            >
              <div className="space-y-3 sm:space-y-4">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 font-mono text-[10px] font-black uppercase tracking-wider shadow-xs">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-heading font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 mt-2 line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Link Action */}
              <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                <span className="group-hover:underline font-extrabold">Read Complete Essay</span>
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 flex items-center justify-center font-bold transition-all transform group-hover:translate-x-1 shadow-sm">
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
