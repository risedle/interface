import Link from "next/link";
import type { FunctionComponent } from "react";
import ButtonConnectWalletDesktop from "./Buttons/ConnectWalletDesktop";
import ButtonNetworkSwitcher from "./Buttons/NetworkSwitcher";
import ButtonThemeSwitcher from "./Buttons/ThemeSwitcher";
import Logo from "./Logo";

/**
 * NavigationProps is a React Component properties that passed to React Component Navigation
 */
type NavigationProps = {
    marketsActive?: boolean,
    portofolioActive?: boolean
};

/**
 * Navigation is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Navigation: FunctionComponent<NavigationProps> = ({marketsActive, portofolioActive}) => {
    return (
        <div className="container z-10 mx-auto max-w-full sm:z-20">
            <div className="grid grid-cols-3 place-items-center content-center p-4">
                <div className="justify-self-start">
                    <Link href="/">
                        <a className="flex items-center">
                            <Logo />
                            <span className="traking-tight leading-0 hidden self-center pl-2 font-inter text-base font-bold text-gray-light-12 dark:text-gray-light-1 sm:block">Risedle</span>
                        </a>
                    </Link>
                </div>
                <div className="space-x-4">
                    <Link href="/markets">
                        <a className={marketsActive ? "text-sm text-gray-light-12 dark:text-gray-dark-12" : "text-sm text-gray-light-10 dark:text-gray-dark-10"}>
                            Markets
                        </a>
                    </Link>
                    <Link href="/portofolio">
                        <a className={portofolioActive ? "text-sm text-gray-light-12 dark:text-gray-dark-12" : "text-sm text-gray-light-10 dark:text-gray-dark-10"}>
                            Portofolio
                        </a>
                    </Link>
                </div>
                <div className="inline-block flex flex-row space-x-2 justify-self-end">
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
