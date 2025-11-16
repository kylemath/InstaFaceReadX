// Jot System - Autonomous User Entities for Social Media Simulation

export interface JotPersonality {
  // Core personality traits (Big Five + additional)
  openness: number;        // 0-1: Open to new experiences vs traditional
  conscientiousness: number; // 0-1: Organized vs spontaneous
  extraversion: number;    // 0-1: Outgoing vs introverted
  agreeableness: number;   // 0-1: Cooperative vs competitive
  neuroticism: number;     // 0-1: Anxious vs calm
  
  // Social media specific traits
  shareFrequency: number;  // 0-1: How often they post
  engagementLevel: number; // 0-1: How much they interact with others
  controversyTolerance: number; // 0-1: Willingness to engage in debates
  trendFollowing: number;  // 0-1: Early adopter vs late adopter
  authenticity: number;    // 0-1: Genuine vs performative posting
}

export interface JotDemographics {
  ageRange: '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+';
  location: {
    country: string;
    city: string;
    timezone: string;
  };
  profession: string;
  educationLevel: 'high_school' | 'some_college' | 'bachelors' | 'masters' | 'phd';
  incomeLevel: 'low' | 'middle' | 'upper_middle' | 'high';
  relationshipStatus: 'single' | 'dating' | 'married' | 'divorced' | 'widowed';
  hasChildren: boolean;
  politicalLean: number; // -1 (left) to 1 (right), 0 = center
  religiosity: number;   // 0-1: Secular to very religious
}

export interface JotBehaviorPatterns {
  postingTimes: number[];     // Hours of day when most active (0-23)
  contentPreferences: {
    text: number;             // 0-1: Preference for text posts
    images: number;           // 0-1: Preference for image posts
    videos: number;           // 0-1: Preference for video posts
    threads: number;          // 0-1: Preference for thread posts
    links: number;            // 0-1: Preference for sharing links
  };
  topicAffinities: Record<string, number>; // Topic -> interest level (0-1)
  interactionStyle: {
    likesGiven: number;       // 0-1: How generous with likes
    commentsGiven: number;    // 0-1: How often they comment
    sharesGiven: number;      // 0-1: How often they share
    repliesGiven: number;     // 0-1: How often they reply to comments
  };
}

export interface JotContentStyle {
  writingStyle: {
    formality: number;        // 0-1: Casual to formal
    emotionality: number;     // 0-1: Neutral to emotional
    humor: number;            // 0-1: Serious to humorous
    verbosity: number;        // 0-1: Concise to verbose
    emojiUsage: number;       // 0-1: None to heavy emoji use
    hashtagUsage: number;     // 0-1: No hashtags to hashtag heavy
  };
  visualStyle: {
    filterUsage: number;      // 0-1: Natural to heavily filtered
    compositionSkill: number; // 0-1: Poor to excellent composition
    colorPreference: string;  // Dominant color preference
    aestheticConsistency: number; // 0-1: Random to curated aesthetic
  };
}

export interface Jot extends User {
  // Core jot properties
  isJot: true;
  personality: JotPersonality;
  demographics: JotDemographics;
  behaviorPatterns: JotBehaviorPatterns;
  contentStyle: JotContentStyle;
  
  // Simulation state
  lastActiveTime: Date;
  energyLevel: number;      // 0-1: Current motivation to post
  moodState: number;        // -1 (negative) to 1 (positive)
  currentContext: string;   // What they're currently focused on
  
  // Learning and adaptation
  experienceMemory: JotMemory[];
  adaptationRate: number;   // 0-1: How quickly they adapt to feedback
  
  // Content generation
  contentTemplates: ContentTemplate[];
  recentTopics: string[];   // Topics they've posted about recently
}

export interface JotMemory {
  timestamp: Date;
  event: 'post_created' | 'engagement_received' | 'trend_observed' | 'interaction';
  context: any;
  emotionalImpact: number;  // -1 to 1
  learningValue: number;    // 0-1: How much this influenced behavior
}

export interface ContentTemplate {
  type: 'text' | 'image' | 'video' | 'thread' | 'link_share';
  template: string;         // Template with placeholders
  topics: string[];         // Relevant topics
  mood: number;            // -1 to 1: Mood range this template fits
  formality: number;       // 0-1: Formality level
  triggers: string[];      // What causes this template to be used
}

export interface NewsLink {
  id: string;
  url: string;
  title: string;
  description: string;
  source: string;
  publishedAt: Date;
  category: string;
  imageUrl?: string;
  readingTime: number;     // Estimated minutes
  credibilityScore: number; // 0-1: Source credibility
  politicalLean: number;   // -1 to 1: Political bias
  emotionalTone: number;   // -1 to 1: Negative to positive
}

export interface JotPost extends Post {
  generatedBy: 'jot';
  generationContext: {
    personality: JotPersonality;
    mood: number;
    energy: number;
    triggers: string[];
    template?: ContentTemplate;
  };
  newsLink?: NewsLink;     // If sharing a news article
}

// Jot behavior simulation types
export interface JotAction {
  type: 'create_post' | 'share_link' | 'engage_with_post' | 'update_mood' | 'learn_from_feedback';
  jotId: string;
  timestamp: Date;
  context: any;
  success: boolean;
  impact: number;          // How much this affected the jot
}

export interface JotSimulationState {
  activeJots: Jot[];
  globalTrends: string[];
  timeOfDay: number;       // 0-23
  dayOfWeek: number;       // 0-6
  seasonality: number;     // 0-1: Seasonal influence
  newsEvents: NewsLink[];
  socialGraph: Record<string, string[]>; // jotId -> connected jot IDs
}
