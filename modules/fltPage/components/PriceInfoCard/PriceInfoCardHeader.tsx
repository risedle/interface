import type { FunctionComponent } from "react";
import ArbitrumFlatIcon from "../../../../uikit/icon/network/ArbitrumFlatIcon";
import BSCFlatIcon from "../../../../uikit/icon/network/BSCFlatIcon";

/**
 * PriceInfoCardHeaderProps is a React Component properties that passed to React Component PriceInfoCardHeader
 */
export enum SupportedChainName {
    arbitrum,
    binance,
}

type PriceInfoCardHeaderProps = {
    subtitle: string;
    title: string;
    chainName: SupportedChainName;
};

/**
 * PriceInfoCardHeader is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const PriceInfoCardHeader: FunctionComponent<PriceInfoCardHeaderProps> = ({ subtitle, title, chainName }) => {
    const renderChainIcon = () => {
        switch (chainName) {
            case SupportedChainName.arbitrum:
                return <ArbitrumFlatIcon className="h-6 w-6 opacity-30" />;
            case SupportedChainName.binance:
                return <BSCFlatIcon className="h-6 w-6 opacity-30" />;
        }
    };
    return (
        <div className="flex justify-between px-4">
            <div className="flex flex-col gap-2">
                <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                <div className="flex items-center gap-1">
                    <p className="text-2xl font-bold tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12">{title}</p>
                    {renderChainIcon()}
                </div>
            </div>
            <img src={`/assets/icon/token/${title}-dark.svg`} className="hidden h-12 w-12 dark:flex" />
            <img src={`/assets/icon/token/${title}-light.svg`} className="flex h-12 w-12 dark:hidden" />
        </div>
    );
};

export default PriceInfoCardHeader;
