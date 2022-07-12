import create from "zustand";
import { Market } from "../../../../components/v1/swr/snapshot";

export type StatusEnum = "loading" | "loaded" | "error";

export type TokenInfoData = {
    status: StatusEnum;
    data?: Market;
    error?: string;
    setData: (data: Market) => void;
    setError: (error: string) => void;
};

export const useTokenInfoStore = create<TokenInfoData>((set) => ({
    status: "loading",
    setData: (data: Market) => set((state) => ({ ...state, data, status: "loaded" })),
    setError: (error: string) => set((state) => ({ ...state, error, status: "error" })),
}));
