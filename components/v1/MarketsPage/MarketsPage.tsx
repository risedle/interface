import type { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";

import Favicon from "../Favicon";
import Footer from "../Footer";
import { dollarFormatter } from "../../../utils/formatters";
import MarketCard from "./MarketCard";
import ButtonNetworkSwitcher from "../Buttons/NetworkSwitcher";
import ButtonConnectWalletDesktop from "../Buttons/ConnectWalletDesktop";
import ButtonThemeSwitcher from "../Buttons/ThemeSwitcher";
import Logo from "../Logo";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";
import MarketsPageMeta from "./MarketsPageMeta";
import { DEFAULT_CHAIN, useWalletContext } from "../Wallet";
import { useMarkets } from "../swr/useMarkets";
import Navigation from "../Navigation";

/**
 * MarketsPageProps is a React Component properties that passed to React Component MarketsPage
 */
type MarketsPageProps = {};

/**
 * MarketsPage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MarketsPage: FunctionComponent<MarketsPageProps> = ({}) => {
    // Read global states
    const { chain } = useWalletContext();

    // Read data from Snapshot API
    const marketsResponse = useMarkets(chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id);

    // UI states
    const showLoading = marketsResponse.isLoading;
    const showError = !showLoading && marketsResponse.error;
    const showData = !showLoading && !showError && marketsResponse.data;

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>Risedle Protocol</title>
                <meta name="description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
                <MarketsPageMeta />
            </Head>
            <Favicon />

            <Navigation marketsActive />

            <div className="z-10 flex min-h-screen flex-col">
                {/* Headers */}
                <div className="container mx-auto mt-8 max-w-[540px] px-4 sm:mt-16">
                    <div className="flex flex-col space-y-6 border-b border-dashed border-gray-light-9 pb-6 dark:border-gray-dark-9">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold leading-8 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 sm:text-[32px]">Leveraged Token Market</h1>
                        </div>
                        <div className="mx-auto flex flex-row space-x-6">
                            <div className="flex flex-col space-y-2 text-center">
                                <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">AUM</p>
                                {showLoading && <div className="h-[16px] w-[100px] animate-pulse rounded-full bg-gray-light-3 dark:bg-gray-dark-3"></div>}
                                {showData && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 sm:text-base">{dollarFormatter.format(marketsResponse.data ? marketsResponse.data.aum : 0)}</p>}
                            </div>
                            <div className="flex flex-col space-y-2 text-center">
                                <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">TVL</p>
                                {showLoading && <div className="h-[16px] w-[100px] animate-pulse rounded-full bg-gray-light-3 dark:bg-gray-dark-3"></div>}
                                {showData && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 sm:text-base">{dollarFormatter.format(marketsResponse.data ? marketsResponse.data.tvl : 0)}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <div className="container mx-auto mt-6 max-w-[400px] px-4 sm:mt-8">
                    {/* Cards loading state */}
                    {showLoading && (
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
                    )}
                    {/* Cards display state */}
                    {showData && (
                        <div className="grid grid-cols-1 gap-4">
                            {marketsResponse.data?.markets.map((market) => {
                                return (
                                    <div key={market.leveraged_token_address}>
                                        <MarketCard address={market.leveraged_token_address} initialNAV={market.nav_last} initialNAVChange={market.leveraged_token_price_change_percent} totalSupply={market.leveraged_token_total_supply} />{" "}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="hidden sm:inline-block">
                <Footer />
            </div>

            <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 sm:-top-1/2">
                <svg className="stroke-black dark:stroke-white" width="679" height="679" viewBox="0 0 679 679" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="130.173" />
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="175.19" />
                        <circle opacity="0.05" cx="339.5" cy="339.5" r="227.709" />
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="339" />
                    </g>
                </svg>
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <svg width="543" height="463" viewBox="0 0 543 463" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_733_108850)">
                        <rect x="126" y="208.087" width="14.5306" height="134.487" transform="rotate(-16.0921 126 208.087)" fill="#5FD4F4" />
                    </g>
                    <g filter="url(#filter1_f_733_108850)">
                        <rect x="244.65" y="166.715" width="14.5306" height="120.439" transform="rotate(-16.0921 244.65 166.715)" fill="#946800" />
                    </g>
                    <g filter="url(#filter2_f_733_108850)">
                        <rect x="211.865" y="166.715" width="14.5306" height="120.439" transform="rotate(-16.0921 211.865 166.715)" fill="#946800" />
                    </g>
                    <g filter="url(#filter3_f_733_108850)">
                        <rect x="369.544" y="143.297" width="14.5306" height="120.439" transform="rotate(-16.0921 369.544 143.297)" fill="#946800" />
                    </g>
                    <g filter="url(#filter4_f_733_108850)">
                        <rect x="284.46" y="192.475" width="14.5306" height="144.606" transform="rotate(-16.0921 284.46 192.475)" fill="#F4C6DB" />
                    </g>
                    <g filter="url(#filter5_f_733_108850)">
                        <rect x="136.148" y="130.028" width="14.5306" height="144.606" transform="rotate(-16.0921 136.148 130.028)" fill="#F4C6DB" />
                    </g>
                    <defs>
                        <filter id="filter0_f_733_108850" x="0.379997" y="78.4391" width="302.479" height="384.486" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                        <filter id="filter1_f_733_108850" x="119.03" y="37.0675" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                        <filter id="filter2_f_733_108850" x="86.245" y="37.0675" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                        <filter id="filter3_f_733_108850" x="243.924" y="13.6495" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                        <filter id="filter4_f_733_108850" x="158.84" y="62.8273" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                        <filter id="filter5_f_733_108850" x="10.5279" y="0.379997" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                    </defs>
                </svg>
            </div>

            <div className="z-10 sm:hidden">
                <ButtonConnectWalletMobile />
            </div>
        </div>
    );
};

export default MarketsPage;
