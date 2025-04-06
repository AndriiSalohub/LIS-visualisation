import { FC } from "react";
import { Card } from "@/components/ui/card";
import { AlgorithmState } from "@/types/shared";

interface DetailedViewProps {
  algorithmState: AlgorithmState;
  transitionDuration: number;
}

const DetailedView: FC<DetailedViewProps> = ({
  algorithmState,
  transitionDuration,
}) => {
  return (
    <Card className="p-3 sm:p-4 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Масив довжини (d):</div>
          <div className="flex flex-wrap gap-2">
            {algorithmState.d.map((val, idx) => (
              <div
                key={idx}
                className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border rounded bg-white text-sm"
                style={{
                  transition: `all ${transitionDuration}ms ease-in-out`,
                }}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">
            Попередній індексний масив (prev):
          </div>
          <div className="flex flex-wrap gap-2">
            {algorithmState.prev.map((val, idx) => (
              <div
                key={idx}
                className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border rounded bg-white text-sm"
                style={{
                  transition: `all ${transitionDuration}ms ease-in-out`,
                }}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DetailedView;
