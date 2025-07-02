import { NewsApiResponse, Category, Article } from '../types/article';

// Mock news data for demonstration
const mockArticles: Record<Category, Article[]> = {
  general: [
    {
      title: "Breaking: Major Technology Breakthrough Announced",
      description: "Scientists have made a significant breakthrough in quantum computing that could revolutionize the tech industry.",
      url: "https://example.com/tech-breakthrough",
      urlToImage: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date().toISOString(),
      source: { id: "tech-news", name: "Tech News" },
      author: "Dr. Sarah Johnson",
      content: "In a groundbreaking development, researchers at leading universities have achieved a major milestone in quantum computing technology..."
    },
    {
      title: "Global Climate Summit Reaches Historic Agreement",
      description: "World leaders unite on ambitious climate action plan with unprecedented commitments.",
      url: "https://example.com/climate-summit",
      urlToImage: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { id: "global-news", name: "Global News" },
      author: "Michael Chen",
      content: "The international climate summit concluded with a historic agreement that sets new standards for environmental protection..."
    },
    {
      title: "Revolutionary Medical Treatment Shows Promise",
      description: "New gene therapy treatment demonstrates remarkable success in clinical trials.",
      url: "https://example.com/medical-breakthrough",
      urlToImage: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: { id: "medical-journal", name: "Medical Journal" },
      author: "Dr. Emily Rodriguez",
      content: "A revolutionary gene therapy treatment has shown unprecedented success rates in treating previously incurable conditions..."
    },
    {
      title: "Space Exploration Milestone Achieved",
      description: "Private space company successfully completes first commercial mission to Mars orbit.",
      url: "https://example.com/space-mission",
      urlToImage: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: { id: "space-news", name: "Space News" },
      author: "Captain Alex Thompson",
      content: "In a historic achievement for commercial space exploration, the mission successfully reached Mars orbit..."
    }
  ],
  business: [
    {
      title: "Tech Giant Announces Record-Breaking Quarterly Earnings",
      description: "Major technology company reports unprecedented growth in cloud services and AI divisions.",
      url: "https://example.com/tech-earnings",
      urlToImage: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date().toISOString(),
      source: { id: "business-wire", name: "Business Wire" },
      author: "Jennifer Walsh",
      content: "The technology sector continues to show robust growth with record-breaking quarterly results..."
    },
    {
      title: "Cryptocurrency Market Sees Major Institutional Adoption",
      description: "Traditional banks and investment firms increasingly embrace digital assets.",
      url: "https://example.com/crypto-adoption",
      urlToImage: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      source: { id: "financial-times", name: "Financial Times" },
      author: "Robert Kim",
      content: "The cryptocurrency landscape is experiencing a fundamental shift as major financial institutions..."
    }
  ],
  entertainment: [
    {
      title: "Blockbuster Film Breaks Opening Weekend Records",
      description: "Latest superhero movie shatters box office expectations worldwide.",
      url: "https://example.com/blockbuster-film",
      urlToImage: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date().toISOString(),
      source: { id: "entertainment-weekly", name: "Entertainment Weekly" },
      author: "Lisa Martinez",
      content: "The highly anticipated film has exceeded all expectations, setting new records for opening weekend performance..."
    },
    {
      title: "Streaming Wars Heat Up with New Platform Launch",
      description: "Major media company launches innovative streaming service with exclusive content.",
      url: "https://example.com/streaming-launch",
      urlToImage: "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { id: "variety", name: "Variety" },
      author: "David Park",
      content: "The streaming landscape becomes even more competitive with the launch of this innovative platform..."
    }
  ],
  health: [
    {
      title: "Breakthrough Study Links Exercise to Longevity",
      description: "Comprehensive research reveals optimal exercise patterns for maximum health benefits.",
      url: "https://example.com/exercise-study",
      urlToImage: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date().toISOString(),
      source: { id: "health-journal", name: "Health Journal" },
      author: "Dr. Amanda Foster",
      content: "A landmark study involving thousands of participants has revealed new insights into the relationship between exercise and longevity..."
    },
    {
      title: "Mental Health Awareness Campaign Launches Globally",
      description: "International initiative aims to reduce stigma and improve access to mental health resources.",
      url: "https://example.com/mental-health-campaign",
      urlToImage: "https://images.pexels.com/photos/3958464/pexels-photo-3958464.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: { id: "wellness-today", name: "Wellness Today" },
      author: "Dr. James Wilson",
      content: "The global mental health initiative represents a coordinated effort to address the growing mental health crisis..."
    }
  ],
  science: [
    {
      title: "Scientists Discover New Species in Deep Ocean",
      description: "Marine biologists identify previously unknown creatures in unexplored ocean depths.",
      url: "https://example.com/ocean-discovery",
      urlToImage: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date().toISOString(),
      source: { id: "nature-journal", name: "Nature Journal" },
      author: "Dr. Maria Santos",
      content: "The deep-sea expedition has yielded remarkable discoveries, including several new species that challenge our understanding..."
    },
    {
      title: "Artificial Intelligence Achieves New Milestone",
      description: "AI system demonstrates unprecedented problem-solving capabilities in complex scenarios.",
      url: "https://example.com/ai-milestone",
      urlToImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 5400000).toISOString(),
      source: { id: "ai-research", name: "AI Research" },
      author: "Dr. Kevin Zhang",
      content: "The latest advancement in artificial intelligence represents a significant leap forward in machine learning capabilities..."
    }
  ],
  sports: [
    {
      title: "Underdog Team Wins Championship in Stunning Upset",
      description: "Against all odds, the underdog team claims victory in the season's biggest game.",
      url: "https://example.com/championship-upset",
      urlToImage: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date().toISOString(),
      source: { id: "sports-center", name: "Sports Center" },
      author: "Tom Anderson",
      content: "In one of the most surprising outcomes in sports history, the underdog team has achieved the impossible..."
    },
    {
      title: "Olympic Records Shattered at International Games",
      description: "Athletes push human limits with multiple world records broken in single day.",
      url: "https://example.com/olympic-records",
      urlToImage: "https://images.pexels.com/photos/2202685/pexels-photo-2202685.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      source: { id: "olympic-news", name: "Olympic News" },
      author: "Sarah Mitchell",
      content: "The international games have witnessed an extraordinary display of athletic excellence with multiple records falling..."
    }
  ],
  technology: [
    {
      title: "Next-Generation Smartphone Features Revolutionary Display",
      description: "Tech company unveils groundbreaking display technology that could transform mobile devices.",
      url: "https://example.com/smartphone-display",
      urlToImage: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date().toISOString(),
      source: { id: "tech-review", name: "Tech Review" },
      author: "Alex Chen",
      content: "The revolutionary display technology promises to redefine user interaction with mobile devices..."
    },
    {
      title: "Cybersecurity Breakthrough Protects Against New Threats",
      description: "Advanced security protocol developed to counter emerging cyber attack methods.",
      url: "https://example.com/cybersecurity-breakthrough",
      urlToImage: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { id: "security-weekly", name: "Security Weekly" },
      author: "Rachel Green",
      content: "The new cybersecurity protocol addresses critical vulnerabilities in current systems..."
    }
  ]
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTopHeadlines = async (
  category: Category = 'general',
  country: string = 'us',
  pageSize: number = 20
): Promise<NewsApiResponse> => {
  // Simulate network delay
  await delay(800 + Math.random() * 400);
  
  const articles = mockArticles[category] || mockArticles.general;
  
  return {
    status: 'ok',
    totalResults: articles.length,
    articles: articles.slice(0, pageSize)
  };
};

export const searchArticles = async (
  query: string,
  pageSize: number = 20
): Promise<NewsApiResponse> => {
  // Simulate network delay
  await delay(1000 + Math.random() * 500);
  
  // Search across all categories
  const allArticles = Object.values(mockArticles).flat();
  const searchResults = allArticles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.description.toLowerCase().includes(query.toLowerCase()) ||
    article.content?.toLowerCase().includes(query.toLowerCase())
  );
  
  return {
    status: 'ok',
    totalResults: searchResults.length,
    articles: searchResults.slice(0, pageSize)
  };
};