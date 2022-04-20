import type { FunctionComponent } from "react";
import Resources from "./Resources";

/**
 * HeroFooterProps is a React Component properties that passed to React Component HeroFooter
 */
type HeroFooterProps = {};

/**
 * HeroFooter is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const HeroFooter: FunctionComponent<HeroFooterProps> = ({}) => {
    return (
        <div className="relative my-20 flex w-full items-center justify-center sm:my-40">
            <div className="relative z-10 flex w-full max-w-screen-md flex-col items-center gap-8 px-4 text-center">
                <h1 className="hero-text">
                    Learn More <br />
                    About <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent">Risedle</span>
                </h1>
                <div>
                    <h2 className="mb-6 text-base text-gray-light-10 dark:text-gray-dark-10">These are links to help you dive deeper into Risedle labs and the products.</h2>
                </div>
                <Resources />
            </div>
            <svg width="100%" height="100%" viewBox="0 0 375 463" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-1/2 z-0 -translate-x-1/2  fill-gray-light-12 dark:fill-white sm:scale-150">
                <g filter="url(#filter0_f_488_28293)">
                    <rect x="42" y="208.087" width="14.5306" height="134.487" transform="rotate(-16.0921 42 208.087)" fill="#5FD4F4" />
                </g>
                <g filter="url(#filter1_f_488_28293)">
                    <rect x="160.65" y="166.716" width="14.5306" height="120.439" transform="rotate(-16.0921 160.65 166.716)" fill="#946800" />
                </g>
                <g filter="url(#filter2_f_488_28293)">
                    <rect x="127.865" y="166.716" width="14.5306" height="120.439" transform="rotate(-16.0921 127.865 166.716)" fill="#946800" />
                </g>
                <g filter="url(#filter3_f_488_28293)">
                    <rect x="285.545" y="143.298" width="14.5306" height="120.439" transform="rotate(-16.0921 285.545 143.298)" fill="#946800" />
                </g>
                <g filter="url(#filter4_f_488_28293)">
                    <rect x="200.461" y="192.475" width="14.5306" height="144.606" transform="rotate(-16.0921 200.461 192.475)" fill="#F4C6DB" />
                </g>
                <g filter="url(#filter5_f_488_28293)">
                    <rect x="52.1484" y="130.028" width="14.5306" height="144.606" transform="rotate(-16.0921 52.1484 130.028)" fill="#F4C6DB" />
                </g>
                <defs>
                    <filter id="filter0_f_488_28293" x="-83.62" y="78.4391" width="302.478" height="384.486" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_488_28293" />
                    </filter>
                    <filter id="filter1_f_488_28293" x="35.0304" y="37.068" width="298.586" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_488_28293" />
                    </filter>
                    <filter id="filter2_f_488_28293" x="2.24523" y="37.068" width="298.586" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_488_28293" />
                    </filter>
                    <filter id="filter3_f_488_28293" x="159.925" y="13.65" width="298.586" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_488_28293" />
                    </filter>
                    <filter id="filter4_f_488_28293" x="74.8409" y="62.8273" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_488_28293" />
                    </filter>
                    <filter id="filter5_f_488_28293" x="-73.4716" y="0.379997" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_488_28293" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default HeroFooter;
