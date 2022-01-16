import type { FunctionComponent } from "react";
import Link from "next/link";

/**
 * ButtonConnectWalletGradientProps is a React Component properties that passed to React Component ButtonConnectWalletGradient
 */
type ButtonConnectWalletGradientProps = {};

/**
 * ButtonConnectWalletGradient is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonConnectWalletGradient: FunctionComponent<ButtonConnectWalletGradientProps> =
    ({}) => {
        return (
            <Link href="/app">
                <a
                    className="text-gray-light-12 font-inter text-xs font-semibold py-3 px-4 rounded-full leading-none inline-block"
                    style={{
                        background:
                            "radial-gradient(91.36% 358.74% at 12.29% 100%, #C9BBFF 0%, #B2ECFF 30.08%, #FFC1F9 60.28%, #FFF5C1 100%)",
                        boxShadow:
                            "-20px -24px 54px rgba(255, 169, 231, 0.08), 0px 6px 54px rgba(186, 243, 255, 0.16)",
                    }}
                >
                    Connect Wallet
                </a>
            </Link>
        );
    };

export default ButtonConnectWalletGradient;
