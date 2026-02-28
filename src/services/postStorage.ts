import type { CommunityPost } from '../types/post';
import { MOCK_POSTS } from '../data/mockPosts';

const STORAGE_KEY = 'digwiki_posts';
const API_KEY_STORAGE_KEY = 'digwiki_gemini_api_key';

export function initializePosts(): CommunityPost[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as CommunityPost[];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_POSTS));
  return [...MOCK_POSTS];
}

export function savePosts(posts: CommunityPost[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function updatePost(
  posts: CommunityPost[],
  id: string,
  updates: Partial<CommunityPost>,
): CommunityPost[] {
  const updated = posts.map((p) => (p.id === id ? { ...p, ...updates } : p));
  savePosts(updated);
  return updated;
}

export function resetPosts(): CommunityPost[] {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_POSTS));
  return [...MOCK_POSTS];
}

export function getApiKey(): string {
  return localStorage.getItem(API_KEY_STORAGE_KEY) ?? '';
}

export function saveApiKey(key: string): void {
  localStorage.setItem(API_KEY_STORAGE_KEY, key);
}

export function clearApiKey(): void {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
}
