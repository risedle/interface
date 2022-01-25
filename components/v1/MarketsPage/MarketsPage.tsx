import type { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";

import Favicon from "../Favicon";
import Footer from "../Footer";
import { useWalletContext } from "../Wallet";
import { useMarkets } from "../../../utils/snapshot";
import { dollarFormatter } from "../../../utils/formatters";
import MarketCard from "./MarketCard";
import ButtonNetworkSwitcher from "../Buttons/NetworkSwitcher";
import ButtonConnectWalletDesktop from "../Buttons/ConnectWalletDesktop";
import ButtonThemeSwitcher from "../Buttons/ThemeSwitcher";
import Logo from "../Logo";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";

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
    const { chain } = useWalletContext();
    const { markets, marketsIsLoading, marketsIsError } = useMarkets(chain.id);
    console.debug(markets);

    return (
        <div className="w-full h-full bg-gray-light-1 dark:bg-gray-dark-1 font-inter min-h-screen flex flex-col overflow-hidden relative">
            <Head>
                <title>Leveraged Tokens Market | Risedle</title>
                <meta name="description" content="Invest, earn and build on the decentralized leveraged token market protocol" />
            </Head>
            <Favicon />

            <div className="container max-w-full mx-auto z-10 sm:z-20">
                <div className="flex flex-row p-4 items-center justify-between">
                    <div className="flex-none">
                        <Link href="/">
                            <a className="flex items-center">
                                <Logo />
                                <span className="text-base font-inter font-bold pl-2 traking-tight text-gray-light-12 dark:text-gray-light-1 self-center leading-0">Risedle</span>
                            </a>
                        </Link>
                    </div>
                    <div className="flex-none flex flex-row space-x-2 inline-block">
                        <div className="hidden sm:inline-block">
                            <ButtonNetworkSwitcher />
                        </div>

                        <div className="hidden sm:inline-block">
                            <ButtonConnectWalletDesktop />
                        </div>

                        <div className="inline-block h-[40px]">
                            <ButtonThemeSwitcher />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col z-10 min-h-screen">
                {/* Headers */}
                <div className="container px-4 mx-auto max-w-4xl mt-8 sm:mt-16">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:justify-between border-b border-gray-light-9 dark:border-gray-dark-9 border-dashed pb-6">
                        <div className="text-center">
                            <h1 className="text-2xl sm:text-[32px] font-bold leading-8 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12">Leveraged Token Market</h1>
                        </div>
                        <div className="flex flex-row space-x-6 mx-auto sm:m-0">
                            <div className="flex flex-col space-y-2 text-center sm:text-right">
                                <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">AUM</p>
                                {(marketsIsLoading || marketsIsError) && <div className="h-[16px] w-[100px] bg-gray-light-3 dark:bg-gray-dark-3 rounded-full animate-pulse"></div>}
                                {!marketsIsLoading && markets && <p className="font-ibm font-semibold text-sm sm:text-base leading-4 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(markets.aum)}</p>}
                            </div>
                            <div className="flex flex-col space-y-2 text-center sm:text-right">
                                <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">TVL</p>
                                {(marketsIsLoading || marketsIsError) && <div className="h-[16px] w-[100px] bg-gray-light-3 dark:bg-gray-dark-3 rounded-full animate-pulse"></div>}
                                {!marketsIsLoading && markets && <p className="font-ibm font-semibold text-sm sm:text-base leading-4 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(markets.tvl)}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <div className="container px-4 mx-auto max-w-4xl mt-6 sm:mt-8">
                    {/* Cards loading state */}
                    {(marketsIsLoading || marketsIsError) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col p-4 bg-gray-light-1 dark:bg-gray-dark-1 border border-gray-light-3 dark:border-gray-dark-3 rounded-[24px]">
                                <div className="flex flex-row space-x-4 items-center pb-4">
                                    <div className="h-12 w-12 flex-none rounded-full bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                                    <div className="h-7 grow rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
                                </div>
                                <div className="hidden sm:block h-[192px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
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
                                <div className="hidden sm:block h-[192px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse"></div>
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
                    {/* Cards display state */}
                    {markets && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {markets.markets.map((market) => {
                                return (
                                    <div key={market.leveraged_token_address}>
                                        <MarketCard chainID={chain.id} address={market.leveraged_token_address} initialNAV={market.nav_last} initialNAVChange={market.leveraged_token_price_change_percent} totalSupply={market.leveraged_token_total_supply} />{" "}
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

            <div className="absolute -top-1/3 sm:-top-1/2 left-1/2 -translate-x-1/2">
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

            <div className="sm:hidden z-10">
                <ButtonConnectWalletMobile />
            </div>
        </div>
    );
};

export default MarketsPage;
