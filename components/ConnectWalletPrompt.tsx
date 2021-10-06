import type { FunctionComponent } from "react";

// Import button
import ButtonBlue from "./ButtonBlue";

/**
 * ConnectWalletPromptProps is a React Component properties that passed to React
 * Component Button
 */
type ConnectWalletPromptProps = {
    activateBrowserWallet: () => void;
};

/**
 * ConnectWalletPrompt is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ConnectWalletPrompt: FunctionComponent<ConnectWalletPromptProps> = ({
    activateBrowserWallet,
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
                <ButtonBlue onClick={activateBrowserWallet}>
                    Connect wallet
                </ButtonBlue>
            </div>
        </div>
    );
};

export default ConnectWalletPrompt;
