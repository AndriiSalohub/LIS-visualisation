/* eslint-disable react/prop-types */
import { Card } from "@/components/ui/card";

const SequenceDisplay = ({ sequence, algorithmState, transitionDuration }) => {
  return (
    <Card className="p-3 sm:p-6 bg-gray-50">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {sequence.map((num, idx) => (
            <div
              key={idx}
              className={`
                w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center
                border rounded-lg text-sm sm:text-base
                ${
                  idx === algorithmState.currentI
                    ? "bg-gray-800 text-white"
                    : idx === algorithmState.currentJ
                      ? "bg-gray-600 text-white"
                      : algorithmState.lis.includes(num)
                        ? "bg-gray-400 text-white"
                        : "bg-white"
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
