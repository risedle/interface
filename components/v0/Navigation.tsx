import type { FunctionComponent } from "react";

// Import all components
import Logo from "./Logo";
import Menu from "./Menu";
import ButtonGrey from "./ButtonGrey";
import ConnectWallet from "./ConnectWallet";
import ButtonOutlineCircle from "./ButtonOutlineCircle";

// import wagmi
import { useNetwork, chain } from "wagmi";

// PNG files
import ThreeDots from "../../public/three-dots.png";

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
    const [networkData, switchNetwork] = useNetwork();
    let networkName = "";
    if (networkData.data.chain?.id === chain.kovan.id) {
        networkName = "Kovan";
    } else if (networkData.data.chain?.id === chain.arbitrumOne.id) {
        networkName = "Arbtirum";
    } else if (!networkData.data.chain) {
        networkName = "";
    } else {
        networkName = "Unsupported Network";
    }

    return (
        <div className="flex flex-row p-4">
            <div className="flex-1">
                <Logo />
            </div>
            <Menu active={activeMenu} />
            <div className="gap flex flex-1 flex-row justify-end gap-x-2">
                <div>
                    <ButtonGrey>{networkName}</ButtonGrey>
                </div>
                <div>
                    <ConnectWallet />
                </div>
                <div>
                    <ButtonOutlineCircle icon={ThreeDots.src} />
                </div>
            </div>
        </div>
    );
};

export default Navigation;
