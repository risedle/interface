import type { FunctionComponent } from "react";

/**
 * ButtonMintOrRedeemProps is a React Component properties that passed to React Component ButtonMintOrRedeem
 */
type ButtonMintOrRedeemProps = {};

/**
 * ButtonMintOrRedeem is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonMintOrRedeem: FunctionComponent<ButtonMintOrRedeemProps> = ({}) => {
    return <button className="inline-block flex w-full flex-row items-center justify-center space-x-2 rounded-full border border-blue-light-11 bg-blue-light-10 py-[11px] px-4 text-center text-sm font-semibold leading-4 leading-4 tracking-[-0.02em] text-gray-light-1 dark:border-blue-dark-11 dark:bg-blue-dark-10 dark:text-blue-light-1">Mint or Redeem</button>;
};

export default ButtonMintOrRedeem;
