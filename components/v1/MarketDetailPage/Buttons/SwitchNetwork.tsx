import type { FunctionComponent } from "react";

/**
 * ButtonSwitchNetworkProps is a React Component properties that passed to React Component ButtonSwitchNetwork
 */
type ButtonSwitchNetworkProps = { onClick: () => void; chainName: string };

/**
 * ButtonSwitchNetwork is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonSwitchNetwork: FunctionComponent<ButtonSwitchNetworkProps> = ({ onClick, chainName }) => {
    return (
        <button className="inline-block w-full rounded-full border border-gray-light-4 bg-gray-light-2 py-[11px] px-4 text-sm font-semibold leading-4 leading-4 tracking-[-0.02em] text-blue-dark-1 dark:border-gray-dark-4 dark:bg-gray-dark-2 dark:text-blue-light-1" onClick={onClick}>
            <span className="mr-2 inline-block h-[8px] w-[8px] rounded-full bg-red-light-10 shadow-[0px_0px_12px] shadow-red-light-10 dark:bg-red-dark-10 dark:shadow-red-dark-10"></span>
            Switch to {chainName}
        </button>
    );
};

export default ButtonSwitchNetwork;
