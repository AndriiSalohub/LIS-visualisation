import { create } from "zustand";

const useExamples = create((set, get) => ({
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
    set((state) => ({
      examples: [
        ...state.examples,
        {
          ...newExample,
          id: Math.max(...state.examples.map((ex) => ex.id), 0) + 1,
          selected: newExample.selected ? newExample.selected : false,
        },
      ],
    })),
  removeExample: (id) =>
    set((state) => ({
      examples: state.examples.filter((example) => example.id !== id),
    })),
  editExample: (updatedExample) =>
    set((state) => ({
      examples: state.examples.map((example) =>
        example.id === updatedExample.id ? updatedExample : example,
      ),
    })),
  toggleSelect: (id) =>
    set((state) => ({
      examples: state.examples.map((example) =>
        example.id === id
          ? { ...example, selected: !example.selected }
          : example,
      ),
    })),
  getSelectedExamples: () =>
    get().examples.filter((example) => example.selected),
  clearSelection: () =>
    set((state) => ({
      examples: state.examples.map((example) => ({
        ...example,
        selected: false,
      })),
    })),
  bulkRemove: (ids) =>
    set((state) => ({
      examples: state.examples.filter((example) => !ids.includes(example.id)),
    })),
  saveToLocalStorage: () => {
    try {
      localStorage.setItem("lis-examples", JSON.stringify(get().examples));
    } catch (error) {
      console.error("Failed to save examples to localStorage:", error);
    }
  },
  loadFromLocalStorage: () =>
    set(() => {
      try {
        const saved = localStorage.getItem("lis-examples");
        return saved ? { examples: JSON.parse(saved) } : {};
      } catch (error) {
        console.error("Failed to load examples from localStorage:", error);
        return {};
      }
    }),
}));

export default useExamples;
