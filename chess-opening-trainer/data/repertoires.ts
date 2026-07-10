export interface Repertoire {
  id: string;
  name: string;
  moves: string[];
  color: "white" | "black";
}

export const repertoires: Repertoire[] = [
  // White openings
  {
    id: "ruy-lopez",
    name: "Ruy Lopez",
    color: "white",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"],
  },
  {
    id: "queens-gambit",
    name: "Queen's Gambit",
    color: "white",
    moves: ["d4", "d5", "c4"],
  },
  {
    id: "london-system",
    name: "London System",
    color: "white",
    moves: ["d4", "d5", "Nf3", "Nf6", "Bf4"],
  },

  // Black defenses
  {
    id: "sicilian",
    name: "Sicilian Defense",
    color: "black",
    moves: ["e4", "c5"],
  },
  {
    id: "french",
    name: "French Defense",
    color: "black",
    moves: ["e4", "e6"],
  },
  {
    id: "caro-kann",
    name: "Caro-Kann Defense",
    color: "black",
    moves: ["e4", "c6"],
  },
  {
    id: "scandinavian",
    name: "Scandinavian Defense",
    color: "black",
    moves: ["e4", "d5"],
  },
  {
    id: "pirc",
    name: "Pirc Defense",
    color: "black",
    moves: ["e4", "d6"],
  },
];
export function getRepertoire(id: string) {
  return repertoires.find((r) => r.id === id);
}