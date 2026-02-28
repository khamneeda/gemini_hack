import type { CommunityPost } from '../types/post';
import type { GraphNode, GraphEdge, PreviewCard, RelCard } from '../types/data';
import {
  SEED_POSTS,
  SEED_NODES,
  SEED_EDGES,
  SEED_PREVIEWS,
  SEED_HINTS,
  SEED_RELCARDS,
} from '../data/seedData';

// ── Storage keys ──
const KEYS = {
  posts: 'digwiki_posts',
  apiKey: 'digwiki_gemini_api_key',
  nodes: 'digwiki_nodes',
  edges: 'digwiki_edges',
  previews: 'digwiki_previews',
  hints: 'digwiki_hints',
  relcards: 'digwiki_relcards',
} as const;

// ── Generic helpers ──
function load<T>(key: string, seed: T): T {
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored) as T;
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

function save<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Posts ──
export function initializePosts(): CommunityPost[] {
  return load(KEYS.posts, [...SEED_POSTS]);
}

export function savePosts(posts: CommunityPost[]): void {
  save(KEYS.posts, posts);
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
  localStorage.removeItem(KEYS.posts);
  return load(KEYS.posts, [...SEED_POSTS]);
}

// ── API Key ──
export function getApiKey(): string {
  return localStorage.getItem(KEYS.apiKey) ?? '';
}

export function saveApiKey(key: string): void {
  localStorage.setItem(KEYS.apiKey, key);
}

export function clearApiKey(): void {
  localStorage.removeItem(KEYS.apiKey);
}

// ── Graph Nodes ──
export function loadNodes(): GraphNode[] {
  return load(KEYS.nodes, [...SEED_NODES]);
}

export function saveNodes(nodes: GraphNode[]): void {
  save(KEYS.nodes, nodes);
}

// ── Graph Edges ──
export function loadEdges(): GraphEdge[] {
  return load(KEYS.edges, [...SEED_EDGES]);
}

export function saveEdges(edges: GraphEdge[]): void {
  save(KEYS.edges, edges);
}

// ── Preview Cards ──
export function loadPreviews(): PreviewCard[] {
  return load(KEYS.previews, [...SEED_PREVIEWS]);
}

export function savePreviews(previews: PreviewCard[]): void {
  save(KEYS.previews, previews);
}

// ── Search Hints ──
export function loadHints(): string[] {
  return load(KEYS.hints, [...SEED_HINTS]);
}

export function saveHints(hints: string[]): void {
  save(KEYS.hints, hints);
}

// ── Relational Cards ──
export function loadRelCards(): RelCard[] {
  return load(KEYS.relcards, [...SEED_RELCARDS]);
}

export function saveRelCards(cards: RelCard[]): void {
  save(KEYS.relcards, cards);
}

// ── Reset All ──
export function resetAll(): void {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}
