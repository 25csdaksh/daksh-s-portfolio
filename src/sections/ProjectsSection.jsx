import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles, Layers, ShieldCheck, Cpu, Terminal, Eye } from "lucide-react";
import { Github } from "../components/Icons";
import { projectsData } from "../data/projects";
import { soundManager } from "../utils/sound";

export function ProjectsSection({ onSelectProject }) {
  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-white/80 border-t border-b border-[#123C2F]/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#123C2F]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#123C2F] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#123C2F]" />
              <span>03 // Featured Live Deployments</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#111111] tracking-tight">
              Featured <span className="italic font-normal text-[#123C2F]">Live Projects.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-[#666666] max-w-xs">
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
                  className={`editorial-card group relative overflow-hidden flex flex-col justify-between ${
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
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900 border-b border-[#123C2F]/15 group/cover">
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={`${project.title} Cover`}
                        className="w-full h-full object-cover object-top group-hover/cover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#123C2F] to-[#0A231B]" />
                    )}

                    {/* Subtle Gradient Vignette Overlay for Crisp Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30 pointer-events-none" />

                    {/* Top Badges Bar */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-[#123C2F]/90 text-[#F7F7F3] font-mono text-[10px] font-bold tracking-wider backdrop-blur-md border border-white/10 shadow-sm">
                          {project.category}
                        </span>
                        {project.featuredBadge && (
                          <span className="px-2.5 py-1 rounded-full text-[9px] font-mono bg-[#D4AF37] text-stone-950 font-extrabold backdrop-blur-md shadow-sm">
                            {project.featuredBadge}
                          </span>
                        )}
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white/90 font-medium">
                        {project.year}
                      </span>
                    </div>

                    {/* Bottom Overlay Metric Bar */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 text-white">
                      <div className="flex items-center gap-2.5 font-mono text-[10px] bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                        {Object.entries(project.stats).slice(0, 2).map(([k, v]) => (
                          <div key={k} className="flex items-center gap-1">
                            <span className="font-bold text-emerald-400">{v}</span>
                            <span className="text-white/60 capitalize text-[9px]">{k}</span>
                          </div>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white text-white hover:text-black font-mono text-[10px] font-bold backdrop-blur-md transition-all shadow-xs">
                        <span>Preview</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Project Info Body */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] group-hover:text-[#123C2F] transition-colors">
                          {project.title}
                        </h3>
                        <div className="w-9 h-9 rounded-full bg-[#123C2F]/10 text-[#123C2F] flex items-center justify-center group-hover:bg-[#123C2F] group-hover:text-white transition-all transform group-hover:rotate-45">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>

                      <p className="text-sm text-[#555555] leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>
                    </div>

                    {/* Tech Badges & Action Buttons */}
                    <div className="space-y-4 pt-4 border-t border-[#123C2F]/10">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-[#F7F7F3] border border-[#123C2F]/10 font-mono text-[10px] text-[#333333] font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 rounded-md bg-[#F7F7F3] font-mono text-[10px] text-[#888888]">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Explicit Interactive Action Buttons */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-mono text-[#123C2F] font-bold group-hover:underline flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-[#123C2F]" />
                          <span>Deep Dive</span>
                        </span>
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
                              }}
                              onMouseEnter={() => soundManager.playHover()}
                              className="px-2.5 py-1.5 rounded-lg bg-[#123C2F]/5 hover:bg-[#123C2F]/15 text-[#111111] font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
                              title="View GitHub Repository"
                              data-cursor="pointer"
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
                              }}
                              onMouseEnter={() => soundManager.playHover()}
                              className="px-3 py-1.5 rounded-lg bg-[#123C2F] hover:bg-[#1A5442] text-[#F7F7F3] font-mono text-[11px] font-bold flex items-center gap-1 shadow-xs transition-colors"
                              title="Open Live Deployment"
                              data-cursor="pointer"
                            >
                              <span>Live App</span>
                              <ExternalLink className="w-3 h-3" />
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
