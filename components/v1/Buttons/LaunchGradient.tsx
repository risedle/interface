import Link from "next/link";
import type { FunctionComponent } from "react";

/**
 * ButtonLaunchGradientProps is a React Component properties that passed to React Component ButtonLaunchGradient
 */
type ButtonLaunchGradientProps = {};

/**
 * ButtonLaunchGradient is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonLaunchGradient: FunctionComponent<ButtonLaunchGradientProps> = ({}) => {
    return (
        <Link href="/markets">
            <a className="button font-inter text-sm sm:text-base text-gray-50 dark:text-gray-900 md:text-base font-bold py-3 px-8 rounded-full leading-none inline-block bg-[length:300%_300%] tracking-tight  bg-center hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 gradient">Launch Risedle</a>
        </Link>
    );
};

export default ButtonLaunchGradient;
