import React, { useState, useEffect } from "react";
import { Activity, CheckCircle2, AlertTriangle, RefreshCw, Database, Network, Info, Lock } from "lucide-react";

interface DiagnosticData {
  status: "HEALTHY" | "DEGRADED" | "OUTAGE";
  geminiKey: {
    configured: boolean;
    validFormat: boolean;
    masked: string;
  };
  youtubeApiKey: {
    configured: boolean;
  };
  network: {
    googleEndpointConnected: boolean;
    latencyMs: number;
    diagnosticError: string | null;
  };
  troubleshootSteps: string[];
}

export default function ConnectivityDiagnostics() {
  const [data, setData] = useState<DiagnosticData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchDiagnostics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/diagnose");
      if (res.ok) {
        const payload = await res.json();
        setData(payload);
      } else {
        throw new Error("HTTP connection failed");
      }
    } catch (err) {
      console.error("Failed to load backend diagnostics:", err);
      // Fallback state if server is offline
      setData({
        status: "OUTAGE",
        geminiKey: { configured: false, validFormat: false, masked: "Missing" },
        youtubeApiKey: { configured: false },
        network: { googleEndpointConnected: false, latencyMs: -1, diagnosticError: "Backend Gateway Offline" },
        troubleshootSteps: [
          "The Express development server is currently booting or unreachable on port 3000.",
          "Ensure NPM Dev scripts are running on host '0.0.0.0' and port 3000.",
          "Check your browser console logs for any immediate routing/CORS network blocks."
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "HEALTHY") return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (status === "DEGRADED") return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-rose-400 bg-rose-500/10 border-rose-500/20";
  };

  return (
    <div id="diagnostics-suite" className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden font-sans">
      {/* Header Bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold block">
              System Gateway Diagnostics
            </span>
            <span className="text-[10px] text-slate-500 font-sans block mt-0.5">
              {data?.status === "HEALTHY" 
                ? "All API validation checks verified and fully connected" 
                : "Checking Gemini connection and authentication protocols..."}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {data && (
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getStatusColor(data.status)}`}>
              {data.status}
            </span>
          )}
          <button 
            type="button"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-mono"
            onClick={(e) => {
              e.stopPropagation();
              fetchDiagnostics();
            }}
            disabled={loading}
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-900 bg-slate-950/40 text-[12px] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Gemini Check */}
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-400 font-bold text-[10px] uppercase">
                  Gemini API Auth Status
                </span>
                <Lock className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200">
                  {data?.geminiKey.configured ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  )}
                  <span>{data?.geminiKey.configured ? "Key Linked" : "API Key Missing"}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  Masked: {data?.geminiKey.masked}
                </p>
              </div>
            </div>

            {/* YouTube Check */}
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-400 font-bold text-[10px] uppercase">
                  YouTube Data API Check
                </span>
                <Database className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200">
                  {data?.youtubeApiKey.configured ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span>{data?.youtubeApiKey.configured ? "Custom YT SDK Token Active" : "Fallback Search Scraping"}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  {data?.youtubeApiKey.configured ? "Standard Client Routing Enabled" : "Autonomous agent enabled"}
                </p>
              </div>
            </div>

            {/* Google Endpoint Connection Latency Check */}
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-400 font-bold text-[10px] uppercase">
                  Google Secure routing Network
                </span>
                <Network className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200">
                  {data?.network.googleEndpointConnected ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  )}
                  <span>{data?.network.googleEndpointConnected ? "Google Cloud Live" : "Connection Blocked"}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  Latency: {data?.network.latencyMs !== -1 ? `${data?.network.latencyMs}ms` : "Unreachable"}
                </p>
              </div>
            </div>

          </div>

          {/* Actionable Trouble Shooting guidelines */}
          {data?.troubleshootSteps && data.troubleshootSteps.length > 0 && (
            <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-lg space-y-2">
              <span className="block font-sans text-amber-400 font-bold text-[11px] uppercase tracking-wide">
                Diagnostics Action Resolution Guide
              </span>
              <ol className="space-y-1.5 list-decimal pl-4 text-slate-300 text-[11px] font-sans">
                {data.troubleshootSteps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
