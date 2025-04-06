import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AlgorithmState } from "@/types/shared";
import { Play, Pause, StepForward, StepBack, RotateCcw } from "lucide-react";
import { FC } from "react";

interface ControlPanelProps {
  isAutoMode: boolean;
  setIsAutoMode: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  showDetailedView: boolean;
  setShowDetailedView: React.Dispatch<React.SetStateAction<boolean>>;
  animationSpeed: number;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  stepBack: () => void;
  calculateStep: () => void;
  algorithmState: AlgorithmState;
  currentHistoryIndex: number;
  resetVisualization: () => void;
  totalSteps: number;
}

const ControlPanel: FC<ControlPanelProps> = ({
  isAutoMode,
  setIsAutoMode,
  isPlaying,
  setIsPlaying,
  showDetailedView,
  setShowDetailedView,
  animationSpeed,
  setAnimationSpeed,
  speed,
  setSpeed,
  stepBack,
  calculateStep,
  algorithmState,
  currentHistoryIndex,
  resetVisualization,
  totalSteps,
}) => {
  const currentStep: number = Math.min(currentHistoryIndex + 1, totalSteps);
  const progress: number =
    totalSteps > 0 ? Math.min((currentStep / totalSteps) * 100, 100) : 0;

  return (
    <Card className="p-3 sm:p-4 bg-white">
      <div className="space-y-4">
        <div className="relative h-6 bg-gray-200 rounded-sm overflow-hidden">
          <div
            className="absolute h-full bg-green-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-sm">
            <span className={currentStep === totalSteps ? "text-white" : ""}>
              {currentStep} / {totalSteps}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
          <div className="flex items-center space-x-2">
            <Switch checked={isAutoMode} onCheckedChange={setIsAutoMode} />
            <span>Автоматичне відтворення</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={stepBack}
              disabled={isAutoMode || currentHistoryIndex <= 0}
            >
              <StepBack className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={!isAutoMode || algorithmState.currentI === -2}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={calculateStep}
              disabled={isAutoMode || algorithmState.currentI === -2}
            >
              <StepForward className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={resetVisualization}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={showDetailedView}
            onCheckedChange={setShowDetailedView}
          />
          <span>Детальна візуалізація</span>
        </div>

        <div className="space-y-2">
          <div className="text-sm">Швидкість анімації</div>
          <Slider
            value={[animationSpeed]}
            onValueChange={([value]) => setAnimationSpeed(value)}
            min={0.5}
            max={2}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="text-sm">Швидкість автоматичного виконання</div>
          <Slider
            value={[speed]}
            onValueChange={([value]) => setSpeed(value)}
            min={0.5}
            max={5}
            step={0.5}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel;
