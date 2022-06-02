import type { FunctionComponent } from "react";
import LogoV2 from "../../../../uikit/layout/LogoV2";

/**
 * CardProps is a React Component properties that passed to React Component Card
 */
type CardProps = {
    type: "eth" | "avax" | "dpx";
    className?: string;
};

/**
 * Card is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Card: FunctionComponent<CardProps> = ({ type, className }) => {
    const options: { [key: string]: { [key: string]: string } } = {
        eth: {
            style: "color-brand-eth rotate-12",
            symbol: "ETH",
        },
        avax: {
            style: "color-brand-avax",
            symbol: "AVAX",
        },
        dpx: {
            style: "color-brand-dpx -rotate-12",
            symbol: "DPX",
        },
    };
    return (
        <div className={`${options[type].style} ${className} flex h-[408px] w-[296px] flex-col items-center rounded-3xl py-6 shadow-medium`}>
            <LogoV2 />
            <div className="flex grow flex-col justify-center">
                <img src={`/assets/icon/homepage/${options[type].symbol}.svg`} alt={options[type].symbol} width={175} height={175} />
            </div>
            <div className="flex flex-col items-center text-center">
                <p className="heading-h5 text-dark-neutral-primary opacity-80">Auto-boosted {options[type].symbol}</p>
                <p className="paragraph-s text-light-background opacity-40">Boost to claim your position</p>
            </div>
        </div>
    );
};

export default Card;
