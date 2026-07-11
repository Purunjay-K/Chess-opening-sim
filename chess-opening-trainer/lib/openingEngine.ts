interface OpeningBookNode {
  move?: string;
  children?: Record<string, OpeningBookNode>;
}

export class OpeningEngine {
  private currentNode: OpeningBookNode;

  private startMoves: string[];
  private startIndex = 0;

  constructor(
    openingBook: OpeningBookNode,
    startingMoves: string[]
  ) {
    this.currentNode = openingBook;
    this.startMoves = startingMoves;
    console.log("Root moves:", Object.keys(this.currentNode.children ?? {}));
  }

  /**
   * Are we still forcing the opening moves?
   */
  private isInStartingSequence(): boolean {
    return this.startIndex < this.startMoves.length;
  }

  /**
   * All legal moves from the current book position.
   */
  getLegalMoves(): string[] {
    return Object.keys(this.currentNode.children ?? {});
  }

  /**
   * Player plays a move.
   */
  playPlayerMove(move: string): boolean {

    console.log("----------------");
    console.log("Current legal moves:", this.getLegalMoves());
    console.log("Player played:", move);

    // ---------- Phase 1 ----------
    // Force the player into the chosen opening.
    if (this.isInStartingSequence()) {

      const expected = this.startMoves[this.startIndex];

      if (move !== expected) {
        console.log("Move NOT found!");
        return false;
      }

      const next = this.currentNode.children?.[move];

      if (!next) {
        return false;
      }

      this.currentNode = next;
      this.startIndex++;

      return true;
    }

    // ---------- Phase 2 ----------
    // Free play inside the opening tree.
    const next = this.currentNode.children?.[move];

    if (!next) {
      return false;
    }

    this.currentNode = next;

    return true;
  }

  /**
   * Engine move.
   */
  getEngineMove(): string | null {

    // ---------- Phase 1 ----------
    if (this.isInStartingSequence()) {

      const move = this.startMoves[this.startIndex];

      const next = this.currentNode.children?.[move];

      if (!next) {

        return null;
      }

      this.currentNode = next;
      this.startIndex++;
      console.log("Engine chooses:", move);
  console.log("Next legal moves:", this.getLegalMoves());
      return move;
    }

    // ---------- Phase 2 ----------
    const legalMoves = this.getLegalMoves();

    if (legalMoves.length === 0) {
      return null;
    }

    // Temporary:
    // Later we'll choose randomly or by popularity.
    const move = legalMoves[0];

    this.currentNode = this.currentNode.children![move];

    return move;
  }

  isBookFinished(): boolean {
    return this.getLegalMoves().length === 0;
  }
}