import React from 'react';
import { SearchBar } from '../components/SearchBar';

interface HomePageProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSearch: () => void;
  onNavigate: (page: 'results' | 'detail') => void;
  isVisible: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  onSearch, 
  onNavigate, 
  isVisible 
}) => {
  return (
    <div id="page-home" className={`page ${!isVisible ? 'hidden' : ''}`}>
      <section className="hero">
        <div className="rings">
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="ring"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">Knowledge Graph Explorer · Beta</div>
          <h1>Dig <em>Deeper</em> Into<br/><span className="accent-word">Any Concept</span></h1>
          <p className="hero-sub">Search any entity — character, concept, event — and explore its relational web through community-curated analysis.</p>

          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            onSearch={onSearch} 
            onHintClick={(hint) => setSearchQuery(hint)}
          />
        </div>

        <div className="preview-row">
          <div className="preview-card" onClick={() => onNavigate('results')}>
            <div className="card-icon" style={{background:'rgba(108,79,246,.15)'}}>⚔️</div>
            <div className="card-title">Reze's Flowers</div>
            <div className="card-meta">237 threads · Chainsaw Man</div>
          </div>
          <div className="preview-card" onClick={() => onNavigate('detail')}>
            <div className="card-icon" style={{background:'rgba(0,229,200,.1)'}}>😨</div>
            <div className="card-title">Fear Devil Arc</div>
            <div className="card-meta">1.7k threads · Chainsaw Man</div>
          </div>
          <div className="preview-card">
            <div className="card-icon" style={{background:'rgba(255,77,109,.1)'}}>🔫</div>
            <div className="card-title">Gun Devil</div>
            <div className="card-meta">892 threads · Chainsaw Man</div>
          </div>
          <div className="preview-card">
            <div className="card-icon" style={{background:'rgba(247,201,72,.1)'}}>🌸</div>
            <div className="card-title">Makima's Contract</div>
            <div className="card-meta">1.1k threads · Chainsaw Man</div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-arrow">↓</div>
          scroll to explore
        </div>
      </section>
    </div>
  );
};
