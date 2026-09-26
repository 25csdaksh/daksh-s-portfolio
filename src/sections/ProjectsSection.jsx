import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles, Layers, ShieldCheck, Cpu, Terminal, Eye } from "lucide-react";
import { Github } from "../components/Icons";
import { projectsData } from "../data/projects";
import { soundManager } from "../utils/sound";

export function ProjectsSection({ onSelectProject }) {
  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-blue-800 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>03 // Featured Live Deployments</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-slate-900 tracking-tight">
              Featured <span className="gradient-text-royal-gold">Live Projects.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-slate-500 max-w-xs">
            PRODUCTION DEPLOYMENTS, AI DEEPFAKE DEFENSE & ENTERPRISE WEB APPLICATIONS.
          </p>
        </div>

        {/* Featured Project Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          <AnimatePresence>
            {projectsData.map((project, idx) => {
              const isLarge = idx === 0 || idx === 1;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`editorial-card group relative overflow-hidden flex flex-col justify-between bg-white border border-slate-200 hover:border-amber-400 hover:shadow-2xl hover:shadow-blue-950/10 rounded-2xl ${
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
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-slate-200 group/cover">
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={`${project.title} Cover`}
                        className="w-full h-full object-cover object-top group-hover/cover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950" />
                    )}

                    {/* Subtle Gradient Vignette Overlay for Crisp Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/30 pointer-events-none" />

                    {/* Top Badges Bar */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-blue-700/90 text-white font-mono text-[10px] font-bold tracking-wider backdrop-blur-md border border-amber-400/40 shadow-xs">
                          {project.category}
                        </span>
                        {project.featuredBadge && (
                          <span className="px-2.5 py-1 rounded-full text-[9px] font-mono bg-amber-400 text-slate-950 font-extrabold backdrop-blur-md shadow-xs">
                            {project.featuredBadge}
                          </span>
                        )}
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white font-medium">
                        {project.year}
                      </span>
                    </div>

                    {/* Bottom Overlay Metric Bar & Live Link Launch Button */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 text-white">
                      <div className="flex items-center gap-2.5 font-mono text-[10px] bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                        {Object.entries(project.stats).slice(0, 2).map(([k, v]) => (
                          <div key={k} className="flex items-center gap-1">
                            <span className="font-bold text-amber-300">{v}</span>
                            <span className="text-slate-300 capitalize text-[9px]">{k}</span>
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
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-[10px] font-bold backdrop-blur-md transition-all shadow-md hover:scale-105"
                          title="Open Live Deployment in New Tab"
                        >
                          <span>Live App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Info Body */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
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
                            className="w-10 h-10 rounded-full bg-amber-50 hover:bg-blue-800 text-blue-900 hover:text-amber-200 flex items-center justify-center transition-all transform hover:scale-110 shadow-xs border border-amber-300"
                            title="Launch Live Project in New Tab"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>
                    </div>

                    {/* Tech Badges & Action Buttons */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 font-mono text-[10px] text-slate-700 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 rounded-md bg-slate-50 font-mono text-[10px] text-slate-400">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Explicit Interactive Action Buttons */}
                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            onSelectProject(project);
                          }}
                          className="text-xs font-mono text-blue-800 font-bold hover:text-amber-700 flex items-center gap-1.5 py-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-600" />
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
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-blue-900 border border-transparent hover:border-amber-300 text-slate-800 font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
                              title="View GitHub Repository"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Code</span>
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
                              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-950 text-white border border-amber-400/50 hover:border-amber-300 font-mono text-[11px] font-bold flex items-center gap-1 shadow-xs shadow-blue-900/20 transition-colors hover:scale-105"
                              title="Open Live Deployment"
                            >
                              <span>Live App</span>
                              <ExternalLink className="w-3 h-3 text-amber-300" />
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
