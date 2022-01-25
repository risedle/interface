import type { FunctionComponent } from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

import { chain as Chains, Chain, useNetwork } from "wagmi";

import { useWalletContext, supportedChains } from "../Wallet";

import RisedleLinks from "../../../utils/links";
import ButtonClose from "./Close";

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
    const { chain, switchChain, account } = useWalletContext();
    const [networkData, switchNetwork] = useNetwork();
    let [isOpen, setIsOpen] = useState(false);

    // console.debug("ButtonNetworkSwitcher chain", chain);

    const getChainIconPath = (c: Chain): string => {
        switch (c.id) {
            case Chains.arbitrumOne.id:
                return "/networks/Arbitrum.svg";
            case Chains.kovan.id:
                return "/networks/Kovan.svg";
        }
        return "";
    };

    const switchToNetwork = (c: Chain) => {
        // If user is connected then use switch network feature
        if (account && switchNetwork) {
            switchNetwork(c.id);
        }

        // Otherwise change manually
        switchChain(c.id);
        setIsOpen(false);
        return;
    };

    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-20 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-gray-dark-1/60 dark:bg-black/60 backdrop-blur" />

                    <div className="flex flex-col relative bg-gray-light-1 dark:bg-gray-dark-1 border border-gray-light-3 dark:border-gray-dark-3 rounded-[24px] w-[342px] mx-auto">
                        <Dialog.Title className="flex flex-row items-center px-4 py-4 justify-between border-b border-gray-light-3 dark:border-gray-dark-3 border-dashed m-0">
                            <span className="grow text-center pl-[40px] text-base leading-none font-bold text-gray-light-12 dark:text-gray-dark-12">Switch a Network</span>
                            <ButtonClose
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            />
                        </Dialog.Title>

                        <div className="flex flex-col max-w-[342px] p-4 space-y-2">
                            {supportedChains.map((c) => {
                                return (
                                    <button
                                        className="flex flex-row space-x-4 items-center bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-5 dark:border-gray-dark-5 rounded-[12px] py-[11px] px-[11px] text-left w-full m-0"
                                        onClick={() => {
                                            switchToNetwork(c);
                                        }}
                                        key={c.id}
                                    >
                                        <img src={getChainIconPath(c)} alt={c.name} className="w-[32px] h-[32px]" />
                                        <span className="text-sm leading-4 text-gray-light-12 dark:text-gray-dark-12 font-semibold tracking-[-0.02em]">{c.name}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="text-center p-4 border-t border-gray-light-3 dark:border-gray-dark-3 border-dashed m-0">
                            <p className="text-gray-light-11 dark:text-gray-dark-11 text-xs leading-1">
                                Don&apos;t see you network? Chat us on{" "}
                                <a className="underline text-gray-light-12 dark:text-gray-dark-12" target="_blank" rel="noreferrer" href={RisedleLinks.discord}>
                                    discord
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </Dialog>

            <button className="button basic p-0" onClick={() => setIsOpen(true)}>
                <img src={getChainIconPath(chain)} alt={chain.name} className="w-[16px] h-[16px] m-[11px]" />
            </button>
        </>
    );
};

export default ButtonNetworkSwitcher;
