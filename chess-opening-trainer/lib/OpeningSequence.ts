export class OpeningSequence {
  private moveIndex = 0;

  constructor(
    private readonly moves: string[],
    private readonly playerColor: "white" | "black"
  ) {}

  /**
   * Returns true once all forced opening moves
   * have been played.
   */
  isFinished(): boolean {
    return this.moveIndex >= this.moves.length;
  }

  /**
   * Whose turn is it in the opening sequence?
   */
  private sideToMove(): "white" | "black" {
    return this.moveIndex % 2 === 0 ? "white" : "black";
  }

  /**
   * Is it currently the player's turn?
   */
  isPlayersTurn(): boolean {
    return this.sideToMove() === this.playerColor;
  }

  /**
   * Is it currently the engine's turn?
   */
  isEngineTurn(): boolean {
    return !this.isPlayersTurn();
  }

  /**
   * Expected move at this point in the opening.
   */
  getExpectedMove(): string | null {
    if (this.isFinished()) {
      return null;
    }

    return this.moves[this.moveIndex];
  }

  /**
   * Player attempts a move.
   */
  playPlayerMove(move: string): boolean {

    console.log("========== OpeningSequence ==========");
    console.log("Player move:", move);
    console.log("Expected:", this.getExpectedMove());
    console.log("Move index:", this.moveIndex);

    if (!this.isPlayersTurn()) {
      console.log("❌ Not player's turn.");
      return false;
    }

    const expected = this.getExpectedMove();

    if (move !== expected) {
      console.log("❌ Incorrect opening move.");
      return false;
    }

    this.moveIndex++;

    console.log("✅ Accepted.");

    return true;
  }

  /**
   * Engine plays its forced move.
   */
  playEngineMove(): string | null {

    console.log("========== OpeningSequence ==========");
    console.log("Engine requested move.");
    console.log("Move index:", this.moveIndex);

    if (!this.isEngineTurn()) {
      console.log("❌ Not engine's turn.");
      return null;
    }

    const move = this.getExpectedMove();

    if (!move) {
      console.log("Opening sequence finished.");
      return null;
    }

    this.moveIndex++;

    console.log("✅ Engine plays:", move);

    return move;
  }

  /**
   * Debug information.
   */
  printStatus() {

    console.log("----------- Sequence -----------");
    console.log("Finished:", this.isFinished());
    console.log("Move Index:", this.moveIndex);
    console.log("Expected:", this.getExpectedMove());
    console.log("Side To Move:", this.sideToMove());
    console.log("Player:", this.playerColor);

  }
}