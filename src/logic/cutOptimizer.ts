import type {
  StockBar,
  CutResult,
  RequiredPiece,
  OptimizationAlgorithm,
} from "../types";

export function optimizeCuts(
  stockLengths: number[],
  requiredPieces: RequiredPiece[],
  algorithm: OptimizationAlgorithm = "FFD",
  kerf: number = 0
): CutResult {
  if (stockLengths.length === 0 || requiredPieces.length === 0) {
    return { bars: [], totalWaste: 0 };
  }

  // Expand required pieces into individual items
  const pieces: number[] = [];
  for (const piece of requiredPieces) {
    for (let i = 0; i < piece.quantity; i++) {
      pieces.push(piece.length);
    }
  }

  // Sort pieces by length descending
  pieces.sort((a, b) => b - a);

  // Initialize stock bars
  const bars: StockBar[] = [];
  let barId = 0;

  for (const pieceLength of pieces) {
    let placed = false;

    if (algorithm === "FFD") {
      // First-Fit Decreasing: try first bar that fits
      for (const bar of bars) {
        const availableLength = bar.length - bar.used;
        const requiredLength = pieceLength + (bar.cuts.length > 0 ? kerf : 0);

        if (availableLength >= requiredLength) {
          bar.cuts.push(pieceLength);
          bar.used += requiredLength;
          bar.waste = bar.length - bar.used;
          placed = true;
          break;
        }
      }
    } else {
      // Best-Fit Decreasing: try to find bar with smallest waste after placement
      let bestBar: StockBar | null = null;
      let bestWaste = Infinity;

      for (const bar of bars) {
        const availableLength = bar.length - bar.used;
        const requiredLength = pieceLength + (bar.cuts.length > 0 ? kerf : 0);

        if (availableLength >= requiredLength) {
          const wasteAfterPlacement = availableLength - requiredLength;
          if (wasteAfterPlacement < bestWaste) {
            bestWaste = wasteAfterPlacement;
            bestBar = bar;
          }
        }
      }

      if (bestBar) {
        const requiredLength =
          pieceLength + (bestBar.cuts.length > 0 ? kerf : 0);
        bestBar.cuts.push(pieceLength);
        bestBar.used += requiredLength;
        bestBar.waste = bestBar.length - bestBar.used;
        placed = true;
      }
    }

    // If piece doesn't fit in any existing bar, create a new one
    if (!placed) {
      // Find the smallest stock length that can accommodate this piece
      const suitableStockLengths = stockLengths.filter(
        (length) => length >= pieceLength
      );
      if (suitableStockLengths.length === 0) {
        throw new Error(
          `Piece of length ${pieceLength} is larger than any available stock bar`
        );
      }

      const stockLength = Math.min(...suitableStockLengths);
      const newBar: StockBar = {
        id: barId++,
        length: stockLength,
        used: pieceLength,
        waste: stockLength - pieceLength,
        cuts: [pieceLength],
      };

      bars.push(newBar);
    }
  }

  const totalWaste = bars.reduce((sum, bar) => sum + bar.waste, 0);

  return { bars, totalWaste };
}
