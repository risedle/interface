import type { FunctionComponent } from "react";
import Link from "next/link";

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
            <a
                className="font-inter text-sm sm:text-base md:text-lg font-bold py-3 px-12 rounded-full leading-none inline-block"
                style={{
                    background: "radial-gradient(91.36% 358.74% at 12.29% 100%, #C9BBFF 0%, #B2ECFF 30.08%, #FFC1F9 60.28%, #FFF5C1 100%)",
                    boxShadow: "-20px -24px 54px rgba(255, 169, 231, 0.08), 0px 6px 54px rgba(186, 243, 255, 0.16)",
                }}
            >
                Launch Risedle
            </a>
        </Link>
    );
};

export default ButtonLaunchGradient;
