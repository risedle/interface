import create from "zustand";
import { MetadataToken } from "../../components/v1/MarketMetadata";
import { Metadata } from "../ethrisePage/component/MarketMetadata";
import shallow from "zustand/shallow";

type LoadedData = {
    status: "loaded";
    token: MetadataToken;
    chainId: number;
    tokenId: string;
};

type Loading = {
    status: "loading";
};

type Error = {
    status: "error";
    error: string;
};

type TokenPageState = {
    state: LoadedData | Loading | Error;
    setToken: (chainId: number, tokenId: string) => void;
};

export const useTokenStore = create<TokenPageState>((set) => ({
    state: { status: "loading" },
    setToken(chainId, tokenId) {
        const metaData = Metadata[chainId][tokenId];
        set((oldState) => ({
            ...oldState,
            state: {
                status: "loaded",
                token: metaData,
                chainId: chainId,
                tokenId: tokenId,
            },
        }));
    },
}));
