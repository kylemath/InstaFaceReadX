import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, Target, TrendingUp, Users, Clock, Shuffle } from 'lucide-react';
import { AlgorithmScore } from '../types';

interface AlgorithmExplanationProps {
  score: AlgorithmScore;
  compact?: boolean;
}

const getFactorIcon = (factorName: string) => {
  switch (factorName.toLowerCase()) {
    case 'relevance':
      return <Target size={16} />;
    case 'engagement':
      return <TrendingUp size={16} />;
    case 'social signals':
      return <Users size={16} />;
    case 'recency':
      return <Clock size={16} />;
    case 'diversity':
      return <Shuffle size={16} />;
    default:
      return <Info size={16} />;
  }
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 0.8) return 'text-green-600 bg-green-100';
  if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
};

const getScoreColor = (score: number) => {
  if (score >= 0.7) return 'text-green-600';
  if (score >= 0.5) return 'text-yellow-600';
  return 'text-red-600';
};

export const AlgorithmExplanation: React.FC<AlgorithmExplanationProps> = ({ 
  score, 
  compact = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (compact) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(score.confidence)}`}>
          {Math.round(score.confidence * 100)}% confident
        </div>
        <span className={`font-medium ${getScoreColor(score.totalScore)}`}>
          Score: {score.totalScore.toFixed(2)}
        </span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-600 hover:text-primary-700"
        >
          <Info size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Info className="text-primary-600" size={20} />
          <div>
            <h4 className="font-medium">Why you're seeing this</h4>
            <p className="text-sm text-gray-600">{score.explanation.primary}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(score.confidence)}`}>
            {Math.round(score.confidence * 100)}% confident
          </div>
          <span className={`text-lg font-bold ${getScoreColor(score.totalScore)}`}>
            {score.totalScore.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        {score.factors.map((factor, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getFactorIcon(factor.name)}
              <span className="text-sm font-medium">{factor.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${factor.contribution * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                +{factor.contribution.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
      >
        <span>{isExpanded ? 'Less details' : 'More details'}</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="space-y-2">
            <div>
              <h5 className="font-medium text-sm mb-1">Algorithm Reasoning:</h5>
              <p className="text-sm text-gray-700">{score.explanation.reasoning}</p>
            </div>
            <div>
              <h5 className="font-medium text-sm mb-1">Contributing Factors:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                {score.factors.map((factor, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary-600 font-medium">•</span>
                    <span>
                      <strong>{factor.name}:</strong> {factor.description} 
                      (Weight: {factor.weight.toFixed(2)}, Contribution: +{factor.contribution.toFixed(2)})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
