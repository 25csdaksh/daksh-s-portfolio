import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Layers, 
  Search, 
  Filter, 
  RefreshCw, 
  TrendingUp, 
  Award, 
  Sparkles, 
  Code2, 
  Server, 
  Database, 
  Terminal, 
  Brain, 
  Cpu, 
  Cloud, 
  Wrench, 
  ExternalLink, 
  CheckCircle2, 
  Maximize2,
  Table,
  SlidersHorizontal,
  FolderGit2
} from "lucide-react";
import { skillsData, skillsCategories, powerBiKpis } from "../data/skills";
import { soundManager } from "../utils/sound";

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTier, setSelectedTier] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(skillsData[0]); // default active drilldown
  const [viewMode, setViewMode] = useState("dashboard"); // "dashboard" | "matrix"

  // Filter skills based on slicers
  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCat =
        selectedCategory === "all" || skill.categoryId === selectedCategory;
      const matchesTier =
        selectedTier === "all" ||
        (selectedTier === "expert" && skill.score >= 95) ||
        (selectedTier === "advanced" && skill.score >= 90 && skill.score < 95) ||
        (selectedTier === "proficient" && skill.score < 90);
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.projects.some((p) =>
          p.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCat && matchesTier && matchesSearch;
    });
  }, [selectedCategory, selectedTier, searchQuery]);

  // Dynamic KPI calculations based on active slice
  const averageScore = useMemo(() => {
    if (filteredSkills.length === 0) return 0;
    const total = filteredSkills.reduce((acc, s) => acc + s.score, 0);
    return (total / filteredSkills.length).toFixed(1);
  }, [filteredSkills]);

  const expertCount = useMemo(() => {
    return filteredSkills.filter((s) => s.score >= 95).length;
  }, [filteredSkills]);

  const handleSkillSelect = (skill) => {
    soundManager.playClick();
    setSelectedSkill(skill);
  };

  const handleResetFilters = () => {
    soundManager.playClick();
    setSelectedCategory("all");
    setSelectedTier("all");
    setSearchQuery("");
  };

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#123C2F]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#123C2F] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#123C2F]" />
              <span>02 // Technical Intelligence BI Dashboard</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#111111] tracking-tight">
              Skills & <span className="italic font-normal text-[#123C2F]">Analytics.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#666666] hidden sm:inline">
              MODELED IN POWER BI SPECIFICATION •
            </span>
            <div className="flex rounded-xl bg-white border border-[#123C2F]/15 p-1 shadow-xs">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setViewMode("dashboard");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === "dashboard"
                    ? "bg-[#123C2F] text-[#F7F7F3] shadow-xs"
                    : "text-[#666666] hover:text-[#111111]"
                }`}
                data-cursor="pointer"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setViewMode("matrix");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === "matrix"
                    ? "bg-[#123C2F] text-[#F7F7F3] shadow-xs"
                    : "text-[#666666] hover:text-[#111111]"
                }`}
                data-cursor="pointer"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Matrix Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── POWER BI WINDOW CONTAINER ─── */}
        <div className="rounded-3xl border border-[#123C2F]/20 bg-white/95 shadow-2xl shadow-[#123C2F]/5 overflow-hidden backdrop-blur-md">
          {/* Power BI Titlebar Ribbon */}
          <div className="flex flex-wrap items-center justify-between px-5 sm:px-8 py-3.5 bg-gradient-to-r from-[#123C2F] via-[#1A5442] to-[#123C2F] text-[#F7F7F3] text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#D4AF37]" />
                <span className="font-bold tracking-wider uppercase text-[#F7F7F3]">
                  Power BI Desktop // Technical Telemetry Model
                </span>
              </div>
              <span className="hidden md:inline text-white/40">|</span>
              <span className="hidden md:inline text-white/70">
                Dataset: Daksh_Soni_Stack_v2026.pbix
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-white/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>DirectQuery Live</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="hover:text-[#D4AF37] flex items-center gap-1 transition-colors text-white/90"
                title="Reset Slicers"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset Slicers</span>
              </button>
            </div>
          </div>

          {/* Slicers & Filters Ribbon Bar */}
          <div className="p-4 sm:p-6 bg-[#F7F7F3] border-b border-[#123C2F]/10 space-y-4">
            {/* Top Slicers Row: Search & Tier Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Slicer */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by skill, category, or project (e.g. React, Gemini, Docker)..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#123C2F]/15 focus:border-[#123C2F] focus:outline-hidden text-xs text-[#111111] placeholder:text-[#888888] shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#888888] hover:text-[#111111]"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Proficiency Tier Slicers */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] text-[#666666] font-semibold flex items-center gap-1 mr-1">
                  <SlidersHorizontal className="w-3 h-3 text-[#123C2F]" />
                  <span>Tier:</span>
                </span>
                {[
                  { id: "all", label: "All Tiers" },
                  { id: "expert", label: "Expert (95%+)" },
                  { id: "advanced", label: "Advanced (90-94%)" },
                  { id: "proficient", label: "Proficient (<90%)" }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedTier(tier.id);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                      selectedTier === tier.id
                        ? "bg-[#123C2F] text-[#F7F7F3] shadow-xs font-bold"
                        : "bg-white border border-[#123C2F]/10 text-[#555555] hover:text-[#111111]"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Slicers Bar */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
              {skillsCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCategory(cat.id);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all shrink-0 ${
                      isSelected
                        ? "bg-[#123C2F] text-[#F7F7F3] shadow-xs scale-[1.02]"
                        : "bg-white border border-[#123C2F]/15 text-[#555555] hover:border-[#123C2F]/40 hover:text-[#111111]"
                    }`}
                    data-cursor="pointer"
                  >
                    <span>{cat.name}</span>
                    <span className={`ml-1.5 text-[10px] opacity-70`}>
                      ({skillsData.filter(s => cat.id === "all" || s.categoryId === cat.id).length})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── TOP KPI CARDS RIBBON (POWER BI CARDS) ─── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#123C2F]/10 border-b border-[#123C2F]/10">
            <div className="p-5 bg-white space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888] font-bold block">
                Filtered Technologies
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#123C2F]">
                  {filteredSkills.length}
                </span>
                <span className="text-xs font-mono text-[#666666]">of {skillsData.length} Stacks</span>
              </div>
              <p className="text-[10px] font-mono text-emerald-700">● 100% Production Ready</p>
            </div>

            <div className="p-5 bg-white space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888] font-bold block">
                Average Proficiency Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#123C2F]">
                  {averageScore}%
                </span>
                <span className="text-xs font-mono text-[#666666]">Benchmark</span>
              </div>
              <p className="text-[10px] font-mono text-emerald-700">▲ +14.2% YoY Mastery</p>
            </div>

            <div className="p-5 bg-white space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888] font-bold block">
                Expert Tier Count (95%+)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#123C2F]">
                  {expertCount}
                </span>
                <span className="text-xs font-mono text-[#666666]">Core Stacks</span>
              </div>
              <p className="text-[10px] font-mono text-amber-700">★ React, Python, Gemini, APIs</p>
            </div>

            <div className="p-5 bg-white space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888] font-bold block">
                Active System Integrations
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#123C2F]">
                  05
                </span>
                <span className="text-xs font-mono text-[#666666]">Deployed ERPs/AI</span>
              </div>
              <p className="text-[10px] font-mono text-emerald-700">✓ 3 National Finalists</p>
            </div>
          </div>

          {/* ─── MAIN POWER BI VISUALS CANVAS ─── */}
          {viewMode === "dashboard" ? (
            <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Visualization: Treemap Heatmap & Bar Matrix (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Visual 1: Power BI Treemap Matrix Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#123C2F] font-bold flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-[#D4AF37]" />
                      <span>Treemap // Capability Matrix (Click to Drill Down)</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#888888]">
                      Color Density = Proficiency Index
                    </span>
                  </div>

                  {filteredSkills.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-[#F7F7F3] border border-dashed border-black/15 text-xs font-mono text-[#666666]">
                      No skills match current slicer combination. <button onClick={handleResetFilters} className="text-[#123C2F] underline font-bold">Reset Filters</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {filteredSkills.map((skill) => {
                        const isSelected = selectedSkill?.id === skill.id;
                        return (
                          <motion.button
                            key={skill.id}
                            layout
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSkillSelect(skill)}
                            onMouseEnter={() => soundManager.playHover()}
                            className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[90px] ${
                              isSelected
                                ? "bg-[#123C2F] text-[#F7F7F3] border-[#123C2F] shadow-md ring-2 ring-[#D4AF37]"
                                : "bg-[#F7F7F3] hover:bg-white border-[#123C2F]/10 hover:border-[#123C2F]/30 text-[#111111]"
                            }`}
                            data-cursor="pointer"
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-bold text-xs sm:text-sm tracking-tight leading-tight">
                                {skill.name}
                              </span>
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                                  isSelected
                                    ? "bg-white/20 text-[#D4AF37]"
                                    : skill.score >= 95
                                    ? "bg-emerald-100 text-emerald-900"
                                    : "bg-black/5 text-[#666666]"
                                }`}
                              >
                                {skill.score}%
                              </span>
                            </div>

                            <div className="pt-2 flex items-center justify-between text-[10px] font-mono opacity-80">
                              <span>{skill.category}</span>
                              <span>{skill.years}</span>
                            </div>

                            {/* Mini Power BI Progress Bar underneath */}
                            <div className="w-full h-1 bg-black/10 rounded-full mt-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  isSelected ? "bg-[#D4AF37]" : "bg-[#123C2F]"
                                }`}
                                style={{ width: `${skill.score}%` }}
                              />
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Visual 2: Comparative Competency Horizontal Bar Chart */}
                <div className="p-5 rounded-2xl bg-[#F7F7F3] border border-[#123C2F]/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#123C2F] font-bold">
                      Bar Visual // Top Ranked Competency Comparison
                    </span>
                    <span className="text-[10px] font-mono text-[#888888]">Score (0-100)</span>
                  </div>

                  <div className="space-y-2.5">
                    {filteredSkills.slice(0, 5).map((skill) => (
                      <div
                        key={skill.id}
                        onClick={() => handleSkillSelect(skill)}
                        className="space-y-1 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-[#111111] group-hover:text-[#123C2F] transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[#666666] font-bold">{skill.score}%</span>
                        </div>
                        <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-black/5 flex">
                          <div
                            className="h-full bg-gradient-to-r from-[#123C2F] to-[#1A5442] rounded-full transition-all duration-500 group-hover:from-[#D4AF37] group-hover:to-[#8A7114]"
                            style={{ width: `${skill.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Visualization: Power BI Detailed Drill-Through Card (5 cols) */}
              <div className="lg:col-span-5">
                {selectedSkill ? (
                  <motion.div
                    key={selectedSkill.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#123C2F]/20 shadow-xl space-y-6 relative overflow-hidden"
                  >
                    {/* Visual Card Header */}
                    <div className="flex items-start justify-between pb-4 border-b border-[#123C2F]/10">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#123C2F]/10 text-[#123C2F] font-mono text-[10px] font-bold uppercase tracking-wider">
                          {selectedSkill.category} • {selectedSkill.years}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] mt-1.5">
                          {selectedSkill.name}
                        </h3>
                      </div>

                      {/* Large Gauge Score Circle */}
                      <div className="w-16 h-16 rounded-2xl bg-[#123C2F] text-[#F7F7F3] flex flex-col items-center justify-center border-2 border-[#D4AF37]/50 shadow-md shrink-0">
                        <span className="font-serif text-xl font-bold leading-none text-[#D4AF37]">
                          {selectedSkill.score}
                        </span>
                        <span className="text-[8px] font-mono text-white/70 uppercase">Score</span>
                      </div>
                    </div>

                    {/* Proficiency Rating Meter */}
                    <div className="space-y-1.5 p-3.5 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/10">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-[#123C2F]">Proficiency Tier:</span>
                        <span className="text-emerald-800">{selectedSkill.level} Grade</span>
                      </div>
                      <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#123C2F] rounded-full"
                          style={{ width: `${selectedSkill.score}%` }}
                        />
                      </div>
                    </div>

                    {/* Production Experience Description */}
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#123C2F] font-bold block">
                        Production Implementation & Capabilities:
                      </span>
                      <p className="text-xs text-[#444444] leading-relaxed">
                        {selectedSkill.experience}
                      </p>
                    </div>

                    {/* Connected Real Projects */}
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#123C2F] font-bold block">
                        Active Production Deployments:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSkill.projects.map((proj, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-2.5 py-1 rounded-lg bg-[#F7F7F3] border border-[#123C2F]/15 font-mono text-xs font-bold text-[#111111] flex items-center gap-1.5"
                          >
                            <FolderGit2 className="w-3 h-3 text-[#123C2F]" />
                            <span>{proj}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Linked Verified Certifications if any */}
                    {selectedSkill.certifications && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-950 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[#123C2F]">
                          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Linked Verified Credential:</span>
                        </div>
                        <p className="text-[11px] text-emerald-900">
                          {selectedSkill.certifications.join(" • ")}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="p-12 text-center rounded-2xl bg-[#F7F7F3] border border-[#123C2F]/10 text-xs font-mono text-[#666666]">
                    Select any technology card from the left matrix to inspect telemetry and project linkages.
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ─── MATRIX TABLE VIEW (POWER BI TABULAR DRILLDOWN) ─── */
            <div className="p-5 sm:p-8 overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#123C2F] text-[#123C2F] text-[11px] uppercase tracking-wider bg-[#F7F7F3]">
                    <th className="py-3 px-4">Technology</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Proficiency</th>
                    <th className="py-3 px-4">Experience</th>
                    <th className="py-3 px-4">Active Projects</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredSkills.map((skill) => (
                    <tr
                      key={skill.id}
                      onClick={() => handleSkillSelect(skill)}
                      className="hover:bg-[#123C2F]/5 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-[#111111]">
                        {skill.name}
                      </td>
                      <td className="py-3 px-4 text-[#666666]">
                        {skill.category}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-black/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#123C2F] rounded-full"
                              style={{ width: `${skill.score}%` }}
                            />
                          </div>
                          <span className="font-bold">{skill.score}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#555555]">
                        {skill.years}
                      </td>
                      <td className="py-3 px-4 text-[#444444] truncate max-w-[200px]">
                        {skill.projects.join(", ")}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                          {skill.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Power BI Status Bar Footer */}
          <div className="px-6 py-3 bg-[#F7F7F3] border-t border-[#123C2F]/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#666666]">
            <div>
              Showing <strong className="text-[#111111]">{filteredSkills.length}</strong> of {skillsData.length} records • Slicers: {selectedCategory.toUpperCase()} | {selectedTier.toUpperCase()}
            </div>
            <div className="flex items-center gap-4">
              <span>DAKSH_SONI_PBI_ENGINE_V1</span>
              <span>•</span>
              <span className="text-[#123C2F] font-bold">100% PRODUCTION READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
