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
            <div className="z-10 relative flex flex-col px-4 text-center max-w-screen-md m-auto align-middle py-32 items-center gap-8">
                <div>
                    <p className="text-xs font-semibold text-gray-light-10 dark:text-gray-dark-10 uppercase text-center tracking-widest">Introducing, Risedle</p>
                </div>
                <div className="flex items-center">
                    <h1 className="hero-text">
                        Decentralized <span className="bg-clip-text text-transparent transition-none gradient move-gradient bg-[length:250%_250%]">Leveraged</span> Token Market Protocol
                    </h1>
                </div>
                <div className="max-w-lg mx-auto">
                    <h2 className="text-base text-gray-light-10 dark:text-gray-dark-10 leading-relaxed">A simple way to generate leveraged gains from a variety of tokens without risk of liquidation and earn high yield on your stablecoins.</h2>
                </div>
                <div>
                    <ButtonLaunchGradient />
                </div>
            </div>
            <svg width="100%" viewBox="0 0 1159 1027" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-0 absolute top-0 md:-top-1/4 left-1/2 -translate-x-1/2 stroke-gray-light-12 dark:stroke-white max-w-[1159px] opacity-50" style={{ minWidth: "619px" }}>
                <circle opacity="0.1" cx="579.5" cy="447.5" r="222.549" />
                <circle opacity="0.1" cx="579.5" cy="447.5" r="299.389" />
                <circle opacity="0.05" cx="579.5" cy="447.5" r="389.035" />
                <circle opacity="0.1" cx="579.5" cy="447.5" r="579" />
            </svg>
        </div>
    );
};

export default Hero;
