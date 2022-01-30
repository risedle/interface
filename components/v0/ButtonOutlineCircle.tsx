import type { FunctionComponent } from "react";

/**
 * ButtonOutlineCircleProps is a React Component properties that passed to React
 * Component Button
 */
type ButtonOutlineCircleProps = {
    icon: string;
    onClick?: () => void;
};

/**
 * ButtonOutlineCircle is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonOutlineCircle: FunctionComponent<ButtonOutlineCircleProps> = ({ icon, onClick }) => {
    const tailwind = ["text-white", "font-extrabold", "text-sm", "rounded-full", "flex items-center justify-center", "hover:opacity-95", "transform active:scale-95", "transition duration-300 ease-in-out", "border border-opacity-20 border-white", "hover:border-opacity-30"];
    return (
        <button className={tailwind.join(" ")} onClick={onClick} style={{ height: "40px", width: "40px" }}>
            <img src={icon} alt="" />
        </button>
    );
};

export default ButtonOutlineCircle;
