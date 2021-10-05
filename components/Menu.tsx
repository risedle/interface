import type { FunctionComponent } from "react";
import { Fragment } from "react";
import Link from "next/link";

/**
 * MenuProps is a React Component properties that passed to React
 * Component Button
 */
type MenuProps = {};

/**
 * Menu is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Menu: FunctionComponent<MenuProps> = ({}) => {
    const text = "font-inter font-extrabold text-white text-opacity-50";
    const hover = "hover:text-opacity-100";
    const transition = "transition duration-300 ease-in-out";
    const classNames = [text, hover, transition].join(" ");
    return (
        <Fragment>
            <div className="flex flex-row gap gap-x-6 items-center">
                <Link href="/">
                    <a
                        className={classNames}
                        style={{ fontSize: "15px", lineHeight: "21px" }}
                    >
                        Invest
                    </a>
                </Link>
                <Link href="/earn">
                    <a
                        className={classNames}
                        style={{ fontSize: "15px", lineHeight: "21px" }}
                    >
                        Lend
                    </a>
                </Link>
            </div>
        </Fragment>
    );
};

export default Menu;
