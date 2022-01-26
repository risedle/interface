import Link from "next/link";
import type { FunctionComponent, ReactNode } from "react";
import { useWalletContext } from "../Wallet";

/**
 * ToastTransactionProps is a React Component properties that passed to React Component ToastTransaction
 */
type ToastTransactionProps = {
    hash: string;
};

/**
 * ToastTransaction is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ToastTransaction: FunctionComponent<ToastTransactionProps> = ({ hash }) => {
    // Get explorer link
    const { chain } = useWalletContext();
    // Get tx link
    const txLink = chain.blockExplorers && chain.blockExplorers.length ? `${chain.blockExplorers[0].url}/tx/${hash}` : "#";
    // Example hash 0x4bd32945f8d1ee82a24422074460b8e811b200eec1b0d6264e8fd171a0b50c89
    const simplifiedHash = `${hash.slice(0, 6)}...${hash.slice(-4)}`;
    return (
        <Link href={txLink}>
            <a target="_blank" rel="noreferrer" className="bg-green-light-9 dark:bg-green-dark-2 border border-green-light-10 dark:border-green-dark-5 py-[3px] pl-[4px] pr-4 rounded-full inline-block flex flex-row items-center max-w-max space-x-2">
                <div className="flex flex-row items-center">
                    <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                        <rect y="0.5" width="31" height="31" rx="15.5" className="fill-green-light-10 dark:fill-green-dark-5" />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.625 16C11.625 16.6213 11.1213 17.125 10.5 17.125C9.87868 17.125 9.375 16.6213 9.375 16C9.375 15.3787 9.87868 14.875 10.5 14.875C11.1213 14.875 11.625 15.3787 11.625 16ZM16.625 16C16.625 16.6213 16.1213 17.125 15.5 17.125C14.8787 17.125 14.375 16.6213 14.375 16C14.375 15.3787 14.8787 14.875 15.5 14.875C16.1213 14.875 16.625 15.3787 16.625 16ZM20.5 17.125C21.1213 17.125 21.625 16.6213 21.625 16C21.625 15.3787 21.1213 14.875 20.5 14.875C19.8787 14.875 19.375 15.3787 19.375 16C19.375 16.6213 19.8787 17.125 20.5 17.125Z"
                            className="fill-green-light-1 dark:fill-green-dark-11 "
                        />
                    </svg>
                    <span className="text-green-light-1 dark:text-green-dark-12 text-xs font-semibold inline-block leading-4 ml-2">Minting transaction {simplifiedHash}</span>
                </div>
                <svg width="15" height="16" viewBox="0 0 15 16" className="fill-green-light-1 dark:fill-green-dark-12" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.64645 11.8536C3.45118 11.6583 3.45118 11.3417 3.64645 11.1465L10.2929 4.5L6 4.5C5.72386 4.5 5.5 4.27614 5.5 4C5.5 3.72386 5.72386 3.5 6 3.5L11.5 3.5C11.6326 3.5 11.7598 3.55268 11.8536 3.64645C11.9473 3.74022 12 3.86739 12 4L12 9.50001C12 9.77615 11.7761 10 11.5 10C11.2239 10 11 9.77615 11 9.50001V5.20711L4.35355 11.8536C4.15829 12.0488 3.84171 12.0488 3.64645 11.8536Z" />
                </svg>
            </a>
        </Link>
    );
};

export default ToastTransaction;
