export interface OpeningNode {
  move: string | null;
  children: Map<string, OpeningNode>;
  openingName?: string;
  eco?: string;
}

export function createRoot(): OpeningNode {
  return {
    move: null,
    children: new Map(),
  };
}