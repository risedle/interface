import type { FunctionComponent } from "react";

// Import button
import ButtonBlue from "./ButtonBlue";
import ButtonOutline from "./ButtonOutline"

/**
 * ConnectWalletPromptProps is a React Component properties that passed to React
 * Component Button
 */
type ConnectWalletPromptProps = {
    connectMetamask: () => void;
    connectWalletConnect: () => void;
    setKovan: () => void;
    setArbitrum: () => void;
    network?: string | undefined;
};

/**
 * ConnectWalletPrompt is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ConnectWalletPrompt: FunctionComponent<ConnectWalletPromptProps> = ({
    connectMetamask,
    connectWalletConnect,
    setKovan,
    setArbitrum, 
    network
}) => {
    return (
        <div className="mx-auto" style={{ width: "480px" }}>
            <div>
                <h1 className="text-white font-extrabold text-4xl m-0 leading-normal">
                    Connect your wallet
                </h1>
                <p className="text-grey font-semibold text-2xl m-0 leading-normal">
                    Click the button below to get started.
                </p>
            </div>

            <div className="mt-8">
                <h1 className="text-white font-bold text-xl mb-3 leading-normal">
                    1. Choose Network
                </h1>
                <div className="flex space-x-3">
                    <ButtonOutline 
                        onClick={setKovan}
                        active={network === "kovan"}
                    >
                        Kovan
                    </ButtonOutline>
                    <ButtonOutline 
                        onClick={setArbitrum}
                        active={network === "arbitrum"}
                    >
                        Arbitrum
                    </ButtonOutline>
                </div>
            </div>

            <div className="mt-8">
                <h1 className="text-white font-bold mb-3 text-xl leading-normal">
                    2. Choose Wallet
                </h1>
                <div className="flex space-x-3">
                    <ButtonBlue onClick={connectMetamask}>
                        Metamask
                    </ButtonBlue>
                    <ButtonBlue onClick={connectWalletConnect}>
                        WalletConnect
                    </ButtonBlue>
                </div>
            </div>
        </div>
    );
};

export default ConnectWalletPrompt;