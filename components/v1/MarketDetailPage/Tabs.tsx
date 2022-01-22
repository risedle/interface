import Link from "next/link";
import type { FunctionComponent } from "react";

/**
 * TabsProps is a React Component properties that passed to React Component Tabs
 */
type TabsProps = {
    leveragePath: string;
    earnPath: string;
    isLeverageActive?: boolean;
    isEarnActive?: boolean;
};

/**
 * Tabs is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Tabs: FunctionComponent<TabsProps> = ({ leveragePath, earnPath, isLeverageActive, isEarnActive }) => {
    const baseClasses = "basis-1/2 text-center text-sm leading-4 py-[12px]";
    const activeClasses = "bg-gray-light-1 dark:bg-gray-dark-4 text-gray-light-12 dark:text-gray-dark-12 font-bold rounded-[8px]";
    const nonActiveClasses = "text-gray-light-10 dark:text-gray-dark-10 ";

    return (
        <div className="px-4 sm:max-w-[253px] sm:mx-auto">
            <div className="flex flex-row bg-gray-light-2 dark:bg-gray-dark-2 p-1 rounded-[12px]">
                <Link href={leveragePath}>
                    <a className={`${baseClasses} ${isLeverageActive ? activeClasses : nonActiveClasses}`}>Leverage</a>
                </Link>

                <Link href={earnPath}>
                    <a className={`${baseClasses} ${isEarnActive ? activeClasses : nonActiveClasses}`}>Earn</a>
                </Link>
            </div>
        </div>
    );
};

export default Tabs;
