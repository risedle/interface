import type { FunctionComponent } from "react";
import Link from "next/link";

// Import components
import Logo from "./Logo";
import ButtonThemeSwitcher from "./ButtonThemeSwitcher";
import ButtonLaunchBasic from "./ButtonLaunchBasic";

/**
 * NavigationProps is a React Component properties that passed to React Component Navigation
 */
type NavigationProps = {};

/**
 * Navigation is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Navigation: FunctionComponent<NavigationProps> = ({}) => {
    return (
        <div className="flex flex-row p-4 items-center">
            <div className="basis-1/2">
                <Link href="/">
                    <a>
                        <Logo />
                        <span className="text-base font-inter font-bold pl-2 traking-tight text-gray-light-12 dark:text-gray-light-1">
                            Risedle
                        </span>
                    </a>
                </Link>
            </div>
            <div className="basis-1/2 flex flex-row-reverse text-right">
                <div className="ml-2">
                    <ButtonLaunchBasic />
                </div>
                <div>
                    <ButtonThemeSwitcher />
                </div>
            </div>
        </div>
    );
};

export default Navigation;
