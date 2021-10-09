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
        <p className="text-grey font-semibold text-2xl m-0 leading-normal align-middle">
            <span className="inline-block align-middle mr-2">AUM</span>
            <span className="inline-block align-middle">{text}</span>
        </p>
    );
};

export default AUMLoaded;
