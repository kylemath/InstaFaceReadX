import React, { useState } from 'react';
import { Search, Bell, Settings, User, LogOut, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { AuthModal } from './AuthModal';

export const Header: React.FC = () => {
  const { user, isAuthenticated, isAnonymous, logout, setAnonymous, currentProfile, switchProfile } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              InstaFaceReadX
            </button>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
              Open Algorithm
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search posts, users, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Anonymous mode toggle */}
            <button
              onClick={handleAnonymousToggle}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                isAnonymous
                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <Eye size={16} />
              <span>{isAnonymous ? 'Anonymous' : 'Tracked'}</span>
            </button>

            {isAuthenticated && user ? (
              <>
                {/* Notifications */}
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Settings */}
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Settings size={20} />
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <img
                      src={user.avatar}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-left hidden md:block">
                      <div className="text-sm font-medium">{user.displayName}</div>
                      <div className="text-xs text-gray-500">
                        {currentProfile?.name || 'Default'}
                      </div>
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="font-medium">{user.displayName}</div>
                        <div className="text-sm text-gray-500">@{user.username}</div>
                      </div>
                      
                      {user.profiles.length > 1 && (
                        <div className="px-4 py-2 border-b border-gray-100">
                          <div className="text-sm font-medium mb-2">Switch Profile</div>
                          {user.profiles.map((profile) => (
                            <button
                              key={profile.id}
                              onClick={() => {
                                switchProfile(profile.id);
                                setShowProfileMenu(false);
                              }}
                              className={`w-full text-left px-2 py-1 rounded text-sm ${
                                currentProfile?.id === profile.id
                                  ? 'bg-primary-100 text-primary-700'
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              {profile.name}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-red-600"
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
                className="btn-primary"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
};
