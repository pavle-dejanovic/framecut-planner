export interface RequiredPiece {
  length: number;
  quantity: number;
}

export interface StockBar {
  id: number;
  length: number;
  used: number;
  waste: number;
  cuts: number[];
}

export interface CutResult {
  bars: StockBar[];
  totalWaste: number;
}

export type OptimizationAlgorithm = "FFD" | "BFD";
