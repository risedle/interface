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
            <a className="button gradient inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base">Launch Risedle</a>
        </Link>
    );
};

export default ButtonLaunchGradient;
