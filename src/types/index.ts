export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  verified: boolean;
  profiles: UserProfile[];
  algorithmSettings: AlgorithmSettings;
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  interests: string[];
  isActive: boolean;
  algorithmWeights: AlgorithmWeights;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  type: 'text' | 'image' | 'video' | 'thread';
  content: string;
  media?: MediaItem[];
  threadPosts?: Post[];
  likes: number;
  comments: number;
  shares: number;
  createdAt: Date;
  algorithmScore?: AlgorithmScore;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  alt?: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  likes: number;
  replies: Comment[];
  createdAt: Date;
}

export interface AlgorithmSettings {
  transparency: 'full' | 'partial' | 'minimal';
  explainability: boolean;
  confidenceThreshold: number;
  personalizedFeeds: boolean;
}

export interface AlgorithmWeights {
  recency: number;
  engagement: number;
  relevance: number;
  diversity: number;
  socialSignals: number;
}

export interface AlgorithmScore {
  totalScore: number;
  confidence: number;
  explanation: AlgorithmExplanation;
  factors: AlgorithmFactor[];
}

export interface AlgorithmExplanation {
  primary: string;
  secondary: string[];
  reasoning: string;
}

export interface AlgorithmFactor {
  name: string;
  weight: number;
  contribution: number;
  description: string;
}

export interface FeedSettings {
  algorithm: 'chronological' | 'engagement' | 'personalized' | 'custom';
  showExplanations: boolean;
  showConfidence: boolean;
  contentTypes: ('text' | 'image' | 'video' | 'thread')[];
  timeRange: 'hour' | 'day' | 'week' | 'month' | 'all';
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'algorithm_update';
  userId: string;
  user?: User;
  postId?: string;
  post?: Post;
  message: string;
  read: boolean;
  createdAt: Date;
}

// Re-export Jot types for convenience
export * from './jot';
