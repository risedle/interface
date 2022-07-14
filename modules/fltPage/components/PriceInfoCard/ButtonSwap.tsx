import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import ButtonAlternate from "../../../../uikit/button/ButtonAlternate";
import { customChains } from "../../../../components/v1/Wallet";
import { useHotkeys } from "react-hotkeys-hook";
import { Metadata } from "../../../../components/v1/MarketMetadata";
import BuyDialogContent from "./DialogContents/BuyDialogContent";
import SellDialogContent from "./DialogContents/SellDialogContent";

/**
 * ButtonSwapProps is a React Component properties that passed to React Component ButtonSwap
 */
type ButtonSwapProps = {
    chainID: number;
    address: string;
};

/**
 * ButtonSwap is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
function ButtonSwap({ chainID, address }: ButtonSwapProps) {
    const metadata = Metadata[chainID][address];
    const [isOpen, setIsOpen] = useState(false);

    useHotkeys("shift+s", () => setIsOpen(true));
    useHotkeys("esc", () => setIsOpen(false));

    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Trigger asChild>
                <div className="flex items-center px-4">
                    <ButtonAlternate onClick={() => setIsOpen(true)} className="mr-4 flex-1" type={chainID === customChains.bsc.id ? "bsc" : "arb"}>
                        Swap
                    </ButtonAlternate>
                    <span className="hidden self-center text-xs text-gray-dark-9 md:block">
                        Press <kbd>&#8593;</kbd> + <kbd>S</kbd> for quick shortcut
                    </span>
                </div>
            </Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 z-30 bg-gray-dark-1/60 backdrop-blur dark:bg-black/60" />
            <Dialog.Content className="fixed left-0 bottom-0 z-30 w-screen sm:flex sm:h-screen sm:items-center ">
                {/* Mint or Redeem container */}
                <div className="mx-auto mb-4 flex-col rounded-3xl border border-gray-light-3 bg-gray-light-1 p-4 dark:border-gray-dark-3 dark:bg-gray-dark-1 sm:m-auto sm:max-w-[376px] sm:flex-auto">
                    <Tabs.Root defaultValue="buy" className="outline-0">
                        <div className="flex flex-row items-center gap-2">
                            <Tabs.List aria-label="buyOrSell" className="flex w-full flex-row rounded-xl bg-gray-light-3 p-1 dark:bg-gray-dark-2">
                                <Tabs.Trigger value="buy" className="rounded-lg px-5 py-3 text-sm font-bold leading-4 text-gray-light-10 state-active:bg-gray-light-4 state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                                    Buy
                                </Tabs.Trigger>
                                <Tabs.Trigger value="sell" className="rounded-lg px-5 py-3 text-sm font-bold leading-4 text-gray-light-10 state-active:bg-gray-light-4 state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                                    Sell
                                </Tabs.Trigger>
                            </Tabs.List>
                            <Dialog.Close asChild onClick={() => setIsOpen(false)}>
                                <button className="button basic h-8 p-0">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-[9.5px] h-[11px] w-[11px] fill-gray-light-12 dark:fill-gray-dark-12">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                                        />
                                    </svg>
                                </button>
                            </Dialog.Close>
                        </div>

                        <Tabs.Content value="buy" className="mx-auto flex flex-col space-y-6 outline-0 sm:max-w-[540px]">
                            <BuyDialogContent chainID={chainID} address={address} />
                        </Tabs.Content>
                        <Tabs.Content value="sell" className="mx-auto flex flex-col space-y-6 outline-0 sm:max-w-[540px]">
                            <SellDialogContent chainID={chainID} address={address} />
                        </Tabs.Content>
                    </Tabs.Root>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default ButtonSwap;
