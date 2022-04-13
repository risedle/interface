import createStore from "zustand/vanilla";
import createHooks from 'zustand';
import { createRenderToast } from "../components/v1/Toasts/Toast";
import React, { useImperativeHandle } from "react";
import { findIndex } from "../components/v1/Toasts/toastUtil";

type ToastStatus = 'success' | 'inProgress' | 'Error';

export type ToastOption = {
    duration?: number;
    title?: React.ReactNode;
    description?: React.ReactNode
    status?: ToastStatus
    id?: number;
}

export type ListToast = {
    id: number;
    toast: React.ReactNode
}

export type State = {
    counter: number; // set counter to create unique id for toast
    toast: Array<ListToast>;
    setToastOption: (data: ListToast) => void;
    addCounter: () => void;
    removeToast: (toastId: number) => void;
}

const store = createStore<State>((set, get) => ({
    toast: [],
    counter: 0,
    setToastOption: (data) => {
        set((state) => ({ ...state, toast: [...state.toast, data] }))
    },
    addCounter: () => {
        set((state) => ({ ...state, counter: state.counter + 1 }))
    },
    removeToast: (toastId: number) => {
        set((state) => {
            const index = findIndex(state.toast, toastId);
            state.toast.splice(index, 1);
        })
    }
}))

export const useToastStore = createHooks(store);

export function useToast() {
    const toastStore = useToastStore();
    const toast = (options: ToastOption) => {
        toastStore.addCounter();
        const message = createRenderToast({ ...options, id: toastStore.counter });
        toastStore.setToastOption({ toast: message, id: toastStore.counter });
    }
    return toast
}


