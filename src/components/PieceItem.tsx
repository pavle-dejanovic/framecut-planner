import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Trash2 } from "lucide-react";
import type { RequiredPiece } from "../types";

interface PieceItemProps {
  piece: RequiredPiece;
  index: number;
  editingValue: { length: string; quantity: string } | undefined;
  onLengthChange: (value: string) => void;
  onQuantityChange: (value: string) => void;
  onLengthBlur: () => void;
  onQuantityBlur: () => void;
  onFocus: () => void;
  onRemove: () => void;
}

export function PieceItem({
  piece,
  index,
  editingValue,
  onLengthChange,
  onQuantityChange,
  onLengthBlur,
  onQuantityBlur,
  onFocus,
  onRemove,
}: PieceItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 p-3 border-2 rounded-lg bg-white hover:border-primary hover:shadow-sm transition-all cursor-default">
      <div className="flex-1 space-y-1">
        <Label
          htmlFor={`length-${index}`}
          className="text-xs text-muted-foreground"
        >
          Length (mm)
        </Label>
        <Input
          id={`length-${index}`}
          type="number"
          step="0.01"
          min="0.01"
          value={editingValue?.length ?? piece.length.toString()}
          onFocus={onFocus}
          onChange={(e) => onLengthChange(e.target.value)}
          onBlur={onLengthBlur}
          className="min-h-[44px] bg-white focus:bg-white hover:border-primary/70 font-medium"
          placeholder="Length"
          title="Click to edit length"
        />
      </div>
      <span className="text-lg font-semibold text-muted-foreground self-center hidden sm:inline">
        ×
      </span>
      <div className="flex-1 space-y-1">
        <Label
          htmlFor={`quantity-${index}`}
          className="text-xs text-muted-foreground"
        >
          Quantity
        </Label>
        <Input
          id={`quantity-${index}`}
          type="number"
          step="1"
          min="1"
          value={editingValue?.quantity ?? piece.quantity.toString()}
          onFocus={onFocus}
          onChange={(e) => onQuantityChange(e.target.value)}
          onBlur={onQuantityBlur}
          className="min-h-[44px] bg-white focus:bg-white hover:border-primary/70 font-medium"
          placeholder="Qty"
          title="Click to edit quantity"
        />
      </div>
      <div className="flex items-center justify-end sm:justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="min-h-[44px] min-w-[44px] hover:bg-destructive/10 hover:text-destructive"
          title="Remove piece"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

