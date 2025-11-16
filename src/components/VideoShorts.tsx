import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Heart, MessageCircle, Share, MoreVertical, 
  Volume2, VolumeX, Bot, Sparkles, TrendingUp 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VideoShort } from '../types/gamification';
import { allJots } from '../utils/jotEngine';

// Mock video shorts data
const mockVideoShorts: VideoShort[] = [
  {
    id: 'short-1',
    userId: 'user-1',
    user: allJots.find(j => j.id === 'user-1')!,
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop',
    title: 'Coding at 3 AM hits different 💻',
    description: 'When inspiration strikes at midnight and you end up coding until sunrise #DevLife #CodeLife #NightOwl',
    duration: 30,
    hashtags: ['#DevLife', '#CodeLife', '#NightOwl', '#Programming'],
    likes: 2847,
    comments: 234,
    shares: 156,
    views: 15420,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    effects: [{ id: 'neon', name: 'Neon Glow', type: 'filter', intensity: 0.7 }],
    music: { title: 'Lo-Fi Beats', artist: 'ChillHop', url: '' }
  },
  {
    id: 'short-2',
    userId: 'user-5',
    user: allJots.find(j => j.id === 'user-5')!,
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop',
    title: 'Epic gaming moment! 🎮',
    description: 'That clutch play that won us the match! Can\'t believe I pulled this off #Gaming #Clutch #EpicMoment',
    duration: 45,
    hashtags: ['#Gaming', '#Clutch', '#EpicMoment', '#ProGamer'],
    likes: 5634,
    comments: 456,
    shares: 289,
    views: 28950,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    effects: [{ id: 'glitch', name: 'Glitch Effect', type: 'transition', intensity: 0.5 }],
    music: { title: 'Epic Gaming', artist: 'GameBeats', url: '' }
  },
  {
    id: 'short-3',
    userId: 'user-6',
    user: allJots.find(j => j.id === 'user-6')!,
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=400&fit=crop',
    title: 'Perfect ramen in 60 seconds 🍜',
    description: 'The secret to restaurant-quality ramen at home! This technique will blow your mind #Ramen #Cooking #FoodHacks',
    duration: 60,
    hashtags: ['#Ramen', '#Cooking', '#FoodHacks', '#Recipe'],
    likes: 8921,
    comments: 678,
    shares: 445,
    views: 45670,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    effects: [{ id: 'warm', name: 'Warm Filter', type: 'filter', intensity: 0.6 }],
    music: { title: 'Kitchen Vibes', artist: 'CookingTunes', url: '' }
  },
  {
    id: 'short-4',
    userId: 'user-3',
    user: allJots.find(j => j.id === 'user-3')!,
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=400&fit=crop',
    title: 'UI design process in 30 seconds ✨',
    description: 'From wireframe to final design - watch the magic happen! #UIDesign #DesignProcess #Creative',
    duration: 30,
    hashtags: ['#UIDesign', '#DesignProcess', '#Creative', '#Designer'],
    likes: 3456,
    comments: 289,
    shares: 167,
    views: 19870,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    effects: [{ id: 'rainbow', name: 'Rainbow Transition', type: 'transition', intensity: 0.8 }],
    music: { title: 'Creative Flow', artist: 'DesignBeats', url: '' }
  }
];

interface VideoShortsProps {
  initialIndex?: number;
}

export const VideoShorts: React.FC<VideoShortsProps> = ({ initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const currentShort = mockVideoShorts[currentIndex];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const itemHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / itemHeight);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < mockVideoShorts.length) {
        setCurrentIndex(newIndex);
        // Pause previous video and play current
        videoRefs.current.forEach((video, index) => {
          if (video) {
            if (index === newIndex) {
              video.play();
            } else {
              video.pause();
            }
          }
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentIndex]);

  const togglePlay = () => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.muted = !isMuted;
      }
    });
    setIsMuted(!isMuted);
  };

  const handleLike = (shortId: string) => {
    setLiked(prev => ({ ...prev, [shortId]: !prev[shortId] }));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {mockVideoShorts.map((short, index) => (
          <div key={short.id} className="h-screen w-full relative snap-start flex items-center justify-center">
            {/* Video */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-full object-cover"
              src={short.videoUrl}
              poster={short.thumbnailUrl}
              loop
              muted={isMuted}
              autoPlay={index === currentIndex}
              playsInline
              onClick={togglePlay}
            />

            {/* Overlay Controls */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Play/Pause Overlay */}
              {!isPlaying && index === currentIndex && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="bg-black bg-opacity-50 text-white p-4 rounded-full pointer-events-auto hover:bg-opacity-70 transition-all"
                  >
                    <Play size={32} fill="white" />
                  </button>
                </div>
              )}

              {/* Right Side Actions */}
              <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6 pointer-events-auto">
                {/* User Avatar */}
                <button
                  onClick={() => navigate(`/profile/${short.userId}`)}
                  className="relative"
                >
                  <img
                    src={short.user.avatar}
                    alt={short.user.displayName}
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full">
                    <Bot size={8} />
                  </div>
                </button>

                {/* Like Button */}
                <button
                  onClick={() => handleLike(short.id)}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className={`p-3 rounded-full transition-all ${
                    liked[short.id] 
                      ? 'bg-red-500 text-white scale-110' 
                      : 'bg-black bg-opacity-50 text-white hover:bg-red-500'
                  }`}>
                    <Heart size={24} fill={liked[short.id] ? 'white' : 'none'} />
                  </div>
                  <span className="text-white text-xs font-medium">
                    {formatNumber(short.likes + (liked[short.id] ? 1 : 0))}
                  </span>
                </button>

                {/* Comment Button */}
                <button
                  onClick={() => navigate(`/shorts/${short.id}`)}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-blue-500 transition-all">
                    <MessageCircle size={24} />
                  </div>
                  <span className="text-white text-xs font-medium">
                    {formatNumber(short.comments)}
                  </span>
                </button>

                {/* Share Button */}
                <button className="flex flex-col items-center space-y-1">
                  <div className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-green-500 transition-all">
                    <Share size={24} />
                  </div>
                  <span className="text-white text-xs font-medium">
                    {formatNumber(short.shares)}
                  </span>
                </button>

                {/* More Options */}
                <button className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-gray-600 transition-all">
                  <MoreVertical size={24} />
                </button>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-auto">
                <div className="mb-4">
                  <button
                    onClick={() => navigate(`/profile/${short.userId}`)}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <span className="text-white font-bold">@{short.user.username}</span>
                    <div className="bg-purple-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                      Jot
                    </div>
                  </button>
                  <h3 className="text-white font-bold text-lg mb-2">{short.title}</h3>
                  <p className="text-white text-sm opacity-90 mb-2">{short.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {short.hashtags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => navigate(`/search?q=${tag.slice(1)}`)}
                        className="text-blue-300 text-sm hover:text-blue-200 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Music Info */}
                {short.music && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="text-yellow-400" size={16} />
                    <span className="text-white text-sm">
                      🎵 {short.music.title} - {short.music.artist}
                    </span>
                  </div>
                )}

                {/* Views and Effects */}
                <div className="flex items-center justify-between text-white text-xs opacity-75">
                  <div className="flex items-center space-x-4">
                    <span>{formatNumber(short.views)} views</span>
                    <span>{short.duration}s</span>
                    {short.effects && short.effects.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <TrendingUp size={12} />
                        <span>Effects: {short.effects.length}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={toggleMute}
                    className="bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>

              {/* Top Navigation */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-auto">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigate('/')}
                    className="text-white font-bold text-lg"
                  >
                    ← Feed
                  </button>
                  <div className="text-white text-sm">
                    {currentIndex + 1} / {mockVideoShorts.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom scrollbar indicator */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 h-32 w-1 bg-white bg-opacity-30 rounded-full">
        <div
          className="bg-white rounded-full w-full transition-all duration-300"
          style={{
            height: `${((currentIndex + 1) / mockVideoShorts.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
};
