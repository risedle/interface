import Link from "next/link";
import type { FunctionComponent } from "react";
import ButtonConnectWalletDesktop from "./Buttons/ConnectWalletDesktop";
import ButtonNetworkSwitcher from "./Buttons/NetworkSwitcher";
import ButtonThemeSwitcher from "./Buttons/ThemeSwitcher";
import Logo from "../../uikit/layout/Logo";

/**
 * NavigationProps is a React Component properties that passed to React Component Navigation
 */
type NavigationProps = {
    marketsActive?: boolean;
    portfolioActive?: boolean;
};

/**
 * Navigation is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Navigation: FunctionComponent<NavigationProps> = ({ marketsActive, portfolioActive }) => {
    return (
        <div className="container z-10 mx-auto max-w-full sm:z-20">
            <div className="flex flex-row items-center p-4 sm:space-x-12">
                <div className="w-1/5 sm:w-fit">
                    <Link href="/">
                        <a className="flex items-center">
                            <Logo />
                            <span className="traking-tight leading-0 hidden self-center pl-2 font-inter text-base font-bold text-gray-light-12 dark:text-gray-light-1 sm:block">Risedle</span>
                        </a>
                    </Link>
                </div>
                <div className="w-3/5 flex-grow justify-center space-x-4 text-center sm:w-fit sm:space-x-8 sm:text-left">
                    <Link href="/markets">
                        <a className={marketsActive ? "text-sm text-gray-light-12 dark:text-gray-dark-12" : "text-sm text-gray-light-10 dark:text-gray-dark-10"}>Markets</a>
                    </Link>
                    <Link href="/portfolio">
                        <a className={portfolioActive ? "text-sm text-gray-light-12 dark:text-gray-dark-12" : "text-sm text-gray-light-10 dark:text-gray-dark-10"}>Portfolio</a>
                    </Link>
                </div>
                <div className="inline-block flex w-1/5 flex-row justify-end space-x-2 sm:w-fit">
                    <div className="hidden sm:inline-block">
                        <ButtonNetworkSwitcher />
                    </div>

                    <div className="hidden sm:inline-block">
                        <ButtonConnectWalletDesktop />
                    </div>

                    <div className="inline-block h-[40px]">
                        <ButtonThemeSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
