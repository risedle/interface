import Link from "next/link";
import type { FunctionComponent } from "react";

import Logo from "../Logo";
import ButtonConnectWalletDesktop from "../Buttons/ConnectWalletDesktop";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";
import ButtonNetworkSwitcher from "../Buttons/NetworkSwitcher";
import ButtonThemeSwitcher from "../Buttons/ThemeSwitcher";

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
        <>
            <div className="flex flex-row p-4 items-center justify-between">
                <div className="flex-none">
                    <Link href="/">
                        <a className="flex items-center">
                            <Logo />
                            <span className="text-base font-inter font-bold pl-2 traking-tight text-gray-light-12 dark:text-gray-light-1 self-center leading-0">Risedle</span>
                        </a>
                    </Link>
                </div>
                <div className="flex-none flex flex-row space-x-2 inline-block">
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

            <div className="sm:hidden">
                <ButtonConnectWalletMobile />
            </div>
        </>
    );
};

export default Navigation;
