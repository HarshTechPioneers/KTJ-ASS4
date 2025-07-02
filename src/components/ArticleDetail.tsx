import React, { useState } from 'react';
import { Article } from '../types/article';
import { X, Calendar, User, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { summarizeArticle } from '../services/geminiApi';
import { cacheSummary, getCachedSummary } from '../utils/storage';

interface ArticleDetailProps {
  article: Article;
  onClose: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onClose }) => {
  const [summary, setSummary] = useState<string>(getCachedSummary(article.url) || '');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string>('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSummarize = async () => {
    if (summary) return; // Already have summary

    setIsLoadingSummary(true);
    setSummaryError('');

    try {
      const content = article.content || article.description || article.title;
      const generatedSummary = await summarizeArticle(content);
      setSummary(generatedSummary);
      cacheSummary(article.url, generatedSummary);
    } catch (error) {
      setSummaryError('Failed to generate summary. Please try again.');
      console.error('Summary error:', error);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              {article.source.name}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Image */}
          {article.urlToImage && (
            <div className="relative h-64 md:h-80">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1200';
                }}
              />
            </div>
          )}

          <div className="p-6">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              {article.author && (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {article.description && (
              <div className="mb-6">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {article.description}
                </p>
              </div>
            )}

            {/* Content */}
            {article.content && (
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {article.content.replace(/\[\+\d+ chars\]$/, '...')}
                </p>
              </div>
            )}

            {/* AI Summary Section */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span>AI Summary</span>
                </h3>
                {!summary && !isLoadingSummary && (
                  <button
                    onClick={handleSummarize}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    Generate Summary
                  </button>
                )}
              </div>

              {isLoadingSummary && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
                  <span className="text-gray-600">Generating AI summary...</span>
                </div>
              )}

              {summaryError && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
                  {summaryError}
                  <button
                    onClick={handleSummarize}
                    className="ml-2 underline hover:no-underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              {summary && (
                <div className="prose prose-sm max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {summary}
                  </div>
                </div>
              )}

              {!summary && !isLoadingSummary && !summaryError && (
                <p className="text-gray-500 text-center py-4">
                  Click "Generate Summary" to get an AI-powered summary of this article.
                </p>
              )}
            </div>

            {/* Read Full Article Button */}
            <div className="flex justify-center">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Read Full Article</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;