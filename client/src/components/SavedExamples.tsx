import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Example } from "@/types/shared";
import { Eye, X, Trash2 } from "lucide-react";

interface SavedExamplesProps {
  savedExamples: Example[];
  setSequence: React.Dispatch<React.SetStateAction<number[]>>;
  resetVisualization: () => void;
  setSelectedExample: React.Dispatch<React.SetStateAction<number | null>>;
  handleDeleteExample: (id: number) => void;
  formatSequence: (seq: number[]) => string;
  toggleSelect: (id: number) => void;
}

const SavedExamples: FC<SavedExamplesProps> = ({
  savedExamples,
  setSequence,
  resetVisualization,
  setSelectedExample,
  handleDeleteExample,
  formatSequence,
  toggleSelect,
}) => {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Збережені приклади:</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
        {savedExamples.map((example) => (
          <div
            key={example.id}
            className="group relative flex items-center bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors"
          >
            <Button
              variant="ghost"
              className="w-full h-auto text-left justify-start py-1 px-2"
              onClick={() => {
                setSequence(example.sequence);
                resetVisualization();
              }}
            >
              <span className="text-xs truncate">
                [{formatSequence(example.sequence)}]
              </span>
            </Button>
            <div className="absolute right-1 flex opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-1"
                onClick={() => setSelectedExample(example.id)}
              >
                <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-1"
                onClick={() => handleDeleteExample(example.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-1"
                onClick={() => toggleSelect(example.id)}
              >
                <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              </Button>
            </div>
          </div>
        ))}
        {savedExamples.length === 0 && (
          <div className="text-sm text-gray-500 p-2">
            Відсутні збережені криклади
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedExamples;
