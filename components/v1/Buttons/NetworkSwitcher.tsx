import type { FunctionComponent } from "react";
import { useRouter } from "next/router";
import * as HoverCard from "@radix-ui/react-hover-card";

import type { Chain } from "wagmi";
import { supportedChains, useWalletContext, customChains } from "../Wallet";
import { chain as Chains } from "wagmi";
import { getChainIconPath } from "../../../utils/getChainIconPath";

import ChevronDownIcon from "../../../uikit/icon/ChevronDownIcon";
import Indicator from "../../../uikit/icon/Indicator";
import toast from "react-hot-toast";
import ToastError from "../../../uikit/toasts/Error";
import ToastSuccess from "../../../uikit/toasts/Success";

/**
 * ButtonNetworkSwitcherProps is a React Component properties that passed to React Component ButtonNetworkSwitcher
 */
type ButtonNetworkSwitcherProps = {};

/**
 * ButtonNetworkSwitcher is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonNetworkSwitcher: FunctionComponent<ButtonNetworkSwitcherProps> = ({}) => {
    const { chain, switchNetwork, account } = useWalletContext();
    const router = useRouter();
    const selectedChain = router.pathname.includes("binance") ? customChains.bsc : Chains.arbitrumOne;

    const switchToNetwork = async (c: Chain) => {
        if (switchNetwork && account) {
            const result = await switchNetwork(c.id);
            if (result.error) {
                toast.remove();
                toast.custom((t) => <ToastError>{result.error.message}</ToastError>);
                return;
            }
            toast.remove();
            toast.custom((t) => <ToastSuccess>Switched Network to {c.name}</ToastSuccess>);
            switch (c.id) {
                case Chains.arbitrumOne.id:
                    router.push("/markets/arbitrum");
                    break;
                case customChains.bsc.id:
                    router.push("/markets/binance");
                    break;
            }
        } else if (!switchNetwork && !account) {
            switch (c.id) {
                case Chains.arbitrumOne.id:
                    router.push("/markets/arbitrum");
                    break;
                case customChains.bsc.id:
                    router.push("/markets/binance");
                    break;
            }
        } else {
            toast.remove();
            toast.custom((t) => <ToastError>Cannot switch network automatically in WalletConnect. Please change network directly from your wallet.</ToastError>);
            return;
        }
        return;
    };
    return (
        <HoverCard.Root openDelay={100} closeDelay={100}>
            <HoverCard.Trigger className="button basic flex items-center gap-2 px-6">
                {/* If account connected and connected network is wrong, show unknown network */}
                {account && chain.chain.id !== selectedChain.id ? (
                    <>
                        <Indicator color="red" />
                        <p>Unknown Network</p>
                    </>
                ) : (
                    <>
                        <img src={getChainIconPath(selectedChain.id)} alt={selectedChain.name} className="h-[18px]" />
                        <p>{selectedChain.id == Chains.arbitrumOne.id ? "Arbitrum" : selectedChain.name}</p>
                    </>
                )}
                <ChevronDownIcon />
            </HoverCard.Trigger>

            <HoverCard.Content side="bottom" sideOffset={12} align="end" className="flex w-[161px] flex-col items-start rounded-lg border border-gray-light-3/40 bg-gray-light-2 p-2 dark:border-gray-dark-3/40 dark:bg-gray-dark-2">
                <p className="gap-2 p-2 text-[10px] font-normal leading-4 text-gray-light-9 dark:text-gray-dark-9">Select Network</p>
                {supportedChains.map((c) => {
                    return (
                        <button
                            key={c.id}
                            onClick={async () => {
                                await switchToNetwork(c);
                            }}
                            className="flex w-full flex-row items-center justify-between gap-2 rounded-lg p-2 text-sm leading-4 text-gray-light-12 transition ease-out hover:bg-gray-light-3 dark:text-gray-dark-12 hover:dark:bg-gray-dark-3"
                        >
                            <div className="flex flex-row items-center gap-2">
                                {c.id === Chains.arbitrumOne.id ? "Arbitrum" : c.name}
                                {/* If connected to an account, indicator follows the connected chain */}
                                {chain.chain.id === c.id && account && <Indicator color="blue" />}
                                {/* If not connected to an account, indicator follows the selected market (based on url) */}
                                {selectedChain.id === c.id && !account && <Indicator color="blue" />}
                            </div>
                            <img src={getChainIconPath(c.id)} alt={c.name} />
                        </button>
                    );
                })}
            </HoverCard.Content>
        </HoverCard.Root>
    );
};

export default ButtonNetworkSwitcher;
