import { FunctionComponent, useEffect, useState } from "react";
import { Fragment } from "react";

// React useDapp
import { shortenAddress, useEthers } from "@usedapp/core";

// Import button
import ButtonOutline from "./ButtonOutline";
import ButtonBlueSecondary from "./ButtonBlueSecondary";

/**
 * ConnectMetamaskProps is a React Component properties that passed to React
 * Component Button
 */
type ConnectMetamaskProps = {
    account?: string | null | undefined;
    activateBrowserWallet?: () => void;
    deactivate?: () => void;
};

/**
 * ConnectMetamask is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ConnectMetamask: FunctionComponent<ConnectMetamaskProps> = ({}) => {
    const { active, account, deactivate, activateBrowserWallet } = useEthers();
    const [detectedLogged, setDetectedLogged] = useState(false);
    const checkCorrectNetwork = async () => {
        const data = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        if (data.length > 0) {
            setDetectedLogged(true);
        }
    };

    useEffect(() => {
        checkCorrectNetwork();
    }, []);

    if (account || detectedLogged) {
        return (
            <div className="flex flex-row gap gap-x-2">
                <div>
                    <ButtonBlueSecondary>
                        {account
                            ? shortenAddress(account)
                            : "Change your network"}
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
