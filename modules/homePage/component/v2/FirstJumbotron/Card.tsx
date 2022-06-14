import type { FunctionComponent } from "react";
import LogoV2 from "../../../../../uikit/layout/LogoV2";
import { motion } from "framer-motion";

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
            style: "color-brand-eth",
            symbol: "ETH",
            rotate: "12deg",
            translateX: "-40px",
            from: "-14px",
            translateY: "-24px",
        },
        avax: {
            style: "color-brand-avax",
            symbol: "AVAX",
            rotate: "0deg",
            translateX: "50%",
            from: "10px",
            translateY: "0px",
        },
        dpx: {
            style: "color-brand-dpx",
            symbol: "DPX",
            rotate: "-12deg",
            translateX: "40px",
            from: "-26px",
            translateY: "-36px",
        },
    };

    const delay: { [key: string]: number } = {
        eth: 2,
        avax: 1,
        dpx: 0,
    };
    return (
        <motion.div initial={{ opacity: 0, rotate: options[type].rotate, translateX: options[type].translateX, translateY: options[type].from }} animate={{ opacity: 1, translateY: options[type].translateY }} transition={{ translateY: { type: "spring", stiffness: 700 }, opacity: { duration: 0.1 }, duration: 0.7, delay: delay[type] }} className={`${options[type].style} ${className} flex h-[408px] w-[296px] flex-col items-center rounded-3xl py-6 shadow-medium`}>
            <LogoV2 />
            <div className="flex grow flex-col justify-center">
                <img src={`/assets/icon/homepage/${options[type].symbol}.svg`} width={175} height={175} />
            </div>
            <div className="flex flex-col items-center text-center">
                <p className="heading-h5 text-dark-neutral-primary opacity-80">Auto-boosted {options[type].symbol}</p>
                <p className="paragraph-s text-light-background opacity-40">Boost to claim your position</p>
            </div>
        </motion.div>
    );
};

export default Card;
