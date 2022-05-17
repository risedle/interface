import { chain as Chains } from "wagmi";
import { Metadata } from "../components/v1/MarketMetadata";

// List of our leveraged token products
export enum tokenType {
    ETHRISE,
}

export type TokenRequest = {
    token: tokenType;
    chainID: number;
    isVaultToken?: boolean | undefined;
};

// List of our leveraged token address in every network
const tokenAddresses = {
    [tokenType.ETHRISE]: {
        [Chains.kovan.id]: "0xc4676f88663360155c2bc6d2A482E34121a50b3b",
        [Chains.arbitrumOne.id]: "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452",
    },
};

export const addTokenToMetamask = async (args: TokenRequest) => {
    const tokenAddress = tokenAddresses[args.token][args.chainID];
    const metadata = Metadata[args.chainID][tokenAddress];
    const metamask = window.ethereum;

    try {
        await metamask?.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                    address: args.isVaultToken ? metadata.vaultAddress : tokenAddress,
                    symbol: args.isVaultToken ? metadata.vaultTitle : metadata.title,
                    decimals: args.isVaultToken ? metadata.debtDecimals : metadata.collateralDecimals,
                    image: `https://risedle.com/${args.isVaultToken ? metadata.vaultLogo : metadata.logo}`,
                },
            },
        });
    } catch (error) {
        console.log(error);
    }
};
