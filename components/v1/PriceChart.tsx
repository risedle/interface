import { FunctionComponent, useState } from "react";
import { useWalletContext } from "./Wallet";
import { AreaChart, Area, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { useLeveragedTokenData3Months } from "../../utils/snapshot";

/**
 * PriceChartProps is a React Component properties that passed to React Component PriceChart
 */
type PriceChartProps = {
    leveragedTokenAddress: string;
    initialNAV?: number;
    initialLastNAV?: number;
    setNAV?: (nav: number) => void;
    setLastNAV?: (nav: number) => void;
};

// Chart timeframes
enum Timeframe {
    Daily,
    Weekly,
    TwoWeekly,
    Monthly,
    ThreeMonthly,
}

/**
 * PriceChart is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const PriceChart: FunctionComponent<PriceChartProps> = ({ leveragedTokenAddress, setNAV, setLastNAV, initialNAV, initialLastNAV }) => {
    const { chain } = useWalletContext();
    const { data, isLoading } = useLeveragedTokenData3Months(chain.id, leveragedTokenAddress);
    const [currentTimeframe, setCurrentTimeframe] = useState(Timeframe.TwoWeekly);
    const [currentData, setCurrentData] = useState(data);
    const activeTimeframeClasses = "bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 rounded-full font-semibold text-gray-light-12 dark:text-gray-dark-12";

    // Set current data on the first load
    if (!currentData && data) {
        setCurrentData(data);
    }

    return (
        <div className="">
            {!isLoading && data && (
                <div className="w-full h-[192px] inline-block">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={currentData}
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                            onMouseLeave={() => {
                                if (setNAV && initialNAV) {
                                    setNAV(initialNAV);
                                }
                                if (setLastNAV && initialLastNAV) {
                                    setLastNAV(initialLastNAV);
                                }
                            }}
                        >
                            <defs>
                                <linearGradient id="priceColor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(37, 208, 171)" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="rgba(37, 208, 171)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                position={{ y: 0 }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const timestamp = payload[0].payload.timestamp;
                                        const date = new Date(timestamp);
                                        const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "numeric", year: "numeric", minute: "numeric" }).format(date);
                                        // trigger on component mount
                                        if (setNAV) {
                                            setNAV(payload[0].payload.nav);
                                        }
                                        if (setLastNAV) {
                                            let cd, lastData;
                                            switch (currentTimeframe) {
                                                case Timeframe.Daily:
                                                    cd = data.slice(data.length - 24, data.length);
                                                    lastData = cd[0];
                                                    setLastNAV(lastData.nav);
                                                    break;
                                                case Timeframe.Weekly:
                                                    cd = data.slice(data.length - 24 * 7, data.length);
                                                    lastData = cd[0];
                                                    setLastNAV(lastData.nav);
                                                    break;
                                                case Timeframe.TwoWeekly:
                                                    cd = data.slice(data.length - 24 * 7 * 2, data.length);
                                                    lastData = cd[0];
                                                    setLastNAV(lastData.nav);
                                                    break;
                                                case Timeframe.Monthly:
                                                    cd = data.slice(data.length - 24 * 7 * 2 * 4, data.length);
                                                    lastData = cd[0];
                                                    setLastNAV(lastData.nav);
                                                    break;
                                                case Timeframe.ThreeMonthly:
                                                    cd = data;
                                                    lastData = cd[0];
                                                    setLastNAV(lastData.nav);
                                                    break;
                                            }
                                        }
                                        return <div className="text-xs text-gray-light-10 dark:text-gray-dark-10">{formattedDate}</div>;
                                    }
                                    return null;
                                }}
                            />
                            <YAxis hide={true} type="number" domain={["dataMin - 5", "dataMax + 5"]} />
                            <Area type="monotoneX" dataKey="nav" stroke="#4CC38A" fill="url(#priceColor)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/5 text-center">
                            <button
                                className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Daily ? activeTimeframeClasses : ""}`}
                                onClick={() => {
                                    setCurrentTimeframe(Timeframe.Daily);
                                    setCurrentData(data.slice(data.length - 24, data.length));
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
                                    setCurrentData(data.slice(data.length - 24 * 7, data.length));
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
                                    setCurrentData(data.slice(data.length - 24 * 7 * 2, data.length));
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
                                    setCurrentData(data.slice(data.length - 24 * 7 * 2 * 4, data.length));
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
                                    setCurrentData(data);
                                }}
                            >
                                3M
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceChart;
