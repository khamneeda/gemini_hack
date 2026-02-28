import React from 'react';
import type { CommunityPost } from '../types/post';
import { FactCheckBadge } from './FactCheckBadge';

interface PostCardProps {
  post: CommunityPost;
  onFactCheck: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isLoading: boolean;
  hasApiKey: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onFactCheck,
  onApprove,
  onReject,
  isLoading,
  hasApiKey,
}) => {
  const date = new Date(post.timestamp);
  const timeAgo = getTimeAgo(date);

  return (
    <div className={`post-card post-status-${post.status}`}>
      <div className="post-header">
        <div className="post-meta">
          <span className="post-author">{post.author}</span>
          <span className="post-entity badge-purple">{post.entity}</span>
          <span className="post-time">{timeAgo}</span>
        </div>
        <div className="post-hype">
          <span className="hype-count">{post.hypeScore.toLocaleString()}</span>
          <span className="hype-label">hype</span>
        </div>
      </div>

      <p className="post-content">{post.content}</p>

      {post.factCheckResult && <FactCheckBadge result={post.factCheckResult} />}

      <div className="post-actions">
        {post.status === 'pending' && (
          <>
            <button
              className="btn-fact-check"
              onClick={() => onFactCheck(post.id)}
              disabled={!hasApiKey || isLoading}
              title={!hasApiKey ? 'Set API key first' : ''}
            >
              {isLoading ? (
                <span className="spinner" />
              ) : (
                'Fact Check'
              )}
            </button>
            <button
              className="btn-approve"
              onClick={() => onApprove(post.id)}
              disabled={isLoading}
            >
              Approve
            </button>
            <button
              className="btn-reject"
              onClick={() => onReject(post.id)}
              disabled={isLoading}
            >
              Reject
            </button>
          </>
        )}
        {post.status === 'approved' && (
          <span className="status-label status-approved">Approved</span>
        )}
        {post.status === 'rejected' && (
          <span className="status-label status-rejected">Rejected</span>
        )}
      </div>
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
