import { ethers } from "ethers";
import { FunctionComponent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

import { dollarFormatter, tokenBalanceFormatter } from "../../../utils/formatters";
import { Metadata } from "../MarketMetadata";
import { useLeveragedTokenNAV } from "../swr/useLeveragedTokenNAV";
import ToastError from "../Toasts/Error";
import { DEFAULT_CHAIN, useWalletContext } from "../Wallet";
import { useTransferEvents } from "../swr/useTransferEvents";
import { useTokenBalance } from "../swr/useTokenBalance";
import { chain as Chains } from "wagmi";
import { useLeveragedTokenDailyData } from "../swr/useLeveragedTokenDailyData";
import { Timeframe } from "../swr/snapshot";
import Link from "next/link";
import { NoPortfolioWarn } from "./NoPortfolioWarn";

export type PortofolioChartProps = {
    address: string; // Leveraged token address
    isHavePortofolio?: boolean;
};

// ETHRISE Token ids
const ETHRISEAddresses = {
    [Chains.kovan.id]: "0xc4676f88663360155c2bc6d2A482E34121a50b3b",
    [Chains.arbitrumOne.id]: "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452",
};

const PortofolioChart: FunctionComponent<PortofolioChartProps> = ({ address, isHavePortofolio }) => {
    // Global states
    const { chain, provider, account } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const ethriseAddress = ETHRISEAddresses[chainID];

    // Get leveaged token metadata
    const metadata = Metadata[chainID][address];

    // Read onchain data
    const navResponse = useLeveragedTokenNAV({ token: address, vault: metadata.vaultAddress, provider: provider });

    // Read offchain data
    const dailyData = useLeveragedTokenDailyData(chainID, address);

    // Get ETHRISE transfer Events
    const ethriseEvents = useTransferEvents({ account: account, contract: ethriseAddress, provider: provider });

    // Get User's Latest ETHRISE Balance
    const ethriseBalance = useTokenBalance({ account: account, token: ethriseAddress, provider: provider });
    const formattedEthriseBalance = tokenBalanceFormatter.format(parseFloat(ethers.utils.formatUnits(ethriseBalance.data ? ethriseBalance.data : 0)));

    // Local states
    const [currentChainID, setCurrentChainID] = useState(chainID);
    const [currentData, setCurrentData] = useState(dailyData.twoWeekly);
    const [nav, setNAV] = useState(0);
    const [navChange, setNAVChange] = useState(0);
    const [currentTimeframe, setCurrentTimeframe] = useState(Timeframe.TwoWeekly);

    // Parse data
    const latestNAV = parseFloat(ethers.utils.formatUnits(navResponse.data ? navResponse.data : 0, metadata.debtDecimals)) * formattedEthriseBalance;
    const latestChange = currentData && formattedEthriseBalance !== 0 ? ((latestNAV - currentData.oldestNAV * formattedEthriseBalance) / (currentData.oldestNAV * formattedEthriseBalance)) * 100 : 0;

    // Compare event data & daily data
    const portofolioData = currentData?.data.map((data) => {
        let portofolioBalance = 0;

        ethriseEvents.data?.forEach((event) => {
            if (event.blockNumber <= data.block_number) {
                if (event.args!.to === account) {
                    portofolioBalance += parseFloat(ethers.utils.formatUnits(event.args!.value ? event.args!.value : 0));
                } else if (event.args!.from === account) {
                    portofolioBalance -= parseFloat(ethers.utils.formatUnits(event.args!.value ? event.args!.value : 0));
                }
            }
        });

        return {
            nav: portofolioBalance * data.nav,
            timestamp: data.timestamp,
        };
    });

    // Make sure the state is correct
    if (!currentData && dailyData.twoWeekly) {
        setCurrentData(dailyData.twoWeekly); // Set current data on load
    }
    if (nav === 0 && navChange === 0 && latestNAV != 0 && latestChange != 0) {
        setNAV(latestNAV);
        setNAVChange(latestChange);
    }
    // Resert everything when the chain is change
    if (chainID != currentChainID) {
        setNAV(latestNAV);
        setNAVChange(latestChange);
        setCurrentData(dailyData.twoWeekly);
        setCurrentChainID(chainID);
    }

    // UI states
    const showChartSkeleton = dailyData.isLoading || dailyData.error;
    const showNAVSkeleton = navResponse.isLoading || navResponse.error;
    const showRealChartData = !showChartSkeleton && currentData;
    const showRealNavData = !showNAVSkeleton;

    // Toast error if chart or nav data is error
    useEffect(() => {
        if (dailyData.error || navResponse.error) {
            toast.custom((t) => <ToastError>Failed to load data, please try to refresh</ToastError>);
        }
    }, [dailyData.error, navResponse.error]);

    // Styling for active timeframe selector
    const activeTimeframeClasses = "bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 rounded-full font-semibold text-gray-light-12 dark:text-gray-dark-12";

    return (
        <div className="relative">
            {/* Price & Change */}
            {!isHavePortofolio && <NoPortfolioWarn type="chart" />}

            <div className="flex flex-row space-x-4 px-4">
                <div className="flex flex-col space-y-2">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Total Value</p>
                    {showNAVSkeleton && <div className="h-4 animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></div>}
                    {showRealNavData && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{nav ? dollarFormatter.format(nav) : "---"}</p>}
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Changes</p>
                    {showNAVSkeleton && <div className="h-4 animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></div>}
                    {showRealNavData && (
                        <div className="flex h-[16px] flex-row items-center">
                            {isHavePortofolio && (
                                <>
                                    <svg className={isHavePortofolio ? "inline-block fill-green-light-11 dark:fill-green-dark-11" : "hidden"} width="14" height="14" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" />
                                    </svg>
                                    <svg className={isHavePortofolio ? "hidden" : "inline-block fill-red-light-11 dark:fill-red-dark-11"} width="13" height="13" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L8 11.2929L8 2.5C8 2.22386 7.77614 2 7.5 2C7.22386 2 7 2.22386 7 2.5L7 11.2929L3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536Z" />
                                    </svg>
                                </>
                            )}

                            <p className={`font-ibm text-sm font-semibold tracking-[-0.02em] ${navChange === 0 ? "text-gray-light-12 dark:text-gray-dark-12" : navChange > 0 ? "text-green-light-11 dark:text-green-dark-11" : "text-red-light-10 dark:text-red-dark-10"}`}>{navChange ? navChange.toFixed(2) + "%" : "---"}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Price chart */}
            <div className="z-0 mt-8 h-[192px] w-full ">
                {showChartSkeleton && <div className="mb-2 h-[192px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3"></div>}

                {showRealChartData && (
                    <ResponsiveContainer width="100%" height="100%" className={`h-full ${navChange === 0 ? "opacity-25" : ""}`}>
                        <AreaChart
                            data={portofolioData}
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                            onMouseLeave={() => {
                                setNAV(latestNAV);
                                setNAVChange(latestChange);
                            }}
                        >
                            <defs>
                                <linearGradient id="upGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(37, 208, 171)" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="rgba(37, 208, 171)" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="downGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgb(205, 43, 49)" stopOpacity={0.25} />
                                    <stop offset="100%" stopColor="rgb(205, 43, 49)" stopOpacity={0.25} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                position={{ y: 0 }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const selectedData = payload[0].payload;
                                        const timestamp = selectedData.timestamp;
                                        const date = new Date(timestamp);
                                        const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "short", year: "numeric", minute: "numeric" }).format(date);

                                        setNAV(selectedData.nav);
                                        const change = formattedEthriseBalance === 0 ? 0 : ((selectedData.nav - currentData.oldestNAV * formattedEthriseBalance) / (currentData.oldestNAV * formattedEthriseBalance)) * 100;
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

            {!isHavePortofolio ? (
                <Link href={"/markets"} passHref>
                    <button className="inline-block flex w-full flex-row items-center justify-center space-x-2 rounded-full border border-blue-light-11 bg-blue-light-10 py-[11px] px-4 text-center text-sm font-semibold leading-4 leading-4 tracking-[-0.02em] text-gray-light-1 dark:border-blue-dark-11 dark:bg-blue-dark-10 dark:text-blue-light-1">Open Market</button>
                </Link>
            ) : (
                <div className="mt-2 flex flex-row items-center px-4">
                    <div className="basis-1/5 text-center">
                        <button
                            className={`py-[7px] px-4 text-xs leading-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Daily ? activeTimeframeClasses : ""}`}
                            onClick={() => {
                                setCurrentTimeframe(Timeframe.Daily);
                                if (dailyData.daily) {
                                    setCurrentData(dailyData.daily);
                                    setNAV(latestNAV);
                                    setNAVChange(((latestNAV - dailyData.daily.oldestNAV * formattedEthriseBalance) / (dailyData.daily.oldestNAV * formattedEthriseBalance)) * 100);
                                }
                            }}
                        >
                            1D
                        </button>
                    </div>
                    <div className="basis-1/5 text-center">
                        <button
                            className={`py-[7px] px-4 text-xs leading-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Weekly ? activeTimeframeClasses : ""}`}
                            onClick={() => {
                                setCurrentTimeframe(Timeframe.Weekly);
                                if (dailyData.weekly) {
                                    setCurrentData(dailyData.weekly);
                                    setNAV(latestNAV);
                                    setNAVChange(((latestNAV - dailyData.weekly.oldestNAV * formattedEthriseBalance) / (dailyData.weekly.oldestNAV * formattedEthriseBalance)) * 100);
                                }
                            }}
                        >
                            1W
                        </button>
                    </div>
                    <div className="basis-1/5 text-center">
                        <button
                            className={`py-[7px] px-4 text-xs leading-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.TwoWeekly ? activeTimeframeClasses : ""}`}
                            onClick={() => {
                                setCurrentTimeframe(Timeframe.TwoWeekly);
                                if (dailyData.twoWeekly) {
                                    setCurrentData(dailyData.twoWeekly);
                                    setNAV(latestNAV);
                                    setNAVChange(((latestNAV - dailyData.twoWeekly.oldestNAV * formattedEthriseBalance) / (dailyData.twoWeekly.oldestNAV * formattedEthriseBalance)) * 100);
                                }
                            }}
                        >
                            2W
                        </button>
                    </div>
                    <div className="basis-1/5 text-center">
                        <button
                            className={`py-[7px] px-4 text-xs leading-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Monthly ? activeTimeframeClasses : ""}`}
                            onClick={() => {
                                setCurrentTimeframe(Timeframe.Monthly);
                                if (dailyData.monthly) {
                                    setCurrentData(dailyData.monthly);
                                    setNAV(latestNAV);
                                    setNAVChange(((latestNAV - dailyData.monthly.oldestNAV * formattedEthriseBalance) / (dailyData.monthly.oldestNAV * formattedEthriseBalance)) * 100);
                                }
                            }}
                        >
                            1M
                        </button>
                    </div>
                    <div className="basis-1/5 text-center">
                        <button
                            className={`py-[7px] px-4 text-xs leading-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.ThreeMonthly ? activeTimeframeClasses : ""}`}
                            onClick={() => {
                                setCurrentTimeframe(Timeframe.ThreeMonthly);
                                if (dailyData.threeMonthly) {
                                    setCurrentData(dailyData.threeMonthly);
                                    setNAV(latestNAV);
                                    setNAVChange(((latestNAV - dailyData.threeMonthly.oldestNAV * formattedEthriseBalance) / (dailyData.threeMonthly.oldestNAV * formattedEthriseBalance)) * 100);
                                }
                            }}
                        >
                            3M
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortofolioChart;
