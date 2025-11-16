import { Jot, JotPersonality, ContentTemplate, JotAction, JotPost } from '../types/jot';
import { Post, AlgorithmScore } from '../types';
import { fakeUsers } from '../data/fakeUsers';
import { jotPersonalities } from '../data/jotPersonalities';

// Convert regular users to Jots with personality data
export const createJotsFromUsers = (): Jot[] => {
  return fakeUsers.map(user => {
    const personalityData = jotPersonalities[user.id];
    
    return {
      ...user,
      isJot: true as const,
      ...personalityData,
      
      // Simulation state
      lastActiveTime: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000), // Last 24 hours
      energyLevel: Math.random(), // Random initial energy
      moodState: (Math.random() - 0.5) * 2, // -1 to 1
      currentContext: generateCurrentContext(personalityData.demographics.profession),
      
      // Learning system
      experienceMemory: [],
      adaptationRate: 0.1 + Math.random() * 0.4, // 0.1 to 0.5
      
      // Content generation
      contentTemplates: generateContentTemplates(personalityData.personality, personalityData.demographics.profession),
      recentTopics: []
    } as Jot;
  });
};

// Generate content templates based on personality and profession
const generateContentTemplates = (personality: JotPersonality, profession: string): ContentTemplate[] => {
  const baseTemplates: ContentTemplate[] = [
    // Professional insights
    {
      type: 'text',
      template: 'Just realized something important about {topic}: {insight}. This changes how I think about {related_field}.',
      topics: ['work', 'industry', 'trends'],
      mood: 0.3,
      formality: 0.7,
      triggers: ['work_hours', 'industry_news', 'learning']
    },
    
    // Personal sharing
    {
      type: 'text',
      template: '{personal_activity} today and it got me thinking about {reflection}. Sometimes the best insights come from unexpected places.',
      topics: ['lifestyle', 'personal'],
      mood: 0.5,
      formality: 0.3,
      triggers: ['weekend', 'personal_time', 'reflection']
    },
    
    // Opinion/Commentary
    {
      type: 'text',
      template: 'Hot take: {opinion}. I know this might be controversial, but hear me out... {reasoning}',
      topics: ['opinion', 'debate', 'industry'],
      mood: 0.0,
      formality: 0.5,
      triggers: ['controversy', 'debate', 'strong_opinion']
    },
    
    // Educational/Tips
    {
      type: 'text',
      template: '{profession} tip: {tip}. This simple change can make a huge difference in {outcome}.',
      topics: ['education', 'tips', 'professional'],
      mood: 0.4,
      formality: 0.6,
      triggers: ['teaching_moment', 'help_others', 'expertise']
    },
    
    // Achievement/Milestone
    {
      type: 'text',
      template: 'Exciting news! {achievement} 🎉 This has been {timeframe} in the making and I\'m grateful for {acknowledgment}.',
      topics: ['achievement', 'milestone', 'celebration'],
      mood: 0.8,
      formality: 0.5,
      triggers: ['success', 'milestone', 'celebration']
    },
    
    // Question/Engagement
    {
      type: 'text',
      template: 'Quick question for my network: {question} I\'m curious about your experiences with {topic}.',
      topics: ['question', 'community', 'learning'],
      mood: 0.2,
      formality: 0.4,
      triggers: ['community_engagement', 'learning', 'curiosity']
    }
  ];

  // Customize templates based on personality
  return baseTemplates.map(template => ({
    ...template,
    formality: template.formality * personality.conscientiousness,
    mood: template.mood * (1 - personality.neuroticism)
  }));
};

// Generate current context based on profession and time
const generateCurrentContext = (profession: string): string => {
  const contexts = {
    'Software Developer': ['coding session', 'debugging', 'code review', 'learning new tech', 'project planning'],
    'Journalist': ['researching story', 'interviewing sources', 'fact-checking', 'writing article', 'news analysis'],
    'Digital Artist': ['design project', 'creative exploration', 'client work', 'inspiration hunting', 'skill development'],
    'Climate Scientist': ['data analysis', 'research paper', 'field study', 'peer review', 'conference prep'],
    'Content Creator': ['content planning', 'video editing', 'community engagement', 'trend analysis', 'collaboration'],
    'Food Blogger': ['recipe testing', 'restaurant visit', 'food photography', 'content creation', 'ingredient sourcing'],
    'Fitness Coach': ['client training', 'workout planning', 'nutrition research', 'fitness education', 'health assessment'],
    'Student': ['studying', 'research project', 'group work', 'exam prep', 'internship search'],
    'Entrepreneur': ['strategy meeting', 'investor pitch', 'product development', 'market research', 'team building'],
    'Photographer': ['photo shoot', 'editing session', 'client meeting', 'location scouting', 'portfolio update']
  };

  const professionContexts = contexts[profession as keyof typeof contexts] || ['work', 'project', 'meeting'];
  return professionContexts[Math.floor(Math.random() * professionContexts.length)];
};

// Simulate Jot behavior and content generation
export class JotSimulator {
  private jots: Jot[];
  private globalTrends: string[] = ['ai', 'sustainability', 'remote-work', 'mental-health', 'technology'];

  constructor(jots: Jot[]) {
    this.jots = jots;
  }

  // Simulate a time period and generate actions
  simulateTimeStep(hours: number = 1): JotAction[] {
    const actions: JotAction[] = [];
    const currentTime = new Date();

    this.jots.forEach(jot => {
      // Update jot state
      this.updateJotState(jot, hours);

      // Determine if jot should take action
      if (this.shouldJotAct(jot, currentTime)) {
        const action = this.generateJotAction(jot, currentTime);
        if (action) {
          actions.push(action);
          this.applyActionToJot(jot, action);
        }
      }
    });

    return actions;
  }

  private updateJotState(jot: Jot, hours: number): void {
    // Update energy based on personality and time
    const energyDecay = 0.1 * hours;
    const personalityBoost = jot.personality.extraversion * 0.05;
    jot.energyLevel = Math.max(0, Math.min(1, jot.energyLevel - energyDecay + personalityBoost));

    // Update mood based on recent experiences and personality
    const moodStability = 1 - jot.personality.neuroticism;
    const moodChange = (Math.random() - 0.5) * 0.2 * (1 - moodStability);
    jot.moodState = Math.max(-1, Math.min(1, jot.moodState + moodChange));

    // Update context occasionally
    if (Math.random() < 0.3) {
      jot.currentContext = generateCurrentContext(jot.demographics.profession);
    }
  }

  private shouldJotAct(jot: Jot, currentTime: Date): boolean {
    const hour = currentTime.getHours();
    const isActiveHour = jot.behaviorPatterns.postingTimes.includes(hour);
    const energyThreshold = 0.3;
    const randomFactor = Math.random();
    
    return isActiveHour && 
           jot.energyLevel > energyThreshold && 
           randomFactor < jot.personality.shareFrequency;
  }

  private generateJotAction(jot: Jot, timestamp: Date): JotAction | null {
    // Choose action type based on personality
    const actionTypes = ['create_post', 'engage_with_post'];
    const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)] as 'create_post' | 'engage_with_post';

    if (actionType === 'create_post') {
      return {
        type: 'create_post',
        jotId: jot.id,
        timestamp,
        context: {
          mood: jot.moodState,
          energy: jot.energyLevel,
          currentContext: jot.currentContext,
          selectedTemplate: this.selectContentTemplate(jot)
        },
        success: true,
        impact: 0.1
      };
    }

    return null;
  }

  private selectContentTemplate(jot: Jot): ContentTemplate {
    // Filter templates based on current mood and context
    const suitableTemplates = jot.contentTemplates.filter(template => {
      const moodMatch = Math.abs(template.mood - jot.moodState) < 0.5;
      const contextMatch = template.triggers.some(trigger => 
        jot.currentContext.includes(trigger.replace('_', ' '))
      );
      return moodMatch || contextMatch;
    });

    return suitableTemplates.length > 0 
      ? suitableTemplates[Math.floor(Math.random() * suitableTemplates.length)]
      : jot.contentTemplates[0];
  }

  private applyActionToJot(jot: Jot, action: JotAction): void {
    // Update jot state based on action
    jot.energyLevel = Math.max(0, jot.energyLevel - 0.1);
    jot.lastActiveTime = action.timestamp;

    // Add to memory
    jot.experienceMemory.push({
      timestamp: action.timestamp,
      event: action.type,
      context: action.context,
      emotionalImpact: action.success ? 0.1 : -0.1,
      learningValue: 0.05
    });

    // Keep memory manageable
    if (jot.experienceMemory.length > 100) {
      jot.experienceMemory = jot.experienceMemory.slice(-50);
    }
  }

  // Generate actual content from templates
  generateContentFromTemplate(jot: Jot, template: ContentTemplate): string {
    let content = template.template;
    
    // Replace placeholders based on jot's interests and context
    const interests = Object.keys(jot.behaviorPatterns.topicAffinities);
    const topInterest = interests.reduce((a, b) => 
      jot.behaviorPatterns.topicAffinities[a] > jot.behaviorPatterns.topicAffinities[b] ? a : b
    );

    const replacements = {
      '{topic}': topInterest.replace('-', ' '),
      '{profession}': jot.demographics.profession,
      '{insight}': this.generateInsight(jot),
      '{opinion}': this.generateOpinion(jot),
      '{achievement}': this.generateAchievement(jot),
      '{question}': this.generateQuestion(jot),
      '{tip}': this.generateTip(jot),
      '{personal_activity}': this.generatePersonalActivity(jot),
      '{reflection}': this.generateReflection(jot)
    };

    Object.entries(replacements).forEach(([placeholder, replacement]) => {
      content = content.replace(placeholder, replacement);
    });

    return content;
  }

  private generateInsight(jot: Jot): string {
    const insights = [
      'the importance of user-centered design',
      'how small changes can have big impacts',
      'the power of community-driven development',
      'why transparency builds trust',
      'how data tells compelling stories'
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  }

  private generateOpinion(jot: Jot): string {
    const opinions = [
      'remote work is here to stay and companies need to adapt',
      'AI will augment human creativity, not replace it',
      'sustainable practices should be the default, not an option',
      'transparency in algorithms is a fundamental right',
      'diversity in teams leads to better products'
    ];
    return opinions[Math.floor(Math.random() * opinions.length)];
  }

  private generateAchievement(jot: Jot): string {
    const achievements = [
      'launched my new project',
      'hit a major milestone',
      'completed a challenging course',
      'spoke at an industry conference',
      'published my research'
    ];
    return achievements[Math.floor(Math.random() * achievements.length)];
  }

  private generateQuestion(jot: Jot): string {
    const questions = [
      'What tools do you use for productivity?',
      'How do you stay updated with industry trends?',
      'What\'s your biggest professional challenge?',
      'How do you balance work and personal life?',
      'What advice would you give to newcomers?'
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }

  private generateTip(jot: Jot): string {
    const tips = [
      'Always version control your work',
      'Take breaks to maintain creativity',
      'Ask for feedback early and often',
      'Document your processes',
      'Invest in learning new skills'
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  }

  private generatePersonalActivity(jot: Jot): string {
    const activities = [
      'Went for a walk',
      'Read an interesting book',
      'Had coffee with a friend',
      'Tried a new restaurant',
      'Attended a workshop'
    ];
    return activities[Math.floor(Math.random() * activities.length)];
  }

  private generateReflection(jot: Jot): string {
    const reflections = [
      'the importance of continuous learning',
      'how connections shape our perspectives',
      'why stepping outside comfort zones matters',
      'the value of diverse viewpoints',
      'how small moments can spark big ideas'
    ];
    return reflections[Math.floor(Math.random() * reflections.length)];
  }
}

// Create and export jot instances
export const allJots = createJotsFromUsers();
export const jotSimulator = new JotSimulator(allJots);
