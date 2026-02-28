import React from 'react';
import { KnowledgeGraph } from '../KnowledgeGraph';

interface ResultsPageProps {
  isVisible: boolean;
  onNavigate: (page: 'detail') => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ isVisible, onNavigate }) => {
  return (
    <div id="page-results" className={`page ${!isVisible ? 'hidden' : ''}`}>
      <div className="results-section active" style={{maxWidth:'1300px',margin:'0 auto',padding:'5rem 2rem 4rem'}}>
        {/* Graph */}
        <div className="graph-panel">
          <div className="graph-header">
            <div className="entity-title">Entity: <span>Reze's Flowers</span></div>
            <span className="badge badge-purple">CSM</span>
            <span className="badge badge-teal">SYMBOL</span>
            <button className="btn-ghost" style={{marginLeft:'auto',fontSize:'.75rem'}} onClick={() => onNavigate('detail')}>+ Edit Entry</button>
          </div>
          
          <KnowledgeGraph />

          <div style={{padding:'.75rem 1.25rem',borderTop:'1px solid var(--border)',display:'flex',gap:'.5rem'}}>
            <button className="btn-ghost" style={{fontSize:'.72rem',padding:'.3rem .7rem'}}>+ Add Node</button>
            <button className="btn-ghost" style={{fontSize:'.72rem',padding:'.3rem .7rem'}}>⚙ Layout</button>
            <button className="btn-ghost" style={{fontSize:'.72rem',padding:'.3rem .7rem',marginLeft:'auto'}}>✕ Reset</button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-col">
          <div className="analysis-card">
            <div className="analysis-card-header">✦ AI ENTITY ANALYSIS <span className="view-all">Full Report →</span></div>
            <div className="analysis-body">
              <div style={{fontSize:'.82rem',fontWeight:600,marginBottom:'.4rem'}}>Symbolism of Ephemeral Destruction</div>
              <div className="analysis-text">
                Reze's flowers suggest "Bomb" metaphorically — they represent beauty fused with lethality...
              </div>
            </div>
          </div>

          <div className="analysis-card" style={{flex:1}}>
            <div className="analysis-card-header">💬 Community Archive <span className="view-all">See All →</span></div>
            <div className="thread-list">
              <div className="thread-item" onClick={() => onNavigate('detail')}>
                <div className="thread-meta">
                  <span className="thread-user">@BurzyRo88</span>
                  <span className="thread-time">3 days ago</span>
                </div>
                <div className="thread-text">I just said that the flower pattern on Reze's shoes matches the specific type of explosive used...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
