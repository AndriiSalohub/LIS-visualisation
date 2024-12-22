/* eslint-disable react/prop-types */
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const formatFullSequence = (seq) => {
  if (seq.length <= 10) {
    return seq.join(", ");
  }

  return seq
    .reduce((rows, num, index) => {
      const rowIndex = Math.floor(index / 10);
      if (!rows[rowIndex]) {
        rows[rowIndex] = [];
      }
      rows[rowIndex].push(num);
      return rows;
    }, [])
    .map((row) => row.join(", "))
    .join(",\n");
};

const SequenceDialog = ({ sequence, onClose, onLoad }) => {
  const stats = {
    length: sequence.length,
    min: Math.min(...sequence),
    max: Math.max(...sequence),
  };

  return (
    <DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
      <DialogHeader>
        <DialogTitle>Деталі послідовності</DialogTitle>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-2 sm:p-3 rounded-lg">
              <div className="text-xs text-gray-500 capitalize">{key}</div>
              <div className="font-medium">{value}</div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Візуальне прев'ю:</div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 bg-gray-50 p-2 sm:p-4 rounded-lg">
            {sequence.map((num, idx) => (
              <div
                key={idx}
                className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white border rounded-md text-xs sm:text-sm"
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Необроблена послідовність:</div>
          <div className="bg-gray-50 p-2 sm:p-4 rounded-lg">
            <pre className="text-xs sm:text-sm whitespace-pre-wrap break-all font-mono">
              [{formatFullSequence(sequence)}]
            </pre>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
        <Button onClick={onLoad} className="w-20 sm:w-24">
          Завантажити
        </Button>
        <Button variant="outline" onClick={onClose} className="w-20 sm:w-24">
          Закрити
        </Button>
      </div>
    </DialogContent>
  );
};

export default SequenceDialog;
