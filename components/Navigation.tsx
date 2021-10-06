import type { FunctionComponent } from "react";

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
type NavigationProps = {
    activeMenu?: string;
};

/**
 * Navigation is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Navigation: FunctionComponent<NavigationProps> = ({ activeMenu }) => {
    return (
        <div className="flex flex-row p-4">
            <div className="flex-1">
                <Logo />
            </div>
            <Menu active={activeMenu} />
            <div className="flex-1 flex flex-row gap gap-x-2 justify-end">
                <div>
                    <ButtonGrey>Rinkeby</ButtonGrey>
                </div>
                <div>
                    <ConnectMetamask />
                </div>
                <div>
                    <ButtonOutlineCircle icon={ThreeDots.src} />
                </div>
            </div>
        </div>
    );
};

export default Navigation;