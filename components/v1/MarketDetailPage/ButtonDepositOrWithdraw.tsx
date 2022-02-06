import type { FunctionComponent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { Metadata } from "../MarketMetadata";
import { DEFAULT_CHAIN, useWalletContext } from "../Wallet";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

/**
 * ButtonDepositOrWithdrawProps is a React Component properties that passed to React Component ButtonDepositOrWithdraw
 */
type ButtonDepositOrWithdrawProps = {
    address: string;
};

/**
 * ButtonDepositOrWithdraw is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonDepositOrWithdraw: FunctionComponent<ButtonDepositOrWithdrawProps> = ({ address }) => {
    const { chain } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const metadata = Metadata[chainID][address];

    return (
        <Dialog.Root>
            <Dialog.Trigger className="w-full w-full rounded-full border border-blue-light-11 bg-blue-light-10 py-[11px] text-sm font-semibold leading-4 tracking-[-0.02em] text-gray-light-1 dark:border-blue-dark-11 dark:bg-blue-dark-10 dark:text-blue-light-1">Deposit or Withdraw</Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 z-30 bg-gray-dark-1/60 backdrop-blur dark:bg-black/60" />
            <Dialog.Content className="fixed left-0 bottom-0 z-30 w-screen sm:flex sm:h-screen sm:items-center">
                {/* Mint or Redeem container */}
                <div className="mx-4 mx-auto mb-4 flex-col rounded-[24px] border border-gray-light-3 bg-gray-light-1 p-4 dark:border-gray-dark-3 dark:bg-gray-dark-1 sm:m-auto sm:max-w-[376px] sm:flex-auto">
                    <Dialog.Title className="mb-4 flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center space-x-4">
                            <div>
                                <img src={metadata.vaultLogo} alt={metadata.vaultTitle} />
                            </div>
                            <div>
                                <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{metadata.subtitle}</p>
                                <h1 className="m-0 text-base font-bold tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12">{metadata.vaultTitle}</h1>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button className="button basic h-[32px] p-0">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-[9.5px] h-[11px] w-[11px] fill-gray-light-12 dark:fill-gray-dark-12">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                                    />
                                </svg>
                            </button>
                        </Dialog.Close>
                    </Dialog.Title>

                    <Tabs.Root defaultValue="deposit" className="outline-0">
                        <Tabs.List aria-label="depositOrWithdraw" className="mx-auto mb-6 mt-2 flex flex-row rounded-[12px] bg-gray-light-3 p-1 dark:bg-gray-dark-2">
                            <Tabs.Trigger value="deposit" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 state-active:bg-gray-light-1 state-active:py-[12px] state-active:font-bold state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                                Deposit
                            </Tabs.Trigger>
                            <Tabs.Trigger value="withdraw" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 state-active:bg-gray-light-1 state-active:py-[12px] state-active:font-bold state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                                Withdraw
                            </Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content value="deposit" className="mx-auto flex flex-col space-y-6 outline-0 sm:max-w-[540px]">
                            <Deposit address={address} />
                        </Tabs.Content>
                        <Tabs.Content value="withdraw" className="mx-auto flex flex-col space-y-6 outline-0 sm:max-w-[540px]">
                            <Withdraw address={address} />
                        </Tabs.Content>
                    </Tabs.Root>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default ButtonDepositOrWithdraw;
