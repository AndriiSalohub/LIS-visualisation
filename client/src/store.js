import { create } from "zustand";

const useExamples = create((set, get) => ({
  examples: [
    {
      id: 1,
      name: "Simple Sequence",
      sequence: [1, 3, 5, 4, 7],
      selected: false,
    },
    {
      id: 2,
      name: "Complex Case",
      sequence: [10, 9, 2, 5, 3, 7, 101, 18],
      selected: false,
    },
    { id: 3, name: "Edge Case", sequence: [1], selected: false },
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
