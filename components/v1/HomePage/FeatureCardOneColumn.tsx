import Link from "next/link";
import type { FunctionComponent } from "react";

/**
 * FeatureCardOneColumnProps is a React Component properties that passed to React Component FeatureCardOneColumn
 */
type FeatureCardOneColumnProps = {};

/**
 * FeatureCardOneColumn is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const FeatureCardOneColumn: FunctionComponent<FeatureCardOneColumnProps> = ({}) => {
    return (
        <div className="px-4 max-w-4xl m-auto">
            <div className="bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-3 dark:border-gray-dark-3 rounded-2xl overflow-hidden flex flex-col sm:flex-row sm:items-center sm:h-64">
                <div className="px-4 sm:pl-8 py-6 sm:basis-2/4">
                    <h1 className="m-0 text-base sm:text-lg font-bold mb-4 text-gray-light-12 dark:text-gray-dark-12">Enjoy Leverage Without Liquidations</h1>
                    <p className="text-sm text-gray-light-10 dark:text-gray-dark-10 leading-6 mb-6">Risedle Leveraged Tokens allows its holder to enjoy increased leverage without risk of liquidation</p>
                    <p className="text-sm text-gray-light-12 dark:text-gray-dark-12 font-bold leading-6">
                        <Link href="/products">
                            <a>Risedle Leveraged Tokens &#8594;</a>
                        </Link>
                    </p>
                </div>
                <div className="sm:basis-2/4 inline-block ">
                    <svg height="100%" width="100%" viewBox="0 0 343 336" fill="none" xmlns="http://www.w3.org/2000/svg" className="object-cover sm:-mt-16">
                        <line x1="52.5" y1="2.18557e-08" x2="52.5" y2="382" className="stroke-gray-light-3 dark:stroke-gray-dark-3" />
                        <line x1="132.5" y1="2.18557e-08" x2="132.5" y2="382" className="stroke-gray-light-3 dark:stroke-gray-dark-3" />
                        <line x1="212.5" y1="2.18557e-08" x2="212.5" y2="382" className="stroke-gray-light-3 dark:stroke-gray-dark-3" />
                        <line x1="292.5" y1="2.18557e-08" x2="292.5" y2="382" className="stroke-gray-light-3 dark:stroke-gray-dark-3" />
                        <line x1="-84" y1="55.5" x2="429" y2="55.5" className="stroke-gray-light-3 dark:stroke-gray-dark-3" />
                        <line x1="-84" y1="39.5" x2="429" y2="39.5" className="stroke-gray-light-3 dark:stroke-gray-dark-3" />
                        <line x1="-84" y1="145.5" x2="429" y2="145.5" className="stroke-gray-light-3 dark:stroke-gray-dark-3" />
                        <line x1="-84" y1="235.5" x2="429" y2="235.5" className="stroke-gray-light-3 dark:stroke-gray-dark-3" />
                        <line x1="-84" y1="325.5" x2="429" y2="325.5" className="stroke-gray-light-3 dark:stroke-gray-dark-3" />
                        <g filter="url(#filter0_f_479_19186)">
                            <rect x="120" y="296.089" width="22.1427" height="204.941" transform="rotate(-16.0921 120 296.089)" fill="#5FD4F4" />
                        </g>
                        <g filter="url(#filter1_f_479_19186)">
                            <rect x="300.807" y="233.045" width="22.1427" height="183.534" transform="rotate(-16.0921 300.807 233.045)" fill="#EC5E41" />
                        </g>
                        <g filter="url(#filter2_f_479_19186)">
                            <rect x="250.848" y="233.045" width="22.1427" height="183.534" transform="rotate(-16.0921 250.848 233.045)" fill="#EC5E41" />
                        </g>
                        <g filter="url(#filter3_f_479_19186)">
                            <rect x="491.129" y="197.359" width="22.1427" height="183.534" transform="rotate(-16.0921 491.129 197.359)" fill="#EC5E41" />
                        </g>
                        <g filter="url(#filter4_f_479_19186)">
                            <rect x="361.473" y="272.299" width="22.1427" height="220.36" transform="rotate(-16.0921 361.473 272.299)" fill="#E93D82" />
                        </g>
                        <g filter="url(#filter5_f_479_19186)">
                            <rect x="135.465" y="177.138" width="22.1427" height="220.36" transform="rotate(-16.0921 135.465 177.138)" fill="#E93D82" />
                        </g>
                        <path d="M94 190.5H250" stroke="#505050" strokeDasharray="4 4" />
                        <circle cx="52" cy="190" r="27.5" fill="#082636" />
                        <circle cx="52" cy="190" r="27.5" fill="url(#paint0_radial_479_19186)" />
                        <circle cx="52" cy="190" r="27.5" fill="url(#paint1_radial_479_19186)" />
                        <circle cx="52" cy="190" r="27.5" className="stroke-gray-light-2 dark:stroke-gray-dark-2" />
                        <g clipPath="url(#clip0_479_19186)">
                            <path d="M51.9984 195.34L60.5922 190.26L51.9984 176L43.4043 190.26L51.9984 195.34Z" className="fill-gray-light-12" />
                            <path d="M51.9984 204L60.5974 191.889L51.9984 196.966L43.4043 191.889L51.9984 204Z" className="fill-gray-light-12" />
                        </g>
                        <circle cx="292" cy="190" r="27.5" fill="#090909" />
                        <circle cx="292" cy="190" r="27.5" fill="url(#paint2_radial_479_19186)" />
                        <circle cx="292" cy="190" r="27.5" fill="url(#paint3_radial_479_19186)" />
                        <circle cx="292" cy="190" r="27.5" className="stroke-gray-light-2 dark:stroke-gray-dark-2" />
                        <path
                            d="M291.079 203H293.476L293.496 200.654C297.894 200.319 300.443 197.983 300.453 194.459C300.443 190.995 297.833 189.157 294.217 188.345L293.618 188.202L293.659 183.124C295.009 183.439 295.832 184.302 295.954 185.582H300.169C300.118 182.22 297.609 179.813 293.699 179.387L293.72 177H291.323L291.302 179.366C287.331 179.752 284.528 182.149 284.548 185.612C284.538 188.68 286.702 190.437 290.216 191.28L291.191 191.523L291.14 196.896C289.484 196.581 288.367 195.566 288.255 193.87H284C284.102 197.973 286.793 200.268 291.099 200.644L291.079 203ZM293.537 196.896L293.577 192.153C295.152 192.651 296.005 193.291 296.015 194.448C296.005 195.677 295.07 196.591 293.537 196.896ZM291.221 187.583C289.952 187.146 289.037 186.486 289.058 185.318C289.058 184.231 289.83 183.388 291.262 183.094L291.221 187.583Z"
                            fill="#111111"
                        />
                        <circle opacity="0.1" cx="172.5" cy="190.5" r="60" className="stroke-gray-light-12 dark:stroke-gray-dark-12" />
                        <circle opacity="0.1" cx="172" cy="191" r="40.5" className="stroke-gray-light-12 dark:stroke-gray-dark-12" />
                        <rect x="152" y="171" width="40" height="40" rx="20" className="fill-gray-light-12 dark:fill-gray-dark-12" />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M175.932 188.827C180.458 189.506 182.721 189.846 182.806 190.62C182.815 190.701 182.815 190.783 182.806 190.864C182.721 191.638 180.458 191.977 175.932 192.657L175.932 192.657C175.368 192.741 175.087 192.784 174.885 192.973C174.861 192.996 174.838 193.02 174.816 193.045C174.634 193.257 174.577 193.568 174.465 194.19L174.18 195.768V195.768C173.491 199.579 173.147 201.484 172.406 201.484C171.666 201.484 171.321 199.579 170.633 195.768H170.633L170.348 194.19C170.235 193.568 170.179 193.257 169.996 193.045C169.975 193.02 169.951 192.996 169.927 192.973C169.726 192.784 169.444 192.741 168.88 192.657H168.88C164.354 191.977 162.091 191.638 162.007 190.864C161.998 190.783 161.998 190.701 162.007 190.62C162.091 189.846 164.354 189.506 168.88 188.827L168.881 188.827C169.444 188.742 169.726 188.7 169.927 188.511C169.951 188.488 169.975 188.464 169.996 188.439C170.179 188.227 170.235 187.916 170.348 187.294L170.633 185.716L170.633 185.715C171.321 181.905 171.666 180 172.406 180C173.147 180 173.491 181.905 174.18 185.716L174.465 187.294C174.577 187.916 174.634 188.227 174.816 188.439C174.838 188.464 174.861 188.488 174.885 188.511C175.087 188.7 175.368 188.742 175.932 188.827L175.932 188.827Z"
                            className="fill-white dark:fill-black"
                        />
                        <defs>
                            <filter id="filter0_f_479_19186" x="-35.6229" y="134.329" width="389.326" height="514.294" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19186" />
                            </filter>
                            <filter id="filter1_f_479_19186" x="145.184" y="71.2843" width="383.392" height="493.726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19186" />
                            </filter>
                            <filter id="filter2_f_479_19186" x="95.2247" y="71.2843" width="383.392" height="493.726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19186" />
                            </filter>
                            <filter id="filter3_f_479_19186" x="335.506" y="35.5988" width="383.392" height="493.726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19186" />
                            </filter>
                            <filter id="filter4_f_479_19186" x="205.85" y="110.538" width="393.601" height="529.11" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19186" />
                            </filter>
                            <filter id="filter5_f_479_19186" x="-20.1581" y="15.3771" width="393.601" height="529.11" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="77.8115" result="effect1_foregroundBlur_479_19186" />
                            </filter>
                            <radialGradient id="paint0_radial_479_19186" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-4.00001 147.857) rotate(46.5376) scale(207.055 159.018)">
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
                            <radialGradient id="paint1_radial_479_19186" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-4.00001 147.857) rotate(46.5376) scale(207.055 159.018)">
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
                            <radialGradient id="paint2_radial_479_19186" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(236 147.857) rotate(46.5376) scale(207.055 159.018)">
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
                            <radialGradient id="paint3_radial_479_19186" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(236 147.857) rotate(46.5376) scale(207.055 159.018)">
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
                            <clipPath id="clip0_479_19186">
                                <rect width="28" height="28" fill="white" transform="translate(38 176)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default FeatureCardOneColumn;
