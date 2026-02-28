import React from 'react';
import heroImg from '../assets/lesse1.jpg';
import cardImg1 from '../assets/lesse2.jpg';
import cardImg2 from '../assets/lesse3.jpg';

interface DetailPageProps {
  isVisible: boolean;
  onNavigate: (page: 'home' | 'add') => void;
}

// Sample data for the timeline
const timelineAnalyses = [
  {
    avatar: 'FN',
    avatarBg: 'var(--accent)',
    user: 'Fearnot99',
    title: 'From IZ*ONE to FEARLESS: A New Beginning',
    text: "The debut concept masterfully incorporates the real-life journeys of Sakura and Chaewon, recasting their past experiences not as baggage, but as the foundation for their 'fearless' identity.",
  },
  {
    avatar: 'MV',
    avatarBg: '#00d4ff',
    user: 'MV_Sleuth',
    title: "Symbolism in 'UNFORGIVEN': A Western Remixed",
    text: "The music video is a visual feast, blending classic Western film tropes with modern K-pop aesthetics. The fallen angel wings and desert landscapes serve as powerful metaphors.",
  },
];

export const DetailPage: React.FC<DetailPageProps> = ({ isVisible, onNavigate }) => {
  return (
    <div id="page-detail" className={`page ${!isVisible ? 'hidden' : ''}`}>
      <div style={{ paddingTop: '0' }}>
        <div className="detail-hero" style={{ margin: '0', width: '100%', borderRadius: '0', height: '500px' }}>
          <img 
            src={heroImg} 
            className="detail-hero-img" 
            alt="Hero" 
            style={{ filter: 'brightness(0.6) contrast(1.1)', transition: 'transform 0.5s ease' }} 
          />
          <div className="detail-hero-overlay" style={{ background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 100%)' }}></div>
          <div className="detail-hero-content">
            <div className="detail-tags">
              <span className="tag tag-purple">GROUP</span>
              <span className="tag tag-teal">HYBE</span>
              <span className="tag tag-red">TRENDING</span>
            </div>
            <h1 className="detail-title" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', margin: '0' }}>LE SSERAFIM</h1>
            <p style={{ color: 'var(--muted)', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1.5rem' }}>
              The 'FEARLESS' Concept Analysis
            </p>
          </div>
          <button 
            className="btn-ghost" 
            onClick={() => onNavigate('home')}
            style={{ position: 'absolute', top: '100px', left: '4rem', zIndex: '10', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}
          >
            ← BACK TO EXPLORE
          </button>
        </div>

        <div className="detail-body" style={{ background: 'transparent', marginTop: '-20px' }}>
          <div className="detail-main">
            <div className="detail-stats" style={{ marginBottom: '4rem' }}>
              <div className="stat-item" style={{ fontSize: '1.1rem' }}>📝 <strong>2.1k</strong> Contributions</div>
              <div className="stat-item" style={{ fontSize: '1.1rem' }}>🕸 <strong>128</strong> Nodes</div>
              <div className="stat-item" style={{ fontSize: '1.1rem' }}>🔥 <strong>98%</strong> Hot Score</div>
            </div>

            <div className="section-title">Visual Narrative Analysis</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
              <div className="analysis-card" style={{ padding: '0', borderRadius: '32px', overflow: 'hidden' }}>
                <div style={{ height: '280px', overflow: 'hidden' }}>
                   <img src={cardImg1} alt="Visual 1" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="hover-zoom" />
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CHOREOGRAPHY</div>
                  <h3 style={{ fontFamily: 'Syne', fontSize: '1.6rem', marginBottom: '1rem', fontWeight: '800' }}>UNFORGIVEN PERFORMANCE</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.7' }}>
                    The powerful and synchronized movements reflect the group's unwavering determination to break social taboos.
                  </p>
                </div>
              </div>
              <div className="analysis-card" style={{ padding: '0', borderRadius: '32px', overflow: 'hidden' }}>
                <div style={{ height: '280px', overflow: 'hidden' }}>
                  <img src={cardImg2} alt="Visual 2" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="hover-zoom" />
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ color: 'var(--accent3)', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CONCEPT ART</div>
                  <h3 style={{ fontFamily: 'Syne', fontSize: '1.6rem', marginBottom: '1rem', fontWeight: '800' }}>FEARLESS STORYLINE</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.7' }}>
                    A visual deep-dive into the metaphors of the 'fallen angel' and the 'undefeated' athlete.
                  </p>
                </div>
              </div>
            </div>

            <div className="section-title">Curated Analysis Timeline</div>
            <div className="timeline">
              {timelineAnalyses.map((item, index) => (
                <div className="timeline-entry" key={index} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2rem', marginBottom: '2rem' }}>
                  <div className="timeline-entry-header">
                    <div className="t-avatar" style={{ background: item.avatarBg, fontWeight: '800', width: '40px', height: '40px' }}>{item.avatar}</div>
                    <span className="t-name" style={{ color: 'var(--accent3)', fontSize: '1rem' }}>{item.user}</span>
                  </div>
                  <div className="timeline-entry-content" style={{ marginTop: '1.5rem' }}>
                    <div className="timeline-entry-title" style={{ fontFamily: 'Syne', fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>{item.title}</div>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.8', marginTop: '1rem' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="section-title">Relational Navigation</div>
            <div className="rel-card">
              <div className="rel-card-title">HYBE Corporation</div>
              <div className="rel-card-meta">Parent Company · 45 nodes</div>
            </div>
            <div className="rel-card">
              <div className="rel-card-title">NewJeans</div>
              <div className="rel-card-meta">Sister Group · 32 nodes</div>
            </div>
            <div className="rel-card">
              <div className="rel-card-title">UNFORGIVEN (Album)</div>
              <div className="rel-card-meta">Related Concept · 12 nodes</div>
            </div>
            
            <button 
              className="add-btn" 
              style={{ marginTop: '3rem', padding: '0.8rem', fontSize: '0.85rem' }}
              onClick={() => onNavigate('add')}
            >
              ADD NEW ANALYSIS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
