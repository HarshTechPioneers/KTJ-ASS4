import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// NewsAPI base URL
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const API_KEY = process.env.NEWS_API_KEY;

// Helper function to make NewsAPI requests
const makeNewsAPIRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}${endpoint}`, {
      params: {
        ...params,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('NewsAPI Error:', error.response?.data || error.message);
    throw error;
  }
};

// Routes
app.get('/api/news/top-headlines', async (req, res) => {
  try {
    const { category = 'general', country = 'us', pageSize = 20 } = req.query;
    
    const data = await makeNewsAPIRequest('/top-headlines', {
      category,
      country,
      pageSize,
    });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch top headlines',
      message: error.response?.data?.message || error.message,
    });
  }
});

app.get('/api/news/search', async (req, res) => {
  try {
    const { q, pageSize = 20, sortBy = 'publishedAt' } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const data = await makeNewsAPIRequest('/everything', {
      q,
      pageSize,
      sortBy,
      language: 'en',
    });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to search articles',
      message: error.response?.data?.message || error.message,
    });
  }
});

// Gemini API proxy for summarization
app.post('/api/summarize', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';
    
    const response = await axios.post(
      `${GEMINI_API_BASE_URL}/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Summarize the following article in 3 bullet points. Make each bullet point concise and informative:\n\n${content}`
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    const summary = response.data.candidates[0].content.parts[0].text;
    res.json({ summary });
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to generate summary',
      message: error.response?.data?.message || error.message,
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'News API server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});