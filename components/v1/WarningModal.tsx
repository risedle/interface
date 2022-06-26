import { FunctionComponent, useState, useEffect, Dispatch, SetStateAction } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import createPersistedState from "use-persisted-state";
import { useWalletContext, customChains } from "./Wallet";
import ButtonPrimary from "../../uikit/button/ButtonPrimary";
import links from "../../utils/links";
import ButtonClose from "./Buttons/Close";

/**
 * WarningModalProps is a React Component properties that passed to React Component WarningModal
 */
type WarningModalProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    showBSCWarning: boolean;
    setShowBSCWarning: Dispatch<SetStateAction<boolean>>;
};

/**
 * WarningModal is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const WarningModal: FunctionComponent<WarningModalProps> = ({ isOpen, setIsOpen, showBSCWarning, setShowBSCWarning }) => {
    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Overlay className="absolute z-30 h-screen w-screen bg-black/60 backdrop-blur-md" />
            <Dialog.Content className="fixed top-1/2 left-1/2 z-40 flex w-[343px] -translate-y-1/2 -translate-x-1/2 flex-col rounded-3xl border border-gray-light-3 bg-gray-light-1 py-4 dark:border-gray-dark-3 dark:bg-gray-dark-1">
                <div className="flex w-full flex-row items-center justify-between border-b border-dashed border-gray-light-3 px-4 pb-4 dark:border-gray-dark-3">
                    <Dialog.Title className="text-base font-bold leading-4 tracking-[-0.03em] text-gray-light-12 dark:text-gray-dark-12">Binance Smart Chain</Dialog.Title>
                    <ButtonClose
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    />
                </div>
                <div className="space-y-4 border-b border-dashed border-gray-light-3 py-5 px-4 dark:border-gray-dark-3">
                    <h1 className="text-base font-bold leading-4 tracking-[-0.03em] text-amber-light-11 dark:text-amber-dark-11">Use at your own risk.</h1>
                    <p className="text-sm leading-6 text-gray-light-10">Risedle leveraged token is an experimental product and there's always a potential for bug or errors that occurs due to the chain stability</p>
                    <div className="flex flex-row gap-2.5">
                        <input type="checkbox" checked={!showBSCWarning} onChange={() => setShowBSCWarning(!showBSCWarning)} />
                        <label className="text-sm leading-6 text-gray-light-9 dark:text-gray-dark-8">Don't show this message again</label>
                    </div>
                </div>
                <div className="flex flex-col items-center space-y-4 px-4 pt-4">
                    <ButtonPrimary
                        full
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        Okay, Got it
                    </ButtonPrimary>
                    <p className="text-xs tracking-[-0.01em] text-gray-light-11">
                        Got more question?{" "}
                        <a href={links.discord} target="_blank" rel="noopener noreferrer" className="text-gray-light-12 underline underline-offset-1 dark:text-gray-dark-12">
                            Chat us on Discord
                        </a>
                    </p>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default WarningModal;
