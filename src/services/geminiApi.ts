import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const summarizeArticle = async (content: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/summarize`, {
      content,
    });
    
    return response.data.summary;
  } catch (error) {
    console.error('Error summarizing article:', error);
    throw new Error('Failed to summarize article. Please try again.');
  }
};