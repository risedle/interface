import { chain as Chains } from "wagmi";
import { Metadata } from "../components/v1/MarketMetadata";

// List of our leveraged token products
export enum tokenType {
    ETHRISE,
    rvETHRISEUSDC,
}

// List of our leveraged token address in every network
const tokenDetail = {
    [tokenType.ETHRISE]: {
        [Chains.kovan.id]: {
            address: "0xc4676f88663360155c2bc6d2A482E34121a50b3b",
            symbol: "DEMOETHRISE",
            decimal: 18,
            logo: "/markets/ethrise.png",
        },
        [Chains.arbitrumOne.id]: {
            address: "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452",
            decimal: 18,
            symbol: "ETHRISE",
            logo: "/markets/ethrise.png",
        },
    },
    [tokenType.rvETHRISEUSDC]: {
        [Chains.kovan.id]: {
            address: "0x42B6BAE111D9300E19F266Abf58cA215f714432c",
            symbol: "rvETHUSDC", // Max 11 character by Metamask, so DEMOrvETHUSDC is written rvETHUSDC here
            decimal: 6,
            logo: "/markets/usdc.png",
        },
        [Chains.arbitrumOne.id]: {
            address: "0xf7EDB240DbF7BBED7D321776AFe87D1FBcFD0A94",
            symbol: "rvETHUSDC",
            decimal: 6,
            logo: "/markets/usdc.png",
        },
    },
};

export const addTokenToMetamask = async (token: tokenType, chainID: number) => {
    const tokenData = tokenDetail[token][chainID];
    const metamask = window.ethereum;

    try {
        await metamask?.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                    address: tokenData.address,
                    symbol: tokenData.symbol,
                    decimals: tokenData.decimal,
                    image: `https://risedle.com/${tokenData.logo}`,
                },
            },
        });
    } catch (error) {
        console.log(error);
    }
};
