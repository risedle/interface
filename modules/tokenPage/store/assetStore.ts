import { ethers } from "ethers";
import create from "zustand";
import shallow from "zustand/shallow";
import { MetadataToken } from "../../../components/v1/MarketMetadata";

export type LoadedData = {
    status: "loaded";
    nav: number;
    latestVaultExchangeRate: number;
    balance: number;
    balanceVault: number;
};

type Loading = {
    status: "loading";
};

type Error = {
    status: "error";
    error: string;
};

type AssetPageState = {
    state: LoadedData | Loading | Error;
    setValue: (
        navResponse: ethers.BigNumber,
        latestVaultExchangeRateResponse: ethers.BigNumber,
        balanceResponse: ethers.BigNumber,
        MetadataToken: MetadataToken
    ) => void;
    setError: (error: string) => void;
    setLoading: () => void;
};

export const useAssetStore = create<AssetPageState>((set) => ({
    state: { status: "loading" },
    setValue(navResponse, latestVaultExchangeRateResponse, balanceResponse, metadata) {
        set(() => ({
            state: {
                status: "loaded",
                nav: parseFloat(ethers.utils.formatUnits(navResponse, metadata.debtDecimals)),
                latestVaultExchangeRate: parseFloat(ethers.utils.formatUnits(latestVaultExchangeRateResponse, metadata.collateralDecimals)),
                balance: parseFloat(ethers.utils.formatUnits(balanceResponse, metadata.collateralDecimals)),
                balanceVault: parseFloat(ethers.utils.formatUnits(balanceResponse, metadata.debtDecimals)),
            },
        }));
    },
    setError(error) {
        set(() => ({
            state: {
                status: "error",
                error: error,
            },
        }));
    },
    setLoading() {
        set(() => ({
            state: {
                status: "loading",
            },
        }));
    },
}));
