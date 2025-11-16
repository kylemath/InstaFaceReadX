import { User, Post, UserProfile, AlgorithmWeights } from '../types';

// Default algorithm weights for different user types
const defaultWeights: AlgorithmWeights = {
  recency: 0.3,
  engagement: 0.25,
  relevance: 0.25,
  diversity: 0.1,
  socialSignals: 0.1,
};

const techWeights: AlgorithmWeights = {
  recency: 0.4,
  engagement: 0.2,
  relevance: 0.3,
  diversity: 0.05,
  socialSignals: 0.05,
};

const socialWeights: AlgorithmWeights = {
  recency: 0.2,
  engagement: 0.4,
  relevance: 0.2,
  diversity: 0.1,
  socialSignals: 0.1,
};

const newsWeights: AlgorithmWeights = {
  recency: 0.5,
  engagement: 0.15,
  relevance: 0.25,
  diversity: 0.05,
  socialSignals: 0.05,
};

export const fakeUsers: User[] = [
  {
    id: 'user-1',
    username: 'alex_chen_dev',
    displayName: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer passionate about AI and open-source. Building the future, one commit at a time.',
    followers: 2847,
    following: 892,
    verified: true,
    profiles: [
      {
        id: 'prof-1-1',
        name: 'Professional',
        interests: ['javascript', 'react', 'ai', 'open-source', 'web-development'],
        isActive: true,
        algorithmWeights: techWeights,
      },
      {
        id: 'prof-1-2',
        name: 'Personal',
        interests: ['photography', 'hiking', 'coffee', 'books'],
        isActive: false,
        algorithmWeights: defaultWeights,
      }
    ],
    algorithmSettings: {
      transparency: 'full',
      explainability: true,
      confidenceThreshold: 0.7,
      personalizedFeeds: true,
    },
    createdAt: new Date('2023-01-15'),
  },
  {
    id: 'user-2',
    username: 'maria_journalist',
    displayName: 'Maria Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b0e3?w=150&h=150&fit=crop&crop=face',
    bio: 'Investigative journalist covering tech policy and digital rights. Truth matters.',
    followers: 15234,
    following: 1456,
    verified: true,
    profiles: [
      {
        id: 'prof-2-1',
        name: 'Journalist',
        interests: ['journalism', 'politics', 'technology', 'privacy', 'ethics'],
        isActive: true,
        algorithmWeights: newsWeights,
      }
    ],
    algorithmSettings: {
      transparency: 'full',
      explainability: true,
      confidenceThreshold: 0.8,
      personalizedFeeds: true,
    },
    createdAt: new Date('2022-08-22'),
  },
  {
    id: 'user-3',
    username: 'david_artist',
    displayName: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital artist and UI/UX designer. Creating beautiful experiences through design.',
    followers: 8392,
    following: 2341,
    verified: false,
    profiles: [
      {
        id: 'prof-3-1',
        name: 'Artist',
        interests: ['design', 'art', 'creativity', 'ui-ux', 'digital-art'],
        isActive: true,
        algorithmWeights: { ...defaultWeights, engagement: 0.35, relevance: 0.3 },
      }
    ],
    algorithmSettings: {
      transparency: 'partial',
      explainability: true,
      confidenceThreshold: 0.6,
      personalizedFeeds: true,
    },
    createdAt: new Date('2023-03-10'),
  },
  {
    id: 'user-4',
    username: 'sarah_scientist',
    displayName: 'Dr. Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1559386484-97dfc0e15539?w=150&h=150&fit=crop&crop=face',
    bio: 'Climate scientist and researcher. PhD in Environmental Science. Sharing facts about our planet.',
    followers: 12456,
    following: 789,
    verified: true,
    profiles: [
      {
        id: 'prof-4-1',
        name: 'Research',
        interests: ['climate-science', 'research', 'environment', 'data-analysis', 'sustainability'],
        isActive: true,
        algorithmWeights: { ...defaultWeights, relevance: 0.4, recency: 0.2 },
      }
    ],
    algorithmSettings: {
      transparency: 'full',
      explainability: true,
      confidenceThreshold: 0.85,
      personalizedFeeds: true,
    },
    createdAt: new Date('2022-11-05'),
  },
  {
    id: 'user-5',
    username: 'mike_gamer',
    displayName: 'Mike Thompson',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    bio: 'Gaming enthusiast and streamer. Always up for a good co-op session!',
    followers: 5623,
    following: 3421,
    verified: false,
    profiles: [
      {
        id: 'prof-5-1',
        name: 'Gaming',
        interests: ['gaming', 'streaming', 'esports', 'technology', 'reviews'],
        isActive: true,
        algorithmWeights: socialWeights,
      },
      {
        id: 'prof-5-2',
        name: 'Casual',
        interests: ['movies', 'music', 'friends', 'memes'],
        isActive: false,
        algorithmWeights: { ...socialWeights, engagement: 0.5 },
      }
    ],
    algorithmSettings: {
      transparency: 'minimal',
      explainability: false,
      confidenceThreshold: 0.5,
      personalizedFeeds: true,
    },
    createdAt: new Date('2023-06-18'),
  },
  {
    id: 'user-6',
    username: 'elena_foodie',
    displayName: 'Elena Vasquez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Food blogger and chef. Exploring flavors from around the world 🍜✨',
    followers: 18765,
    following: 892,
    verified: true,
    profiles: [
      {
        id: 'prof-6-1',
        name: 'Food Blog',
        interests: ['cooking', 'recipes', 'restaurants', 'food-photography', 'culture'],
        isActive: true,
        algorithmWeights: { ...defaultWeights, engagement: 0.4, diversity: 0.15 },
      }
    ],
    algorithmSettings: {
      transparency: 'partial',
      explainability: true,
      confidenceThreshold: 0.65,
      personalizedFeeds: true,
    },
    createdAt: new Date('2022-04-12'),
  },
  {
    id: 'user-7',
    username: 'james_fitness',
    displayName: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
    bio: 'Personal trainer and nutrition coach. Helping people achieve their fitness goals 💪',
    followers: 9234,
    following: 1567,
    verified: false,
    profiles: [
      {
        id: 'prof-7-1',
        name: 'Fitness',
        interests: ['fitness', 'nutrition', 'health', 'motivation', 'lifestyle'],
        isActive: true,
        algorithmWeights: { ...defaultWeights, engagement: 0.35, socialSignals: 0.15 },
      }
    ],
    algorithmSettings: {
      transparency: 'partial',
      explainability: true,
      confidenceThreshold: 0.6,
      personalizedFeeds: true,
    },
    createdAt: new Date('2023-02-28'),
  },
  {
    id: 'user-8',
    username: 'aisha_student',
    displayName: 'Aisha Patel',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
    bio: 'Computer Science student passionate about machine learning and social impact.',
    followers: 1876,
    following: 2341,
    verified: false,
    profiles: [
      {
        id: 'prof-8-1',
        name: 'Academic',
        interests: ['machine-learning', 'computer-science', 'research', 'social-impact', 'education'],
        isActive: true,
        algorithmWeights: { ...techWeights, relevance: 0.35 },
      },
      {
        id: 'prof-8-2',
        name: 'Social',
        interests: ['friends', 'campus-life', 'events', 'music', 'travel'],
        isActive: false,
        algorithmWeights: socialWeights,
      }
    ],
    algorithmSettings: {
      transparency: 'full',
      explainability: true,
      confidenceThreshold: 0.75,
      personalizedFeeds: true,
    },
    createdAt: new Date('2023-09-01'),
  },
  {
    id: 'user-9',
    username: 'robert_entrepreneur',
    displayName: 'Robert Chen',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    bio: 'Serial entrepreneur and startup advisor. Building the next generation of tech companies.',
    followers: 24567,
    following: 892,
    verified: true,
    profiles: [
      {
        id: 'prof-9-1',
        name: 'Business',
        interests: ['entrepreneurship', 'startups', 'venture-capital', 'innovation', 'leadership'],
        isActive: true,
        algorithmWeights: { ...defaultWeights, relevance: 0.35, socialSignals: 0.15 },
      }
    ],
    algorithmSettings: {
      transparency: 'partial',
      explainability: true,
      confidenceThreshold: 0.7,
      personalizedFeeds: true,
    },
    createdAt: new Date('2022-01-20'),
  },
  {
    id: 'user-10',
    username: 'lisa_photographer',
    displayName: 'Lisa Anderson',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face',
    bio: 'Travel photographer capturing moments around the world. Currently in Tokyo 📸',
    followers: 34521,
    following: 1234,
    verified: true,
    profiles: [
      {
        id: 'prof-10-1',
        name: 'Photography',
        interests: ['photography', 'travel', 'nature', 'street-photography', 'storytelling'],
        isActive: true,
        algorithmWeights: { ...defaultWeights, engagement: 0.4, diversity: 0.2 },
      }
    ],
    algorithmSettings: {
      transparency: 'minimal',
      explainability: false,
      confidenceThreshold: 0.55,
      personalizedFeeds: true,
    },
    createdAt: new Date('2021-12-03'),
  },
];
