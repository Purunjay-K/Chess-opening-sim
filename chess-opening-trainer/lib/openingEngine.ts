interface Repertoire {
  moves: string[];
}

export class OpeningEngine {
  private repertoire: Repertoire;

  constructor(repertoire: Repertoire) {
    this.repertoire = repertoire;
  }

  getReplies(moveHistory: string[]): string[] {
    const nextMove = this.repertoire.moves[moveHistory.length];

    if (!nextMove) {
      return [];
    }

    return [nextMove];
  }
}