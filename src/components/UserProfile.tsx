import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, Calendar, MapPin, Link as LinkIcon, Settings } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { PostCard } from './PostCard';
import { JotProfile } from './JotProfile';
import { allJots } from '../utils/jotEngine';
import { fakePosts } from '../data/fakePosts';
import { expandedPosts } from '../data/expandedPosts';
import { allNewsSharePosts } from '../data/newsLinks';

const allPosts = [...fakePosts, ...expandedPosts, ...allNewsSharePosts];

export const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'likes'>('posts');
  const [showJotProfile, setShowJotProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const user = allJots.find(j => j.id === userId);
  const jot = user;

  const userPosts = useMemo(() => {
    return allPosts
      .filter(post => post.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [userId]);

  const mediaPosts = useMemo(() => {
    return userPosts.filter(post => post.media && post.media.length > 0);
  }, [userPosts]);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
          <p className="text-gray-600 mb-4">The user you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold">{user.displayName}</h1>
            <p className="text-sm text-gray-500">{userPosts.length} posts</p>
          </div>
        </div>
        {jot && (
          <button
            onClick={() => setShowJotProfile(true)}
            className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors flex items-center space-x-2"
          >
            <Bot size={16} />
            <span>Jot Details</span>
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 border-b border-gray-200">
        {/* Avatar and Basic Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-20 h-20 rounded-full"
            />
            {jot && (
              <div className="absolute -bottom-2 -right-2 bg-purple-500 text-white p-2 rounded-full">
                <Bot size={16} />
              </div>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleFollowClick}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isFollowing
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Name and Username */}
        <div className="mb-3">
          <div className="flex items-center space-x-2 mb-1">
            <h2 className="text-xl font-bold">{user.displayName}</h2>
            {user.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            {jot && (
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                Autonomous Jot
              </span>
            )}
          </div>
          <p className="text-gray-600">@{user.username}</p>
        </div>

        {/* Bio */}
        <p className="text-gray-900 mb-4">{user.bio}</p>

        {/* Jot-specific Info */}
        {jot && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-purple-50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-700">
                {jot.demographics.profession}
              </div>
              <div className="text-xs text-purple-600">Profession</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-700">
                {(jot.energyLevel * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-purple-600">Energy Level</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-700">
                {jot.moodState > 0.2 ? '😊' : jot.moodState < -0.2 ? '😔' : '😐'}
              </div>
              <div className="text-xs text-purple-600">Current Mood</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-700">
                {(jot.personality.authenticity * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-purple-600">Authenticity</div>
            </div>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mb-4">
          {jot && (
            <>
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{jot.demographics.location.city}, {jot.demographics.location.country}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LinkIcon size={16} />
                <span>{jot.demographics.profession}</span>
              </div>
            </>
          )}
          <div className="flex items-center space-x-1">
            <Calendar size={16} />
            <span>Joined {formatDistanceToNow(user.createdAt, { addSuffix: true })}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex space-x-6 text-sm">
          <div>
            <span className="font-bold">{user.following}</span>
            <span className="text-gray-500 ml-1">Following</span>
          </div>
          <div>
            <span className="font-bold">{user.followers + (isFollowing ? 1 : 0)}</span>
            <span className="text-gray-500 ml-1">Followers</span>
          </div>
          <div>
            <span className="font-bold">{userPosts.length}</span>
            <span className="text-gray-500 ml-1">Posts</span>
          </div>
          {jot && (
            <div>
              <span className="font-bold">{Object.keys(jot.behaviorPatterns.topicAffinities).length}</span>
              <span className="text-gray-500 ml-1">Interests</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <nav className="flex">
          {[
            { id: 'posts', label: 'Posts', count: userPosts.length },
            { id: 'media', label: 'Media', count: mediaPosts.length },
            { id: 'likes', label: 'Likes', count: '—' }
          ].map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 py-4 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-gray-50 min-h-screen">
        {activeTab === 'posts' && (
          <div className="space-y-4 p-4">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  showAlgorithmInfo={false}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No posts yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'media' && (
          <div className="p-4">
            {mediaPosts.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {mediaPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => navigate(`/post/${post.id}`)}
                    className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={post.media![0].thumbnail || post.media![0].url}
                      alt={post.media![0].alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No media posts yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'likes' && (
          <div className="text-center py-12 p-4">
            <p className="text-gray-500">Liked posts are private</p>
          </div>
        )}
      </div>

      {/* Jot Profile Modal */}
      {showJotProfile && jot && (
        <JotProfile 
          jot={jot} 
          onClose={() => setShowJotProfile(false)} 
        />
      )}
    </div>
  );
};
