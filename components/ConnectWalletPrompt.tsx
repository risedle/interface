import type { FunctionComponent } from "react";

// Import Wallet Connect Connector
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// Import button
import ButtonBlue from "./ButtonBlue";

/**
 * ConnectWalletPromptProps is a React Component properties that passed to React
 * Component Button
 */
type ConnectWalletPromptProps = {
    activateBrowserWallet: () => void;
    activate: (connector: WalletConnectConnector, onError?: ((error: Error) => void) | undefined, throwErrors?: boolean | undefined) => Promise<void>
};

/**
 * ConnectWalletPrompt is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ConnectWalletPrompt: FunctionComponent<ConnectWalletPromptProps> = ({
    activateBrowserWallet,
    activate,
}) => {
    
    // Get the Kovan URL from .env file
    let kovanURL = "";
    if (process.env.NEXT_PUBLIC_KOVAN_URL) {
        kovanURL = process.env.NEXT_PUBLIC_KOVAN_URL;
    }

    // Setup Wallet Connect Configuration
    const walletconnect = new WalletConnectConnector({
        rpc: {
            42: kovanURL
        },
        qrcode: true,
        supportedChainIds: [ 42, 42161 ]
    })

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
            <div className="mt-8 flex space-x-4">
                <ButtonBlue onClick={activateBrowserWallet}>
                    Connect with Metamask
                </ButtonBlue>
                <ButtonBlue onClick={() => activate(walletconnect)}>
                    Connect with Wallet Connect
                </ButtonBlue>
            </div>
        </div>
    );
};

export default ConnectWalletPrompt;
