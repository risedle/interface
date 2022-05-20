import { FunctionComponent } from "react";

/**
 * ButtonSecondaryProps is a React Component properties that passed to React Component ButtonSecondary
 */

type ButtonSecondaryProps = {
    onClick?: () => void;
    size: "md" | "lg" | "xl";
    type: "default" | "fab" | "square";
};

/**
 * ButtonSecondary is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonSecondary: FunctionComponent<ButtonSecondaryProps> = ({ onClick, size, type, children }) => {
    let extraClass = "";
    switch (size) {
        case "md":
            extraClass = "px-[16px] heading-h7";
            break;
        case "lg":
            extraClass = "px-[20px] heading-h6";
            break;
        case "xl":
            extraClass = "px-[24px] heading-h6";
            break;
    }
    return (
        <button className={`flex flex-row items-center justify-center gap-[8px] ${extraClass} bg-light-neutral-subtle/10 py-[12px] text-dark-neutral-primary ${type == "square" ? "rounded-[8px]" : "rounded-full"}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonSecondary;
