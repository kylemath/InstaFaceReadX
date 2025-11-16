import { NewsLink, Post } from '../types/jot';
import { fakeUsers } from './fakeUsers';
import { jotPersonalities } from './jotPersonalities';

// Realistic news sources and their bias/credibility
const newsSources = [
  { name: 'TechCrunch', credibility: 0.8, politicalLean: 0.1, domain: 'techcrunch.com' },
  { name: 'The Verge', credibility: 0.85, politicalLean: 0.0, domain: 'theverge.com' },
  { name: 'Ars Technica', credibility: 0.9, politicalLean: -0.1, domain: 'arstechnica.com' },
  { name: 'MIT Technology Review', credibility: 0.95, politicalLean: 0.0, domain: 'technologyreview.com' },
  { name: 'Wired', credibility: 0.85, politicalLean: -0.2, domain: 'wired.com' },
  { name: 'Reuters', credibility: 0.95, politicalLean: 0.0, domain: 'reuters.com' },
  { name: 'Associated Press', credibility: 0.95, politicalLean: 0.0, domain: 'apnews.com' },
  { name: 'BBC News', credibility: 0.9, politicalLean: -0.1, domain: 'bbc.com' },
  { name: 'The Guardian', credibility: 0.8, politicalLean: -0.4, domain: 'theguardian.com' },
  { name: 'Wall Street Journal', credibility: 0.85, politicalLean: 0.3, domain: 'wsj.com' },
  { name: 'NPR', credibility: 0.9, politicalLean: -0.2, domain: 'npr.org' },
  { name: 'Scientific American', credibility: 0.9, politicalLean: -0.1, domain: 'scientificamerican.com' },
  { name: 'Nature', credibility: 0.95, politicalLean: 0.0, domain: 'nature.com' },
  { name: 'Harvard Business Review', credibility: 0.85, politicalLean: 0.1, domain: 'hbr.org' },
  { name: 'Fast Company', credibility: 0.75, politicalLean: -0.1, domain: 'fastcompany.com' }
];

// Generate realistic news articles based on user interests
export const generateNewsLinks = (): NewsLink[] => [
  // Tech/AI News
  {
    id: 'news-1',
    url: 'https://techcrunch.com/2024/01/15/openai-announces-gpt-5-breakthrough-reasoning/',
    title: 'OpenAI Announces GPT-5 with Breakthrough Reasoning Capabilities',
    description: 'The new model shows significant improvements in logical reasoning, mathematics, and code generation, raising questions about AI safety and regulation.',
    source: 'TechCrunch',
    publishedAt: new Date('2024-01-15T10:30:00Z'),
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
    readingTime: 8,
    credibilityScore: 0.8,
    politicalLean: 0.1,
    emotionalTone: 0.2
  },
  {
    id: 'news-2',
    url: 'https://arstechnica.com/tech-policy/2024/01/14/eu-passes-comprehensive-ai-regulation-act/',
    title: 'European Union Passes Comprehensive AI Regulation Act',
    description: 'The landmark legislation establishes strict guidelines for AI development and deployment, with significant penalties for non-compliance.',
    source: 'Ars Technica',
    publishedAt: new Date('2024-01-14T14:20:00Z'),
    category: 'Policy',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop',
    readingTime: 12,
    credibilityScore: 0.9,
    politicalLean: -0.1,
    emotionalTone: 0.0
  },
  {
    id: 'news-3',
    url: 'https://wired.com/2024/01/13/social-media-algorithms-mental-health-study/',
    title: 'New Study Links Social Media Algorithms to Increased Anxiety in Teens',
    description: 'Researchers find correlation between algorithmic content curation and mental health issues, calling for more transparent recommendation systems.',
    source: 'Wired',
    publishedAt: new Date('2024-01-13T16:45:00Z'),
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
    readingTime: 6,
    credibilityScore: 0.85,
    politicalLean: -0.2,
    emotionalTone: -0.3
  },

  // Climate/Environment News
  {
    id: 'news-4',
    url: 'https://nature.com/2024/01/12/arctic-ice-loss-accelerating-climate-models/',
    title: 'Arctic Ice Loss Accelerating Beyond Climate Model Predictions',
    description: 'New satellite data reveals ice sheet melting rates are 40% higher than previously estimated, with implications for sea level rise.',
    source: 'Nature',
    publishedAt: new Date('2024-01-12T09:15:00Z'),
    category: 'Climate',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
    readingTime: 10,
    credibilityScore: 0.95,
    politicalLean: 0.0,
    emotionalTone: -0.4
  },
  {
    id: 'news-5',
    url: 'https://reuters.com/2024/01/11/renewable-energy-breakthrough-solar-efficiency/',
    title: 'Scientists Achieve Record-Breaking Solar Panel Efficiency of 47%',
    description: 'New perovskite-silicon tandem cells could revolutionize renewable energy adoption and significantly reduce costs.',
    source: 'Reuters',
    publishedAt: new Date('2024-01-11T11:30:00Z'),
    category: 'Energy',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=200&fit=crop',
    readingTime: 5,
    credibilityScore: 0.95,
    politicalLean: 0.0,
    emotionalTone: 0.6
  },

  // Business/Startup News
  {
    id: 'news-6',
    url: 'https://hbr.org/2024/01/10/venture-capital-ai-startups-bubble-warning/',
    title: 'Is the AI Startup Bubble About to Burst? VCs Weigh In',
    description: 'Veteran investors warn of overvaluation in AI sector as funding rounds reach unprecedented levels despite unproven business models.',
    source: 'Harvard Business Review',
    publishedAt: new Date('2024-01-10T13:20:00Z'),
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
    readingTime: 9,
    credibilityScore: 0.85,
    politicalLean: 0.1,
    emotionalTone: -0.2
  },
  {
    id: 'news-7',
    url: 'https://fastcompany.com/2024/01/09/remote-work-productivity-study-surprising-results/',
    title: 'Surprising Results: Remote Workers 23% More Productive Than Office Workers',
    description: 'Comprehensive study of 50,000 employees challenges assumptions about workplace productivity and collaboration.',
    source: 'Fast Company',
    publishedAt: new Date('2024-01-09T15:45:00Z'),
    category: 'Workplace',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=200&fit=crop',
    readingTime: 7,
    credibilityScore: 0.75,
    politicalLean: -0.1,
    emotionalTone: 0.3
  },

  // Design/Creative News
  {
    id: 'news-8',
    url: 'https://theverge.com/2024/01/08/design-systems-ai-automated-generation/',
    title: 'AI-Powered Design Systems Could Revolutionize UX/UI Development',
    description: 'New tools automatically generate consistent design components, but designers worry about creativity and job displacement.',
    source: 'The Verge',
    publishedAt: new Date('2024-01-08T12:10:00Z'),
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
    readingTime: 6,
    credibilityScore: 0.85,
    politicalLean: 0.0,
    emotionalTone: 0.1
  },

  // Health/Fitness News
  {
    id: 'news-9',
    url: 'https://scientificamerican.com/2024/01/07/exercise-brain-health-neuroplasticity/',
    title: 'Exercise Shown to Boost Brain Plasticity More Than Previously Thought',
    description: 'New research reveals how physical activity triggers neurogenesis and improves cognitive function across all age groups.',
    source: 'Scientific American',
    publishedAt: new Date('2024-01-07T08:30:00Z'),
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
    readingTime: 8,
    credibilityScore: 0.9,
    politicalLean: -0.1,
    emotionalTone: 0.4
  },

  // Food/Culture News
  {
    id: 'news-10',
    url: 'https://bbc.com/2024/01/06/sustainable-food-technology-lab-grown-meat/',
    title: 'Lab-Grown Meat Receives Approval in Major European Markets',
    description: 'Cultured meat products clear regulatory hurdles, promising more sustainable protein sources with reduced environmental impact.',
    source: 'BBC News',
    publishedAt: new Date('2024-01-06T14:15:00Z'),
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=200&fit=crop',
    readingTime: 5,
    credibilityScore: 0.9,
    politicalLean: -0.1,
    emotionalTone: 0.2
  }
];

// Generate news sharing posts for each user based on their interests
export const generateNewsSharePosts = (): Post[] => {
  const newsLinks = generateNewsLinks();
  const newsSharePosts: Post[] = [];

  // Helper function to select news based on user interests
  const selectNewsForUser = (userId: string, count: number): NewsLink[] => {
    const user = fakeUsers.find(u => u.id === userId)!;
    const personality = jotPersonalities[userId];
    
    // Score news articles based on user interests and personality
    const scoredNews = newsLinks.map(news => {
      let score = 0;
      
      // Match against user interests
      if (personality.behaviorPatterns.topicAffinities) {
        Object.entries(personality.behaviorPatterns.topicAffinities).forEach(([topic, affinity]) => {
          if (news.title.toLowerCase().includes(topic.replace('-', ' ')) || 
              news.description.toLowerCase().includes(topic.replace('-', ' ')) ||
              news.category.toLowerCase().includes(topic.replace('-', ' '))) {
            score += affinity;
          }
        });
      }
      
      // Adjust for political lean compatibility
      const politicalCompatibility = 1 - Math.abs(personality.demographics.politicalLean - news.politicalLean);
      score *= politicalCompatibility;
      
      // Boost credible sources
      score *= news.credibilityScore;
      
      return { news, score };
    });
    
    // Sort by score and return top articles
    return scoredNews
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map(item => item.news);
  };

  // Generate 5 news shares per user (simplified - showing pattern for first few users)
  const userNewsShares = [
    { userId: 'user-1', newsIds: ['news-1', 'news-2', 'news-8'] }, // Alex - Tech focus
    { userId: 'user-2', newsIds: ['news-2', 'news-3', 'news-1'] }, // Maria - Journalism focus
    { userId: 'user-3', newsIds: ['news-8', 'news-1'] }, // David - Design focus
    { userId: 'user-4', newsIds: ['news-4', 'news-5'] }, // Sarah - Climate focus
    { userId: 'user-6', newsIds: ['news-10'] }, // Elena - Food focus
  ];

  userNewsShares.forEach(({ userId, newsIds }) => {
    const user = fakeUsers.find(u => u.id === userId)!;
    const personality = jotPersonalities[userId];
    
    newsIds.forEach((newsId, index) => {
      const newsLink = newsLinks.find(n => n.id === newsId);
      if (newsLink) {
        const postTime = new Date();
        postTime.setDate(postTime.getDate() - (index + 1));
        postTime.setHours(personality.behaviorPatterns.postingTimes[index % personality.behaviorPatterns.postingTimes.length]);

        newsSharePosts.push({
          id: `news-share-${userId}-${index}`,
          userId,
          user,
          type: 'text',
          content: generateNewsShareComment(newsLink, personality),
          likes: Math.floor(Math.random() * 300) + 50,
          comments: Math.floor(Math.random() * 50) + 10,
          shares: Math.floor(Math.random() * 80) + 15,
          createdAt: postTime,
          // Add news link reference
          media: [{
            id: `news-preview-${newsId}`,
            type: 'image',
            url: newsLink.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop',
            thumbnail: newsLink.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&h=100&fit=crop',
            alt: `News preview: ${newsLink.title}`,
          }]
        });
      }
    });
  });

  return newsSharePosts;
};

// Generate contextual comments for news sharing
const generateNewsShareComment = (newsLink: NewsLink, personality: any): string => {
  const templates = [
    "This is exactly what I've been talking about! {title} - the implications are huge for our industry.",
    "Important read: {title}. This changes everything we thought we knew about {topic}.",
    "Everyone in {field} needs to read this: {title}. The future is happening faster than we thought.",
    "Fascinating article on {topic}: {title}. What do you all think about the implications?",
    "This confirms what many of us suspected: {title}. Time to adapt our strategies.",
    "Breaking: {title}. This is why I'm passionate about {topic} - real change is happening!",
    "Must-read for anyone interested in {topic}: {title}. The data is compelling.",
    "This article perfectly captures the current state of {field}: {title}. Thoughts?"
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];
  const topic = newsLink.category.toLowerCase();
  const field = personality.demographics.profession.toLowerCase();

  return template
    .replace('{title}', newsLink.title)
    .replace('{topic}', topic)
    .replace('{field}', field);
};

export const allNewsLinks = generateNewsLinks();
export const allNewsSharePosts = generateNewsSharePosts();
