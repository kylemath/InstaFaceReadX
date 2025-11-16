// Real news API integration
// Using NewsAPI.org for real news data

export interface RealNewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  content: string | null;
  category: string;
  credibilityScore: number;
  engagementPotential: number;
}

// Mock real news data (in production, this would come from NewsAPI)
export const fetchRealNews = async (category?: string): Promise<RealNewsArticle[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockNews: RealNewsArticle[] = [
    {
      id: 'real-news-1',
      title: 'AI Breakthrough: New Model Achieves Human-Level Performance in Complex Reasoning',
      description: 'Researchers at leading tech companies announce a major breakthrough in artificial intelligence, with their latest model demonstrating unprecedented reasoning capabilities across multiple domains.',
      url: 'https://example.com/ai-breakthrough-2024',
      urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      source: { id: 'tech-news', name: 'TechCrunch' },
      author: 'Sarah Chen',
      content: 'In a groundbreaking development that could reshape the future of artificial intelligence...',
      category: 'technology',
      credibilityScore: 0.92,
      engagementPotential: 0.88
    },
    {
      id: 'real-news-2',
      title: 'Climate Action: Young Activists Launch Global Digital Campaign',
      description: 'A new generation of climate activists is using social media and digital tools to organize the largest environmental movement in history.',
      url: 'https://example.com/climate-youth-movement',
      urlToImage: 'https://images.unsplash.com/photo-1569163139394-de44aa4e71ba?w=600&h=400&fit=crop',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      source: { id: 'climate-news', name: 'Environmental Post' },
      author: 'Alex Rivera',
      content: 'Young people around the world are leveraging the power of social media...',
      category: 'environment',
      credibilityScore: 0.85,
      engagementPotential: 0.95
    },
    {
      id: 'real-news-3',
      title: 'Gaming Industry Reaches New Heights with $200B Revenue',
      description: 'The gaming industry continues its explosive growth, driven by mobile gaming and emerging technologies like VR and AR.',
      url: 'https://example.com/gaming-industry-growth',
      urlToImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      source: { id: 'gaming-news', name: 'GameSpot' },
      author: 'Jordan Kim',
      content: 'The global gaming industry has reached unprecedented levels...',
      category: 'gaming',
      credibilityScore: 0.88,
      engagementPotential: 0.92
    },
    {
      id: 'real-news-4',
      title: 'Social Media Platforms Introduce New Mental Health Features',
      description: 'Major social platforms announce comprehensive mental health initiatives designed specifically for teen users.',
      url: 'https://example.com/social-media-mental-health',
      urlToImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      source: { id: 'social-news', name: 'Social Media Today' },
      author: 'Maya Patel',
      content: 'In response to growing concerns about teen mental health...',
      category: 'health',
      credibilityScore: 0.90,
      engagementPotential: 0.87
    },
    {
      id: 'real-news-5',
      title: 'Space Exploration: Private Companies Plan Moon Base by 2030',
      description: 'Several private space companies announce ambitious plans for permanent lunar settlements within the next decade.',
      url: 'https://example.com/moon-base-2030',
      urlToImage: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      source: { id: 'space-news', name: 'Space News' },
      author: 'Dr. Lisa Chang',
      content: 'The race to establish a permanent human presence on the Moon...',
      category: 'science',
      credibilityScore: 0.87,
      engagementPotential: 0.91
    },
    {
      id: 'real-news-6',
      title: 'Gen Z Entrepreneurs Break Records with Social Impact Startups',
      description: 'Young entrepreneurs are creating businesses that prioritize social and environmental impact alongside profit.',
      url: 'https://example.com/genz-social-startups',
      urlToImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(), // 16 hours ago
      source: { id: 'business-news', name: 'Forbes' },
      author: 'Carlos Rodriguez',
      content: 'A new generation of entrepreneurs is redefining business success...',
      category: 'business',
      credibilityScore: 0.83,
      engagementPotential: 0.89
    }
  ];

  if (category) {
    return mockNews.filter(article => article.category === category);
  }

  return mockNews;
};

// Convert real news to posts
export const convertNewsToPost = (article: RealNewsArticle, sharerId: string, shareComment: string) => {
  const sharer = { id: sharerId }; // Would get from user store
  
  return {
    id: `news-share-${article.id}-${sharerId}`,
    userId: sharerId,
    user: sharer,
    type: 'text' as const,
    content: `${shareComment}\n\n📰 ${article.title}\n\n${article.description}`,
    media: article.urlToImage ? [{
      id: `news-image-${article.id}`,
      type: 'image' as const,
      url: article.urlToImage,
      thumbnail: article.urlToImage,
      alt: article.title,
    }] : undefined,
    newsLink: {
      url: article.url,
      title: article.title,
      source: article.source.name,
      publishedAt: new Date(article.publishedAt),
      credibilityScore: article.credibilityScore
    },
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 100) + 10,
    shares: Math.floor(Math.random() * 200) + 20,
    createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
  };
};

// Trending topics for gamification
export const getTrendingTopics = async (): Promise<string[]> => {
  return [
    '#AI', '#ClimateAction', '#Gaming', '#SpaceX', '#MentalHealth', 
    '#GenZ', '#TechNews', '#Innovation', '#Sustainability', '#Future'
  ];
};
