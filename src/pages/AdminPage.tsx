import React, { useState, useEffect, useCallback } from 'react';
import type { CommunityPost, StatusFilter } from '../types/post';
import {
  initializePosts,
  updatePost,
  resetPosts,
  getApiKey,
  saveApiKey,
  clearApiKey,
} from '../services/postStorage';
import { factCheckPost } from '../services/geminiService';
import { PostCard } from '../components/PostCard';
import './AdminPage.css';

interface AdminPageProps {
  isVisible: boolean;
  onNavigate: (page: 'home') => void;
}

const FILTERS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
];

export const AdminPage: React.FC<AdminPageProps> = ({ isVisible, onNavigate }) => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [loadingPostId, setLoadingPostId] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPosts(initializePosts());
    const stored = getApiKey();
    const envKey = import.meta.env.VITE_GEMINI_API_KEY ?? '';
    setApiKey(stored || envKey);
  }, []);

  const filteredPosts =
    filter === 'all' ? posts : posts.filter((p) => p.status === filter);

  const counts = {
    all: posts.length,
    pending: posts.filter((p) => p.status === 'pending').length,
    approved: posts.filter((p) => p.status === 'approved').length,
    rejected: posts.filter((p) => p.status === 'rejected').length,
  };

  const handleSaveApiKey = useCallback(() => {
    const trimmed = apiKeyInput.trim();
    if (trimmed) {
      saveApiKey(trimmed);
      setApiKey(trimmed);
      setApiKeyInput('');
    }
  }, [apiKeyInput]);

  const handleClearApiKey = useCallback(() => {
    clearApiKey();
    setApiKey('');
  }, []);

  const handleFactCheck = useCallback(
    async (id: string) => {
      const post = posts.find((p) => p.id === id);
      if (!post || !apiKey) return;

      setLoadingPostId(id);
      setError(null);

      try {
        const result = await factCheckPost(apiKey, post.content, post.entity);
        setPosts((prev) => updatePost(prev, id, { factCheckResult: result }));
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Fact check failed';
        if (message.includes('API_KEY_INVALID') || message.includes('401')) {
          setError('Invalid API key. Please check and re-enter.');
        } else if (message.includes('Failed to fetch') || message.includes('network')) {
          setError('Network error. Please check your connection.');
        } else {
          setError(`Fact check error: ${message}`);
        }
      } finally {
        setLoadingPostId(null);
      }
    },
    [posts, apiKey],
  );

  const handleApprove = useCallback((id: string) => {
    setPosts((prev) => updatePost(prev, id, { status: 'approved' }));
  }, []);

  const handleReject = useCallback((id: string) => {
    setPosts((prev) => updatePost(prev, id, { status: 'rejected' }));
  }, []);

  const handleReset = useCallback(() => {
    setPosts(resetPosts());
    setFilter('all');
    setError(null);
  }, []);

  return (
    <div id="page-admin" className={`page ${!isVisible ? 'hidden' : ''}`}>
      <div className="admin-section">
        {/* Header */}
        <div className="admin-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="admin-title">
                Fact<span>Check</span> Admin
              </div>
              <p className="admin-subtitle">
                Review community posts, run AI fact-checking, and approve or reject entries.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.25rem' }}>
              <button className="btn-ghost" onClick={() => onNavigate('home')}>
                ← Back
              </button>
              <button className="btn-reset" onClick={handleReset}>
                Reset Data
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat">
            <div className="admin-stat-value">{counts.all}</div>
            <div className="admin-stat-label">Total Posts</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-value pending-color">{counts.pending}</div>
            <div className="admin-stat-label">Pending</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-value approved-color">{counts.approved}</div>
            <div className="admin-stat-label">Approved</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-value rejected-color">{counts.rejected}</div>
            <div className="admin-stat-label">Rejected</div>
          </div>
        </div>

        {/* API Key */}
        <div className="api-key-card">
          <div className="api-key-label">Google AI API Key</div>
          <div className="api-key-row">
            {apiKey ? (
              <>
                <div className="api-key-saved">
                  {apiKey.slice(0, 6)}{'•'.repeat(12)}{apiKey.slice(-4)}
                </div>
                <button className="btn-ghost" onClick={handleClearApiKey}>
                  Clear
                </button>
              </>
            ) : (
              <>
                <input
                  className="api-key-input"
                  type="password"
                  placeholder="Enter your Gemini API key..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveApiKey()}
                />
                <button className="btn-primary" onClick={handleSaveApiKey}>
                  Save
                </button>
              </>
            )}
          </div>
          <div className="api-key-warn">
            Key is stored locally in your browser.
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        {/* Filters */}
        <div className="status-filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-tab ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              <span className="filter-count">({counts[f.key]})</span>
            </button>
          ))}
        </div>

        {/* Post List */}
        {filteredPosts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No posts found for this filter.</p>
          </div>
        ) : (
          filteredPosts
            .sort((a, b) => b.hypeScore - a.hypeScore)
            .map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onFactCheck={handleFactCheck}
                onApprove={handleApprove}
                onReject={handleReject}
                isLoading={loadingPostId === post.id}
                hasApiKey={!!apiKey}
              />
            ))
        )}
      </div>
    </div>
  );
};
