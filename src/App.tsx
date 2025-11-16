import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GameHeader } from './components/GameHeader';
import { GameFeed } from './components/GameFeed';
import { VideoShorts } from './components/VideoShorts';
import { PostDetail } from './components/PostDetail';
import { UserProfile } from './components/UserProfile';
import { SearchResults } from './components/SearchResults';
import { useAuthStore } from './stores/authStore';

function App() {
  const { isAnonymous } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <GameHeader />
      
      <main>
        {isAnonymous && (
          <div className="container mx-auto px-4 pt-4">
            <div className="max-w-2xl mx-auto mb-6 p-4 bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <h3 className="font-bold text-orange-800 flex items-center space-x-2">
                  <span>🕶️ Anonymous Mode</span>
                </h3>
              </div>
              <p className="text-sm text-orange-700 mt-2">
                🎭 You're browsing incognito! Your interactions aren't tracked. 
                <strong> Sign up to unlock XP, badges, and personalized feeds!</strong> 🎮✨
              </p>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/" element={<GameFeed />} />
          <Route path="/feed" element={<GameFeed />} />
          <Route path="/shorts" element={<VideoShorts />} />
          <Route path="/shorts/:shortId" element={<VideoShorts />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>

      <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
              <span>✨ InstaFaceReadX ✨</span>
            </h3>
            <p className="text-lg text-purple-100 mb-4">
              🎮 Gamified • 🤖 Open Algorithm • 🌟 Youth-Focused
            </p>
            <div className="flex justify-center space-x-8 text-sm text-purple-200 mb-6">
              <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                <span>🎯</span><span>About</span>
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                <span>🧠</span><span>Algorithm Docs</span>
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                <span>🔒</span><span>Privacy</span>
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                <span>💻</span><span>Open Source</span>
              </a>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-sm text-white">
                <strong>🚀 The Future of Social Media:</strong> Where algorithms serve you, 
                gamification rewards engagement, and transparency builds trust. 
                <br />Join the revolution! 🎉
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
