import type { FunctionComponent } from "react";

/**
 * LogoV2Props is a React Component properties that passed to React Component LogoV2
 */
type LogoV2Props = {};

/**
 * LogoV2 is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const LogoV2: FunctionComponent<LogoV2Props> = ({}) => {
    return (
        <div className="flex h-[24px] w-[83px] flex-row items-center gap-[7px]">
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block fill-dark-neutral-primary">
                <path
                    d="M10.088 1.12172C9.95522 0.345231 10.8612 -0.17723 11.4681 0.325887L13.76 2.22605C15.5119 3.67849 17.8116 4.29398 20.0558 3.91106L22.9919 3.4101C23.7692 3.27745 24.2923 4.18239 23.7886 4.78852L21.8863 7.07779C20.4322 8.82764 19.816 11.1246 20.1993 13.3663L20.7008 16.299C20.8337 17.0755 19.9277 17.5979 19.3208 17.0948L17.7694 15.8086C15.6062 14.0151 12.6441 13.5229 10.0162 14.5203L1.18373 17.8726C0.282465 18.2147 -0.40213 17.0304 0.345085 16.4218L7.66786 10.4576C9.84662 8.6831 10.9009 5.87483 10.4276 3.1069L10.088 1.12172Z"
                    fill="#FCFDFF"
                />
            </svg>
            <p className="heading-h6 text-dark-neutral-primary">Risedle</p>
        </div>
    );
};

export default LogoV2;
