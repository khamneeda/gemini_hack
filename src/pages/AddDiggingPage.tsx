import React, { useState } from 'react';

interface AddDiggingPageProps {
  isVisible: boolean;
  onNavigate: (page: 'home' | 'results' | 'detail' | 'add') => void;
}

export const AddDiggingPage: React.FC<AddDiggingPageProps> = ({ isVisible, onNavigate }) => {
  const [relationship, setRelationship] = useState('theory');

  return (
    <div id="page-add-digging" className={`page ${!isVisible ? 'hidden' : ''}`}>
      <style>{`
        .add-digging-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 2.5rem 4rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .editor-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .editor-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Breadcrumbs */
        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--muted);
          font-family: 'Space Mono', monospace;
        }
        .breadcrumbs span.separator {
          opacity: 0.5;
        }
        .breadcrumbs a {
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .breadcrumbs a:hover {
          color: var(--accent);
        }
        .breadcrumbs .current {
          color: var(--text);
          font-weight: 600;
        }

        /* Origin Banner */
        .origin-banner {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }
        .origin-banner:hover {
          border-color: rgba(108, 79, 246, 0.4);
        }
        .origin-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          font-family: 'Space Mono', monospace;
        }
        .origin-content {
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }
        .origin-icon {
          width: 64px;
          height: 64px;
          background: var(--surface2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          border: 1px solid var(--border);
        }
        .origin-info h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }
        .origin-info p {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.5;
        }

        /* Relationship Selector */
        .relationship-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .section-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .relationship-options {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .rel-option {
          padding: 0.6rem 1.2rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--surface);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--muted);
        }
        .rel-option:hover {
          border-color: var(--accent);
          background: rgba(108, 79, 246, 0.05);
        }
        .rel-option.active {
          border-color: var(--accent);
          background: rgba(108, 79, 246, 0.15);
          color: var(--text);
          box-shadow: 0 0 15px rgba(108, 79, 246, 0.2);
        }

        /* Editor Area */
        .editor-box {
          background: rgba(17, 20, 32, 0.5);
          border: 1px solid var(--border);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          min-height: 500px;
        }
        .editor-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
        }
        .title-input {
          width: 100%;
          background: transparent;
          border: none;
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text);
          outline: none;
        }
        .title-input::placeholder {
          color: rgba(232, 234, 242, 0.2);
        }
        .editor-toolbar {
          padding: 0.5rem 1.5rem;
          border-bottom: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .tool-btn {
          background: none;
          border: none;
          color: var(--muted);
          padding: 0.4rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1.1rem;
        }
        .tool-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text);
        }
        .text-area-container {
          flex: 1;
          padding: 1.5rem;
        }
        .main-textarea {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          resize: none;
          color: var(--text);
          font-size: 1rem;
          line-height: 1.7;
          outline: none;
          min-height: 300px;
        }
        .main-textarea::placeholder {
          color: rgba(232, 234, 242, 0.2);
        }

        /* Attachment Zone */
        .attachment-zone {
          padding: 1.5rem;
          border-top: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.1);
        }
        .drop-box {
          border: 2px dashed var(--border);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          transition: all 0.2s;
          cursor: pointer;
        }
        .drop-box:hover {
          border-color: var(--accent);
          background: rgba(108, 79, 246, 0.05);
        }
        .drop-box span {
          display: block;
          color: var(--muted);
          font-size: 0.85rem;
        }
        .drop-box .icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          opacity: 0.5;
        }

        /* Actions */
        .footer-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }
        .toggle-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }
        .toggle-switch {
          width: 40px;
          height: 20px;
          background: var(--surface2);
          border-radius: 20px;
          position: relative;
          transition: background 0.3s;
        }
        .toggle-switch::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          background: #fff;
          border-radius: 50%;
          top: 2px;
          left: 2px;
          transition: transform 0.3s;
        }
        .toggle-group.active .toggle-switch {
          background: var(--accent);
        }
        .toggle-group.active .toggle-switch::after {
          transform: translateX(20px);
        }
        .toggle-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--muted);
        }

        /* Sidebar Widgets */
        .widget {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        .widget-header {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .widget-title {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .graph-preview {
          height: 240px;
          background: #090b14;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tips-list {
          padding: 1.25rem;
          list-style: none;
        }
        .tip-item {
          display: flex;
          gap: 0.75rem;
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .tip-item:last-child {
          margin-bottom: 0;
        }
        .tip-icon {
          color: var(--accent2);
        }
      `}</style>

      <div className="add-digging-container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <a onClick={() => onNavigate('home')}>Main Entity</a>
          <span className="separator">/</span>
          <a onClick={() => onNavigate('results')}>Subcategory</a>
          <span className="separator">/</span>
          <span className="current">New Digging Thread</span>
        </div>

        <div className="editor-layout">
          {/* Left Column: Editor */}
          <div className="main-editor-col">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Origin Node Banner */}
              <div className="origin-banner">
                <div className="origin-label">Branching From Origin Node</div>
                <div className="origin-content">
                  <div className="origin-icon">🎯</div>
                  <div className="origin-info">
                    <h3>Root Knowledge Node</h3>
                    <p>The primary entity or concept you are expanding upon. Your new dig will be linked here.</p>
                  </div>
                </div>
              </div>

              {/* Relationship Selector */}
              <div className="relationship-section">
                <div className="section-label">
                  <span>🔗</span> Select Relationship Type
                </div>
                <div className="relationship-options">
                  <div 
                    className={`rel-option ${relationship === 'theory' ? 'active' : ''}`}
                    onClick={() => setRelationship('theory')}
                  >
                    💡 Theory Expansion
                  </div>
                  <div 
                    className={`rel-option ${relationship === 'counter' ? 'active' : ''}`}
                    onClick={() => setRelationship('counter')}
                  >
                    ⚖️ Counter-argument
                  </div>
                  <div 
                    className={`rel-option ${relationship === 'deepdive' ? 'active' : ''}`}
                    onClick={() => setRelationship('deepdive')}
                  >
                    🔍 Deep-dive
                  </div>
                  <div 
                    className={`rel-option ${relationship === 'custom' ? 'active' : ''}`}
                    onClick={() => setRelationship('custom')}
                  >
                    ➕ Custom
                  </div>
                </div>
              </div>

              {/* Main Editor Area */}
              <div className="editor-box">
                <div className="editor-header">
                  <input 
                    type="text" 
                    className="title-input" 
                    placeholder="What's your new discovery or question?"
                  />
                </div>
                
                <div className="editor-toolbar">
                  <button className="tool-btn"><strong>B</strong></button>
                  <button className="tool-btn"><em>I</em></button>
                  <button className="tool-btn">🔗</button>
                  <div style={{ width: '1px', height: '16px', background: 'var(--border)', margin: '0 4px' }} />
                  <button className="tool-btn">≡</button>
                  <button className="tool-btn">"</button>
                  <button className="tool-btn">{'<>'}</button>
                  <div style={{ flex: 1 }} />
                  <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'Space Mono, monospace' }}>
                    Markdown supported
                  </span>
                </div>

                <div className="text-area-container">
                  <textarea 
                    className="main-textarea" 
                    placeholder="Start typing your theory... Use '@' to mention other nodes or users."
                  />
                </div>

                <div className="attachment-zone">
                  <div className="drop-box">
                    <div className="icon">📁</div>
                    <strong>Drag & drop images or references</strong>
                    <span>Supports JPG, PNG, WEBP or paste URL</span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="footer-actions">
                <div className="toggle-group active">
                  <div className="toggle-switch"></div>
                  <span className="toggle-label">Open for Debate</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn-ghost" style={{ padding: '0.6rem 1.5rem' }}>Save Draft</button>
                  <button className="btn-primary" style={{ padding: '0.6rem 2rem', fontWeight: '700' }}>
                    Publish Dig 🚀
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Context & Preview */}
          <aside className="sidebar-col">
            
            {/* Live Graph Preview */}
            <div className="widget">
              <div className="widget-header">
                <div className="widget-title">
                  <span style={{ color: 'var(--accent)' }}>🕸</span> Live Graph Preview
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4d6d' }}></div>
                  <span style={{ fontSize: '0.6rem', color: 'var(--muted)', fontFamily: 'Space Mono, monospace' }}>SYNCING</span>
                </div>
              </div>
              <div className="graph-preview">
                <svg width="200" height="180" viewBox="0 0 200 180">
                  <circle cx="100" cy="40" r="15" fill="var(--surface2)" stroke="var(--accent)" strokeWidth="2" />
                  <line x1="100" y1="55" x2="100" y2="120" stroke="var(--accent)" strokeDasharray="4 2" />
                  <circle cx="100" cy="140" r="20" fill="none" stroke="#fff" strokeDasharray="4 4" />
                  <text x="100" y="145" textAnchor="middle" fill="#fff" fontSize="12">+</text>
                  <text x="125" y="45" fill="var(--muted)" fontSize="10" fontFamily="Space Mono">Origin</text>
                  <text x="130" y="145" fill="#fff" fontSize="10" fontFamily="Space Mono">New Dig</text>
                </svg>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', fontSize: '0.75rem', color: 'var(--muted)', lineHeight: '1.4' }}>
                Your new node will be linked as a <span style={{ color: 'var(--accent)', fontWeight: '600' }}>Theory Expansion</span> to the cluster.
              </div>
            </div>

            {/* Tips Card */}
            <div className="widget">
              <div className="widget-header">
                <div className="widget-title">
                  <span style={{ color: '#f7c948' }}>💡</span> Digging Tips
                </div>
              </div>
              <ul className="tips-list">
                <li className="tip-item">
                  <span className="tip-icon">✓</span>
                  <span>Cite specific sources or time-stamps (e.g., MV 1:24).</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">✓</span>
                  <span>Link to at least 2 other related nodes for better graph stability.</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">✓</span>
                  <span>Keep titles concise; elaborate in the body.</span>
                </li>
              </ul>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};
