import type { FunctionComponent } from "react";
import Link from "next/link";

// Import components
import Logo from "../Logo";
import ButtonThemeSwitcherText from "../Buttons/ThemeSwitcherText";

/**
 * FooterProps is a React Component properties that passed to React Component Footer
 */
type FooterProps = {};

/**
 * Footer is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Footer: FunctionComponent<FooterProps> = ({}) => {
    return (
        <div className="flex flex-col sm:flex-row w-full border-t border-gray-light-3 dark:border-gray-dark-3 pb-8">
            <div className="px-4 mt-6 sm:my-6 flex-none sm:self-center">
                <Link href="/">
                    <a>
                        <Logo />
                        <span className="text-base font-inter font-bold pl-2 traking-tight text-gray-light-12 dark:text-gray-light-1">
                            Risedle
                        </span>
                    </a>
                </Link>
            </div>
            <div className="px-4 grow flex flex-col sm:flex-row mt-8 sm:my-6 gap-y-4 sm:gap-x-4 sm:justify-end">
                <Link href="https://twitter.com/risedle">
                    <a className="text-sm text-gray-light-12 dark:text-gray-dark-12 sm:self-center">
                        Twitter &#8599;
                    </a>
                </Link>
                <Link href="https://discord.com/invite/YCSCd97SXj">
                    <a className="text-sm text-gray-light-12 dark:text-gray-dark-12 sm:self-center">
                        Discord &#8599;
                    </a>
                </Link>
                <Link href="https://github.com/risedle">
                    <a className="text-sm text-gray-light-12 dark:text-gray-dark-12 sm:self-center">
                        Github &#8599;
                    </a>
                </Link>
                <div className="sm:self-center">
                    <ButtonThemeSwitcherText />
                </div>
            </div>
        </div>
    );
};

export default Footer;
