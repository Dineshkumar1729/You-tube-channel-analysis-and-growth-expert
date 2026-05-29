import React, { useState, useEffect } from "react";
import { Sparkles, LayoutDashboard, Network, AlertCircle, HelpCircle } from "lucide-react";
import ChannelInput from "./components/ChannelInput";
import ConnectivityDiagnostics from "./components/ConnectivityDiagnostics";
import ReportDashboard from "./components/ReportDashboard";
import ArchitectureViewer from "./components/ArchitectureViewer";
import { AnalysisInput, Report } from "./types";

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<"expert" | "architecture">("expert");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [reportData, setReportData] = useState<Report | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);

  const loadingMessages = [
    "Initializing Secure Gemini & Search Grounding Nodes...",
    "Crawling specified YouTube upload metrics and views registers...",
    "Activating NLP Comment Agents to decode user engagement sentiments...",
    "Benchmarking target channel metadata grids against top 3 niche competitors...",
    "Fleshing out 30-60-90 days growth plans and optimizing thumbnail blueprints...",
    "Compiling and validating unified strategic growth report JSON schema payload..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingMessageIdx(0);
      interval = setInterval(() => {
        setLoadingMessageIdx(prev => (prev + 1) % loadingMessages.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleStartAnalysis = async (input: AnalysisInput) => {
    setIsLoading(true);
    setErrorMsg(null);
    setReportData(null);
    setIsSimulated(false);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "A connection network issue occurred.");
      }

      if (data.report) {
         setReportData(data.report);
         setIsSimulated(data.isSimulated || false);
      } else {
         throw new Error("No analysis payload was returned from the server.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Internal Server analysis error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased text-sm">
      {/* Universal header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950 font-bold font-mono shadow-md shadow-emerald-500/10">
              YT
            </div>
            <div>
              <span className="font-sans font-bold text-slate-100 text-base tracking-tight block">
                Channel Intelligence Engine
              </span>
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block -mt-0.5">
                Advanced AI Growth Expert
              </span>
            </div>
          </div>

          {/* Nav workspace triggers */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
            <button
              onClick={() => setActiveWorkspace("expert")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                activeWorkspace === "expert" 
                  ? "bg-slate-950 text-emerald-400 font-bold border border-slate-800"
                  : "hover:text-slate-200"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Growth Dashboard</span>
            </button>
            <button
              onClick={() => setActiveWorkspace("architecture")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                activeWorkspace === "architecture" 
                  ? "bg-slate-950 text-emerald-400 font-bold border border-slate-800"
                  : "hover:text-slate-200"
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>System Blueprint</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main body canvas */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        {activeWorkspace === "expert" ? (
          <div className="space-y-8">
            
            {/* Input target panel */}
            <ChannelInput onStartAnalysis={handleStartAnalysis} isLoading={isLoading} />

            {/* AI Diagnostics & Key Validation Utility */}
            <ConnectivityDiagnostics />

            {/* ERROR BOUND */}
            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-red-200 block">Performance Analysis Encountered Oblique Status</span>
                  {errorMsg}
                </div>
              </div>
            )}

            {/* SKELETON LOADER ANIMATION */}
            {isLoading && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-center space-y-6 flex flex-col items-center justify-center py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
                
                {/* Rolling spinner ring */}
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                </div>

                <div className="space-y-2 max-w-md">
                  <h3 className="text-base font-sans font-bold text-slate-200 tracking-tight animate-pulse">
                    {loadingMessages[loadingMessageIdx]}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Node status: ACTIVE · Orchestrator tracking sequential pipeline execution targets
                  </p>
                </div>
              </div>
            )}

            {/* COHESIVE AUDIT REPORT */}
            {reportData && !isLoading && (
              <ReportDashboard report={reportData} isSimulated={isSimulated} />
            )}

            {/* Idle Welcome State when no report is generated/loading */}
            {!reportData && !isLoading && !errorMsg && (
              <div id="welcome-splash" className="bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-slate-200">No Target Evaluated Yet</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Submit a YouTube Channel URL above. The multi-agent AI will perform a real SEO keyword sweep and diagnose click-through potential to compile immediate growth roadmaps.
                  </p>
                </div>
              </div>
            )}

          </div>
        ) : (
          <ArchitectureViewer />
        )}
      </main>

      {/* Humble Footer */}
      <footer className="border-t border-slate-900 text-[11px] text-slate-600 font-mono text-center py-8">
        YT Channel Intelligence Engine · Powered by Gemini Autigravity Agents · © 2026
      </footer>
    </div>
  );
}
