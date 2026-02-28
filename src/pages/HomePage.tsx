import React from 'react';
import { SearchBar } from '../components/SearchBar';

interface HomePageProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSearch: () => void;
  onNavigate: (page: 'results' | 'detail' | 'add') => void;
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

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
              onSearch={onSearch} 
              onHintClick={(hint) => setSearchQuery(hint)}
            />
            
            <button className="btn-primary" style={{ padding: '0.8rem 2.5rem', fontSize: '1rem', fontWeight: '700' }} onClick={() => onNavigate('add')}>
              Start Digging 🚀
            </button>
          </div>
        </div>

        <div className="preview-row">
          <div className="preview-card" onClick={() => onNavigate('results')}>
            <div className="card-icon" style={{background:'rgba(255,0,122,.2)'}}>🎤</div>
            <div className="card-title">LE SSERAFIM</div>
            <div className="card-meta">5 members · HYBE</div>
          </div>
          <div className="preview-card" onClick={() => onNavigate('results')}>
            <div className="card-icon" style={{background:'rgba(0,212,255,.2)'}}>🐰</div>
            <div className="card-title">NewJeans</div>
            <div className="card-meta">5 members · ADOR</div>
          </div>
          <div className="preview-card" onClick={() => onNavigate('results')}>
            <div className="card-icon" style={{background:'rgba(112,0,255,.2)'}}>💜</div>
            <div className="card-title">BTS</div>
            <div className="card-meta">7 members · HYBE</div>
          </div>
          <div className="preview-card" onClick={() => onNavigate('results')}>
            <div className="card-icon" style={{background:'rgba(255,0,200,.2)'}}>🏢</div>
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
