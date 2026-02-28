import React, { useState, useEffect } from 'react';
import type { RelCard } from '../types/data';
import type { CommunityPost } from '../types/post';
import { initializePosts, loadRelCards } from '../services/postStorage';

interface DetailPageProps {
  isVisible: boolean;
  onNavigate: (page: 'home') => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({ isVisible, onNavigate }) => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [relCards, setRelCards] = useState<RelCard[]>([]);

  useEffect(() => {
    setPosts(initializePosts());
    setRelCards(loadRelCards());
  }, []);

  const sortedPosts = [...posts].sort((a, b) => b.hypeScore - a.hypeScore);

  return (
    <div id="page-detail" className={`page ${!isVisible ? 'hidden' : ''}`}>
       <style>{`
        .community-thread {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          margin-bottom: .75rem;
          transition: border-color .2s;
        }
        .community-thread:hover {
          border-color: rgba(108,79,246,.3);
        }
        .community-thread .thread-meta {
          display: flex;
          align-items: center;
          gap: .5rem;
          margin-bottom: .4rem;
        }
        .community-thread .thread-user {
          font-size: .78rem;
          font-weight: 600;
          font-family: 'Space Mono', monospace;
          color: var(--accent2);
        }
        .community-thread .thread-time {
          font-size: .68rem;
          color: var(--muted);
        }
        .community-thread .thread-text {
          font-size: .85rem;
          line-height: 1.6;
          color: #a8abc0;
        }
        .community-thread .thread-recs {
          font-size: .72rem;
          color: var(--muted);
          font-family: 'Space Mono', monospace;
          margin-top: .4rem;
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
            <div className="section-title">Community Posts</div>
            {sortedPosts.map((post) => (
              <div className="community-thread" key={post.id}>
                <div className="thread-meta">
                  <span className="thread-user">{post.author}</span>
                  <span className="thread-time">{post.timestamp}</span>
                </div>
                <div className="thread-text">{post.content}</div>
                <div className="thread-recs">▲ {post.hypeScore}</div>
              </div>
            ))}
          </div>

          <div className="detail-sidebar">
            <div className="section-title">Relational Navigation</div>
            {relCards.map((card) => (
              <div className="rel-card" key={card.id}>
                <div className="rel-card-title">{card.title}</div>
                <div className="rel-card-meta">{card.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
