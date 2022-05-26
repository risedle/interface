import { ButtonHTMLAttributes, FunctionComponent, HTMLProps } from "react";

type ButtonSecondaryProps = {
    size?: "md" | "lg" | "xl";
    type?: "default" | "fab" | "square";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size" | "type">;

const ButtonSecondary: FunctionComponent<ButtonSecondaryProps> = ({ onClick, size = "md", type = "default", children, className, ...restProps }) => {
    let extraClass = "";
    switch (size) {
        case "md":
            extraClass = "px-4 heading-h7";
            break;
        case "lg":
            extraClass = "px-5 heading-h6";
            break;
        case "xl":
            extraClass = "px-6 heading-h6";
            break;
    }
    return (
        <button className={`flex flex-row items-center justify-center gap-2 ${extraClass} bg-light-neutral-subtle/10 py-3 text-dark-neutral-primary ${type == "square" ? "rounded-lg" : "rounded-full"} ${className}`} onClick={onClick} {...restProps}>
            {children}
        </button>
    );
};

export default ButtonSecondary;
