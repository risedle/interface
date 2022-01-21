import { FunctionComponent, useState } from "react";
import { useWalletContext } from "../Wallet";
import { chain as Chains } from "wagmi";

// Snapshot data
import { useMarkets } from "../../../utils/snapshot";

// Formatters
import { dollarFormatter } from "../../../utils/formatters";
import ButtonLinkBasic from "../Buttons/LinkBasic";
import PriceChart from "../PriceChart";

// Markets Metadata
type Metadata = {
    logo: string;
    title: string;
    subtitle: string;
    path: string;
    description: string;
};
type MarketMetadata = Record<string, Metadata>;
type MarketMetadataRecord = Record<number, MarketMetadata>;
const Metadata: MarketMetadataRecord = {
    [Chains.kovan.id]: {
        ["0xc4676f88663360155c2bc6d2A482E34121a50b3b"]: {
            logo: "/markets/ethrise.svg",
            title: "ETHRISE",
            subtitle: "ETH Leverage Market",
            path: "/markets/ethrise",
            description: "Enjoy leveraged ETH without risk of liquidation or earn yield from your idle USDC",
        },
    },
};

/**
 * MarketCardsProps is a React Component properties that passed to React Component MarketCards
 */
type MarketCardsProps = {};

/**
 * MarketCards is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MarketCards: FunctionComponent<MarketCardsProps> = ({}) => {
    // Get total AUM
    // Total collateral all of leveraged tokens in terms of USDC
    const { chain } = useWalletContext();
    const { data, isLoading } = useMarkets(chain.id);
    const [nav, setNAV] = useState<number | undefined>(undefined);
    const [lastNAV, setLastNAV] = useState<number | undefined>(undefined);

    return (
        <div className="flex flex-col px-4 max-w-4xl m-auto">
            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col p-4 bg-gray-light-1 dark:bg-gray-dark-1 border border-gray-light-3 dark:border-gray-dark-3 rounded-[24px]">
                        <div className="flex flex-row space-x-4 items-center pb-4">
                            <div className="h-12 w-12 flex-none rounded-full bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                            <div className="h-7 grow rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                        </div>
                        <div className="flex flex-row py-4 border-b border-gray-light-3 dark:border-gray-dark-3 border-dashed">
                            <div className="h-7 grow rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse "></div>
                        </div>
                        <div className="flex flex-row space-x-6 pt-4">
                            <div className="basis-1/3 h-[40px] rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                            <div className="basis-1/3 h-[40px] rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                            <div className="basis-1/3 h-[40px] rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex flex-col p-4 bg-gray-light-1 dark:bg-gray-dark-1 border border-gray-light-3 dark:border-gray-dark-3 rounded-[24px]">
                        <div className="flex flex-row space-x-4 items-center pb-4">
                            <div className="h-12 w-12 flex-none rounded-full bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                            <div className="h-7 grow rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                        </div>
                        <div className="flex flex-row py-4 border-b border-gray-light-3 dark:border-gray-dark-3 border-dashed">
                            <div className="h-7 grow rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse "></div>
                        </div>
                        <div className="flex flex-row space-x-6 pt-4">
                            <div className="basis-1/3 h-[40px] rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                            <div className="basis-1/3 h-[40px] rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                            <div className="basis-1/3 h-[40px] rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && data && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.markets.map((market) => {
                        const tokenAddress = market.leveraged_token_address;
                        const totalSupply = market.leveraged_token_total_supply;
                        const logo = Metadata[chain.id][tokenAddress].logo;
                        const title = Metadata[chain.id][tokenAddress].title;
                        const subtitle = Metadata[chain.id][tokenAddress].subtitle;
                        const path = Metadata[chain.id][tokenAddress].path;
                        const description = Metadata[chain.id][tokenAddress].description;
                        if (!nav) {
                            setNAV(market.nav_last);
                        }
                        if (!lastNAV) {
                            setLastNAV(market.nav_past);
                        }
                        let priceChangePercent = market.leveraged_token_price_change_percent;
                        if (nav && lastNAV) {
                            priceChangePercent = ((nav - lastNAV) / lastNAV) * 100;
                        }

                        return (
                            <div key={tokenAddress} className="flex flex-col bg-gray-light-1 dark:bg-gray-dark-1 border border-gray-light-3 dark:border-gray-dark-3 rounded-[24px]">
                                <div className="flex flex-row space-x-4 items-center p-4">
                                    <div className="flex-none">
                                        <img src={logo} alt={title} />
                                    </div>
                                    <div className="flex flex-row grow justify-between">
                                        <div className="flex flex-col space-y-1">
                                            <h2 className="font-bold text-sm leading-4 tracking-tighter text-gray-light-12 dark:text-gray-dark-12">{title}</h2>
                                            <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                                        </div>
                                        <div>
                                            <ButtonLinkBasic href={path}>Open</ButtonLinkBasic>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col py-4 border-b sm:border-t border-gray-light-3 dark:border-gray-dark-3 border-dashed space-y-2">
                                    <div className="hidden sm:inline-block">
                                        <PriceChart leveragedTokenAddress={tokenAddress} setNAV={setNAV} setLastNAV={setLastNAV} initialNAV={market.nav_last} initialLastNAV={market.nav_past} />
                                    </div>
                                    <div className="px-4 sm:py-4">
                                        <p className="text-xs sm:text-sm leading-4 text-gray-light-9 dark:text-gray-dark-9">{description}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-6 p-4">
                                    <div className="basis-1/3">
                                        <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">Price</p>
                                        <p className="font-ibm font-semibold text-sm text-gray-light-12 dark:text-gray-dark-12 tracking-tighter">{nav && dollarFormatter.format(nav)}</p>
                                    </div>
                                    <div className="basis-1/3">
                                        <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">Changes</p>
                                        <div className="flex flex-row items-center">
                                            <svg className={priceChangePercent > 0 ? "fill-green-light-11 dark:fill-green-dark-11 inline-block" : "hidden"} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" />
                                            </svg>
                                            <svg className={priceChangePercent > 0 ? "hidden" : "fill-red-light-11 dark:fill-red-dark-11 inline-block"} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L8 11.2929L8 2.5C8 2.22386 7.77614 2 7.5 2C7.22386 2 7 2.22386 7 2.5L7 11.2929L3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536Z" />
                                            </svg>
                                            <p className={`font-ibm font-semibold text-sm text-gray-light-12 dark:text-gray-dark-12 tracking-tighter ${priceChangePercent > 0 ? "text-green-light-11 dark:text-green-dark-11" : "text-red-light-10 dark:text-red-dark-10"}`}>{priceChangePercent.toFixed(2) + "%"}</p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 text-right">
                                        <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">Market Cap</p>
                                        <p className="font-ibm font-semibold text-sm text-gray-light-12 dark:text-gray-dark-12 tracking-tighter">{nav && dollarFormatter.format(nav * totalSupply)}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MarketCards;
