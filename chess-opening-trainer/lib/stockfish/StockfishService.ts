export class StockfishService {
  private worker: Worker | null = null;

  private ready = false;

async init(): Promise<void> {

  // Already initialized
  if (this.ready) {
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  if (!this.worker) {

    this.worker = new Worker(
      "/stockfish/stockfish-18-lite-single.js"
    );

  }

  return new Promise((resolve) => {

    this.worker!.onmessage = (event) => {

      const line = event.data as string;

      console.log("Stockfish:", line);

      if (line === "uciok") {

        this.ready = true;

        console.log("✅ Stockfish ready.");

        resolve();

      }

    };

    this.worker!.postMessage("uci");

  });

}

  async getBestMove(
    fen: string,
    depth: number = 12
  ): Promise<string> {

    if (!this.worker) {
      throw new Error("Stockfish not initialized.");
    }

    return new Promise((resolve) => {

      this.worker!.onmessage = (event) => {

        const line = event.data as string;

        console.log("Stockfish:", line);

        if (line.startsWith("bestmove")) {

          resolve(line.split(" ")[1]);

        }

      };

      this.worker!.postMessage(`position fen ${fen}`);
      this.worker!.postMessage(`go depth ${depth}`);

    });
  }
}