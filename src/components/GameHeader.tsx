import React, { useState } from 'react';
import { 
  Search, Bell, Settings, User, LogOut, Eye, 
  Zap, Coins, Gem, Trophy, Flame, Star 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { AuthModal } from './AuthModal';
import { UserStats, LEVEL_THRESHOLDS } from '../types/gamification';

// Mock user stats (would come from game store in real app)
const mockUserStats: UserStats = {
  level: 7,
  xp: 1850,
  xpToNextLevel: 900,
  totalXp: 4000,
  streak: 12,
  maxStreak: 18,
  badges: [],
  achievements: [],
  coins: 450,
  gems: 25
};

export const GameHeader: React.FC = () => {
  const { user, isAuthenticated, isAnonymous, logout, setAnonymous, currentProfile, switchProfile } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleAnonymousToggle = () => {
    if (isAuthenticated) {
      logout();
    }
    setAnonymous(!isAnonymous);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getXpProgress = () => {
    const currentLevelXp = LEVEL_THRESHOLDS[mockUserStats.level - 1] || 0;
    const nextLevelXp = LEVEL_THRESHOLDS[mockUserStats.level] || mockUserStats.totalXp;
    const progress = ((mockUserStats.totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-200 flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Zap className="text-yellow-300" size={20} />
              </div>
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent font-black">
                InstaFaceReadX
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-white bg-opacity-20 text-white px-3 py-1 rounded-full backdrop-blur-sm font-medium">
                ✨ Open Algorithm
              </span>
              <span className="text-xs bg-gradient-to-r from-green-400 to-blue-400 px-3 py-1 rounded-full font-medium text-white">
                🎮 Gamified
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-3 text-white opacity-70" size={20} />
              <input
                type="text"
                placeholder="Search posts, users, topics... 🔍"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-10 py-2 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-full text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              />
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* User Stats (if authenticated) */}
            {isAuthenticated && user && (
              <button
                onClick={() => setShowStatsModal(true)}
                className="flex items-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-opacity-30 transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Coins className="text-yellow-300" size={16} />
                    <span className="text-sm font-bold text-yellow-300">{mockUserStats.coins}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Gem className="text-purple-300" size={16} />
                    <span className="text-sm font-bold text-purple-300">{mockUserStats.gems}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-xs font-medium">Level {mockUserStats.level}</div>
                    <div className="w-16 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-300 to-green-300 transition-all duration-500"
                        style={{ width: `${getXpProgress()}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Flame className="text-orange-300" size={16} />
                    <span className="text-sm font-bold text-orange-300">{mockUserStats.streak}</span>
                  </div>
                </div>
              </button>
            )}

            {/* Anonymous mode toggle */}
            <button
              onClick={handleAnonymousToggle}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isAnonymous
                  ? 'bg-orange-500 bg-opacity-80 hover:bg-opacity-100'
                  : 'bg-green-500 bg-opacity-80 hover:bg-opacity-100'
              }`}
            >
              <Eye size={16} />
              <span>{isAnonymous ? 'Anonymous' : 'Tracked'}</span>
            </button>

            {isAuthenticated && user ? (
              <>
                {/* Notifications */}
                <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full relative transition-all duration-200">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    3
                  </span>
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full border-2 border-white border-opacity-50"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 text-gray-900">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                        <div className="font-bold text-lg">{user.displayName}</div>
                        <div className="text-sm text-gray-600">@{user.username}</div>
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <Trophy className="text-yellow-500" size={12} />
                            <span>Level {mockUserStats.level}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="text-purple-500" size={12} />
                            <span>{mockUserStats.totalXp} XP</span>
                          </div>
                        </div>
                      </div>
                      
                      {user.profiles.length > 1 && (
                        <div className="px-4 py-2 border-b border-gray-100">
                          <div className="text-sm font-medium mb-2 text-gray-700">Switch Profile</div>
                          {user.profiles.map((profile) => (
                            <button
                              key={profile.id}
                              onClick={() => {
                                switchProfile(profile.id);
                                setShowProfileMenu(false);
                              }}
                              className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                                currentProfile?.id === profile.id
                                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              {profile.name}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <button
                        onClick={() => navigate(`/profile/${user.id}`)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        View Profile
                      </button>
                      
                      <button
                        onClick={() => setShowStatsModal(true)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        Stats & Achievements
                      </button>
                      
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition-colors flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Join the Fun! 🎉
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-gray-900">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Stats ⚡
              </h2>
              <button
                onClick={() => setShowStatsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">Level {mockUserStats.level}</span>
                  <span className="text-sm text-gray-600">{mockUserStats.totalXp} XP</span>
                </div>
                <div className="w-full h-3 bg-white bg-opacity-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${getXpProgress()}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {mockUserStats.xpToNextLevel} XP to next level
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-100 p-4 rounded-xl text-center">
                  <Coins className="text-yellow-600 mx-auto mb-2" size={24} />
                  <div className="font-bold text-lg text-yellow-700">{mockUserStats.coins}</div>
                  <div className="text-xs text-yellow-600">Coins</div>
                </div>
                <div className="bg-purple-100 p-4 rounded-xl text-center">
                  <Gem className="text-purple-600 mx-auto mb-2" size={24} />
                  <div className="font-bold text-lg text-purple-700">{mockUserStats.gems}</div>
                  <div className="text-xs text-purple-600">Gems</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-xl">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Flame className="text-orange-500" size={24} />
                  <span className="font-bold text-lg text-orange-700">
                    {mockUserStats.streak} Day Streak
                  </span>
                </div>
                <div className="text-center text-sm text-orange-600">
                  Best: {mockUserStats.maxStreak} days
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
};
