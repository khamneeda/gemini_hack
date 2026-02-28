import React, { useState, useEffect } from 'react';
import type { RelCard } from '../types/data';
import type { CommunityPost } from '../types/post';
import { initializePosts, loadRelCards } from '../services/postStorage';
import heroImg from '../assets/lesse1.jpg';
import cardImg1 from '../assets/lesse2.jpg';
import cardImg2 from '../assets/lesse3.jpg';

interface DetailPageProps {
  isVisible: boolean;
  onNavigate: (page: 'home' | 'add') => void;
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
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: all .3s;
          backdrop-filter: blur(10px);
        }
        .community-thread:hover {
          border-color: var(--accent);
          box-shadow: 0 0 20px var(--accent-glow);
        }
        .community-thread .thread-meta {
          display: flex;
          align-items: center;
          gap: .6rem;
          margin-bottom: .5rem;
        }
        .community-thread .thread-user {
          font-size: .85rem;
          font-weight: 800;
          color: var(--accent3);
          text-transform: uppercase;
        }
        .community-thread .thread-time {
          font-size: .75rem;
          color: var(--muted);
        }
        .community-thread .thread-text {
          font-size: .95rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }
        .community-thread .thread-recs {
          font-size: .8rem;
          color: var(--muted);
          font-weight: 700;
          margin-top: .5rem;
        }
        .hover-zoom:hover {
          transform: scale(1.05);
        }
      `}</style>
      <div style={{paddingTop: 0}}>
        <div className="detail-hero" style={{margin: 0, width: '100%', borderRadius: 0}}>
          <img
            src={heroImg}
            className="detail-hero-img"
            alt="LE SSERAFIM"
          />
          <div className="detail-hero-overlay"></div>
          <div className="detail-hero-content">
            <div className="detail-tags">
              <span className="tag tag-purple">GROUP</span>
              <span className="tag tag-teal">HYBE</span>
              <span className="tag tag-red">TRENDING</span>
            </div>
            <h1 className="detail-title">LE SSERAFIM</h1>
            <p style={{color:'var(--muted)',fontWeight:800,letterSpacing:'0.2em',textTransform:'uppercase',marginTop:'1.5rem'}}>
              The 'FEARLESS' Concept Analysis
            </p>
          </div>
          <button
            className="btn-ghost"
            onClick={() => onNavigate('home')}
            style={{position:'absolute',top:100,left:'4rem',zIndex:10,background:'rgba(0,0,0,0.3)',backdropFilter:'blur(10px)'}}
          >
            ← BACK TO EXPLORE
          </button>
        </div>

        <div className="detail-body">
          <div className="detail-main">
            <div className="detail-stats">
              <div className="stat-item">📝 <strong>2.1k</strong> Contributions</div>
              <div className="stat-item">🕸 <strong>128</strong> Nodes</div>
              <div className="stat-item">🔥 <strong>98%</strong> Hot Score</div>
            </div>

            <div className="section-title">Visual Narrative Analysis</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',gap:'2.5rem',marginBottom:'5rem'}}>
              <div className="analysis-card" style={{padding:0,borderRadius:32,overflow:'hidden'}}>
                <div style={{height:280,overflow:'hidden'}}>
                  <img src={cardImg1} alt="UNFORGIVEN Performance" style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.5s ease'}} className="hover-zoom" />
                </div>
                <div style={{padding:'2rem'}}>
                  <div style={{color:'var(--accent)',fontWeight:800,fontSize:'0.85rem',marginBottom:'0.75rem',textTransform:'uppercase',letterSpacing:'0.1em'}}>CHOREOGRAPHY</div>
                  <h3 style={{fontFamily:'Syne',fontSize:'1.6rem',marginBottom:'1rem',fontWeight:800}}>UNFORGIVEN PERFORMANCE</h3>
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'1rem',lineHeight:1.7}}>
                    The powerful and synchronized movements reflect the group's unwavering determination to break social taboos.
                  </p>
                </div>
              </div>
              <div className="analysis-card" style={{padding:0,borderRadius:32,overflow:'hidden'}}>
                <div style={{height:280,overflow:'hidden'}}>
                  <img src={cardImg2} alt="FEARLESS Storyline" style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.5s ease'}} className="hover-zoom" />
                </div>
                <div style={{padding:'2rem'}}>
                  <div style={{color:'var(--accent3)',fontWeight:800,fontSize:'0.85rem',marginBottom:'0.75rem',textTransform:'uppercase',letterSpacing:'0.1em'}}>CONCEPT ART</div>
                  <h3 style={{fontFamily:'Syne',fontSize:'1.6rem',marginBottom:'1rem',fontWeight:800}}>FEARLESS STORYLINE</h3>
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'1rem',lineHeight:1.7}}>
                    A visual deep-dive into the metaphors of the 'fallen angel' and the 'undefeated' athlete.
                  </p>
                </div>
              </div>
            </div>

            <div className="section-title">Community Posts</div>
            {sortedPosts.map((post) => (
              <div className="community-thread" key={post.id}>
                {post.thumbnail && (
                  <img src={post.thumbnail} alt="" style={{width:'100%',maxHeight:200,objectFit:'cover',borderRadius:16,marginBottom:'.75rem'}} />
                )}
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

            <button
              className="add-btn"
              style={{marginTop:'3rem',padding:'0.8rem',fontSize:'0.85rem'}}
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
