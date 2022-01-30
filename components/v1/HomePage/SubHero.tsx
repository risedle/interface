import type { FunctionComponent } from "react";

/**
 * SubHeroProps is a React Component properties that passed to React Component SubHero
 */
type SubHeroProps = {};

/**
 * SubHero is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const SubHero: FunctionComponent<SubHeroProps> = ({}) => {
    return (
        <div className="relative w-full justify-center overflow-hidden">
            <div className="relative z-10 m-auto flex max-w-screen-md flex-col items-center gap-8 px-4 text-center md:max-w-screen-lg">
                <div className="mt-20 sm:mt-64">
                    <h1 className="hero-text">
                        Less <span className="move-gradient gradient bg-[length:480px_400px] bg-clip-text text-transparent">Stressful</span>
                        , <br /> Do More With Risedle
                    </h1>
                </div>
                <h2 className="mb-24 max-w-lg text-base leading-relaxed text-gray-light-10 dark:text-gray-dark-10 sm:mb-32">No more tedious collateral health monitoring and stop worying about liquidation.</h2>
            </div>
            <svg width="100%" viewBox="0 0 375 312" xmlns="http://www.w3.org/2000/svg" className="absolute top-24 left-1/2 z-0 max-w-3xl -translate-x-1/2  scale-75 fill-gray-light-12 opacity-50 dark:fill-white">
                <mask id="mask0_479_18846" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-10" y="0" width="395" height="312">
                    <rect width="394.553" height="312" transform="matrix(1 0 0 -1 -10 312)" fill="url(#paint0_linear_479_18846)" />
                </mask>
                <g mask="url(#mask0_479_18846)">
                    <circle opacity="0.3" r="0.910506" transform="matrix(1 0 0 -1 11.5472 311.089)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 32.1839 311.089)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 52.8226 311.089)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 73.4613 311.089)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 94.1 311.089)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 114.737 311.089)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 135.375 311.089)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 156.014 311.089)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 176.653 311.089)" />
                    <circle opacity="0.7" r="0.910506" transform="matrix(1 0 0 -1 197.289 311.089)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 217.928 311.089)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 238.567 311.089)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 259.203 311.089)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 279.842 311.089)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 300.481 311.089)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 321.119 311.089)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 341.756 311.089)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 362.395 311.089)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 11.5472 290.451)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 32.1839 290.451)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 52.8226 290.451)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 73.4613 290.451)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 94.1 290.451)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 114.737 290.451)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 135.375 290.451)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 156.014 290.451)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 176.653 290.451)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 197.289 290.451)" />
                    <circle opacity="0.7" r="0.910506" transform="matrix(1 0 0 -1 217.928 290.451)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 238.567 290.451)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 259.203 290.451)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 279.842 290.451)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 300.481 290.451)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 321.119 290.451)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 341.756 290.451)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 362.395 290.451)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 11.5472 269.813)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 32.1839 269.813)" />
                    <circle opacity="0.3" r="0.910506" transform="matrix(1 0 0 -1 52.8226 269.813)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 73.4613 269.813)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 94.1 269.813)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 114.737 269.813)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 135.375 269.813)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 156.014 269.813)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 176.653 269.813)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 197.289 269.813)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 217.928 269.813)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 238.567 269.813)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 259.203 269.813)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 279.842 269.813)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 300.481 269.813)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 321.119 269.813)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 341.756 269.813)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 362.395 269.813)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 11.5472 249.175)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 32.1839 249.175)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 52.8226 249.175)" />
                    <circle opacity="0.3" r="0.910506" transform="matrix(1 0 0 -1 73.4613 249.175)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 94.1 249.175)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 114.737 249.175)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 135.375 249.175)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 156.014 249.175)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 176.653 249.175)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 197.289 249.175)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 217.928 249.175)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 238.567 249.175)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 259.203 249.175)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 279.842 249.175)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 300.481 249.175)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 321.119 249.175)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 341.756 249.175)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 362.395 249.175)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 11.5472 228.537)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 32.1839 228.537)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 52.8226 228.537)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 73.4613 228.537)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 94.1 228.537)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 114.737 228.537)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 135.375 228.537)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 156.014 228.537)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 176.653 228.537)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 197.289 228.537)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 217.928 228.537)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 238.567 228.537)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 259.203 228.537)" />
                    <circle opacity="0.7" r="0.910506" transform="matrix(1 0 0 -1 279.842 228.537)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 300.481 228.537)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 321.119 228.537)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 341.756 228.537)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 362.395 228.537)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 11.5472 207.899)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 32.1839 207.899)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 52.8226 207.899)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 73.4613 207.899)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 94.1 207.899)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 114.737 207.899)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 135.375 207.899)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 156.014 207.899)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 176.653 207.899)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 197.289 207.899)" />
                    <circle opacity="0.7" r="0.910506" transform="matrix(1 0 0 -1 217.928 207.899)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 238.567 207.899)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 259.203 207.899)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 279.842 207.899)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 300.481 207.899)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 321.119 207.899)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 341.756 207.899)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 362.395 207.899)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 11.5472 187.261)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 32.1839 187.261)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 52.8226 187.261)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 73.4613 187.261)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 94.1 187.261)" />
                    <circle opacity="0.7" r="0.910506" transform="matrix(1 0 0 -1 114.737 187.261)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 135.375 187.261)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 156.014 187.261)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 176.653 187.261)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 197.289 187.261)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 217.928 187.261)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 238.567 187.261)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 259.203 187.261)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 279.842 187.261)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 300.481 187.261)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 321.119 187.261)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 341.756 187.261)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 362.395 187.261)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 11.5472 166.623)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 32.1839 166.623)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 52.8226 166.623)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 73.4613 166.623)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 94.1 166.623)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 114.737 166.623)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 135.375 166.623)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 156.014 166.623)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 176.653 166.623)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 197.289 166.623)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 217.928 166.623)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 238.567 166.623)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 259.203 166.623)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 279.842 166.623)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 300.481 166.623)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 321.119 166.623)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 341.756 166.623)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 362.395 166.623)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 11.5472 145.985)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 32.1839 145.985)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 52.8226 145.985)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 73.4613 145.985)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 94.1 145.985)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 114.737 145.985)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 135.375 145.985)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 156.014 145.985)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 176.653 145.985)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 197.289 145.985)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 217.928 145.985)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 238.567 145.985)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 259.203 145.985)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 279.842 145.985)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 300.481 145.985)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 321.119 145.985)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 341.756 145.985)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 362.395 145.985)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 11.5472 125.346)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 32.1839 125.346)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 52.8226 125.346)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 73.4613 125.346)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 94.1 125.346)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 114.737 125.346)" />
                    <circle opacity="0.9" r="0.910506" transform="matrix(1 0 0 -1 135.375 125.346)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 156.014 125.346)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 176.653 125.346)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 197.289 125.346)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 217.928 125.346)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 238.567 125.346)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 259.203 125.346)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 279.842 125.346)" />
                    <circle opacity="0.9" r="0.910506" transform="matrix(1 0 0 -1 300.481 125.346)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 321.119 125.346)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 341.756 125.346)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 362.395 125.346)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 11.5472 104.708)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 32.1839 104.708)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 52.8226 104.708)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 73.4613 104.708)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 94.1 104.708)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 114.737 104.708)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 135.375 104.708)" />
                    <circle opacity="0.5" r="0.910506" transform="matrix(1 0 0 -1 156.014 104.708)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 176.653 104.708)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 197.289 104.708)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 217.928 104.708)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 238.567 104.708)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 259.203 104.708)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 279.842 104.708)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 300.481 104.708)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 321.119 104.708)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 341.756 104.708)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 362.395 104.708)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 11.5472 84.07)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 32.1839 84.07)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 52.8226 84.07)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 73.4613 84.07)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 94.1 84.07)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 114.737 84.07)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 135.375 84.07)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 156.014 84.07)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 176.653 84.07)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 197.289 84.07)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 217.928 84.07)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 238.567 84.07)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 259.203 84.07)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 279.842 84.07)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 300.481 84.07)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 321.119 84.07)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 341.756 84.07)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 362.395 84.07)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 11.5472 63.4318)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 32.1839 63.4318)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 52.8226 63.4318)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 73.4613 63.4318)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 94.1 63.4318)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 114.737 63.4318)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 135.375 63.4318)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 156.014 63.4318)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 176.653 63.4318)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 197.289 63.4318)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 217.928 63.4318)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 238.567 63.4318)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 259.203 63.4318)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 279.842 63.4318)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 300.481 63.4318)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 321.119 63.4318)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 341.756 63.4318)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 362.395 63.4318)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 11.5472 42.7936)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 32.1839 42.7936)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 52.8226 42.7936)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 73.4613 42.7936)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 94.1 42.7936)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 114.737 42.7936)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 135.375 42.7936)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 156.014 42.7936)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 176.653 42.7936)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 197.289 42.7936)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 217.928 42.7936)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 238.567 42.7936)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 259.203 42.7936)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 279.842 42.7936)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 300.481 42.7936)" />
                    <rect width="1.82101" height="1.82101" transform="matrix(1 0 0 -1 320.209 43.7041)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 341.756 42.7936)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 362.395 42.7936)" />
                    <circle opacity="0.7" r="0.910506" transform="matrix(1 0 0 -1 11.5472 22.1559)" />
                    <circle opacity="0.7" r="0.910506" transform="matrix(1 0 0 -1 32.1839 22.1559)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 52.8226 22.1559)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 73.4613 22.1559)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 94.1 22.1559)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 114.737 22.1559)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 135.375 22.1559)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 156.014 22.1559)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 176.653 22.1559)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 197.289 22.1559)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 217.928 22.1559)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 238.567 22.1559)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 259.203 22.1559)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 279.842 22.1559)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 300.481 22.1559)" />
                    <circle opacity="0.8" r="0.910506" transform="matrix(1 0 0 -1 321.119 22.1559)" />
                    <circle opacity="0.4" r="0.910506" transform="matrix(1 0 0 -1 341.756 22.1559)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 362.395 22.1559)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 11.5472 1.51772)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 32.1839 1.51772)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 52.8226 1.51772)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 73.4613 1.51772)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 94.1 1.51772)" />
                    <circle opacity="0.7" r="0.910506" transform="matrix(1 0 0 -1 114.737 1.51772)" />
                    <circle opacity="0.7" r="0.910506" transform="matrix(1 0 0 -1 135.375 1.51772)" />
                    <circle opacity="0.2" r="0.910506" transform="matrix(1 0 0 -1 156.014 1.51772)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 176.653 1.51772)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 197.289 1.51772)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 217.928 1.51772)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 238.567 1.51772)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 259.203 1.51772)" />
                    <circle opacity="0.6" r="0.910506" transform="matrix(1 0 0 -1 279.842 1.51772)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 300.481 1.51772)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 321.119 1.51772)" />
                    <circle opacity="0.1" r="0.910506" transform="matrix(1 0 0 -1 341.756 1.51772)" />
                    <circle r="0.910506" transform="matrix(1 0 0 -1 362.395 1.51772)" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_479_18846" x1="197.276" y1="0" x2="197.276" y2="312" gradientUnits="userSpaceOnUse">
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default SubHero;
