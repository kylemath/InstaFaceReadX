import React, { useState, useEffect } from 'react';
import { Plus, X, Heart, Eye, Bot, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Story } from '../types/gamification';
import { allJots } from '../utils/jotEngine';

// Mock stories data
const mockStories: Story[] = [
  {
    id: 'story-1',
    userId: 'user-1',
    user: allJots.find(j => j.id === 'user-1')!,
    type: 'image',
    content: 'Late night coding session! 💻✨',
    media: {
      url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=300&fit=crop'
    },
    filters: ['neon', 'contrast'],
    stickers: [
      { id: 's1', type: 'emoji', content: '💻', position: { x: 0.3, y: 0.2 }, size: 1.2, rotation: 0 },
      { id: 's2', type: 'text', content: 'Coding Mode ON', position: { x: 0.5, y: 0.8 }, size: 1, rotation: -5 }
    ],
    views: ['user-2', 'user-3', 'user-5'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000)
  },
  {
    id: 'story-2',
    userId: 'user-6',
    user: allJots.find(j => j.id === 'user-6')!,
    type: 'image',
    content: 'Perfect ramen bowl! 🍜',
    media: {
      url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=300&fit=crop'
    },
    filters: ['warm', 'food'],
    stickers: [
      { id: 's3', type: 'emoji', content: '🍜', position: { x: 0.1, y: 0.1 }, size: 1.5, rotation: 0 },
      { id: 's4', type: 'text', content: 'Yummy!', position: { x: 0.7, y: 0.3 }, size: 1.1, rotation: 10 }
    ],
    views: ['user-1', 'user-3', 'user-4', 'user-7'],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000)
  },
  {
    id: 'story-3',
    userId: 'user-5',
    user: allJots.find(j => j.id === 'user-5')!,
    type: 'image',
    content: 'Epic gaming setup! 🎮',
    media: {
      url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=300&fit=crop'
    },
    filters: ['gaming', 'rgb'],
    stickers: [
      { id: 's5', type: 'emoji', content: '🎮', position: { x: 0.2, y: 0.15 }, size: 1.3, rotation: 0 },
      { id: 's6', type: 'text', content: 'Ready to game!', position: { x: 0.5, y: 0.7 }, size: 1, rotation: 0 }
    ],
    views: ['user-1', 'user-2', 'user-8'],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000)
  }
];

interface StoriesProps {
  onClose?: () => void;
}

export const Stories: React.FC<StoriesProps> = ({ onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const currentStory = mockStories[currentStoryIndex];
  const storyDuration = 5000; // 5 seconds per story

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story
          if (currentStoryIndex < mockStories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            return 0;
          } else {
            // All stories viewed, close
            onClose?.();
            return 100;
          }
        }
        return prev + (100 / (storyDuration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentStoryIndex, isPaused, onClose, storyDuration]);

  const goToNextStory = () => {
    if (currentStoryIndex < mockStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      onClose?.();
    }
  };

  const goToPrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  const handleStoryClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickWidth = rect.width;
    
    if (clickX < clickWidth / 2) {
      goToPrevStory();
    } else {
      goToNextStory();
    }
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Story Container */}
      <div className="relative w-full max-w-md h-full bg-black">
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1 z-20">
          {mockStories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width: index < currentStoryIndex ? '100%' : 
                         index === currentStoryIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between z-20">
          <button
            onClick={() => navigate(`/profile/${currentStory.userId}`)}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <img
                src={currentStory.user.avatar}
                alt={currentStory.user.displayName}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full">
                <Bot size={6} />
              </div>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{currentStory.user.displayName}</div>
              <div className="text-white text-xs opacity-75">{formatTimeAgo(currentStory.createdAt)}</div>
            </div>
          </button>
          
          <button
            onClick={onClose}
            className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Story Content */}
        <div
          className="relative w-full h-full cursor-pointer select-none"
          onClick={handleStoryClick}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background Image/Video */}
          <img
            src={currentStory.media?.url}
            alt={currentStory.content}
            className="w-full h-full object-cover"
            draggable={false}
          />

          {/* Filters Overlay */}
          {currentStory.filters && (
            <div className={`absolute inset-0 mix-blend-overlay ${
              currentStory.filters.includes('neon') ? 'bg-gradient-to-b from-purple-500 to-blue-500 opacity-20' :
              currentStory.filters.includes('warm') ? 'bg-gradient-to-b from-orange-400 to-red-400 opacity-15' :
              currentStory.filters.includes('gaming') ? 'bg-gradient-to-b from-green-400 to-blue-400 opacity-25' :
              ''
            }`} />
          )}

          {/* Stickers */}
          {currentStory.stickers?.map((sticker) => (
            <div
              key={sticker.id}
              className="absolute pointer-events-none"
              style={{
                left: `${sticker.position.x * 100}%`,
                top: `${sticker.position.y * 100}%`,
                transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.size})`,
              }}
            >
              {sticker.type === 'emoji' && (
                <span className="text-4xl">{sticker.content}</span>
              )}
              {sticker.type === 'text' && (
                <span className="text-white font-bold text-lg drop-shadow-lg bg-black bg-opacity-50 px-2 py-1 rounded">
                  {sticker.content}
                </span>
              )}
            </div>
          ))}

          {/* Content Text */}
          <div className="absolute bottom-20 left-4 right-4">
            <p className="text-white text-lg font-semibold drop-shadow-lg">
              {currentStory.content}
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-red-400 transition-colors">
              <Heart size={24} />
            </button>
            <div className="flex items-center space-x-1 text-white text-sm">
              <Eye size={16} />
              <span>{currentStory.views.length}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {currentStory.filters && currentStory.filters.length > 0 && (
              <div className="flex items-center space-x-1 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded-full">
                <Sparkles size={12} />
                <span>{currentStory.filters.length} filters</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Hints */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-50 pointer-events-none">
          {currentStoryIndex > 0 && <span className="text-sm">← Tap</span>}
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-50 pointer-events-none">
          {currentStoryIndex < mockStories.length - 1 && <span className="text-sm">Tap →</span>}
        </div>
      </div>
    </div>
  );
};

// Stories Preview Component (for main feed)
export const StoriesPreview: React.FC = () => {
  const [showStories, setShowStories] = useState(false);
  const navigate = useNavigate();

  // Group stories by user
  const storiesByUser = mockStories.reduce((acc, story) => {
    if (!acc[story.userId]) {
      acc[story.userId] = [];
    }
    acc[story.userId].push(story);
    return acc;
  }, {} as Record<string, Story[]>);

  const userStories = Object.entries(storiesByUser).map(([userId, stories]) => ({
    userId,
    user: stories[0].user,
    stories,
    hasUnviewed: stories.some(story => !story.views.includes('current-user'))
  }));

  return (
    <>
      <div className="bg-white p-4 mb-4 rounded-xl shadow-sm">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          {/* Add Story Button */}
          <button className="flex-shrink-0 flex flex-col items-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
              <Plus className="text-white" size={24} />
            </div>
            <span className="text-xs font-medium text-gray-700">Your Story</span>
          </button>

          {/* User Stories */}
          {userStories.map(({ userId, user, stories, hasUnviewed }) => (
            <button
              key={userId}
              onClick={() => setShowStories(true)}
              className="flex-shrink-0 flex flex-col items-center space-y-2"
            >
              <div className={`w-16 h-16 rounded-full p-0.5 ${
                hasUnviewed 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                  : 'bg-gray-300'
              }`}>
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden relative">
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full">
                    <Bot size={6} />
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-700 max-w-16 truncate">
                {user.displayName.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Stories Viewer */}
      {showStories && (
        <Stories onClose={() => setShowStories(false)} />
      )}
    </>
  );
};
