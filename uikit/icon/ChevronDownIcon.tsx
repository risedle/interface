import { FunctionComponent } from "react";

type ChevronDownIconProps = {};

/**
 * React Component to render OpenGraph website
 */
const ChevronDownIcon: FunctionComponent<ChevronDownIconProps> = ({}) => {
    return (
        <svg className="stroke-gray-light-12 dark:stroke-gray-dark-12" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
};

export default ChevronDownIcon;
