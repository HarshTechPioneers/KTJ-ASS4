import React from 'react';
import { Category } from '../types/article';
import { TrendingUp, Briefcase, Cpu, Trophy, Heart } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  loading?: boolean;
}

const categories: Array<{ key: Category; label: string; icon: React.ReactNode }> = [
  { key: 'general', label: 'General', icon: <TrendingUp className="w-4 h-4" /> },
  { key: 'business', label: 'Business', icon: <Briefcase className="w-4 h-4" /> },
  { key: 'technology', label: 'Technology', icon: <Cpu className="w-4 h-4" /> },
  { key: 'sports', label: 'Sports', icon: <Trophy className="w-4 h-4" /> },
  { key: 'health', label: 'Health', icon: <Heart className="w-4 h-4" /> },
];

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  activeCategory, 
  onCategoryChange, 
  loading = false 
}) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-2 shadow-sm border border-gray-200">
      <div className="flex flex-wrap gap-2">
        {categories.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            disabled={loading}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCategory === key
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 disabled:opacity-50'
            } disabled:cursor-not-allowed`}
          >
            {icon}
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;