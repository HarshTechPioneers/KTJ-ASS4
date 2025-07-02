import { Article } from '../types/article';

const ARTICLES_CACHE_KEY = 'news_articles_cache';
const SUMMARIES_CACHE_KEY = 'article_summaries_cache';
const CACHE_EXPIRY_HOURS = 1;

interface CachedData<T> {
  data: T;
  timestamp: number;
}

const isExpired = (timestamp: number): boolean => {
  const now = Date.now();
  const expiry = timestamp + (CACHE_EXPIRY_HOURS * 60 * 60 * 1000);
  return now > expiry;
};

export const cacheArticles = (key: string, articles: Article[]): void => {
  const cachedData: CachedData<Article[]> = {
    data: articles,
    timestamp: Date.now(),
  };
  sessionStorage.setItem(`${ARTICLES_CACHE_KEY}_${key}`, JSON.stringify(cachedData));
};

export const getCachedArticles = (key: string): Article[] | null => {
  try {
    const cached = sessionStorage.getItem(`${ARTICLES_CACHE_KEY}_${key}`);
    if (!cached) return null;

    const parsedData: CachedData<Article[]> = JSON.parse(cached);
    if (isExpired(parsedData.timestamp)) {
      sessionStorage.removeItem(`${ARTICLES_CACHE_KEY}_${key}`);
      return null;
    }

    return parsedData.data;
  } catch (error) {
    console.error('Error retrieving cached articles:', error);
    return null;
  }
};

export const cacheSummary = (articleUrl: string, summary: string): void => {
  try {
    const existingSummaries = JSON.parse(sessionStorage.getItem(SUMMARIES_CACHE_KEY) || '{}');
    existingSummaries[articleUrl] = {
      summary,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(SUMMARIES_CACHE_KEY, JSON.stringify(existingSummaries));
  } catch (error) {
    console.error('Error caching summary:', error);
  }
};

export const getCachedSummary = (articleUrl: string): string | null => {
  try {
    const summaries = JSON.parse(sessionStorage.getItem(SUMMARIES_CACHE_KEY) || '{}');
    const cached = summaries[articleUrl];
    
    if (!cached || isExpired(cached.timestamp)) {
      return null;
    }
    
    return cached.summary;
  } catch (error) {
    console.error('Error retrieving cached summary:', error);
    return null;
  }
};

export const getSavedSummaries = (): Array<{url: string, summary: string, timestamp: number}> => {
  try {
    const summaries = JSON.parse(sessionStorage.getItem(SUMMARIES_CACHE_KEY) || '{}');
    return Object.entries(summaries).map(([url, data]: [string, any]) => ({
      url,
      summary: data.summary,
      timestamp: data.timestamp,
    }));
  } catch (error) {
    console.error('Error retrieving saved summaries:', error);
    return [];
  }
};