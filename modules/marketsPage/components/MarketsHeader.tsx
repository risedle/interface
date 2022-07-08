import type { FunctionComponent } from "react";
import { dollarFormatter } from "../../../utils/formatters";
import { MarketData } from "../../../components/v1/swr/snapshot";
import { useRouter } from "next/router";
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
    const router = useRouter();
    return (
        <>
            <div className="flex w-full max-w-[490px] flex-col gap-6 border-b border-dashed border-gray-light-9/30 pb-8 dark:border-gray-dark-9/30 lg:w-full lg:max-w-[1104px] lg:flex-row lg:justify-between lg:gap-0">
                <h1 className="text-center text-2xl font-bold leading-8 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 sm:text-[32px] lg:text-left">
                    {router.pathname.includes("binance") ? "BSC" : "Arbitrum"} Leveraged <br /> Token Market
                </h1>
                <div className="flex flex-row items-center justify-center gap-6 lg:items-end">
                    <div className="flex flex-col items-center gap-2 lg:items-end">
                        <p className="text-xs text-gray-light-10">{router.pathname.includes("binance") ? "Total Volume" : "Total AUM"}</p>
                        {showLoading && <div className="h-4 w-[100px] animate-pulse rounded-full bg-gray-light-3 dark:bg-gray-dark-3"></div>}
                        {showData && <p className="font-ibm text-sm leading-4 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 sm:text-xl sm:leading-6">{dollarFormatter.format(data ? data.aum : 0)}</p>}
                    </div>
                    <div className="flex flex-col items-center gap-2 lg:items-end">
                        <p className="text-xs text-gray-light-10">{router.pathname.includes("binance") ? <a href="#">Risedle Pools &#8599;</a> : "Total Value Locked"}</p>
                        {showLoading && <div className="h-4 w-[100px] animate-pulse rounded-full bg-gray-light-3 dark:bg-gray-dark-3"></div>}
                        {showData && <p className="font-ibm text-sm leading-4 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 sm:text-xl sm:leading-6">{dollarFormatter.format(data ? data.tvl : 0)}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MarketsHeader;
