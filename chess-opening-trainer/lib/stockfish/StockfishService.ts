export class StockfishService {
  private worker: Worker;

  constructor() {
    this.worker = new Worker("/stockfish/stockfish-18-lite-single.js");
  }

  init() {
    this.worker.onmessage = (event) => {
      console.log("Stockfish:", event.data);
    };

    this.worker.postMessage("uci");
  }
}