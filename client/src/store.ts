import { create } from "zustand";
import { Example } from "./types/shared";

interface ExamplesState {
  examples: Example[];
  addExample: (newExample: Example) => void;
  removeExample: (id: number) => void;
  editExample: (updatedExample: Example) => void;
  toggleSelect: (id: number) => void;
  getSelectedExamples: () => Example[];
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const useExamples = create<ExamplesState>()((set, get) => ({
  examples: [
    {
      id: 1,
      name: "Просте Зростання",
      sequence: [1, 2, 3, 4, 5],
      selected: false,
    },
    {
      id: 2,
      name: "Просте Спадання",
      sequence: [5, 4, 3, 2, 1],
      selected: false,
    },
    { id: 3, name: "Граничний випадок", sequence: [1], selected: false },
    {
      id: 4,
      name: "Повторювані Значення",
      sequence: [1, 3, 2, 3, 4, 1],
      selected: false,
    },
    {
      id: 5,
      name: "Чергування",
      sequence: [1, 5, 2, 6, 3, 7],
      selected: false,
    },
    {
      id: 6,
      name: "Довга НЗП в Кінці",
      sequence: [10, 20, 1, 2, 3, 4, 5, 6],
      selected: false,
    },
    {
      id: 7,
      name: "Довга НЗП на Початку",
      sequence: [1, 2, 3, 4, 5, 10, 2, 2, 2],
      selected: false,
    },
    {
      id: 8,
      name: "Випадкова Суміш",
      sequence: [3, 10, 2, 1, 20, 5, 1, 6],
      selected: false,
    },
    {
      id: 9,
      name: "Від'ємні Числа",
      sequence: [-5, -3, -1, 0, 2, 4],
      selected: false,
    },
    {
      id: 10,
      name: "Всі Рівні Елементи",
      sequence: [5, 5, 5, 5, 5, 5],
      selected: false,
    },
  ],
  addExample: (newExample) =>
    set((state) => {
      const updatedExamples = [
        ...state.examples,
        {
          ...newExample,
          id: Math.max(...state.examples.map((ex) => ex.id), 0) + 1,
          selected: newExample.selected ? newExample.selected : false,
        },
      ];
      localStorage.setItem("lis-examples", JSON.stringify(updatedExamples));
      localStorage.setItem(
        "lis-selected",
        JSON.stringify(
          updatedExamples.filter((ex) => ex.selected).map((ex) => ex.id),
        ),
      );
      return { examples: updatedExamples };
    }),
  removeExample: (id) =>
    set((state) => {
      const updatedExamples = state.examples.filter(
        (example) => example.id !== id,
      );
      localStorage.setItem("lis-examples", JSON.stringify(updatedExamples));
      localStorage.setItem(
        "lis-selected",
        JSON.stringify(
          updatedExamples.filter((ex) => ex.selected).map((ex) => ex.id),
        ),
      );
      return { examples: updatedExamples };
    }),
  editExample: (updatedExample) =>
    set((state) => {
      const updatedExamples = state.examples.map((example) =>
        example.id === updatedExample.id ? updatedExample : example,
      );
      localStorage.setItem("lis-examples", JSON.stringify(updatedExamples));
      localStorage.setItem(
        "lis-selected",
        JSON.stringify(
          updatedExamples.filter((ex) => ex.selected).map((ex) => ex.id),
        ),
      );
      return { examples: updatedExamples };
    }),
  toggleSelect: (id) =>
    set((state) => {
      const updatedExamples = state.examples.map((example) =>
        example.id === id
          ? { ...example, selected: !example.selected }
          : example,
      );
      localStorage.setItem("lis-examples", JSON.stringify(updatedExamples));
      localStorage.setItem(
        "lis-selected",
        JSON.stringify(
          updatedExamples.filter((ex) => ex.selected).map((ex) => ex.id),
        ),
      );
      return { examples: updatedExamples };
    }),
  getSelectedExamples: () => {
    const savedSelected = localStorage.getItem("lis-selected");
    if (savedSelected) {
      const selectedIds = JSON.parse(savedSelected);
      return get().examples.filter((example) =>
        selectedIds.includes(example.id),
      );
    }
    return get().examples.filter((example) => example.selected);
  },
  saveToLocalStorage: () => {
    try {
      const state = get();
      localStorage.setItem("lis-examples", JSON.stringify(state.examples));
      localStorage.setItem(
        "lis-selected",
        JSON.stringify(
          state.examples.filter((ex) => ex.selected).map((ex) => ex.id),
        ),
      );
    } catch (error) {
      console.error("Помилка при збереженні до localStorage:", error);
    }
  },
  loadFromLocalStorage: () =>
    set(() => {
      try {
        const savedExamples = localStorage.getItem("lis-examples");
        const savedSelected = localStorage.getItem("lis-selected");

        if (savedExamples) {
          const examples = JSON.parse(savedExamples);
          if (savedSelected) {
            const selectedIds = JSON.parse(savedSelected);
            examples.forEach((example: Example) => {
              example.selected = selectedIds.includes(example.id);
            });
          }
          return { examples };
        }
        return {};
      } catch (error) {
        console.error("Помилка вигрузки прикладів з localStorage:", error);
        return {};
      }
    }),
}));

export default useExamples;
