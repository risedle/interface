import type { FunctionComponent } from "react";

/**
 * BackgroundCircleProps is a React Component properties that passed to React Component BackgroundCircle
 */
type BackgroundCircleProps = {};

/**
 * BackgroundCircle is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const BackgroundCircle: FunctionComponent<BackgroundCircleProps> = ({}) => {
    return (
        <div className="absolute top-0 left-1/2 -translate-y-2/3 -translate-x-1/2">
            <svg className="stroke-black dark:stroke-white" width="679" height="679" viewBox="0 0 679 679" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                    <circle opacity="0.1" cx="339.5" cy="339.5" r="130.173" />
                    <circle opacity="0.1" cx="339.5" cy="339.5" r="175.19" />
                    <circle opacity="0.05" cx="339.5" cy="339.5" r="227.709" />
                    <circle opacity="0.1" cx="339.5" cy="339.5" r="339" />
                </g>
            </svg>
        </div>
    );
};

export default BackgroundCircle;
