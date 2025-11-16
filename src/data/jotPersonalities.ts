import { JotPersonality, JotDemographics, JotBehaviorPatterns, JotContentStyle } from '../types/jot';

// Personality profiles for our 10 jots
export const jotPersonalities: Record<string, {
  personality: JotPersonality;
  demographics: JotDemographics;
  behaviorPatterns: JotBehaviorPatterns;
  contentStyle: JotContentStyle;
}> = {
  'user-1': { // Alex Chen - Tech Developer
    personality: {
      openness: 0.85,
      conscientiousness: 0.78,
      extraversion: 0.65,
      agreeableness: 0.72,
      neuroticism: 0.35,
      shareFrequency: 0.7,
      engagementLevel: 0.8,
      controversyTolerance: 0.4,
      trendFollowing: 0.9,
      authenticity: 0.8
    },
    demographics: {
      ageRange: '25-34',
      location: { country: 'USA', city: 'San Francisco', timezone: 'PST' },
      profession: 'Software Developer',
      educationLevel: 'bachelors',
      incomeLevel: 'upper_middle',
      relationshipStatus: 'dating',
      hasChildren: false,
      politicalLean: -0.3,
      religiosity: 0.2
    },
    behaviorPatterns: {
      postingTimes: [9, 12, 15, 18, 21], // Work breaks and evenings
      contentPreferences: { text: 0.6, images: 0.3, videos: 0.2, threads: 0.8, links: 0.9 },
      topicAffinities: {
        'javascript': 0.95, 'react': 0.9, 'ai': 0.85, 'open-source': 0.8, 'web-development': 0.9,
        'startups': 0.6, 'coffee': 0.7, 'photography': 0.5, 'hiking': 0.4, 'books': 0.6
      },
      interactionStyle: { likesGiven: 0.7, commentsGiven: 0.8, sharesGiven: 0.6, repliesGiven: 0.9 }
    },
    contentStyle: {
      writingStyle: {
        formality: 0.6, emotionality: 0.4, humor: 0.7, verbosity: 0.7, emojiUsage: 0.4, hashtagUsage: 0.3
      },
      visualStyle: {
        filterUsage: 0.2, compositionSkill: 0.7, colorPreference: 'blue', aestheticConsistency: 0.6
      }
    }
  },

  'user-2': { // Maria Rodriguez - Journalist
    personality: {
      openness: 0.9,
      conscientiousness: 0.85,
      extraversion: 0.7,
      agreeableness: 0.6,
      neuroticism: 0.5,
      shareFrequency: 0.8,
      engagementLevel: 0.9,
      controversyTolerance: 0.9,
      trendFollowing: 0.7,
      authenticity: 0.95
    },
    demographics: {
      ageRange: '35-44',
      location: { country: 'USA', city: 'New York', timezone: 'EST' },
      profession: 'Journalist',
      educationLevel: 'masters',
      incomeLevel: 'middle',
      relationshipStatus: 'married',
      hasChildren: true,
      politicalLean: -0.6,
      religiosity: 0.4
    },
    behaviorPatterns: {
      postingTimes: [6, 9, 13, 17, 20], // News cycle aligned
      contentPreferences: { text: 0.8, images: 0.4, videos: 0.3, threads: 0.9, links: 0.95 },
      topicAffinities: {
        'journalism': 0.95, 'politics': 0.9, 'technology': 0.8, 'privacy': 0.9, 'ethics': 0.85,
        'human-rights': 0.8, 'democracy': 0.9, 'media-literacy': 0.85, 'fact-checking': 0.9
      },
      interactionStyle: { likesGiven: 0.5, commentsGiven: 0.9, sharesGiven: 0.8, repliesGiven: 0.95 }
    },
    contentStyle: {
      writingStyle: {
        formality: 0.8, emotionality: 0.6, humor: 0.3, verbosity: 0.8, emojiUsage: 0.2, hashtagUsage: 0.4
      },
      visualStyle: {
        filterUsage: 0.1, compositionSkill: 0.8, colorPreference: 'red', aestheticConsistency: 0.7
      }
    }
  },

  'user-3': { // David Kim - Artist
    personality: {
      openness: 0.95,
      conscientiousness: 0.6,
      extraversion: 0.5,
      agreeableness: 0.8,
      neuroticism: 0.6,
      shareFrequency: 0.6,
      engagementLevel: 0.7,
      controversyTolerance: 0.3,
      trendFollowing: 0.8,
      authenticity: 0.9
    },
    demographics: {
      ageRange: '25-34',
      location: { country: 'South Korea', city: 'Seoul', timezone: 'KST' },
      profession: 'Digital Artist',
      educationLevel: 'bachelors',
      incomeLevel: 'middle',
      relationshipStatus: 'single',
      hasChildren: false,
      politicalLean: -0.2,
      religiosity: 0.3
    },
    behaviorPatterns: {
      postingTimes: [10, 14, 16, 19, 22], // Creative work schedule
      contentPreferences: { text: 0.4, images: 0.95, videos: 0.6, threads: 0.5, links: 0.4 },
      topicAffinities: {
        'design': 0.95, 'art': 0.9, 'creativity': 0.85, 'ui-ux': 0.9, 'digital-art': 0.95,
        'color-theory': 0.8, 'typography': 0.7, 'inspiration': 0.8, 'minimalism': 0.7
      },
      interactionStyle: { likesGiven: 0.8, commentsGiven: 0.6, sharesGiven: 0.7, repliesGiven: 0.7 }
    },
    contentStyle: {
      writingStyle: {
        formality: 0.4, emotionality: 0.7, humor: 0.5, verbosity: 0.5, emojiUsage: 0.6, hashtagUsage: 0.7
      },
      visualStyle: {
        filterUsage: 0.8, compositionSkill: 0.95, colorPreference: 'purple', aestheticConsistency: 0.9
      }
    }
  },

  'user-4': { // Dr. Sarah Johnson - Climate Scientist
    personality: {
      openness: 0.8,
      conscientiousness: 0.9,
      extraversion: 0.6,
      agreeableness: 0.7,
      neuroticism: 0.4,
      shareFrequency: 0.5,
      engagementLevel: 0.8,
      controversyTolerance: 0.8,
      trendFollowing: 0.4,
      authenticity: 0.95
    },
    demographics: {
      ageRange: '35-44',
      location: { country: 'Canada', city: 'Vancouver', timezone: 'PST' },
      profession: 'Climate Scientist',
      educationLevel: 'phd',
      incomeLevel: 'upper_middle',
      relationshipStatus: 'married',
      hasChildren: true,
      politicalLean: -0.4,
      religiosity: 0.3
    },
    behaviorPatterns: {
      postingTimes: [8, 12, 16, 19], // Academic schedule
      contentPreferences: { text: 0.7, images: 0.6, videos: 0.4, threads: 0.8, links: 0.9 },
      topicAffinities: {
        'climate-science': 0.95, 'research': 0.9, 'environment': 0.95, 'data-analysis': 0.8,
        'sustainability': 0.9, 'renewable-energy': 0.8, 'policy': 0.7, 'education': 0.8
      },
      interactionStyle: { likesGiven: 0.6, commentsGiven: 0.8, sharesGiven: 0.7, repliesGiven: 0.9 }
    },
    contentStyle: {
      writingStyle: {
        formality: 0.9, emotionality: 0.5, humor: 0.2, verbosity: 0.8, emojiUsage: 0.1, hashtagUsage: 0.3
      },
      visualStyle: {
        filterUsage: 0.1, compositionSkill: 0.6, colorPreference: 'green', aestheticConsistency: 0.5
      }
    }
  },

  'user-5': { // Mike Thompson - Gamer
    personality: {
      openness: 0.7,
      conscientiousness: 0.4,
      extraversion: 0.8,
      agreeableness: 0.6,
      neuroticism: 0.3,
      shareFrequency: 0.9,
      engagementLevel: 0.9,
      controversyTolerance: 0.7,
      trendFollowing: 0.9,
      authenticity: 0.7
    },
    demographics: {
      ageRange: '18-24',
      location: { country: 'USA', city: 'Austin', timezone: 'CST' },
      profession: 'Content Creator',
      educationLevel: 'some_college',
      incomeLevel: 'middle',
      relationshipStatus: 'single',
      hasChildren: false,
      politicalLean: 0.1,
      religiosity: 0.2
    },
    behaviorPatterns: {
      postingTimes: [11, 14, 17, 20, 23, 1], // Gaming schedule
      contentPreferences: { text: 0.5, images: 0.7, videos: 0.9, threads: 0.6, links: 0.5 },
      topicAffinities: {
        'gaming': 0.95, 'streaming': 0.9, 'esports': 0.85, 'technology': 0.7, 'reviews': 0.8,
        'memes': 0.8, 'movies': 0.6, 'music': 0.7, 'anime': 0.6
      },
      interactionStyle: { likesGiven: 0.9, commentsGiven: 0.8, sharesGiven: 0.8, repliesGiven: 0.8 }
    },
    contentStyle: {
      writingStyle: {
        formality: 0.2, emotionality: 0.8, humor: 0.9, verbosity: 0.4, emojiUsage: 0.8, hashtagUsage: 0.6
      },
      visualStyle: {
        filterUsage: 0.3, compositionSkill: 0.5, colorPreference: 'orange', aestheticConsistency: 0.4
      }
    }
  },

  'user-6': { // Elena Vasquez - Food Blogger
    personality: {
      openness: 0.8,
      conscientiousness: 0.7,
      extraversion: 0.9,
      agreeableness: 0.85,
      neuroticism: 0.3,
      shareFrequency: 0.8,
      engagementLevel: 0.9,
      controversyTolerance: 0.2,
      trendFollowing: 0.7,
      authenticity: 0.8
    },
    demographics: {
      ageRange: '25-34',
      location: { country: 'Spain', city: 'Barcelona', timezone: 'CET' },
      profession: 'Food Blogger',
      educationLevel: 'bachelors',
      incomeLevel: 'middle',
      relationshipStatus: 'married',
      hasChildren: false,
      politicalLean: -0.3,
      religiosity: 0.6
    },
    behaviorPatterns: {
      postingTimes: [8, 13, 16, 19, 21], // Meal times
      contentPreferences: { text: 0.5, images: 0.95, videos: 0.7, threads: 0.4, links: 0.6 },
      topicAffinities: {
        'cooking': 0.95, 'recipes': 0.9, 'restaurants': 0.85, 'food-photography': 0.9, 'culture': 0.8,
        'travel': 0.7, 'wine': 0.6, 'nutrition': 0.5, 'sustainability': 0.6
      },
      interactionStyle: { likesGiven: 0.9, commentsGiven: 0.8, sharesGiven: 0.7, repliesGiven: 0.9 }
    },
    contentStyle: {
      writingStyle: {
        formality: 0.5, emotionality: 0.8, humor: 0.6, verbosity: 0.6, emojiUsage: 0.9, hashtagUsage: 0.8
      },
      visualStyle: {
        filterUsage: 0.6, compositionSkill: 0.9, colorPreference: 'warm', aestheticConsistency: 0.8
      }
    }
  },

  'user-7': { // James Wilson - Fitness Coach
    personality: {
      openness: 0.6,
      conscientiousness: 0.9,
      extraversion: 0.8,
      agreeableness: 0.7,
      neuroticism: 0.2,
      shareFrequency: 0.7,
      engagementLevel: 0.8,
      controversyTolerance: 0.3,
      trendFollowing: 0.6,
      authenticity: 0.8
    },
    demographics: {
      ageRange: '35-44',
      location: { country: 'Australia', city: 'Sydney', timezone: 'AEST' },
      profession: 'Fitness Coach',
      educationLevel: 'bachelors',
      incomeLevel: 'middle',
      relationshipStatus: 'married',
      hasChildren: true,
      politicalLean: 0.2,
      religiosity: 0.4
    },
    behaviorPatterns: {
      postingTimes: [6, 9, 12, 17, 20], // Fitness schedule
      contentPreferences: { text: 0.6, images: 0.8, videos: 0.9, threads: 0.5, links: 0.4 },
      topicAffinities: {
        'fitness': 0.95, 'nutrition': 0.9, 'health': 0.85, 'motivation': 0.8, 'lifestyle': 0.7,
        'wellness': 0.8, 'sports': 0.7, 'mindfulness': 0.6
      },
      interactionStyle: { likesGiven: 0.8, commentsGiven: 0.7, sharesGiven: 0.6, repliesGiven: 0.8 }
    },
    contentStyle: {
      writingStyle: {
        formality: 0.5, emotionality: 0.7, humor: 0.4, verbosity: 0.5, emojiUsage: 0.7, hashtagUsage: 0.9
      },
      visualStyle: {
        filterUsage: 0.4, compositionSkill: 0.6, colorPreference: 'blue', aestheticConsistency: 0.6
      }
    }
  },

  'user-8': { // Aisha Patel - Student
    personality: {
      openness: 0.9,
      conscientiousness: 0.7,
      extraversion: 0.6,
      agreeableness: 0.8,
      neuroticism: 0.5,
      shareFrequency: 0.6,
      engagementLevel: 0.7,
      controversyTolerance: 0.4,
      trendFollowing: 0.8,
      authenticity: 0.8
    },
    demographics: {
      ageRange: '18-24',
      location: { country: 'India', city: 'Mumbai', timezone: 'IST' },
      profession: 'Student',
      educationLevel: 'some_college',
      incomeLevel: 'low',
      relationshipStatus: 'single',
      hasChildren: false,
      politicalLean: -0.5,
      religiosity: 0.5
    },
    behaviorPatterns: {
      postingTimes: [9, 13, 18, 21, 23], // Student schedule
      contentPreferences: { text: 0.7, images: 0.6, videos: 0.5, threads: 0.8, links: 0.8 },
      topicAffinities: {
        'machine-learning': 0.9, 'computer-science': 0.85, 'research': 0.8, 'social-impact': 0.9,
        'education': 0.8, 'diversity': 0.7, 'career-advice': 0.6, 'mental-health': 0.6
      },
      interactionStyle: { likesGiven: 0.7, commentsGiven: 0.8, sharesGiven: 0.6, repliesGiven: 0.8 }
    },
    contentStyle: {
      writingStyle: {
        formality: 0.6, emotionality: 0.6, humor: 0.5, verbosity: 0.7, emojiUsage: 0.5, hashtagUsage: 0.5
      },
      visualStyle: {
        filterUsage: 0.3, compositionSkill: 0.5, colorPreference: 'teal', aestheticConsistency: 0.5
      }
    }
  },

  'user-9': { // Robert Chen - Entrepreneur
    personality: {
      openness: 0.8,
      conscientiousness: 0.8,
      extraversion: 0.9,
      agreeableness: 0.6,
      neuroticism: 0.4,
      shareFrequency: 0.6,
      engagementLevel: 0.8,
      controversyTolerance: 0.5,
      trendFollowing: 0.9,
      authenticity: 0.7
    },
    demographics: {
      ageRange: '45-54',
      location: { country: 'Singapore', city: 'Singapore', timezone: 'SGT' },
      profession: 'Entrepreneur',
      educationLevel: 'masters',
      incomeLevel: 'high',
      relationshipStatus: 'married',
      hasChildren: true,
      politicalLean: 0.3,
      religiosity: 0.3
    },
    behaviorPatterns: {
      postingTimes: [7, 10, 14, 18, 22], // Business schedule
      contentPreferences: { text: 0.8, images: 0.4, videos: 0.3, threads: 0.7, links: 0.9 },
      topicAffinities: {
        'entrepreneurship': 0.95, 'startups': 0.9, 'venture-capital': 0.8, 'innovation': 0.85,
        'leadership': 0.8, 'business-strategy': 0.9, 'technology': 0.7, 'mentorship': 0.7
      },
      interactionStyle: { likesGiven: 0.6, commentsGiven: 0.7, sharesGiven: 0.8, repliesGiven: 0.7 }
    },
    contentStyle: {
      writingStyle: {
        formality: 0.8, emotionality: 0.4, humor: 0.3, verbosity: 0.7, emojiUsage: 0.2, hashtagUsage: 0.4
      },
      visualStyle: {
        filterUsage: 0.2, compositionSkill: 0.7, colorPreference: 'gold', aestheticConsistency: 0.7
      }
    }
  },

  'user-10': { // Lisa Anderson - Photographer
    personality: {
      openness: 0.9,
      conscientiousness: 0.6,
      extraversion: 0.7,
      agreeableness: 0.8,
      neuroticism: 0.4,
      shareFrequency: 0.8,
      engagementLevel: 0.7,
      controversyTolerance: 0.2,
      trendFollowing: 0.6,
      authenticity: 0.9
    },
    demographics: {
      ageRange: '25-34',
      location: { country: 'Japan', city: 'Tokyo', timezone: 'JST' },
      profession: 'Photographer',
      educationLevel: 'bachelors',
      incomeLevel: 'middle',
      relationshipStatus: 'single',
      hasChildren: false,
      politicalLean: -0.2,
      religiosity: 0.2
    },
    behaviorPatterns: {
      postingTimes: [8, 11, 15, 18, 20], // Photography golden hours
      contentPreferences: { text: 0.3, images: 0.95, videos: 0.6, threads: 0.3, links: 0.3 },
      topicAffinities: {
        'photography': 0.95, 'travel': 0.9, 'nature': 0.8, 'street-photography': 0.85,
        'storytelling': 0.8, 'culture': 0.7, 'minimalism': 0.6, 'light': 0.9
      },
      interactionStyle: { likesGiven: 0.9, commentsGiven: 0.6, sharesGiven: 0.5, repliesGiven: 0.7 }
    },
    contentStyle: {
      writingStyle: {
        formality: 0.4, emotionality: 0.8, humor: 0.4, verbosity: 0.4, emojiUsage: 0.6, hashtagUsage: 0.7
      },
      visualStyle: {
        filterUsage: 0.3, compositionSkill: 0.95, colorPreference: 'natural', aestheticConsistency: 0.9
      }
    }
  }
};
