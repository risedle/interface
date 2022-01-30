import { ethers } from "ethers";
import { FunctionComponent, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { useProvider } from "wagmi";

import { dollarFormatter } from "../../../utils/formatters";
import { useLeveragedTokenNAV } from "../../../utils/onchain";
import { Timeframe, useLeveragedTokenHistoricalData } from "../../../utils/snapshot";
import { Metadata } from "../MarketMetadata";

export type LeveragedTokenChartProps = {
    chainID: number;
    address: string;
};

const LeveragedTokenChart: FunctionComponent<LeveragedTokenChartProps> = ({ chainID, address }) => {
    // Get leveaged token metadata
    const metadata = Metadata[chainID][address];

    // Fetch onchain data for latest nav
    const provider = useProvider();
    const navData = useLeveragedTokenNAV({ tokenAddress: address, provider: provider, vaultAddress: metadata.vaultAddress });

    // Fetch data
    const data = useLeveragedTokenHistoricalData(chainID, address);

    // Component states
    const [currentData, setCurrentData] = useState(data.twoWeekly);
    if (!currentData && data.twoWeekly) {
        setCurrentData(data.twoWeekly); // Set current data on load
    }
    const [nav, setNAV] = useState(0);
    const [navChange, setNAVChange] = useState(0);

    // Value based on states
    const latestNAV = parseFloat(ethers.utils.formatUnits(navData.data ? navData.data : 0, metadata.debtDecimals));
    const latestChange = currentData ? ((latestNAV - currentData.oldestNAV) / currentData.oldestNAV) * 100 : 0;

    // Set initial data for onMouseLeave event on the price chart
    if (nav === 0 && navChange === 0 && latestNAV != 0 && latestChange != 0) {
        setNAV(latestNAV);
        setNAVChange(latestChange);
    }
    const [currentTimeframe, setCurrentTimeframe] = useState(Timeframe.TwoWeekly);

    // UI states
    const showSkeleton = data.isLoading || data.error || navData.isLoading;
    const showRealData = !showSkeleton && currentData;

    // Styling for active timeframe selector
    const activeTimeframeClasses = "bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 rounded-full font-semibold text-gray-light-12 dark:text-gray-dark-12";

    return (
        <div>
            {/* Price & Change */}
            <div className="flex flex-row space-x-4 px-4">
                <div className="flex w-[52px] flex-col space-y-2">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Price</p>
                    {showSkeleton && <div className="h-4 animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></div>}
                    {showRealData && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(nav)}</p>}
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Change</p>
                    {showSkeleton && <div className="h-4 animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></div>}
                    {showRealData && (
                        <div className="flex h-[16px] flex-row items-center">
                            <svg className={navChange > 0 ? "inline-block fill-green-light-11 dark:fill-green-dark-11" : "hidden"} width="14" height="14" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" />
                            </svg>
                            <svg className={navChange > 0 ? "hidden" : "inline-block fill-red-light-11 dark:fill-red-dark-11"} width="13" height="13" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L8 11.2929L8 2.5C8 2.22386 7.77614 2 7.5 2C7.22386 2 7 2.22386 7 2.5L7 11.2929L3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536Z" />
                            </svg>
                            <p className={`font-ibm text-sm font-semibold tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 ${navChange > 0 ? "text-green-light-11 dark:text-green-dark-11" : "text-red-light-10 dark:text-red-dark-10"}`}>{navChange.toFixed(2) + "%"}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Price chart */}
            <div className="z-0 mt-8 h-[192px] w-full">
                {showSkeleton && <div className="mb-2 h-[192px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3"></div>}
                {showRealData && (
                    <ResponsiveContainer width="100%" height="100%" className="h-full">
                        <AreaChart
                            data={currentData.data}
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

                                        setNAV(selectedData.nav);
                                        const change = ((selectedData.nav - currentData.oldestNAV) / currentData.oldestNAV) * 100;
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
            <div className="mt-2 flex flex-row items-center px-4">
                <div className="basis-1/5 text-center">
                    <button
                        className={`py-[7px] px-4 text-xs leading-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Daily ? activeTimeframeClasses : ""}`}
                        onClick={() => {
                            setCurrentTimeframe(Timeframe.Daily);
                            if (data.daily) {
                                setCurrentData(data.daily);
                                setNAV(latestNAV);
                                setNAVChange(latestChange);
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
                            if (data.weekly) {
                                setCurrentData(data.weekly);
                                setNAV(latestNAV);
                                setNAVChange(latestChange);
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
                            if (data.twoWeekly) {
                                setCurrentData(data.twoWeekly);
                                setNAV(latestNAV);
                                setNAVChange(latestChange);
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
                            if (data.monthly) {
                                setCurrentData(data.monthly);
                                setNAV(latestNAV);
                                setNAVChange(latestChange);
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
                            if (data.threeMonthly) {
                                setCurrentData(data.threeMonthly);
                                setNAV(latestNAV);
                                setNAVChange(latestChange);
                            }
                        }}
                    >
                        3M
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeveragedTokenChart;
