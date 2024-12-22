import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Play, Pause, StepForward, StepBack, Save, X, Eye } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import SequenceDialog from "../components/SequenceDialog";

const formatSequence = (seq) => {
  if (seq.length <= 4) return seq.join(", ");
  return `${seq.slice(0, 3).join(", ")}...${seq[seq.length - 1]}`;
};

const Visualizationpage = () => {
  const [sequence, setSequence] = useState([3, 10, 2, 1, 20]);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedExamples, setSavedExamples] = useState([]);
  const [stateHistory, setStateHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [selectedExample, setSelectedExample] = useState(null);
  const [algorithmState, setAlgorithmState] = useState({
    d: [],
    prev: [],
    currentI: -1,
    currentJ: -1,
    lis: [],
  });

  const animationRef = useRef(null);
  const transitionDuration = 1000 / (animationSpeed * 2);

  const handleDeleteExample = (indexToDelete) => {
    setSavedExamples(savedExamples.filter((_, idx) => idx !== indexToDelete));
  };

  const getNextState = (currentState) => {
    const n = sequence.length;
    let { d, prev, currentI, currentJ, lis } = { ...currentState };

    if (currentI === -1) {
      d = Array(n).fill(1);
      prev = Array(n).fill(-1);
      currentI = 0;
      currentJ = 0;
    } else if (currentJ < currentI) {
      if (
        sequence[currentJ] < sequence[currentI] &&
        d[currentJ] + 1 > d[currentI]
      ) {
        d = [...d];
        prev = [...prev];
        d[currentI] = d[currentJ] + 1;
        prev[currentI] = currentJ;
      }
      currentJ++;
    } else {
      currentI++;
      currentJ = 0;
      if (currentI >= n) {
        let pos = d.indexOf(Math.max(...d));
        lis = [];
        while (pos !== -1) {
          lis.unshift(sequence[pos]);
          pos = prev[pos];
        }
        currentI = -2;
      }
    }

    return { d, prev, currentI, currentJ, lis };
  };

  const calculateStep = () => {
    const nextState = getNextState(algorithmState);

    if (currentHistoryIndex < stateHistory.length - 1) {
      setStateHistory((prev) => [
        ...prev.slice(0, currentHistoryIndex + 1),
        nextState,
      ]);
    } else {
      setStateHistory((prev) => [...prev, nextState]);
    }

    setCurrentHistoryIndex((prev) => prev + 1);
    setAlgorithmState(nextState);
  };

  const stepBack = () => {
    if (currentHistoryIndex > 0) {
      const previousState = stateHistory[currentHistoryIndex - 1];
      setCurrentHistoryIndex((prev) => prev - 1);
      setAlgorithmState(previousState);
    }
  };

  useEffect(() => {
    if (isPlaying && isAutoMode) {
      animationRef.current = setInterval(() => {
        if (algorithmState.currentI !== -2) {
          calculateStep();
        } else {
          setIsPlaying(false);
        }
      }, 1000 / speed);
    }
    return () => clearInterval(animationRef.current);
  }, [isPlaying, isAutoMode, speed, algorithmState]);

  const generateRandomSequence = (size) => {
    const newSeq = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100),
    );
    setSequence(newSeq);
    resetVisualization();
  };

  const resetVisualization = () => {
    setIsPlaying(false);
    setStateHistory([]);
    setCurrentHistoryIndex(-1);
    setAlgorithmState({
      d: [],
      prev: [],
      currentI: -1,
      currentJ: -1,
      lis: [],
    });
  };

  const handleSaveExample = () => {
    setSavedExamples((prev) => [...prev, sequence]);
  };

  return (
    <div className="w-full p-2 sm:p-4 mx-auto max-w-[1400px]">
      {selectedExample !== null && (
        <Dialog open={true} onOpenChange={() => setSelectedExample(null)}>
          <SequenceDialog
            sequence={savedExamples[selectedExample]}
            onClose={() => setSelectedExample(null)}
            onLoad={() => {
              setSequence(savedExamples[selectedExample]);
              resetVisualization();
              setSelectedExample(null);
            }}
          />
        </Dialog>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-3 sm:p-4 bg-white">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isAutoMode}
                    onCheckedChange={setIsAutoMode}
                  />
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
                </div>
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

          <Card className="p-3 sm:p-4 bg-white">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <Input
                  type="number"
                  placeholder="Sequence size"
                  className="w-full sm:w-32"
                  onChange={(e) =>
                    generateRandomSequence(parseInt(e.target.value))
                  }
                  min={2}
                  max={20}
                />
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none"
                    onClick={() => generateRandomSequence(sequence.length)}
                  >
                    Генерувати
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none"
                    onClick={handleSaveExample}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Зберегти приклад
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Збережені приклади:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
                  {savedExamples.map((example, idx) => (
                    <div
                      key={idx}
                      className="group relative flex items-center bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Button
                        variant="ghost"
                        className="w-full h-auto text-left justify-start py-1 px-2"
                        onClick={() => {
                          setSequence(example);
                          resetVisualization();
                        }}
                      >
                        <span className="text-xs truncate">
                          [{formatSequence(example)}]
                        </span>
                      </Button>
                      <div className="absolute right-1 flex opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-1"
                          onClick={() => setSelectedExample(idx)}
                        >
                          <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteExample(idx)}
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
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Visualizationpage;
