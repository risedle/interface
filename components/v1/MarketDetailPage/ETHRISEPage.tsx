import { FunctionComponent, useState } from "react";
import Head from "next/head";
import { chain as Chains } from "wagmi";
import * as Tabs from "@radix-ui/react-tabs";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

import Favicon from "../Favicon";
import Navigation from "../Navigation/MarketNavigation";
import Footer from "../Footer";
import { useWalletContext } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import { useLeveragedTokenData3Months, Timeframe, useMarket, useVaultData3Months } from "../../../utils/snapshot";
import { dollarFormatter } from "../../../utils/formatters";

// ETHRISE Token ids
const ETHRISEAddresses = {
    [Chains.kovan.id]: { token: "0xc4676f88663360155c2bc6d2A482E34121a50b3b", vault: "0x42B6BAE111D9300E19F266Abf58cA215f714432c" },
};

/**
 * ETHRISEPageProps is a React Component properties that passed to React Component ETHRISEPage
 */
type ETHRISEPageProps = {};

/**
 * ETHRISEPage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ETHRISEPage: FunctionComponent<ETHRISEPageProps> = ({}) => {
    const { chain, account } = useWalletContext();
    const ethriseAddress = ETHRISEAddresses[chain.id].token;
    const vaultAddress = ETHRISEAddresses[chain.id].vault;

    // Get ETHRISE metadata
    const metadata = Metadata[chain.id][ethriseAddress];
    const title = metadata.title;
    const subtitle = metadata.subtitle;
    const logo = metadata.logo;
    const vaultLogo = metadata.vaultLogo;
    const description = metadata.description;
    const informationText = metadata.informationText;
    const vaultInformationText = metadata.vaultInformationText;
    const collateralSymbol = metadata.collateralSymbol;
    const debtSymbol = metadata.debtSymbol;

    // Get price external data from Risedle Snapshot
    const { leveragedTokenHistoricalData, leveragedTokenHistoricalDataIsLoading, leveragedTokenHistoricalDataIsError } = useLeveragedTokenData3Months(chain.id, ethriseAddress);
    const { vaultHistoricalData, vaultHistoricalDataIsLoading, vaultHistoricalDataIsError } = useVaultData3Months(chain.id, vaultAddress);
    const { market, marketIsLoading, marketIsError } = useMarket(chain.id, ethriseAddress);

    console.debug("market", market);

    // States
    const [nav, setNAV] = useState(0);
    const [initialNAV, setInitialNAV] = useState(0);
    const [navChange, setNAVChange] = useState(0);
    const [initialNAVChange, setInitialNAVChange] = useState(0);
    const [supplyAPY, setSupplyAPY] = useState(0);
    const [initialSupplyAPY, setInitialSupplyAPY] = useState(0);
    const [borrowAPY, setBorrowAPY] = useState(0);
    const [initialBorrowAPY, setInitialBorrowAPY] = useState(0);

    const [currentTimeframe, setCurrentTimeframe] = useState(Timeframe.TwoWeekly);
    const [currentLeveragedTokenData, setCurrentLeveragedTokenData] = useState(leveragedTokenHistoricalData);
    const [currentVaultData, setCurrentVaultData] = useState(vaultHistoricalData);

    // Set initial data for onMouseLeave event on the price chart
    if (initialNAV === 0 && initialNAVChange === 0 && initialSupplyAPY === 0 && initialBorrowAPY === 0 && market) {
        // Initial Price and changes
        const change = ((market.nav_last - market.nav_past) / market.nav_past) * 100;
        setInitialNAV(market.nav_last);
        setNAV(market.nav_last);
        setInitialNAVChange(change);
        setNAVChange(change);

        // Initial APYs
        setInitialSupplyAPY(market.vault_supply_apy);
        setSupplyAPY(market.vault_supply_apy);
        setInitialBorrowAPY(market.vault_borrow_apy);
        setBorrowAPY(market.vault_borrow_apy);
    }

    // Set current data on the first load
    if (!currentLeveragedTokenData && leveragedTokenHistoricalData) {
        setCurrentLeveragedTokenData(leveragedTokenHistoricalData);
    }
    if (!currentVaultData && vaultHistoricalData) {
        setCurrentVaultData(vaultHistoricalData);
    }

    // Styling for active timeframe selector
    const activeTimeframeClasses = "bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 rounded-full font-semibold text-gray-light-12 dark:text-gray-dark-12";

    return (
        <div className="w-full h-full bg-gray-light-1 dark:bg-gray-dark-1 font-inter min-h-screen flex flex-col overflow-hidden">
            <Head>
                <title>ETHRISE Market | Risedle</title>
                <meta name="description" content="Leverage ETH or earn yield from your idle USDC" />
            </Head>
            <Favicon />
            <div className="z-10 flex flex-col">
                <Navigation />

                {/* Market header on the desktop; Only show this on w > 640px */}
                <div className="hidden sm:inline-block flex flex-col m-auto text-center space-y-6 mt-12 mb-14">
                    <div>
                        <img src={logo} alt={title} className="w-[64px] h-[64px] inline-block" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="m-0 text-[32px] leading-none tracking-[-.02em] font-bold text-gray-light-12 dark:text-gray-dark-12">{title} Market</h1>
                        <p className="text-sm text-gray-light-10 dark:text-gray-dark-10">{description}</p>
                    </div>
                </div>

                {/* Market tabs and content */}
                <Tabs.Root defaultValue="leverage" className="px-4 outline-0">
                    <Tabs.List aria-label="ETHRISE" className="bg-gray-light-3 dark:bg-gray-dark-2 rounded-[12px] flex flex-row p-1 mx-auto sm:max-w-[253px] mb-6">
                        <Tabs.Trigger value="leverage" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 state-active:text-gray-light-12 state-active:dark:text-gray-dark-12 state-active:font-bold state-active:py-[12px] state-active:dark:bg-gray-dark-4 state-active:bg-gray-light-1">
                            Leverage
                        </Tabs.Trigger>
                        <Tabs.Trigger value="earn" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 state-active:text-gray-light-12 state-active:dark:text-gray-dark-12 state-active:font-bold state-active:py-[12px] state-active:dark:bg-gray-dark-4 state-active:bg-gray-light-1">
                            Earn
                        </Tabs.Trigger>
                    </Tabs.List>

                    {/* Leverage tab */}
                    <Tabs.Content value="leverage" className="outline-0 flex flex-col mx-auto max-w-[540px] space-y-6">
                        {/* Price info card */}
                        <div className="flex flex-col bg-gray-light-2 dark:bg-gray-dark-2 rounded-[16px] w-full">
                            {/* Title, subtitle and lgoo */}
                            <div className="flex flex-row p-4 items-center justify-between">
                                <div className="grow sflex flex-col space-y-2">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                                    <h1 className="m-0 text-2xl text-gray-light-12 dark:text-gray-dark-12 tracking-[-.02em] font-bold">{title}</h1>
                                </div>
                                <img className="sm:hidden" src={logo} alt={title} />
                            </div>

                            {/* Price & Change */}
                            <div className="flex flex-row space-x-4 px-4">
                                <div className="flex flex-col space-y-2 w-[52px]">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Price</p>
                                    {(leveragedTokenHistoricalDataIsLoading || leveragedTokenHistoricalDataIsError) && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                                    {!leveragedTokenHistoricalDataIsLoading && leveragedTokenHistoricalData && <p className="font-ibm font-semibold text-sm leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(nav)}</p>}
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Change</p>
                                    {(leveragedTokenHistoricalDataIsLoading || leveragedTokenHistoricalDataIsError) && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                                    {!leveragedTokenHistoricalDataIsLoading && leveragedTokenHistoricalData && (
                                        <div className="flex flex-row items-center">
                                            <svg className={navChange > 0 ? "fill-green-light-11 dark:fill-green-dark-11 inline-block" : "hidden"} width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" />
                                            </svg>
                                            <svg className={navChange > 0 ? "hidden" : "fill-red-light-11 dark:fill-red-dark-11 inline-block"} width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L8 11.2929L8 2.5C8 2.22386 7.77614 2 7.5 2C7.22386 2 7 2.22386 7 2.5L7 11.2929L3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536Z" />
                                            </svg>
                                            <p className={`font-ibm font-semibold text-sm text-gray-light-12 dark:text-gray-dark-12 tracking-tighter ${navChange > 0 ? "text-green-light-11 dark:text-green-dark-11" : "text-red-light-10 dark:text-red-dark-10"}`}>{navChange.toFixed(2) + "%"}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Price chart */}
                            <div className="w-full h-[192px] mt-8">
                                {(leveragedTokenHistoricalDataIsLoading || leveragedTokenHistoricalDataIsError) && <div className="h-[192px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse mb-2"></div>}
                                {!leveragedTokenHistoricalDataIsLoading && leveragedTokenHistoricalData && (
                                    <ResponsiveContainer width="100%" height="100%" className="h-full">
                                        <AreaChart
                                            data={currentLeveragedTokenData}
                                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                            onMouseLeave={() => {
                                                setNAV(initialNAV);
                                                setNAVChange(initialNAVChange);
                                            }}
                                        >
                                            <defs>
                                                <linearGradient id="upGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="rgba(37, 208, 171)" stopOpacity={0.4} />
                                                    <stop offset="100%" stopColor="rgba(37, 208, 171)" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="downGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="rgb(205, 43, 49)" stopOpacity={0.4} />
                                                    <stop offset="100%" stopColor="rgb(205, 43, 49)" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip
                                                position={{ y: 0 }}
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        const latestData = payload[0].payload;
                                                        const timestamp = latestData.timestamp;
                                                        const date = new Date(timestamp);
                                                        const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "numeric", year: "numeric", minute: "numeric" }).format(date);

                                                        setNAV(latestData.nav);

                                                        let cd, oldestData;
                                                        switch (currentTimeframe) {
                                                            case Timeframe.Daily:
                                                                cd = leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24, leveragedTokenHistoricalData.length);
                                                                oldestData = cd[0];
                                                                break;
                                                            case Timeframe.Weekly:
                                                                cd = leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7, leveragedTokenHistoricalData.length);
                                                                oldestData = cd[0];
                                                                break;
                                                            case Timeframe.TwoWeekly:
                                                                cd = leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7 * 2, leveragedTokenHistoricalData.length);
                                                                oldestData = cd[0];
                                                                break;
                                                            case Timeframe.Monthly:
                                                                cd = leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7 * 2 * 4, leveragedTokenHistoricalData.length);
                                                                oldestData = cd[0];
                                                                break;
                                                            case Timeframe.ThreeMonthly:
                                                                cd = leveragedTokenHistoricalData;
                                                                oldestData = cd[0];
                                                                break;
                                                        }

                                                        const change = ((latestData.nav - oldestData.nav) / oldestData.nav) * 100;
                                                        setNAVChange(change);

                                                        return <div className="text-xs text-gray-light-10 dark:text-gray-dark-10">{formattedDate}</div>;
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <YAxis hide={true} type="number" domain={["dataMin - 5", "dataMax + 5"]} />
                                            <Area type="monotoneX" dataKey="nav" stroke={navChange > 0 ? "#4CC38A" : "#CD2B31"} fill={navChange > 0 ? "url(#upGradient)" : "url(#downGradient)"} strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                )}
                            </div>

                            {/* Timeframe selector */}
                            <div className="flex flex-row items-center px-4 mt-2">
                                <div className="basis-1/5 text-center">
                                    <button
                                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Daily ? activeTimeframeClasses : ""}`}
                                        onClick={() => {
                                            setCurrentTimeframe(Timeframe.Daily);
                                            if (leveragedTokenHistoricalData) {
                                                setCurrentLeveragedTokenData(leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24, leveragedTokenHistoricalData.length));
                                            }
                                        }}
                                    >
                                        1D
                                    </button>
                                </div>
                                <div className="basis-1/5 text-center">
                                    <button
                                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Weekly ? activeTimeframeClasses : ""}`}
                                        onClick={() => {
                                            setCurrentTimeframe(Timeframe.Weekly);
                                            if (leveragedTokenHistoricalData) {
                                                setCurrentLeveragedTokenData(leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7, leveragedTokenHistoricalData.length));
                                            }
                                        }}
                                    >
                                        1W
                                    </button>
                                </div>
                                <div className="basis-1/5 text-center">
                                    <button
                                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.TwoWeekly ? activeTimeframeClasses : ""}`}
                                        onClick={() => {
                                            setCurrentTimeframe(Timeframe.TwoWeekly);
                                            if (leveragedTokenHistoricalData) {
                                                setCurrentLeveragedTokenData(leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7 * 2, leveragedTokenHistoricalData.length));
                                            }
                                        }}
                                    >
                                        2W
                                    </button>
                                </div>
                                <div className="basis-1/5 text-center">
                                    <button
                                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Monthly ? activeTimeframeClasses : ""}`}
                                        onClick={() => {
                                            setCurrentTimeframe(Timeframe.Monthly);
                                            if (leveragedTokenHistoricalData) {
                                                setCurrentLeveragedTokenData(leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7 * 2 * 4, leveragedTokenHistoricalData.length));
                                            }
                                        }}
                                    >
                                        1M
                                    </button>
                                </div>
                                <div className="basis-1/5 text-center">
                                    <button
                                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.ThreeMonthly ? activeTimeframeClasses : ""}`}
                                        onClick={() => {
                                            setCurrentTimeframe(Timeframe.ThreeMonthly);
                                            setCurrentLeveragedTokenData(leveragedTokenHistoricalData);
                                        }}
                                    >
                                        3M
                                    </button>
                                </div>
                            </div>

                            {/* Mint & Redeem Button */}
                            <div className="p-4">
                                {/* Wallet not connected; Display disabled button */}
                                {!account && (
                                    <button disabled className="bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-0 text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-10 rounded-full cursor-not-allowed w-full py-[11px] dark:py-[12px]">
                                        Connect wallet to Mint or Redeem
                                    </button>
                                )}
                                {/* Wallet connected; Display mint and redeem button */}
                                {/* TODO (bayu): handle connected wallet */}
                                {account && <button>Mint or Redeem</button>}
                            </div>
                        </div>

                        {/* Information card */}
                        <div className="flex flex-col bg-gray-light-2 dark:bg-gray-dark-2 rounded-[16px] w-full space-y-6 px-4 pb-4">
                            <div className="pt-4">
                                <h2 className="text-base leading-4 font-bold text-gray-light-12 dark:text-gray-dark-12">Information</h2>
                            </div>
                            <div className="">
                                <p className="text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">{informationText}</p>
                            </div>
                            <div className="flex flex-col space-y-6">
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Market cap</p>
                                    {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                    {!marketIsLoading && market && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(market.leveraged_token_market_cap)}</p>}
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Leverage ratio</p>
                                    {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                    {!marketIsLoading && market && market.leverage_ratio && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{market.leverage_ratio.toFixed(2) + "x"}</p>}
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Creation &amp; redemption fees</p>
                                    <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">0.1%</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Management fees</p>
                                    <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-green-light-11 dark:text-green-dark-11">FREE</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Underlying assets</p>
                                    <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                                        {collateralSymbol}, {debtSymbol}
                                    </p>
                                </div>
                                {/* TODO(bayu): Handle case when capacity is maxed out */}
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Capacity</p>
                                    {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                    {!marketIsLoading && market && (
                                        <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                                            <span className="text-green-light-11 dark:text-green-dark-11">{market.leveraged_token_total_collateral.toFixed(2) + collateralSymbol}</span> / {market.leveraged_token_max_total_collateral > 0 && <span>{market.leveraged_token_max_total_collateral.toFixed(2) + collateralSymbol}</span>}
                                            {market.leveraged_token_max_total_collateral <= 0 && <span>&#8734;</span>}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Allocation card */}
                        <div className="flex flex-col bg-gray-light-2 dark:bg-gray-dark-2 rounded-[16px] w-full space-y-6 px-4 pb-4">
                            <div className="pt-4">
                                <h2 className="text-base leading-4 font-bold text-gray-light-12 dark:text-gray-dark-12">Allocation</h2>
                            </div>
                            <div className="flex flex-col space-y-6">
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Asset</p>
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Allocation</p>
                                </div>

                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{collateralSymbol}</p>
                                    {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                    {!marketIsLoading && market && market.collateral_per_token && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{market.collateral_per_token.toFixed(2) + " " + collateralSymbol}</p>}
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{debtSymbol}</p>
                                    {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                    {!marketIsLoading && market && market.debt_per_token && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">-{market.debt_per_token.toFixed(2) + " " + debtSymbol}</p>}
                                </div>
                            </div>
                        </div>
                    </Tabs.Content>

                    {/* Earn tab */}
                    <Tabs.Content value="earn" className="outline-0 flex flex-col mx-auto max-w-[540px] space-y-6">
                        {/* APY info card */}
                        <div className="flex flex-col bg-gray-light-2 dark:bg-gray-dark-2 rounded-[16px] w-full">
                            {/* Title, subtitle and lgoo */}
                            <div className="flex flex-row p-4 items-center justify-between">
                                <div className="grow sflex flex-col space-y-2">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                                    <h1 className="m-0 text-2xl text-gray-light-12 dark:text-gray-dark-12 tracking-[-.02em] font-bold">
                                        rv{collateralSymbol}
                                        {debtSymbol}
                                    </h1>
                                </div>
                                <img className="sm:hidden" src={vaultLogo} alt={`rv${collateralSymbol}${debtSymbol}`} />
                            </div>

                            {/* Supply APY and Borrow APY */}
                            <div className="flex flex-row space-x-4 px-4">
                                <div className="flex flex-col space-y-2">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Supply APY</p>
                                    {(vaultHistoricalDataIsLoading || vaultHistoricalDataIsError) && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                                    {!vaultHistoricalDataIsLoading && vaultHistoricalData && <p className="font-ibm font-semibold text-sm leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{supplyAPY.toFixed(2) + "%"}</p>}
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Borrow APY</p>
                                    {(vaultHistoricalDataIsLoading || vaultHistoricalDataIsError) && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                                    {!vaultHistoricalDataIsLoading && vaultHistoricalData && <p className="font-ibm font-semibold text-sm leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{borrowAPY.toFixed(2) + "%"}</p>}
                                </div>
                            </div>

                            {/* APYs chart */}
                            <div className="w-full h-[192px] mt-8">
                                {(vaultHistoricalDataIsLoading || vaultHistoricalDataIsError) && <div className="h-[192px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse mb-2"></div>}
                                {!vaultHistoricalDataIsLoading && vaultHistoricalData && (
                                    <ResponsiveContainer width="100%" height="100%" className="h-full">
                                        <AreaChart
                                            data={currentVaultData}
                                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                            onMouseLeave={() => {
                                                setSupplyAPY(initialSupplyAPY);
                                                setBorrowAPY(initialBorrowAPY);
                                            }}
                                        >
                                            <defs>
                                                <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="rgba(37, 208, 171)" stopOpacity={0.4} />
                                                    <stop offset="100%" stopColor="rgba(37, 208, 171)" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="borrowGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="rgb(205, 43, 49)" stopOpacity={0.4} />
                                                    <stop offset="100%" stopColor="rgb(205, 43, 49)" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip
                                                position={{ y: 0 }}
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        const selectedData = payload[0].payload;
                                                        const timestamp = selectedData.timestamp;
                                                        const date = new Date(timestamp);
                                                        const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "numeric", year: "numeric", minute: "numeric" }).format(date);

                                                        setSupplyAPY(selectedData.supply_apy);
                                                        setBorrowAPY(selectedData.borrow_apy);

                                                        return <div className="text-xs text-gray-light-10 dark:text-gray-dark-10">{formattedDate}</div>;
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <YAxis hide={true} type="number" domain={["dataMin - 5", "dataMax + 5"]} />
                                            <Area type="monotoneX" dataKey="supply_apy" stroke="#4CC38A" fill="url(#supplyGradient)" strokeWidth={2} />
                                            <Area type="monotoneX" dataKey="borrow_apy" stroke="#CD2B31" fill="url(#borrowGradient)" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                )}
                            </div>

                            {/* Timeframe selector */}
                            <div className="flex flex-row items-center px-4 mt-2">
                                <div className="basis-1/5 text-center">
                                    <button
                                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Daily ? activeTimeframeClasses : ""}`}
                                        onClick={() => {
                                            setCurrentTimeframe(Timeframe.Daily);
                                            if (vaultHistoricalData) {
                                                setCurrentVaultData(vaultHistoricalData.slice(vaultHistoricalData.length - 24, vaultHistoricalData.length));
                                            }
                                        }}
                                    >
                                        1D
                                    </button>
                                </div>
                                <div className="basis-1/5 text-center">
                                    <button
                                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Weekly ? activeTimeframeClasses : ""}`}
                                        onClick={() => {
                                            setCurrentTimeframe(Timeframe.Weekly);
                                            if (vaultHistoricalData) {
                                                setCurrentVaultData(vaultHistoricalData.slice(vaultHistoricalData.length - 24 * 7, vaultHistoricalData.length));
                                            }
                                        }}
                                    >
                                        1W
                                    </button>
                                </div>
                                <div className="basis-1/5 text-center">
                                    <button
                                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.TwoWeekly ? activeTimeframeClasses : ""}`}
                                        onClick={() => {
                                            setCurrentTimeframe(Timeframe.TwoWeekly);
                                            if (vaultHistoricalData) {
                                                setCurrentVaultData(vaultHistoricalData.slice(vaultHistoricalData.length - 24 * 7 * 2, vaultHistoricalData.length));
                                            }
                                        }}
                                    >
                                        2W
                                    </button>
                                </div>
                                <div className="basis-1/5 text-center">
                                    <button
                                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Monthly ? activeTimeframeClasses : ""}`}
                                        onClick={() => {
                                            setCurrentTimeframe(Timeframe.Monthly);
                                            if (vaultHistoricalData) {
                                                setCurrentVaultData(vaultHistoricalData.slice(vaultHistoricalData.length - 24 * 7 * 2 * 4, vaultHistoricalData.length));
                                            }
                                        }}
                                    >
                                        1M
                                    </button>
                                </div>
                                <div className="basis-1/5 text-center">
                                    <button
                                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.ThreeMonthly ? activeTimeframeClasses : ""}`}
                                        onClick={() => {
                                            setCurrentTimeframe(Timeframe.ThreeMonthly);
                                            setCurrentVaultData(vaultHistoricalData);
                                        }}
                                    >
                                        3M
                                    </button>
                                </div>
                            </div>

                            {/* Mint & Redeem Button */}
                            <div className="p-4">
                                {/* Wallet not connected; Display disabled button */}
                                {!account && (
                                    <button disabled className="bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-0 text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-10 rounded-full cursor-not-allowed w-full py-[11px] dark:py-[12px]">
                                        Connect wallet to Deposit or Withdraw
                                    </button>
                                )}
                                {/* Wallet connected; Display mint and redeem button */}
                                {/* TODO (bayu): handle connected wallet */}
                                {account && <button>Deposit or Withdraw</button>}
                            </div>
                        </div>

                        {/* Information card */}
                        <div className="flex flex-col bg-gray-light-2 dark:bg-gray-dark-2 rounded-[16px] w-full space-y-6 px-4 pb-4">
                            <div className="pt-4">
                                <h2 className="text-base leading-4 font-bold text-gray-light-12 dark:text-gray-dark-12">Information</h2>
                            </div>
                            <div className="">
                                <p className="text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">{vaultInformationText}</p>
                            </div>
                            <div className="flex flex-col space-y-6">
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Utilization rate</p>
                                    {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                    {!marketIsLoading && market && market.vault_utilization_rate && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{market.vault_utilization_rate.toFixed(2) + "%"}</p>}
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Total borrowed</p>
                                    {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                    {!marketIsLoading && market && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(market.vault_total_outstanding_debt)}</p>}
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Available to withdraw</p>
                                    {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                    {!marketIsLoading && market && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(market.vault_total_available_cash)}</p>}
                                </div>
                            </div>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
                <div className="pb-20 sm:pb-0 mt-20">
                    <Footer />
                </div>
            </div>

            <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2">
                <svg width="543" height="497" viewBox="0 0 543 497" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_1038_34773)">
                        <rect x="126" y="242.087" width="14.5306" height="134.487" transform="rotate(-16.0921 126 242.087)" fill="#A42A12" />
                    </g>
                    <g filter="url(#filter1_f_1038_34773)">
                        <rect x="244.65" y="200.715" width="14.5306" height="120.439" transform="rotate(-16.0921 244.65 200.715)" fill="#3E63DD" />
                    </g>
                    <g filter="url(#filter2_f_1038_34773)">
                        <rect x="211.865" y="200.715" width="14.5306" height="120.439" transform="rotate(-16.0921 211.865 200.715)" fill="#3E63DD" />
                    </g>
                    <g filter="url(#filter3_f_1038_34773)">
                        <rect x="369.544" y="177.297" width="14.5306" height="120.439" transform="rotate(-16.0921 369.544 177.297)" fill="#3E63DD" />
                    </g>
                    <g filter="url(#filter4_f_1038_34773)">
                        <rect x="284.46" y="226.475" width="14.5306" height="144.606" transform="rotate(-16.0921 284.46 226.475)" fill="#793AAF" />
                    </g>
                    <g filter="url(#filter5_f_1038_34773)">
                        <rect x="136.148" y="164.028" width="14.5306" height="144.606" transform="rotate(-16.0921 136.148 164.028)" fill="#793AAF" />
                    </g>
                    <g opacity="0.4">
                        <mask id="mask0_1038_34773" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="45" y="0" width="432" height="341">
                            <rect width="431.226" height="341" transform="matrix(1 0 0 -1 45.3872 341)" fill="url(#paint0_linear_1038_34773)" />
                        </mask>
                        <g mask="url(#mask0_1038_34773)" className="fill-black dark:fill-white">
                            <circle opacity="0.9" r="0.995136" transform="matrix(1 0 0 -1 46.3823 340.005)" />
                            <circle opacity="0.3" r="0.995136" transform="matrix(1 0 0 -1 68.9385 340.005)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 91.4951 340.005)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 114.052 340.005)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 136.608 340.005)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 159.165 340.005)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 181.721 340.005)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 204.277 340.005)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 226.834 340.005)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 249.39 340.005)" />
                            <circle opacity="0.7" r="0.995136" transform="matrix(1 0 0 -1 271.946 340.005)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 294.503 340.005)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 317.06 340.005)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 339.616 340.005)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 362.172 340.005)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 384.729 340.005)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 407.285 340.005)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 429.841 340.005)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 452.398 340.005)" />
                            <circle opacity="0.3" r="0.995136" transform="matrix(1 0 0 -1 474.954 340.005)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 46.3823 317.448)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 68.9385 317.448)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 91.4951 317.448)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 114.052 317.448)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 136.608 317.448)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 159.165 317.448)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 181.721 317.448)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 204.277 317.448)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 226.834 317.448)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 249.39 317.448)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 271.946 317.448)" />
                            <circle opacity="0.7" r="0.995136" transform="matrix(1 0 0 -1 294.503 317.448)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 317.06 317.448)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 339.616 317.448)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 362.172 317.448)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 384.729 317.448)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 407.285 317.448)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 429.841 317.448)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 452.398 317.448)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 474.954 317.448)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 46.3823 294.892)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 68.9385 294.892)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 91.4951 294.892)" />
                            <circle opacity="0.3" r="0.995136" transform="matrix(1 0 0 -1 114.052 294.892)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 136.608 294.892)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 159.165 294.892)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 181.721 294.892)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 204.277 294.892)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 226.834 294.892)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 249.39 294.892)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 271.946 294.892)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 294.503 294.892)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 317.06 294.892)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 339.616 294.892)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 362.172 294.892)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 384.729 294.892)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 407.285 294.892)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 429.841 294.892)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 452.398 294.892)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 474.954 294.892)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 46.3823 272.335)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 68.9385 272.335)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 91.4951 272.335)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 114.052 272.335)" />
                            <circle opacity="0.3" r="0.995136" transform="matrix(1 0 0 -1 136.608 272.335)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 159.165 272.335)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 181.721 272.335)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 204.277 272.335)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 226.834 272.335)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 249.39 272.335)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 271.946 272.335)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 294.503 272.335)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 317.06 272.335)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 339.616 272.335)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 362.172 272.335)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 384.729 272.335)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 407.285 272.335)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 429.841 272.335)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 452.398 272.335)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 474.954 272.335)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 46.3823 249.779)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 68.9385 249.779)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 91.4951 249.779)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 114.052 249.779)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 136.608 249.779)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 159.165 249.779)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 181.721 249.779)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 204.277 249.779)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 226.834 249.779)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 249.39 249.779)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 271.946 249.779)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 294.503 249.779)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 317.06 249.779)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 339.616 249.779)" />
                            <circle opacity="0.7" r="0.995136" transform="matrix(1 0 0 -1 362.172 249.779)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 384.729 249.779)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 407.285 249.779)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 429.841 249.779)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 452.398 249.779)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 474.954 249.779)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 46.3823 227.223)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 68.9385 227.223)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 91.4951 227.223)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 114.052 227.223)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 136.608 227.223)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 159.165 227.223)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 181.721 227.223)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 204.277 227.223)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 226.834 227.223)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 249.39 227.223)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 271.946 227.223)" />
                            <circle opacity="0.7" r="0.995136" transform="matrix(1 0 0 -1 294.503 227.223)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 317.06 227.223)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 339.616 227.223)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 362.172 227.223)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 384.729 227.223)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 407.285 227.223)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 429.841 227.223)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 452.398 227.223)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 474.954 227.223)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 46.3823 204.666)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 68.9385 204.666)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 91.4951 204.666)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 114.052 204.666)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 136.608 204.666)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 159.165 204.666)" />
                            <circle opacity="0.7" r="0.995136" transform="matrix(1 0 0 -1 181.721 204.666)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 204.277 204.666)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 226.834 204.666)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 249.39 204.666)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 271.946 204.666)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 294.503 204.666)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 317.06 204.666)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 339.616 204.666)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 362.172 204.666)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 384.729 204.666)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 407.285 204.666)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 429.841 204.666)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 452.398 204.666)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 474.954 204.666)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 46.3823 182.11)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 68.9385 182.11)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 91.4951 182.11)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 114.052 182.11)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 136.608 182.11)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 159.165 182.11)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 181.721 182.11)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 204.277 182.11)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 226.834 182.11)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 249.39 182.11)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 271.946 182.11)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 294.503 182.11)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 317.06 182.11)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 339.616 182.11)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 362.172 182.11)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 384.729 182.11)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 407.285 182.11)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 429.841 182.11)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 452.398 182.11)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 474.954 182.11)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 46.3823 159.554)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 68.9385 159.554)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 91.4951 159.554)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 114.052 159.554)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 136.608 159.554)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 159.165 159.554)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 181.721 159.554)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 204.277 159.554)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 226.834 159.554)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 249.39 159.554)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 271.946 159.554)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 294.503 159.554)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 317.06 159.554)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 339.616 159.554)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 362.172 159.554)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 384.729 159.554)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 407.285 159.554)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 429.841 159.554)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 452.398 159.554)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 474.954 159.554)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 46.3823 136.997)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 68.9385 136.997)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 91.4951 136.997)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 114.052 136.997)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 136.608 136.997)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 159.165 136.997)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 181.721 136.997)" />
                            <circle opacity="0.9" r="0.995136" transform="matrix(1 0 0 -1 204.277 136.997)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 226.834 136.997)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 249.39 136.997)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 271.946 136.997)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 294.503 136.997)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 317.06 136.997)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 339.616 136.997)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 362.172 136.997)" />
                            <circle opacity="0.9" r="0.995136" transform="matrix(1 0 0 -1 384.729 136.997)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 407.285 136.997)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 429.841 136.997)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 452.398 136.997)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 474.954 136.997)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 46.3823 114.44)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 68.9385 114.44)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 91.4951 114.44)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 114.052 114.44)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 136.608 114.44)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 159.165 114.44)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 181.721 114.44)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 204.277 114.44)" />
                            <circle opacity="0.5" r="0.995136" transform="matrix(1 0 0 -1 226.834 114.44)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 249.39 114.44)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 271.946 114.44)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 294.503 114.44)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 317.06 114.44)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 339.616 114.44)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 362.172 114.44)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 384.729 114.44)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 407.285 114.44)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 429.841 114.44)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 452.398 114.44)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 474.954 114.44)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 46.3823 91.8843)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 68.9385 91.8843)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 91.4951 91.8843)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 114.052 91.8843)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 136.608 91.8843)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 159.165 91.8843)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 181.721 91.8843)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 204.277 91.8843)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 226.834 91.8843)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 249.39 91.8843)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 271.946 91.8843)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 294.503 91.8843)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 317.06 91.8843)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 339.616 91.8843)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 362.172 91.8843)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 384.729 91.8843)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 407.285 91.8843)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 429.841 91.8843)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 452.398 91.8843)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 474.954 91.8843)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 46.3823 69.3276)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 68.9385 69.3281)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 91.4951 69.3276)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 114.052 69.3281)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 136.608 69.3276)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 159.165 69.3281)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 181.721 69.3276)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 204.277 69.3281)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 226.834 69.3281)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 249.39 69.3276)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 271.946 69.3281)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 294.503 69.3276)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 317.06 69.3281)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 339.616 69.3276)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 362.172 69.3281)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 384.729 69.3276)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 407.285 69.3281)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 429.841 69.3281)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 452.398 69.3281)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 474.954 69.3281)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 46.3823 46.7715)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 68.9385 46.7715)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 91.4951 46.7715)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 114.052 46.7715)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 136.608 46.7715)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 159.165 46.7715)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 181.721 46.7715)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 204.277 46.7715)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 226.834 46.7715)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 249.39 46.7715)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 271.946 46.7715)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 294.503 46.7715)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 317.06 46.7715)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 339.616 46.7715)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 362.172 46.7715)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 384.729 46.7715)" />
                            <rect width="1.99027" height="1.99027" transform="matrix(1 0 0 -1 406.29 47.7666)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 429.841 46.7715)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 452.398 46.7715)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 474.954 46.7715)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 46.3823 24.2148)" />
                            <circle opacity="0.7" r="0.995136" transform="matrix(1 0 0 -1 68.9385 24.2148)" />
                            <circle opacity="0.7" r="0.995136" transform="matrix(1 0 0 -1 91.4951 24.2148)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 114.052 24.2148)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 136.608 24.2148)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 159.165 24.2148)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 181.721 24.2148)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 204.277 24.2148)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 226.834 24.2148)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 249.39 24.2148)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 271.946 24.2148)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 294.503 24.2148)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 317.06 24.2148)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 339.616 24.2148)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 362.172 24.2148)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 384.729 24.2148)" />
                            <circle opacity="0.8" r="0.995136" transform="matrix(1 0 0 -1 407.285 24.2148)" />
                            <circle opacity="0.4" r="0.995136" transform="matrix(1 0 0 -1 429.841 24.2148)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 452.398 24.2148)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 474.954 24.2148)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 46.3823 1.65867)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 68.9385 1.65867)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 91.4951 1.65867)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 114.052 1.65867)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 136.608 1.65867)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 159.165 1.65867)" />
                            <circle opacity="0.7" r="0.995136" transform="matrix(1 0 0 -1 181.721 1.65867)" />
                            <circle opacity="0.7" r="0.995136" transform="matrix(1 0 0 -1 204.277 1.65867)" />
                            <circle opacity="0.2" r="0.995136" transform="matrix(1 0 0 -1 226.834 1.65867)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 249.39 1.65867)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 271.946 1.65867)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 294.503 1.65867)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 317.06 1.65867)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 339.616 1.65867)" />
                            <circle opacity="0.6" r="0.995136" transform="matrix(1 0 0 -1 362.172 1.65867)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 384.729 1.65867)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 407.285 1.65867)" />
                            <circle opacity="0.1" r="0.995136" transform="matrix(1 0 0 -1 429.841 1.65867)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 452.398 1.65867)" />
                            <circle r="0.995136" transform="matrix(1 0 0 -1 474.954 1.65867)" />
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_f_1038_34773" x="0.379997" y="112.439" width="302.479" height="384.486" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_1038_34773" />
                        </filter>
                        <filter id="filter1_f_1038_34773" x="119.03" y="71.0675" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_1038_34773" />
                        </filter>
                        <filter id="filter2_f_1038_34773" x="86.2447" y="71.0675" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_1038_34773" />
                        </filter>
                        <filter id="filter3_f_1038_34773" x="243.924" y="47.6495" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_1038_34773" />
                        </filter>
                        <filter id="filter4_f_1038_34773" x="158.84" y="96.8273" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_1038_34773" />
                        </filter>
                        <filter id="filter5_f_1038_34773" x="10.5279" y="34.38" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_1038_34773" />
                        </filter>
                        <linearGradient id="paint0_linear_1038_34773" x1="215.613" y1="0" x2="215.613" y2="341" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#0A0A0C" stopOpacity="0" />
                            <stop offset="1" stopColor="#0A0A0C" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default ETHRISEPage;
