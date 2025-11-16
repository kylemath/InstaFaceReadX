import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Play, ChevronRight, Bot, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types';
import { AlgorithmExplanation } from './AlgorithmExplanation';
import { JotProfile } from './JotProfile';
import { allJots } from '../utils/jotEngine';

interface PostCardProps {
  post: Post;
  showAlgorithmInfo?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, showAlgorithmInfo = true }) => {
  const [showFullThread, setShowFullThread] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showJotProfile, setShowJotProfile] = useState(false);
  const navigate = useNavigate();
  
  // Check if this post is from a Jot
  const jot = allJots.find(j => j.id === post.userId);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const renderMedia = () => {
    if (!post.media || post.media.length === 0) return null;

    return (
      <div className="mt-3 rounded-lg overflow-hidden">
        {post.media.map((media) => (
          <div key={media.id} className="relative">
            {media.type === 'image' ? (
              <img
                src={media.url}
                alt={media.alt}
                className="w-full h-auto max-h-96 object-cover"
              />
            ) : (
              <div className="relative">
                <img
                  src={media.thumbnail}
                  alt={media.alt}
                  className="w-full h-auto max-h-96 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all">
                    <Play size={24} fill="currentColor" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderThread = () => {
    if (post.type !== 'thread' || !post.threadPosts) return null;

    const postsToShow = showFullThread ? post.threadPosts : post.threadPosts.slice(0, 2);

    return (
      <div className="mt-3 space-y-3">
        {postsToShow.map((threadPost, index) => (
          <div key={threadPost.id} className="border-l-2 border-gray-200 pl-4">
            <div className="text-sm text-gray-600 mb-1">
              {index + 1}/{post.threadPosts!.length}
            </div>
            <p className="text-gray-900">{threadPost.content}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>{threadPost.likes} likes</span>
              <span>{threadPost.comments} replies</span>
            </div>
          </div>
        ))}
        
        {!showFullThread && post.threadPosts.length > 2 && (
          <button
            onClick={() => setShowFullThread(true)}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm"
          >
            <span>Show {post.threadPosts.length - 2} more posts</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    );
  };

  return (
    <article className="card p-6 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={post.user.avatar}
              alt={post.user.displayName}
              className="w-10 h-10 rounded-full"
            />
            {jot && (
              <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full">
                <Bot size={8} />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate(`/profile/${post.userId}`)}
                className="font-semibold hover:underline"
              >
                {post.user.displayName}
              </button>
              {jot && (
                <button
                  onClick={() => setShowJotProfile(true)}
                  className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors"
                >
                  Jot
                </button>
              )}
              {post.user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <button
                onClick={() => navigate(`/profile/${post.userId}`)}
                className="hover:underline"
              >
                @{post.user.username}
              </button>
              <span>•</span>
              <button
                onClick={() => navigate(`/post/${post.id}`)}
                className="hover:underline"
              >
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </button>
              {jot && (
                <>
                  <span>•</span>
                  <span className="text-purple-600">
                    Energy: {(jot.energyLevel * 100).toFixed(0)}%
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <MoreHorizontal size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <button
          onClick={() => navigate(`/post/${post.id}`)}
          className="text-left w-full hover:opacity-90 transition-opacity"
        >
          <p className="text-gray-900 leading-relaxed">{post.content}</p>
        </button>
        {renderMedia()}
        {renderThread()}
      </div>

      {/* Algorithm Explanation */}
      {showAlgorithmInfo && post.algorithmScore && (
        <div className="mb-4">
          <AlgorithmExplanation score={post.algorithmScore} compact />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="text-sm">{post.likes + (isLiked ? 1 : 0)}</span>
          </button>
          
          <button 
            onClick={() => navigate(`/post/${post.id}`)}
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <MessageCircle size={20} />
            <span className="text-sm">{post.comments}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
            <Share size={20} />
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>
        
        <div className="text-xs text-gray-400">
          {post.type === 'thread' ? `Thread • ${post.threadPosts?.length} posts` : 
           post.type === 'image' ? 'Image' :
           post.type === 'video' ? 'Video' : 'Text'}
        </div>
      </div>

      {/* Jot Profile Modal */}
      {showJotProfile && jot && (
        <JotProfile 
          jot={jot} 
          onClose={() => setShowJotProfile(false)} 
        />
      )}
    </article>
  );
};
