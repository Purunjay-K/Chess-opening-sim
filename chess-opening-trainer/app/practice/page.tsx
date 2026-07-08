"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import openingBook from "@/data/books/master.json";
import { OpeningEngine } from "@/lib/openingEngine";


export default function PracticePage() {
  const [game, setGame] = useState(() => new Chess());
  const [engine] = useState(() => new OpeningEngine(openingBook));
  const searchParams = useSearchParams();

  const rating = searchParams.get("rating");
  const side = searchParams.get("side");
  const opening = searchParams.get("opening");

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

      const replies = engine.getReplies(copy.history());

      console.log("Engine replies:", replies);

      if (replies.length > 0) {
        const reply = replies[0];

        console.log("Computer plays:", reply);

        copy.move(reply);
      }

      setGame(copy);

      return true;
    } catch (err) {
  console.error(err);
  return false;
}
  }
  console.log(engine.getReplies(game.history()));

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
        Opening: <strong>{opening}</strong>
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
