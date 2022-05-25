import { FunctionComponent } from "react";

/**
 * ButtonPrimaryProps is a React Component properties that passed to React Component ButtonPrimary
 */

type ButtonPrimaryProps = {
    onClick?: () => void;
    size: "md" | "lg" | "xl";
    type: "default" | "fab" | "square";
    disabled?: boolean;
};

/**
 * ButtonPrimary is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonPrimary: FunctionComponent<ButtonPrimaryProps> = ({ onClick, size, type, children, disabled }) => {
    let extraClass = "";
    switch (size) {
        case "md":
            extraClass = "px-4 h-10 heading-h7";
            break;
        case "lg":
            extraClass = "px-5 h-12 heading-h6";
            break;
        case "xl":
            extraClass = "px-6 h-14 heading-h6";
            break;
    }
    return (
        <button className={`flex flex-row items-center justify-center gap-2 active:scale-90 ${extraClass} bg-dark-neutral-primary text-dark-background-default transition ease-out ${type == "square" ? "rounded-lg" : "rounded-full"} ${disabled ? "bg-dark-neutral-primary opacity-40" : "hover:bg-dark-neutral-soft"}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default ButtonPrimary;
