import type { FunctionComponent } from "react";
import { Fragment } from "react";
import Link from "next/link";

// React useDapp
// import { shortenAddress } from "@usedapp/core";

// Import wagmi
import { useAccount } from "wagmi";

// Import button
import ButtonOutline from "./ButtonOutline";
import ButtonBlueSecondary from "./ButtonBlueSecondary";

/**
 * ConnectMetamaskProps is a React Component properties that passed to React
 * Component Button
 */
type ConnectWalletProps = {};

/**
 * ConnectMetamask is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ConnectWallet: FunctionComponent<ConnectWalletProps> = ({}) => {
    const [accountData, disconnect] = useAccount();

    let isAccountConnected = false;
    let shortAccountAddress = "NOT_CONNECTED";
    if (accountData.data?.address) {
        isAccountConnected = true;
        // shortAccountAddress = shortenAddress(accountData.data.address);
    }

    if (isAccountConnected) {
        return (
            <div className="gap flex flex-row gap-x-2">
                <div>
                    <ButtonBlueSecondary>{shortAccountAddress}</ButtonBlueSecondary>
                </div>
                <div>
                    <ButtonOutline onClick={disconnect}>Disconnect</ButtonOutline>
                </div>
            </div>
        );
    } else {
        return (
            <Fragment>
                <Link href={"/connect"}>
                    <a>
                        <ButtonOutline>Connect wallet</ButtonOutline>
                    </a>
                </Link>
            </Fragment>
        );
    }
};

export default ConnectWallet;
