import React from 'react';

interface DetailPageProps {
  isVisible: boolean;
  onNavigate: (page: 'home') => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({ isVisible, onNavigate }) => {
  return (
    <div id="page-detail" className={`page ${!isVisible ? 'hidden' : ''}`}>
      <div style={{paddingTop:'58px'}}>
        <div className="detail-hero">
          <div className="detail-hero-fallback" style={{background:'linear-gradient(135deg,#1a0010 0%,#0a001a 40%,#000a1a 100%)'}}>
            <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.15}} viewBox="0 0 800 280">
              <circle cx="400" cy="140" r="200" fill="#ff0040" opacity=".1"/>
            </svg>
          </div>
          <div className="detail-hero-overlay"></div>
          <div className="detail-hero-content">
            <div>
              <div className="detail-tags">
                <span className="tag tag-purple">MANGA</span>
                <span className="tag tag-teal">ANIME</span>
              </div>
              <div className="detail-title">Chainsaw Man:<br/>The Fear Devil Arc</div>
            </div>
            <button className="btn-primary" onClick={() => onNavigate('home')}>← Back</button>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-main">
            <div className="detail-stats">
              <div className="stat-item">📝 <strong>1.7k</strong> Contributions</div>
              <div className="stat-item">🕸 <strong>489</strong> Nodes</div>
            </div>
            <div className="section-title">Curated Analysis Timeline</div>
            <div className="timeline">
              <div className="timeline-entry">
                <div className="timeline-entry-header">
                  <div className="t-avatar" style={{background:'var(--accent)'}}>FU</div>
                  <span className="t-name">FujimotoFanatic</span>
                </div>
                <div className="t-text">The Gun Devil as a Metaphor for Nuclear Deterrence...</div>
              </div>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="section-title">Relational Navigation</div>
            <div className="rel-card">
              <div className="rel-card-title">Fujimoto's One-Shots</div>
              <div className="rel-card-meta">Thematic connection · 89 nodes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
