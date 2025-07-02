import React, { useState, useEffect } from 'react';
import { getSavedSummaries } from '../utils/storage';
import { BookOpen, Calendar, ExternalLink, Trash2 } from 'lucide-react';

interface SavedSummary {
  url: string;
  summary: string;
  timestamp: number;
}

const MySummaries: React.FC = () => {
  const [summaries, setSummaries] = useState<SavedSummary[]>([]);

  useEffect(() => {
    const savedSummaries = getSavedSummaries();
    setSummaries(savedSummaries.sort((a, b) => b.timestamp - a.timestamp));
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const clearSummaries = () => {
    if (window.confirm('Are you sure you want to clear all summaries?')) {
      sessionStorage.removeItem('article_summaries_cache');
      setSummaries([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Summaries</span>
          </h1>
          <p className="text-xl text-gray-600">
            Your AI-generated article summaries
          </p>
        </div>

        {/* Controls */}
        {summaries.length > 0 && (
          <div className="flex justify-end mb-6">
            <button
              onClick={clearSummaries}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Summaries List */}
        {summaries.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No summaries yet</h3>
            <p className="text-gray-600 mb-4">
              Start exploring articles and generate AI summaries to see them here.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Explore News
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {summaries.map((summary, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Meta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(summary.timestamp)}</span>
                  </div>
                  <a
                    href={summary.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View Article</span>
                  </a>
                </div>

                {/* Summary */}
                <div className="prose prose-sm max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {summary.summary}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySummaries;