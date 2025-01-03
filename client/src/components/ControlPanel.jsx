/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Play, Pause, StepForward, StepBack, RotateCcw } from "lucide-react";

const ControlPanel = ({
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
}) => {
  return (
    <Card className="p-3 sm:p-4 bg-white">
      <div className="space-y-4">
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
