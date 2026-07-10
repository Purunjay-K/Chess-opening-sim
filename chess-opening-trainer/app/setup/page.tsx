"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { repertoires } from "@/data/repertoires";


const whiteRepertoires = repertoires.filter(r => r.color === "white");
const blackRepertoires = repertoires.filter(r => r.color === "black");



const ratings = Array.from({ length: 30 }, (_, i) => (i + 1) * 100);

export default function SetupPage() {
  const [rating, setRating] = useState(1200);
  const [side, setSide] = useState("white");
  const [opening, setOpening] = useState(
  blackRepertoires[0].id
);

  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-900 text-white flex justify-center items-center">
      <div className="w-full max-w-lg rounded-xl bg-slate-800 p-8 shadow-lg">

        <h1 className="text-4xl font-bold mb-8">
          Setup Practice
        </h1>

        <label className="block mb-2 text-lg">
          Your Rating
        </label>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full rounded-lg bg-slate-700 p-3 mb-8"
        >
          {ratings.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-lg">
          Play As
        </label>

        <div className="space-y-3">

          <label className="block">
            <input
              type="radio"
              checked={side === "white"}
              onChange={() => {
            setSide("white");
            setOpening(blackRepertoires[0].id);
}}
            />

            <span className="ml-2">
              White
            </span>

          </label>

          <label className="block">
            <input
              type="radio"
              checked={side === "black"}
              onChange={() => {
            setSide("black");
            setOpening(whiteRepertoires[0].id);
}}
            />

            <span className="ml-2">
              Black
            </span>

          </label>

        </div>
        <div className="mt-8">
  <label className="block mb-2 text-lg">
    Choose Opening
  </label>

  <select
    value={opening}
    onChange={(e) => setOpening(e.target.value)}
    className="w-full rounded-lg bg-slate-700 p-3"
  >
    {(side === "white"
  ? blackRepertoires
  : whiteRepertoires
).map((rep) => (
  <option key={rep.id} value={rep.id}>
    {rep.name}
  </option>
))}
  </select>
</div>
<button
  onClick={() => {
    const params = new URLSearchParams({
      rating: rating.toString(),
      side,
      opening,
    });

    console.log("Opening:", opening);
    console.log("Navigating to:", `/practice?${params.toString()}`);

    router.push(`/practice?${params.toString()}`);
  }}
  className="mt-8 w-full rounded-lg bg-green-600 py-3 text-lg font-semibold hover:bg-green-700 transition"
>
  Start Practicing
</button>

      </div>
    </main>
  );
}