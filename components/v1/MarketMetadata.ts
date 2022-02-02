import { chain as Chains } from "wagmi";

// Markets Metadata
export type Metadata = {
    logo: string;
    vaultLogo: string;
    vaultAddress: string;
    title: string;
    vaultTitle: string;
    subtitle: string;
    path: string;
    description: string;
    informationText: string;
    vaultInformationText: string;
    collateralSymbol: string;
    collateralDecimals: number;
    collateralAddress: string;
    debtSymbol: string;
    debtDecimals: number;
    debtAddress: string;
    oracleAddress: string;
    uniswapSwapURL: string;
    isETH: boolean;
};
export type MarketMetadata = Record<string, Metadata>;
export type MarketMetadataRecord = Record<number, MarketMetadata>;
export const Metadata: MarketMetadataRecord = {
    [Chains.kovan.id]: {
        ["0xc4676f88663360155c2bc6d2A482E34121a50b3b"]: {
            title: "DEMOETHRISE",
            subtitle: "ETH Leverage Market",
            logo: "/markets/ethrise.svg",
            vaultLogo: "/markets/usdc.svg",
            vaultAddress: "0x42B6BAE111D9300E19F266Abf58cA215f714432c",
            vaultTitle: "DEMOrvETHUSDC",
            path: "/markets/ethrise",
            description: "Enjoy leveraged ETH without risk of liquidation or earn yield from your idle USDC",
            informationText:
                "ETHRISE is a leveraged token that goes 2x long ETH. It generates 1.75x-2.5x leveraged gains when the price of ETH rises.",
            vaultInformationText:
                "rvETHUSDC is an interest-bearing token that increase value overtime. Start earning variable interest rate in real time by depositing USDC.",
            collateralSymbol: "ETH",
            collateralDecimals: 18, // ETH is 18 decimals
            collateralAddress: "0x4470E84Ce5C1fe89EA35a19560b6f2b1Ed71507f",
            debtSymbol: "USDC",
            debtDecimals: 6, // USDC is 6 decimals
            debtAddress: "0x0af08696cb51e81456dc0a1dee7f8bfad8d82a22",
            uniswapSwapURL: "#",
            oracleAddress: "0x1F6Ec9B472b5EB3c7aA617Ce45ea2ed4f1A2db7D",
            isETH: true,
        },
    },
    [Chains.arbitrumOne.id]: {
        ["0x46D06cf8052eA6FdbF71736AF33eD23686eA1452"]: {
            title: "ETHRISE",
            subtitle: "ETH Leverage Market",
            logo: "/markets/ethrise.svg",
            vaultLogo: "/markets/usdc.svg",
            vaultAddress: "0xf7EDB240DbF7BBED7D321776AFe87D1FBcFD0A94",
            vaultTitle: "rvETHUSDC",
            path: "/markets/ethrise",
            description: "Enjoy leveraged ETH without risk of liquidation or earn yield from your idle USDC",
            informationText:
                "ETHRISE is a leveraged token that goes 2x long ETH. It generates 1.75x-2.5x leveraged gains when the price of ETH rises.",
            vaultInformationText:
                "rvETHUSDC is an interest-bearing token that increase value overtime. Start earning variable interest rate in real time by depositing USDC.",
            collateralSymbol: "ETH",
            collateralDecimals: 18, // ETH is 18 decimals
            collateralAddress: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
            debtSymbol: "USDC",
            debtDecimals: 6, // USDC is 6 decimals
            debtAddress: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
            uniswapSwapURL: "#",
            oracleAddress: "0x877bF15cAa17E4EE21236800D2D1a8dDA5B5251C",
            isETH: true,
        },
    },
};
