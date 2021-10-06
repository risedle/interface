import type { FunctionComponent } from "react";
import { Fragment } from "react";

// React useDapp
import { shortenAddress } from "@usedapp/core";

// Import button
import ButtonOutline from "./ButtonOutline";
import ButtonBlueSecondary from "./ButtonBlueSecondary";

/**
 * ConnectMetamaskProps is a React Component properties that passed to React
 * Component Button
 */
type ConnectMetamaskProps = {
    account: string | null | undefined;
    activateBrowserWallet: () => void;
    deactivate: () => void;
};

/**
 * ConnectMetamask is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ConnectMetamask: FunctionComponent<ConnectMetamaskProps> = ({
    account,
    activateBrowserWallet,
    deactivate,
}) => {
    let isAccountConnected = false;
    let shortAccountAddress = "NOT_CONNECTED";
    if (account) {
        isAccountConnected = true;
        shortAccountAddress = shortenAddress(account);
    }

    if (isAccountConnected) {
        return (
            <div className="flex flex-row gap gap-x-2">
                <div>
                    <ButtonBlueSecondary>
                        {shortAccountAddress}
                    </ButtonBlueSecondary>
                </div>
                <div>
                    <ButtonOutline onClick={deactivate}>
                        Disconnect
                    </ButtonOutline>
                </div>
            </div>
        );
    } else {
        return (
            <Fragment>
                <ButtonOutline onClick={activateBrowserWallet}>
                    Connect wallet
                </ButtonOutline>
            </Fragment>
        );
    }
};

export default ConnectMetamask;
