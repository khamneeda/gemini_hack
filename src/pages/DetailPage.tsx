import React from 'react';

interface DetailPageProps {
  isVisible: boolean;
  onNavigate: (page: 'home') => void;
}

// Sample data for the timeline
const timelineAnalyses = [
  {
    avatar: 'FN',
    avatarBg: 'var(--accent)',
    user: 'Fearnot99',
    title: 'From IZ*ONE to FEARLESS: A New Beginning',
    text: "The debut concept masterfully incorporates the real-life journeys of Sakura and Chaewon, recasting their past experiences not as baggage, but as the foundation for their \'fearless\' identity. This narrative resonated deeply with fans who followed their careers from Produce 48.",
  },
  {
    avatar: 'MV',
    avatarBg: '#00e5c8',
    user: 'MV_Sleuth',
    title: 'Symbolism in \'UNFORGIVEN\': A Western Remixed',
    text: "The music video is a visual feast, blending classic Western film tropes with modern K-pop aesthetics. The fallen angel wings, the cowboy hats, and the desert landscapes all serve as metaphors for the group carving out their own path, unforgiven and unbothered.",
  },
  {
    avatar: 'CH',
    avatarBg: '#f7c948',
    user: 'ChoreoCritique',
    title: 'The \'EASY\' Choreography: Redefining Effortless',
    text: "While the song is titled \'EASY,\' the old-school hip-hop choreography is anything but. This intentional irony highlights the group\'s message: what looks effortless on the surface is the result of immense hard work and dedication behind the scenes.",
  },
  {
    avatar: 'YJ',
    avatarBg: '#ff8fa3',
    user: 'YunjinLover',
    title: "The Power of Yunjin's Self-Produced Tracks",
    text: "Tracks like \'Raise y_our glass\' and \'I ≠ DOLL\' offer a raw, unfiltered look into the pressures of idol life. They add a layer of authenticity to the group\'s discography that is both rare and incredibly powerful, connecting with listeners on a deeper level."
  }
];

export const DetailPage: React.FC<DetailPageProps> = ({ isVisible, onNavigate }) => {
  return (
    <div id="page-detail" className={`page ${!isVisible ? 'hidden' : ''}`}>
       <style>{`
        .timeline-entry-content {
          margin-top: .75rem;
          padding-left: 2.75rem; /* Align with text, offset by avatar */
        }
        .timeline-entry-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: .4rem;
        }
        .timeline-entry-text {
          font-size: .88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .timeline-entry {
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }
        .timeline-entry:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
      `}</style>
      <div style={{paddingTop:'58px'}}>
        <div className="detail-hero">
          <div className="detail-hero-fallback" style={{background:'linear-gradient(135deg, #ff4d6d 0%, #ff8fa3 40%, #ffb3c1 100%)'}}>
            <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.15}} viewBox="0 0 800 280">
              <circle cx="400" cy="140" r="200" fill="#fff" opacity=".1"/>
            </svg>
          </div>
          <div className="detail-hero-overlay"></div>
          <div className="detail-hero-content">
            <div>
              <div className="detail-tags">
                <span className="tag tag-purple">GROUP</span>
                <span className="tag tag-teal">HYBE</span>
              </div>
              <div className="detail-title">LE SSERAFIM:<br/>The 'FEARLESS' Concept</div>
            </div>
            <button className="btn-primary" onClick={() => onNavigate('home')}>← Back</button>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-main">
            <div className="detail-stats">
              <div className="stat-item">📝 <strong>2.1k</strong> Contributions</div>
              <div className="stat-item">🕸 <strong>128</strong> Nodes</div>
            </div>
            <div className="section-title">Curated Analysis Timeline</div>
            <div className="timeline">
              {timelineAnalyses.map((item, index) => (
                <div className="timeline-entry" key={index}>
                  <div className="timeline-entry-header">
                    <div className="t-avatar" style={{ background: item.avatarBg }}>{item.avatar}</div>
                    <span className="t-name">{item.user}</span>
                  </div>
                  <div className="timeline-entry-content">
                    <div className="timeline-entry-title">{item.title}</div>
                    <div className="timeline-entry-text">{item.text}</div>
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
          </div>
        </div>
      </div>
    </div>
  );
};
