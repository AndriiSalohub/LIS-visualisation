import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import SequenceDialog from "../components/SequenceDialog";
import CodeDebugger from "../components/CodeDebugger";
import RangeSelection from "../components/RangeSelection";
import ControlPanel from "../components/ControlPanel";
import SavedExamples from "../components/SavedExamples";
import SequenceDisplay from "../components/SequenceDisplay";
import DetailedView from "../components/DetailedView";
import useExamples from "../store";
import { AlgorithmState, Example } from "../types/shared";

const formatSequence = (seq: number[]) => {
  if (seq.length <= 4) return seq.join(", ");
  return `${seq.slice(0, 3).join(", ")}...${seq[seq.length - 1]}`;
};

const getStepDescription = (state: AlgorithmState, sequence: number[]) => {
  if (
    !state.d.length &&
    !state.prev.length &&
    state.currentI === -1 &&
    state.currentJ === -1 &&
    !state.lis.length
  ) {
    return "Очікування початку візуалізації. Натисніть 'Крок вперед' або 'Відтворити' для початку.";
  }

  const { currentI, currentJ, d, lis } = state;

  if (currentI === -1) {
    return "Ініціалізація масивів: масив довжин (d) заповнюється одиницями, масив попередніх індексів (prev) заповнюється -1.";
  }

  if (currentI === -2) {
    return `Алгоритм завершено. Знайдена найдовша зростаюча підпослідовність довжиною ${
      lis.length
    }: [${lis.join(", ")}].`;
  }

  if (currentJ < currentI) {
    const comparison = sequence[currentJ] < sequence[currentI];
    const wouldIncrease = comparison && d[currentJ] + 1 > d[currentI];

    let description = `Порівнюємо елементи: ${sequence[currentJ]} (індекс ${currentJ}) і ${sequence[currentI]} (індекс ${currentI}). `;

    if (comparison) {
      if (wouldIncrease) {
        description += `Оскільки ${sequence[currentJ]} < ${sequence[currentI]} і довжина підпослідовності збільшиться (${d[currentJ]} + 1 > ${d[currentI]}), `;
        description += `оновлюємо d[${currentI}] = ${
          d[currentJ] + 1
        } та prev[${currentI}] = ${currentJ}.`;
      } else {
        description += `Хоча ${sequence[currentJ]} < ${sequence[currentI]}, але поточна довжина ${d[currentI]} вже оптимальна (${d[currentJ]} + 1 ≤ ${d[currentI]}).`;
      }
    } else {
      description += `Пропускаємо, оскільки ${sequence[currentJ]} ≥ ${sequence[currentI]}.`;
    }

    return description;
  }

  if (currentJ === currentI) {
    if (currentI === sequence.length - 1) {
      return "Завершено обробку всіх елементів. Починаємо відновлення найдовшої зростаючої підпослідовності.";
    }
    return `Завершено порівняння для індексу ${currentI}. Переходимо до наступного елемента ${
      sequence[currentI + 1]
    } (індекс ${currentI + 1}).`;
  }

  return "Відновлення найдовшої зростаючої підпослідовності...";
};

const VisualizationPage = () => {
  const [sequence, setSequence] = useState<number[]>([3, 10, 2, 1, 20]);
  const [algorithmState, setAlgorithmState] = useState<AlgorithmState>({
    d: [],
    prev: [],
    currentI: -1,
    currentJ: -1,
    lis: [],
  });
  const [totalSteps, setTotalSteps] = useState<number>(0);

  const [isAutoMode, setIsAutoMode] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showDetailedView, setShowDetailedView] = useState<boolean>(true);
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const [speed, setSpeed] = useState<number>(1);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionDuration: number = 1000 / (animationSpeed * 2);

  const [stateHistory, setStateHistory] = useState<AlgorithmState[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(-1);

  const [minRange, setMinRange] = useState<string>("0");
  const [maxRange, setMaxRange] = useState<string>("100");
  const [sequenceLength, setSequenceLength] = useState<string>("5");

  const [savedExamples, setSavedExamples] = useState<Example[]>([]);
  const {
    examples,
    addExample,
    getSelectedExamples,
    removeExample,
    editExample,
    loadFromLocalStorage,
    toggleSelect,
  } = useExamples();

  const LOCAL_STORAGE_STATE_KEY: string = "lis-visualization-state";

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);

    if (savedState) {
      const { sequence, algorithmState, stateHistory, currentHistoryIndex } =
        JSON.parse(savedState);
      setSequence(sequence);
      setAlgorithmState(algorithmState);
      setStateHistory(stateHistory);
      setCurrentHistoryIndex(currentHistoryIndex);
    }
  }, []);

  useEffect(() => {
    const selectedLibraryExamples = getSelectedExamples();

    setSavedExamples(selectedLibraryExamples);
  }, [examples]);

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
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isPlaying, isAutoMode, speed, algorithmState]);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_STATE_KEY,
      JSON.stringify({
        sequence,
        algorithmState,
        stateHistory,
        currentHistoryIndex,
      }),
    );
  }, [sequence, algorithmState, stateHistory, currentHistoryIndex]);

  useEffect(() => {
    if (algorithmState.d.length > 0) {
      setTotalSteps(calculateInitialTotalSteps(algorithmState.d.length));
    }
  }, [algorithmState.d.length]);

  const calculateInitialTotalSteps = (arrayLength: number) => {
    if (arrayLength === 0) return 0;

    const dpSteps = (arrayLength * (arrayLength - 1)) / 2;

    const lisConstructionSteps = arrayLength;

    return dpSteps + lisConstructionSteps;
  };

  const getNextState = (currentState: AlgorithmState) => {
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
    setStateHistory((prev) => [
      ...prev.slice(0, currentHistoryIndex + 1),
      nextState,
    ]);
    setCurrentHistoryIndex((prev) => prev + 1);
    setAlgorithmState(nextState);
  };

  const stepBack = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex((prev) => prev - 1);
      setAlgorithmState(stateHistory[currentHistoryIndex - 1]);
    }
  };

  const handleSaveExample = () => {
    addExample({
      id: savedExamples.length + 1,
      name: `Послідовність ${examples.length + 1}`,
      sequence: sequence,
      selected: true,
    });
  };

  const handleEditExample = (id: number, newSequence: number[]) => {
    const exampleToEdit = savedExamples.find((example) => example.id === id)!;
    editExample({
      ...exampleToEdit,
      sequence: newSequence,
    });
  };

  const handleDeleteExample = (idToDelete: number) => {
    removeExample(idToDelete);
  };

  const validateInputs = () => {
    setError("");
    if (!minRange.trim() || !maxRange.trim() || !sequenceLength.trim()) {
      setError("Будь ласка, заповніть всі поля");
      return false;
    }

    const min = Number(minRange);
    const max = Number(maxRange);
    const length = Number(sequenceLength);

    if (isNaN(min) || isNaN(max) || isNaN(length)) {
      setError("Будь ласка, введіть коректні числові значення");
      return false;
    }

    if (length < 2 || length > 1000) {
      setError("Довжина послідовності має бути від 2 до 1000");
      return false;
    }

    if (min >= max) {
      setError("Мінімальне значення має бути меншим за максимальне");
      return false;
    }

    return true;
  };

  const generateRandomSequence = () => {
    if (!validateInputs()) return;

    const min = Number(minRange);
    const max = Number(maxRange);
    const length = Number(sequenceLength);

    const newSequence = Array.from({ length }, () =>
      Math.floor(Math.random() * (max - min + 1) + min),
    );

    setSequence(newSequence);
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

  const handleMinRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinRange(value);
  };

  const handleMaxRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxRange(value);
  };

  const handleSequenceLengthChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setSequenceLength(value);
  };

  return (
    <div className="w-full p-2 sm:p-4 mx-auto max-w-[1400px]">
      {selectedExample !== null && (
        <Dialog open={true} onOpenChange={() => setSelectedExample(null)}>
          <SequenceDialog
            sequence={
              savedExamples.filter(
                (example) => example.id === selectedExample,
              )[0].sequence
            }
            onClose={() => setSelectedExample(null)}
            onLoad={() => {
              setSequence(
                savedExamples.filter(
                  (example) => example.id === selectedExample,
                )[0].sequence,
              );
              resetVisualization();
              setSelectedExample(null);
            }}
            onEdit={(newSequence: number[]) =>
              handleEditExample(selectedExample, newSequence)
            }
          />
        </Dialog>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 space-y-4">
          <ControlPanel
            isAutoMode={isAutoMode}
            setIsAutoMode={setIsAutoMode}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            showDetailedView={showDetailedView}
            setShowDetailedView={setShowDetailedView}
            animationSpeed={animationSpeed}
            setAnimationSpeed={setAnimationSpeed}
            speed={speed}
            setSpeed={setSpeed}
            stepBack={stepBack}
            calculateStep={calculateStep}
            algorithmState={algorithmState}
            currentHistoryIndex={currentHistoryIndex}
            resetVisualization={resetVisualization}
            totalSteps={totalSteps}
          />

          <Card className="p-3 sm:p-4">
            <div className="space-y-4">
              <RangeSelection
                minRange={minRange}
                maxRange={maxRange}
                sequenceLength={sequenceLength}
                handleMinRangeChange={handleMinRangeChange}
                handleMaxRangeChange={handleMaxRangeChange}
                handleSequenceLengthChange={handleSequenceLengthChange}
                generateRandomSequence={generateRandomSequence}
                handleSaveExample={handleSaveExample}
                error={error}
              />
              <SavedExamples
                savedExamples={savedExamples}
                setSequence={setSequence}
                resetVisualization={resetVisualization}
                setSelectedExample={setSelectedExample}
                handleDeleteExample={handleDeleteExample}
                formatSequence={formatSequence}
                toggleSelect={toggleSelect}
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <Card className="p-3 sm:p-4">
            <div className="text-sm font-medium mb-2">Поточний крок:</div>
            <div className="text-base mb-4">
              {getStepDescription(algorithmState, sequence)}
            </div>
          </Card>

          <SequenceDisplay
            sequence={sequence}
            algorithmState={algorithmState}
            transitionDuration={transitionDuration}
          />

          <Card className="p-3 sm:p-4">
            <div className="space-y-4">
              <div className="text-sm font-medium">Результат:</div>
              <div className="flex flex-wrap gap-2">
                {algorithmState.lis.map((num, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center border rounded-lg bg-muted text-foreground text-sm sm:text-base"
                  >
                    {num}
                  </div>
                ))}
                {algorithmState.lis.length === 0 && (
                  <div className="text-muted-foreground">
                    Послідовність буде показана після завершення алгоритму
                  </div>
                )}
              </div>
            </div>
          </Card>

          {showDetailedView && (
            <DetailedView
              algorithmState={algorithmState}
              transitionDuration={transitionDuration}
            />
          )}
        </div>
      </div>

      <CodeDebugger algorithmState={algorithmState} sequence={sequence} />
    </div>
  );
};

export default VisualizationPage;
