import type { FunctionComponent } from "react";

/**
 * ButtonConnectWalletToMintOrRedeemProps is a React Component properties that passed to React Component ButtonConnectWalletToMintOrRedeem
 */
type ButtonConnectWalletToMintOrRedeemProps = {};

/**
 * ButtonConnectWalletToMintOrRedeem is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonConnectWalletToMintOrRedeem: FunctionComponent<ButtonConnectWalletToMintOrRedeemProps> = ({}) => {
    return (
        <button disabled className="bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-0 text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-10 rounded-full cursor-not-allowed w-full py-[11px] dark:py-[12px]">
            Connect wallet to Mint or Redeem
        </button>
    );
};

export default ButtonConnectWalletToMintOrRedeem;
