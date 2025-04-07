import { Card } from "@/components/ui/card";
import { AlgorithmState } from "@/types/shared";
import { FC } from "react";

interface SequenceDisplayProps {
  sequence: number[];
  algorithmState: AlgorithmState;
  transitionDuration: number;
}

const SequenceDisplay: FC<SequenceDisplayProps> = ({
  sequence,
  algorithmState,
  transitionDuration,
}) => {
  return (
    <Card className="p-3 sm:p-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {sequence.map((num, idx) => (
            <div
              key={idx}
              className={`
                w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center
                border rounded-lg text-sm sm:text-base transition-colors ${
                  idx === algorithmState.currentI
                    ? "bg-primary text-primary-foreground"
                    : idx === algorithmState.currentJ
                      ? "bg-secondary text-secondary-foreground"
                      : algorithmState.lis.includes(num)
                        ? "bg-muted-foreground text-muted"
                        : "bg-muted"
                }
              `}
              style={{
                transition: `all ${transitionDuration}ms ease-in-out`,
              }}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SequenceDisplay;
