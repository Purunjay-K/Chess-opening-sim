import { OpeningSequence } from "./OpeningSequence";


export class OpeningEngine {

  private sequence: OpeningSequence;
  private currentNode: OpeningBookNode;
  

  constructor(
    openingBook: OpeningBookNode,
    startingMoves: string[],
    playerColor: "white" | "black"
  ) {

    this.currentNode = openingBook;

    this.sequence = new OpeningSequence(
      startingMoves,
      playerColor
    );

    

    console.log("");
    console.log("========== OpeningEngine ==========");
    console.log("Engine created");
    console.log("Player Color:", playerColor);
    console.log("Opening:", startingMoves.join(" "));
    console.log("==================================");
  }

  /**
   * Are we still inside the forced opening sequence?
   */
  private inSequence(): boolean {
    return !this.sequence.isFinished();
  }

  /**
   * Is it currently the player's turn?
   */
  isPlayersTurn(): boolean {

    if (this.inSequence()) {
      return this.sequence.isPlayersTurn();
    }

    return true;
  }

  /**
   * Is it currently the engine's turn?
   */
  isEngineTurn(): boolean {

    if (this.inSequence()) {
      return this.sequence.isEngineTurn();
    }

    return false;
  }
  /**
 * Player makes a move.
 */
makePlayerMove(move: string): boolean {

  console.log("");
  console.log("========== OpeningEngine ==========");
  console.log("Player move:", move);

  // --------------------------
  // Opening Sequence
  // --------------------------

  if (this.inSequence()) {

    console.log("Phase: Opening Sequence");

    const accepted = this.sequence.playPlayerMove(move);

    if (!accepted) {
      console.log("❌ OpeningSequence rejected move.");
      return false;
    }

    const next = this.currentNode.children?.[move];

    if (!next) {
      console.log("❌ Opening tree missing move:", move);
      return false;
    }

    this.currentNode = next;

    console.log("✅ Opening tree advanced.");
    console.log(
      "Next legal moves:",
      Object.keys(this.currentNode.children ?? {})
    );

    return true;
  }

  // --------------------------
  // Opening Tree
  // --------------------------

  console.log("Phase: Opening Tree");

const legalMoves = this.getLegalMoves();

console.log("Legal moves:", legalMoves);

// Book is finished.
// Accept any legal chess move.
// Stockfish will take over.
if (legalMoves.length === 0) {

  console.log("Opening book finished.");
  console.log("Accepting player move.");

  return true;
}

const next =
  this.currentNode.children?.[move];

if (!next) {

  console.log(
    "❌ Move not found in opening tree."
  );

  return false;
}

this.currentNode = next;

console.log("✅ Opening tree advanced.");

console.log(
  "Next legal moves:",
  Object.keys(this.currentNode.children ?? {})
);

return true;
} //

/**
 * Engine makes a move.
 */
async makeEngineMove(
  fen?: string
): Promise<string | null> {

  console.log("");
  console.log("========== OpeningEngine ==========");
  console.log("Engine requested move");

  // =====================================================
  // Phase 1 - Forced Opening Sequence
  // =====================================================

  if (this.inSequence()) {

    console.log("Phase: Opening Sequence");

    const move = this.sequence.playEngineMove();

    if (!move) {
      console.log("OpeningSequence returned null.");
      return null;
    }

    const next = this.currentNode.children?.[move];

    if (!next) {

      console.log(
        "Opening tree missing engine move:",
        move
      );

      return null;
    }

    this.currentNode = next;

    console.log("Engine played:", move);

    console.log(
      "Next legal moves:",
      Object.keys(this.currentNode.children ?? {})
    );

    return move;
  }

  // =====================================================
  // Phase 2 - Opening Tree
  // =====================================================

  console.log("Phase: Opening Tree");

  const legalMoves =
    Object.keys(this.currentNode.children ?? {});

  console.log("Legal moves:", legalMoves);

  if (legalMoves.length > 0) {

    const move = legalMoves[0];

    this.currentNode =
      this.currentNode.children![move];

    console.log("Book move:", move);

    console.log(
      "Next legal moves:",
      Object.keys(this.currentNode.children ?? {})
    );

    return move;
  }

  // =====================================================
  // Phase 3 - Stockfish
  // =====================================================

  console.log("");
  console.log("===============================");
  console.log("===============================");
console.log("Opening book finished.");
console.log("===============================");

return null;

  console.log(
    "Stockfish selected:",
    stockfishMove
  );

  return stockfishMove;
}

  /**
   * Returns all legal book moves
   * from the current position.
   */
  getLegalMoves(): string[] {

    return Object.keys(
      this.currentNode.children ?? {}
    );

  }

  /**
   * Returns true if there are no more
   * opening book moves remaining.
   */
  isBookFinished(): boolean {

    return (
      !this.inSequence() &&
      this.getLegalMoves().length === 0
    );

  }

  /**
   * Prints useful debugging information.
   */
  printStatus(): void {

    console.log("");
    console.log("========== Engine Status ==========");

    console.log(
      "Opening Sequence Finished:",
      !this.inSequence()
    );

    console.log(
      "Book Finished:",
      this.isBookFinished()
    );

    console.log(
      "Legal Moves:",
      this.getLegalMoves()
    );

    console.log(
      "Current Node:",
      this.currentNode
    );

    console.log("===================================");

  }
}
  