import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

/**
 * ButtonTertiaryProps is a React Component properties that passed to React Component ButtonTertiary
 */
type ButtonTertiaryProps = {
    onClick?: () => void;
    full?: boolean; // if full is true, then the button will have w-full class
};

/**
 * ButtonTertiary is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonTertiary: FunctionComponent<ButtonTertiaryProps> = ({ onClick, full, children }) => {
    return (
        <button className={`button basic px-[24px] py-[12px] ${full ? "w-full" : ""}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonTertiary;
