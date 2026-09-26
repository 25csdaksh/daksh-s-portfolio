import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles, Layers, ShieldCheck, Cpu, Terminal, Eye } from "lucide-react";
import { Github } from "../components/Icons";
import { projectsData } from "../data/projects";
import { soundManager } from "../utils/sound";

export function ProjectsSection({ onSelectProject }) {
  return (
    <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#080321]/80 backdrop-blur-sm text-white border-t border-b border-purple-500/20">
      {/* Background Cosmic Purple Ambiance */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/12 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-1/5 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-purple-400/15">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-purple-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-sm shadow-purple-400/60" />
              <span>03 // Featured Live Deployments</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight">
              Featured <span className="gradient-text-cosmic">Live Projects.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-purple-200/80 max-w-xs leading-relaxed">
            PRODUCTION DEPLOYMENTS, AI DEEPFAKE DEFENSE & ENTERPRISE WEB APPLICATIONS.
          </p>
        </div>

        {/* Featured Project Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          <AnimatePresence>
            {projectsData.map((project, idx) => {
              const isLarge = idx === 0 || idx === 1;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className={`editorial-card group relative overflow-hidden flex flex-col justify-between bg-[#0f072e] border border-purple-500/25 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 rounded-2xl text-white ${
                    isLarge ? "lg:col-span-6" : "lg:col-span-4"
                  }`}
                  data-cursor="project"
                  data-cursor-text="VIEW PROJECT →"
                  onClick={() => {
                    soundManager.playClick();
                    onSelectProject(project);
                  }}
                >
                  {/* Visual Preview Header Container with High-Res Cover Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-purple-500/20 group/cover">
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={`${project.title} Cover`}
                        className="w-full h-full object-cover object-top group-hover/cover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950" />
                    )}

                    {/* Subtle Gradient Vignette Overlay for Crisp Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/90 via-[#030014]/30 to-[#030014]/40 pointer-events-none" />

                    {/* Top Badges Bar */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-purple-900/90 text-purple-200 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider backdrop-blur-md border border-purple-400/50 shadow-xs">
                          {project.category}
                        </span>
                        {project.featuredBadge && (
                          <span className="px-2 sm:px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-mono bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-950 font-black backdrop-blur-md shadow-xs">
                            {project.featuredBadge}
                          </span>
                        )}
                      </div>
                      <span className="px-2 sm:px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-purple-400/30 font-mono text-[9px] sm:text-[10px] text-purple-300 font-bold">
                        {project.year}
                      </span>
                    </div>

                    {/* Bottom Overlay Metric Bar & Live Link Launch Button */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10 text-white">
                      <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] bg-[#080321]/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-purple-400/30">
                        {Object.entries(project.stats).slice(0, 2).map(([k, v]) => (
                          <div key={k} className="flex items-center gap-1">
                            <span className="font-bold text-amber-400">{v}</span>
                            <span className="text-slate-300 capitalize text-[8px] sm:text-[9px]">{k}</span>
                          </div>
                        ))}
                      </div>

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
                          className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-purple-950 font-mono text-[9px] sm:text-[10px] font-black backdrop-blur-md transition-all shadow-md hover:scale-105"
                          title="Open Live Deployment in New Tab"
                        >
                          <span>Live App</span>
                          <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Info Body */}
                  <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-white group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>
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
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white flex items-center justify-center transition-all transform hover:scale-110 shadow-xs border border-purple-400/50 shrink-0 ml-2"
                            title="Launch Live Project in New Tab"
                          >
                            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                          </a>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>
                    </div>

                    {/* Tech Badges & Action Buttons */}
                    <div className="space-y-3.5 pt-3 border-t border-purple-400/15">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 sm:py-1 rounded-md bg-[#080321] border border-purple-400/25 font-mono text-[10px] text-slate-200 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-0.5 sm:py-1 rounded-md bg-[#080321] font-mono text-[10px] text-purple-300/80">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Explicit Interactive Action Buttons */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            onSelectProject(project);
                          }}
                          className="text-xs font-mono text-purple-300 font-bold hover:text-purple-200 flex items-center gap-1.5 py-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-purple-400" />
                          <span>Case Study</span>
                        </button>
                        <div
                          className="flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
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
                              className="px-2.5 py-1.5 rounded-lg bg-[#080321] hover:bg-purple-500 hover:text-white border border-purple-400/30 text-white font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                              title="View GitHub Repository"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>Code</span>
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
                              className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 font-mono text-[11px] font-black flex items-center gap-1 shadow-md shadow-amber-500/20 hover:shadow-lg transition-all hover:scale-105"
                              title="Open Live Deployment"
                            >
                              <span>Live App</span>
                              <ExternalLink className="w-3 h-3 text-purple-950 stroke-[2.5]" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
