import type { FunctionComponent } from "react";
import { useWalletContext, customChains } from "../../../components/v1/Wallet";
import { chain as Chains } from "wagmi";

/**
 * BackgroundGradientProps is a React Component properties that passed to React Component BackgroundGradient
 */
type BackgroundGradientProps = {};

/**
 * BackgroundGradient is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const BackgroundGradient: FunctionComponent<BackgroundGradientProps> = ({}) => {
    const { chain } = useWalletContext();
    return (
        <>
            <div className="absolute -top-[56%] left-1/2 -translate-x-1/2 sm:-top-1/2">
                <svg className="stroke-black dark:stroke-white" width="679" height="679" viewBox="0 0 679 679" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="130.173" />
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="175.19" />
                        <circle opacity="0.05" cx="339.5" cy="339.5" r="227.709" />
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="339" />
                    </g>
                </svg>
            </div>
            {chain.chain.id === customChains.bsc.id && (
                <div className="absolute -top-3/4 left-1/2 h-max w-max -translate-x-1/2 sm:-top-2/3">
                    <img src="/assets/images/marketspage/gradient-bsc-dark.svg" className="hidden dark:block" />
                    <img src="/assets/images/marketspage/gradient-bsc-light.svg" className="dark:hidden" />
                </div>
            )}
            {chain.chain.id === Chains.arbitrumOne.id && (
                <div className="absolute -top-3/4 left-1/2 h-max w-max -translate-x-1/2 sm:-top-2/3">
                    <img src="/assets/images/marketspage/gradient-arb-dark.svg" className="hidden dark:block" />
                    <img src="/assets/images/marketspage/gradient-arb-light.svg" className="dark:hidden" />
                </div>
            )}
        </>
    );
};

export default BackgroundGradient;
