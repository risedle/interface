import type { FunctionComponent } from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

import { chain as Chains, Chain, useNetwork } from "wagmi";

import { useWalletContext, supportedChains } from "../Wallet";

import ArbitrumOneIcon from "../../../public/networks/Arbitrum.svg";
import KovanIcon from "../../../public/networks/Kovan.svg";
import RisedleLinks from "../../../utils/links";

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

    console.debug("ButtonNetworkSwitcher chain", chain);

    const getChainIconPath = (c: Chain): string => {
        switch (c.id) {
            case Chains.arbitrumOne.id:
                return ArbitrumOneIcon;
            case Chains.kovan.id:
                return KovanIcon;
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
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-white/20 dark:bg-black/20 backdrop-blur" />

                    <div className="flex flex-col relative bg-gray-light-1 dark:bg-gray-dark-1 border border-gray-light-3 dark:border-gray-dark-3 rounded-[24px] max-w-sm mx-auto">
                        <Dialog.Title className="text-center pr-4 py-4 pl-[49px] border-b border-gray-light-3 dark:border-gray-dark-3 border-dashed m-0">
                            <span className="text-base leading-none font-bold text-gray-light-12 dark:text-gray-dark-12">Switch a Network</span>
                            <button className="float-right bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 rounded-full align-middle self-center" onClick={() => setIsOpen(false)}>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="align-middle inline-block fill-gray-light-12 dark:fill-gray-dark-12 m-2">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                                    />
                                </svg>
                            </button>
                        </Dialog.Title>

                        <div className="flex flex-col max-w-[342px] p-4 space-y-2">
                            {supportedChains.map((c) => {
                                return (
                                    <button
                                        className="bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-5 dark:border-gray-dark-5 rounded-[12px] py-[11px] px-[12px] text-left w-full m-0"
                                        onClick={() => {
                                            switchToNetwork(c);
                                        }}
                                        key={c.id}
                                    >
                                        <img src={getChainIconPath(c)} alt={c.name} className="inline-block self-center bg-gray-light-4 dark:bg-gray-dark-4 p-[6px] rounded-full mr-4" />
                                        <span className="text-sm text-gray-light-12 dark:text-gray-dark-12 font-semibold font-inter m-0 leading-none">{c.name}</span>
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

            <button className="bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-5 dark:border-gray-dark-5 py-[3px] pl-[4px] pr-4 rounded-full inline-block" onClick={() => setIsOpen(true)}>
                <img src={getChainIconPath(chain)} alt={chain.name} className="inline-block self-center bg-gray-light-4 dark:bg-gray-dark-4 p-[6px] rounded-full" />
                <span className="text-gray-light-12 dark:text-gray-dark-12 text-sm font-semibold inline-block leading-none ml-2">{chain.name}</span>
            </button>
        </>
    );
};

export default ButtonNetworkSwitcher;
