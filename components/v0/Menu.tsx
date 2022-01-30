import type { FunctionComponent } from "react";
import Link from "next/link";

/**
 * MenuProps is a React Component properties that passed to React
 * Component Button
 */
type MenuProps = {
    active?: string;
};

/**
 * Menu is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Menu: FunctionComponent<MenuProps> = ({ active }) => {
    const text = "font-inter font-extrabold text-white";
    const hover = "hover:text-opacity-100";
    const transition = "transition duration-300 ease-in-out";
    const classNames = [text, hover, transition].join(" ");

    // Mark the active menu
    let investClassNames = classNames;
    let lendClassNames = classNames;
    if (active === "invest") {
        investClassNames += " text-opacity-100";
    } else {
        investClassNames += " text-opacity-50";
    }
    if (active === "lend") {
        lendClassNames += " text-opacity-100";
    } else {
        lendClassNames += " text-opacity-50";
    }

    return (
        <div className="gap flex flex-row items-center gap-x-6">
            <Link href="/products">
                <a className={investClassNames} style={{ fontSize: "15px", lineHeight: "21px" }}>
                    Products
                </a>
            </Link>
            <Link href="/vault">
                <a className={lendClassNames} style={{ fontSize: "15px", lineHeight: "21px" }}>
                    Vault
                </a>
            </Link>
        </div>
    );
};

export default Menu;
