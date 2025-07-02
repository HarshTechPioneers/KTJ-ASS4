import React, { useState, useEffect } from 'react';
import { Article, Category } from '../types/article';
import { fetchTopHeadlines, searchArticles } from '../services/newsApi';
import { cacheArticles, getCachedArticles } from '../utils/storage';
import CategoryTabs from '../components/CategoryTabs';
import ArticleCard from '../components/ArticleCard';
import ArticleDetail from '../components/ArticleDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

interface HomeProps {
  searchQuery?: string;
  onSearchComplete?: () => void;
}

const Home: React.FC<HomeProps> = ({ searchQuery, onSearchComplete }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('general');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const loadArticles = async (category: Category = 'general') => {
    setLoading(true);
    setError('');

    try {
      // Check cache first
      const cacheKey = `category_${category}`;
      const cachedArticles = getCachedArticles(cacheKey);
      
      if (cachedArticles) {
        setArticles(cachedArticles);
        setLoading(false);
        return;
      }

      // Fetch from API
      const response = await fetchTopHeadlines(category);
      
      if (response.articles.length === 0) {
        setError('No articles found for this category.');
        setArticles([]);
      } else {
        setArticles(response.articles);
        cacheArticles(cacheKey, response.articles);
      }
    } catch (err) {
      setError('Failed to load articles. Please check your API key and try again.');
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError('');

    try {
      // Check cache first
      const cacheKey = `search_${query}`;
      const cachedArticles = getCachedArticles(cacheKey);
      
      if (cachedArticles) {
        setArticles(cachedArticles);
        setLoading(false);
        return;
      }

      // Fetch from API
      const response = await searchArticles(query);
      
      if (response.articles.length === 0) {
        setError(`No articles found for "${query}".`);
        setArticles([]);
      } else {
        setArticles(response.articles);
        cacheArticles(cacheKey, response.articles);
      }
    } catch (err) {
      setError('Failed to search articles. Please try again.');
      console.error('Error searching articles:', err);
    } finally {
      setLoading(false);
      onSearchComplete?.();
    }
  };

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    loadArticles(category);
  };

  const handleRetry = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      loadArticles(activeCategory);
    }
  };

  // Load initial articles
  useEffect(() => {
    loadArticles(activeCategory);
  }, []);

  // Handle search query from props
  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">News</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest news powered by AI summarization
          </p>
        </div>

        {/* Category Tabs */}
        {!searchQuery && (
          <div className="mb-8 flex justify-center">
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              loading={loading}
            />
          </div>
        )}

        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Search results for "{searchQuery}"
            </h2>
          </div>
        )}

        {/* Content */}
        {loading && (
          <LoadingSpinner size="lg" text="Loading articles..." />
        )}

        {error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">📰</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try a different search term or category.</p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <ArticleCard
                key={`${article.url}-${index}`}
                article={article}
                onClick={setSelectedArticle}
              />
            ))}
          </div>
        )}

        {/* Article Detail Modal */}
        {selectedArticle && (
          <ArticleDetail
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;