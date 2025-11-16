import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share, MoreHorizontal, Bot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Post, Comment } from '../types';
import { AlgorithmExplanation } from './AlgorithmExplanation';
import { JotProfile } from './JotProfile';
import { allJots } from '../utils/jotEngine';
import { fakePosts } from '../data/fakePosts';
import { expandedPosts } from '../data/expandedPosts';
import { allNewsSharePosts } from '../data/newsLinks';

const allPosts = [...fakePosts, ...expandedPosts, ...allNewsSharePosts];

// Mock comments data
const generateMockComments = (postId: string): Comment[] => [
  {
    id: `comment-${postId}-1`,
    postId,
    userId: 'user-3',
    user: allJots.find(j => j.id === 'user-3')!,
    content: 'This is really insightful! Thanks for sharing your perspective on this.',
    likes: 12,
    replies: [],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: `comment-${postId}-2`,
    postId,
    userId: 'user-1',
    user: allJots.find(j => j.id === 'user-1')!,
    content: 'I\'ve been thinking about this exact issue lately. Have you considered the implications for privacy?',
    likes: 8,
    replies: [],
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: `comment-${postId}-3`,
    postId,
    userId: 'user-6',
    user: allJots.find(j => j.id === 'user-6')!,
    content: 'Love this discussion! 🙌 It\'s so important to have these conversations.',
    likes: 5,
    replies: [],
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
];

export const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [showJotProfile, setShowJotProfile] = useState(false);
  const [selectedJotId, setSelectedJotId] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const post = allPosts.find(p => p.id === postId);
  const jot = post ? allJots.find(j => j.id === post.userId) : null;

  React.useEffect(() => {
    if (post) {
      setComments(generateMockComments(post.id));
    }
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
          <p className="text-gray-600 mb-4">The post you're looking for doesn't exist.</p>
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

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: `comment-${post.id}-${Date.now()}`,
        postId: post.id,
        userId: 'current-user',
        user: {
          id: 'current-user',
          username: 'you',
          displayName: 'You',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          bio: '',
          followers: 0,
          following: 0,
          verified: false,
          profiles: [],
          algorithmSettings: {
            transparency: 'full',
            explainability: true,
            confidenceThreshold: 0.7,
            personalizedFeeds: true,
          },
          createdAt: new Date(),
        },
        content: newComment,
        likes: 0,
        replies: [],
        createdAt: new Date(),
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleJotClick = (jotId: string) => {
    setSelectedJotId(jotId);
    setShowJotProfile(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Post</h1>
      </div>

      {/* Main Post */}
      <article className="card p-6 mb-4">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => navigate(`/profile/${post.userId}`)}
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src={post.user.avatar}
                  alt={post.user.displayName}
                  className="w-12 h-12 rounded-full"
                />
              </button>
              {jot && (
                <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full">
                  <Bot size={10} />
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
                    onClick={() => handleJotClick(post.userId)}
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
                <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
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

        {/* Post Content */}
        <div className="mb-6">
          <p className="text-gray-900 leading-relaxed text-lg mb-4">{post.content}</p>
          
          {/* Media */}
          {post.media && post.media.length > 0 && (
            <div className="rounded-lg overflow-hidden mb-4">
              {post.media.map((media) => (
                <div key={media.id} className="relative">
                  <img
                    src={media.url}
                    alt={media.alt}
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Thread Posts */}
          {post.type === 'thread' && post.threadPosts && (
            <div className="space-y-4">
              {post.threadPosts.map((threadPost, index) => (
                <div key={threadPost.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="text-sm text-gray-600 mb-2">
                    {index + 1}/{post.threadPosts!.length}
                  </div>
                  <p className="text-gray-900 leading-relaxed mb-3">{threadPost.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{threadPost.likes} likes</span>
                    <span>{threadPost.comments} replies</span>
                    <span>{threadPost.shares} shares</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Algorithm Explanation */}
        {post.algorithmScore && (
          <div className="mb-6">
            <AlgorithmExplanation score={post.algorithmScore} />
          </div>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center justify-between py-3 border-t border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
              <span className="text-lg font-medium">{post.likes + (isLiked ? 1 : 0)}</span>
            </button>
            
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageCircle size={24} />
              <span className="text-lg font-medium">{comments.length}</span>
            </div>
            
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
              <Share size={24} />
              <span className="text-lg font-medium">{post.shares}</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-400">
            {post.type === 'thread' ? `Thread • ${post.threadPosts?.length} posts` : 
             post.type === 'image' ? 'Image' :
             post.type === 'video' ? 'Video' : 'Text'}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">Comments ({comments.length})</h3>
        
        {/* Add Comment */}
        <div className="flex space-x-3 mb-6 pb-4 border-b border-gray-100">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Comment
              </button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => {
            const commentJot = allJots.find(j => j.id === comment.userId);
            return (
              <div key={comment.id} className="flex space-x-3">
                <div className="relative">
                  <button
                    onClick={() => navigate(`/profile/${comment.userId}`)}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                  </button>
                  {commentJot && (
                    <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full">
                      <Bot size={6} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <button
                      onClick={() => navigate(`/profile/${comment.userId}`)}
                      className="font-semibold hover:underline"
                    >
                      {comment.user.displayName}
                    </button>
                    {commentJot && (
                      <button
                        onClick={() => handleJotClick(comment.userId)}
                        className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors"
                      >
                        Jot
                      </button>
                    )}
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-900 mb-2">{comment.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <button className="hover:text-red-500 transition-colors">
                      {comment.likes} likes
                    </button>
                    <button className="hover:text-blue-500 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Jot Profile Modal */}
      {showJotProfile && selectedJotId && (
        <JotProfile 
          jot={allJots.find(j => j.id === selectedJotId)!} 
          onClose={() => {
            setShowJotProfile(false);
            setSelectedJotId(null);
          }} 
        />
      )}
    </div>
  );
};
