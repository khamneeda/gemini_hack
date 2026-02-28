import React, { useState, useEffect, useRef } from 'react';
import type { GraphNode, GraphEdge } from './types/data';

interface KnowledgeGraphProps {
  initialNodes: GraphNode[];
  edges: GraphEdge[];
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ initialNodes, edges }) => {
  const [nodes, setNodes] = useState<GraphNode[]>(initialNodes);

  useEffect(() => {
    if (initialNodes.length > 0) setNodes(initialNodes);
  }, [initialNodes]);
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

  const handleMouseEnter = (e: React.MouseEvent, node: GraphNode) => {
    if (dragging) return;
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
            {edges.map((edge) => {
              const start = nodes.find(n => n.id === edge.from);
              const end = nodes.find(n => n.id === edge.to);
              if (!start || !end) return null;
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
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
