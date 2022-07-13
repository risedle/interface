import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { LeveragedTokenTimeframeData } from "../../../../../components/v1/swr/useLeveragedTokenHistoricalData";

type FLTChartProps = {
    data: LeveragedTokenTimeframeData | undefined;
    setCurrentNav: Dispatch<SetStateAction<number>>;
    setCurrentNavChange: Dispatch<SetStateAction<number>>;
    setCurrentNavPercentChange: Dispatch<SetStateAction<number>>;
    currentNavPercentChange: number;
    setCurrentDate: Dispatch<SetStateAction<string>>;
    resetCurrentNav: () => void;
};

const FLTChart: FunctionComponent<FLTChartProps> = ({ data, setCurrentNav, setCurrentNavChange, setCurrentNavPercentChange, setCurrentDate, resetCurrentNav, currentNavPercentChange }) => {
    return (
        <div className="h-48">
            {data && (
                <ResponsiveContainer width="100%" height="100%" className="h-full">
                    <AreaChart
                        data={data.data}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        onMouseLeave={() => {
                            resetCurrentNav();
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
                                    const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "short", year: "numeric", minute: "numeric" }).format(date);

                                    setCurrentNav(selectedData.nav);
                                    const change = selectedData.nav - data.oldestNAV;
                                    setCurrentNavChange(change);
                                    const percentChange = ((selectedData.nav - data.oldestNAV) / data.oldestNAV) * 100;
                                    setCurrentNavPercentChange(percentChange);
                                    setCurrentDate(formattedDate);
                                }
                                return null;
                            }}
                        />
                        <YAxis hide={true} type="number" domain={["dataMin - 5", "dataMax + 5"]} />
                        <Area type="monotoneX" dataKey="nav" stroke={currentNavPercentChange > 0 ? "#4CC38A" : "#CD2B31"} fill={currentNavPercentChange > 0 ? "url(#upGradient)" : "url(#downGradient)"} strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default FLTChart;
