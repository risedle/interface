import type { FunctionComponent } from "react";
import { useWalletContext } from "../Wallet";

// Snapshot data
import { useMarkets } from "../../../utils/snapshot";

/**
 * HeaderProps is a React Component properties that passed to React Component Header
 */
type HeaderProps = {};

/**
 * Header is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Header: FunctionComponent<HeaderProps> = ({}) => {
    const { chain } = useWalletContext();
    const { markets, isLoading, isError } = useMarkets(chain.id);
    console.debug("Header markets", markets);
    console.debug("Header isLoading", isLoading);
    console.debug("Header isError", isError);

    // Get total AUM
    // Total collateral all of leveraged tokens in terms of USDC

    return (
        <div className="flex flex-col px-4 space-y-10">
            <div className="text-center flex flex-col space-y-2">
                <div>
                    <h1 className="m-0 font-bold tracking-tighter text-4xl leading-8 text-gray-light-12 dark:text-gray-dark-12">Leveraged Token</h1>
                </div>
                <div>
                    <h1 className="m-0 font-bold tracking-tighter text-4xl leading-8 text-gray-light-12 dark:text-gray-dark-12">Market</h1>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="basis-1/2 text-center flex flex-col space-y-2">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Total AUM</p>
                    <p className="font-ibm font-semibold text-sm leading-4 tracking-tighter text-gray-light-12 dark:text-gray-dark-12">$36,823.378</p>
                </div>
                <div className="basis-1/2 text-center flex flex-col space-y-2">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Total Value Locked</p>
                    <p className="font-ibm font-semibold text-sm leading-4 tracking-tighter text-gray-light-12 dark:text-gray-dark-12">$36,823.378</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
