import type { FunctionComponent } from "react";
import Link from "next/link";

// Import components
import Logo from "../Logo";
import ButtonThemeSwitcher from "../Buttons/ThemeSwitcher";
import ButtonConnectWalletGradient from "../Buttons/ConnectWalletGradient";
import ButtonNetworkSwitcher from "../Buttons/NetworkSwitcher";
import RisedleLinks from "../../../utils/links";

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
        <div className="flex flex-row p-4 items-center justify-between">
            <div className="flex-none w-[40px]">
                <Link href="/">
                    <a>
                        <Logo />
                    </a>
                </Link>
            </div>
            <div className="flex flex-row space-x-4">
                <Link href={RisedleLinks.docs}>
                    <a
                        target="_blank"
                        className="text-sm text-gray-light-12 dark:text-gray-dark-12 sm:self-center"
                    >
                        Docs &#8599;
                    </a>
                </Link>
                <Link href={RisedleLinks.discord}>
                    <a
                        target="_blank"
                        className="text-sm text-gray-light-12 dark:text-gray-dark-12 sm:self-center"
                    >
                        Discord &#8599;
                    </a>
                </Link>
            </div>
            <div className="flex-none flex flex-row space-x-2 inline-block">
                <div className="hidden sm:inline-block">
                    <ButtonNetworkSwitcher />
                </div>
                <div className="hidden sm:inline-block">
                    <ButtonConnectWalletGradient />
                </div>
                <div className="inline-block h-[40px]">
                    <ButtonThemeSwitcher />
                </div>
            </div>
        </div>
    );
};

export default Navigation;
