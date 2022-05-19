import type { FunctionComponent } from "react";
import { dollarFormatter } from "../../../utils/formatters";
import { MarketData } from "../../../components/v1/swr/snapshot";
/**
 * MarketsHeaderProps is a React Component properties that passed to React Component MarketsHeader
 */
type MarketsHeaderProps = {
    data: MarketData | undefined;
    showLoading: boolean;
    showData: boolean | any;
};

/**
 * MarketsHeader is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const MarketsHeader: FunctionComponent<MarketsHeaderProps> = ({ data, showLoading, showData }) => {
    return (
        <>
            <div className="container mx-auto mt-8 max-w-[540px] px-4 sm:mt-16">
                <div className="flex flex-col space-y-6 border-b border-dashed border-gray-light-9 pb-6 dark:border-gray-dark-9">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold leading-8 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 sm:text-[32px]">Leveraged Token Market</h1>
                    </div>
                    <div className="mx-auto flex flex-row space-x-6">
                        <div className="flex flex-col space-y-2 text-center">
                            <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">AUM</p>
                            {showLoading && <div className="h-[16px] w-[100px] animate-pulse rounded-full bg-gray-light-3 dark:bg-gray-dark-3"></div>}
                            {showData && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 sm:text-base">{dollarFormatter.format(data ? data.aum : 0)}</p>}
                        </div>
                        <div className="flex flex-col space-y-2 text-center">
                            <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">TVL</p>
                            {showLoading && <div className="h-[16px] w-[100px] animate-pulse rounded-full bg-gray-light-3 dark:bg-gray-dark-3"></div>}
                            {showData && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 sm:text-base">{dollarFormatter.format(data ? data.tvl : 0)}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MarketsHeader;
