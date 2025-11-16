import React, { useState } from 'react';
import { Sliders, Info, RefreshCw, Save, Eye, EyeOff } from 'lucide-react';
import { AlgorithmWeights, FeedSettings } from '../types';
import { useAuthStore } from '../stores/authStore';

interface AlgorithmControlsProps {
  onSettingsChange: (settings: FeedSettings) => void;
  onWeightsChange: (weights: AlgorithmWeights) => void;
}

export const AlgorithmControls: React.FC<AlgorithmControlsProps> = ({
  onSettingsChange,
  onWeightsChange,
}) => {
  const { user, currentProfile } = useAuthStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExplanations, setShowExplanations] = useState(true);
  
  const [weights, setWeights] = useState<AlgorithmWeights>(
    currentProfile?.algorithmWeights || {
      recency: 0.3,
      engagement: 0.25,
      relevance: 0.25,
      diversity: 0.1,
      socialSignals: 0.1,
    }
  );

  const [feedSettings, setFeedSettings] = useState<FeedSettings>({
    algorithm: 'personalized',
    showExplanations: true,
    showConfidence: true,
    contentTypes: ['text', 'image', 'video', 'thread'],
    timeRange: 'week',
  });

  const handleWeightChange = (factor: keyof AlgorithmWeights, value: number) => {
    const newWeights = { ...weights, [factor]: value };
    setWeights(newWeights);
    onWeightsChange(newWeights);
  };

  const handleSettingChange = (setting: keyof FeedSettings, value: any) => {
    const newSettings = { ...feedSettings, [setting]: value };
    setFeedSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const resetToDefaults = () => {
    const defaultWeights = {
      recency: 0.3,
      engagement: 0.25,
      relevance: 0.25,
      diversity: 0.1,
      socialSignals: 0.1,
    };
    setWeights(defaultWeights);
    onWeightsChange(defaultWeights);
  };

  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);

  return (
    <div className="card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Sliders size={20} className="text-primary-600" />
          <h3 className="font-semibold">Algorithm Controls</h3>
          <div className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
            Open & Transparent
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn-secondary text-sm"
        >
          {isExpanded ? 'Hide' : 'Show'} Controls
        </button>
      </div>

      {/* Quick toggles */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={() => {
            const newValue = !feedSettings.showExplanations;
            setShowExplanations(newValue);
            handleSettingChange('showExplanations', newValue);
          }}
          className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
            showExplanations
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {showExplanations ? <Eye size={16} /> : <EyeOff size={16} />}
          <span>Algorithm Explanations</span>
        </button>

        <select
          value={feedSettings.algorithm}
          onChange={(e) => handleSettingChange('algorithm', e.target.value)}
          className="input text-sm py-1"
        >
          <option value="personalized">Personalized</option>
          <option value="chronological">Chronological</option>
          <option value="engagement">Most Engaging</option>
          <option value="custom">Custom Weights</option>
        </select>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Algorithm Weights */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Algorithm Weights</h4>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${totalWeight === 1 ? 'text-green-600' : 'text-orange-600'}`}>
                  Total: {totalWeight.toFixed(2)}
                </span>
                <button
                  onClick={resetToDefaults}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                >
                  <RefreshCw size={14} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(weights).map(([factor, weight]) => (
                <div key={factor} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium capitalize">
                      {factor.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <span className="text-sm text-gray-600">{weight.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={weight}
                    onChange={(e) => handleWeightChange(factor as keyof AlgorithmWeights, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-xs text-gray-500">
                    {factor === 'recency' && 'How much to prioritize recent posts'}
                    {factor === 'engagement' && 'Weight given to likes, comments, shares'}
                    {factor === 'relevance' && 'How well content matches your interests'}
                    {factor === 'diversity' && 'Variety of content types and topics'}
                    {factor === 'socialSignals' && 'Content from people you follow/trust'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Filters */}
          <div>
            <h4 className="font-medium mb-3">Content Filters</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Time Range</label>
                <select
                  value={feedSettings.timeRange}
                  onChange={(e) => handleSettingChange('timeRange', e.target.value)}
                  className="input text-sm"
                >
                  <option value="hour">Last Hour</option>
                  <option value="day">Last 24 Hours</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Content Types</label>
                <div className="space-y-1">
                  {['text', 'image', 'video', 'thread'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={feedSettings.contentTypes.includes(type as any)}
                        onChange={(e) => {
                          const types = e.target.checked
                            ? [...feedSettings.contentTypes, type as any]
                            : feedSettings.contentTypes.filter(t => t !== type);
                          handleSettingChange('contentTypes', types);
                        }}
                        className="rounded"
                      />
                      <span className="text-sm capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save Settings */}
          {user && (
            <div className="flex justify-end">
              <button className="btn-primary flex items-center space-x-2">
                <Save size={16} />
                <span>Save to Profile</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
