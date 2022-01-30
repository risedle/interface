import type { FunctionComponent } from "react";
/**
 * ButtonGreyProps is a React Component properties that passed to React
 * Component Button
 */
type ButtonGreyProps = {
    onClick?: () => void;
};

/**
 * ButtonGrey is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonGrey: FunctionComponent<ButtonGreyProps> = ({ onClick, children }) => {
    const tailwind = ["text-grey", "font-extrabold", "bg-white", "bg-opacity-8", "px-6", "text-sm", "rounded-full", "transform active:scale-95", "transition duration-300 ease-in-out"];
    return (
        <button className={tailwind.join(" ")} onClick={onClick} style={{ lineHeight: "40px" }}>
            {children}
        </button>
    );
};

export default ButtonGrey;
