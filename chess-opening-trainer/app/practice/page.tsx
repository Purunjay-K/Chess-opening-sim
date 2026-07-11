"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

import openingBook from "@/data/books/master.json";
import { OpeningEngine } from "@/lib/openingEngine";
import { getOpening } from "@/data/openingIndex";
import { StockfishService } from "@/lib/stockfish/StockfishService";

export default function PracticePage() {
  const searchParams = useSearchParams();

  const openingId = searchParams.get("opening") ?? "";
  const rating = searchParams.get("rating");
  const side = searchParams.get("side");

  const opening = getOpening(openingId);

  if (!opening) {
    return <div className="text-white p-10">Opening not found.</div>;
  }

  const [game, setGame] = useState(() => new Chess());

  const [engine] = useState(
    () => new OpeningEngine(openingBook, opening.startMoves)
  );

  useEffect(() => {
    const stockfish = new StockfishService();
    stockfish.init();
  }, []);

  function onDrop({
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

      if (!move) return false;

      console.log("Player played:", move.san);

      // Check if player's move is still in the opening book
      const valid = engine.playPlayerMove(move.san);

      if (!valid) {
        alert("That move is not in the selected opening.");
        return false;
      }

      // Engine book move
      const reply = engine.getEngineMove();

      if (reply) {
        console.log("Book reply:", reply);
        copy.move(reply);
      } else {
        console.log("Opening book finished.");
        // Stockfish will take over here later
      }

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
        <h1 className="text-4xl font-bold">Chess Opening Sim</h1>

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
            boardOrientation: side === "black" ? "black" : "white",
            onPieceDrop: onDrop,
          }}
        />
      </div>
    </main>
  );
}