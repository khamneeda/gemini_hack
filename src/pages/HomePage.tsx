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
          <h1>Dig <em>Deeper</em> Into<br/><span className="accent-word">K-Pop Culture</span></h1>
          <p className="hero-sub">Search any entity — artist, group, concept — and explore its relational web through community-curated analysis.</p>

          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            onSearch={onSearch} 
            onHintClick={(hint) => setSearchQuery(hint)}
          />
        </div>

        <div className="preview-row">
          <div className="preview-card" onClick={() => onNavigate('results')}>
            <div className="card-icon" style={{background:'rgba(255,77,109,.15)'}}>🎤</div>
            <div className="card-title">LE SSERAFIM</div>
            <div className="card-meta">5 members · HYBE</div>
          </div>
          <div className="preview-card" onClick={() => onNavigate('detail')}>
            <div className="card-icon" style={{background:'rgba(247,201,72,.1)'}}>🐰</div>
            <div className="card-title">NewJeans</div>
            <div className="card-meta">5 members · ADOR</div>
          </div>
          <div className="preview-card">
            <div className="card-icon" style={{background:'rgba(0,229,200,.1)'}}>💜</div>
            <div className="card-title">BTS</div>
            <div className="card-meta">7 members · HYBE</div>
          </div>
          <div className="preview-card">
            <div className="card-icon" style={{background:'rgba(108,79,246,.1)'}}>🏢</div>
            <div className="card-title">HYBE Corporation</div>
            <div className="card-meta">Record Label · South Korea</div>
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
