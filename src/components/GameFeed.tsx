import React, { useState } from 'react';
import { 
  Home, Zap, Play, Newspaper, TrendingUp, 
  Gamepad2, Sparkles, Target, Trophy 
} from 'lucide-react';
import { Feed } from './Feed';
import { VideoShorts } from './VideoShorts';
import { StoriesPreview } from './Stories';
import { fetchRealNews, convertNewsToPost } from '../utils/newsApi';
import { PostCard } from './PostCard';
import { allJots } from '../utils/jotEngine';

type FeedType = 'home' | 'shorts' | 'news' | 'trending' | 'gaming' | 'challenges';

export const GameFeed: React.FC = () => {
  const [activeFeed, setActiveFeed] = useState<FeedType>('home');
  const [realNews, setRealNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);

  const feedTabs = [
    { 
      id: 'home' as FeedType, 
      label: 'Home', 
      icon: Home, 
      color: 'from-blue-500 to-purple-500',
      description: 'Your personalized feed'
    },
    { 
      id: 'shorts' as FeedType, 
      label: 'Shorts', 
      icon: Play, 
      color: 'from-red-500 to-pink-500',
      description: 'Quick videos'
    },
    { 
      id: 'news' as FeedType, 
      label: 'News', 
      icon: Newspaper, 
      color: 'from-green-500 to-teal-500',
      description: 'Real-time news'
    },
    { 
      id: 'trending' as FeedType, 
      label: 'Trending', 
      icon: TrendingUp, 
      color: 'from-orange-500 to-red-500',
      description: 'What\'s hot now'
    },
    { 
      id: 'gaming' as FeedType, 
      label: 'Gaming', 
      icon: Gamepad2, 
      color: 'from-purple-500 to-indigo-500',
      description: 'Gaming content'
    },
    { 
      id: 'challenges' as FeedType, 
      label: 'Challenges', 
      icon: Trophy, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Join challenges'
    }
  ];

  const loadRealNews = async () => {
    setLoadingNews(true);
    try {
      const newsArticles = await fetchRealNews();
      const newsPosts = newsArticles.map(article => 
        convertNewsToPost(
          article, 
          allJots[Math.floor(Math.random() * allJots.length)].id,
          getNewsShareComment(article)
        )
      );
      setRealNews(newsPosts);
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  const getNewsShareComment = (article: any) => {
    const comments = [
      "This is huge! 🚀 What do you all think?",
      "Just saw this and had to share! 📰",
      "Important news everyone should see 👀",
      "This changes everything! 🔥",
      "Breaking: This just dropped! ⚡",
      "Wow, didn't see this coming! 😮",
      "Game changer right here! 🎯"
    ];
    return comments[Math.floor(Math.random() * comments.length)];
  };

  React.useEffect(() => {
    if (activeFeed === 'news' && realNews.length === 0) {
      loadRealNews();
    }
  }, [activeFeed]);

  const renderFeedContent = () => {
    switch (activeFeed) {
      case 'home':
        return (
          <div className="space-y-6">
            <StoriesPreview />
            <Feed />
          </div>
        );
      
      case 'shorts':
        return <VideoShorts />;
      
      case 'news':
        return (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-2xl mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <Newspaper size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Real News Feed</h2>
                  <p className="text-green-100">Stay informed with breaking news</p>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <p className="text-sm">
                  🔥 <strong>Live updates</strong> from trusted sources • 
                  📊 <strong>Credibility scores</strong> • 
                  🤖 <strong>Jot commentary</strong>
                </p>
              </div>
            </div>

            {loadingNews ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading breaking news...</p>
              </div>
            ) : (
              realNews.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  showAlgorithmInfo={true}
                />
              ))
            )}
          </div>
        );
      
      case 'trending':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Trending Now 🔥</h2>
                  <p className="text-orange-100">What everyone's talking about</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <div className="text-lg font-bold">#AI</div>
                  <div className="text-xs opacity-75">45.2K posts</div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <div className="text-lg font-bold">#Gaming</div>
                  <div className="text-xs opacity-75">32.1K posts</div>
                </div>
              </div>
            </div>
            <Feed />
          </div>
        );
      
      case 'gaming':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-2xl mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Gaming Zone 🎮</h2>
                  <p className="text-purple-100">Level up your gaming experience</p>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <p className="text-sm">
                  🏆 <strong>Gaming highlights</strong> • 
                  🎯 <strong>Pro tips</strong> • 
                  🔥 <strong>Epic moments</strong>
                </p>
              </div>
            </div>
            <Feed />
          </div>
        );
      
      case 'challenges':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-2xl mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <Trophy size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Daily Challenges 🏆</h2>
                  <p className="text-yellow-100">Complete challenges, earn rewards!</p>
                </div>
              </div>
              
              {/* Active Challenges */}
              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Target className="text-yellow-200" size={20} />
                      <span className="font-bold">Share 3 News Articles</span>
                    </div>
                    <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                      +100 XP
                    </div>
                  </div>
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '66%' }}></div>
                  </div>
                  <div className="text-xs mt-1 opacity-75">2/3 completed</div>
                </div>

                <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="text-yellow-200" size={20} />
                      <span className="font-bold">Customize Algorithm</span>
                    </div>
                    <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                      +50 XP
                    </div>
                  </div>
                  <div className="text-xs opacity-75">Adjust your feed preferences</div>
                </div>
              </div>
            </div>
            <Feed />
          </div>
        );
      
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation Tabs */}
      <div className="bg-white shadow-lg sticky top-16 z-30 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            {feedTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFeed === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeed(tab.id)}
                  className={`flex-shrink-0 flex flex-col items-center px-6 py-4 transition-all duration-200 ${
                    isActive
                      ? 'text-white relative'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-t-lg`} />
                  )}
                  <div className="relative z-10 flex flex-col items-center space-y-1">
                    <div className={`p-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-white bg-opacity-20' 
                        : 'group-hover:bg-gray-100'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-medium">{tab.label}</span>
                    {!isActive && (
                      <span className="text-xs opacity-60">{tab.description}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feed Content */}
      <div className={`${activeFeed === 'shorts' ? '' : 'container mx-auto px-4 py-6'}`}>
        {renderFeedContent()}
      </div>
    </div>
  );
};
