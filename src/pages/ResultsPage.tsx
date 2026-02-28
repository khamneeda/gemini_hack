import React, { useState } from 'react';
import { KnowledgeGraph } from '../KnowledgeGraph';
import { useGeminiAnalysis } from '../hooks/useGeminiAnalysis';

interface Thread {
  id: number;
  user: string;
  time: string;
  text: string;
  recommendations: number;
}

const initialThreads: Thread[] = [
  { id: 3, user: '@sakura_stan', time: '3 days ago', text: 'Sakura\'s journey from AKB48 to IZ*ONE to LE SSERAFIM is a testament to her resilience. Truly inspiring.', recommendations: 256 },
  { id: 4, user: '@yunjin_vocals', time: '8 hours ago', text: 'Can we talk about Yunjin\'s self-produced songs? \'Raise y_our glass\' is a masterpiece.', recommendations: 198 },
  { id: 1, user: '@fearnot99', time: '1 day ago', text: 'The \'UNFORGIVEN\' music video has so many hidden details about their concept. Did anyone else notice...', recommendations: 128 },
  { id: 5, user: '@newjeans_fan', time: '2 days ago', text: 'The way NewJeans\' MVs for "Cool With You" & "Get Up" are connected is pure genius. Min Heejin\'s mind!', recommendations: 98 },
  { id: 2, user: '@kpop_theorist', time: '4 hours ago', text: 'Connecting LE SSERAFIM\'s "FEARLESS" concept to the members\' previous career paths is fascinating. It adds so much depth.', recommendations: 72 },
  { id: 6, user: '@bts_army4ever', time: '5 days ago', text: 'I think the transition from "ON" to "Dynamite" was a pivotal moment for BTS\'s global reach. What do you all think?', recommendations: 45 },
  { id: 7, user: '@chaewon_leader', time: '1 hour ago', text: 'Chaewon\'s leadership style is so effective. She leads with quiet confidence and a lot of humor.', recommendations: 33 },
];

/**
 * ✏️  EDIT THIS FUNCTION to control what content gets sent to Gemini.
 * The return value is passed directly as `contentToAnalyze`.
 */
function buildAnalysisContent(entityName: string, threads: Thread[]): string {
  const threadSummary = threads
    .map(t => `- ${t.user}: "${t.text}" (${t.recommendations} recommendations)`)
    .join('\n');

  return `Entity: ${entityName}
Label: K-pop Group under HYBE Entertainment
Debut: 2022
Members: Chaewon (leader), Sakura, Yunjin, Kazuha, Eunchae
Core Concept: FEARLESS — moving forward without being swayed by the world's gaze.
Discography highlights: FEARLESS (2022), ANTIFRAGILE (2022), UNFORGIVEN (2023), EASY (2024)

Community discussions:
${threadSummary}`;
}

interface ResultsPageProps {
  isVisible: boolean;
  searchQuery?: string;
  onNavigate: (page: 'detail') => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ isVisible, searchQuery, onNavigate }) => {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [votedItems, setVotedItems] = useState<Record<number, 'recommend' | 'decline'>>({});

  const entityName = searchQuery?.trim() || 'LE SSERAFIM';
  const contentToAnalyze = buildAnalysisContent(entityName, initialThreads);

  const { concept, streamingSummary, isStreaming, error, refetch } = useGeminiAnalysis({
    entityName,
    contentToAnalyze,
    enabled: isVisible,
  });

  const handleVote = (id: number, voteType: 'recommend' | 'decline') => {
    const currentVote = votedItems[id];

    setThreads(prevThreads =>
      prevThreads.map(thread => {
        if (thread.id === id) {
          let newRecommendations = thread.recommendations;
          if (voteType === 'recommend') {
            if (currentVote === 'recommend') newRecommendations--;
            else if (currentVote === 'decline') newRecommendations++;
            else newRecommendations++;
          } else {
            if (currentVote === 'recommend') newRecommendations--;
          }
          return { ...thread, recommendations: newRecommendations };
        }
        return thread;
      })
    );

    setVotedItems(prevVoted => {
      const newVoted = { ...prevVoted };
      if (currentVote === voteType) delete newVoted[id];
      else newVoted[id] = voteType;
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

        .ai-analysis-skeleton {
          display: flex;
          flex-direction: column;
          gap: .5rem;
        }
        .skeleton-line {
          height: .75rem;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--surface2) 25%, var(--border) 50%, var(--surface2) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        .skeleton-line.short { width: 40%; }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .ai-error {
          font-size: .78rem;
          color: #ff4d6d;
          display: flex;
          flex-direction: column;
          gap: .4rem;
        }
        .ai-retry-btn {
          align-self: flex-start;
          background: transparent;
          border: 1px solid #ff4d6d;
          color: #ff4d6d;
          font-size: .72rem;
          padding: .2rem .6rem;
          border-radius: 99px;
          cursor: pointer;
          transition: background .2s;
        }
        .ai-retry-btn:hover { background: rgba(255,77,109,.1); }
        .ai-concept-label {
          font-size: .82rem;
          font-weight: 600;
          margin-bottom: .4rem;
          color: #00e5c8;
        }
        .ai-generated-badge {
          font-size: .65rem;
          font-family: 'Space Mono', monospace;
          color: var(--text-secondary);
          letter-spacing: .04em;
          margin-left: .5rem;
          opacity: .7;
        }
        .stream-cursor {
          display: inline-block;
          width: 2px;
          height: .85em;
          background: #00e5c8;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: blink .7s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .media-list {
          display: flex;
          flex-direction: column;
          gap: .1rem;
        }
        .media-item {
          display: flex;
          align-items: flex-start;
          gap: .75rem;
          padding: .65rem 4px;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          color: inherit;
          transition: background .15s;
          border-radius: 6px;
        }
        .media-item:last-child { border-bottom: none; }
        .media-item:hover { background: var(--surface2); }
        .media-thumb {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 6px;
          background: rgba(255, 0, 0, .12);
          border: 1px solid rgba(255, 0, 0, .25);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .media-thumb svg { color: #ff4444; }
        .media-info { flex: 1; min-width: 0; }
        .media-title {
          font-size: .8rem;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .media-item:hover .media-title { color: #00e5c8; }
        .media-meta {
          font-size: .7rem;
          color: var(--text-secondary);
          margin-top: .2rem;
          font-family: 'Space Mono', monospace;
        }
        .media-tag {
          display: inline-block;
          font-size: .6rem;
          font-family: 'Space Mono', monospace;
          padding: .1rem .4rem;
          border-radius: 99px;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          margin-left: .4rem;
          vertical-align: middle;
        }
      `}</style>

      <div className="results-section active" style={{maxWidth:'1300px',margin:'0 auto',padding:'5rem 2rem 4rem'}}>
        <div className="graph-panel">
          <div className="graph-header">
            <div className="entity-title">Entity: <span>{entityName}</span></div>
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
            <div className="analysis-card-header">
              ✦ AI ENTITY ANALYSIS
              {(concept || isStreaming) && <span className="ai-generated-badge">· gemini</span>}
              <span className="view-all">Full Report →</span>
            </div>
            <div className="analysis-body">
              {/* Concept label skeleton — shown while waiting for concept */}
              {isStreaming && !concept && (
                <div className="ai-analysis-skeleton">
                  <div className="skeleton-line short" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" style={{width:'70%'}} />
                </div>
              )}

              {error && !isStreaming && (
                <div className="ai-error">
                  <span>⚠ Failed to load AI analysis: {error}</span>
                  <button className="ai-retry-btn" onClick={refetch}>↺ Retry</button>
                </div>
              )}

              {concept && (
                <>
                  <div className="ai-concept-label">Concept: '{concept}'</div>
                  <div className="analysis-text">
                    {streamingSummary}
                    {isStreaming && <span className="stream-cursor" />}
                  </div>
                </>
              )}

              {!concept && !isStreaming && !error && (
                <div className="analysis-text" style={{opacity:.5}}>Analysis will appear when the page loads...</div>
              )}
            </div>
          </div>
          {/* # TODO: Dynamically fetch media from YouTube API w/AI */}
          <div className="analysis-card">
            <div className="analysis-card-header">▶ Recommend Media <span className="view-all">More →</span></div>
            <div className="media-list">
              {[
                {
                  title: 'LE SSERAFIM (르세라핌) "FEARLESS" M/V',
                  channel: 'HYBE LABELS',
                  tag: 'M/V',
                  href: 'https://www.youtube.com/watch?v=4vbDFu0PUew',
                },
                {
                  title: '[PLAYLIST] LE SSERAFIM',
                  channel: 'le sserafim archive',
                  tag: 'PLAYLIST',
                  href: 'hhttps://www.youtube.com/watch?v=mlBG4pIkr2I',
                },
                {
                  title: 'LE SSERAFIM Coachella 2024 Full Performance',
                  channel: 'HYBE LABELS',
                  tag: 'LIVE',
                  href: 'https://www.youtube.com/watch?v=wADF_GRoieM',
                },
                {
                  title: 'LE SSERAFIM "ANTIFRAGILE" — Concept & Meaning Explained',
                  channel: 'K-pop Analysis',
                  tag: 'ANALYSIS',
                  href: 'https://www.youtube.com/watch?v=QbZhhVAf0Yc',
                },
                {
                  title: 'How LE SSERAFIM’s Genius Strategy Took Over K-pop',
                  channel: 'Kpop Explained',
                  tag: 'DOC',
                  href: 'https://www.youtube.com/watch?v=9p6oJNKYaMI',
                },
              ].map((item) => (
                <a
                  key={item.title}
                  className="media-item"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="media-thumb">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/>
                    </svg>
                  </div>
                  <div className="media-info">
                    <div className="media-title">
                      {item.title}
                      <span className="media-tag">{item.tag}</span>
                    </div>
                    <div className="media-meta">{item.channel}</div>
                  </div>
                </a>
              ))}
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
