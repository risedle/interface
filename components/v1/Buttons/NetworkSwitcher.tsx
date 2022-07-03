import type { FunctionComponent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";

import type { Chain } from "wagmi";
import { supportedChains, useWalletContext, customChains } from "../Wallet";
import { chain as Chains } from "wagmi";
import { getChainIconPath } from "../../../utils/getChainIconPath";

import RisedleLinks from "../../../utils/links";
import ButtonClose from "./Close";
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
    // Read global states
    const { account, chain, switchNetwork } = useWalletContext();
    const router = useRouter();

    // Local state
    const [isOpen, setIsOpen] = useState(false);
    const selectedChain = router.pathname.includes("binance") ? customChains.bsc : Chains.arbitrumOne;

    const switchToNetwork = async (c: Chain) => {
        if (switchNetwork) {
            const result = await switchNetwork(c.id);
            if (result.error) {
                toast.remove();
                toast.custom((t) => <ToastError>{result.error.message}</ToastError>);
                return;
            }
            toast.remove();
            toast.custom((t) => <ToastSuccess>Switched to {c.name}</ToastSuccess>);
            switch (c.id) {
                case Chains.arbitrumOne.id:
                    router.push("/arbitrum/markets");
                    break;
                case customChains.bsc.id:
                    router.push("/binance/markets");
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
        <>
            <Dialog.Root open={isOpen}>
                <Dialog.Trigger
                    className="button basic p-0"
                    onClick={() => {
                        if (!account) {
                            toast.remove();
                            toast.custom((t) => <ToastError>Please connect your wallet first</ToastError>);
                            return;
                        }
                        setIsOpen(true);
                    }}
                >
                    <img src={getChainIconPath(selectedChain.id)} alt={selectedChain.name} className="m-[11px] h-[16px] w-[16px]" />
                </Dialog.Trigger>

                <Dialog.Overlay className="fixed inset-0 z-10 bg-gray-dark-1/60 backdrop-blur dark:bg-black/60" />

                <Dialog.Content className="fixed inset-0 z-20 overflow-y-auto" asChild onPointerDownOutside={() => setIsOpen(false)} onInteractOutside={() => setIsOpen(false)}>
                    <div className="flex min-h-screen items-center justify-center">
                        <div className="relative mx-auto w-[342px] rounded-[24px] border border-gray-light-3 bg-gray-light-1 dark:border-gray-dark-3 dark:bg-gray-dark-1">
                            <Dialog.Title className="m-0 flex flex-row items-center justify-between border-b border-dashed border-gray-light-3 px-4 py-4 dark:border-gray-dark-3">
                                <span className="grow pl-[40px] text-center text-base font-bold leading-none text-gray-light-12 dark:text-gray-dark-12">Switch a Network</span>
                                <Dialog.Close asChild>
                                    <ButtonClose onClick={() => setIsOpen(false)} />
                                </Dialog.Close>
                            </Dialog.Title>
                            <Dialog.Description>
                                <div className="flex max-w-[342px] flex-col space-y-2 p-4">
                                    {supportedChains.map((c) => {
                                        return (
                                            <button
                                                className="m-0 flex w-full flex-row items-center space-x-4 rounded-[12px] border border-gray-light-5 bg-gray-light-2 py-[11px] px-[11px] text-left dark:border-gray-dark-5 dark:bg-gray-dark-2"
                                                onClick={async () => {
                                                    await switchToNetwork(c);
                                                    setIsOpen(false);
                                                }}
                                                key={c.id}
                                            >
                                                <img src={getChainIconPath(c.id)} alt={c.name} className="h-[32px] w-[32px]" />
                                                <span className="text-sm font-semibold leading-4 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12">{c.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="m-0 border-t border-dashed border-gray-light-3 p-4 text-center dark:border-gray-dark-3">
                                    <p className="leading-1 text-xs text-gray-light-11 dark:text-gray-dark-11">
                                        Don&apos;t see you network? Chat us on{" "}
                                        <a className="text-gray-light-12 underline dark:text-gray-dark-12" target="_blank" rel="noreferrer" href={RisedleLinks.discord}>
                                            discord
                                        </a>
                                        .
                                    </p>
                                </div>
                            </Dialog.Description>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};

export default ButtonNetworkSwitcher;
