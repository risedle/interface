import type { FunctionComponent } from "react";
import { useWalletContext } from "../Wallet";

// Snapshot data
import { useMarkets } from "../../../utils/snapshot";

// Formatters
import { dollarFormatter } from "../../../utils/formatters";

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
    const { markets, isLoading } = useMarkets(chain.id);

    // Get total AUM
    // Total collateral all of leveraged tokens in terms of USDC

    return (
        <div className="flex flex-col px-4 max-w-4xl m-auto">
            <div className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:justify-between items-center border-b border-gray-light-9 dark:border-gray-dark-9 border-dashed pb-6 sm:pb-8">
                <div className="text-center flex flex-col space-y-2">
                    <h1 className="m-0 font-bold tracking-tighter text-3xl leading-8 text-gray-light-12 dark:text-gray-dark-12">Leveraged Token Market</h1>
                </div>
                <div className="flex flex-row space-x-6">
                    <div className="basis-1/2 text-center flex flex-col space-y-2">
                        <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10 sm:text-right">AUM</p>
                        {isLoading && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-full animate-pulse"></div>}
                        {!isLoading && <p className="font-ibm font-semibold text-sm sm:text-base leading-4 tracking-tighter text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(markets.aum)}</p>}
                    </div>
                    <div className="basis-1/2 text-center flex flex-col space-y-2">
                        <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10 sm:text-right">TVL</p>
                        {isLoading && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-full animate-pulse"></div>}
                        {!isLoading && <p className="font-ibm font-semibold text-sm sm:text-base leading-4 tracking-tighter text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(markets.tvl)}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
