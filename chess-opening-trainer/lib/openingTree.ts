export interface OpeningNode {
  fen: string;

  move?: {
    from: string;
    to: string;
    promotion?: string;
  };

  children: OpeningNode[];

  comment?: string;
}