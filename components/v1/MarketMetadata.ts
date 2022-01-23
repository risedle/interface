import { chain as Chains } from "wagmi";

// Markets Metadata
export type Metadata = {
    logo: string;
    title: string;
    subtitle: string;
    path: string;
    description: string;
};
export type MarketMetadata = Record<string, Metadata>;
export type MarketMetadataRecord = Record<number, MarketMetadata>;
export const Metadata: MarketMetadataRecord = {
    [Chains.kovan.id]: {
        ["0xc4676f88663360155c2bc6d2A482E34121a50b3b"]: {
            title: "ETHRISE",
            subtitle: "ETH Leverage Market",
            logo: "/markets/ethrise.svg",
            path: "/markets/ethrise",
            description:
                "Enjoy leveraged ETH without risk of liquidation or earn yield from your idle USDC",
        },
    },
};
