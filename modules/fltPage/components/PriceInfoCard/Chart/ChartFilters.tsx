import { Dispatch, FunctionComponent, SetStateAction } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import TimeframeSelector from "./TimeframeSelector";
import { Timeframe } from "../../../../../components/v1/swr/snapshot";

type ChartFiltersProps = {
    active: Timeframe;
    setActive: Dispatch<SetStateAction<Timeframe>>;
};

const ChartFilters: FunctionComponent<ChartFiltersProps> = ({ active, setActive }) => {
    return (
        <div className="flex items-center justify-between px-4">
            {/* NOTE: Tabs functionality is now working yet, this is UI only */}
            <Tabs.Root defaultValue="price">
                <Tabs.List className="rounded-xl bg-gray-light-1 p-1 dark:bg-gray-dark-1">
                    <Tabs.Trigger value="price" className="rounded-lg p-2 text-xs font-bold text-gray-light-10 state-active:bg-gray-light-4 state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                        Price
                    </Tabs.Trigger>
                    <Tabs.Trigger value="vol" className="hidden rounded-lg p-2 text-xs font-bold text-gray-light-10 state-active:bg-gray-light-4 state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12 sm:inline-block">
                        Vol
                    </Tabs.Trigger>
                    <Tabs.Trigger value="fee" className="hidden rounded-lg p-2 text-xs font-bold text-gray-light-10 state-active:bg-gray-light-4 state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12 sm:inline-block">
                        Fee
                    </Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
            <TimeframeSelector active={active} setActive={setActive} />
        </div>
    );
};

export default ChartFilters;
