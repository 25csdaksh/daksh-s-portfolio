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
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#F5F3ED]/50">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-blue-800 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>02 // Technical Intelligence BI Dashboard</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-slate-900 tracking-tight">
              Skills & <span className="gradient-text-royal-gold">Analytics.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-800 font-semibold hidden sm:inline">
              MODELED IN POWER BI SPECIFICATION •
            </span>
            <div className="flex rounded-xl bg-white border border-amber-300/80 p-1 shadow-xs">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setViewMode("dashboard");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === "dashboard"
                    ? "bg-gradient-to-r from-blue-700 to-indigo-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                data-cursor="pointer"
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setViewMode("matrix");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === "matrix"
                    ? "bg-gradient-to-r from-blue-700 to-indigo-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                data-cursor="pointer"
              >
                <Table className="w-3.5 h-3.5 text-amber-300" />
                <span>Matrix Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── POWER BI WINDOW CONTAINER ─── */}
        <div className="rounded-3xl border border-amber-200/80 bg-white shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Power BI Titlebar Ribbon */}
          <div className="flex flex-wrap items-center justify-between px-5 sm:px-8 py-3.5 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white text-xs font-mono border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-400" />
                <span className="font-bold tracking-wider uppercase text-amber-300">
                  Power BI Desktop // Technical Telemetry Model
                </span>
              </div>
              <span className="hidden md:inline text-slate-500">|</span>
              <span className="hidden md:inline text-slate-300">
                Dataset: Daksh_Soni_Stack_v2026.pbix
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>DirectQuery Live</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="hover:text-sky-400 flex items-center gap-1 transition-colors text-slate-200"
                title="Reset Slicers"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset Slicers</span>
              </button>
            </div>
          </div>

          {/* Slicers & Filters Ribbon Bar */}
          <div className="p-4 sm:p-6 bg-slate-50/70 border-b border-slate-200 space-y-4">
            {/* Top Slicers Row: Search & Tier Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Slicer */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by skill, category, or project (e.g. React, Gemini, Docker)..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-300 focus:border-blue-600 focus:outline-hidden text-xs text-slate-900 placeholder:text-slate-400 shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-900"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Proficiency Tier Slicers */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] text-slate-500 font-semibold flex items-center gap-1 mr-1">
                  <SlidersHorizontal className="w-3 h-3 text-amber-600" />
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
                        ? "bg-gradient-to-r from-blue-700 to-indigo-950 text-white border border-amber-400/50 shadow-xs font-bold"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-amber-300 hover:text-slate-900"
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
                        ? "bg-gradient-to-r from-blue-700 to-indigo-950 text-white border border-amber-400/60 shadow-xs scale-[1.02]"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-slate-900"
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border-b border-slate-200">
            <div className="p-5 bg-white space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                Filtered Technologies
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-3xl sm:text-4xl font-extrabold text-blue-800">
                  {filteredSkills.length}
                </span>
                <span className="text-xs font-mono text-slate-500">of {skillsData.length} Stacks</span>
              </div>
              <p className="text-[10px] font-mono text-amber-700 font-semibold">● 100% Production Ready</p>
            </div>

            <div className="p-5 bg-white space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                Average Proficiency Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-3xl sm:text-4xl font-extrabold text-blue-800">
                  {averageScore}%
                </span>
                <span className="text-xs font-mono text-slate-500">Benchmark</span>
              </div>
              <p className="text-[10px] font-mono text-amber-700 font-semibold">▲ +14.2% YoY Mastery</p>
            </div>

            <div className="p-5 bg-white space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                Expert Tier Count (95%+)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-3xl sm:text-4xl font-extrabold text-blue-800">
                  {expertCount}
                </span>
                <span className="text-xs font-mono text-slate-500">Core Stacks</span>
              </div>
              <p className="text-[10px] font-mono text-blue-800 font-semibold">★ React, Python, Gemini, APIs</p>
            </div>

            <div className="p-5 bg-white space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                Active System Integrations
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-3xl sm:text-4xl font-extrabold text-blue-800">
                  05
                </span>
                <span className="text-xs font-mono text-slate-500">Deployed ERPs/AI</span>
              </div>
              <p className="text-[10px] font-mono text-amber-700 font-semibold">✓ 3 National Finalists</p>
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
                    <span className="font-mono text-xs uppercase tracking-wider text-blue-800 font-bold flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-amber-500" />
                      <span>Treemap // Capability Matrix (Click to Drill Down)</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Color Density = Proficiency Index
                    </span>
                  </div>

                  {filteredSkills.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-xs font-mono text-slate-500">
                      No skills match current slicer combination. <button onClick={handleResetFilters} className="text-blue-800 underline font-bold">Reset Filters</button>
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
                                ? "bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white border-amber-400 shadow-md ring-2 ring-amber-400"
                                : "bg-slate-50/70 hover:bg-white border-slate-200 hover:border-amber-400 text-slate-900"
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
                                    ? "bg-amber-400 text-slate-950"
                                    : skill.score >= 95
                                    ? "bg-amber-50 text-amber-900 border border-amber-300 font-bold"
                                    : "bg-slate-200/60 text-slate-700"
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
                                  isSelected ? "bg-amber-400" : "bg-blue-700"
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
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-blue-800 font-bold">
                      Bar Visual // Top Ranked Competency Comparison
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Score (0-100)</span>
                  </div>

                  <div className="space-y-2.5">
                    {filteredSkills.slice(0, 5).map((skill) => (
                      <div
                        key={skill.id}
                        onClick={() => handleSkillSelect(skill)}
                        className="space-y-1 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-slate-500 font-bold">{skill.score}%</span>
                        </div>
                        <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-slate-200 flex">
                          <div
                            className="h-full bg-gradient-to-r from-blue-700 via-blue-800 to-amber-500 rounded-full transition-all duration-500 group-hover:from-blue-800 group-hover:to-amber-400"
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
                    className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-amber-300 shadow-xl space-y-6 relative overflow-hidden"
                  >
                    {/* Visual Card Header */}
                    <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                          {selectedSkill.category} • {selectedSkill.years}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 mt-1.5">
                          {selectedSkill.name}
                        </h3>
                      </div>

                      {/* Large Gauge Score Circle */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 text-amber-300 flex flex-col items-center justify-center border-2 border-amber-400/80 shadow-md shrink-0">
                        <span className="font-sans text-2xl font-black leading-none text-amber-300">
                          {selectedSkill.score}
                        </span>
                        <span className="text-[8px] font-mono text-amber-200 uppercase font-bold">Score</span>
                      </div>
                    </div>

                    {/* Proficiency Rating Meter */}
                    <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-blue-900">Proficiency Tier:</span>
                        <span className="text-amber-800">{selectedSkill.level} Grade</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-700 to-amber-500 rounded-full"
                          style={{ width: `${selectedSkill.score}%` }}
                        />
                      </div>
                    </div>

                    {/* Production Experience Description */}
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-blue-900 font-bold block">
                        Production Implementation & Capabilities:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {selectedSkill.experience}
                      </p>
                    </div>

                    {/* Connected Real Projects */}
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-blue-900 font-bold block">
                        Active Production Deployments:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSkill.projects.map((proj, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs font-bold text-slate-800 flex items-center gap-1.5"
                          >
                            <FolderGit2 className="w-3 h-3 text-amber-600" />
                            <span>{proj}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Linked Verified Certifications if any */}
                    {selectedSkill.certifications && (
                      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-mono text-blue-950 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-amber-800">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span>Linked Verified Credential:</span>
                        </div>
                        <p className="text-[11px] text-blue-900 font-medium">
                          {selectedSkill.certifications.join(" • ")}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-500">
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
                  <tr className="border-b-2 border-amber-400 text-blue-900 text-[11px] uppercase tracking-wider bg-amber-50/30">
                    <th className="py-3 px-4">Technology</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Proficiency</th>
                    <th className="py-3 px-4">Experience</th>
                    <th className="py-3 px-4">Active Projects</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSkills.map((skill) => (
                    <tr
                      key={skill.id}
                      onClick={() => handleSkillSelect(skill)}
                      className="hover:bg-amber-50/30 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {skill.name}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {skill.category}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-700 to-amber-500 rounded-full"
                              style={{ width: `${skill.score}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-900">{skill.score}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {skill.years}
                      </td>
                      <td className="py-3 px-4 text-slate-600 truncate max-w-[200px]">
                        {skill.projects.join(", ")}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
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
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
            <div>
              Showing <strong className="text-slate-900">{filteredSkills.length}</strong> of {skillsData.length} records • Slicers: {selectedCategory.toUpperCase()} | {selectedTier.toUpperCase()}
            </div>
            <div className="flex items-center gap-4">
              <span>DAKSH_SONI_PBI_ENGINE_V1</span>
              <span>•</span>
              <span className="text-blue-900 font-bold">100% PRODUCTION READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
