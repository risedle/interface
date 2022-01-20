import type { FunctionComponent } from "react";
import { Fragment } from "react";
import Link from "next/link";

// React useDapp
// import { shortenAddress } from "@usedapp/core";

// Import wagmi
import { useAccount } from "wagmi";

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
<<<<<<< HEAD:components/v0/ConnectWallet.tsx
    const [accountData, disconnect] = useAccount();
=======

    const [accountData, disconnect] = useAccount()
>>>>>>> 71d1a8d466188ac73be7b9b43b54add4ecb4464b:components/ConnectWallet.tsx

    let isAccountConnected = false;
    let shortAccountAddress = "NOT_CONNECTED";
    if (accountData.data?.address) {
        isAccountConnected = true;
<<<<<<< HEAD:components/v0/ConnectWallet.tsx
        // shortAccountAddress = shortenAddress(accountData.data.address);
=======
        shortAccountAddress = shortenAddress(accountData.data.address);
>>>>>>> 71d1a8d466188ac73be7b9b43b54add4ecb4464b:components/ConnectWallet.tsx
    }

    if (isAccountConnected) {
        return (
            <div className="flex flex-row gap gap-x-2">
                <div>
                    <ButtonBlueSecondary>{shortAccountAddress}</ButtonBlueSecondary>
                </div>
                <div>
<<<<<<< HEAD:components/v0/ConnectWallet.tsx
                    <ButtonOutline onClick={disconnect}>Disconnect</ButtonOutline>
=======
                    <ButtonOutline onClick={disconnect}>
                        Disconnect
                    </ButtonOutline>
>>>>>>> 71d1a8d466188ac73be7b9b43b54add4ecb4464b:components/ConnectWallet.tsx
                </div>
            </div>
        );
    } else {
        return (
            <Fragment>
<<<<<<< HEAD:components/v0/ConnectWallet.tsx
                <Link href={"/connect"}>
                    <a>
                        <ButtonOutline>Connect wallet</ButtonOutline>
=======
                <Link href={'/connect'}>
                    <a>
                        <ButtonOutline>
                            Connect wallet
                        </ButtonOutline>
>>>>>>> 71d1a8d466188ac73be7b9b43b54add4ecb4464b:components/ConnectWallet.tsx
                    </a>
                </Link>
            </Fragment>
        );
    }
};

<<<<<<< HEAD:components/v0/ConnectWallet.tsx
export default ConnectWallet;
=======
export default ConnectWallet;
>>>>>>> 71d1a8d466188ac73be7b9b43b54add4ecb4464b:components/ConnectWallet.tsx
