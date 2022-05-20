import type { FunctionComponent } from "react";

/**
 * BackgroundGradientProps is a React Component properties that passed to React Component BackgroundGradient
 */
type BackgroundGradientProps = {};

/**
 * BackgroundGradient is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const BackgroundGradient: FunctionComponent<BackgroundGradientProps> = ({}) => {
    return (
        <>
            <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 sm:-top-1/2">
                <svg className="stroke-black dark:stroke-white" width="679" height="679" viewBox="0 0 679 679" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="130.173" />
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="175.19" />
                        <circle opacity="0.05" cx="339.5" cy="339.5" r="227.709" />
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="339" />
                    </g>
                </svg>
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <svg width="543" height="463" viewBox="0 0 543 463" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_733_108850)">
                        <rect x="126" y="208.087" width="14.5306" height="134.487" transform="rotate(-16.0921 126 208.087)" fill="#5FD4F4" />
                    </g>
                    <g filter="url(#filter1_f_733_108850)">
                        <rect x="244.65" y="166.715" width="14.5306" height="120.439" transform="rotate(-16.0921 244.65 166.715)" fill="#946800" />
                    </g>
                    <g filter="url(#filter2_f_733_108850)">
                        <rect x="211.865" y="166.715" width="14.5306" height="120.439" transform="rotate(-16.0921 211.865 166.715)" fill="#946800" />
                    </g>
                    <g filter="url(#filter3_f_733_108850)">
                        <rect x="369.544" y="143.297" width="14.5306" height="120.439" transform="rotate(-16.0921 369.544 143.297)" fill="#946800" />
                    </g>
                    <g filter="url(#filter4_f_733_108850)">
                        <rect x="284.46" y="192.475" width="14.5306" height="144.606" transform="rotate(-16.0921 284.46 192.475)" fill="#F4C6DB" />
                    </g>
                    <g filter="url(#filter5_f_733_108850)">
                        <rect x="136.148" y="130.028" width="14.5306" height="144.606" transform="rotate(-16.0921 136.148 130.028)" fill="#F4C6DB" />
                    </g>
                    <defs>
                        <filter id="filter0_f_733_108850" x="0.379997" y="78.4391" width="302.479" height="384.486" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                        <filter id="filter1_f_733_108850" x="119.03" y="37.0675" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                        <filter id="filter2_f_733_108850" x="86.245" y="37.0675" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                        <filter id="filter3_f_733_108850" x="243.924" y="13.6495" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                        <filter id="filter4_f_733_108850" x="158.84" y="62.8273" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                        <filter id="filter5_f_733_108850" x="10.5279" y="0.379997" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </>
    );
};

export default BackgroundGradient;
