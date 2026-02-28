import { useState } from 'react'
import './App.css'
import { KnowledgeGraph } from './KnowledgeGraph'

type Page = 'home' | 'results' | 'detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const showPage = (name: Page) => {
    setCurrentPage(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      showPage('results');
    }
  }

  const setSearch = (val: string) => {
    setSearchQuery(val);
  }

  return (
    <div className="app-container">
      {/* NAV */}
      <nav>
        <div className="nav-logo" onClick={() => showPage('home')}>Dig<span className="dot">·</span><span>Wiki</span></div>
        <div className="nav-links">
          <a onClick={() => showPage('home')}>Explore</a>
          <a>Community</a>
          <a>My Digs</a>
        </div>
        <div className="nav-right">
          <button className="btn-ghost">Sign in</button>
          <button className="btn-primary">Start Digging</button>
        </div>
      </nav>

      {/* ══════ HOME PAGE ══════ */}
      <div id="page-home" className={`page ${currentPage !== 'home' ? 'hidden' : ''}`}>
        <section className="hero">
          <div className="rings">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
          </div>

          <div className="hero-content">
            <div className="hero-badge">Knowledge Graph Explorer · Beta</div>
            <h1>Dig <em>Deeper</em> Into<br/><span className="accent-word">Any Concept</span></h1>
            <p className="hero-sub">Search any entity — character, concept, event — and explore its relational web through community-curated analysis.</p>

            <div className="search-wrap">
              <input 
                type="text" 
                placeholder="What would you like to dig today?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-btn" onClick={handleSearch}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </div>

            <div className="search-hints">
              <span className="hint-tag" onClick={() => setSearch("Reze's Flowers")}>Reze's Flowers</span>
              <span className="hint-tag" onClick={() => setSearch('Fear Devil')}>Fear Devil</span>
              <span className="hint-tag" onClick={() => setSearch('Pochita')}>Pochita</span>
              <span className="hint-tag" onClick={() => setSearch("Power's Axe")}>Power's Axe</span>
              <span className="hint-tag" onClick={() => setSearch('Gun Devil')}>Gun Devil</span>
            </div>
          </div>

          <div className="preview-row">
            <div className="preview-card" onClick={() => showPage('results')}>
              <div className="card-icon" style={{background:'rgba(108,79,246,.15)'}}>⚔️</div>
              <div className="card-title">Reze's Flowers</div>
              <div className="card-meta">237 threads · Chainsaw Man</div>
            </div>
            <div className="preview-card" onClick={() => showPage('detail')}>
              <div className="card-icon" style={{background:'rgba(0,229,200,.1)'}}>😨</div>
              <div className="card-title">Fear Devil Arc</div>
              <div className="card-meta">1.7k threads · Chainsaw Man</div>
            </div>
            <div className="preview-card">
              <div className="card-icon" style={{background:'rgba(255,77,109,.1)'}}>🔫</div>
              <div className="card-title">Gun Devil</div>
              <div className="card-meta">892 threads · Chainsaw Man</div>
            </div>
            <div className="preview-card">
              <div className="card-icon" style={{background:'rgba(247,201,72,.1)'}}>🌸</div>
              <div className="card-title">Makima's Contract</div>
              <div className="card-meta">1.1k threads · Chainsaw Man</div>
            </div>
          </div>

          <div className="scroll-hint">
            <div className="scroll-arrow">↓</div>
            scroll to explore
          </div>
        </section>
      </div>

      {/* ══════ RESULTS PAGE ══════ */}
      <div id="page-results" className={`page ${currentPage !== 'results' ? 'hidden' : ''}`}>
        <div className="results-section active" style={{maxWidth:'1300px',margin:'0 auto',padding:'5rem 2rem 4rem'}}>

          {/* Graph */}
          <div className="graph-panel">
            <div className="graph-header">
              <div className="entity-title">Entity: <span>Reze's Flowers</span></div>
              <span className="badge badge-purple">CSM</span>
              <span className="badge badge-teal">SYMBOL</span>
              <button className="btn-ghost" style={{marginLeft:'auto',fontSize:'.75rem'}} onClick={() => showPage('detail')}>+ Edit Entry</button>
            </div>
            
            <KnowledgeGraph />

            <div style={{padding:'.75rem 1.25rem',borderTop:'1px solid var(--border)',display:'flex',gap:'.5rem'}}>
              <button className="btn-ghost" style={{fontSize:'.72rem',padding:'.3rem .7rem'}}>+ Add Node</button>
              <button className="btn-ghost" style={{fontSize:'.72rem',padding:'.3rem .7rem'}}>⚙ Layout</button>
              <button className="btn-ghost" style={{fontSize:'.72rem',padding:'.3rem .7rem',marginLeft:'auto'}}>✕ Reset</button>
            </div>
          </div>

          {/* Right */}
          <div className="right-col">
            {/* AI analysis */}
            <div className="analysis-card">
              <div className="analysis-card-header">
                ✦ AI ENTITY ANALYSIS
                <span className="view-all">Full Report →</span>
              </div>
              <div className="analysis-body">
                <div style={{fontSize:'.82rem',fontWeight:600,marginBottom:'.4rem'}}>Symbolism of Ephemeral Destruction</div>
                <div className="analysis-text">
                  Reze's flowers suggest "Bomb" metaphorically — they represent beauty fused with lethality. The flowers appear as dual symbols of identity: her constructed human façade, and the explosive nature beneath. Symbolically tied to her chapter arc's themes of <em style={{color:'var(--accent2)'}}>weaponized innocence</em>.
                </div>
                <div style={{marginTop:'.75rem',display:'flex',gap:'.4rem'}}>
                  <span className="badge badge-purple">Symbolic</span>
                  <span className="badge badge-teal">Motif</span>
                </div>
              </div>
            </div>

            {/* Community archive */}
            <div className="analysis-card" style={{flex:1}}>
              <div className="analysis-card-header">
                💬 Community Archive
                <span className="view-all">See All →</span>
              </div>
              <div className="thread-list">
                <div className="thread-item" onClick={() => showPage('detail')}>
                  <div className="thread-meta">
                    <span className="thread-user">@BurzyRo88</span>
                    <span className="thread-time" style={{background:'rgba(0,229,200,.15)',color:'var(--accent2)',padding:'.1rem .4rem',borderRadius:'4px',fontSize:'.65rem'}}>PRO</span>
                    <span className="thread-time">3 days ago</span>
                  </div>
                  <div className="thread-text">I just said that the flower pattern on Reze's shoes matches the specific type of explosive used — chapter 83 hint...</div>
                  <div className="thread-reactions">
                    <span className="reaction">👍 26</span>
                    <span className="reaction">💬 8</span>
                  </div>
                </div>
                <div className="thread-item">
                  <div className="thread-meta">
                    <span className="thread-user">@MakimaObsessing</span>
                    <span className="thread-time">Yesterday</span>
                  </div>
                  <div className="thread-text">The symmetry in her transformation panels uses the flowers as a recurring motif — Fujimoto is really deliberate about framing here.</div>
                  <div className="thread-reactions">
                    <span className="reaction">👍 41</span>
                    <span className="reaction">💬 12</span>
                  </div>
                </div>
                <div className="thread-item">
                  <div className="thread-meta">
                    <span className="thread-user">@Pochita_fan</span>
                    <span className="thread-time" style={{background:'rgba(108,79,246,.2)',color:'#a98fff',padding:'.1rem .4rem',borderRadius:'4px',fontSize:'.65rem'}}>MOD</span>
                    <span className="thread-time">Today</span>
                  </div>
                  <div className="thread-text">The colors are always desaturated in flashback panels but fully vivid in the flowers — this distinction signals her emotional state shift...</div>
                  <div className="thread-reactions">
                    <span className="reaction">👍 19</span>
                    <span className="reaction">💬 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ DETAIL PAGE ══════ */}
      <div id="page-detail" className={`page ${currentPage !== 'detail' ? 'hidden' : ''}`}>
        <div style={{paddingTop:'58px'}}>
          {/* Hero banner */}
          <div className="detail-hero">
            <div className="detail-hero-fallback" style={{background:'linear-gradient(135deg,#1a0010 0%,#0a001a 40%,#000a1a 100%)'}}>
              {/* decorative pattern */}
              <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.15}} viewBox="0 0 800 280">
                <defs><radialGradient id="rg1" cx="50%" cy="50%"><stop offset="0%" stopColor="#ff0040"/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
                <circle cx="400" cy="140" r="200" fill="url(#rg1)" opacity=".4"/>
                <circle cx="100" cy="50" r="80" fill="#6c4ff6" opacity=".2"/>
                <circle cx="700" cy="200" r="100" fill="#00e5c8" opacity=".15"/>
              </svg>
            </div>
            <div className="detail-hero-overlay"></div>
            <div className="detail-hero-content">
              <div>
                <div className="detail-tags">
                  <span className="tag tag-purple">MANGA</span>
                  <span className="tag tag-teal">ANIME</span>
                  <span className="tag tag-red">DEEP LORE</span>
                </div>
                <div className="detail-title">Chainsaw Man:<br/>The Fear Devil Arc</div>
              </div>
              <div style={{textAlign:'right'}}>
                <button className="btn-primary" onClick={() => showPage('home')} style={{marginBottom:'.5rem'}}>← Back to Search</button>
              </div>
            </div>
          </div>

          <div className="detail-body">
            <div className="detail-main">
              <div className="detail-stats">
                <div className="stat-item">📝 <strong>1.7k</strong> Contributions</div>
                <div className="stat-item">🕸 <strong>489</strong> Operational Nodes</div>
                <div className="stat-item">🔗 <strong>Trending #7</strong></div>
              </div>

              <div className="section-title">Curated Analysis Timeline</div>

              <div className="timeline">
                <div className="timeline-entry">
                  <div className="timeline-entry-header">
                    <div className="t-avatar" style={{background:'linear-gradient(135deg,var(--accent),#a98fff)'}}>FU</div>
                    <span className="t-name">FujimotoFanatic</span>
                    <span className="t-tag">Yesterday</span>
                    <span className="badge badge-teal" style={{marginLeft:'auto'}}>Top Analysis</span>
                  </div>
                  <div style={{fontSize:'.85rem',fontWeight:600,marginBottom:'.35rem',color:'var(--text)'}}>The Gun Devil as a Metaphor for Nuclear Deterrence</div>
                  <div className="t-text">The global-map revelation of the Gun Devil's body directly parallels the distribution of nuclear arsenals — noting that the US suffered far more of the Gun Devil's casualties than other nations, a deliberate commentary on arms proliferation and its asymmetric costs...</div>
                  <div className="t-footer">
                    <div className="t-reactions">
                      <span className="t-reaction">👍 401</span>
                      <span className="t-reaction">💬 66 Comments</span>
                    </div>
                  </div>
                </div>

                <div className="timeline-entry">
                  <div className="timeline-entry-header">
                    <div className="t-avatar" style={{background:'linear-gradient(135deg,#00c2a8,#00e5c8)'}}>MM</div>
                    <span className="t-name">MakimaMindGlitching</span>
                    <span className="t-tag">Today</span>
                  </div>
                  <div style={{fontSize:'.85rem',fontWeight:600,marginBottom:'.35rem',color:'var(--text)'}}>Control vs. Fear: The Power Dynamic Shift</div>
                  <div className="t-text">Watching through the chapters, I think we're seeing a transition to shif — er, a return to shifi, since new devil gains power. It's moving from primal fear to societal fear, there's a subtle theory...</div>
                  <div className="t-footer">
                    <div className="t-reactions">
                      <span className="t-reaction">👍 218</span>
                      <span className="t-reaction">💬 34 Comments</span>
                    </div>
                  </div>
                </div>

                <div className="timeline-entry">
                  <div className="timeline-entry-header">
                    <div className="t-avatar" style={{background:'linear-gradient(135deg,#ff4d6d,#ff8fa3)'}}>BG</div>
                    <span className="t-name">BenzBoy</span>
                    <span className="t-tag">Today</span>
                  </div>
                  <div style={{fontSize:'.85rem',fontWeight:600,marginBottom:'.35rem',color:'var(--text)'}}>Does Pochita remember the previous universe?</div>
                  <div className="t-text">Watch question for the few ways to have Nikan Denji look past denji deja s level, the concept is sharp. But does Pochita retain memory? A few notes...</div>
                  <div className="t-footer">
                    <div className="t-reactions">
                      <span className="t-reaction">👍 97</span>
                      <span className="t-reaction">💬 1 Comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="detail-sidebar">
              <div className="section-title">Relational Navigation</div>

              <div className="rel-card">
                <div className="rel-card-title">Fujimoto's One-Shots</div>
                <div className="rel-card-meta">Thematic connection · 89 nodes</div>
              </div>
              <div className="rel-card">
                <div className="rel-card-title">Denji's Trauma Loops</div>
                <div className="rel-card-meta">Character study · 142 nodes</div>
              </div>
              <div className="rel-card">
                <div className="rel-card-title">Devil Contract Mechanics</div>
                <div className="rel-card-meta">World-building · 311 nodes</div>
              </div>
              <div className="rel-card" style={{background:'rgba(255,77,109,.05)',borderColor:'rgba(255,77,109,.2)'}}>
                <div className="rel-card-title" style={{color:'#ff8fa3'}}>GORE MOTIONS</div>
                <div className="rel-card-meta">Visual analysis · 56 nodes</div>
              </div>

              <button className="add-btn" onClick={() => alert('Sign in to contribute your analysis!')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14m-7-7h14"/></svg>
                Add My Digging
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
