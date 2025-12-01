import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus } from "lucide-react";

interface AddPieceFormProps {
  onAdd: (length: number, quantity: number) => void;
}

export function AddPieceForm({ onAdd }: AddPieceFormProps) {
  const [newLength, setNewLength] = useState("");
  const [newQuantity, setNewQuantity] = useState("1");

  const handleAdd = () => {
    const length = parseFloat(newLength);
    const quantity = parseInt(newQuantity, 10);

    if (isNaN(length) || length <= 0 || isNaN(quantity) || quantity <= 0) {
      return;
    }

    onAdd(length, quantity);
    setNewLength("");
    setNewQuantity("1");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 shrink-0">
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
  );
}

