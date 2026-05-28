export interface VideoPerformance {
  id: string;
  title: string;
  url: string;
  publishYear: number;
  views: number;
  likes: number;
  comments: number;
  engagementRate: number; // percentage
  audienceInteraction: string; // "High", "Medium", "Low"
  videoReach: string; // e.g. "Broad", "Niche"
  viralPotential: number; // 0 to 100
  retentionEstimation: number; // percentage
  ctrEstimation: number; // percentage
  
  // Quality scores (1 to 10)
  thumbnailQuality: number;
  titleQuality: number;
  seoQuality: number;
  descriptionQuality: number;
  hookQuality: number;
  introQuality: number;
  storytellingQuality: number;
  editingQuality: number;
  audioQuality: number;
  visualQuality: number;
  pacingQuality: number;
  emotionalEngagement: number;

  // Analysis Questions
  whyPerformedHigh: string;
  whyPerformedLow: string;
  mistakes: string[];
  strongPoints: string[];
  whatShouldImprove: string;
  partsAudienceSkip: string;
  whyAudienceLoseInterest: string;
  howToImproveRetention: string;
  howToImproveWatchTime: string;
  howToImproveEngagement: string;
  howToImproveReach: string;

  // Upgrade suggestions for weak elements
  weaknessIdentified?: boolean;
  optimizedTitle?: string;
  thumbnailIdea?: string;
  betterIntroScript?: string;
  betterEndingCta?: string;
  betterContentStructure?: string;
  betterTags?: string[];
  betterKeywords?: string[];
  audienceTargetingStrategy?: string;
}

export interface Competitor {
  id: string;
  name: string;
  channelUrl: string;
  subscriberCount: string;
  avgViews: number;
  uploadFrequency: string;
  thumbnailStyle: string;
  titleStyle: string;
  editingStyle: string;
  hookStrategy: string;
  shortsStrategy: string;
  viralStrategy: string;
  seoOptimization: string;
  audienceEngagement: string;
  brandingStrategy: string;
  strengths: string[];
  weaknesses: string[];
}

export interface AudienceReport {
  interests: string[];
  painPoints: string[];
  frequentlyRequestedContent: string[];
  positiveReactions: string[];
  negativeReactions: string[];
  emotionalResponse: string;
  loyaltyLevel: string; // High, Medium, Low
  whySubscribe: string;
  whyStopWatching: string;
  
  // Sentiment Analysis percentages
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  
  mostLikedContent: string;
  mostDislikedContent: string;
  strongestEngagementContent: string;
  highestWatchTimeContent: string;
}

export interface CompetitorComparison {
  whyCompetitorsMoreViews: string;
  whyCompetitorsGrowingFaster: string;
  competitorStrategiesUsed: string;
  betterPerformingThumbnails: string;
  betterPerformingTitles: string;
  betterPerformingEditing: string;
  competitorAudiencePsychology: string;
  contentGaps: string[];
  untappedOpportunities: string[];
  missingStrategiesInTargetChannel: string[];
}

export interface GrowthRoadmap {
  days30Plan: string[];
  days60Plan: string[];
  days90Plan: string[];
  weeklyUploadPlan: {
    phase: string;
    videos: { type: 'Long-form' | 'Shorts'; title: string; topic: string; emotionalTrigger: string }[];
  }[];
  seoRoadmap: string[];
  audienceEngagementRoadmap: string[];
  competitorBeatingRoadmap: string[];
  subscriberGrowthRoadmap: string[];
}

export interface ChannelOverview {
  name: string;
  handle: string;
  url: string;
  subscriberCount: number | string;
  totalViews: number | string;
  videoCount: number;
  niche: string;
  contentType: string;
  targetAudience: string;
  audienceAgeGroup: string;
  contentStyle: string;
  editingStyle: string;
  languageTone: string;
  uploadConsistency: string;
  brandingQuality: string; // High, Medium, Low
  audienceAttractionLevel: string; // High, Medium, Low
  strengths: string[];
  weaknesses: string[];
  logoUrl?: string;
}

export interface Report {
  targetChannel: ChannelOverview;
  videoAnalysis: VideoPerformance[];
  audienceAnalysis: AudienceReport;
  competitorAnalysis: Competitor[];
  comparisonTable: CompetitorComparison;
  growthStrategy: {
    contentToCreate: string;
    viralTopics: string[];
    contentStyleToAttract: string;
    thumbnailCtrBoosterStyle: string;
    hookRetentionBoosters: string[];
    uploadStrategy: string;
    shortsStrategy: string;
    storytellingStrategy: string;
    hacks: string[];
    howToGainSubsFaster: string;
    increaseWatchTime: string;
    increaseEngagement: string;
    improveLoyalty: string;
    improveRetention: string;
    improveRecommendation: string;
    increaseCtr: string;
    improveBranding: string;
    buildCommunity: string;
    bestUploadTiming: string;
    bestUploadFrequency: string;
    nicheExpansionStyle: string;
  };
  seoReport: {
    summary: string;
    betterKeywords: string[];
    betterTags: string[];
    titleOptimizationGuide: string;
    descriptionOptimizationGuide: string;
    rankingStrategy: string;
  };
  viralPotentialPrediction: {
    viralPotentialScore: number; // 0 to 100
    whichVideosHavePotential: string;
    whySomeVideosPerformHigh: string;
    emotionalTriggersThatIncreaseViews: string[];
    trendingTopics: string[];
    contentStylesGettingMoreReach: string;
    futureViralTopics: string[];
    highGrowthOpportunities: string[];
    audienceDemandTrends: string[];
  };
  growthRoadmap: GrowthRoadmap;
}

export interface AnalysisInput {
  channelInput: string;
  selectedYears: string[];
  videoCount: number; // e.g. 5, 10, 20 or custom
  analysisDepth: 'Basic Analysis' | 'Advanced Analysis' | 'Deep AI Analysis' | 'Competitor Intelligence Analysis' | 'Viral Growth Analysis' | 'Full Professional Report';
}
