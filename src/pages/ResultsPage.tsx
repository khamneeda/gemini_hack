import React, { useState } from 'react';
import { KnowledgeGraph } from '../KnowledgeGraph';

// Interface for a single thread item
interface Thread {
  id: number;
  user: string;
  time: string;
  text: string;
  recommendations: number;
}

// Initial data for the community archive, pre-sorted for initial view
const initialThreads: Thread[] = [
  { id: 3, user: '@sakura_stan', time: '3 days ago', text: 'Sakura\'s journey from AKB48 to IZ*ONE to LE SSERAFIM is a testament to her resilience. Truly inspiring.', recommendations: 256 },
  { id: 4, user: '@yunjin_vocals', time: '8 hours ago', text: 'Can we talk about Yunjin\'s self-produced songs? \'Raise y_our glass\' is a masterpiece.', recommendations: 198 },
  { id: 1, user: '@fearnot99', time: '1 day ago', text: 'The \'UNFORGIVEN\' music video has so many hidden details about their concept. Did anyone else notice...', recommendations: 128 },
  { id: 5, user: '@newjeans_fan', time: '2 days ago', text: 'The way NewJeans\' MVs for "Cool With You" & "Get Up" are connected is pure genius. Min Heejin\'s mind!', recommendations: 98 },
  { id: 2, user: '@kpop_theorist', time: '4 hours ago', text: 'Connecting LE SSERAFIM\'s "FEARLESS" concept to the members\' previous career paths is fascinating. It adds so much depth.', recommendations: 72 },
  { id: 6, user: '@bts_army4ever', time: '5 days ago', text: 'I think the transition from "ON" to "Dynamite" was a pivotal moment for BTS\'s global reach. What do you all think?', recommendations: 45 },
  { id: 7, user: '@chaewon_leader', time: '1 hour ago', text: 'Chaewon\'s leadership style is so effective. She leads with quiet confidence and a lot of humor.', recommendations: 33 },
];

interface ResultsPageProps {
  isVisible: boolean;
  onNavigate: (page: 'detail') => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ isVisible, onNavigate }) => {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [votedItems, setVotedItems] = useState<Record<number, 'recommend' | 'decline'>>({});

  const handleVote = (id: number, voteType: 'recommend' | 'decline') => {
    const currentVote = votedItems[id];

    setThreads(prevThreads =>
      prevThreads.map(thread => {
        if (thread.id === id) {
          let newRecommendations = thread.recommendations;
          if (voteType === 'recommend') {
            if (currentVote === 'recommend') newRecommendations--; // Undo recommendation
            else if (currentVote === 'decline') newRecommendations++; // Change from decline to recommend
            else newRecommendations++; // New recommendation
          } else { // voteType is 'decline'
            if (currentVote === 'recommend') newRecommendations--; // Change from recommend to decline
          }
          return { ...thread, recommendations: newRecommendations };
        }
        return thread;
      })
    );

    setVotedItems(prevVoted => {
      const newVoted = { ...prevVoted };
      if (currentVote === voteType) delete newVoted[id]; // Undo vote
      else newVoted[id] = voteType; // Add new or changed vote
      return newVoted;
    });
  };

  const sortedThreads = [...threads].sort((a, b) => b.recommendations - a.recommendations);

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
          <KnowledgeGraph />
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
              {sortedThreads.map(thread => (
                <div className="thread-item" key={thread.id}>
                  <div className="thread-content" onClick={() => onNavigate('detail')}>
                    <div className="thread-meta">
                      <span className="thread-user">{thread.user}</span>
                      <span className="thread-time">{thread.time}</span>
                    </div>
                    <div className="thread-text">{thread.text}</div>
                  </div>
                  <div className="thread-actions">
                    <button className={`vote-btn recommend ${votedItems[thread.id] === 'recommend' ? 'active' : ''}`} onClick={() => handleVote(thread.id, 'recommend')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>
                      <span>{thread.recommendations}</span>
                    </button>
                    <button className={`vote-btn decline ${votedItems[thread.id] === 'decline' ? 'active' : ''}`} onClick={() => handleVote(thread.id, 'decline')}>
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
