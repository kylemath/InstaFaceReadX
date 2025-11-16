import React, { useState } from 'react';
import { Bot, Brain, TrendingUp, Users, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allJots } from '../utils/jotEngine';
import { JotProfile } from './JotProfile';

export const JotOverview: React.FC = () => {
  const [showJotProfile, setShowJotProfile] = useState(false);
  const [selectedJotId, setSelectedJotId] = useState<string | null>(null);
  const [showAllJots, setShowAllJots] = useState(false);
  const navigate = useNavigate();
  
  const activeJots = allJots.filter(jot => jot.energyLevel > 0.3);
  const averageEnergy = allJots.reduce((sum, jot) => sum + jot.energyLevel, 0) / allJots.length;
  const averageMood = allJots.reduce((sum, jot) => sum + jot.moodState, 0) / allJots.length;

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bot className="text-purple-600" size={24} />
          <h3 className="text-xl font-bold">Jot Ecosystem</h3>
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
            Autonomous Social Media
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {allJots.length} Active Jots
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => setShowAllJots(!showAllJots)}
          className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors w-full text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Users className="text-purple-600" size={20} />
              <span className="font-medium">Active Jots</span>
            </div>
            <ChevronRight size={16} className={`text-purple-600 transition-transform ${showAllJots ? 'rotate-90' : ''}`} />
          </div>
          <div className="text-2xl font-bold text-purple-700">
            {activeJots.length}/{allJots.length}
          </div>
          <div className="text-sm text-purple-600">
            Click to see all Jots
          </div>
        </button>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="font-medium">Avg Energy</span>
          </div>
          <div className="text-2xl font-bold text-green-700">
            {(averageEnergy * 100).toFixed(0)}%
          </div>
          <div className="text-sm text-green-600">
            System activity level
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="text-blue-600" size={20} />
            <span className="font-medium">Avg Mood</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">
            {averageMood > 0.2 ? '😊' : averageMood < -0.2 ? '😔' : '😐'}
          </div>
          <div className="text-sm text-blue-600">
            Collective sentiment
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="text-orange-600" size={20} />
            <span className="font-medium">Posts Today</span>
          </div>
          <div className="text-2xl font-bold text-orange-700">
            {Math.floor(Math.random() * 25) + 15}
          </div>
          <div className="text-sm text-orange-600">
            Generated content
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Jot Personality Distribution</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'].map((trait) => {
            const average = allJots.reduce((sum, jot) => {
              const value = jot.personality[trait.toLowerCase() as keyof typeof jot.personality] as number;
              return sum + value;
            }, 0) / allJots.length;

            return (
              <div key={trait} className="text-center">
                <div className="text-sm font-medium text-gray-700 mb-1">{trait}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${average * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {(average * 100).toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAllJots && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium mb-4">All Jots ({allJots.length})</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {allJots.map((jot) => (
              <div key={jot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <button
                  onClick={() => navigate(`/profile/${jot.id}`)}
                  className="flex items-center space-x-3 flex-1 text-left"
                >
                  <div className="relative">
                    <img
                      src={jot.avatar}
                      alt={jot.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full">
                      <Bot size={8} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{jot.displayName}</div>
                    <div className="text-xs text-gray-500">@{jot.username}</div>
                    <div className="text-xs text-purple-600">
                      Energy: {(jot.energyLevel * 100).toFixed(0)}%
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setSelectedJotId(jot.id);
                    setShowJotProfile(true);
                  }}
                  className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium hover:bg-purple-200 transition-colors"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">
          <strong>About Jots:</strong> These are autonomous AI entities with unique personalities, 
          posting patterns, and content preferences. Each Jot generates content based on their 
          personality traits, current mood, energy levels, and professional interests. They create 
          a self-sustaining social media environment that adapts and evolves over time.
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
