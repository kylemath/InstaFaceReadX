import React, { useState } from 'react';
import { Bot, Brain, TrendingUp, Clock, Users, Target, Shuffle, Heart } from 'lucide-react';
import { Jot } from '../types/jot';

interface JotProfileProps {
  jot: Jot;
  onClose: () => void;
}

export const JotProfile: React.FC<JotProfileProps> = ({ jot, onClose }) => {
  const [activeTab, setActiveTab] = useState<'personality' | 'behavior' | 'content'>('personality');

  const getPersonalityColor = (value: number) => {
    if (value >= 0.7) return 'bg-green-500';
    if (value >= 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const PersonalityBar = ({ label, value, description }: { label: string; value: number; description: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-600">{(value * 100).toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${getPersonalityColor(value)}`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={jot.avatar}
                  alt={jot.displayName}
                  className="w-16 h-16 rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full">
                  <Bot size={12} />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold">{jot.displayName}</h2>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    Jot
                  </span>
                  {jot.verified && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600">@{jot.username}</p>
                <p className="text-sm text-gray-500 mt-1">{jot.bio}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Demographics Quick Info */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Age:</span>
              <span className="ml-2 font-medium">{jot.demographics.ageRange}</span>
            </div>
            <div>
              <span className="text-gray-500">Location:</span>
              <span className="ml-2 font-medium">{jot.demographics.city}</span>
            </div>
            <div>
              <span className="text-gray-500">Profession:</span>
              <span className="ml-2 font-medium">{jot.demographics.profession}</span>
            </div>
            <div>
              <span className="text-gray-500">Energy:</span>
              <span className="ml-2 font-medium">{(jot.energyLevel * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'personality', label: 'Personality', icon: Brain },
              { id: 'behavior', label: 'Behavior', icon: TrendingUp },
              { id: 'content', label: 'Content Style', icon: Heart }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'personality' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Core Personality Traits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PersonalityBar
                    label="Openness"
                    value={jot.personality.openness}
                    description="Open to new experiences vs traditional"
                  />
                  <PersonalityBar
                    label="Conscientiousness"
                    value={jot.personality.conscientiousness}
                    description="Organized and disciplined vs spontaneous"
                  />
                  <PersonalityBar
                    label="Extraversion"
                    value={jot.personality.extraversion}
                    description="Outgoing and social vs introverted"
                  />
                  <PersonalityBar
                    label="Agreeableness"
                    value={jot.personality.agreeableness}
                    description="Cooperative and trusting vs competitive"
                  />
                  <PersonalityBar
                    label="Neuroticism"
                    value={jot.personality.neuroticism}
                    description="Anxious and sensitive vs calm and resilient"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Social Media Traits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PersonalityBar
                    label="Share Frequency"
                    value={jot.personality.shareFrequency}
                    description="How often they post content"
                  />
                  <PersonalityBar
                    label="Engagement Level"
                    value={jot.personality.engagementLevel}
                    description="How much they interact with others"
                  />
                  <PersonalityBar
                    label="Controversy Tolerance"
                    value={jot.personality.controversyTolerance}
                    description="Willingness to engage in debates"
                  />
                  <PersonalityBar
                    label="Trend Following"
                    value={jot.personality.trendFollowing}
                    description="Early adopter vs late adopter"
                  />
                  <PersonalityBar
                    label="Authenticity"
                    value={jot.personality.authenticity}
                    description="Genuine vs performative posting"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'behavior' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Posting Patterns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Active Hours</h4>
                    <div className="flex flex-wrap gap-2">
                      {jot.behaviorPatterns.postingTimes.map(hour => (
                        <span
                          key={hour}
                          className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm"
                        >
                          {hour}:00
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Content Preferences</h4>
                    <div className="space-y-2">
                      {Object.entries(jot.behaviorPatterns.contentPreferences).map(([type, preference]) => (
                        <div key={type} className="flex items-center justify-between">
                          <span className="capitalize text-sm">{type}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-500 h-2 rounded-full"
                                style={{ width: `${preference * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600 w-8">
                              {(preference * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Top Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(jot.behaviorPatterns.topicAffinities)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 10)
                    .map(([topic, affinity]) => (
                      <span
                        key={topic}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                      >
                        <span>{topic.replace('-', ' ')}</span>
                        <span className="text-xs text-gray-500">
                          {(affinity * 100).toFixed(0)}%
                        </span>
                      </span>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Interaction Style</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(jot.behaviorPatterns.interactionStyle).map(([type, level]) => (
                    <div key={type} className="text-center">
                      <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-primary-600 font-bold">
                          {(level * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 capitalize">
                        {type.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Writing Style</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(jot.contentStyle.writingStyle).map(([trait, value]) => (
                    <PersonalityBar
                      key={trait}
                      label={trait.charAt(0).toUpperCase() + trait.slice(1).replace(/([A-Z])/g, ' $1')}
                      value={value}
                      description={getWritingStyleDescription(trait)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Visual Style</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(jot.contentStyle.visualStyle).map(([trait, value]) => {
                    if (typeof value === 'number') {
                      return (
                        <PersonalityBar
                          key={trait}
                          label={trait.charAt(0).toUpperCase() + trait.slice(1).replace(/([A-Z])/g, ' $1')}
                          value={value}
                          description={getVisualStyleDescription(trait)}
                        />
                      );
                    }
                    return (
                      <div key={trait}>
                        <span className="text-sm font-medium">
                          {trait.charAt(0).toUpperCase() + trait.slice(1).replace(/([A-Z])/g, ' $1')}:
                        </span>
                        <span className="ml-2 text-sm text-gray-600 capitalize">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Current State</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-600">Current Context</h4>
                    <p className="text-lg font-semibold capitalize">{jot.currentContext}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-600">Mood State</h4>
                    <p className="text-lg font-semibold">
                      {jot.moodState > 0.3 ? '😊 Positive' : 
                       jot.moodState < -0.3 ? '😔 Negative' : '😐 Neutral'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-600">Last Active</h4>
                    <p className="text-lg font-semibold">
                      {new Date(jot.lastActiveTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getWritingStyleDescription = (trait: string): string => {
  const descriptions = {
    formality: 'Casual and conversational vs formal and professional',
    emotionality: 'Neutral tone vs emotional and expressive',
    humor: 'Serious and straightforward vs humorous and playful',
    verbosity: 'Concise and brief vs detailed and elaborate',
    emojiUsage: 'No emojis vs frequent emoji use',
    hashtagUsage: 'No hashtags vs hashtag-heavy posts'
  };
  return descriptions[trait as keyof typeof descriptions] || '';
};

const getVisualStyleDescription = (trait: string): string => {
  const descriptions = {
    filterUsage: 'Natural photos vs heavily filtered images',
    compositionSkill: 'Basic composition vs expert photography skills',
    aestheticConsistency: 'Random visual style vs curated aesthetic'
  };
  return descriptions[trait as keyof typeof descriptions] || '';
};
