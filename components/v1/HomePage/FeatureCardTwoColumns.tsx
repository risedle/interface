import Link from "next/link";
import type { FunctionComponent } from "react";

/**
 * FeatureCardTwoColumnsProps is a React Component properties that passed to React Component FeatureCardTwoColumns
 */
type FeatureCardTwoColumnsProps = {};

/**
 * FeatureCardTwoColumns is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const FeatureCardTwoColumns: FunctionComponent<FeatureCardTwoColumnsProps> = ({}) => {
    return (
        <div className="m-auto flex max-w-4xl flex-col px-4 sm:flex-row">
            <div className="mb-4 flex basis-1/2 flex-col overflow-hidden rounded-2xl border border-gray-light-3 bg-gray-light-2 dark:border-gray-dark-3 dark:bg-gray-dark-2 sm:mb-0 sm:mr-2">
                <div className="px-4 py-6 sm:basis-1/3 sm:px-8">
                    <h1 className="m-0 mb-4 text-base font-bold text-gray-light-12 dark:text-gray-dark-12 sm:text-lg">0% Management Fees</h1>
                    <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">Just like leveraging assets manually using lending protocol, you will not get charged for management fees.</p>
                    <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12">
                        <Link href="https://docs.risedle.com/leveraged-tokens/ethrise-2x-long-eth/fees">
                            <a>Risedle Leveraged Tokens Fees &#8594;</a>
                        </Link>
                    </p>
                </div>
                <div className="inline-block sm:basis-2/3 ">
                    <svg height="100%" width="100%" viewBox="0 0 343 341" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="169" cy="196" r="80.5" className="stroke-gray-light-5 dark:stroke-gray-dark-5" />
                        <path d="M362.5 195C362.5 302.421 275.642 389.5 168.5 389.5C61.358 389.5 -25.5 302.421 -25.5 195C-25.5 87.5794 61.358 0.5 168.5 0.5C275.642 0.5 362.5 87.5794 362.5 195Z" className="stroke-gray-light-5 dark:stroke-gray-dark-5" />
                        <circle cx="168.5" cy="195.5" r="130.5" className="stroke-gray-light-5 dark:stroke-gray-dark-5" strokeDasharray="4 4" />
                        <path
                            d="M149.6 221.864C145.712 221.864 142.304 220.808 139.376 218.696C136.496 216.584 134.264 213.584 132.68 209.696C131.096 205.76 130.304 201.128 130.304 195.8C130.304 190.424 131.096 185.792 132.68 181.904C134.264 178.016 136.496 175.016 139.376 172.904C142.304 170.792 145.712 169.736 149.6 169.736C153.536 169.736 156.944 170.792 159.824 172.904C162.704 175.016 164.936 178.016 166.52 181.904C168.104 185.792 168.896 190.424 168.896 195.8C168.896 201.128 168.104 205.76 166.52 209.696C164.936 213.584 162.704 216.584 159.824 218.696C156.944 220.808 153.536 221.864 149.6 221.864ZM138.08 195.8C138.08 198.488 138.32 200.936 138.8 203.144C139.28 205.352 139.952 207.272 140.816 208.904L153.416 177.728C152.216 177.152 150.944 176.864 149.6 176.864C146.24 176.864 143.48 178.568 141.32 181.976C139.16 185.336 138.08 189.944 138.08 195.8ZM149.6 214.808C151.856 214.808 153.848 214.04 155.576 212.504C157.304 210.968 158.648 208.784 159.608 205.952C160.616 203.072 161.12 199.688 161.12 195.8C161.12 193.112 160.88 190.664 160.4 188.456C159.92 186.248 159.248 184.352 158.384 182.768L145.784 213.944C146.984 214.52 148.256 214.808 149.6 214.808ZM183.124 192.056C180.004 192.056 177.436 191.048 175.42 189.032C173.404 187.016 172.396 184.304 172.396 180.896C172.396 177.488 173.404 174.776 175.42 172.76C177.436 170.744 180.004 169.736 183.124 169.736C186.244 169.736 188.812 170.744 190.828 172.76C192.844 174.776 193.852 177.488 193.852 180.896C193.852 184.304 192.844 187.016 190.828 189.032C188.812 191.048 186.244 192.056 183.124 192.056ZM183.124 187.016C184.516 187.016 185.74 186.488 186.796 185.432C187.852 184.328 188.38 182.816 188.38 180.896C188.38 178.928 187.852 177.416 186.796 176.36C185.74 175.304 184.516 174.776 183.124 174.776C181.732 174.776 180.508 175.304 179.452 176.36C178.396 177.416 177.868 178.928 177.868 180.896C177.868 182.816 178.396 184.328 179.452 185.432C180.508 186.488 181.732 187.016 183.124 187.016ZM176.284 216.752L172.324 212.864L209.26 174.848L213.22 178.736L176.284 216.752ZM202.42 221.864C199.3 221.864 196.732 220.856 194.716 218.84C192.7 216.824 191.692 214.112 191.692 210.704C191.692 207.296 192.7 204.584 194.716 202.568C196.732 200.552 199.3 199.544 202.42 199.544C205.54 199.544 208.108 200.552 210.124 202.568C212.14 204.584 213.148 207.296 213.148 210.704C213.148 214.112 212.14 216.824 210.124 218.84C208.108 220.856 205.54 221.864 202.42 221.864ZM202.42 216.824C203.812 216.824 205.036 216.296 206.092 215.24C207.148 214.136 207.676 212.624 207.676 210.704C207.676 208.736 207.148 207.224 206.092 206.168C205.036 205.112 203.812 204.584 202.42 204.584C201.028 204.584 199.804 205.112 198.748 206.168C197.692 207.224 197.164 208.736 197.164 210.704C197.164 212.624 197.692 214.136 198.748 215.24C199.804 216.296 201.028 216.824 202.42 216.824Z"
                            className="fill-black dark:fill-white"
                        />
                        <g filter="url(#filter0_f_479_19236)">
                            <rect x="-33" y="386.089" width="22.1427" height="204.941" transform="rotate(-16.0921 -33 386.089)" fill="#5FD4F4" />
                        </g>
                        <g filter="url(#filter1_f_479_19236)">
                            <rect x="147.807" y="323.045" width="22.1427" height="183.534" transform="rotate(-16.0921 147.807 323.045)" fill="#5EB0EF" />
                        </g>
                        <g filter="url(#filter2_f_479_19236)">
                            <rect x="97.8477" y="323.045" width="22.1427" height="183.534" transform="rotate(-16.0921 97.8477 323.045)" fill="#5EB0EF" />
                        </g>
                        <g filter="url(#filter3_f_479_19236)">
                            <rect x="338.129" y="287.359" width="22.1427" height="183.534" transform="rotate(-16.0921 338.129 287.359)" fill="#5EB0EF" />
                        </g>
                        <g filter="url(#filter4_f_479_19236)">
                            <rect x="208.473" y="362.299" width="22.1427" height="220.36" transform="rotate(-16.0921 208.473 362.299)" fill="#99D52A" />
                        </g>
                        <g filter="url(#filter5_f_479_19236)">
                            <rect x="-17.5352" y="267.137" width="22.1427" height="220.36" transform="rotate(-16.0921 -17.5352 267.137)" fill="#99D52A" />
                        </g>
                        <defs>
                            <filter id="filter0_f_479_19236" x="-188.623" y="224.329" width="389.326" height="514.294" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19236" />
                            </filter>
                            <filter id="filter1_f_479_19236" x="-7.81627" y="161.285" width="383.392" height="493.726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19236" />
                            </filter>
                            <filter id="filter2_f_479_19236" x="-57.7753" y="161.285" width="383.392" height="493.726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19236" />
                            </filter>
                            <filter id="filter3_f_479_19236" x="182.506" y="125.599" width="383.392" height="493.726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19236" />
                            </filter>
                            <filter id="filter4_f_479_19236" x="52.8497" y="200.538" width="393.601" height="529.109" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19236" />
                            </filter>
                            <filter id="filter5_f_479_19236" x="-173.158" y="105.377" width="393.601" height="529.109" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19236" />
                            </filter>
                        </defs>
                    </svg>
                </div>
            </div>

            <div className="flex basis-1/2 flex-col overflow-hidden rounded-2xl border border-gray-light-3 bg-gray-light-2 dark:border-gray-dark-3 dark:bg-gray-dark-2 sm:ml-2">
                <div className="inline-block sm:basis-2/3 ">
                    <svg height="100%" width="100%" viewBox="0 0 343 341" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_479_19257)">
                            <path d="M-43 190L81.1444 182.3L134.707 168L203.286 176.8L239.829 168L259.852 147.1H318.921L344.451 130.6L387 124" stroke="#C7C7C7" strokeDasharray="4 4" />
                            <circle cx="160" cy="157" r="31.5" fill="white" fillOpacity="0.1" className="stroke-gray-light-12 dark:stroke-gray-dark-12" />
                            <circle cx="185" cy="157" r="31.5" fill="#082636" />
                            <circle cx="185" cy="157" r="31.5" fill="url(#paint0_radial_479_19257)" />
                            <circle cx="185" cy="157" r="31.5" fill="url(#paint1_radial_479_19257)" />
                            <circle cx="185" cy="157" r="31.5" className="stroke-gray-light-12 dark:stroke-gray-dark-12" />
                            <g clipPath="url(#clip1_479_19257)">
                                <path d="M184.998 161.34L193.592 156.26L184.998 142L176.404 156.26L184.998 161.34Z" fill="#171717" />
                                <path d="M184.998 170L193.597 157.889L184.998 162.966L176.404 157.889L184.998 170Z" fill="#171717" />
                            </g>
                            <g filter="url(#filter0_f_479_19257)">
                                <rect x="-139.193" y="-71.9551" width="22.1427" height="183.534" transform="rotate(-16.0921 -139.193 -71.9551)" fill="#FF8B3E" />
                            </g>
                            <g filter="url(#filter1_f_479_19257)">
                                <rect x="-189.152" y="-71.9551" width="22.1427" height="183.534" transform="rotate(-16.0921 -189.152 -71.9551)" fill="#FF8B3E" />
                            </g>
                            <g filter="url(#filter2_f_479_19257)">
                                <rect x="51.1289" y="-107.641" width="22.1427" height="183.534" transform="rotate(-16.0921 51.1289 -107.641)" fill="#FF8B3E" />
                            </g>
                            <g filter="url(#filter3_f_479_19257)">
                                <rect x="-78.5273" y="-32.7012" width="22.1427" height="220.36" transform="rotate(-16.0921 -78.5273 -32.7012)" fill="#D864D8" />
                            </g>
                        </g>
                        <defs>
                            <filter id="filter0_f_479_19257" x="-294.816" y="-233.715" width="383.392" height="493.726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19257" />
                            </filter>
                            <filter id="filter1_f_479_19257" x="-344.775" y="-233.715" width="383.392" height="493.726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19257" />
                            </filter>
                            <filter id="filter2_f_479_19257" x="-104.494" y="-269.401" width="383.392" height="493.726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19257" />
                            </filter>
                            <filter id="filter3_f_479_19257" x="-234.15" y="-194.462" width="393.601" height="529.109" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19257" />
                            </filter>
                            <radialGradient id="paint0_radial_479_19257" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(121 108.837) rotate(46.5376) scale(236.634 181.735)">
                                <stop stopColor="white" />
                                <stop offset="0.144436" stopColor="#FFDEFC" />
                                <stop offset="0.193304" stopColor="#FFFDEE" />
                                <stop offset="0.195836" stopColor="#FDF7DF" />
                                <stop offset="0.392662" stopColor="#FFF4FE" />
                                <stop offset="0.421805" stopColor="#FFDEFC" />
                                <stop offset="0.510216" stopColor="#BAF3FF" />
                                <stop offset="0.554709" stopColor="#E6FAFF" />
                                <stop offset="0.635733" stopColor="white" />
                            </radialGradient>
                            <radialGradient id="paint1_radial_479_19257" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(121 108.837) rotate(46.5376) scale(236.634 181.735)">
                                <stop stopColor="white" />
                                <stop offset="0.144436" stopColor="#FFDEFC" />
                                <stop offset="0.193304" stopColor="#FFFDEE" />
                                <stop offset="0.195836" stopColor="#FDF7DF" />
                                <stop offset="0.392662" stopColor="#FFF4FE" />
                                <stop offset="0.421805" stopColor="#FFDEFC" />
                                <stop offset="0.510216" stopColor="#BAF3FF" />
                                <stop offset="0.554709" stopColor="#E6FAFF" />
                                <stop offset="0.635733" stopColor="white" />
                            </radialGradient>
                            <clipPath id="clip0_479_19257">
                                <rect width="343" height="279" fill="white" />
                            </clipPath>
                            <clipPath id="clip1_479_19257">
                                <rect width="28" height="28" fill="white" transform="translate(171 142)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className="px-4 py-6 sm:basis-1/3 sm:px-8">
                    <h1 className="m-0 mb-4 text-base font-bold text-gray-light-12 dark:text-gray-dark-12 sm:text-lg">Floating Leverage</h1>
                    <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">Risedle&apos;s unique rebalancing mechanism designed to minimize loss due to frequent rebalancing.</p>
                    <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12">
                        <Link href="https://docs.risedle.com/leveraged-tokens/ethrise-2x-long-eth/ethrise-rebalancing-mechanism">
                            <a>Rebalancing Mechanism &#8594;</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeatureCardTwoColumns;
