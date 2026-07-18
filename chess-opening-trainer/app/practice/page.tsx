"use client";
import { StockfishService } from "@/lib/stockfish/StockfishService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

import openingBook from "@/data/books/master.json";
import { OpeningEngine } from "@/lib/openingEngine";
import { getOpening } from "@/data/openingIndex";


export default function PracticePage() {
  const searchParams = useSearchParams();

  const openingId = searchParams.get("opening") ?? "";
  const rating = searchParams.get("rating") ?? "1200";
  const side =
    (searchParams.get("side") as "white" | "black") ?? "white";

  const opening = getOpening(openingId);

  if (!opening) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <h1 className="text-3xl">Opening not found.</h1>
      </main>
    );
  }

  const [game, setGame] = useState(() => new Chess());

  const [engine] = useState(
    () =>
      new OpeningEngine(
        openingBook,
        opening.startMoves,
        side
      )
  );
  const [stockfish] = useState(
  () => new StockfishService()
);

  console.log("Engine object:", engine);
console.log(
  "Engine methods:",
  Object.getOwnPropertyNames(Object.getPrototypeOf(engine))
);

  // -----------------------------
  // Initialise Stockfish
  // -----------------------------
  
  // -----------------------------
  // Engine makes the first move
  // when the player chose Black.
  // -----------------------------
 useEffect(() => {

  async function playFirstMove() {

  await stockfish.init();

    if (!engine.isEngineTurn()) {
      return;
    }

    const move = await engine.makeEngineMove();

    if (!move) {
      return;
    }

    const copy = new Chess();

    // Opening book returns SAN
    // (Stockfish won't be used here because this
    // is only the very first move.)
    copy.move(move);

    setGame(copy);
  }

  playFirstMove();

}, [engine, stockfish]);

  // -----------------------------
  // Player Move
  // -----------------------------
  async function onDrop({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: string;
    targetSquare: string | null;
  }) {

    if (!targetSquare) return false;

    const copy = new Chess(game.fen());

    try {

      const move = copy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (!move) {
        return false;
      }

      console.log("================================");
      console.log("Player SAN:", move.san);

      // Ask OpeningEngine if the move is allowed.
      const valid =
        engine.makePlayerMove(move.san);

      if (!valid) {

        alert(
          "That move is not part of the selected opening."
        );

        return false;
      }

      // Engine replies.
      let reply = await engine.makeEngineMove();

if (reply === null) {

  console.log("Opening book finished.");
  console.log("Switching to Stockfish...");

  reply = await stockfish.getBestMove(
    copy.fen()
  );

}

console.log("Engine:", reply);

// Detect UCI moves from Stockfish
const isUCIMove =
  /^[a-h][1-8][a-h][1-8][qrbn]?$/i.test(reply);

if (isUCIMove) {

  copy.move({
    from: reply.substring(0, 2),
    to: reply.substring(2, 4),
    promotion:
      reply.length === 5
        ? reply[4]
        : "q",
  });

} else {

  // Opening book SAN move
  copy.move(reply);

}

        // Later:
        // Stockfish takes over here.

      

      setGame(copy);

      return true;

    } catch (err) {

      console.error(err);

      return false;

    }

  }

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">

      <div className="mb-8 text-center">

        <h1 className="text-4xl font-bold">
          Chess Opening Sim
        </h1>

        <p className="mt-4">
          Rating: <strong>{rating}</strong>
        </p>

        <p>
          Playing as: <strong>{side}</strong>
        </p>

        <p>
          Opening: <strong>{opening.name}</strong>
        </p>

      </div>

      <div style={{ width: 600 }}>

        <Chessboard
          options={{
            position: game.fen(),
            boardOrientation:
              side === "black"
                ? "black"
                : "white",
            onPieceDrop: onDrop,
          }}
        />

      </div>

    </main>
  );
}