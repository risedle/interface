import type { FunctionComponent } from "react";

type EthriseGradientsProps = {
    className?: string;
};
type AvaxriseGradientsProps = {
    className?: string;
};
type GohmriseGradientsProps = {
    className?: string;
};

export const EthriseGradients: FunctionComponent<EthriseGradientsProps> = ({ className }) => {
    return (
        <div className={`${className}`}>
            <svg width="1003" height="956" viewBox="0 0 1003 956" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_1094_18908)">
                    <ellipse cx="501.739" cy="477.77" rx="169.619" ry="261.524" transform="rotate(-52.5014 501.739 477.77)" fill="url(#paint0_radial_1094_18908)" />
                </g>
                <defs>
                    <filter id="filter0_f_1094_18908" x="0.930603" y="0.310059" width="1001.62" height="954.921" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="134.5" result="effect1_foregroundBlur_1094_18908" />
                    </filter>
                    <radialGradient id="paint0_radial_1094_18908" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(403.051 354.141) rotate(56.9479) scale(614.847 442.223)">
                        <stop stopColor="#F9349E" />
                        <stop offset="0.791726" stopColor="#CAB2FF" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
};

export const GohmriseGradients: FunctionComponent<GohmriseGradientsProps> = ({ className }) => {
    return (
        <div className={`${className}`}>
            <svg width="1436" height="1084" viewBox="0 0 1436 1084" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.4" filter="url(#filter0_f_1094_18909)">
                    <rect x="228" y="664.984" width="447" height="906" rx="216" transform="rotate(-77.8486 228 664.984)" fill="url(#paint0_radial_1094_18909)" />
                </g>
                <defs>
                    <filter id="filter0_f_1094_18909" x="0.582581" y="0.582031" width="1434.63" height="1082.53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="134" result="effect1_foregroundBlur_1094_18909" />
                    </filter>
                    <radialGradient id="paint0_radial_1094_18909" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(309.273 903.839) rotate(68.1557) scale(851.856 506.674)">
                        <stop offset="0.160122" stopColor="#FFA439" />
                        <stop offset="1" stopColor="#F12222" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
};

export const AvaxriseGradients: FunctionComponent<AvaxriseGradientsProps> = ({ className }) => {
    return (
        <div className={`${className}`}>
            <svg width="604" height="538" viewBox="0 0 604 538" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5" filter="url(#filter0_f_1094_18910)">
                    <rect x="73" y="388.436" width="321.318" height="404.419" rx="160.659" transform="rotate(-79.0196 73 388.436)" fill="url(#paint0_radial_1094_18910)" />
                </g>
                <defs>
                    <filter id="filter0_f_1094_18910" x="0.630005" y="0.629883" width="602.958" height="537.207" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_1094_18910" />
                    </filter>
                    <radialGradient id="paint0_radial_1094_18910" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(73 424.282) rotate(66.3392) scale(682.373 466.623)">
                        <stop stopColor="#F24040" />
                        <stop offset="0.932353" stopColor="#FFA06B" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
};
