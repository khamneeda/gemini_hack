import React, { useState, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  r: number;
  color: string;
  label: string;
}

const INITIAL_NODES: Node[] = [
  { id: 'reze', x: 300, y: 240, r: 22, color: '#6c4ff6', label: "Reze's Flowers" },
  { id: 'bomb', x: 170, y: 130, r: 16, color: '#ff4d6d', label: 'Bomb Devil' },
  { id: 'death', x: 430, y: 100, r: 14, color: '#f7c948', label: 'Death Motif' },
  { id: 'denji', x: 460, y: 280, r: 18, color: '#00e5c8', label: 'Denji' },
  { id: 'lang', x: 160, y: 310, r: 13, color: '#7eb8ff', label: 'Language of Flowers' },
  { id: 'chapter', x: 340, y: 390, r: 12, color: '#a98fff', label: 'Chapter 40-52' },
];

const EDGES: [string, string][] = [
  ['reze', 'bomb'], ['reze', 'death'], ['reze', 'denji'],
  ['reze', 'lang'], ['reze', 'chapter'], ['bomb', 'death'], ['denji', 'chapter'],
];

export const KnowledgeGraph: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [dragging, setDragging] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ label: string; color: string; x: number; y: number; visible: boolean }>({
    label: '', color: '', x: 0, y: 0, visible: false
  });
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

    const x = ((clientX - rect.left) / rect.width) * 600;
    const y = ((clientY - rect.top) / rect.height) * 480;

    setNodes(prev => prev.map(n => n.id === dragging ? { ...n, x: Math.max(30, Math.min(570, x)), y: Math.max(30, Math.min(450, y)) } : n));
    
    // Update tooltip position if visible
    if (tooltip.visible) {
      setTooltip(prev => ({ ...prev, x: clientX - rect.left + 14, y: clientY - rect.top - 10 }));
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleMouseEnter = (e: React.MouseEvent, node: Node) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltip({
      label: node.label,
      color: node.color,
      x: e.clientX - rect.left + 14,
      y: e.clientY - rect.top - 10,
      visible: true
    });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="graph-canvas" style={{ width: '100%', height: '480px', position: 'relative', overflow: 'hidden' }}>
      <div 
        className="node-tooltip" 
        style={{ 
          left: tooltip.x, 
          top: tooltip.y, 
          borderColor: tooltip.color, 
          color: tooltip.color, 
          opacity: tooltip.visible ? 1 : 0,
          position: 'absolute',
          background: 'var(--surface2)',
          border: '1px solid rgba(108,79,246,.4)',
          borderRadius: '8px',
          padding: '.5rem .8rem',
          fontSize: '.75rem',
          pointerEvents: 'none',
          transition: 'opacity .2s',
          zIndex: 10,
          fontFamily: 'Space Mono, monospace',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 20px rgba(0,0,0,.4)'
        }}
      >
        {tooltip.label}
      </div>
      <svg 
        ref={svgRef}
        viewBox="0 0 600 480" 
        style={{ width: '100%', height: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {EDGES.map(([aId, bId], i) => {
          const a = nodes.find(n => n.id === aId);
          const b = nodes.find(n => n.id === bId);
          if (!a || !b) return null;
          return (
            <line 
              key={i}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y} 
              stroke="rgba(255,255,255,0.07)" 
              strokeWidth="1.5" 
            />
          );
        })}

        {nodes.map(node => (
          <g 
            key={node.id} 
            style={{ cursor: 'pointer' }}
            onMouseDown={() => handleMouseDown(node.id)}
            onTouchStart={() => handleMouseDown(node.id)}
            onMouseEnter={(e) => handleMouseEnter(e, node)}
            onMouseLeave={handleMouseLeave}
          >
            <circle 
              cx={node.x} cy={node.y} r={node.r + 8} 
              fill="none" stroke={node.color} strokeWidth="1" opacity=".2" 
            />
            <circle 
              cx={node.x} cy={node.y} r={node.r} 
              fill={node.color} filter="url(#glow)" opacity=".9" 
            />
            <text 
              x={node.x} y={node.y + node.r + 14} 
              textAnchor="middle" fill="#9194a8" fontSize="10" fontFamily="Space Mono, monospace"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
