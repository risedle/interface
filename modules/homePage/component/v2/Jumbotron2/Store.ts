import create from "zustand";

type JumbotronTwoState = {
    activeIndex: number;
    originalOffset: number;
    setOriginalOffset: (offset: number) => void;
    setActiveIndex: (index: number) => void;
};

export const useJumbotronTwo = create<JumbotronTwoState>((set) => ({
    activeIndex: 0,
    originalOffset: 0,
    setOriginalOffset: (offset) => set((state) => ({ ...state, originalOffset: offset })),
    setActiveIndex: (index) => set((state) => ({ ...state, activeIndex: index })),
}));
