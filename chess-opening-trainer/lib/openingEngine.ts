interface OpeningBookNode {
  children?: Record<string, OpeningBookNode>;
}

export class OpeningEngine {
  private openingBook: OpeningBookNode;

  constructor(openingBook: OpeningBookNode) {
    this.openingBook = openingBook;
  }

  private getNode(moveHistory: string[]): OpeningBookNode | null {
    let currentNode = this.openingBook;

    for (const move of moveHistory) {
      const nextNode = currentNode.children?.[move];

      if (!nextNode) {
        return null;
      }

      currentNode = nextNode;
    }

    return currentNode;
  }

  getReplies(moveHistory: string[]): string[] {
    const node = this.getNode(moveHistory);

    if (!node?.children) {
      return [];
    }

    return Object.keys(node.children);
  }
}
