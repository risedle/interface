import { FunctionComponent, useEffect, useState } from "react";
import PriceInfoCardHeader from "./PriceInfoCard/PriceInfoCardHeader";
import PriceInfoCardMetric from "./PriceInfoCard/PriceInfoCardMetric";
import FLTChart from "./PriceInfoCard/Chart/FLTChart";
import { useLeveragedTokenNAV } from "../../../components/v1/swr/useLeveragedTokenNAV";
import { getProvider } from "../../../components/v1/Wallet";
import { chain } from "wagmi";
import { ethers } from "ethers";
import { LeveragedTokenTimeframeData, useLeveragedTokenHistoricalData } from "../../../components/v1/swr/useLeveragedTokenHistoricalData";
import ChartFilters from "./PriceInfoCard/Chart/ChartFilters";
import { Timeframe } from "../../../components/v1/swr/snapshot";

type LeveragedTokenChartProps = {};

const LeveragedTokenChart: FunctionComponent<LeveragedTokenChartProps> = ({}) => {
    const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>(Timeframe.TwoWeekly);

    // Get data
    const data = useLeveragedTokenHistoricalData(chain.arbitrumOne.id, "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452");

    // Set selected data state
    const [selectedData, setSelectedData] = useState<LeveragedTokenTimeframeData>();

    // Set default initial data
    if (!selectedData && data.twoWeekly) {
        setSelectedData(data.twoWeekly);
    }

    // Read onchain data (temporary until real data is provided)
    const navResponse = useLeveragedTokenNAV({ token: "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452", vault: "0xf7EDB240DbF7BBED7D321776AFe87D1FBcFD0A94", provider: getProvider({ chainId: chain.arbitrumOne.id }) });
    const latestNav = parseFloat(ethers.utils.formatUnits(navResponse.data ? navResponse.data : 0, 6));
    const latestNavChange = selectedData ? latestNav - selectedData.oldestNAV : 0;
    const latestPercentChange = selectedData ? ((latestNav - selectedData.oldestNAV) / selectedData.oldestNAV) * 100 : 0;

    // Set tooltip selected metric data
    const [currentNav, setCurrentNav] = useState(0);
    const [currentNavChange, setCurrentNavChange] = useState(0);
    const [currentNavPercentChange, setCurrentNavPercentChange] = useState(0);
    const [currentDate, setCurrentDate] = useState("");

    // Set default initial nav data
    if (currentNav === 0 && currentNavChange === 0 && latestNav != 0 && latestNavChange != 0 && latestPercentChange != 0) {
        setCurrentNav(latestNav);
        setCurrentNavChange(latestNavChange);
        setCurrentNavPercentChange(latestPercentChange);
    }

    const resetCurrentNav = () => {
        setCurrentNav(latestNav);
        setCurrentNavChange(latestNavChange);
        setCurrentNavPercentChange(latestPercentChange);
        setCurrentDate("");
    };

    // Listen to timeframe change (this is temporary & subject to changes until real data is ready)
    useEffect(() => {
        switch (activeTimeframe) {
            case Timeframe.Daily:
                data.daily ? setSelectedData(data.daily) : null;
                break;
            case Timeframe.Weekly:
                data.weekly ? setSelectedData(data.weekly) : null;
                break;
            case Timeframe.TwoWeekly:
                data.twoWeekly ? setSelectedData(data.twoWeekly) : null;
                break;
            case Timeframe.ThreeWeekly:
                data.threeWeekly ? setSelectedData(data.threeWeekly) : null;
                break;
            case Timeframe.Monthly:
                data.monthly ? setSelectedData(data.monthly) : null;
                break;
        }
    }, [activeTimeframe]);

    return (
        <div className="max-w-[540px] rounded-2xl bg-gray-light-2 py-4 dark:bg-gray-dark-2">
            {/* Content */}
            <div className="space-y-8">
                {/* Metadata */}
                <div className="space-y-4">
                    {/* Props here will be dynamic later */}
                    <PriceInfoCardHeader subtitle="2x Long ETH" title="ETHRISE" chainName="arbitrum" />
                    <PriceInfoCardMetric price={currentNav} priceChange={currentNavChange} priceChangePercentage={currentNavPercentChange} />
                    <span className="px-4 text-xs text-gray-light-10 dark:text-gray-dark-10">{currentDate}</span>
                </div>
                {/* Chart */}
                <div className="flex flex-col gap-2">
                    <FLTChart data={selectedData} setCurrentNav={setCurrentNav} setCurrentNavChange={setCurrentNavChange} setCurrentNavPercentChange={setCurrentNavPercentChange} setCurrentDate={setCurrentDate} resetCurrentNav={resetCurrentNav} currentNavPercentChange={currentNavPercentChange} />
                    <ChartFilters active={activeTimeframe} setActive={setActiveTimeframe} />
                </div>
            </div>
        </div>
    );
};

export default LeveragedTokenChart;
