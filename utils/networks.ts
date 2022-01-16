// List of supported networks by Risedle

export enum ChainID {
    ArbitrumOne = 42161,
    Kovan = 42,
}

export type Network = {
    name: string;
    currency: string;
    chainId: ChainID;
    rpc: string;
};

type NetworkConfig = {
    default: Network;
    supported: Array<Network>;
};

const ArbitrumNetwork: Network = {
    name: "Arbitrum One",
    currency: "AETH",
    chainId: ChainID.ArbitrumOne,
    rpc: "https://arb-mainnet.g.alchemy.com/v2/qu4tZ0JUekqqwtcDowbfel-s4S8Z60Oj",
};

const KovanNetwork = {
    name: "Kovan",
    currency: "KETH",
    chainId: ChainID.Kovan,
    rpc: "https://eth-kovan.alchemyapi.io/v2/qLbNN95iUDTpQqbm5FzgaSPrPJ908VD-",
};

export const RisedleNetworks: NetworkConfig = {
    default: ArbitrumNetwork,
    supported: [ArbitrumNetwork, KovanNetwork],
};

export const getCurrentNetwork = () => {
    if (typeof window === "undefined") return undefined;

    // Read current network from local storage
    if (!("network" in localStorage)) {
        // Set the default network
        localStorage.network = RisedleNetworks.default;
    }

    return localStorage.network;
};

export const switchNetwork = (network: Network) => {
    localStorage.network = network;
};

export default RisedleNetworks;
