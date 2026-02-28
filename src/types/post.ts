export type PostStatus = 'pending' | 'approved' | 'rejected';

export type FactCheckVerdict = 'factual' | 'misleading' | 'unverified';

export interface FactCheckResult {
  verdict: FactCheckVerdict;
  confidence: number;
  reasoning: string;
  checkedAt: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  entity: string;
  timestamp: string;
  status: PostStatus;
  factCheckResult: FactCheckResult | null;
  hypeScore: number;
}

export type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';
