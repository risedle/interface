import type { FunctionComponent } from "react";
import Link from "next/link";

// Import components
import ButtonLaunchGradient from "./ButtonLaunchGradient";

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
        <div className="flex flex-col px-4 text-center py-32">
            <div>
                <p className="text-xs font-semibold text-gray-light-10 dark:text-gray-dark-10 uppercase text-center mb-4 tracking-widest">
                    Introducing, Risedle
                </p>
            </div>
            <div>
                <h1 className="text-3xl font-bold m-0 text-gray-light-12 dark:text-gray-dark-12 mb-6">
                    Permissionless{" "}
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                "radial-gradient(91.36% 358.74% at 12.29% 100%, #9D85FF 0%, #7AD4F0 30.08%, #F554E5 60.28%, #E7CF55 100%)",
                        }}
                    >
                        Leveraged
                    </span>{" "}
                    Token Market Protocol
                </h1>
            </div>
            <div>
                <h2 className="text-gray-light-10 dark:text-gray-dark-10 text-base mb-10">
                    A simple way to get leveraged exposure to a variety of
                    tokens without risk of liquidation and earn high yield by
                    lending a token.
                </h2>
            </div>
            <div>
                <ButtonLaunchGradient />
            </div>
            <svg
                width="679"
                height="679"
                viewBox="0 0 679 679"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="-z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-gray-light-12 dark:stroke-white"
            >
                <g opacity="0.5">
                    <circle opacity="0.1" cx="339.499" cy="339.5" r="130.173" />
                    <circle opacity="0.1" cx="339.5" cy="339.5" r="175.19" />
                    <circle opacity="0.05" cx="339.5" cy="339.5" r="227.709" />
                    <circle opacity="0.1" cx="339.5" cy="339.5" r="339" />
                </g>
            </svg>
        </div>
    );
};

export default Hero;
