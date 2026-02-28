import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { loadPreviews } from '../services/postStorage';
import type { PreviewCard } from '../types/data';

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
  const [previews, setPreviews] = useState<PreviewCard[]>([]);

  useEffect(() => {
    setPreviews(loadPreviews());
  }, []);

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
          {previews.map((card) => (
            <div className="preview-card" key={card.id} onClick={() => onNavigate('results')}>
              <div className="card-icon" style={{background: card.bgColor}}>{card.icon}</div>
              <div className="card-title">{card.title}</div>
              <div className="card-meta">{card.meta}</div>
            </div>
          ))}
        </div>

        <div className="scroll-hint">
          <div className="scroll-arrow">↓</div>
          scroll to explore
        </div>
      </section>
    </div>
  );
};
