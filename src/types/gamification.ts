export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXp: number;
  streak: number;
  maxStreak: number;
  badges: Badge[];
  achievements: Achievement[];
  coins: number;
  gems: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  xpReward: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  xpReward: number;
  coinReward: number;
  category: 'social' | 'content' | 'learning' | 'streak' | 'special';
}

export interface Reaction {
  id: string;
  name: string;
  emoji: string;
  animation: string;
  rarity: 'common' | 'rare' | 'epic';
  cost: number; // in coins
  unlocked: boolean;
}

export interface Story {
  id: string;
  userId: string;
  user: any; // User type
  type: 'image' | 'video' | 'text';
  content: string;
  media?: {
    url: string;
    thumbnail?: string;
    duration?: number; // for videos
  };
  filters?: string[];
  stickers?: Sticker[];
  views: string[]; // user IDs who viewed
  createdAt: Date;
  expiresAt: Date;
}

export interface Sticker {
  id: string;
  type: 'emoji' | 'gif' | 'text' | 'poll' | 'quiz';
  content: string;
  position: { x: number; y: number };
  size: number;
  rotation: number;
}

export interface VideoShort {
  id: string;
  userId: string;
  user: any;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  duration: number; // in seconds
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  views: number;
  createdAt: Date;
  effects?: VideoEffect[];
  music?: {
    title: string;
    artist: string;
    url: string;
  };
}

export interface VideoEffect {
  id: string;
  name: string;
  type: 'filter' | 'transition' | 'overlay';
  intensity: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  hashtag: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  coinReward: number;
  participants: number;
  trending: boolean;
  startDate: Date;
  endDate: Date;
  requirements: string[];
}

export interface Streak {
  type: 'daily_login' | 'post_creation' | 'engagement' | 'learning';
  count: number;
  maxCount: number;
  lastActionDate: Date;
  rewards: StreakReward[];
}

export interface StreakReward {
  day: number;
  xp: number;
  coins: number;
  gems?: number;
  badge?: string;
  reaction?: string;
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'boost_xp' | 'boost_coins' | 'unlock_reaction' | 'skip_time' | 'double_streak';
  duration: number; // in minutes
  cost: number; // in gems
  active: boolean;
  expiresAt?: Date;
}

// XP earning actions
export const XP_REWARDS = {
  POST_CREATED: 10,
  COMMENT_MADE: 5,
  POST_LIKED: 2,
  POST_SHARED: 8,
  STORY_POSTED: 15,
  VIDEO_SHORT_POSTED: 20,
  NEWS_SHARED: 12,
  PROFILE_COMPLETED: 50,
  DAILY_LOGIN: 5,
  STREAK_3_DAYS: 25,
  STREAK_7_DAYS: 50,
  STREAK_30_DAYS: 200,
  ALGORITHM_TUNED: 15,
  JOT_EXPLORED: 8,
  CHALLENGE_COMPLETED: 100,
  FRIEND_INVITED: 30,
} as const;

// Level thresholds
export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7250, 9250, 
  11500, 14000, 16750, 19750, 23000, 26500, 30250, 34250, 38500, 43000
];

// Badge definitions
export const BADGE_DEFINITIONS: Omit<Badge, 'unlockedAt'>[] = [
  {
    id: 'first_post',
    name: 'First Steps',
    description: 'Created your first post',
    icon: '🎯',
    rarity: 'common',
    xpReward: 25
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Made 100 comments',
    icon: '🦋',
    rarity: 'rare',
    xpReward: 100
  },
  {
    id: 'news_ninja',
    name: 'News Ninja',
    description: 'Shared 50 news articles',
    icon: '📰',
    rarity: 'rare',
    xpReward: 150
  },
  {
    id: 'algorithm_master',
    name: 'Algorithm Master',
    description: 'Customized algorithm 25 times',
    icon: '🤖',
    rarity: 'epic',
    xpReward: 200
  },
  {
    id: 'streak_legend',
    name: 'Streak Legend',
    description: '30-day login streak',
    icon: '🔥',
    rarity: 'legendary',
    xpReward: 500
  },
  {
    id: 'content_creator',
    name: 'Content Creator',
    description: 'Posted 100 pieces of content',
    icon: '✨',
    rarity: 'epic',
    xpReward: 300
  },
  {
    id: 'jot_whisperer',
    name: 'Jot Whisperer',
    description: 'Explored all 10 Jot personalities',
    icon: '🧠',
    rarity: 'rare',
    xpReward: 175
  }
];

// Achievement definitions
export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'progress' | 'completed' | 'unlockedAt'>[] = [
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Log in before 8 AM for 7 days',
    icon: '🌅',
    maxProgress: 7,
    xpReward: 100,
    coinReward: 50,
    category: 'streak'
  },
  {
    id: 'engagement_king',
    name: 'Engagement King',
    description: 'Get 1000 total likes on your posts',
    icon: '👑',
    maxProgress: 1000,
    xpReward: 250,
    coinReward: 100,
    category: 'social'
  },
  {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Read 50 news articles',
    icon: '📚',
    maxProgress: 50,
    xpReward: 150,
    coinReward: 75,
    category: 'learning'
  },
  {
    id: 'viral_creator',
    name: 'Viral Creator',
    description: 'Create a post with 500+ likes',
    icon: '🚀',
    maxProgress: 1,
    xpReward: 200,
    coinReward: 100,
    category: 'content'
  }
];

// Default reactions
export const DEFAULT_REACTIONS: Reaction[] = [
  { id: 'like', name: 'Like', emoji: '👍', animation: 'bounce', rarity: 'common', cost: 0, unlocked: true },
  { id: 'love', name: 'Love', emoji: '❤️', animation: 'pulse', rarity: 'common', cost: 0, unlocked: true },
  { id: 'laugh', name: 'Laugh', emoji: '😂', animation: 'shake', rarity: 'common', cost: 0, unlocked: true },
  { id: 'wow', name: 'Wow', emoji: '😮', animation: 'zoom', rarity: 'common', cost: 0, unlocked: true },
  { id: 'fire', name: 'Fire', emoji: '🔥', animation: 'flame', rarity: 'rare', cost: 10, unlocked: false },
  { id: 'mind_blown', name: 'Mind Blown', emoji: '🤯', animation: 'explode', rarity: 'rare', cost: 15, unlocked: false },
  { id: 'gem', name: 'Gem', emoji: '💎', animation: 'sparkle', rarity: 'epic', cost: 25, unlocked: false },
];
