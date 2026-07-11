export interface OpeningIndexEntry {
  id: string;
  name: string;
  color: "white" | "black";
  startMoves: string[];
}

export const openingIndex: OpeningIndexEntry[] = [
  {
    id: "sicilian",
    name: "Sicilian Defense",
    color: "black",
    startMoves: ["e4", "c5"],
  },
  {
    id: "french",
    name: "French Defense",
    color: "black",
    startMoves: ["e4", "e6"],
  },
  {
    id: "caro-kann",
    name: "Caro-Kann Defense",
    color: "black",
    startMoves: ["e4", "c6"],
  },
  {
    id: "scandinavian",
    name: "Scandinavian Defense",
    color: "black",
    startMoves: ["e4", "d5"],
  },
  {
    id: "pirc",
    name: "Pirc Defense",
    color: "black",
    startMoves: ["e4", "d6"],
  },
  {
    id: "ruy-lopez",
    name: "Ruy Lopez",
    color: "white",
    startMoves: ["e4", "e5", "Nf3", "Nc6", "Bb5"],
  },
  {
    id: "italian",
    name: "Italian Game",
    color: "white",
    startMoves: ["e4", "e5", "Nf3", "Nc6", "Bc4"],
  },
  {
    id: "queens-gambit",
    name: "Queen's Gambit",
    color: "white",
    startMoves: ["d4", "d5", "c4"],
  },
  {
    id: "london",
    name: "London System",
    color: "white",
    startMoves: ["d4", "d5", "Nf3", "Nf6", "Bf4"],
  },
];

export function getOpening(id: string) {
  return openingIndex.find((o) => o.id === id);
}

export function getWhiteOpenings() {
  return openingIndex.filter((o) => o.color === "white");
}

export function getBlackOpenings() {
  return openingIndex.filter((o) => o.color === "black");
}