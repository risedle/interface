import { Dispatch, FunctionComponent, ReactNode, SetStateAction } from "react";
import { Timeframe } from "../../../../../components/v1/swr/snapshot";

type TimeframeSelectorProps = {
    active: Timeframe;
    setActive: Dispatch<SetStateAction<Timeframe>>;
};

const TimeframeSelector: FunctionComponent<TimeframeSelectorProps> = ({ active, setActive }) => {
    const TimeChip = ({ range, children }: { range: Timeframe; children: ReactNode }) => {
        return (
            <button
                onClick={() => {
                    setActive(range);
                }}
                className={`h-8 rounded-full px-2.5 text-xs font-semibold sm:px-4 ${active === range ? "border border-gray-light-4 text-gray-light-12 dark:border-gray-dark-4 dark:text-gray-dark-12" : "text-gray-light-11 dark:text-gray-dark-11"}`}
            >
                {children}
            </button>
        );
    };
    return (
        <div className="flex flex-row gap-2">
            <TimeChip range={Timeframe.Daily}>1D</TimeChip>
            <TimeChip range={Timeframe.Weekly}>1W</TimeChip>
            <TimeChip range={Timeframe.TwoWeekly}>2W</TimeChip>
            <TimeChip range={Timeframe.ThreeWeekly}>3W</TimeChip>
            <TimeChip range={Timeframe.Monthly}>4W</TimeChip>
        </div>
    );
};

export default TimeframeSelector;
