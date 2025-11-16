import React, { useState, useMemo } from 'react';
import { PostCard } from './PostCard';
import { AlgorithmControls } from './AlgorithmControls';
import { JotOverview } from './JotOverview';
import { fakePosts } from '../data/fakePosts';
import { expandedPosts } from '../data/expandedPosts';
import { allNewsSharePosts } from '../data/newsLinks';
import { Post, AlgorithmWeights, FeedSettings } from '../types';
import { useAuthStore } from '../stores/authStore';

export const Feed: React.FC = () => {
  const { user, currentProfile } = useAuthStore();
  const [algorithmWeights, setAlgorithmWeights] = useState<AlgorithmWeights>({
    recency: 0.3,
    engagement: 0.25,
    relevance: 0.25,
    diversity: 0.1,
    socialSignals: 0.1,
  });
  
  const [feedSettings, setFeedSettings] = useState<FeedSettings>({
    algorithm: 'personalized',
    showExplanations: true,
    showConfidence: true,
    contentTypes: ['text', 'image', 'video', 'thread'],
    timeRange: 'week',
  });

  // Algorithm to sort posts based on current weights
  const sortedPosts = useMemo(() => {
    // Combine all posts: original, expanded, and news shares
    let posts = [...fakePosts, ...expandedPosts, ...allNewsSharePosts];

    // Filter by content type
    posts = posts.filter(post => feedSettings.contentTypes.includes(post.type));

    // Filter by time range
    const now = new Date();
    const timeFilters = {
      hour: 1000 * 60 * 60,
      day: 1000 * 60 * 60 * 24,
      week: 1000 * 60 * 60 * 24 * 7,
      month: 1000 * 60 * 60 * 24 * 30,
      all: Infinity,
    };
    
    const timeLimit = now.getTime() - timeFilters[feedSettings.timeRange];
    posts = posts.filter(post => post.createdAt.getTime() > timeLimit);

    // Sort based on algorithm
    switch (feedSettings.algorithm) {
      case 'chronological':
        return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      case 'engagement':
        return posts.sort((a, b) => {
          const aEngagement = a.likes + a.comments + a.shares;
          const bEngagement = b.likes + b.comments + b.shares;
          return bEngagement - aEngagement;
        });
      
      case 'personalized':
      case 'custom':
        return posts.sort((a, b) => {
          const aScore = calculatePersonalizedScore(a, algorithmWeights, user?.id);
          const bScore = calculatePersonalizedScore(b, algorithmWeights, user?.id);
          return bScore - aScore;
        });
      
      default:
        return posts;
    }
  }, [feedSettings, algorithmWeights, user]);

  return (
    <div className="max-w-2xl mx-auto">
      <JotOverview />
      
      <AlgorithmControls
        onSettingsChange={setFeedSettings}
        onWeightsChange={setAlgorithmWeights}
      />
      
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            showAlgorithmInfo={feedSettings.showExplanations}
          />
        ))}
        
        {sortedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts match your current filters.</p>
            <p className="text-sm text-gray-400 mt-2">
              Try adjusting your content types or time range.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to calculate personalized score
function calculatePersonalizedScore(
  post: Post,
  weights: AlgorithmWeights,
  userId?: string
): number {
  const now = new Date().getTime();
  const postTime = post.createdAt.getTime();
  const hoursSincePost = (now - postTime) / (1000 * 60 * 60);
  
  // Recency score (decays over time)
  const recencyScore = Math.max(0, 1 - (hoursSincePost / 168)); // Decay over a week
  
  // Engagement score (normalized)
  const totalEngagement = post.likes + post.comments + post.shares;
  const engagementScore = Math.min(1, totalEngagement / 1000);
  
  // Relevance score (simplified - would use ML in real app)
  const relevanceScore = post.algorithmScore?.factors.find(f => f.name === 'Relevance')?.contribution || 0.5;
  
  // Diversity score (content type variety)
  const diversityScore = post.type === 'thread' ? 0.8 : post.type === 'video' ? 0.9 : 0.7;
  
  // Social signals (verified users, user connections)
  const socialScore = post.user.verified ? 0.8 : 0.5;
  
  return (
    weights.recency * recencyScore +
    weights.engagement * engagementScore +
    weights.relevance * relevanceScore +
    weights.diversity * diversityScore +
    weights.socialSignals * socialScore
  );
}
