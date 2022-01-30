import type { FunctionComponent } from "react";
// Import components
import ButtonLaunchGradient from "../Buttons/LaunchGradient";

/**
 * HeroProps is a React Component properties that passed to React Component Hero
 */
type HeroProps = {};

/**
 * Hero is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Hero: FunctionComponent<HeroProps> = ({}) => {
    return (
        <div className="relative w-full justify-center overflow-hidden">
            <div className="relative z-10 m-auto flex max-w-screen-md flex-col items-center gap-8 px-4 py-32 text-center align-middle">
                <div>
                    <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-light-10 dark:text-gray-dark-10">Introducing, Risedle</p>
                </div>
                <div className="flex items-center">
                    <h1 className="hero-text">
                        Decentralized <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none">Leveraged</span> Token Market Protocol
                    </h1>
                </div>
                <div className="mx-auto max-w-lg">
                    <h2 className="text-base leading-relaxed text-gray-light-10 dark:text-gray-dark-10">A simple way to generate leveraged gains from a variety of tokens without risk of liquidation and earn high yield on your stablecoins.</h2>
                </div>
                <div>
                    <ButtonLaunchGradient />
                </div>
            </div>
            <svg width="100%" viewBox="0 0 1159 1027" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-1/2 z-0 max-w-[1159px] -translate-x-1/2 stroke-gray-light-12 opacity-50 dark:stroke-white md:-top-1/4" style={{ minWidth: "619px" }}>
                <circle opacity="0.1" cx="579.5" cy="447.5" r="222.549" />
                <circle opacity="0.1" cx="579.5" cy="447.5" r="299.389" />
                <circle opacity="0.05" cx="579.5" cy="447.5" r="389.035" />
                <circle opacity="0.1" cx="579.5" cy="447.5" r="579" />
            </svg>
        </div>
    );
};

export default Hero;
