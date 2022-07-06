import { FunctionComponent } from "react";

type IndicatorProps = {
    color: "red" | "blue";
};

/**
 * React Component to render OpenGraph website
 */
const Indicator: FunctionComponent<IndicatorProps> = ({ color }) => {
    const colorClass = {
        red: "bg-red-light-10 dark:bg-red-dark-10 shadow-red-light-10 dark:shadow-red-dark-10",
        blue: "bg-sky-light-10 dark:bg-sky-dark-10 shadow-sky-light-10 dark:shadow-sky-dark-10",
    };
    return <span className={`mr-2 inline-block h-2 w-2 rounded-full shadow-[0px_0px_12px] ${colorClass[color]}`}></span>;
};

export default Indicator;
