import React, { useState } from "react";
import { Search, Calendar, Film, ShieldAlert, Sparkles, AlertCircle, Play } from "lucide-react";
import { AnalysisInput } from "../types";

interface ChannelInputProps {
  onStartAnalysis: (input: AnalysisInput) => void;
  isLoading: boolean;
}

export default function ChannelInput({ onStartAnalysis, isLoading }: ChannelInputProps) {
  const [channelVal, setChannelVal] = useState("");
  const [selectedYearsOption, setSelectedYearsOption] = useState("All Years");
  // Multi year checklist when Custom mode is selected
  const [customYears, setCustomYears] = useState<{ [year: string]: boolean }>({
    "2026": true,
    "2025": true,
    "2024": false,
    "2023": false,
  });
  
  const [videoCountOption, setVideoCountOption] = useState("Last 10 videos");
  const [customCount, setCustomCount] = useState(12);
  const [depthOption, setDepthOption] = useState<AnalysisInput["analysisDepth"]>("Full Professional Report");

  const availableYears = ["2026", "2025", "2024", "2023"];

  const handleYearSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYearsOption(e.target.value);
  };

  const handleCheckboxChange = (year: string) => {
    setCustomYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelVal.trim()) return;

    // Resolve final years array
    let resolvedYears: string[] = ["All Years"];
    if (selectedYearsOption === "Present Year") {
      resolvedYears = ["2026"];
    } else if (selectedYearsOption === "Last Year") {
      resolvedYears = ["2025"];
    } else if (selectedYearsOption === "Custom Year Selection") {
      const active = Object.keys(customYears).filter(y => customYears[y]);
      resolvedYears = active.length > 0 ? active : ["2026"];
    }

    // Resolve final count
    let resolvedCount = 10;
    if (videoCountOption === "Last 5 videos") {
      resolvedCount = 5;
    } else if (videoCountOption === "Last 10 videos") {
      resolvedCount = 10;
    } else if (videoCountOption === "Last 20 videos") {
      resolvedCount = 20;
    } else if (videoCountOption === "Custom number input") {
      resolvedCount = Number(customCount) || 5;
    }

    onStartAnalysis({
      channelInput: channelVal.trim(),
      selectedYears: resolvedYears,
      videoCount: resolvedCount,
      analysisDepth: depthOption,
    });
  };

  return (
    <div id="channel-input-card" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-sans font-semibold text-slate-100 tracking-tight">
            Launch Deep Channel Intelligence
          </h2>
          <p className="text-sm text-slate-400 font-sans mt-0.5">
            Retrieve real stats, evaluate thumbnail metrics, and forecast viral capabilities.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL Inputs */}
        <div className="space-y-2">
          <label htmlFor="channel-query" className="block text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            YouTube Channel Link or Name
          </label>
          <div className="relative">
            <input
              id="channel-query"
              type="text"
              placeholder="e.g. CodeAesthetics, @Fireship, or https://youtube.com/@creative"
              value={channelVal}
              onChange={(e) => setChannelVal(e.target.value)}
              disabled={isLoading}
              className="w-full pl-12 pr-4 py-4 bg-slate-950/80 border border-slate-800 focus:border-emerald-500 rounded-xl font-sans text-slate-200 placeholder-slate-500 focus:outline-none transition-all focus:ring-1 focus:ring-emerald-500/30 text-base"
              required
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          </div>
        </div>

        {/* Configurations grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Action video years selection */}
          <div className="space-y-2">
            <label htmlFor="year-select" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
              Video Upload Years
            </label>
            <div className="relative">
              <select
                id="year-select"
                value={selectedYearsOption}
                onChange={handleYearSelectionChange}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl font-sans text-sm text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none"
              >
                <option value="All Years">All Years (2024-2026)</option>
                <option value="Present Year">Present Year (2026)</option>
                <option value="Last Year">Last Year (2025)</option>
                <option value="Custom Year Selection">Custom Multi-Year Selection</option>
              </select>
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            {selectedYearsOption === "Custom Year Selection" && (
              <div className="mt-3.5 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 animate-fadeIn">
                {availableYears.map(year => (
                  <label key={year} className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-emerald-400 transition-colors">
                    <input
                      type="checkbox"
                      checked={customYears[year] || false}
                      onChange={() => handleCheckboxChange(year)}
                      disabled={isLoading}
                      className="rounded border-slate-800 text-emerald-500 focus:ring-emerald-500/30 bg-slate-950 w-4.5 h-4.5"
                    />
                    <span>{year} Uploads</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Counts selections */}
          <div className="space-y-2">
            <label htmlFor="count-select" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
              Video Sample Limit
            </label>
            <div className="relative">
              <select
                id="count-select"
                value={videoCountOption}
                onChange={(e) => setVideoCountOption(e.target.value)}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl font-sans text-sm text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none"
              >
                <option value="Last 5 videos">Last 5 Videos</option>
                <option value="Last 10 videos">Last 10 Videos</option>
                <option value="Last 20 videos">Last 20 Videos</option>
                <option value="Custom number input">Custom Video Count</option>
              </select>
              <Film className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            {videoCountOption === "Custom number input" && (
              <div className="mt-3.5 animate-fadeIn">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={customCount}
                  onChange={(e) => setCustomCount(Math.min(50, Math.max(1, Number(e.target.value))))}
                  disabled={isLoading}
                  placeholder="e.g. 12"
                  className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl font-sans text-sm text-slate-200 placeholder-slate-600 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 block mt-1.5 font-mono">
                  Recommended: 4 to 20 for ultimate comprehensive precision.
                </span>
              </div>
            )}
          </div>

          {/* Analysis Depth options */}
          <div className="space-y-2">
            <label htmlFor="depth-select" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
              Core Report Strategy
            </label>
            <div className="relative">
              <select
                id="depth-select"
                value={depthOption}
                onChange={(e) => setDepthOption(e.target.value as AnalysisInput["analysisDepth"])}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl font-sans text-sm text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none"
              >
                <option value="Basic Analysis">Basic Analysis</option>
                <option value="Advanced Analysis">Advanced Analysis</option>
                <option value="Deep AI Analysis">Deep AI Analysis</option>
                <option value="Competitor Intelligence Analysis">Competitor Intelligence</option>
                <option value="Viral Growth Analysis">Viral Growth Analysis</option>
                <option value="Full Professional Report">Full Professional Report</option>
              </select>
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Trigger */}
        <button
          id="btn-trigger-analysis"
          type="submit"
          disabled={isLoading || !channelVal.trim()}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-sans font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border-t border-white/20"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Synthesizing Multi-Agent Analysis Report...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>Begin Advanced Channel Evaluation</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
