import type { FunctionComponent } from "react";
import { customChains } from "../../../components/v1/Wallet";
import { chain, chain as Chains } from "wagmi";

/**
 * BackgroundGradientProps is a React Component properties that passed to React Component BackgroundGradient
 */
type BackgroundGradientProps = {
    chainID: number;
};

/**
 * BackgroundGradient is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const BackgroundGradient: FunctionComponent<BackgroundGradientProps> = ({ chainID }) => {
    const renderComponent = () => {
        switch (chainID) {
            case customChains.bsc.id:
                return (
                    <div className="absolute left-1/2 top-0 hidden h-max w-max -translate-x-1/2 -translate-y-[65%] sm:block">
                        <img src="/assets/images/marketspage/gradient-bsc-dark.svg" className="hidden dark:block" />
                        <img src="/assets/images/marketspage/gradient-bsc-light.svg" className="dark:hidden" />
                    </div>
                );
            case Chains.arbitrumOne.id:
                return (
                    <div className="absolute left-1/2 top-0 hidden h-max w-max -translate-x-1/2 -translate-y-[65%] sm:block">
                        <img src="/assets/images/marketspage/gradient-arb-dark.svg" className="hidden dark:block" />
                        <img src="/assets/images/marketspage/gradient-arb-light.svg" className="dark:hidden" />
                    </div>
                );
        }
    };
    return <>{renderComponent()}</>;
};

export default BackgroundGradient;
