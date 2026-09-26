import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, Calendar, Sparkles } from "lucide-react";
import { blogPostsData } from "../data/blog";
import { soundManager } from "../utils/sound";

export function BlogSection({ onSelectPost }) {
  return (
    <section id="blog" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-blue-800 font-bold">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>05 // Thoughts & Essays</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-slate-900 tracking-tight">
              Insights & <span className="gradient-text-royal-gold">Perspectives.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-slate-500 max-w-xs">
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
              className="editorial-card p-6 sm:p-8 bg-slate-50/50 hover:bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xl hover:shadow-blue-950/5 rounded-2xl space-y-5 flex flex-col justify-between group cursor-pointer transition-all duration-300"
              data-cursor="pointer"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300/80 font-mono text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-sans font-bold text-slate-900 group-hover:text-blue-800 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Link Action */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono font-bold text-blue-800 group-hover:text-amber-700 transition-colors">
                <span className="group-hover:underline">Read Complete Essay</span>
                <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center group-hover:bg-blue-800 group-hover:text-amber-200 transition-all transform group-hover:translate-x-1">
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
