import type { FunctionComponent } from "react";

/**
 * ButtonCloseProps is a React Component properties that passed to React Component ButtonClose
 */
type ButtonCloseProps = {
    onClick: () => void;
};

/**
 * ButtonClose is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonClose: FunctionComponent<ButtonCloseProps> = ({ onClick }) => {
    return (
        <button className="button basic p-0" onClick={onClick}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-[11px] h-[16px] w-[16px] fill-gray-light-12 dark:fill-gray-dark-12">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                />
            </svg>
        </button>
    );
};

export default ButtonClose;
