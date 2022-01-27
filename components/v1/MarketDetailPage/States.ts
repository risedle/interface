import { Result } from "ethers/lib/utils";

export type RequestState = {
    response?: Result;
    error?: Error;
    loading: boolean;
};

export type ApprovalState = {
    hash?: string;
    approving?: boolean;
    approved?: boolean;
    error?: Error;
};

export type RedeemState = {
    amount?: number;
    redeeming?: boolean;
    hash?: string;
    error?: Error;
};
