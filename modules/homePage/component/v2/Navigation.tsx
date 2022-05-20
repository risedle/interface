import type { FunctionComponent } from "react";
import ButtonSecondary from "../../../../uikit/buttonV2/ButtonSecondary";
import LogoV2 from "../../../../uikit/layout/LogoV2";

/**
 * NavigationProps is a React Component properties that passed to React Component Navigation
 */
type NavigationProps = {};

/**
 * Navigation is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Navigation: FunctionComponent<NavigationProps> = ({}) => {
    return (
        <div className="flex-column flex items-center gap-11 py-2 px-[192px]">
            <LogoV2 />
            <a className="paragraph-s text-dark-neutral-medium">Docs</a>
            <a className="paragraph-s text-dark-neutral-medium">Community</a>

            {/* Gap Filler */}
            <div className="grow" />

            {/* Action Wrapper */}
            <div className="flex flex-row items-start gap-2">
                {/* Search Bar */}
                <div className="flex flex-row items-center gap-[90px] rounded-full bg-light-neutral-subtle/10 p-2 pl-4">
                    {/* Input Box Wrapper */}
                    <div className="flex flex-row items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-light-neutral-subtle">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6 2.00003C4.93913 2.00003 3.92172 2.42146 3.17157 3.17161C2.42143 3.92175 2 4.93917 2 6.00003C2 7.0609 2.42143 8.07832 3.17157 8.82846C3.92172 9.57861 4.93913 10 6 10C7.06087 10 8.07828 9.57861 8.82843 8.82846C9.57857 8.07832 10 7.0609 10 6.00003C10 4.93917 9.57857 3.92175 8.82843 3.17161C8.07828 2.42146 7.06087 2.00003 6 2.00003ZM1.13461e-07 6.00003C-0.00012039 5.05574 0.222642 4.12475 0.650171 3.28278C1.0777 2.4408 1.69792 1.71163 2.4604 1.15456C3.22287 0.597487 4.10606 0.228246 5.03815 0.0768669C5.97023 -0.0745122 6.92488 -0.00375491 7.82446 0.283384C8.72404 0.570523 9.54315 1.06594 10.2152 1.72933C10.8872 2.39272 11.3931 3.20537 11.6919 4.10117C11.9906 4.99697 12.0737 5.95063 11.9343 6.88459C11.795 7.81855 11.4372 8.70643 10.89 9.47603L15.707 14.293C15.8892 14.4816 15.99 14.7342 15.9877 14.9964C15.9854 15.2586 15.8802 15.5094 15.6948 15.6949C15.5094 15.8803 15.2586 15.9854 14.9964 15.9877C14.7342 15.99 14.4816 15.8892 14.293 15.707L9.477 10.891C8.57936 11.5293 7.52335 11.9082 6.42468 11.9862C5.326 12.0641 4.22707 11.8381 3.2483 11.333C2.26953 10.8279 1.44869 10.0631 0.875723 9.12239C0.30276 8.18171 -0.000214051 7.10147 1.13461e-07 6.00003Z"
                                fill="#EEF0FC"
                            />
                        </svg>
                        <input type="text" placeholder="Search token name or symbol..." className="paragraph-s bg-transparent text-dark-neutral-primary outline-none" />
                    </div>

                    {/* Command + / Wrapper */}
                    <div className="flex flex-row items-start gap-1">
                        <div className="flex h-6 w-6 items-center justify-center gap-2.5 rounded-lg bg-dark-background-elevated p-2">
                            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="heading-h7 fill-dark-neutral-soft">
                                <path
                                    d="M2.68555 11.2256C3.93652 11.2256 4.94141 10.2139 4.94141 8.97656V7.94434H6.45215V8.97656C6.45215 10.2139 7.46387 11.2256 8.70117 11.2256C9.93848 11.2256 10.9502 10.2139 10.9502 8.97656C10.9502 7.73242 9.93848 6.7207 8.70117 6.7207H7.68945V5.20312H8.70117C9.93848 5.2168 10.9502 4.19824 10.9502 2.96094C10.9502 1.72363 9.93848 0.711914 8.70117 0.711914C7.46387 0.711914 6.45215 1.72363 6.45215 2.96094V3.97949H4.94141V2.96094C4.94141 1.72363 3.93652 0.711914 2.68555 0.711914C1.45508 0.711914 0.443359 1.72363 0.443359 2.96094C0.443359 4.19824 1.45508 5.2168 2.68555 5.20312H3.71777V6.7207H2.68555C1.45508 6.7207 0.443359 7.73242 0.443359 8.97656C0.443359 10.2139 1.45508 11.2256 2.68555 11.2256ZM2.68555 9.98828C2.125 9.98828 1.67383 9.53711 1.67383 8.97656C1.67383 8.40918 2.125 7.95801 2.68555 7.94434H3.71777V8.97656C3.71094 9.53711 3.25293 9.98828 2.68555 9.98828ZM2.68555 3.97949C2.125 3.97949 1.67383 3.52832 1.67383 2.96094C1.67383 2.40039 2.125 1.94922 2.68555 1.94922C3.25293 1.94922 3.71094 2.40039 3.71777 2.96094V3.97949H2.68555ZM8.70117 9.98828C8.14062 9.98828 7.68262 9.53711 7.68945 8.97656V7.94434H8.70117C9.26855 7.95801 9.71973 8.40918 9.71973 8.97656C9.71973 9.53711 9.26855 9.98828 8.70117 9.98828ZM7.68945 3.97949V2.96094C7.68262 2.40039 8.14062 1.94922 8.70117 1.94922C9.26855 1.94922 9.71973 2.40039 9.71973 2.96094C9.71973 3.52832 9.26855 3.97949 8.70117 3.97949H7.68945ZM4.94141 6.7207V5.20312H6.45215V6.7207H4.94141Z"
                                    fill="#8E93AF"
                                />
                            </svg>
                        </div>
                        <div className="flex h-6 w-6 items-center justify-center gap-2.5 rounded-lg bg-dark-background-elevated p-2">
                            <svg width="5" height="13" viewBox="0 0 5 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="heading-h7 fill-dark-neutral-soft">
                                <path d="M4.94238 0.458984H3.38379L0.143555 12.5176H1.70215L4.94238 0.458984Z" fill="#8E93AF" />
                            </svg>
                        </div>
                    </div>
                </div>

                <ButtonSecondary type="default" size="md">
                    Launch Risedle
                </ButtonSecondary>
            </div>
        </div>
    );
};

export default Navigation;
