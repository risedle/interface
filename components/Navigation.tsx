import type { FunctionComponent } from "react";
import { Fragment } from "react";

// Import all components
import Logo from "./Logo";
import Menu from "./Menu";
import ButtonGrey from "./ButtonGrey";
import ConnectMetamask from "./ConnectMetamask";
import ButtonOutlineCircle from "./ButtonOutlineCircle";

// PNG files
import ThreeDots from "../public/three-dots.png";

/**
 * NavigationProps is a React Component properties that passed to React
 * Component Button
 */
type NavigationProps = {};

/**
 * Navigation is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Navigation: FunctionComponent<NavigationProps> = ({}) => {
    const text = "font-inter font-extrabold text-white text-opacity-50";
    const hover = "hover:text-opacity-100";
    const transition = "transition duration-300 ease-in-out";
    const classNames = [text, hover, transition].join(" ");
    return (
        <div className="flex flex-row p-4">
            <div className="flex-1">
                <Logo />
            </div>
            <Menu />
            <div className="flex-1 flex flex-row gap gap-x-2 justify-end">
                <div>
                    <ButtonGrey>Rinkeby</ButtonGrey>
                </div>
                <div>
                    <ConnectMetamask />
                </div>
                <div>
                    <ButtonOutlineCircle icon={ThreeDots} />
                </div>
            </div>
        </div>
    );
};

export default Navigation;
