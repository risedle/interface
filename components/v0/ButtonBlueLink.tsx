import type { FunctionComponent } from "react";
import Link from "next/link";

/**
 * ButtonBlueLinkProps is a React Component properties that passed to React
 * Component Button
 */
type ButtonBlueLinkProps = {
    title: string;
    url: string;
};

/**
 * ButtonBlueLink is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonBlueLink: FunctionComponent<ButtonBlueLinkProps> = ({ title, url }) => {
    const tailwind = ["text-white", "font-extrabold", "bg-blue", "px-6", "text-sm", "rounded-full", "hover:opacity-95", "transform active:scale-95", "transition duration-300 ease-in-out", "inline-block", "align-middle", "text-center"];
    return (
        <Link href={url}>
            <a className={tailwind.join(" ")} style={{ height: "40px", width: "120px", lineHeight: "40px" }}>
                {title}
            </a>
        </Link>
    );
};

export default ButtonBlueLink;
