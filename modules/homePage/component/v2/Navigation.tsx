import type { FunctionComponent } from "react";
import ButtonSecondary from "../../../../uikit/buttonV2/ButtonSecondary";
import LogoV2 from "../../../../uikit/layout/LogoV2";
import Command from "../../../../public/assets/icon/homepage/command.svg";
import Slash from "../../../../public/assets/icon/homepage/slash.svg";
import Search from "../../../../public/assets/icon/homepage/search.svg";

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
        <div className="fixed inset-x-0 z-40 bg-dark-background-default/90 py-4">
            <div className="mx-auto flex max-w-[343px] flex-row items-center justify-between sm:max-w-[552px] lg:max-w-[936px] xl:max-w-[1128px]">
                {/* Left Side */}
                <div className="flex flex-row gap-11">
                    <LogoV2 />
                    <a className="paragraph-s hidden text-dark-neutral-medium lg:inline-block">Docs</a>
                    <a className="paragraph-s hidden text-dark-neutral-medium lg:inline-block">Community</a>
                </div>

                {/* Right Side */}
                <div className="flex flex-row items-start gap-2">
                    {/* Search Bar */}
                    {/* <div className="flex flex-row items-center gap-[90px] rounded-full bg-light-neutral-subtle/10 p-2 pl-4">
                        <div className="flex flex-row items-center gap-2">
                            <img src={Search} alt="search_logo" />
                            <input type="text" placeholder="Search token name or symbol..." className="paragraph-s bg-transparent text-dark-neutral-primary outline-none" />
                        </div>
                        <div className="flex flex-row items-start gap-1">
                            <div className="flex h-6 w-6 items-center justify-center gap-2.5 rounded-lg bg-dark-background-elevated p-2">
                                <img src={Command} alt="command_logo" />
                            </div>
                            <div className="flex h-6 w-6 items-center justify-center gap-2.5 rounded-lg bg-dark-background-elevated p-2">
                                <img src={Slash} alt="slash_logo" />
                            </div>
                        </div>
                    </div> */}
                    {/* Button for desktop */}
                    <ButtonSecondary type="default" size="md" className="hidden lg:flex">
                        Launch Risedle
                    </ButtonSecondary>

                    {/* Button for mobile */}
                    <ButtonSecondary type="default" size="md" className="lg:hidden">
                        Launch
                    </ButtonSecondary>
                    <ButtonSecondary type="fab" size="md" className="lg:hidden">
                        <img src="/assets/icon/homepage/hamburger.svg" alt="" />
                    </ButtonSecondary>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
