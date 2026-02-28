import React, { useState, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  r: number;
  color: string;
  label: string;
  tier: 1 | 2 | 3;
}

const TIER_RADII = { 1: 22, 2: 9, 3: 5 };

const INITIAL_NODES: Node[] = [
  // Tier 1
  { id: 'hybe', x: 400, y: 300, r: TIER_RADII[1], color: '#6c4ff6', label: "HYBE", tier: 1 },
  { id: 'lesserafim', x: 150, y: 150, r: TIER_RADII[1], color: '#ff4d6d', label: 'LE SSERAFIM', tier: 1 },
  { id: 'newjeans', x: 650, y: 150, r: TIER_RADII[1], color: '#f7c948', label: 'NewJeans', tier: 1 },
  { id: 'bts', x: 400, y: 550, r: TIER_RADII[1], color: '#00e5c8', label: 'BTS', tier: 1 },

  // --- HYBE Children (Tier 2) ---
  { id: 'bighit', x: 280, y: 280, r: TIER_RADII[2], color: '#8972f8', label: 'Big Hit', tier: 2 },
  { id: 'pledis', x: 320, y: 190, r: TIER_RADII[2], color: '#a695f9', label: 'Pledis', tier: 2 },
  { id: 'ador', x: 520, y: 280, r: TIER_RADII[2], color: '#8972f8', label: 'ADOR', tier: 2 },
  { id: 'sourcemusic', x: 480, y: 190, r: TIER_RADII[2], color: '#a695f9', label: 'Source Music', tier: 2 },
  { id: 'belift', x: 280, y: 380, r: TIER_RADII[2], color: '#a695f9', label: 'Belift Lab', tier: 2 },
  { id: 'koz', x: 520, y: 380, r: TIER_RADII[2], color: '#8972f8', label: 'KOZ Ent.', tier: 2 },
  { id: 'txt', x: 400, y: 200, r: TIER_RADII[2], color: '#a695f9', label: 'TXT', tier: 2 },
  { id: 'seventeen', x: 340, y: 420, r: TIER_RADII[2], color: '#8972f8', label: 'SEVENTEEN', tier: 2 },
  { id: 'enhypen', x: 460, y: 420, r: TIER_RADII[2], color: '#8972f8', label: 'ENHYPEN', tier: 2 },
  
  // --- LE SSERAFIM Children (Tier 2 & 3) ---
  // Tier 2
  { id: 'chaewon', x: 80, y: 100, r: TIER_RADII[2], color: '#ff6b87', label: 'Chaewon', tier: 2 },
  { id: 'sakura', x: 130, y: 50, r: TIER_RADII[2], color: '#ff8fa3', label: 'Sakura', tier: 2 },
  { id: 'yunjin', x: 200, y: 70, r: TIER_RADII[2], color: '#ff6b87', label: 'Yunjin', tier: 2 },
  { id: 'kazuha', x: 220, y: 150, r: TIER_RADII[2], color: '#ff8fa3', label: 'Kazuha', tier: 2 },
  { id: 'eunchae', x: 180, y: 220, r: TIER_RADII[2], color: '#ff6b87', label: 'Eunchae', tier: 2 },
  { id: 'unforgiven_album', x: 50, y: 200, r: TIER_RADII[2], color: '#ff8fa3', label: 'UNFORGIVEN', tier: 2 },
  { id: 'easy_album', x: 80, y: 260, r: TIER_RADII[2], color: '#ff8fa3', label: 'EASY', tier: 2 },
  { id: 'leniverse', x: 20, y: 140, r: TIER_RADII[2], color: '#ff6b87', label: 'Leniverse', tier: 2 },
  // Tier 3
  { id: 'unforgiven_song', x: 20, y: 190, r: TIER_RADII[3], color: '#ffb3c1', label: 'UNFORGIVEN (feat. Nile Rodgers)', tier: 3 },
  { id: 'eve_psyche_song', x: 40, y: 230, r: TIER_RADII[3], color: '#ffb3c1', label: 'Eve, Psyche & The Bluebeard's wife', tier: 3 },
  { id: 'easy_song', x: 80, y: 295, r: TIER_RADII[3], color: '#ffb3c1', label: 'Easy', tier: 3 },
  { id: 'smart_song', x: 115, y: 285, r: TIER_RADII[3], color: '#ffb3c1', label: 'Smart', tier: 3 },

  // --- NewJeans Children (Tier 2 & 3) ---
  // Tier 2
  { id: 'minji', x: 580, y: 100, r: TIER_RADII[2], color: '#f8d36c', label: 'Minji', tier: 2 },
  { id: 'hanni', x: 630, y: 50, r: TIER_RADII[2], color: '#f9dd8f', label: 'Hanni', tier: 2 },
  { id: 'danielle', x: 700, y: 70, r: TIER_RADII[2], color: '#f8d36c', label: 'Danielle', tier: 2 },
  { id: 'haerin', x: 720, y: 150, r: TIER_RADII[2], color: '#f9dd8f', label: 'Haerin', tier: 2 },
  { id: 'hyein', x: 680, y: 220, r: TIER_RADII[2], color: '#f8d36c', label: 'Hyein', tier: 2 },
  { id: 'getup_ep', x: 550, y: 200, r: TIER_RADII[2], color: '#f9dd8f', label: 'Get Up', tier: 2 },
  { id: 'newjeans_ep', x: 580, y: 260, r: TIER_RADII[2], color: '#f9dd8f', label: 'New Jeans', tier: 2 },
  { id: 'jeans_zips', x: 520, y: 140, r: TIER_RADII[2], color: '#f8d36c', label: 'Jeans' Zips', tier: 2 },
  // Tier 3
  { id: 'supershy_song', x: 520, y: 190, r: TIER_RADII[3], color: '#fae7b3', label: 'Super Shy', tier: 3 },
  { id: 'eta_song', x: 540, y: 230, r: TIER_RADII[3], color: '#fae7b3', label: 'ETA', tier: 3 },
  { id: 'hypeboy_song', x: 580, y: 295, r: TIER_RADII[3], color: '#fae7b3', label: 'Hype Boy', tier: 3 },
  { id: 'attention_song', x: 615, y: 285, r: TIER_RADII[3], color: '#fae7b3', label: 'Attention', tier: 3 },

  // --- BTS Children (Tier 2 & 3) ---
  // Tier 2
  { id: 'rm', x: 300, y: 500, r: TIER_RADII[2], color: '#29e8d1', label: 'RM', tier: 2 },
  { id: 'jin', x: 350, y: 470, r: TIER_RADII[2], color: '#52eadb', label: 'Jin', tier: 2 },
  { id: 'suga', x: 450, y: 470, r: TIER_RADII[2], color: '#29e8d1', label: 'SUGA', tier: 2 },
  { id: 'jhope', x: 500, y: 500, r: TIER_RADII[2], color: '#52eadb', label: 'j-hope', tier: 2 },
  { id: 'jimin', x: 520, y: 560, r: TIER_RADII[2], color: '#29e8d1', label: 'Jimin', tier: 2 },
  { id: 'v', x: 450, y: 620, r: TIER_RADII[2], color: '#52eadb', label: 'V', tier: 2 },
  { id: 'jungkook', x: 350, y: 620, r: TIER_RADII[2], color: '#29e8d1', label: 'Jungkook', tier: 2 },
  { id: 'be_album', x: 280, y: 580, r: TIER_RADII[2], color: '#52eadb', label: 'BE', tier: 2 },
  { id: 'proof_album', x: 250, y: 540, r: TIER_RADII[2], color: '#52eadb', label: 'Proof', tier: 2 },
  { id: 'run_bts', x: 300, y: 650, r: TIER_RADII[2], color: '#29e8d1', label: 'Run BTS', tier: 2 },
  // Tier 3
  { id: 'dynamite_song', x: 250, y: 600, r: TIER_RADII[3], color: '#7aede4', label: 'Dynamite', tier: 3 },
  { id: 'life_goes_on_song', x: 290, y: 610, r: TIER_RADII[3], color: '#7aede4', label: 'Life Goes On', tier: 3 },
  { id: 'seven_song', x: 350, y: 655, r: TIER_RADII[3], color: '#7aede4', label: 'Seven', tier: 3 },
];

const EDGES: [string, string][] = [
  ['hybe', 'lesserafim'], ['hybe', 'newjeans'], ['hybe', 'bts'],
  ['hybe', 'bighit'], ['hybe', 'pledis'], ['hybe', 'ador'], ['hybe', 'sourcemusic'],
  ['hybe', 'belift'], ['hybe', 'koz'], ['hybe', 'txt'], ['hybe', 'seventeen'], ['hybe', 'enhypen'],
  
  ['sourcemusic', 'lesserafim'],
  ['ador', 'newjeans'],
  ['bighit', 'bts'],

  ['lesserafim', 'chaewon'], ['lesserafim', 'sakura'], ['lesserafim', 'yunjin'], ['lesserafim', 'kazuha'], ['lesserafim', 'eunchae'],
  ['lesserafim', 'unforgiven_album'], ['lesserafim', 'easy_album'], ['lesserafim', 'leniverse'],
  ['unforgiven_album', 'unforgiven_song'], ['unforgiven_album', 'eve_psyche_song'],
  ['easy_album', 'easy_song'], ['easy_album', 'smart_song'],

  ['newjeans', 'minji'], ['newjeans', 'hanni'], ['newjeans', 'danielle'], ['newjeans', 'haerin'], ['newjeans', 'hyein'],
  ['newjeans', 'getup_ep'], ['newjeans', 'newjeans_ep'], ['newjeans', 'jeans_zips'],
  ['getup_ep', 'supershy_song'], ['getup_ep', 'eta_song'],
  ['newjeans_ep', 'hypeboy_song'], ['newjeans_ep', 'attention_song'],

  ['bts', 'rm'], ['bts', 'jin'], ['bts', 'suga'], ['bts', 'jhope'], ['bts', 'jimin'], ['bts', 'v'], ['bts', 'jungkook'],
  ['bts', 'be_album'], ['bts', 'proof_album'], ['bts', 'run_bts'],
  ['be_album', 'dynamite_song'], ['be_album', 'life_goes_on_song'],
  ['jungkook', 'seven_song'],
];

export const KnowledgeGraph: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [dragging, setDragging] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ label: string; color: string; x: number; y: number; visible: boolean } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseDown = (id: string) => {
    setDragging(id);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !svgRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = ((clientX - rect.left) / rect.width) * (svg.viewBox.baseVal.width);
    const y = ((clientY - rect.top) / rect.height) * (svg.viewBox.baseVal.height);
    
    const node = nodes.find(n => n.id === dragging);
    if (!node) return;

    setNodes(prev => prev.map(n => 
        n.id === dragging 
        ? { ...n, x: Math.max(n.r, Math.min(svg.viewBox.baseVal.width - n.r, x)), y: Math.max(n.r, Math.min(svg.viewBox.baseVal.height - n.r, y)) } 
        : n
    ));
    
    setTooltip(null);
  };

  const handleMouseUp = () => {
    setDragging(null);
  };
  
  const handleMouseEnter = (e: React.MouseEvent, node: Node) => {
    if (dragging) return;
    const svg = svgRef.current;
    if (!svg) return;
    
    setTooltip({
      label: node.label,
      color: node.color,
      x: e.clientX,
      y: e.clientY - 10, 
      visible: true
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const TooltipPortal = () => {
    if (!tooltip) return null;
    return (
        <div 
          className="node-tooltip" 
          style={{ 
            position: 'fixed',
            left: tooltip.x, 
            top: tooltip.y, 
            transform: 'translate(-50%, -100%)',
            borderColor: tooltip.color, 
            color: tooltip.color, 
            opacity: tooltip.visible ? 1 : 0,
            background: 'var(--surface2)',
            border: '1px solid rgba(108,79,246,.4)',
            borderRadius: '8px',
            padding: '.5rem .8rem',
            fontSize: '.75rem',
            pointerEvents: 'none',
            transition: 'opacity .2s',
            zIndex: 1000,
            fontFamily: 'Space Mono, monospace',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 20px rgba(0,0,0,.4)'
          }}
        >
          {tooltip.label}
        </div>
    )
  }

  return (
      <div className="graph-canvas" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#0e1018' }}>
        <TooltipPortal />
        <svg 
          ref={svgRef}
          viewBox="0 0 800 700" 
          style={{ width: '100%', height: '100%' }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g>
            {EDGES.map(([startId, endId]) => {
              const start = nodes.find(n => n.id === startId);
              const end = nodes.find(n => n.id === endId);
              if (!start || !end) return null;
              return (
                <line 
                  key={`${startId}-${endId}`}
                  x1={start.x} y1={start.y}
                  x2={end.x} y2={end.y}
                  stroke="#414558" strokeWidth="1"
                />
              );
            })}
          </g>
          <g>
            {nodes.map(node => (
              <g 
                key={node.id} 
                style={{ cursor: dragging ? 'grabbing' : 'pointer' }}
                onMouseDown={() => handleMouseDown(node.id)}
                onTouchStart={() => handleMouseDown(node.id)}
                onMouseEnter={(e) => handleMouseEnter(e, node)}
                onMouseLeave={handleMouseLeave}
              >
                <circle 
                  cx={node.x} cy={node.y} r={node.r + (node.tier === 1 ? 8 : 4)} 
                  fill="none" stroke={node.color} strokeWidth="1" opacity=".2" 
                />
                <circle 
                  cx={node.x} cy={node.y} r={node.r} 
                  fill={node.color} filter="url(#glow)" opacity=".9" 
                />
                { (node.tier < 3) && (
                  <text 
                    x={node.x} y={node.y + node.r + 12} 
                    textAnchor="middle" fill="#9194a8" fontSize="10" fontFamily="Space Mono, monospace"
                    style={{pointerEvents: 'none'}}
                  >
                    {node.label}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>
      </div>
    );
  };
