import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MySummaries from './pages/MySummaries';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchComplete = () => {
    setSearchQuery('');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                searchQuery={searchQuery} 
                onSearchComplete={handleSearchComplete}
              />
            } 
          />
          <Route path="/summaries" element={<MySummaries />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;