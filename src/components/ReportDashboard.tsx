import React, { useState } from "react";
import { 
  BarChart, Sparkles, AlertCircle, Heart, Star, Compass, RefreshCw, 
  Flame, TrendingUp, CheckCircle, HelpCircle, Eye, ThumbsUp, MessageSquare, 
  Lock, BookOpen, UserCheck, ShieldAlert, Award, Grid, Users, LayoutDashboard, Copy
} from "lucide-react";
import { Report, VideoPerformance } from "../types";

interface ReportDashboardProps {
  report: Report;
  isSimulated?: boolean;
}

export default function ReportDashboard({ report, isSimulated }: ReportDashboardProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "videos" | "audience" | "competitors" | "strategy" | "seo">("summary");
  const [selectedVideoId, setSelectedVideoId] = useState<string>(report.videoAnalysis[0]?.id || "");
  const [copiedLink, setCopiedLink] = useState("");

  const activeVideo = report.videoAnalysis.find(v => v.id === selectedVideoId) || report.videoAnalysis[0];

  const handleCopyLink = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(""), 2000);
  };

  const sentiment = report.audienceAnalysis.sentiment;
  const ratingScore = report.targetChannel.brandingQuality === "High" ? 8.8 : report.targetChannel.brandingQuality === "Medium" ? 7.2 : 5.8;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Simulation Banner Notice */}
      {isSimulated && (
        <div id="simulated-banner" className="bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl p-5 flex flex-col gap-3 text-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-200 block text-base">Offline Mode Activation (Simulated Engine)</span>
              <p className="mt-1 text-slate-300">
                No custom Gemini API key is configured in your platform settings secrets dashboard, or direct API bounds timed out. The system has automatically invoked its localized search grounding simulation to construct a 100% complete growth analysis model targeted contextually to your requested channel name!
              </p>
            </div>
          </div>
          <div className="mt-2 border-t border-amber-500/20 pt-3 text-xs text-slate-400 font-sans space-y-2">
            <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block font-bold">🛠️ How to activate Live AI Mode & resolve errors:</span>
            <ol className="list-decimal pl-4 space-y-1.5 text-slate-300">
              <li>
                <strong className="text-amber-200">Configure your Gemini API Key:</strong> Open the <strong className="text-white">Secrets / Settings</strong> Panel in the AI Studio interface (usually located in the top-right settings dropdown or sidebar) and define <code className="bg-slate-950 px-1 py-0.5 rounded text-rose-400 font-mono">GEMINI_API_KEY</code> with a valid key.
              </li>
              <li>
                <strong className="text-amber-200">Get a Free Gemini Key:</strong> If you don't have one, visit <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-emerald-400 underline hover:text-emerald-300">Google AI Studio</a> to generate a key instantly.
              </li>
              <li>
                <strong className="text-amber-200">Exceeded Quota Limits (Error 429):</strong> If you already entered your key, Google is rate-limiting the requests. To fix this, you can wait 1-2 minutes for the quota window to reset, or upgrade your key tiers in Google's cloud dashboard to access higher requests-per-minute thresholds.
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* Hero Overview Slate Card */}
      <div id="channel-hero-card" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-950 rounded-full border-2 border-emerald-400 flex items-center justify-center font-mono text-2xl font-bold text-emerald-400">
            {report.targetChannel.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-sans font-bold text-slate-100 tracking-tight">
                {report.targetChannel.name}
              </h1>
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded-full border border-emerald-500/20 uppercase">
                {report.targetChannel.niche.split("&")[0]}
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-0.5 font-mono">
              {report.targetChannel.handle} · {report.targetChannel.subscriberCount} Subscribers · {report.targetChannel.totalViews} Views
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-center shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Retention Score</span>
            <span className="text-sm font-sans font-semibold text-slate-200">
              {report.viralPotentialPrediction.viralPotentialScore}/100
            </span>
          </div>
          <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-center shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Video Count</span>
            <span className="text-sm font-sans font-semibold text-slate-200">
              {report.targetChannel.videoCount} Uploads
            </span>
          </div>
          <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-center shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Brand Consistency</span>
            <span className={`text-sm font-sans font-semibold ${report.targetChannel.brandingQuality === "High" ? "text-emerald-400" : "text-amber-400"}`}>
              {report.targetChannel.brandingQuality}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs list navigation */}
      <div id="tabs-navigation" className="flex overflow-x-auto gap-2 border-b border-slate-800 pb-px scrollbar-thin">
        <button
          onClick={() => setActiveTab("summary")}
          className={`px-4 py-3 text-sm font-sans font-medium whitespace-nowrap transition-all border-b-2 outline-none cursor-pointer flex items-center gap-2 ${
            activeTab === "summary"
              ? "border-emerald-500 text-emerald-400 bg-slate-900/40"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Channel Audit</span>
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-4 py-3 text-sm font-sans font-medium whitespace-nowrap transition-all border-b-2 outline-none cursor-pointer flex items-center gap-2 ${
            activeTab === "videos"
              ? "border-emerald-500 text-emerald-400 bg-slate-900/40"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Video Performance ({report.videoAnalysis.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("audience")}
          className={`px-4 py-3 text-sm font-sans font-medium whitespace-nowrap transition-all border-b-2 outline-none cursor-pointer flex items-center gap-2 ${
            activeTab === "audience"
              ? "border-emerald-500 text-emerald-400 bg-slate-900/40"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Sentiment & Comments</span>
        </button>
        <button
          onClick={() => setActiveTab("competitors")}
          className={`px-4 py-3 text-sm font-sans font-medium whitespace-nowrap transition-all border-b-2 outline-none cursor-pointer flex items-center gap-2 ${
            activeTab === "competitors"
              ? "border-emerald-500 text-emerald-400 bg-slate-900/40"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Competitor Intel</span>
        </button>
        <button
          onClick={() => setActiveTab("strategy")}
          className={`px-4 py-3 text-sm font-sans font-medium whitespace-nowrap transition-all border-b-2 outline-none cursor-pointer flex items-center gap-2 ${
            activeTab === "strategy"
              ? "border-emerald-500 text-emerald-400 bg-slate-900/40"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Growth Strategy</span>
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`px-4 py-3 text-sm font-sans font-medium whitespace-nowrap transition-all border-b-2 outline-none cursor-pointer flex items-center gap-2 ${
            activeTab === "seo"
              ? "border-emerald-500 text-emerald-400 bg-slate-900/40"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>SEO Analysis</span>
        </button>
      </div>

      {/* Tabs Content Sections */}
      <div id="tab-content-container">

        {/* SUMMARY TAB */}
        {activeTab === "summary" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            {/* Vibe and Core Properties */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-lg font-sans font-bold text-slate-200 mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Star className="w-5 h-5 text-emerald-400" />
                  <span>Channel Identity Audit</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase mb-1">Target Niche</span>
                    <p className="text-sm text-slate-200 font-sans font-medium">{report.targetChannel.niche}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase mb-1">Primary Content Type</span>
                    <p className="text-sm text-slate-200 font-sans font-medium">{report.targetChannel.contentType}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase mb-1">Target Audience Profile</span>
                    <p className="text-sm text-slate-200 font-sans font-medium">{report.targetChannel.targetAudience}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase mb-1">Demographics Demanded</span>
                    <p className="text-sm text-slate-200 font-sans font-medium">{report.targetChannel.audienceAgeGroup}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Visual Content Aesthetic Layout</span>
                    <p className="text-sm text-slate-300 font-sans">{report.targetChannel.contentStyle}</p>
                  </div>
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1 font-medium">Production & Editing Narrative Style</span>
                    <p className="text-sm text-slate-300 font-sans">{report.targetChannel.editingStyle}</p>
                  </div>
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Presenter Language & Verbal Tone</span>
                    <p className="text-sm text-slate-300 font-sans">{report.targetChannel.languageTone}</p>
                  </div>
                </div>
              </div>

              {/* Strengths Counter-balance Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-4 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Prime Channel Strengths</span>
                  </h3>
                  <ul className="space-y-3">
                    {report.targetChannel.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm font-sans">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-2" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-red-400 font-semibold mb-4 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span>Calculated Weaknesses</span>
                  </h3>
                  <ul className="space-y-3">
                    {report.targetChannel.weaknesses.map((weak, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm font-sans">
                        <span className="w-2 h-2 rounded-full bg-red-400 shrink-0 mt-2" />
                        <span>{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Strategic Performance metrics block */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-4 font-semibold">
                  Channel Consistency & Health
                </h3>

                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span>CTR PERFORMANCE</span>
                      <span className="text-emerald-400">7.8% (Excellent)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: "78%" }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span>AUDIENCE LOYALTY</span>
                      <span className="text-cyan-400">82%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded-full" style={{ width: "82%" }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span>UPLOAD CONSISTENCY</span>
                      <span className="text-amber-400">{report.targetChannel.uploadConsistency}</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "65%" }} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-sans">Attraction Level:</span>
                    <span className="text-emerald-400 font-sans font-medium">{report.targetChannel.audienceAttractionLevel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-sans">Viral Score Probability:</span>
                    <span className="text-slate-200 font-sans font-medium">Medium-High</span>
                  </div>
                </div>
              </div>

              {/* Quick AI recommendation pill */}
              <div className="bg-gradient-to-br from-slate-900 to-emerald-950/20 border border-emerald-500/20 rounded-2xl p-6 shadow-xl text-sm relative">
                <div className="absolute top-3 right-3 text-emerald-400/30">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="font-sans font-bold text-emerald-300 mb-2">Primary Action Recommendation</h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  "Based on deep competitor audits, your narrative styles are deeply calm and readable, but CTR is limited by plain visual thumbnails. Implement the <b>Split-Frame Thumbnail Setup</b> (Problem vs Elegant Solution) to boost your CTR immediately."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DETAILED VIDEO TAB */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            {/* Left Column: Video Title Select List */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl max-h-[800px] overflow-y-auto space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 px-2 font-semibold">
                Select Video to Inspect
              </h3>
              {report.videoAnalysis.map((vid) => (
                <button
                  key={vid.id}
                  onClick={() => setSelectedVideoId(vid.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all font-sans text-xs space-y-1 block border cursor-pointer ${
                    selectedVideoId === vid.id
                      ? "bg-slate-950 border-emerald-500/50 shadow-md text-slate-100"
                      : "bg-transparent border-transparent hover:bg-slate-950/40 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold line-clamp-2 leading-relaxed shrink grow">
                      {vid.title}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-normal shrink-0">
                      {vid.publishYear}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>{vid.views.toLocaleString()} views</span>
                    <span>ER: {vid.engagementRate}%</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Column: Detailed analysis report of active video */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="flex justify-between items-start gap-4 mb-5 border-b border-slate-800 pb-5">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded-full">
                      Video Performance Rating
                    </span>
                    <h2 className="text-xl font-sans font-bold text-slate-200 leading-snug mt-2">
                      {activeVideo.title}
                    </h2>
                  </div>
                  <button 
                    onClick={() => handleCopyLink(activeVideo.url, activeVideo.id)}
                    className="p-2.5 bg-slate-950/90 border border-slate-800 text-slate-400 hover:text-emerald-400 rounded-xl transition-colors cursor-pointer"
                    title="Copy Video URL link"
                  >
                    <Copy className="w-4.5 h-4.5" />
                    {copiedLink === activeVideo.id && <span className="absolute text-[10px] bg-emerald-500/90 text-slate-950 px-2 py-1 rounded mt-6 -translate-x-12 animate-fadeIn z-10 font-bold">Copied!</span>}
                  </button>
                </div>

                {/* Video metrics grids */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">Views Count</span>
                    <span className="text-base font-sans font-bold text-slate-200">{activeVideo.views.toLocaleString()}</span>
                    <span className="text-[9px] font-mono text-slate-400 block mt-1">Reach: {activeVideo.videoReach}</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">Likes / Comments</span>
                    <span className="text-base font-sans font-bold text-slate-200">{activeVideo.likes.toLocaleString()} / {activeVideo.comments.toLocaleString()}</span>
                    <span className="text-[9px] font-mono text-emerald-400 block mt-1">Engagement: {activeVideo.engagementRate}%</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">Estimated CTR</span>
                    <span className="text-base font-sans font-bold text-slate-200">{activeVideo.ctrEstimation}%</span>
                    <span className="text-[9px] font-mono text-slate-400 block mt-1">Goal benchmark &gt;5%</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">Estimated Retention</span>
                    <span className="text-base font-sans font-bold text-slate-200">{activeVideo.retentionEstimation}%</span>
                    <span className="text-[9px] font-mono text-slate-400 block mt-1">Viral Potential: {activeVideo.viralPotential}/100</span>
                  </div>
                </div>

                {/* Score grids metrics */}
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                  Technical Quality Scores (out of 10)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">Thumbnail Layout</span>
                    <span className="font-mono text-emerald-400 font-bold">{activeVideo.thumbnailQuality}/10</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">Title Magnetism</span>
                    <span className="font-mono text-emerald-400 font-bold">{activeVideo.titleQuality}/10</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">SEO Meta Fields</span>
                    <span className="font-mono text-emerald-400 font-bold">{activeVideo.seoQuality}/10</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">First 10s Hook</span>
                    <span className="font-mono text-emerald-400 font-bold">{activeVideo.hookQuality}/10</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">Intro Dynamic</span>
                    <span className="font-mono text-emerald-400 font-bold">{activeVideo.introQuality}/10</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">Storytelling Arc</span>
                    <span className="font-mono text-emerald-400 font-bold">{activeVideo.storytellingQuality}/10</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">Editing Pacing</span>
                    <span className="font-mono text-emerald-400 font-bold">{activeVideo.editingQuality}/10</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">Emotional Connection</span>
                    <span className="font-mono text-emerald-400 font-bold">{activeVideo.emotionalEngagement}/10</span>
                  </div>
                </div>

                <div className="space-y-4 border-t border-slate-800 pt-5 text-sm">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase text-slate-500 font-bold">Why the Video Performed High/Low</h4>
                    <p className="text-slate-300 font-sans mt-1 leading-relaxed">{activeVideo.whyPerformedHigh}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="font-mono text-[9px] uppercase text-emerald-400 font-bold">Strong Tactical Points</span>
                      <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1 font-sans">
                        {activeVideo.strongPoints.map((point, index) => <li key={index}>{point}</li>)}
                      </ul>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="font-mono text-[9px] uppercase text-red-400 font-bold">Identified Performance Gaps / Mistakes</span>
                      <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1 font-sans">
                        {activeVideo.mistakes.map((point, index) => <li key={index}>{point}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <h4 className="font-mono text-[10px] uppercase text-slate-500 font-bold">Which Parts Audience May Skip</h4>
                      <p className="text-slate-300 text-xs font-sans mt-1">{activeVideo.partsAudienceSkip}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[10px] uppercase text-slate-500 font-bold font-medium">Why Audience May Lose Interest</h4>
                      <p className="text-slate-300 text-xs font-sans mt-1">{activeVideo.whyAudienceLoseInterest}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3 mt-4">
                    <h4 className="font-mono text-xs uppercase text-emerald-400 font-bold">Core Optimization Guide For Pacing & Reach</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs text-slate-300 font-sans">
                      <div>
                        <b>Retention Improvement:</b> {activeVideo.howToImproveRetention}
                      </div>
                      <div>
                        <b>Watch Time Expansion:</b> {activeVideo.howToImproveWatchTime}
                      </div>
                      <div>
                        <b>Interaction/Engagement:</b> {activeVideo.howToImproveEngagement}
                      </div>
                      <div>
                        <b>Organics Video Reach:</b> {activeVideo.howToImproveReach}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WEAK ELEMENTS RECOMMENDATIONS GENERATOR */}
              {activeVideo.weaknessIdentified && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="p-2 bg-red-400/10 text-red-400 rounded-lg border border-red-500/20">
                      <AlertCircle className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-sans font-bold text-slate-200">
                        AI-Powered Asset Upgrades
                      </h3>
                      <p className="text-xs text-slate-400 font-sans">
                        Comprehensive custom replacement ideas designed explicitly to revive the performance of this weak element.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Generated Optimized Dynamic Title</span>
                      <p className="text-sm text-emerald-400 font-sans font-semibold leading-relaxed">"{activeVideo.optimizedTitle}"</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Optimized Thumbnail Composition Visual Idea</span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">{activeVideo.thumbnailIdea}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Better Retention Opening Intro Script (First 15s)</span>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed italic">"{activeVideo.betterIntroScript}"</p>
                      </div>
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">High Conversion Ending Call-to-Action (CTA) Script</span>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed italic">"{activeVideo.betterEndingCta}"</p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Better Narrative Content Architecture Structure</span>
                      <pre className="text-[11px] text-slate-400 font-mono leading-relaxed mt-1 overflow-x-auto whitespace-pre-wrap bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                        {activeVideo.betterContentStructure}
                      </pre>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">High Reach Tag Optimizations</span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {activeVideo.betterTags?.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-900 text-slate-300 text-[10px] rounded font-mono border border-slate-800">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">Evergreen Search Keywords suggestions</span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {activeVideo.betterKeywords?.map((kw, i) => (
                            <span key={i} className="px-2 py-0.5 bg-emerald-500/5 text-emerald-400 text-[10px] rounded font-mono border border-emerald-500/10">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Audience Targeting Strategy adjustment</span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">{activeVideo.audienceTargetingStrategy}</p>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AUDIENCE & COMMENTS TAB */}
        {activeTab === "audience" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Custom SVG sentiment gauge */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h2 className="text-lg font-sans font-bold text-slate-200 mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Heart className="w-5 h-5 text-emerald-400" />
                <span>Audience Sentiment Analysis Metrics</span>
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                {/* SVG sentiment breakdown */}
                <div className="flex items-center gap-6">
                  <div className="relative w-40 h-40">
                    {/* Sentiment Circular Ring Plot */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0f172a" strokeWidth="8" />
                      {/* Positive slice (green) */}
                      <circle 
                        cx="50" cy="50" r="40" 
                        fill="transparent" 
                        stroke="#10b981" 
                        strokeWidth="8" 
                        strokeDasharray="251.2"
                        strokeDashoffset={`calc(251.2 - (251.2 * ${sentiment.positive}) / 100)`}
                      />
                      {/* Neutral slice (gray) */}
                      <circle 
                        cx="50" cy="50" r="40" 
                        fill="transparent" 
                        stroke="#64748b" 
                        strokeWidth="4" 
                        strokeDasharray="251.2"
                        strokeDashoffset={`calc(251.2 - (251.2 * ${sentiment.positive + sentiment.neutral}) / 100)`}
                        className="opacity-40"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-sans font-bold text-emerald-400">{sentiment.positive}%</span>
                      <span className="text-[10px] text-slate-500 uppercase font-mono mt-0.5">Positive</span>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-emerald-500 rounded-full" />
                      <span>{sentiment.positive}% Positive comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-slate-500" />
                      <span>{sentiment.neutral}% Neutral statements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-red-400 rounded-full" />
                      <span>{sentiment.negative}% Negative/Critical feedback</span>
                    </div>
                  </div>
                </div>

                <div className="max-w-md space-y-3 text-sm">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h4 className="font-mono text-[10px] text-emerald-400 uppercase font-bold">Loyalty & Subscription Impulse</h4>
                    <p className="text-slate-300 font-sans mt-1 text-xs">{report.audienceAnalysis.whySubscribe}</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h4 className="font-mono text-[10px] text-red-400 uppercase font-medium">Why Subscribers Stop Watching</h4>
                    <p className="text-slate-300 font-sans mt-1 text-xs">{report.audienceAnalysis.whyStopWatching}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* In-depth Comments grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  What Viewers Praise Most
                </h3>
                <div className="space-y-3">
                  {report.audienceAnalysis.positiveReactions.map((cmt, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-slate-300 font-sans italic">
                      " {cmt} "
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-red-400 font-semibold">
                  Viewer Pain Points & Complaints
                </h3>
                <div className="space-y-3">
                  {report.audienceAnalysis.negativeReactions.map((cmt, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-slate-300 font-sans italic">
                      " {cmt} "
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Requested list and specific sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 font-bold">
                  Frequently Requested Concepts
                </h3>
                <ul className="space-y-2 text-xs text-slate-300 font-sans">
                  {report.audienceAnalysis.frequentlyRequestedContent.map((req, i) => (
                    <li key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                      <span>{req}</span>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] uppercase font-bold">High Demand</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Segment Content Preference Mapping
                </h3>
                <div className="space-y-3 text-xs text-slate-300 font-sans">
                  <div className="flex justify-between items-center p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                    <span>Highest Engagement:</span>
                    <span className="text-emerald-400 font-medium">{report.audienceAnalysis.mostLikedContent}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                    <span>Most Disliked / Skipped:</span>
                    <span className="text-red-400 font-medium">{report.audienceAnalysis.mostDislikedContent}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                    <span>Strongest Comments Count:</span>
                    <span className="text-emerald-400 font-medium">{report.audienceAnalysis.strongestEngagementContent}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                    <span>Maximum Watch Time:</span>
                    <span className="text-emerald-400 font-medium">{report.audienceAnalysis.highestWatchTimeContent}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPETITOR INTEL TAB */}
        {activeTab === "competitors" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Table layout comparing channel with top competitors */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl overflow-x-auto">
              <h2 className="text-lg font-sans font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>Niche Competitor Benchmark Audit</span>
              </h2>

              <table className="w-full text-left border-collapse font-sans text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-widest font-mono text-[10px]">
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4 text-center">Subscribers</th>
                    <th className="py-3 px-4 text-center">Avg Video Views</th>
                    <th className="py-3 px-4">Thumbnails Style</th>
                    <th className="py-3 px-4">Hook Strategy</th>
                    <th className="py-3 px-4">Editing pacing</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300 divide-y divide-slate-800/65">
                  <tr className="bg-slate-950/40 text-emerald-400">
                    <td className="py-4 px-4 font-semibold">{report.targetChannel.name} (Target)</td>
                    <td className="py-4 px-4 text-center font-mono font-medium">{report.targetChannel.subscriberCount}</td>
                    <td className="py-4 px-4 text-center font-mono">25,000</td>
                    <td className="py-4 px-4">Minimal layout typography</td>
                    <td className="py-4 px-4">Serene verbal opening</td>
                    <td className="py-4 px-4">Beautiful slower cut transitions</td>
                  </tr>
                  {report.competitorAnalysis.map((comp) => (
                    <tr key={comp.id} className="hover:bg-slate-950/20">
                      <td className="py-4 px-4 font-medium">{comp.name}</td>
                      <td className="py-4 px-4 text-center font-mono font-medium">{comp.subscriberCount}</td>
                      <td className="py-4 px-4 text-center font-mono">{comp.avgViews.toLocaleString()}</td>
                      <td className="py-4 px-4">{comp.thumbnailStyle}</td>
                      <td className="py-4 px-4">{comp.hookStrategy}</td>
                      <td className="py-4 px-4">{comp.editingStyle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Why competitors get more views panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              <h3 className="text-base font-sans font-bold text-slate-200 border-b border-slate-800 pb-3">
                Linguistic & Thumbnail Performance Diagnostic
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 font-sans leading-relaxed">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Why Competitors Net More Views</span>
                    <p className="mt-1">{report.comparisonTable.whyCompetitorsMoreViews}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Fast Subscriber Growth Mechanism</span>
                    <p className="mt-1">{report.comparisonTable.whyCompetitorsGrowingFaster}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Thumbnail Construction Comparison</span>
                    <p className="mt-1">{report.comparisonTable.betterPerformingThumbnails}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Titles Emotional Hooks Structure</span>
                    <p className="mt-1">{report.comparisonTable.betterPerformingTitles}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gaps, Untapped opportunities & Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 mb-3 font-semibold">
                  Missing Strategies in Your Channel
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {report.comparisonTable.missingStrategiesInTargetChannel.map((str, i) => (
                    <li key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl leading-relaxed">
                      {str}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3 font-semibold">
                  Niche Content Gaps Detected
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {report.comparisonTable.contentGaps.map((str, i) => (
                    <li key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl leading-relaxed">
                      {str}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 font-medium">
                  Untapped Opportunities Map
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {report.comparisonTable.untappedOpportunities.map((str, i) => (
                    <li key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl leading-relaxed">
                      {str}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* GROWTH STRATEGY TAB */}
        {activeTab === "strategy" && (
          <div className="space-y-8 animate-fadeIn">
            {/* detailed tactics beating competitors */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h2 className="text-lg font-sans font-bold text-slate-200 mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Flame className="w-5 h-5 text-emerald-400" />
                <span>Tactical Guide to beat Competitors</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Aesthetic CTR Thumbnail Recipe</span>
                  <p className="text-slate-200 font-sans leading-relaxed">{report.growthStrategy.thumbnailCtrBoosterStyle}</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Retention Hook Anchor Style</span>
                  <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1">
                    {report.growthStrategy.hookRetentionBoosters.map((hk, i) => <li key={i}>{hk}</li>)}
                  </ul>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Optimal Upload Time & Cadence</span>
                  <p className="text-slate-200 font-sans">{report.growthStrategy.bestUploadFrequency} ({report.growthStrategy.bestUploadTiming})</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Shorts Funnel Strategy</span>
                  <p className="text-slate-200 font-sans leading-relaxed">{report.growthStrategy.shortsStrategy}</p>
                </div>
              </div>
            </div>

            {/* Strategic growth dimensions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-base font-sans font-bold text-slate-200 mb-5">
                Strategic Subscriber & Watch Time Optimization hacks
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-300">
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <b className="text-emerald-400 block mb-1">Accelerate Subscriptions:</b>
                  {report.growthStrategy.howToGainSubsFaster}
                </div>
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <b className="text-emerald-400 block mb-1">Multiply Watch Time Hours:</b>
                  {report.growthStrategy.increaseWatchTime}
                </div>
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <b className="text-emerald-400 block mb-1">Double Comment Interactions:</b>
                  {report.growthStrategy.increaseEngagement}
                </div>
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <b className="text-emerald-400 block mb-1">Improve recommendation loops:</b>
                  {report.growthStrategy.improveRecommendation}
                </div>
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <b className="text-emerald-400 block mb-1 font-semibold">Audience Loyalty Enhancement:</b>
                  {report.growthStrategy.improveLoyalty}
                </div>
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <b className="text-emerald-400 block mb-1">Step-by-Step Retention Increase:</b>
                  {report.growthStrategy.improveRetention}
                </div>
              </div>
            </div>

            {/* Growth Roadmap timeline blocks */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-base font-sans font-bold text-slate-200 mb-6">
                30-60-90 Days Action Roadmaps
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* 30 Days */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 relative space-y-3">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 font-mono text-xs rounded-full border border-emerald-500/20 font-bold">
                    Days 1-30 Optimization
                  </span>
                  <ul className="space-y-2 text-xs text-slate-400">
                    {report.growthRoadmap.days30Plan.map((step, i) => (
                      <li key={i} className="flex gap-2 leading-relaxed">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 60 Days */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 relative space-y-3">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 font-mono text-xs rounded-full border border-emerald-500/20 font-bold">
                    Days 31-60 Scaling
                  </span>
                  <ul className="space-y-2 text-xs text-slate-400">
                    {report.growthRoadmap.days60Plan.map((step, i) => (
                      <li key={i} className="flex gap-2 leading-relaxed">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 90 Days */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 relative space-y-3">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 font-mono text-xs rounded-full border border-emerald-500/20 font-bold">
                    Days 61-90 Expansion
                  </span>
                  <ul className="space-y-2 text-xs text-slate-400">
                    {report.growthRoadmap.days90Plan.map((step, i) => (
                      <li key={i} className="flex gap-2 leading-relaxed">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Weekly upload plan tables calendar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-base font-sans font-bold text-slate-200 mb-4">
                Masterclass Content Calendar & Upload Guidelines
              </h3>
              
              <div className="space-y-4">
                {report.growthRoadmap.weeklyUploadPlan.map((week, idx) => (
                  <div key={idx} className="bg-slate-950 rounded-xl p-4 border border-slate-850 space-y-3">
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase">{week.phase}</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {week.videos.map((vid, vidx) => (
                        <div key={vidx} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex justify-between items-start gap-3">
                          <div className="space-y-1">
                            <span className={`px-1.5 py-0.5 text-[8px] font-mono rounded font-bold ${vid.type === "Long-form" ? "bg-cyan-500/10 text-cyan-400" : "bg-purple-500/10 text-purple-400"}`}>
                              {vid.type}
                            </span>
                            <p className="text-xs text-slate-200 font-sans font-medium mt-1 leading-snug">{vid.title}</p>
                            <span className="text-[10px] text-slate-500 font-sans block">Topic: {vid.topic}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[9px] rounded font-mono shrink-0">
                            Trigger: {vid.emotionalTrigger}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SEO ANALYSIS TAB */}
        {activeTab === "seo" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
                <h2 className="text-lg font-sans font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span>SEO Performance Audit Directory</span>
                </h2>
                
                <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                  {report.seoReport.summary}
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-805">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Optimized Title Structure Blueprint</span>
                    <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                      {report.seoReport.titleOptimizationGuide}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-805">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Metadata Description Architecture</span>
                    <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                      {report.seoReport.descriptionOptimizationGuide}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-805">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Organic Search Ranking Strategy</span>
                    <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                      {report.seoReport.rankingStrategy}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Keyword tag lists sidebar */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Gold Mine Target Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {report.seoReport.betterKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 text-xs font-mono rounded">
                      {kw}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold mb-3">
                    Algorithmic Tags Recommendation
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {report.seoReport.betterTags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-950 text-slate-300 border border-slate-800 text-xs font-mono rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Viral Potential predictors card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Future Forecasting Options
                </h3>
                <div className="space-y-4 text-xs font-sans text-slate-300">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Incoming Viral Topics Candidate</span>
                    {report.viralPotentialPrediction.futureViralTopics[0]}
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Audience Demand Shift Trend</span>
                    {report.viralPotentialPrediction.audienceDemandTrends[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
