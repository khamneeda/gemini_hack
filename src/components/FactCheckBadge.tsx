import React from 'react';
import type { FactCheckResult } from '../types/post';

interface FactCheckBadgeProps {
  result: FactCheckResult;
}

const VERDICT_CONFIG = {
  factual: { label: 'Factual', className: 'verdict-factual' },
  misleading: { label: 'Misleading', className: 'verdict-misleading' },
  unverified: { label: 'Unverified', className: 'verdict-unverified' },
} as const;

export const FactCheckBadge: React.FC<FactCheckBadgeProps> = ({ result }) => {
  const config = VERDICT_CONFIG[result.verdict];
  const date = new Date(result.checkedAt);
  const timeAgo = getTimeAgo(date);

  return (
    <div className={`fact-check-result ${config.className}`}>
      <div className="fact-check-header">
        <span className={`verdict-badge ${config.className}`}>
          {config.label}
        </span>
        <span className="confidence">Confidence: {result.confidence}%</span>
        <span className="check-time">{timeAgo}</span>
      </div>
      <p className="fact-check-reasoning">{result.reasoning}</p>
    </div>
  );
};

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
