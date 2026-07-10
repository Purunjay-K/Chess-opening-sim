"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { getRepertoire } from "@/data/repertoires";

export default function PracticePage() {
  const [game, setGame] = useState(() => new Chess());

  const searchParams = useSearchParams();

  const openingId = searchParams.get("opening") ?? "";
  const repertoire = getRepertoire(openingId);

  if (!repertoire) {
    return <div>Opening not found.</div>;
  }

  const rating = searchParams.get("rating");
  const side = searchParams.get("side");

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

const history = copy.history();

// This is the move the player SHOULD have played
const expectedPlayerMove = repertoire.moves[history.length - 1];

if (move.san !== expectedPlayerMove) {
  alert(
    `Incorrect move!\n\nExpected: ${expectedPlayerMove}\nYou played: ${move.san}`
  );

  return false;
}

// Engine plays the next move in the repertoire
const nextMove = repertoire.moves[history.length];

console.log("Next theory move:", nextMove);

if (nextMove) {
  copy.move(nextMove);
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
          Opening: <strong>{repertoire.name}</strong>
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