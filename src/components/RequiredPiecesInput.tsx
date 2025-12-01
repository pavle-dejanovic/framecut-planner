import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AddPieceForm } from "./AddPieceForm";
import { PieceItem } from "./PieceItem";
import type { RequiredPiece } from "../types";

interface RequiredPiecesInputProps {
  pieces: RequiredPiece[];
  onChange: (pieces: RequiredPiece[]) => void;
}

export function RequiredPiecesInput({
  pieces,
  onChange,
}: RequiredPiecesInputProps) {
  // Local state for editing pieces - allows free editing
  const [editingPieces, setEditingPieces] = useState<{
    [key: number]: { length: string; quantity: string };
  }>({});

  // Initialize editing state when pieces change
  useEffect(() => {
    const newEditing: { [key: number]: { length: string; quantity: string } } =
      {};
    pieces.forEach((piece, index) => {
      // Preserve existing editing values if they exist, otherwise initialize from piece
      if (editingPieces[index]) {
        newEditing[index] = editingPieces[index];
      } else {
        newEditing[index] = {
          length: piece.length.toString(),
          quantity: piece.quantity.toString(),
        };
      }
    });
    // Only update if structure changed (pieces added/removed)
    if (Object.keys(newEditing).length !== Object.keys(editingPieces).length) {
      setEditingPieces(newEditing);
    }
  }, [pieces.length]);

  const handleAdd = (length: number, quantity: number) => {
    const newPieces = [...pieces, { length, quantity }];
    onChange(newPieces);

    // Initialize editing state for the new piece
    const newIndex = newPieces.length - 1;
    setEditingPieces((prev) => ({
      ...prev,
      [newIndex]: {
        length: length.toString(),
        quantity: quantity.toString(),
      },
    }));
  };

  const handleRemove = (index: number) => {
    const updated = pieces.filter((_, i) => i !== index);
    onChange(updated);

    // Clean up editing state
    const newEditing: { [key: number]: { length: string; quantity: string } } =
      {};
    updated.forEach((piece, i) => {
      if (editingPieces[i]) {
        newEditing[i] = editingPieces[i];
      } else {
        newEditing[i] = {
          length: piece.length.toString(),
          quantity: piece.quantity.toString(),
        };
      }
    });
    setEditingPieces(newEditing);
  };

  const handleInputChange = (
    index: number,
    field: "length" | "quantity",
    value: string
  ) => {
    // Allow any input during editing
    setEditingPieces((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  const handleInputBlur = (index: number, field: "length" | "quantity") => {
    const editingValue = editingPieces[index]?.[field] || "";
    const numValue =
      field === "length"
        ? parseFloat(editingValue)
        : parseInt(editingValue, 10);
    const currentValue = pieces[index][field];

    // Validate and update if valid, otherwise revert to current value
    if (!isNaN(numValue) && numValue > 0) {
      const updated = [...pieces];
      updated[index] = { ...updated[index], [field]: numValue };
      onChange(updated);

      // Update editing state with validated value
      setEditingPieces((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [field]: numValue.toString(),
        },
      }));
    } else {
      // Revert to current value
      setEditingPieces((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [field]: currentValue.toString(),
        },
      }));
    }
  };

  const ensureEditingState = (index: number) => {
    if (!editingPieces[index]) {
      setEditingPieces((prev) => ({
        ...prev,
        [index]: {
          length: pieces[index].length.toString(),
          quantity: pieces[index].quantity.toString(),
        },
      }));
    }
  };

  return (
    <Card className="shadow-lg border-2 flex flex-col min-h-0">
      <CardHeader className="border-b bg-linear-to-r from-emerald-50 to-teal-50 p-4 sm:p-6 shrink-0">
        <CardTitle className="text-lg sm:text-xl">Required Pieces</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-4 sm:p-6 gap-3 sm:gap-4 min-h-0 flex-1">
        <AddPieceForm onAdd={handleAdd} />

        {pieces.length > 0 && (
          <div className="flex flex-col space-y-2 flex-1 min-h-0">
            <div className="flex items-center justify-between shrink-0">
              <Label className="text-sm font-semibold">Added Pieces</Label>
              <span className="text-xs text-muted-foreground italic">
                Click any field to edit
              </span>
            </div>
            <div className="space-y-2 overflow-y-auto flex-1 min-h-0">
              {pieces.map((piece, index) => (
                <PieceItem
                  key={index}
                  piece={piece}
                  index={index}
                  editingValue={editingPieces[index]}
                  onLengthChange={(value) =>
                    handleInputChange(index, "length", value)
                  }
                  onQuantityChange={(value) =>
                    handleInputChange(index, "quantity", value)
                  }
                  onLengthBlur={() => handleInputBlur(index, "length")}
                  onQuantityBlur={() => handleInputBlur(index, "quantity")}
                  onFocus={() => ensureEditingState(index)}
                  onRemove={() => handleRemove(index)}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
