import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, Star, GitFork, ArrowUpRight, Flame, RefreshCw, Radio, CheckCircle2 } from "lucide-react";
import { Github } from "../components/Icons";
import { githubData, generateContributionMatrix, fetchLiveGithubData } from "../data/github";
import { soundManager } from "../utils/sound";

export function GithubSection() {
  const [data, setData] = useState(() => ({
    ...githubData,
    weeks: generateContributionMatrix(),
    isLive: false,
    lastSynced: "Connecting..."
  }));
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);

  const loadData = async (force = false) => {
    if (force) {
      setIsRefreshing(true);
      try {
        sessionStorage.removeItem("gh_data_25csdaksh");
        sessionStorage.removeItem("gh_data_time_25csdaksh");
      } catch (e) {
        // ignore
      }
    }

    try {
      const liveData = await fetchLiveGithubData("25csdaksh");
      if (liveData) {
        setData(liveData);
      }
    } catch (err) {
      console.warn("Failed to load live github data, using fallback:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getHeatmapColor = (level) => {
    switch (level) {
      case 1:
        return "bg-blue-900/80 hover:bg-blue-800 border border-blue-700/40";
      case 2:
        return "bg-blue-600 hover:bg-blue-500 border border-blue-400/50";
      case 3:
        return "bg-amber-600 hover:bg-amber-500 border border-amber-400/60";
      case 4:
        return "bg-amber-400 hover:bg-yellow-300 shadow-xs ring-1 ring-amber-300";
      default:
        return "bg-[#070E20] hover:bg-[#122452] border border-[#1E2E5D]/60";
    }
  };

  const formatDateLabel = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#02040A]/75 backdrop-blur-xs text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1E2E5D]">
          <div>
            <div className="flex items-center gap-3 mb-2 font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              <Github className="w-4 h-4 text-amber-400" />
              <span>06 // Open Source & Telemetry</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-400/15 text-amber-300 border border-amber-400/40 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>LIVE SYNC // @{data.username}</span>
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-white tracking-tight">
              Developer <span className="gradient-text-gold">Activity.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                loadData(true);
              }}
              disabled={isRefreshing}
              title="Refresh live GitHub telemetry"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#1E2E5D] bg-[#0D1B3E] text-xs font-mono font-bold text-slate-300 hover:bg-[#122452] hover:border-amber-400 hover:text-amber-300 transition-all disabled:opacity-50"
              data-cursor="pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-amber-400" : "text-amber-400"}`} />
              <span className="hidden sm:inline">{isRefreshing ? "Syncing..." : "Refresh"}</span>
            </button>

            <a
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-blue-950 text-xs font-mono font-extrabold shadow-md shadow-amber-500/20 hover:scale-105 transition-all"
              data-cursor="pointer"
            >
              <span>github.com/{data.username}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-950 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* GitHub Heatmap Card */}
        <div className="editorial-card p-6 sm:p-8 bg-[#0D1B3E] rounded-3xl border border-amber-400/30 hover:border-amber-400/70 shadow-xl space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {data.totalContributions} Contributions in the Past Year
                </h3>
                {data.isLive && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/40">
                    <CheckCircle2 className="w-3 h-3 text-amber-400" /> Live
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-300 mt-1">
                Continuous shipping across production apps, hackathons, and algorithms.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono shrink-0">
              <div className="flex items-center gap-1.5 text-blue-950 bg-gradient-to-r from-amber-400 to-yellow-500 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-md font-extrabold">
                <Flame className="w-3.5 h-3.5 text-blue-950 fill-current" />
                <span>Streak: {data.currentStreak}</span>
              </div>
              <div className="text-amber-300/90 hidden sm:block font-bold">
                Longest: {data.longestStreak}
              </div>
            </div>
          </div>

          {/* 52-Week Matrix Grid with Scroll Container */}
          <div className="overflow-x-auto pb-3 pt-1 no-scrollbar border-y border-[#1E2E5D] py-4">
            <div className="min-w-[720px] flex gap-[3.5px]">
              {data.weeks && data.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3.5px]">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={() => {
                        soundManager.playHover();
                        setHoveredDay(day);
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2.5px] transition-all duration-150 cursor-pointer ${getHeatmapColor(
                        day.level
                      )} ${hoveredDay?.date === day.date ? "scale-135 ring-2 ring-amber-400 z-10" : "hover:scale-125"}`}
                      data-cursor="pointer"
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap Tooltip & Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-300 pt-1">
            <div className="min-h-[20px] flex items-center">
              {hoveredDay ? (
                <span className="text-amber-300 font-bold bg-[#070E20] px-2.5 py-1 rounded-md border border-amber-400/40 inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {hoveredDay.count} {hoveredDay.count === 1 ? "contribution" : "contributions"} on {formatDateLabel(hoveredDay.date)}
                </span>
              ) : (
                <span className="text-slate-400">Hover over squares to inspect daily velocity</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] self-end sm:self-auto font-mono">
              <span className="text-slate-400">Less</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#070E20] border border-[#1E2E5D]" title="0 contributions" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-900/80" title="1-3 contributions" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-600" title="4-6 contributions" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-amber-600" title="7-9 contributions" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-amber-400" title="10+ contributions (Gold Peak)" />
              <span className="text-slate-400">More</span>
            </div>
          </div>
        </div>

        {/* Repositories & Languages 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Repositories (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                Live Repositories ({data.publicRepos} Total)
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Sorted by recent pushes</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.featuredRepositories.map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-5 rounded-2xl bg-[#0D1B3E] border border-[#1E2E5D] hover:border-amber-400 hover:shadow-xl hover:shadow-blue-950/50 transition-all duration-300 flex flex-col justify-between group"
                  data-cursor="pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate max-w-[180px]">
                        {repo.name}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1E2E5D] font-mono text-[11px] text-slate-300 mt-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: repo.langColor }}
                      />
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1" title="Stars">
                        <Star className="w-3 h-3 text-amber-400 fill-current" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1" title="Forks">
                        <GitFork className="w-3 h-3 text-slate-400" />
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Top Languages & Recent Activity (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Languages breakdown */}
            <div className="p-6 rounded-2xl bg-[#0D1B3E] border border-[#1E2E5D] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                  Language Distribution
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Across {data.publicRepos} Repos</span>
              </div>
              {/* Stacked bar */}
              <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-[#070E20]">
                {data.topLanguages.map((lang, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>
              {/* Labels list */}
              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                {data.topLanguages.map((lang, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-white truncate">{lang.name}</span>
                    <span className="text-amber-400 font-bold ml-auto">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Mini Feed */}
            <div className="p-6 rounded-2xl bg-[#0D1B3E] border border-[#1E2E5D] space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                  Recent Git Commits
                </h4>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/40 font-bold">
                  Live Feed
                </span>
              </div>
              <div className="space-y-3">
                {data.recentActivity && data.recentActivity.slice(0, 4).map((act, idx) => (
                  <div key={idx} className="text-xs font-mono flex items-start gap-2.5 text-slate-200">
                    <GitCommit className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium leading-tight truncate">{act.message}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="text-amber-400 font-bold truncate">{act.repo}</span>
                        <span>•</span>
                        <span>{act.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
