import { Post, AlgorithmScore } from '../types';
import { fakeUsers } from './fakeUsers';

// Helper function to create algorithm scores
const createAlgorithmScore = (
  totalScore: number,
  confidence: number,
  primaryReason: string,
  reasoning: string,
  factors: { name: string; weight: number; contribution: number; description: string }[]
): AlgorithmScore => ({
  totalScore,
  confidence,
  explanation: {
    primary: primaryReason,
    secondary: factors.map(f => f.description),
    reasoning,
  },
  factors,
});

// Get users by ID for easy reference
const getUserById = (id: string) => fakeUsers.find(u => u.id === id)!;

export const fakePosts: Post[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    user: getUserById('user-1'),
    type: 'text',
    content: 'Just open-sourced my new React algorithm visualization library! 🎉 It shows how different sorting algorithms work in real-time. Check it out and let me know what you think!',
    likes: 234,
    comments: 45,
    shares: 23,
    createdAt: new Date('2024-01-15T10:30:00Z'),
    algorithmScore: createAlgorithmScore(
      0.85,
      0.92,
      'High relevance to your tech interests',
      'This post scored highly because it matches your interests in JavaScript and open-source development, has strong engagement, and is from a verified developer.',
      [
        { name: 'Relevance', weight: 0.3, contribution: 0.28, description: 'Matches your JavaScript and open-source interests' },
        { name: 'Engagement', weight: 0.25, contribution: 0.22, description: 'High like-to-follower ratio' },
        { name: 'Recency', weight: 0.3, contribution: 0.25, description: 'Posted recently' },
        { name: 'Social Signals', weight: 0.1, contribution: 0.08, description: 'From verified user you follow' },
        { name: 'Diversity', weight: 0.05, contribution: 0.02, description: 'Adds variety to your feed' }
      ]
    ),
  },
  {
    id: 'post-2',
    userId: 'user-2',
    user: getUserById('user-2'),
    type: 'thread',
    content: 'THREAD: The hidden costs of "free" social media platforms 🧵',
    threadPosts: [
      {
        id: 'thread-2-1',
        userId: 'user-2',
        user: getUserById('user-2'),
        type: 'text',
        content: '1/ We often think social media is "free" but we\'re actually paying with our data, attention, and privacy. Let me break down the real costs...',
        likes: 156,
        comments: 23,
        shares: 45,
        createdAt: new Date('2024-01-14T14:20:00Z'),
      },
      {
        id: 'thread-2-2',
        userId: 'user-2',
        user: getUserById('user-2'),
        type: 'text',
        content: '2/ Data harvesting: Every click, scroll, and pause is tracked. This creates detailed profiles sold to advertisers for billions annually.',
        likes: 134,
        comments: 18,
        shares: 32,
        createdAt: new Date('2024-01-14T14:22:00Z'),
      },
      {
        id: 'thread-2-3',
        userId: 'user-2',
        user: getUserById('user-2'),
        type: 'text',
        content: '3/ Attention manipulation: Algorithms designed to maximize engagement often exploit psychological vulnerabilities, leading to addiction-like behaviors.',
        likes: 189,
        comments: 34,
        shares: 56,
        createdAt: new Date('2024-01-14T14:24:00Z'),
      }
    ],
    likes: 456,
    comments: 89,
    shares: 123,
    createdAt: new Date('2024-01-14T14:20:00Z'),
    algorithmScore: createAlgorithmScore(
      0.78,
      0.88,
      'Matches your privacy and tech policy interests',
      'This thread aligns with your interests in digital rights and journalism, has strong engagement from your network.',
      [
        { name: 'Relevance', weight: 0.25, contribution: 0.23, description: 'Matches privacy and tech policy interests' },
        { name: 'Engagement', weight: 0.15, contribution: 0.14, description: 'High engagement on thread format' },
        { name: 'Recency', weight: 0.5, contribution: 0.35, description: 'Recent and trending topic' },
        { name: 'Social Signals', weight: 0.05, contribution: 0.04, description: 'Shared by people you follow' },
        { name: 'Diversity', weight: 0.05, contribution: 0.02, description: 'Different content type (thread)' }
      ]
    ),
  },
  {
    id: 'post-3',
    userId: 'user-3',
    user: getUserById('user-3'),
    type: 'image',
    content: 'New UI concept for a sustainable fashion app 🌱 What do you think about the color palette?',
    media: [
      {
        id: 'media-3-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&h=200&fit=crop',
        alt: 'Modern UI design mockup for sustainable fashion app with green color palette',
      }
    ],
    likes: 324,
    comments: 67,
    shares: 34,
    createdAt: new Date('2024-01-13T16:45:00Z'),
    algorithmScore: createAlgorithmScore(
      0.72,
      0.85,
      'Visual content matching your design interests',
      'This design post matches your UI/UX interests and has good engagement from the design community.',
      [
        { name: 'Relevance', weight: 0.3, contribution: 0.26, description: 'Matches your UI/UX and design interests' },
        { name: 'Engagement', weight: 0.35, contribution: 0.28, description: 'High engagement from design community' },
        { name: 'Recency', weight: 0.2, contribution: 0.14, description: 'Posted yesterday' },
        { name: 'Diversity', weight: 0.1, contribution: 0.03, description: 'Visual content adds variety' },
        { name: 'Social Signals', weight: 0.05, contribution: 0.01, description: 'Liked by designers you follow' }
      ]
    ),
  },
  {
    id: 'post-4',
    userId: 'user-4',
    user: getUserById('user-4'),
    type: 'text',
    content: 'New research shows Arctic ice loss is accelerating faster than our models predicted. We need immediate action on carbon emissions. Here\'s what the data tells us... 🧊📊',
    likes: 567,
    comments: 123,
    shares: 89,
    createdAt: new Date('2024-01-12T09:15:00Z'),
    algorithmScore: createAlgorithmScore(
      0.69,
      0.91,
      'Important scientific information',
      'This post provides crucial climate science information with high credibility from a verified researcher.',
      [
        { name: 'Relevance', weight: 0.4, contribution: 0.32, description: 'Important climate science information' },
        { name: 'Recency', weight: 0.2, contribution: 0.16, description: 'Recent scientific findings' },
        { name: 'Social Signals', weight: 0.15, contribution: 0.12, description: 'From verified climate scientist' },
        { name: 'Engagement', weight: 0.2, contribution: 0.08, description: 'Moderate engagement on serious topic' },
        { name: 'Diversity', weight: 0.05, contribution: 0.01, description: 'Educational content' }
      ]
    ),
  },
  {
    id: 'post-5',
    userId: 'user-5',
    user: getUserById('user-5'),
    type: 'video',
    content: 'Epic clutch moment in the tournament finals! 🎮 The crowd went wild!',
    media: [
      {
        id: 'media-5-1',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
        alt: 'Gaming tournament highlight reel',
      }
    ],
    likes: 892,
    comments: 156,
    shares: 234,
    createdAt: new Date('2024-01-11T20:30:00Z'),
    algorithmScore: createAlgorithmScore(
      0.64,
      0.76,
      'Popular gaming content',
      'High engagement gaming content, though not directly matching your primary interests.',
      [
        { name: 'Engagement', weight: 0.4, contribution: 0.35, description: 'Very high engagement rate' },
        { name: 'Social Signals', weight: 0.1, contribution: 0.08, description: 'Shared by gaming community' },
        { name: 'Recency', weight: 0.2, contribution: 0.14, description: 'Recent tournament content' },
        { name: 'Relevance', weight: 0.2, contribution: 0.05, description: 'Limited relevance to your interests' },
        { name: 'Diversity', weight: 0.1, contribution: 0.02, description: 'Different content category' }
      ]
    ),
  },
  {
    id: 'post-6',
    userId: 'user-6',
    user: getUserById('user-6'),
    type: 'image',
    content: 'Homemade ramen with 24-hour bone broth 🍜 Recipe in the comments!',
    media: [
      {
        id: 'media-6-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop',
        alt: 'Homemade ramen bowl with vegetables and egg',
      }
    ],
    likes: 1234,
    comments: 89,
    shares: 67,
    createdAt: new Date('2024-01-10T18:20:00Z'),
    algorithmScore: createAlgorithmScore(
      0.58,
      0.72,
      'Popular food content',
      'High engagement food content that adds diversity to your feed.',
      [
        { name: 'Engagement', weight: 0.4, contribution: 0.32, description: 'Very high like count' },
        { name: 'Diversity', weight: 0.15, contribution: 0.12, description: 'Food content adds variety' },
        { name: 'Recency', weight: 0.2, contribution: 0.10, description: 'Posted 4 days ago' },
        { name: 'Social Signals', weight: 0.1, contribution: 0.03, description: 'Popular in your network' },
        { name: 'Relevance', weight: 0.15, contribution: 0.01, description: 'Not directly relevant to interests' }
      ]
    ),
  },
  {
    id: 'post-7',
    userId: 'user-7',
    user: getUserById('user-7'),
    type: 'text',
    content: 'Quick reminder: consistency beats perfection every time 💪 Small daily habits compound into major results. What\'s one habit you\'re building this week?',
    likes: 445,
    comments: 78,
    shares: 45,
    createdAt: new Date('2024-01-09T07:00:00Z'),
    algorithmScore: createAlgorithmScore(
      0.55,
      0.68,
      'Motivational content',
      'Positive engagement on motivational content, though not aligned with your main interests.',
      [
        { name: 'Engagement', weight: 0.35, contribution: 0.28, description: 'Good engagement rate' },
        { name: 'Social Signals', weight: 0.15, contribution: 0.12, description: 'Positive community response' },
        { name: 'Recency', weight: 0.2, contribution: 0.12, description: 'Posted 5 days ago' },
        { name: 'Diversity', weight: 0.1, contribution: 0.02, description: 'Motivational content type' },
        { name: 'Relevance', weight: 0.2, contribution: 0.01, description: 'Not matching your interests' }
      ]
    ),
  },
  {
    id: 'post-8',
    userId: 'user-8',
    user: getUserById('user-8'),
    type: 'text',
    content: 'Working on my machine learning thesis about algorithmic bias in social media feeds. It\'s fascinating how small changes in training data can have huge impacts on what users see. #MLResearch #AlgorithmicTransparency',
    likes: 167,
    comments: 34,
    shares: 23,
    createdAt: new Date('2024-01-08T15:45:00Z'),
    algorithmScore: createAlgorithmScore(
      0.89,
      0.94,
      'Highly relevant to your interests',
      'This post directly relates to your interests in AI, algorithms, and social media transparency.',
      [
        { name: 'Relevance', weight: 0.35, contribution: 0.34, description: 'Perfect match for ML and algorithm interests' },
        { name: 'Recency', weight: 0.35, contribution: 0.28, description: 'Recent research update' },
        { name: 'Social Signals', weight: 0.05, contribution: 0.04, description: 'From academic community' },
        { name: 'Engagement', weight: 0.2, contribution: 0.15, description: 'Good engagement for academic content' },
        { name: 'Diversity', weight: 0.05, contribution: 0.08, description: 'Research content adds value' }
      ]
    ),
  },
  {
    id: 'post-9',
    userId: 'user-9',
    user: getUserById('user-9'),
    type: 'text',
    content: 'Just closed our Series A! 🎉 Building transparent, user-controlled algorithms is the future of social media. Excited to share more about our approach to explainable AI soon.',
    likes: 789,
    comments: 123,
    shares: 89,
    createdAt: new Date('2024-01-07T11:30:00Z'),
    algorithmScore: createAlgorithmScore(
      0.82,
      0.89,
      'Relevant startup and AI news',
      'This funding announcement relates to your interests in AI and algorithmic transparency.',
      [
        { name: 'Relevance', weight: 0.35, contribution: 0.31, description: 'Matches AI and transparency interests' },
        { name: 'Social Signals', weight: 0.15, contribution: 0.13, description: 'From verified entrepreneur' },
        { name: 'Engagement', weight: 0.25, contribution: 0.22, description: 'High engagement on funding news' },
        { name: 'Recency', weight: 0.2, contribution: 0.14, description: 'Recent business news' },
        { name: 'Diversity', weight: 0.05, contribution: 0.02, description: 'Business content variety' }
      ]
    ),
  },
  {
    id: 'post-10',
    userId: 'user-10',
    user: getUserById('user-10'),
    type: 'image',
    content: 'Golden hour in Shibuya crossing 📸 The energy here is incredible!',
    media: [
      {
        id: 'media-10-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop',
        alt: 'Shibuya crossing in Tokyo during golden hour',
      }
    ],
    likes: 2156,
    comments: 234,
    shares: 123,
    createdAt: new Date('2024-01-06T08:15:00Z'),
    algorithmScore: createAlgorithmScore(
      0.61,
      0.74,
      'High-quality visual content',
      'Beautiful photography with high engagement, adds visual diversity to your feed.',
      [
        { name: 'Engagement', weight: 0.4, contribution: 0.36, description: 'Very high engagement on photo' },
        { name: 'Diversity', weight: 0.2, contribution: 0.15, description: 'Visual travel content' },
        { name: 'Social Signals', weight: 0.15, contribution: 0.08, description: 'From verified photographer' },
        { name: 'Recency', weight: 0.2, contribution: 0.02, description: 'Posted over a week ago' },
        { name: 'Relevance', weight: 0.05, contribution: 0.00, description: 'Not matching your interests' }
      ]
    ),
  },
];
