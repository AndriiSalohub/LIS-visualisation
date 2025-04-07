import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

interface RangeSelectionProps {
  minRange: string;
  maxRange: string;
  sequenceLength: string;
  handleMinRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSequenceLengthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  generateRandomSequence: () => void;
  handleSaveExample: () => void;
  error: string;
}

const RangeSelection: FC<RangeSelectionProps> = ({
  minRange,
  maxRange,
  sequenceLength,
  handleMinRangeChange,
  handleMaxRangeChange,
  handleSequenceLengthChange,
  generateRandomSequence,
  handleSaveExample,
  error,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="text-sm font-medium text-foreground">
          Діапазон генерації:
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-24">
              <label className="text-xs text-muted-foreground mb-1 block">
                Мінімум
              </label>
              <Input
                type="number"
                placeholder="Мін"
                className="w-full border-border bg-background text-foreground placeholder-muted-foreground"
                value={minRange}
                onChange={handleMinRangeChange}
              />
            </div>
            <div className="w-24">
              <label className="text-xs text-muted-foreground mb-1 block">
                Максимум
              </label>
              <Input
                type="number"
                placeholder="Макс"
                className="w-full border-border bg-background text-foreground placeholder-muted-foreground"
                value={maxRange}
                onChange={handleMaxRangeChange}
              />
            </div>
            <div className="w-24">
              <label className="text-xs text-muted-foreground block">
                Довжина
              </label>
              <Input
                type="number"
                placeholder="Розмір"
                className="w-full border-border bg-background text-foreground placeholder-muted-foreground"
                value={sequenceLength}
                onChange={handleSequenceLengthChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex-shrink-0"
              onClick={generateRandomSequence}
            >
              Генерувати
            </Button>
            <Button
              variant="outline"
              className="flex-shrink-0"
              onClick={handleSaveExample}
            >
              <Save className="h-4 w-4 mr-2" />
              Зберегти приклад
            </Button>
          </div>
        </div>
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 mt-2 p-2 bg-red-50 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default RangeSelection;
