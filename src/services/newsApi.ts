import axios from 'axios';
import { NewsApiResponse, Category } from '../types/article';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchTopHeadlines = async (
  category: Category = 'general',
  country: string = 'us',
  pageSize: number = 20
): Promise<NewsApiResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/top-headlines`, {
      params: {
        category,
        country,
        pageSize,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw new Error('Failed to fetch news articles. Please try again.');
  }
};

export const searchArticles = async (
  query: string,
  pageSize: number = 20
): Promise<NewsApiResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/search`, {
      params: {
        q: query,
        pageSize,
        sortBy: 'publishedAt',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching articles:', error);
    throw new Error('Failed to search articles. Please try again.');
  }
};