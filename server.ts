import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Helper to safely get Gemini client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Full analysis API route
app.post("/api/analyze", async (req, res) => {
  const { channelInput, selectedYears, videoCount, analysisDepth } = req.body;

  if (!channelInput) {
    return res.status(400).json({ error: "Channel Name or URL is required." });
  }

  const ai = getGeminiClient();

  if (!ai) {
    // If no key is set, fallback to a highly intelligent, interactive mock response
    // based beautifully on the given Channel Name to ensure the application remains perfectly functional.
    console.warn("GEMINI_API_KEY is missing. Generating detailed simulator data.");
    const simulatedReport = generateSimulatedReport(channelInput, selectedYears || ["All Years"], videoCount || 10, analysisDepth || "Full Professional Report");
    return res.json({ report: simulatedReport, isSimulated: true });
  }

  try {
    const prompt = `
      You are an Advanced AI YouTube Channel Analysis and Growth Expert.
      Analyze the YouTube channel: "${channelInput}"
      Options specified by the user:
      - Video Analysis Years: ${JSON.stringify(selectedYears)}
      - Number of videos to analyze: ${videoCount}
      - Analysis Depth: ${analysisDepth}

      Please use Google Search grounding to retrieve real information about the channel: "${channelInput}".
      Identify its subscriber count, niche, target audience, typical videos, and top competitors.
      
      Return a complete, detailed, professional analysis in JSON format conforming exactly to the structure template below. 
      You MUST respond ONLY with a single JSON object. Do not include markdown wraps around the JSON block.
      
      JSON Structure Template:
      {
        "targetChannel": {
          "name": "Channel Name",
          "handle": "@handle",
          "url": "https://youtube.com/...",
          "subscriberCount": "e.g. 245K",
          "totalViews": "e.g. 18.2M",
          "videoCount": 240,
          "niche": "e.g. Mindful Living & Coding",
          "contentType": "e.g. Tutorials, Vlogs, Commentary",
          "targetAudience": "e.g. Self-taught programmers, professionals in tech",
          "audienceAgeGroup": "e.g. 18-34 (75%), 35-44 (20%)",
          "contentStyle": "Sleek, minimalist bento-grid aesthetic, low-fi backdrops",
          "editingStyle": "Cinematic pacing, text on-screen callouts, crisp audio cuts",
          "languageTone": "Conversational, articulate, encouraging, tech-driven",
          "uploadConsistency": "Weekly, stable on Sundays at 4 PM GMT",
          "brandingQuality": "High",
          "audienceAttractionLevel": "High",
          "strengths": ["Strong verbal clarity", "Beautiful thumbnail typography", "Highly structured code explanations"],
          "weaknesses": ["Long intro explanations", "Low SEO keywords in descriptions", "Inconsistent CTR on non-technical vlogs"]
        },
        "videoAnalysis": [
          {
            "id": "vid_1",
            "title": "Optimized Video Title or Representative Video",
            "url": "https://youtube.com/watch?v=...",
            "publishYear": 2026,
            "views": 45000,
            "likes": 3200,
            "comments": 412,
            "engagementRate": 8.1,
            "audienceInteraction": "High",
            "videoReach": "Broad",
            "viralPotential": 78,
            "retentionEstimation": 54.5,
            "ctrEstimation": 7.2,
            "thumbnailQuality": 8,
            "titleQuality": 7,
            "seoQuality": 6,
            "descriptionQuality": 5,
            "hookQuality": 6,
            "introQuality": 7,
            "storytellingQuality": 8,
            "editingQuality": 9,
            "audioQuality": 9,
            "visualQuality": 9,
            "pacingQuality": 8,
            "emotionalEngagement": 8,
            "whyPerformedHigh": "Detailed explanation of reasons here.",
            "whyPerformedLow": "Detailed explanation of issues here.",
            "mistakes": ["Weak description keywords", "Intro too slow"],
            "strongPoints": ["Incredible audio", "Great visual transitions"],
            "whatShouldImprove": "What should change.",
            "partsAudienceSkip": "First 15 seconds of generic intro.",
            "whyAudienceLoseInterest": "When it pivots to installation settings too slowly.",
            "howToImproveRetention": "Add quick dynamic editing on hooks.",
            "howToImproveWatchTime": "Add a teaser of the final build in the absolute first 5 seconds.",
            "howToImproveEngagement": "Ask an interactive pinned comment question.",
            "howToImproveReach": "Use searchable evergreen titles.",
            "weaknessIdentified": true,
            "optimizedTitle": "New Title of the Video",
            "thumbnailIdea": "Thumbnail design description.",
            "betterIntroScript": "Script text here.",
            "betterEndingCta": "CTA script here.",
            "betterContentStructure": "Markdown or list of steps.",
            "betterTags": ["react", "vite", "typescript"],
            "betterKeywords": ["react full stack", "build real apps"],
            "audienceTargetingStrategy": "Strategy here."
          }
        ],
        "audienceAnalysis": {
          "interests": ["Aesthetic workspaces", "Self-teaching hacks", "AI agent architectures"],
          "painPoints": ["Imposter syndrome", "Environment setups are hard", "Too many obsolete modules"],
          "frequentlyRequestedContent": ["Build a SaaS tutorial", "My physical desk setup config", "Daily scheduling plan"],
          "positiveReactions": ["Love the calm music font pairings", "Clear and easy voice-over", "No sales pitch!"],
          "negativeReactions": ["Github link was broken", "Audio gets low around minutes 12", "Font on code editor too tiny"],
          "emotionalResponse": "Viewers express calm and deep intellectual focus, often commenting that the channel serves as their ultimate study sanctuary.",
          "loyaltyLevel": "High",
          "whySubscribe": "Consistent high aesthetic quality, actionable code paradigms, and lack of clickbait hysteria.",
          "whyStopWatching": "When content feels too elementary or repetitive of previous videos.",
          "sentiment": {
            "positive": 78,
            "neutral": 17,
            "negative": 5
          },
          "mostLikedContent": "Full length code-along builds with zero cuts",
          "mostDislikedContent": "Generic reaction videos regarding tech news",
          "strongestEngagementContent": "Videos containing free open-source templates",
          "highestWatchTimeContent": "3-hour study with me sessions paired with ambient lofi track"
        },
        "competitorAnalysis": [
          {
            "id": "comp_1",
            "name": "Competitor Channel Name",
            "channelUrl": "https://youtube.com/...",
            "subscriberCount": "1.2M",
            "avgViews": 180000,
            "uploadFrequency": "Twice a Week",
            "thumbnailStyle": "Neon high contrast bold text faces",
            "titleStyle": "Question based or extreme comparisons",
            "editingStyle": "Fast-paced, sound effects every 3s",
            "hookStrategy": "Screaming opening with massive graphical visuals",
            "shortsStrategy": "Repurposes viral funny moments as vertical clips",
            "viralStrategy": "Riding wave of breaking tech news",
            "seoOptimization": "Extremely keyword rich paragraphs with chapters",
            "audienceEngagement": "Super active hearting comments and host prompts",
            "brandingStrategy": "Branded hoodies and distinct high-energy catchphrase",
            "strengths": ["Extreme consistency", "Excellent clickbait styling"],
            "weaknesses": ["Shallow code details", "Exhausting fast-pacing"]
          }
        ],
        "comparisonTable": {
          "whyCompetitorsMoreViews": "Explain reasons in detail.",
          "whyCompetitorsGrowingFaster": "Explain reasons in detail.",
          "competitorStrategiesUsed": "Explain strategies in detail.",
          "betterPerformingThumbnails": "Explain aesthetic difference.",
          "betterPerformingTitles": "Explain linguistic difference.",
          "betterPerformingEditing": "Explain narrative difference.",
          "competitorAudiencePsychology": "Explain emotional anchors.",
          "contentGaps": ["Interactive templates", "Long-form full project builds"],
          "untappedOpportunities": ["Tailwind design challenges", "Gemini API integrations folder showcase"],
          "missingStrategiesInTargetChannel": ["Optimizing short-form hooks", "Consistency on Thursday schedule"]
        },
        "growthStrategy": {
          "contentToCreate": "Detailed custom recommendations matching the niche.",
          "viralTopics": ["Building a fully autonomous coder in 10 mins", "Why I left my Senior SWE job for solo-dev work"],
          "contentStyleToAttract": "Calm, rich visual setups with live code tests.",
          "thumbnailCtrBoosterStyle": "Split screen showing problem vs. elegant visual solution.",
          "hookRetentionBoosters": ["Immediate screen demo", "Bold outcome stats"],
          "uploadStrategy": "Wednesday for educational tutorials, Sunday for lifestyle vlogs.",
          "shortsStrategy": "15-second visual workflow summaries pointing to long form link.",
          "storytellingStrategy": "The Hero's Journey schema: Setup - Struggle - Custom Refactor - Live Success.",
          "hacks": ["Pin useful resources with distinct referral codes", "Repurpose scripts into newsletters"],
          "howToGainSubsFaster": "Implement the 'Free Resource' gate: Provide valuable ZIP code-along file in return for community subscribing trigger.",
          "increaseWatchTime": "Implement dynamic playlist anchors and direct verbal transitions.",
          "increaseEngagement": "Place two visual riddle bugs on the screen for viewers to guess in comments.",
          "improveLoyalty": "Monthly live AMA streams and custom subscriber badges.",
          "improveRetention": "Cut pauses, use zoom transitions every 12 seconds.",
          "improveRecommendation": "Optimize metadata clusters linking to larger channels.",
          "increaseCtr": "Use 3-word titles paired with single-item key focal point thumbnails.",
          "improveBranding": "Establish unified signature color codes and specific coding editor layouts.",
          "buildCommunity": "Launch a dedicated Discord or community forum.",
          "bestUploadTiming": "Sunday 4 PM UTC / Thursday 2 PM UTC",
          "bestUploadFrequency": "1 Long-form + 2 Shorts per week",
          "nicheExpansionStyle": "Gradually transition from pure code tutorials into general productivity workflows."
        },
        "seoReport": {
          "summary": "Deep dive analysis of existing titles, descriptions and tags.",
          "betterKeywords": ["typescript guide", "full stack react server", "gemini building"],
          "betterTags": ["programming", "nextjs", "coding vlogs"],
          "titleOptimizationGuide": "Limit to 55 characters; front-load primary search query.",
          "descriptionOptimizationGuide": "Write three keyword-dense initial lines before directory details.",
          "rankingStrategy": "Target medium-competition high-volume search phrases first using dynamic chapters."
        },
        "viralPotentialPrediction": {
          "viralPotentialScore": 85,
          "whichVideosHavePotential": "High descriptive breakdown.",
          "whySomeVideosPerformHigh": "Detailed psychological triggers explanation.",
          "emotionalTriggersThatIncreaseViews": ["Awe", "Relief", "Affirmation"],
          "trendingTopics": ["Auto-coding templates", "Zero-config databases"],
          "contentStylesGettingMoreReach": "First-person interactive POV tutorials.",
          "futureViralTopics": ["AI code assistants for developers", "Minimalist workstation routines"],
          "highGrowthOpportunities": ["Teaching design systems in motion", "Backend integrations step-by-step"],
          "audienceDemandTrends": ["Short readable scripts", "Highly structured architectural files"]
        },
        "growthRoadmap": {
          "days30Plan": ["Establish core visual template", "Optimise description metadata templates"],
          "days60Plan": ["Double-down on the highest performing topic", "Partner with micro newsletters"],
          "days90Plan": ["Launch custom digital product resource", "Scale upload frequency safely"],
          "weeklyUploadPlan": [
            {
              "phase": "Week 1: Foundations & High Hook Retentions",
              "videos": [
                { "type": "Long-form", "title": "Build a Custom App Store with TypeScript", "topic": "Tech Architecture", "emotionalTrigger": "Curiosity" },
                { "type": "Shorts", "title": "The 1 Secret tool for Visual Styling", "topic": "Design Hack", "emotionalTrigger": "Surprise" }
              ]
            }
          ],
          "seoRoadmap": ["Fix top 10 older descriptions to include proper backlinks", "Implement structured schema markup"],
          "audienceEngagementRoadmap": ["Ask customizable poll questions every Tuesday", "Pin outstanding viewer comments"],
          "competitorBeatingRoadmap": ["Analyze competitors vids that are standard but low-retention and remake them with superb pacing", "Leverage content gaps in interactive folders"],
          "subscriberGrowthRoadmap": ["Create subscription incentives via free source assets", "Embed quick call-out triggers in the main build intro"]
        }
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    // Safe parse the JSON
    try {
      const parsedReport = JSON.parse(text.trim());
      return res.json({ report: parsedReport, isSimulated: false });
    } catch (parseError) {
      console.error("JSON Parsing failed from model, falling back to clean simulator", parseError);
      const simulatedReport = generateSimulatedReport(channelInput, selectedYears || ["All Years"], videoCount || 10, analysisDepth || "Full Professional Report");
      return res.json({ report: simulatedReport, isSimulated: true, textFallback: text });
    }
  } catch (err: any) {
    const errorStr = err?.message || err?.toString() || "";
    const isQuota = errorStr.includes("429") || errorStr.toLowerCase().includes("quota") || err?.status === "RESOURCE_EXHAUSTED";
    
    if (isQuota) {
      console.warn("[Gemini API Quota Notice] Platform API key rate limits reached. Seamlessly activating high-fidelity localized simulation payload.");
    } else {
      console.error("[Gemini API Error] Unexpected gateway error:", err);
    }

    // If anything fails in network of Google, return simulated data seamlessly
    const simulatedReport = generateSimulatedReport(channelInput, selectedYears || ["All Years"], videoCount || 10, analysisDepth || "Full Professional Report");
    return res.json({ report: simulatedReport, isSimulated: true, errorMsg: errorStr });
  }
});

// Highly dynamic simulator content based on channel input name or URL
function generateSimulatedReport(channelInput: string, years: string[], videoCount: number, depth: string) {
  const sanitized = channelInput.replace(/https?:\/\/(www\.)?youtube\.com\//, "").replace("channel/", "").replace("user/", "").replace("@", "");
  const name = sanitized.charAt(0).toUpperCase() + sanitized.slice(1);
  const handle = `@${sanitized.toLowerCase()}`;

  // Analyze simulated niche
  let niche = "Creative Engineering & Tech Development";
  let contentStyle = "Clean minimalist overlay widgets, high-fidelity screen captures, spacious dark-theme coding";
  let strengths = ["Impeccable verbal clarity and friendly workspace atmosphere", "Ultra-readable display typography paired with elegant colors", "Generous negative space layouts"];
  let weaknesses = ["Infrequent community interaction prompts", "Short descriptions lacking search optimization tags", "Prolonged intro build-ups before the actual visual demo"];
  let interests = ["Productive solo workstation routines", "TypeScript app design patterns", "Fast setup templates"];
  let competitors = ["TechCreations", "AestheticCoder", "DevFocus"];

  if (name.toLowerCase().includes("cooking") || name.toLowerCase().includes("food") || name.toLowerCase().includes("kitchen")) {
    niche = "Gourmet Culinary Arts & Aesthetic Slow-Cooking";
    contentStyle = "Warm daylight hues, close-up details of sizzles, ASMR sound styling with subtle ambient acoustic string score";
    strengths = ["Crisp macro shots showcasing textures", "Warm inviting narrator tone", "Extremely readable recipe card templates"];
    weaknesses = ["Lack of structural visual lists for raw ingredient count", "Inconsistent lighting on evening indoor shots", "Overly long recipe prep periods compared to plating"];
    interests = [" Artisanal sourdough hacks", "Zero-waste meal setups", "Knife skills fundamentals"];
    competitors = ["SavorCulinary", "ASMRKitchen", "SimplicityPantry"];
  } else if (name.toLowerCase().includes("finance") || name.toLowerCase().includes("money") || name.toLowerCase().includes("invest")) {
    niche = "Personal Finance Architecture & Wealth Building Strategy";
    contentStyle = "Clean visual charts, green and slate color schemes, JetBrains Mono font details on stat sheets";
    strengths = ["Logical step-by-step risk breakdowns", "Highly transparent data explanations with zero hype", "Clear disclaimers"];
    weaknesses = ["Complex mathematical vocabulary shown without graphical visualizer support", "High pacing exhaustion", "Very basic description metadata paragraphs"];
    interests = ["Index-fund allocations", "Passive secondary dividends", "Aesthetic tracking spreadsheets"];
    competitors = ["WealthConstruct", "SlateCapital", "FinanceSimple"];
  }

  // Generate video analysis list
  const videoAnalysis = [];
  const yearsToUse = years.includes("All Years") ? [2026, 2025, 2024] : years.map(y => parseInt(y) || 2026);
  const count = videoCount || 10;

  const topics = [
    { title: "Building a Modern full-stack Coder Sandbox from scratch", yearIdx: 0, high: true },
    { title: "My Complete Aesthetic Desk Refresh & Workspace Setup Setup", yearIdx: 1, high: true },
    { title: "How to deploy 12 static apps in 6 minutes securely", yearIdx: 0, high: false },
    { title: "Behind the Scenes of a Solo Developer: Struggles & Wins", yearIdx: 1, high: true },
    { title: "Why your state managers are breaking on production builds", yearIdx: 2, high: false },
    { title: "Simplifying Gemini API integrations: Code-along tutorial", yearIdx: 0, high: true },
    { title: "Aesthetic Coding Routines: 4 Hours of calm productivity", yearIdx: 1, high: true },
    { title: "React 19 features I am actually using in real SaaS products", yearIdx: 0, high: false },
    { title: "Designing the Perfect App Icon in 90 seconds flat", yearIdx: 2, high: true },
    { title: "Unpopular opinions about state management libraries", yearIdx: 1, high: false },
  ];

  for (let i = 0; i < count; i++) {
    const topic = topics[i % topics.length];
    const year = yearsToUse[topic.yearIdx % yearsToUse.length] || 2026;
    const views = topic.high ? Math.floor(65000 + Math.random() * 85000) : Math.floor(8000 + Math.random() * 12000);
    const likes = Math.floor(views * 0.07);
    const comments = Math.floor(views * 0.01);
    const engagementRate = +((((likes + comments) / views) * 100).toFixed(1));
    const retention = topic.high ? +(48 + Math.random() * 12).toFixed(1) : +(24 + Math.random() * 8).toFixed(1);
    const ctr = topic.high ? +(6.8 + Math.random() * 4.2).toFixed(1) : +(2.1 + Math.random() * 1.5).toFixed(1);

    videoAnalysis.push({
      id: `vid_${i + 1}`,
      title: topic.title,
      url: `https://youtube.com/watch?v=mock_video_${i + 1}`,
      publishYear: year,
      views,
      likes,
      comments,
      engagementRate,
      audienceInteraction: engagementRate > 7 ? ("High" as const) : ("Medium" as const),
      videoReach: views > 50000 ? ("Broad" as const) : ("Niche" as const),
      viralPotential: topic.high ? Math.floor(75 + Math.random() * 20) : Math.floor(30 + Math.random() * 25),
      retentionEstimation: retention,
      ctrEstimation: ctr,
      
      thumbnailQuality: topic.high ? 9 : 5,
      titleQuality: topic.high ? 8 : 6,
      seoQuality: topic.high ? 8 : 4,
      descriptionQuality: 7,
      hookQuality: topic.high ? 9 : 4,
      introQuality: topic.high ? 8 : 5,
      storytellingQuality: topic.high ? 9 : 5,
      editingQuality: 8,
      audioQuality: 9,
      visualQuality: 9,
      pacingQuality: topic.high ? 8 : 4,
      emotionalEngagement: topic.high ? 8 : 4,

      whyPerformedHigh: topic.high 
        ? "Exemplary typography, high contrast thumbnail focal point, immediate live showcase of build outcome in the first 5 seconds, and direct transition to code along instructions without generic self-promotional delays." 
        : "Niche title query limits organic suggestion reach, thumbnail text is too dense to parse clearly on small mobile displays, and code-installation errors were elaborated for too long, crashing viewer retention levels.",
      whyPerformedLow: topic.high 
        ? "Hardly any flaws. Pacing is sublime and maintains consistent rhythm using key zoom highlights." 
        : "Pacing slowed down significantly in the middle sector when diagnosing terminal package downloads. Hook was non-existent, immediately displaying terminal code errors without motivating the end-state application target.",
      mistakes: topic.high 
        ? ["Slightly generic meta tags description box (missing official links initially)"] 
        : ["Intro took 45 seconds to motivate the task", "Thumbnail text blend too much into dark background", "Tag indexing omitted primary search queries"],
      strongPoints: ["Crystal clear vocal audio over serene sound track", "Stunning layout framing, custom zoom transitions", "Useful timestamps chapters spacing"],
      whatShouldImprove: topic.high 
        ? "Include pin referral links for resources right away and prompt live comments suggestions." 
        : "Restructure video timeline according to problem-solution paradigm: show completed build in first 5s, outline architecture file in next 20s, and expedite system package installs.",
      partsAudienceSkip: topic.high ? "None detected, minimal skips on custom transitions." : "The 40-second installations and configuration checklist segment.",
      whyAudienceLoseInterest: topic.high ? "Rarely, only if viewers are already overly expert in SaaS." : "When file terminal setup remains unresponsive for an extended section of narration.",
      howToImproveRetention: "Implement swift split-frame visualization showing code input and UI output changes side-by-side.",
      howToImproveWatchTime: "Build playlists linking intermediate builds into unified multi-hour playlists designed for long productivity sessions.",
      howToImproveEngagement: "Incentivize feedback by promising to open-source the build configuration files to commenters responding with unique ideas.",
      howToImproveReach: "Focus on search inquiries matching high-demand tags such as React v19, Custom agent architecture, and tailwind optimization.",
      
      weaknessIdentified: !topic.high,
      optimizedTitle: topic.high ? undefined : `Build Real React v19 Apps Step-by-Step [Calm Code-Along]`,
      thumbnailIdea: topic.high ? undefined : "High contrast single side of workspace displaying the gorgeous interface, accompanied by 3 bold words 'Let's Build This'",
      betterIntroScript: topic.high ? undefined : "Hey friends. Today, let's build this responsive full-stack AI YouTube Agent dashboard from scratch. We are using TypeScript, Tailwind CSS, and Gemini 3.5. Let's start by looking at our folder project model...",
      betterEndingCta: topic.high ? undefined : "The build source files are linked in the pinned comment. If you learned something clean today, hit subscribe and let me know what module we should build next Sunday. Peace!",
      betterContentStructure: topic.high ? undefined : "0:00 Target Showcase Demo\n0:15 Shared Types Config\n1:10 Express Server Architecture Setup\n3:20 Interactive React Charts Integration\n5:00 Final Deployment Guide",
      betterTags: ["react tutorial", "fullstack developer", "aesthetic coding", "workspace layout"],
      betterKeywords: ["typescript calm developer", "react 19 walkthrough", "elegant dashboard design"],
      audienceTargetingStrategy: "Focus on ambitious self-taught students and junior full-stack developers looking for aesthetic, high-quality, zero-hysteria coding sanctuary."
    });
  }

  // Generate Competitor Array
  const competitorAnalysis = competitors.map((name, idx) => ({
    id: `comp_${idx + 1}`,
    name,
    channelUrl: `https://youtube.com/c/${name.toLowerCase()}`,
    subscriberCount: idx === 0 ? "840K" : idx === 1 ? "420K" : "150K",
    avgViews: idx === 0 ? 120000 : idx === 1 ? 65000 : 35000,
    uploadFrequency: idx === 0 ? "Daily" : idx === 1 ? "Weekly" : "Bi-Weekly",
    thumbnailStyle: idx === 0 ? "Highly saturated orange border text highlights" : "Minimal matte warm slate backgrounds, single laptop focus",
    titleStyle: idx === 0 ? "Exaggerated questions: 'I Regret This...'" : "Pristine technical labels",
    editingStyle: "Dynamic background patterns, high density vector icons, frequent quick zoom updates",
    hookStrategy: "Action-first, loud opening sequence transitioning to cinematic logo",
    shortsStrategy: "Extracting fast hacks in vertical clips",
    viralStrategy: "Riding tech trending topics instant releases",
    seoOptimization: "Extremely detailed description paragraph boxes with extensive tags",
    audienceEngagement: "Very high, pinned questions and active Discord channels",
    brandingStrategy: "Unified workspace branding, minimalist font tags, signature developer setup",
    strengths: ["Highly recognizable signature thumbnails", "Immense speed of release on tech updates"],
    weaknesses: ["Repetitive content formatting", "Lower deep-dive explanations values"]
  }));

  return {
    targetChannel: {
      name,
      handle,
      url: `https://youtube.com/${handle}`,
      subscriberCount: "34.5K",
      totalViews: "2.8M",
      videoCount: 82,
      niche,
      contentType: "Educational coding walkthroughs, aesthetic workspace layouts, technology guides",
      targetAudience: "Self-motivated tech developers, high-focus productivity seekers, design students",
      audienceAgeGroup: "18-24 (45%), 25-34 (40%), Other (15%)",
      contentStyle,
      editingStyle: "Serene, beautifully timed cuts, highlighting keyboard sounds, visual elegance",
      languageTone: "Calm, articulate, high technical clarity, educational-focused",
      uploadConsistency: "Weekly on Sundays",
      brandingQuality: "High (distinct typography, clean layout styles, signature color schemes)",
      audienceAttractionLevel: "Medium-High",
      strengths,
      weaknesses
    },
    videoAnalysis,
    audienceAnalysis: {
      interests,
      painPoints: ["Imposter syndrome", "Debugging verbose backend logs", "Unreadable standard tutorials formatting"],
      frequentlyRequestedContent: ["Full-scale SaaS walkthroughs from blank folder", "How to manage daily schedules as solo dev", "Interactive Tailwind motion guides"],
      positiveReactions: ["I love the peaceful pacing here, I can actually code along", "The visual font aesthetic is sublime", "Extremely clear explanations"],
      negativeReactions: ["Missing Github repo link on old videos", "Hard to see code on small mobile screen"],
      emotionalResponse: "Viewers describe feeling a sense of quiet focus and inspiration, using the channel as a productivity retreat rather than a hyperactive trigger.",
      loyaltyLevel: "High",
      whySubscribe: "Calm aesthetic environment, meticulous attention to UI details, zero clickbait or shouting tone.",
      whyStopWatching: "When topics become overly repetitive or simple tech reviews instead of builds.",
      sentiment: {
        positive: 84,
        neutral: 12,
        negative: 4
      },
      mostLikedContent: "Full project build-alongs with elegant layouts",
      mostDislikedContent: "Quick tech news reaction summaries",
      strongestEngagementContent: "Interactive dashboard layout guides and custom template packages",
      highestWatchTimeContent: "3-hour Pomodoro study streams with aesthetic custom workspace backdrop"
    },
    competitorAnalysis,
    comparisonTable: {
      whyCompetitorsMoreViews: "Competitors exploit high-hysteria thumbnail psychology (loud text, facial expression highlights) and upload at a significantly higher volume cadence (daily vs weekly) which hooks the standard YouTube algorithm faster.",
      whyCompetitorsGrowingFaster: "Consistent multi-shorts daily strategy which acts as a massive organic funnel, coupled with immediate trending topic videos released within 6 hours of news breaks.",
      competitorStrategiesUsed: "Multi-channel distribution of shorts, digital resource lead-magnet setups, and community engagement loops via Discord incentives.",
      betterPerformingThumbnails: "High contrast images using a split view: left showing a chaotic text problem, right showing a clean, high-color polished SaaS outcome.",
      betterPerformingTitles: "Front-loading high CTR emotional triggers (e.g., 'Do NOT use React state until you check this') vs target channel's literal labels.",
      betterPerformingEditing: "Maintaining watch time retention using micro zoom-outs, light transitions, and subtle code editor highlights every 8 to 12 seconds to keep the eye stimulated.",
      competitorAudiencePsychology: "Leveraging FOMO (Fear Of Missing Out) and curiosity-gap hooks representing tech updates as revolutionary breaks.",
      contentGaps: ["Detailed serene full bundle setup walkthroughs", "Minimalist aesthetic dashboard source files"],
      untappedOpportunities: ["Curating an open-source calm developer template library", "Weekly productivity routine vlogs using elegant screen widgets"],
      missingStrategiesInTargetChannel: ["Consistent Short-form visual guides mapping to full builds", "Aggressive keyword insertion in description boxes"]
    },
    growthStrategy: {
      contentToCreate: "Deliver beautiful project-build vlogs using Gemini API capabilities, and high-fidelity Tailwind frameworks. Keep the serene layout but upgrade thumbnail CTR using problem-outcome visual splits.",
      viralTopics: [
        "How I built an autonomous developer dashboard with clean TypeScript",
        "The perfect minimalist developer routine (no screaming, just code)",
        "Why standard full-stack tutorial architectures are leading to massive technical debt"
      ],
      contentStyleToAttract: "Immersive workspace view, crisp typing ASMR cuts, fluid typography transitions.",
      thumbnailCtrBoosterStyle: "Ultra-sharp SaaS visual in a gorgeous device mockup on a slate backdrop. Large, elegant sans-serif text limited to 3 words: 'Clean React Setup'.",
      hookRetentionBoosters: ["Immediate 3-second live showcase of the completed application running", "Visual layout file architecture map displayed in first 10 seconds"],
      uploadStrategy: "Consistent weekly publishing on Sunday morning, scheduling shorts for Tuesday and Thursday afternoons to build steady mid-week interest.",
      shortsStrategy: "Showcase the final responsive UI in 15 seconds, detailing the top 3 libraries used, with a direct pinned pointer to the full walkthrough tutorial.",
      storytellingStrategy: "Problem-Agitation-Solution narrative. Agitate slow manual code tasks, showcase the automated layout solution, walk through the build gracefully.",
      hacks: ["Implement automatic community lead assets: offer detailed Figma or ZIP setups in comments for active subscribers", "Optimise channel playlists into structured academy curriculums"],
      howToGainSubsFaster: "Integrate subscription markers in the main code walkthrough right before implementing the most highly anticipated module.",
      increaseWatchTime: "Maintain eyes' engagement using periodic micro-zooms on code syntax lines and adding serene motion transitions.",
      increaseEngagement: "Embed a simple screen bug asking viewers 'Spot the hidden TS type bug?' and pin the first correct commenter response.",
      improveLoyalty: "Create community forum posts sharing raw dev design assets.",
      improveRetention: "Eradicate silent pause steps from raw screencasts and expedite setting installers.",
      improveRecommendation: "Optimize descriptions with rich search terminology mapping keyword clusters from top channels.",
      increaseCtr: "Ditch convoluted, chaotic thumbnails for polished aesthetic UI mockups contrasted against dark backgrounds.",
      improveBranding: "Construct distinct layout themes including warm colors and custom developer headers.",
      buildCommunity: "Establish a serene developer newsletter providing code snippets.",
      bestUploadTiming: "Sunday 2 PM GMT",
      bestUploadFrequency: "1 Masterclass tutorial + 2 Visual Shorts per week",
      nicheExpansionStyle: "Transition from basic syntax guides into advanced architectural blueprints and workstation lifestyle layouts."
    },
    seoReport: {
      summary: "Your current SEO strategy misses major search volume by focusing on literal, plain file descriptions. Upgrading titles and description tags will increase impressions dramatically.",
      betterKeywords: ["react fullstack walkthrough", "gemini api developers guide", "typescript clean workspace"],
      betterTags: ["developer", "react 19", "coding design", "minimalist code"],
      titleOptimizationGuide: "Front-load key technologies: 'Build an Aesthetic [Tech] App Step-by-Step'. Keep below 56 chars.",
      descriptionOptimizationGuide: "Write detailed, keyword-rich summaries in the first 3 lines, followed by comprehensive timestamp directories.",
      rankingStrategy: "Dominate search results by targeting high-relevance low-competition terms like 'clean react express skeleton setup'."
    },
    viralPotentialPrediction: {
      viralPotentialScore: 82,
      whichVideosHavePotential: "Videos exploring workspace vlogs and interactive full-projects builds have outstanding potential due to organic curation platforms.",
      whySomeVideosPerformHigh: "Aesthetic visuals tap into the high-focus, 'workspace sanctuary' comfort trend widespread on social developer communities.",
      emotionalTriggersThatIncreaseViews: ["Awe (Aesthetic perfection)", "Inspiration (Calm productivity)", "Satisfaction (Zero-error code-alongs)"],
      trendingTopics: ["Aesthetic developer workflow setups", "Clean TypeScript SaaS mockups", "Motion libraries configuration"],
      contentStylesGettingMoreReach: "Comfort-focused high-clarity voiceovers paired with typing clicks audio segments.",
      futureViralTopics: ["Building a minimalist personal dashboard", "How to design custom interfaces with zero component overhead"],
      highGrowthOpportunities: ["Aesthetic dev routines", "Integrating AI agent tools into personal workspaces"],
      audienceDemandTrends: ["Extreme code visual and color aesthetics", "Readable, modular file layouts"]
    },
    growthRoadmap: {
      days30Plan: ["Optimize older top-performing video description metadata layouts", "Create 3 master aesthetic visual thumbnails frames", "Launch unified description layout templates"],
      days60Plan: ["Release a 15-second high-engagement Short every Tuesday and Thursday", "Pin core subscription calls before main dashboard features"],
      days90Plan: ["Publish a curated digital code package asset for loyal subscribers", "Scale database guides to cover modern caching layers"],
      weeklyUploadPlan: [
        {
          "phase": "Week 1: Foundations & Visual Setup",
          "videos": [
            { "type": "Long-form", "title": "Building a Modern full-stack Coder Sandbox from scratch", "topic": "Tech Setup", "emotionalTrigger": "Inspiration" },
            { "type": "Shorts", "title": "How I style React folders elegantly", "topic": "Folder hacks", "emotionalTrigger": "Relief" }
          ]
        },
        {
          "phase": "Week 2: Advanced Integrations",
          "videos": [
            { "type": "Long-form", "title": "Aesthetic Coding Routines: 4 Hours of calm productivity", "topic": "Developer Routine", "emotionalTrigger": "Calm" },
            { "type": "Shorts", "title": "The biggest TypeScript typo mistake to avoid!", "topic": "Coding Hack", "emotionalTrigger": "Surprise" }
          ]
        }
      ],
      seoRoadmap: ["Update descriptions of older tutorials to index search clusters", "Integrate automated chapters timestamp anchors"],
      audienceEngagementRoadmap: ["Create custom visual polls sharing screen setup choices", "Prompt subscriber comments via visual code challenges"],
      competitorBeatingRoadmap: ["Identify competitors' shallow videos and create thorough, pristine walkthroughs of same concepts", "Offer clean complete template files competitors hide behind paywalls"],
      subscriberGrowthRoadmap: ["Establish a subscription lock-lead for helpful workspace background wallpapers", "Embed polite verbal callouts during intermediate transition states"]
    }
  };
}

// Vite and Static Server Middleware Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer();
