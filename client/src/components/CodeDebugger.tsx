import { useState, FC } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AlgorithmState } from "@/types/shared";

interface CodeDebuggerProps {
  algorithmState: AlgorithmState;
  sequence: number[];
}

const CodeDebugger: FC<CodeDebuggerProps> = ({ algorithmState, sequence }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getActiveLines = () => {
    const { currentI, currentJ } = algorithmState;

    if (currentI === -1)
      return {
        section: "initialization",
        lines: [1, 2],
      };

    if (currentI === -2)
      return {
        section: "reconstruction",
        lines: [1, 2, 3, 4],
      };

    if (currentJ < currentI)
      return {
        section: "mainLoop",
        lines: sequence[currentJ] < sequence[currentI] ? [3, 4, 5, 6] : [3],
      };

    return { section: "mainLoop", lines: [1, 2] };
  };

  const codeStructure = {
    initialization: {
      title: "Ініціалізація",
      code: [
        "d = Array(n).fill(1);",
        "prev = Array(n).fill(-1);",
        "currentI = 0;",
        "currentJ = 0;",
      ],
    },
    mainLoop: {
      title: "Основний цикл",
      code: [
        "for (let i = 0; i < n; i++) {",
        "  for (let j = 0; j < i; j++) {",
        "    if (sequence[j] < sequence[i] &&",
        "        d[j] + 1 > d[i]) {",
        "      d[i] = d[j] + 1;",
        "      prev[i] = j;",
        "    }",
        "  }",
        "}",
      ],
    },
    reconstruction: {
      title: "Відновлення послідовності",
      code: [
        "let pos = d.indexOf(Math.max(...d));",
        "let lis = [];",
        "while (pos !== -1) {",
        "  lis.unshift(sequence[pos]);",
        "  pos = prev[pos];",
        "}",
      ],
    },
  };

  const { section: activeSection, lines: activeLines } = getActiveLines();

  return (
    <div className="fixed bottom-4 left-4 z-10 w-96">
      <Button
        variant="outline"
        className="w-full justify-between border-border text-foreground hover:bg-muted"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Візуальна відладка коду</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 overflow-hidden"
          >
            <Card className="mt-2 p-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {Object.entries(codeStructure).map(([key, section]) => (
                  <div
                    key={key}
                    className={`p-4 rounded-lg ${
                      activeSection === key ? "bg-muted" : "bg-card"
                    }`}
                  >
                    <h3 className="font-medium mb-2">{section.title}</h3>
                    <pre className="text-sm bg-muted text-foreground p-3 rounded-md overflow-x-auto">
                      {section.code.map((line, idx) => (
                        <div
                          key={idx}
                          className={`${
                            activeSection === key &&
                            activeLines.includes(idx + 1)
                              ? "bg-primary/30"
                              : ""
                          }`}
                        >
                          {line}
                        </div>
                      ))}
                    </pre>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeDebugger;
