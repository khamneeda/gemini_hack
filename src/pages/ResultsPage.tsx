import React, { useState, useEffect } from 'react';
import { KnowledgeGraph } from '../KnowledgeGraph';
import { loadNodes, loadEdges, initializePosts, savePosts } from '../services/postStorage';
import type { GraphNode, GraphEdge } from '../types/data';
import type { CommunityPost } from '../types/post';

interface ResultsPageProps {
  isVisible: boolean;
  onNavigate: (page: 'detail') => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ isVisible, onNavigate }) => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [votedItems, setVotedItems] = useState<Record<string, 'recommend' | 'decline'>>({});

  useEffect(() => {
    setNodes(loadNodes());
    setEdges(loadEdges());
    setPosts(initializePosts());
  }, []);

  const handleVote = (id: string, voteType: 'recommend' | 'decline') => {
    const currentVote = votedItems[id];

    setPosts(prevPosts => {
      const updated = prevPosts.map(post => {
        if (post.id === id) {
          let newScore = post.hypeScore;
          if (voteType === 'recommend') {
            if (currentVote === 'recommend') newScore--;
            else if (currentVote === 'decline') newScore++;
            else newScore++;
          } else {
            if (currentVote === 'recommend') newScore--;
          }
          return { ...post, hypeScore: newScore };
        }
        return post;
      });
      savePosts(updated);
      return updated;
    });

    setVotedItems(prevVoted => {
      const newVoted = { ...prevVoted };
      if (currentVote === voteType) delete newVoted[id];
      else newVoted[id] = voteType;
      return newVoted;
    });
  };

  const sortedPosts = [...posts].sort((a, b) => b.hypeScore - a.hypeScore);

  return (
    <div id="page-results" className={`page ${!isVisible ? 'hidden' : ''}`}>
      <style>{`
        .thread-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: .8rem 4px;
          border-bottom: 1px solid var(--border);
        }
        .thread-item:last-child { border-bottom: none; }
        .thread-content { flex: 1; cursor: pointer; padding-right: 1rem; }
        .thread-actions { display: flex; align-items: center; gap: .5rem; }
        .vote-btn {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          display: flex; align-items: center; gap: .4rem;
          padding: .3rem .6rem;
          border-radius: 99px; cursor: pointer; transition: all .2s;
        }
        .vote-btn:hover { background: var(--surface2); border-color: #555; }
        .vote-btn.recommend.active { background: rgba(0, 229, 200, .1); color: #00e5c8; border-color: #00e5c8; }
        .vote-btn.decline.active { background: rgba(255, 77, 109, .1); color: #ff4d6d; border-color: #ff4d6d; }
        .vote-btn span { font-size: .75rem; font-weight: 600; font-family: 'Space Mono', monospace; }
      `}</style>

      <div className="results-section active" style={{maxWidth:'1300px',margin:'0 auto',padding:'5rem 2rem 4rem'}}>
        <div className="graph-panel">
          <div className="graph-header">
            <div className="entity-title">Entity: <span>LE SSERAFIM</span></div>
            <span className="badge badge-purple">GROUP</span>
            <span className="badge badge-teal">HYBE</span>
            <button className="btn-ghost" style={{marginLeft:'auto',fontSize:'.75rem'}} onClick={() => onNavigate('detail')}>+ Edit Entry</button>
          </div>
          <KnowledgeGraph initialNodes={nodes} edges={edges} />
          <div style={{padding:'.75rem 1.25rem',borderTop:'1px solid var(--border)',display:'flex',gap:'.5rem'}}>
            <button className="btn-ghost" style={{fontSize:'.72rem',padding:'.3rem .7rem'}}>+ Add Node</button>
            <button className="btn-ghost" style={{fontSize:'.72rem',padding:'.3rem .7rem'}}>⚙ Layout</button>
            <button className="btn-ghost" style={{fontSize:'.72rem',padding:'.3rem .7rem',marginLeft:'auto'}}>✕ Reset</button>
          </div>
        </div>

        <div className="right-col">
          <div className="analysis-card">
            <div className="analysis-card-header">✦ AI ENTITY ANALYSIS <span className="view-all">Full Report →</span></div>
            <div className="analysis-body">
              <div style={{fontSize:'.82rem',fontWeight:600,marginBottom:'.4rem'}}>Concept: 'FEARLESS'</div>
              <div className="analysis-text">LE SSERAFIM's core concept revolves around being "fearless" and moving forward without being swayed by the world's gaze...</div>
            </div>
          </div>

          <div className="analysis-card" style={{flex:1}}>
            <div className="analysis-card-header">💬 Community Archive <span className="view-all">See All →</span></div>
            <div className="thread-list">
              {sortedPosts.slice(0, 3).map(post => (
                <div className="thread-item" key={post.id}>
                  <div className="thread-content" onClick={() => onNavigate('detail')} style={{display:'flex',gap:'.75rem',alignItems:'flex-start'}}>
                    {post.thumbnail && (
                      <img src={post.thumbnail} alt="" style={{width:48,height:48,borderRadius:8,objectFit:'cover',flexShrink:0}} />
                    )}
                    <div>
                      <div className="thread-meta">
                        <span className="thread-user">{post.author}</span>
                        <span className="thread-time">{post.timestamp}</span>
                      </div>
                      <div className="thread-text">{post.content}</div>
                    </div>
                  </div>
                  <div className="thread-actions">
                    <button className={`vote-btn recommend ${votedItems[post.id] === 'recommend' ? 'active' : ''}`} onClick={() => handleVote(post.id, 'recommend')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>
                      <span>{post.hypeScore}</span>
                    </button>
                    <button className={`vote-btn decline ${votedItems[post.id] === 'decline' ? 'active' : ''}`} onClick={() => handleVote(post.id, 'decline')}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m-7-7l7 7 7-7"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
