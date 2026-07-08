"use client";

import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function PracticePage() {
  const [game, setGame] = useState(() => new Chess());

  function onDrop({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: string;
    targetSquare: string;
  }) {
    const copy = new Chess(game.fen());

    try {
      const move = copy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (!move) return false;

      setGame(copy);

      return true;
    } catch {
      return false;
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div style={{ width: 600 }}>
        <Chessboard
          options={{
            position: game.fen(),
            onPieceDrop: onDrop,
          }}
        />
      </div>
    </main>
  );
}