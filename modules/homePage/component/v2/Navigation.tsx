import type { FunctionComponent } from "react";
import ButtonSecondary from "../../../../uikit/buttonV2/ButtonSecondary";
import LogoV2 from "../../../../uikit/layout/LogoV2";
import Command from "../../../../public/assets/icon/homepage/command.svg";
import Slash from "../../../../public/assets/icon/homepage/slash.svg";
import Search from "../../../../public/assets/icon/homepage/search.svg";
import Image from "next/image";

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
        <div className="flex-column fixed inset-x-0 z-40 flex w-full items-center gap-11 bg-dark-background-default/90 py-4 px-4 sm:px-11 xl:px-[76px] 2xl:px-48">
            <LogoV2 />
            <a className="paragraph-s text-dark-neutral-medium">Docs</a>
            <a className="paragraph-s text-dark-neutral-medium">Community</a>

            {/* Gap Filler */}
            <div className="grow" />

            {/* Action Wrapper */}
            <div className="flex flex-row items-start gap-2">
                {/* Search Bar */}
                {/* <div className="flex flex-row items-center gap-[90px] rounded-full bg-light-neutral-subtle/10 p-2 pl-4">
                    <div className="flex flex-row items-center gap-2">
                        <Image src={Search} alt="search_logo" />
                        <input type="text" placeholder="Search token name or symbol..." className="paragraph-s bg-transparent text-dark-neutral-primary outline-none" />
                    </div>
                    <div className="flex flex-row items-start gap-1">
                        <div className="flex h-6 w-6 items-center justify-center gap-2.5 rounded-lg bg-dark-background-elevated p-2">
                            <Image src={Command} alt="command_logo" />
                        </div>
                        <div className="flex h-6 w-6 items-center justify-center gap-2.5 rounded-lg bg-dark-background-elevated p-2">
                            <Image src={Slash} alt="slash_logo" />
                        </div>
                    </div>
                </div> */}

                <ButtonSecondary type="default" size="md">
                    Launch Risedle
                </ButtonSecondary>
            </div>
        </div>
    );
};

export default Navigation;
