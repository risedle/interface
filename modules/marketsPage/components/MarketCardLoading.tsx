import type { FunctionComponent } from "react";

/**
 * MarketCardLoadingProps is a React Component properties that passed to React Component MarketCardLoading
 */
type MarketCardLoadingProps = {};

/**
 * MarketCardLoading is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const MarketCardLoading: FunctionComponent<MarketCardLoadingProps> = ({}) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col rounded-[24px] border border-gray-light-3 bg-gray-light-1 p-4 dark:border-gray-dark-3 dark:bg-gray-dark-1">
                    <div className="flex flex-row items-center space-x-4 pb-4">
                        <div className="h-12 w-12 flex-none animate-pulse rounded-full bg-gray-light-3 dark:bg-gray-dark-3"></div>
                        <div className="h-7 grow animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                    </div>
                    <div className="hidden h-[192px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3 sm:block"></div>
                    <div className="flex flex-row border-b border-dashed border-gray-light-3 py-4 dark:border-gray-dark-3">
                        <div className="h-7 grow animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 "></div>
                    </div>
                    <div className="flex flex-row space-x-6 pt-4">
                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                    </div>
                </div>
                <div className="flex flex-col rounded-[24px] border border-gray-light-3 bg-gray-light-1 p-4 dark:border-gray-dark-3 dark:bg-gray-dark-1">
                    <div className="flex flex-row items-center space-x-4 pb-4">
                        <div className="h-12 w-12 flex-none animate-pulse rounded-full bg-gray-light-3 dark:bg-gray-dark-3"></div>
                        <div className="h-7 grow animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                    </div>
                    <div className="hidden h-[192px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3 sm:block"></div>
                    <div className="flex flex-row border-b border-dashed border-gray-light-3 py-4 dark:border-gray-dark-3">
                        <div className="h-7 grow animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 "></div>
                    </div>
                    <div className="flex flex-row space-x-6 pt-4">
                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MarketCardLoading;
