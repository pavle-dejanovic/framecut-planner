import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Plus, Trash2 } from "lucide-react";
import type { RequiredPiece } from "../types";

interface RequiredPiecesInputProps {
  pieces: RequiredPiece[];
  onChange: (pieces: RequiredPiece[]) => void;
}

export function RequiredPiecesInput({
  pieces,
  onChange,
}: RequiredPiecesInputProps) {
  const [newLength, setNewLength] = useState("");
  const [newQuantity, setNewQuantity] = useState("1");

  const handleAdd = () => {
    const length = parseFloat(newLength);
    const quantity = parseInt(newQuantity, 10);

    if (isNaN(length) || length <= 0 || isNaN(quantity) || quantity <= 0) {
      return;
    }

    onChange([...pieces, { length, quantity }]);
    setNewLength("");
    setNewQuantity("1");
  };

  const handleRemove = (index: number) => {
    onChange(pieces.filter((_, i) => i !== index));
  };

  const handleUpdate = (
    index: number,
    field: "length" | "quantity",
    value: string
  ) => {
    const updated = [...pieces];
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      updated[index] = { ...updated[index], [field]: numValue };
      onChange(updated);
    }
  };

  return (
    <Card className="shadow-lg border-2">
      <CardHeader className="border-b bg-linear-to-r from-emerald-50 to-teal-50 p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">Required Pieces</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          <div className="flex-1">
            <Label htmlFor="length">Length</Label>
            <Input
              id="length"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="e.g., 120.5"
              value={newLength}
              onChange={(e) => setNewLength(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              step="1"
              min="1"
              placeholder="e.g., 5"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleAdd}
              className="gap-2 w-full sm:w-auto min-h-[44px]"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        {pieces.length > 0 && (
          <div className="space-y-2">
            <Label>Added Pieces</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {pieces.map((piece, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 border-2 rounded-lg bg-white hover:border-primary/50 transition-colors"
                >
                  <div className="flex-1">
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={piece.length}
                      onChange={(e) =>
                        handleUpdate(index, "length", e.target.value)
                      }
                      className="min-h-[44px]"
                    />
                  </div>
                  <span className="text-sm self-center hidden sm:inline">
                    ×
                  </span>
                  <div className="flex-1">
                    <Input
                      type="number"
                      step="1"
                      min="1"
                      value={piece.quantity}
                      onChange={(e) =>
                        handleUpdate(index, "quantity", e.target.value)
                      }
                      className="min-h-[44px]"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(index)}
                    className="min-h-[44px] min-w-[44px]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
