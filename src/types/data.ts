export interface GraphNode {
  id: string;
  x: number;
  y: number;
  r: number;
  color: string;
  label: string;
  tier: 1 | 2 | 3;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface PreviewCard {
  id: string;
  title: string;
  meta: string;
  icon: string;
  bgColor: string;
}

export interface RelCard {
  id: string;
  title: string;
  meta: string;
}
