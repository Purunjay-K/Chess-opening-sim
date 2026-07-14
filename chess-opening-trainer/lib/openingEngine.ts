import { OpeningSequence } from "./OpeningSequence";

interface OpeningBookNode {
  move?: string;
  children?: Record<string, OpeningBookNode>;
}

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

    console.log("========== OpeningEngine ==========");
    console.log("Engine created");
    console.log("Player:", playerColor);
    console.log("Opening:", startingMoves.join(" "));
  }

  /**
   * Is the opening sequence finished?
   */
  private inSequence(): boolean {
    return !this.sequence.isFinished();
  }

  /**
   * Should the player move?
   */
  isPlayersTurn(): boolean {
    if (this.inSequence()) {
      return this.sequence.isPlayersTurn();
    }

    return true;
  }

  /**
   * Should the engine move?
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
    console.log("Player:", move);

    // --------------------------
    // Opening Sequence
    // --------------------------

    if (this.inSequence()) {

      console.log("Phase: Opening Sequence");

      const accepted =
        this.sequence.playPlayerMove(move);

      if (!accepted) {
        return false;
      }

      const next =
        this.currentNode.children?.[move];

      if (next) {
        this.currentNode = next;
      }

      return true;
    }

    // --------------------------
    // Opening Tree
    // --------------------------

    console.log("Phase: Opening Tree");

    const next =
      this.currentNode.children?.[move];

    if (!next) {
      console.log("Move not found in tree.");

      return false;
    }

    this.currentNode = next;

    return true;
  }

  /**
   * Engine makes a move.
   */
  makeEngineMove(): string | null {

    console.log("");
    console.log("========== OpeningEngine ==========");
    console.log("Engine requested move");

    // --------------------------
    // Opening Sequence
    // --------------------------

    if (this.inSequence()) {

      console.log("Phase: Opening Sequence");

      const move =
        this.sequence.playEngineMove();

      if (!move) {
        return null;
      }

      const next =
        this.currentNode.children?.[move];

      if (next) {
        this.currentNode = next;
      }

      return move;
    }

    // --------------------------
    // Opening Tree
    // --------------------------

    console.log("Phase: Opening Tree");

    const legalMoves =
      Object.keys(this.currentNode.children ?? {});

    console.log("Legal Moves:", legalMoves);

    if (legalMoves.length === 0) {

      console.log("Opening book finished.");

      return null;
    }

    /**
     * Temporary:
     * Always play the first move.
     * Later this becomes weighted random.
     */
    const move = legalMoves[0];

    this.currentNode =
      this.currentNode.children![move];

    console.log("Engine chooses:", move);

    return move;
  }

  /**
   * All legal theory moves
   * from the current position.
   */
  getLegalMoves(): string[] {

    return Object.keys(
      this.currentNode.children ?? {}
    );

  }

  /**
   * Book finished?
   */
  isBookFinished(): boolean {

    return (
      !this.inSequence() &&
      this.getLegalMoves().length === 0
    );

  }

  /**
   * Debug helper.
   */
  printStatus() {

    console.log("");
    console.log("========== Engine Status ==========");

    console.log(
      "Opening Sequence Finished:",
      !this.inSequence()
    );

    console.log(
      "Legal Moves:",
      this.getLegalMoves()
    );

    this.sequence.printStatus();

  }
}