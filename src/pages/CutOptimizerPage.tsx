import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { RequiredPiecesInput } from "../components/RequiredPiecesInput";
import { BarVisualization } from "../components/BarVisualization";
import { optimizeCuts } from "../logic/cutOptimizer";
import type { RequiredPiece, CutResult, OptimizationAlgorithm } from "../types";
import { Calculator, FileJson, Info, Sparkles } from "lucide-react";

export function CutOptimizerPage() {
  const [stockLength, setStockLength] = useState("6000");
  const [numStockBars, setNumStockBars] = useState("10");
  const [requiredPieces, setRequiredPieces] = useState<RequiredPiece[]>([
    { length: 1200, quantity: 5 },
    { length: 800, quantity: 3 },
  ]);
  const [kerf, setKerf] = useState("3");
  const [algorithm, setAlgorithm] = useState<OptimizationAlgorithm>("FFD");
  const [result, setResult] = useState<CutResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    try {
      const stockLengthNum = parseFloat(stockLength);
      const kerfNum = parseFloat(kerf);

      if (isNaN(stockLengthNum) || stockLengthNum <= 0) {
        throw new Error("Stock length must be a positive number");
      }

      if (isNaN(kerfNum) || kerfNum < 0) {
        throw new Error("Kerf must be a non-negative number");
      }

      if (requiredPieces.length === 0) {
        throw new Error("Please add at least one required piece");
      }

      const numBars = parseInt(numStockBars, 10) || 1;
      const stockLengths = Array(numBars).fill(stockLengthNum);

      const cutResult = optimizeCuts(
        stockLengths,
        requiredPieces,
        algorithm,
        kerfNum
      );

      setResult(cutResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const handleExportJSON = () => {
    if (!result) return;

    const data = {
      stockLength: parseFloat(stockLength),
      kerf: parseFloat(kerf),
      algorithm,
      requiredPieces,
      result,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cutting-plan.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        <div className="text-center space-y-2 sm:space-y-3 pt-2 sm:pt-4">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 mb-1 sm:mb-2">
            <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent px-2">
            1D Cutting Optimizer
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Calculate optimal cutting plans for metal/aluminum bars with
            advanced algorithms
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <Card className="shadow-lg border-2">
            <CardHeader className="border-b bg-linear-to-r from-blue-50 to-slate-50 p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">
                Stock Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <div className="space-y-2">
                <Label htmlFor="stockLength">Stock Bar Length (mm)</Label>
                <Input
                  id="stockLength"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={stockLength}
                  onChange={(e) => setStockLength(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numBars">Number of Stock Bars</Label>
                <Input
                  id="numBars"
                  type="number"
                  step="1"
                  min="1"
                  value={numStockBars}
                  onChange={(e) => setNumStockBars(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kerf">Saw Blade Kerf (mm)</Label>
                <Input
                  id="kerf"
                  type="number"
                  step="0.01"
                  min="0"
                  value={kerf}
                  onChange={(e) => setKerf(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="algorithm">Optimization Algorithm</Label>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
                <Select
                  value={algorithm}
                  onValueChange={(value) =>
                    setAlgorithm(value as OptimizationAlgorithm)
                  }
                >
                  <SelectTrigger id="algorithm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FFD">
                      First-Fit Decreasing (FFD)
                    </SelectItem>
                    <SelectItem value="BFD">
                      Best-Fit Decreasing (BFD)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-3 p-3 sm:p-4 bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-blue-900 mb-1 sm:mb-2 text-xs sm:text-sm">
                        {algorithm === "FFD"
                          ? "First-Fit Decreasing (FFD)"
                          : "Best-Fit Decreasing (BFD)"}
                      </div>
                      <div className="text-blue-800 leading-relaxed text-xs space-y-2">
                        {algorithm === "FFD" ? (
                          <>
                            <p>
                              <strong>How it works:</strong> Sorts pieces by
                              length (largest first), then places each piece
                              into the <strong>first available bar</strong> that
                              has enough space.
                            </p>
                            <p>
                              <strong>Best for:</strong> Quick calculations with
                              many similar-sized pieces. Typically uses 1-3%
                              more material than optimal but runs very fast.
                            </p>
                            <p className="text-blue-700 font-medium">
                              💡 <strong>Expect:</strong> Fast results, good
                              optimization for most real-world scenarios.
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              <strong>How it works:</strong> Sorts pieces by
                              length (largest first), then places each piece in
                              the bar that results in the{" "}
                              <strong>smallest remaining waste</strong> after
                              placement.
                            </p>
                            <p>
                              <strong>Best for:</strong> When minimizing waste
                              is critical. Examines all available bars to find
                              the best fit, resulting in better material
                              utilization.
                            </p>
                            <p className="text-blue-700 font-medium">
                              💡 <strong>Expect:</strong> Slightly slower but
                              typically 1-5% less waste than FFD. Recommended
                              for expensive materials.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <RequiredPiecesInput
            pieces={requiredPieces}
            onChange={setRequiredPieces}
          />
        </div>

        <div className="flex justify-center gap-4 pt-2 px-2">
          <Button
            onClick={handleCalculate}
            size="lg"
            className="gap-2 shadow-lg hover:shadow-xl transition-all duration-200 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto min-h-[48px]"
          >
            <Calculator className="h-5 w-5" />
            <span className="whitespace-nowrap">Calculate Optimal Plan</span>
          </Button>
        </div>

        {error && (
          <Card className="border-2 border-destructive bg-destructive/5 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-destructive font-medium text-center">
                {error}
              </p>
            </CardContent>
          </Card>
        )}

        {result && (
          <>
            <Card className="shadow-lg border-2">
              <CardHeader className="border-b bg-linear-to-r from-green-50 to-emerald-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-lg sm:text-xl">
                    Optimization Results
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportJSON}
                    className="gap-2 hover:bg-primary/10"
                  >
                    <FileJson className="h-4 w-4" />
                    Export JSON
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 sm:pt-6 p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                  <div className="p-3 sm:p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-700">
                      {result.bars.length}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Bars Used
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="text-2xl sm:text-3xl font-bold text-orange-700">
                      {result.totalWaste.toFixed(2)}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Total Waste (mm)
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-700">
                      {result.bars.length > 0
                        ? (
                            (result.totalWaste /
                              (result.bars.length * parseFloat(stockLength))) *
                            100
                          ).toFixed(1)
                        : "0"}
                      %
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Waste %
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <BarVisualization
              bars={result.bars}
              stockLength={parseFloat(stockLength)}
            />
          </>
        )}
      </div>
    </div>
  );
}
