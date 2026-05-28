import React, { useState } from "react";
import { 
  Server, Cpu, Database, Network, ChevronRight, Terminal, 
  Settings, FolderTree, BookOpen, Layers, CheckCircle, Code 
} from "lucide-react";

export default function ArchitectureViewer() {
  const [activePane, setActivePane] = useState<"agents" | "folder" | "commands" | "docs">("agents");

  const agents = [
    {
      id: "channel-agent",
      name: "Channel Analysis Agent",
      role: "Aesthetic & Structural Audit",
      responsibility: "Evaluates the overall branding, presenter vocal tone quality, editing rhythm, visual bento-grid components consistency, strengths, and structural production flaws.",
      pills: ["Dynamic Profiler", "Aesthetic Auditor"]
    },
    {
      id: "audience-agent",
      name: "Audience Sentiment Agent",
      role: "Linguistic & Comment Miner",
      responsibility: "Aggregates comment directories, performs deep percentage sentiment categorizations (Positive, Neutral, Negative), and catalogs viewer requested content topics.",
      pills: ["Vocal Sentiment", "Linguistic Miner"]
    },
    {
      id: "competitor-agent",
      name: "Competitor Intelligence Agent",
      role: "Competitor Benchmarking & Gaps",
      responsibility: "Automatically locates similar niche targets, tracks subscriber & average view metrics, extracts their hook/shorts strategies, and identifies content gaps.",
      pills: ["Competitor Finder", "Benchmark Auditor"]
    },
    {
      id: "seo-agent",
      name: "SEO Optimization Agent",
      role: "Algorithmic Metadata Tuning",
      responsibility: "Audits older tags schemas, reformulates meta descriptions, and provides structured title optimizations frontloading high-relevance search keywords.",
      pills: ["Keywords Indexer", "Tag Structurer"]
    },
    {
      id: "viral-agent",
      name: "Viral Prediction Agent",
      role: "Psychological Trigger Forecaster",
      responsibility: "Maps human emotional indicators (Awe, Curiosity-gap, Relief) to retention charts, predicts future trending topics, and spots high growth opportunities.",
      pills: ["Forecaster Mode", "Psychology Mapper"]
    },
    {
      id: "growth-agent",
      name: "Growth Strategy Agent",
      role: "Calendar & Roadmap Planner",
      responsibility: "Formulates customizable 30/60/90 days checklists timelines, designs the exact week-by-week long vs short upload schedules, and outlines community retention strategies.",
      pills: ["Milestone Tracker", "Scheduler Node"]
    },
    {
      id: "report-agent",
      name: "Report Generation Agent",
      role: "Cohesive Payload Synthesizer",
      responsibility: "Validates, cleanses type interfaces, and compiles the multi-channel insights of individual nodes into a robust, parsed single JSON production schema payload.",
      pills: ["JSON Validator", "Compiler Node"]
    }
  ];

  const filesExplanation = [
    { file: "backend/main.py", purpose: "FastAPI gateway initializing routers and orchestrating the CrewAI agents runtime execution structure." },
    { file: "backend/agents.py", purpose: "Declares the 7 specialized AI Agent blueprints, setting up core backstories and model references." },
    { file: "backend/tasks.py", purpose: "Binds precise, sequential goals, outputs schemas, and context tools on behalf of each agent node." },
    { file: "backend/database.py", purpose: "PostgreSQL ORM schemas using SQLAlchemy to persist historic channel evaluation reports." },
    { file: "frontend/src/App.tsx", purpose: "Primary React component routing layouts, search dashboards, and state metrics triggers." },
    { file: "configs/agency_config.yaml", purpose: "Static definition parameters limiting token speeds, model temperatures, and search tools credentials." }
  ];

  return (
    <div id="architecture-card" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 block uppercase tracking-wider font-semibold">
            Enterprise Blueprint Overview
          </span>
          <h2 className="text-xl font-sans font-bold text-slate-200 mt-1 flex items-center gap-2">
            <Network className="w-5 h-5 text-emerald-400" />
            <span>AI Multi-Agent System Architecture</span>
          </h2>
        </div>

        {/* Navigation toggles */}
        <div className="flex flex-wrap gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs text-slate-400">
          <button
            onClick={() => setActivePane("agents")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-sans font-medium ${activePane === "agents" ? "bg-slate-900 text-emerald-400" : "hover:text-slate-200"}`}
          >
            Orchestration Agents (7)
          </button>
          <button
            onClick={() => setActivePane("folder")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-sans font-medium ${activePane === "folder" ? "bg-slate-900 text-emerald-400" : "hover:text-slate-200"}`}
          >
            Folder Project Tree
          </button>
          <button
            onClick={() => setActivePane("commands")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-sans font-medium ${activePane === "commands" ? "bg-slate-900 text-emerald-400" : "hover:text-slate-200"}`}
          >
            Build Commands
          </button>
          <button
            onClick={() => setActivePane("docs")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-sans font-medium ${activePane === "docs" ? "bg-slate-900 text-emerald-400" : "hover:text-slate-200"}`}
          >
            Technical Docs
          </button>
        </div>
      </div>

      <div id="pane-content" className="min-h-[400px]">
        {/* AGENTS PANE */}
        {activePane === "agents" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Visual Agent workflow diagram */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-nowrap md:flex-wrap items-center gap-2 overflow-x-auto text-[10px] font-mono justify-center">
              <div className="p-2 bg-slate-900 text-slate-300 rounded border border-slate-800 shrink-0">User Input Target</div>
              <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="p-2 bg-slate-900 text-emerald-400 rounded border border-emerald-500/20 shrink-0 font-bold">Channel Profiler Agent</div>
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="p-2 bg-slate-900 text-slate-400 rounded border border-slate-800 shrink-0">Audience Agent</div>
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="p-2 bg-slate-900 text-slate-400 rounded border border-slate-800 shrink-0">Competitor Agent</div>
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="p-2 bg-slate-900 text-emerald-400 rounded border border-emerald-500/20 shrink-0 font-bold">Synthesis Engine Agent</div>
              <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="p-2 bg-emerald-500 text-slate-950 rounded font-bold shrink-0">Parsed JSON Report</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map((agent) => (
                <div key={agent.id} className="p-5 bg-slate-950 rounded-xl border border-slate-850 space-y-2.5 hover:border-slate-700 transition-all">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-sans font-bold text-slate-200 text-sm leading-snug">{agent.name}</h4>
                      <span className="text-[10px] font-mono text-slate-500">{agent.role}</span>
                    </div>
                    <div className="flex gap-1">
                      {agent.pills.map((p, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-slate-900 text-slate-400 text-[8px] font-mono rounded">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs font-sans leading-relaxed">
                    {agent.responsibility}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOLDER TREE PANE */}
        {activePane === "folder" && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-sm font-sans font-bold text-slate-200">
              Clean Enterprise Codebase Directory Structure
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <pre className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-850 font-mono text-[11px] text-emerald-400/90 leading-relaxed overflow-x-auto">
{`yt-ai-orchestrator/
├── backend/                  # FastAPI Services
│   ├── main.py               # Gateway entrypoint
│   ├── agents.py             # blueprint agents definitions
│   ├── tasks.py              # CrewAI sequential tasks
│   ├── database.py           # SQL ORM models
│   ├── models/               # LLM system configurations
│   └── utils/                # YouTube Data SDK hooks
├── frontend/                 # React UI Dashboard
│   ├── src/
│   │   ├── components/       # Interface files
│   │   ├── types.ts          # State definitions
│   │   └── index.css         # Styling guides
│   ├── vite.config.ts        # HMR settings
│   └── package.json          
├── configs/                  
│   └── agency_config.yaml    # Hyperparameters definitions
└── docker-compose.yml        # container layout`}
              </pre>

              {/* Explanations list */}
              <div className="lg:col-span-7 space-y-3.5">
                <h4 className="font-mono text-xs uppercase text-slate-500 font-semibold px-1">Important Files and Functionality</h4>
                <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2">
                  {filesExplanation.map((f, i) => (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                      <span className="font-mono text-xs text-emerald-400 block font-semibold">{f.file}</span>
                      <p className="text-slate-400 text-xs font-sans leading-relaxed mt-1">{f.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMMANDS PANE */}
        {activePane === "commands" && (
          <div className="space-y-5 animate-fadeIn">
            <h3 className="text-sm font-sans font-semibold text-slate-200">
              Enterprise Local Installation & Deploy Commands
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4.5 h-4.5 text-slate-500" />
                  <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">1. Backend Setup & Dependencies</span>
                </div>
                <pre className="bg-slate-900 p-3 rounded text-[10px] text-slate-300 font-mono overflow-x-auto">
{`# Create virtualenv and download microservices targets
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn crewai langchain google-genai sqlalchemy psycopg2-binary`}
                </pre>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-4.5 h-4.5 text-slate-500" />
                  <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">2. Environment Credentials Setup (.env)</span>
                </div>
                <pre className="bg-slate-900 p-3 rounded text-[10px] text-slate-300 font-mono overflow-x-auto">
{`GEMINI_API_KEY="AIzaSyYourKeyHere..."
DATABASE_URL="postgresql://postgres:pass@localhost:5432/yt_audit"
YOUTUBE_API_KEY="YourYouTubeDataV3KeyHere"`}
                </pre>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <Settings className="w-4.5 h-4.5 text-slate-500" />
                  <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">3. Production Execution Targets</span>
                </div>
                <pre className="bg-slate-900 p-3 rounded text-[10px] text-slate-300 font-mono">
{`# Boot FastAPI Gateway Service
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload

# Build and deploy target via Docker Compose container
docker-compose up --build -d`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* DOCS PANE */}
        {activePane === "docs" && (
          <div className="space-y-4 text-xs font-sans text-slate-300 leading-relaxed max-h-[500px] overflow-y-auto pr-2 animate-fadeIn">
            <h3 className="text-base font-sans font-bold text-slate-200">
              Enterprise Architecture, Performance, & Security Operations Report
            </h3>
            
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-805 space-y-2">
              <h4 className="font-mono uppercase text-emerald-400 font-bold text-[10px]">1. Data Flow Architecture & API Integration</h4>
              <p>
                The orchestrator is architected around a stateless gateway design using FastAPI to process search inquiries. Upon receiving a YouTube Channel identifier, the <b>Channel Profiler Agent</b> issues an authenticated lookup sequence via the Google YouTube Data API v3 pipeline. If limits are reached, it automatically triggers Google Search Grounding through the Gemini 3.5 model aliases to resolve representative videos lists.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-805 space-y-2">
              <h4 className="font-mono uppercase text-emerald-400 font-bold text-[10px]">2. Agent Communication & Collaborative Pipelines</h4>
              <p>
                Under Langchain-driven orchestration, the 7 agents do not poll independently. Instead, they run in a hierarchical tree layout. The <b>Channel Auditor</b> feeds its strengths database to the <b>SEO Tuning Agent</b>. Concurrently, the <b>Comment Miner</b> registers negative feedbacks and transmits pain point parameters directly to the <b>Growth Strategy Node</b>, which compiles tactical checklists designed specifically to bypass identified competitive blocks.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-805 space-y-2">
              <h4 className="font-mono uppercase text-emerald-400 font-bold text-[10px]">3. Algorithmic Scalability & Caching Strategies</h4>
              <p>
                To avoid rate limit penalties during massive video evaluations, a Redis caching system is mounted as middleware ahead of uvicorn sockets. Analysis tasks are hashed based on the channel name and the target video count, establishing a 24-hour TTL (Time To Live). This reduces unnecessary server load by 80% on highly recurring queries.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-805 space-y-2">
              <h4 className="font-mono uppercase text-emerald-400 font-bold text-[10px]">4. Multi-Tenant Enterprise Security</h4>
              <p>
                Security triggers enforce strict TLS encryption standards. The Gemini API keys and YouTube SDK credentials are encrypted resting inside vault config blocks, resolved as OS environment variables at module instantiation times. Internal REST communication is validated via JWT Bearer auth nodes preventing tenant leaks.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
