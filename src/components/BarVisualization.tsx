import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { StockBar } from "../types";

interface BarVisualizationProps {
  bars: StockBar[];
  stockLength: number;
}

export function BarVisualization({
  bars,
  stockLength: _stockLength,
}: BarVisualizationProps) {
  if (bars.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-lg border-2">
      <CardHeader className="border-b bg-linear-to-r from-indigo-50 to-purple-50">
        <CardTitle className="text-lg sm:text-xl">
          Cutting Plan Visualization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 p-4 sm:p-6">
        {bars.map((bar) => {
          const wastePercentage = (bar.waste / bar.length) * 100;

          return (
            <div
              key={bar.id}
              className="space-y-2 sm:space-y-3 p-3 sm:p-4 rounded-lg border-2 bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold text-primary">
                      #{bar.id + 1}
                    </span>
                  </div>
                  <span className="font-semibold text-base sm:text-lg">
                    Bar #{bar.id + 1}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-4 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <span className="text-muted-foreground">Used:</span>
                    <span className="font-semibold text-blue-600 truncate">
                      {bar.used.toFixed(2)} mm
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <span className="text-muted-foreground">Waste:</span>
                    <span className="font-semibold text-red-600 truncate">
                      {bar.waste.toFixed(2)} mm
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-semibold truncate">
                      {bar.length.toFixed(2)} mm
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative h-12 sm:h-16 border-2 border-gray-300 rounded-lg overflow-hidden shadow-inner bg-gray-50">
                <div className="flex h-full">
                  {bar.cuts.map((cut, cutIndex) => {
                    const cutPercentage = (cut / bar.length) * 100;
                    return (
                      <div
                        key={cutIndex}
                        className="h-full bg-linear-to-br from-blue-500 to-blue-600 border-r-2 border-blue-700/30 flex items-center justify-center text-xs text-white font-bold shadow-sm hover:from-blue-600 hover:to-blue-700 transition-colors"
                        style={{ width: `${cutPercentage}%` }}
                        title={`Cut: ${cut.toFixed(2)} mm`}
                      >
                        {cutPercentage > 8 ? `${cut.toFixed(1)}` : ""}
                      </div>
                    );
                  })}
                  {bar.waste > 0 && (
                    <div
                      className="h-full bg-linear-to-br from-red-200 to-red-300 flex items-center justify-center text-xs text-red-900 font-medium"
                      style={{ width: `${wastePercentage}%` }}
                      title={`Waste: ${bar.waste.toFixed(2)} mm`}
                    >
                      {wastePercentage > 5
                        ? `${bar.waste.toFixed(1)} waste`
                        : ""}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[10px] sm:text-xs text-muted-foreground bg-slate-50 p-2 rounded border wrap-break-word">
                <span className="font-semibold">Cuts:</span>{" "}
                <span className="break-all">{bar.cuts.join(" + ")}</span> ={" "}
                {bar.used.toFixed(2)} mm |{" "}
                <span className="font-semibold">Waste:</span>{" "}
                {bar.waste.toFixed(2)} mm (
                {((bar.waste / bar.length) * 100).toFixed(1)}%)
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
