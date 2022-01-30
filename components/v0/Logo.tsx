import type { FunctionComponent } from "react";
import Link from "next/link";

// Import SVG Logo
import RisedleLogo from "../../public/logo.svg";

/**
 * LogoProps is a React Component properties that passed to React
 * Component Button
 */
type LogoProps = {};

/**
 * Logo is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Logo: FunctionComponent<LogoProps> = ({}) => {
    return (
        <div className="inline-block align-middle">
            <Link href="/">
                <a className="inline-block transform transition duration-300 ease-in-out active:scale-95">
                    <img src={RisedleLogo.src} alt="Risedle" />
                </a>
            </Link>
        </div>
    );
};

export default Logo;
