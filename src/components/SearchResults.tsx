import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Bot, ArrowLeft } from 'lucide-react';
import { allJots } from '../utils/jotEngine';
import { fakePosts } from '../data/fakePosts';
import { expandedPosts } from '../data/expandedPosts';
import { allNewsSharePosts } from '../data/newsLinks';
import { PostCard } from './PostCard';

const allPosts = [...fakePosts, ...expandedPosts, ...allNewsSharePosts];

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  // Search users
  const userResults = allJots.filter(jot => 
    jot.displayName.toLowerCase().includes(query.toLowerCase()) ||
    jot.username.toLowerCase().includes(query.toLowerCase()) ||
    jot.bio.toLowerCase().includes(query.toLowerCase()) ||
    jot.demographics.profession.toLowerCase().includes(query.toLowerCase()) ||
    Object.keys(jot.behaviorPatterns.topicAffinities).some(topic => 
      topic.toLowerCase().includes(query.toLowerCase())
    )
  );

  // Search posts
  const postResults = allPosts.filter(post =>
    post.content.toLowerCase().includes(query.toLowerCase()) ||
    (post.threadPosts && post.threadPosts.some(tp => 
      tp.content.toLowerCase().includes(query.toLowerCase())
    ))
  ).slice(0, 10); // Limit to 10 results

  if (!query) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Search</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">Enter a search term to find users and posts</p>
        </div>
      </div>
    );
  }

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
        <div>
          <h1 className="text-xl font-bold">Search Results</h1>
          <p className="text-sm text-gray-500">"{query}"</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Users Section */}
        {userResults.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Users ({userResults.length})</h2>
            <div className="space-y-3">
              {userResults.map((user) => (
                <button
                  key={user.id}
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="w-full flex items-center space-x-3 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.displayName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full">
                      <Bot size={10} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{user.displayName}</h3>
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        Jot
                      </span>
                      {user.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">@{user.username}</p>
                    <p className="text-gray-500 text-sm line-clamp-1">{user.bio}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>{user.followers} followers</span>
                      <span>{user.demographics.profession}</span>
                      <span>Energy: {(user.energyLevel * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Posts Section */}
        {postResults.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Posts ({postResults.length})</h2>
            <div className="space-y-4">
              {postResults.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  showAlgorithmInfo={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {userResults.length === 0 && postResults.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600">
              No users or posts match your search for "{query}". Try a different search term.
            </p>
          </div>
        )}

        {/* Search Suggestions */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Try searching for:</h3>
          <div className="flex flex-wrap gap-2">
            {['AI', 'design', 'climate', 'photography', 'startup', 'fitness', 'journalism'].map((term) => (
              <button
                key={term}
                onClick={() => navigate(`/search?q=${term}`)}
                className="bg-white px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
