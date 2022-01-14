import { FunctionComponent, useEffect, useState } from "react";
import { Fragment } from "react";

// React useDapp
import { shortenAddress, useEthers } from "@usedapp/core";

// Import button
import ButtonOutline from "./ButtonOutline";
import ButtonBlueSecondary from "./ButtonBlueSecondary";
import { useLocalWallet } from "../shared/walletConnection";

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
    const { account, deactivate, activateBrowserWallet } = useEthers();
    const { removeWallet, storeWallet, wallet } = useLocalWallet();
    const [logged, setUserLogged] = useState(false);

    const logout = () => {
        deactivate();
        removeWallet();
    };

    const login = async () => {
        activateBrowserWallet();
        setUserLogged(true);
    };

    useEffect(() => {
        if (logged && account) {
            storeWallet(account);
        }
    }, [logged, account, storeWallet]);

    if (wallet) {
        return (
            <div className="flex flex-row gap gap-x-2">
                <div>
                    <ButtonBlueSecondary>
                        {account && shortenAddress(account)}
                    </ButtonBlueSecondary>
                </div>
                <div>
                    <ButtonOutline onClick={logout}>Disconnect</ButtonOutline>
                </div>
            </div>
        );
    } else {
        return (
            <Fragment>
                <ButtonOutline onClick={login}>Connect wallet</ButtonOutline>
            </Fragment>
        );
    }
};

export default ConnectMetamask;
