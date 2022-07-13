import { FunctionComponent, useEffect, useState } from "react";
import PriceInfoCardHeader from "./PriceInfoCardHeader";
import PriceInfoCardMetric from "./PriceInfoCardMetric";
import FLTChart from "./Chart/FLTChart";
import { useLeveragedTokenNAV } from "../../../../components/v1/swr/useLeveragedTokenNAV";
import { getProvider } from "../../../../components/v1/Wallet";
import { chain } from "wagmi";
import { ethers } from "ethers";
import { LeveragedTokenTimeframeData, useLeveragedTokenHistoricalData } from "../../../../components/v1/swr/useLeveragedTokenHistoricalData";
import ChartFilters from "./Chart/ChartFilters";
import { Timeframe } from "../../../../components/v1/swr/snapshot";

type PriceInfoCardContainerProps = {};

const PriceInfoCardContainer: FunctionComponent<PriceInfoCardContainerProps> = ({}) => {
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
                if (data.daily) {
                    setSelectedData(data.daily);
                    setCurrentNav(latestNav);
                    const change = latestNav - data.daily.oldestNAV;
                    const percentChange = ((latestNav - data.daily.oldestNAV) / data.daily.oldestNAV) * 100;
                    setCurrentNavChange(change);
                    setCurrentNavPercentChange(percentChange);
                }
                break;
            case Timeframe.Weekly:
                if (data.weekly) {
                    setSelectedData(data.weekly);
                    setCurrentNav(latestNav);
                    const change = latestNav - data.weekly.oldestNAV;
                    const percentChange = ((latestNav - data.weekly.oldestNAV) / data.weekly.oldestNAV) * 100;
                    setCurrentNavChange(change);
                    setCurrentNavPercentChange(percentChange);
                }
                break;
            case Timeframe.TwoWeekly:
                if (data.twoWeekly) {
                    setSelectedData(data.twoWeekly);
                    setCurrentNav(latestNav);
                    const change = latestNav - data.twoWeekly.oldestNAV;
                    const percentChange = ((latestNav - data.twoWeekly.oldestNAV) / data.twoWeekly.oldestNAV) * 100;
                    setCurrentNavChange(change);
                    setCurrentNavPercentChange(percentChange);
                }
                break;
            case Timeframe.ThreeWeekly:
                if (data.threeWeekly) {
                    setSelectedData(data.threeWeekly);
                    setCurrentNav(latestNav);
                    const change = latestNav - data.threeWeekly.oldestNAV;
                    const percentChange = ((latestNav - data.threeWeekly.oldestNAV) / data.threeWeekly.oldestNAV) * 100;
                    setCurrentNavChange(change);
                    setCurrentNavPercentChange(percentChange);
                }
                break;
            case Timeframe.Monthly:
                if (data.monthly) {
                    setSelectedData(data.monthly);
                    setCurrentNav(latestNav);
                    const change = latestNav - data.monthly.oldestNAV;
                    const percentChange = ((latestNav - data.monthly.oldestNAV) / data.monthly.oldestNAV) * 100;
                    setCurrentNavChange(change);
                    setCurrentNavPercentChange(percentChange);
                }
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

export default PriceInfoCardContainer;
