import type { FunctionComponent } from "react";
/**
 * AUMLoadedProps is a React Component properties that passed to React
 * Component Button
 */
type AUMLoadedProps = {
    text: string;
};

/**
 * AUMLoaded is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const AUMLoaded: FunctionComponent<AUMLoadedProps> = ({ text }) => {
    return (
        <p className="m-0 align-middle text-2xl font-semibold leading-normal text-grey">
            <span className="mr-2 inline-block align-middle">AUM</span>
            <span className="inline-block align-middle">{text}</span>
        </p>
    );
};

export default AUMLoaded;
