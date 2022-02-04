import { Dialog, Popover } from "@headlessui/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePopper } from "react-popper";
import { InjectedConnector } from "wagmi";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Toasts
import ToastError from "../Toasts/Error";
import ToastSuccess from "../Toasts/Success";

// States
import { DEFAULT_CHAIN, formatAddress, getEtherscanAddressURL, MetaMaskConnector, useWalletContext, WCConnector } from "../Wallet";
import ButtonClose from "./Close";

/**
 * ButtonConnectWalletDesktopProps is a React Component properties that passed to React Component ButtonConnectWalletDesktop
 */
type ButtonConnectWalletDesktopProps = {};

/**
 * ButtonConnectWalletDesktop is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonConnectWalletDesktop: FunctionComponent<ButtonConnectWalletDesktopProps> = ({}) => {
    // Read global states
    const { chain, account, connectWallet, disconnectWallet, switchNetwork } = useWalletContext();

    // Local states
    const [isOpen, setIsOpen] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectorName, setConnectorName] = useState<string | undefined>(undefined);

    // UI States
    const showConnectWallet = account ? false : true;
    const showSwitchToDefaultNetwork = !showConnectWallet && chain.unsupported ? true : false;
    const showAccountData = !showConnectWallet && !showSwitchToDefaultNetwork;

    // Popover
    let [referenceElement1, setReferenceElement1] = useState<HTMLButtonElement | null>();
    let [popperElement1, setPopperElement1] = useState<HTMLDivElement | null>();
    let popper1 = usePopper(referenceElement1, popperElement1, {
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: "preventOverflow",
                options: {
                    altAxis: true,
                    padding: 16,
                },
            },
        ],
    });

    // Connect wallet
    const connect = async function (c: InjectedConnector | WalletConnectConnector) {
        setIsConnecting(true);
        setConnectorName(c.name);

        const result = await connectWallet(c);

        // Handle the error
        if (result && result.error) {
            // Display error
            toast.remove();
            toast.custom((t) => <ToastError>{result.error.message}</ToastError>);
            setIsConnecting(false);
            setConnectorName(undefined);
            return;
        }

        // Account connected
        toast.remove();
        toast.custom((t) => <ToastSuccess>{c.name} connected</ToastSuccess>);
        setIsConnecting(false);
        setIsOpen(false);
        setConnectorName(undefined);
    };

    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-20 overflow-y-auto">
                <div className="flex min-h-screen items-center justify-center">
                    <Dialog.Overlay className="fixed inset-0 bg-gray-dark-1/60 backdrop-blur dark:bg-black/60" />

                    <div className="relative mx-auto flex w-[342px] max-w-sm flex-col rounded-[24px] border border-gray-light-3 bg-gray-light-1 dark:border-gray-dark-3 dark:bg-gray-dark-1">
                        <Dialog.Title className="m-0 flex flex-row items-center justify-between border-b border-dashed border-gray-light-3 px-4 py-4 dark:border-gray-dark-3">
                            <span className="grow pl-[40px] text-center text-base font-bold leading-none text-gray-light-12 dark:text-gray-dark-12">{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
                            <ButtonClose
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            />
                        </Dialog.Title>

                        <div className="flex flex-col space-y-2 p-4">
                            <button
                                className={`m-0 flex w-full flex-row items-center justify-between rounded-[12px] border border-orange-light-5 bg-orange-light-2 py-[11px] px-[12px] text-left transition duration-300 ease-in-out hover:bg-orange-light-3 active:scale-95 dark:border-orange-dark-5 dark:bg-orange-dark-2 dark:hover:bg-orange-dark-3 ${isConnecting && connectorName ? "cursor-wait" : "cursor-pointer"}`}
                                disabled={isConnecting && connectorName ? true : false}
                                onClick={async () => {
                                    await connect(MetaMaskConnector);
                                }}
                            >
                                <div>
                                    <img src="/wallet/Metamask.svg" alt="MetaMask" className="mr-4 inline-block  self-center" />
                                    <span className="m-0 font-inter text-sm font-semibold leading-none text-gray-light-12 dark:text-gray-dark-12">Metamask</span>
                                </div>
                                {isConnecting && connectorName === "MetaMask" && (
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="float-right inline-block animate-spin">
                                        <path opacity="0.2" d="M28 16.0005C28 22.6279 22.6274 28.0005 16 28.0005C9.37258 28.0005 4 22.6279 4 16.0005C4 9.37307 9.37258 4.00049 16 4.00049C22.6274 4.00049 28 9.37307 28 16.0005ZM6.4 16.0005C6.4 21.3024 10.6981 25.6005 16 25.6005C21.3019 25.6005 25.6 21.3024 25.6 16.0005C25.6 10.6986 21.3019 6.40049 16 6.40049C10.6981 6.40049 6.4 10.6986 6.4 16.0005Z" className="fill-gray-light-12 dark:fill-gray-dark-12" />
                                        <path
                                            d="M26.8 16.0005C27.4627 16.0005 28.0062 16.5391 27.9401 17.1985C27.7286 19.3064 26.9618 21.3285 25.7082 23.0539C24.2187 25.1041 22.1183 26.6301 19.7082 27.4132C17.2981 28.1963 14.7019 28.1963 12.2918 27.4132C10.2635 26.7541 8.45455 25.5689 7.04447 23.9879C6.60334 23.4933 6.72645 22.7381 7.26262 22.3486C7.79879 21.959 8.5442 22.0841 8.99756 22.5675C10.1008 23.7439 11.4874 24.6283 13.0334 25.1306C14.9615 25.7571 17.0385 25.7571 18.9666 25.1306C20.8947 24.5042 22.5749 23.2834 23.7666 21.6432C24.722 20.3281 25.324 18.7975 25.5251 17.1974C25.6077 16.5398 26.1373 16.0005 26.8 16.0005Z"
                                            className="fill-gray-light-12 dark:fill-gray-dark-12"
                                        />
                                    </svg>
                                )}
                            </button>
                            <button
                                className={`m-0 flex w-full flex-row items-center justify-between rounded-[12px] border border-blue-light-5 bg-blue-light-2 py-[11px] px-[12px] text-left transition duration-300 ease-in-out hover:bg-blue-light-3 active:scale-95 dark:border-blue-dark-5 dark:bg-blue-dark-2 dark:hover:bg-blue-dark-3 ${isConnecting && connectorName ? "cursor-wait" : "cursor-pointer"}`}
                                disabled={isConnecting && connectorName ? true : false}
                                onClick={async () => {
                                    await connect(WCConnector);
                                }}
                            >
                                <div>
                                    <img src="/wallet/WalletConnect.svg" alt="WalletConnect" className="mr-4 inline-block  self-center" />
                                    <span className="m-0 font-inter text-sm font-semibold leading-none text-gray-light-12 dark:text-gray-dark-12">Wallet Connect</span>
                                </div>
                                {isConnecting && connectorName === "WalletConnect" && (
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="float-right inline-block animate-spin">
                                        <path opacity="0.2" d="M28 16.0005C28 22.6279 22.6274 28.0005 16 28.0005C9.37258 28.0005 4 22.6279 4 16.0005C4 9.37307 9.37258 4.00049 16 4.00049C22.6274 4.00049 28 9.37307 28 16.0005ZM6.4 16.0005C6.4 21.3024 10.6981 25.6005 16 25.6005C21.3019 25.6005 25.6 21.3024 25.6 16.0005C25.6 10.6986 21.3019 6.40049 16 6.40049C10.6981 6.40049 6.4 10.6986 6.4 16.0005Z" className="fill-gray-light-12 dark:fill-gray-dark-12" />
                                        <path
                                            d="M26.8 16.0005C27.4627 16.0005 28.0062 16.5391 27.9401 17.1985C27.7286 19.3064 26.9618 21.3285 25.7082 23.0539C24.2187 25.1041 22.1183 26.6301 19.7082 27.4132C17.2981 28.1963 14.7019 28.1963 12.2918 27.4132C10.2635 26.7541 8.45455 25.5689 7.04447 23.9879C6.60334 23.4933 6.72645 22.7381 7.26262 22.3486C7.79879 21.959 8.5442 22.0841 8.99756 22.5675C10.1008 23.7439 11.4874 24.6283 13.0334 25.1306C14.9615 25.7571 17.0385 25.7571 18.9666 25.1306C20.8947 24.5042 22.5749 23.2834 23.7666 21.6432C24.722 20.3281 25.324 18.7975 25.5251 17.1974C25.6077 16.5398 26.1373 16.0005 26.8 16.0005Z"
                                            className="fill-gray-light-12 dark:fill-gray-dark-12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="m-0 border-t border-dashed border-gray-light-3 p-4 text-center dark:border-gray-dark-3">
                            <p className="leading-1 text-xs text-gray-light-11 dark:text-gray-dark-11">
                                By connecting your wallet to Residle you&apos;re agree with our{" "}
                                <a href="#" className="text-gray-light-12 underline dark:text-gray-dark-12" target="_blank" rel="noreferrer">
                                    Terms and Conditions
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </Dialog>

            {/* If account is not connected then display the connect wallet button */}
            {showConnectWallet && (
                <button className="button gradient inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-4 text-sm font-semibold leading-4 tracking-tight text-gray-light-1 hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 dark:text-gray-dark-1" onClick={() => setIsOpen(true)}>
                    Connect Wallet
                </button>
            )}

            {/* If account is connected and connected chain is not the same as current chain then display the switch network button */}
            {showSwitchToDefaultNetwork && (
                <button
                    className="inline-block rounded-full border border-gray-light-4 bg-gray-light-2 py-[11px] px-4 text-sm font-semibold leading-4 leading-4 tracking-tighter text-blue-dark-1 dark:border-gray-dark-4 dark:bg-gray-dark-2 dark:text-blue-light-1"
                    onClick={() => {
                        if (switchNetwork) {
                            switchNetwork(DEFAULT_CHAIN.id);
                        } else {
                            toast.remove();
                            toast.custom((t) => <ToastError>Cannot switch network automatically on WalletConnect</ToastError>);
                        }
                    }}
                >
                    <span className="mr-2 inline-block h-[8px] w-[8px] rounded-full bg-red-light-10 shadow-[0px_0px_12px] shadow-red-light-10 dark:bg-red-dark-10 dark:shadow-red-dark-10"></span>
                    Switch to {DEFAULT_CHAIN.name}
                </button>
            )}

            {/* If account is connected and connected chain is the same as current chain then display account information */}
            {showAccountData && account && (
                <Popover>
                    <Popover.Button ref={setReferenceElement1} className="inline-block rounded-full border border-gray-light-4 bg-gray-light-2 py-[11px] px-4 text-sm font-semibold leading-4 tracking-tighter text-blue-dark-1 dark:border-gray-dark-4 dark:bg-gray-dark-2 dark:text-blue-light-1">
                        <span className="mr-2 inline-block h-[8px] w-[8px] rounded-full bg-sky-light-10 shadow-[0px_0px_12px] shadow-sky-light-10 dark:bg-sky-dark-10"></span>
                        {formatAddress(account)}
                    </Popover.Button>

                    <Popover.Panel ref={setPopperElement1} style={popper1.styles.popper} {...popper1.attributes.popper} className="flex w-[241px] flex-col rounded-[16px] border border-gray-light-4 bg-gray-light-2 dark:border-gray-dark-4 dark:bg-gray-dark-2">
                        {({ close }) => {
                            return (
                                <>
                                    <div className="mx-4 border-b border-dashed border-gray-light-5 pt-4 pb-2 text-xs leading-4 text-gray-light-9 dark:border-gray-dark-3 dark:text-gray-dark-9">Connected via {connectorName}</div>
                                    <div className="mt-2 flex flex-col space-y-4 pb-4">
                                        <div className="flex flex-row justify-between px-4 text-sm leading-4">
                                            <Link href={getEtherscanAddressURL(chain.chain, account)}>
                                                <a className="text-gray-light-12 hover:underline dark:text-gray-dark-12" target="_blank" rel="noopener noreferrer">
                                                    View on Explorer <span className="text-gray-light-9 dark:text-gray-dark-9">&#8599;</span>
                                                </a>
                                            </Link>

                                            <svg width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg" className="fill-gray-light-12 dark:fill-gray-dark-12">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.4999 2.2999C4.35188 2.2999 1.7999 4.85188 1.7999 7.9999C1.7999 11.1479 4.35188 13.6999 7.4999 13.6999C10.6479 13.6999 13.1999 11.1479 13.1999 7.9999C13.1999 4.85188 10.6479 2.2999 7.4999 2.2999ZM0.899902 7.9999C0.899902 4.35482 3.85482 1.3999 7.4999 1.3999C11.145 1.3999 14.0999 4.35482 14.0999 7.9999C14.0999 11.645 11.145 14.5999 7.4999 14.5999C3.85482 14.5999 0.899902 11.645 0.899902 7.9999Z" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.4999 8.39985H1.49988V7.59985H13.4999V8.39985Z" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.09985 13.9999V1.99988H7.89985V13.9999H7.09985Z" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10.3749 7.99986C10.3749 5.82712 9.59358 3.67766 8.06177 2.25644L8.53787 1.74329C10.2395 3.32206 11.0749 5.67261 11.0749 7.99986C11.0749 10.3271 10.2395 12.6777 8.53787 14.2564L8.06177 13.7433C9.59358 12.3221 10.3749 10.1726 10.3749 7.99986Z" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.99963 7.99988C3.99963 5.67599 4.8078 3.32666 6.45762 1.74707L6.94171 2.25269C5.45814 3.6731 4.69963 5.82377 4.69963 7.99988C4.69964 10.176 5.45816 12.3267 6.94173 13.7471L6.45763 14.2527C4.80782 12.6731 3.99964 10.3238 3.99963 7.99988Z" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.49989 4.45789C9.66922 4.45789 11.8752 4.85903 13.3706 5.69436C13.5393 5.78863 13.5997 6.00185 13.5055 6.1706C13.4112 6.33936 13.198 6.39974 13.0292 6.30548C11.6793 5.55143 9.60793 5.15789 7.49989 5.15789C5.39186 5.15789 3.32046 5.55143 1.97058 6.30548C1.80182 6.39974 1.5886 6.33936 1.49433 6.1706C1.40007 6.00185 1.46045 5.78863 1.62921 5.69436C3.1246 4.85903 5.33057 4.45789 7.49989 4.45789Z" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.49989 11.3499C9.66922 11.3499 11.8752 10.9487 13.3706 10.1134C13.5393 10.0191 13.5997 9.80589 13.5055 9.63714C13.4112 9.46838 13.198 9.408 13.0292 9.50226C11.6793 10.2563 9.60793 10.6499 7.49989 10.6499C5.39186 10.6499 3.32046 10.2563 1.97058 9.50226C1.80182 9.408 1.5886 9.46838 1.49433 9.63714C1.40007 9.80589 1.46045 10.0191 1.62921 10.1134C3.1246 10.9487 5.33057 11.3499 7.49989 11.3499Z" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-row justify-between px-4 text-sm leading-4">
                                            <button
                                                className="text-gray-light-12 hover:underline dark:text-gray-dark-12"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(account);
                                                    toast.remove();
                                                    toast.custom((t) => <ToastSuccess>Address Copied</ToastSuccess>);
                                                }}
                                            >
                                                Copy Address
                                            </button>
                                            <svg width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg" className="fill-gray-light-12 dark:fill-gray-dark-12">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M1 10C1 10.8284 1.67157 11.5 2.5 11.5H4L4 10.5H2.5C2.22386 10.5 2 10.2761 2 10L2 3C2 2.72386 2.22386 2.5 2.5 2.5L9.5 2.5C9.77614 2.5 10 2.72386 10 3V4.49996H5.5C4.67158 4.49996 4 5.17153 4 5.99996V13C4 13.8284 4.67158 14.5 5.5 14.5H12.5C13.3284 14.5 14 13.8284 14 13V5.99996C14 5.17153 13.3284 4.49996 12.5 4.49996H11V3C11 2.17157 10.3284 1.5 9.5 1.5H2.5C1.67157 1.5 1 2.17157 1 3V10ZM5 5.99996C5 5.72382 5.22386 5.49996 5.5 5.49996H12.5C12.7761 5.49996 13 5.72382 13 5.99996V13C13 13.2761 12.7761 13.5 12.5 13.5H5.5C5.22386 13.5 5 13.2761 5 13V5.99996Z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex flex-row justify-between px-4 text-sm leading-4">
                                            <button
                                                className="text-red-light-10 hover:underline dark:text-red-dark-10"
                                                onClick={() => {
                                                    toast.remove();
                                                    toast.custom((t) => <ToastSuccess>Wallet disconnected</ToastSuccess>);
                                                    disconnectWallet();
                                                }}
                                            >
                                                Disconnect
                                            </button>
                                            <svg width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg" className="fill-red-light-10 dark:fill-red-dark-10">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M4.50024 0.5C4.77639 0.5 5.00024 0.723858 5.00024 1V3C5.00024 3.27614 4.77639 3.5 4.50024 3.5C4.2241 3.5 4.00024 3.27614 4.00024 3V1C4.00024 0.723858 4.2241 0.5 4.50024 0.5ZM0.646404 1.14648C0.841666 0.951221 1.15825 0.951221 1.35351 1.14648L2.85351 2.64648C3.04877 2.84175 3.04877 3.15833 2.85351 3.35359C2.65825 3.54885 2.34167 3.54885 2.1464 3.35359L0.646404 1.85359C0.451141 1.65833 0.451141 1.34175 0.646404 1.14648ZM0.000244141 5C0.000244141 4.72386 0.224102 4.5 0.500244 4.5H2.50024C2.77639 4.5 3.00024 4.72386 3.00024 5C3.00024 5.27614 2.77639 5.5 2.50024 5.5H0.500244C0.224102 5.5 0.000244141 5.27614 0.000244141 5ZM12.0002 11C12.0002 10.7239 12.2241 10.5 12.5002 10.5H14.5002C14.7764 10.5 15.0002 10.7239 15.0002 11C15.0002 11.2761 14.7764 11.5 14.5002 11.5H12.5002C12.2241 11.5 12.0002 11.2761 12.0002 11ZM10.5002 12.5C10.7764 12.5 11.0002 12.7239 11.0002 13V15C11.0002 15.2761 10.7764 15.5 10.5002 15.5C10.2241 15.5 10.0002 15.2761 10.0002 15V13C10.0002 12.7239 10.2241 12.5 10.5002 12.5ZM12.1464 12.6465C12.3417 12.4512 12.6582 12.4512 12.8535 12.6465L14.3535 14.1465C14.5488 14.3417 14.5488 14.6583 14.3535 14.8536C14.1582 15.0488 13.8417 15.0488 13.6464 14.8536L12.1464 13.3536C11.9511 13.1583 11.9511 12.8417 12.1464 12.6465ZM7.76488 4.19945C8.19188 3.77245 8.35735 3.61015 8.51171 3.50528C9.18807 3.04582 10.0432 3.03682 10.6786 3.45407C10.8228 3.54881 10.9769 3.69918 11.3888 4.11106C11.8007 4.52295 11.9511 4.67702 12.0458 4.82129C12.463 5.45663 12.454 6.31179 11.9946 6.98815C11.8897 7.14252 11.7274 7.30798 11.3004 7.73499L10.6817 8.3537C10.4864 8.54897 10.4864 8.86555 10.6817 9.06081C10.877 9.25607 11.1935 9.25607 11.3888 9.06081L12.0075 8.44209L12.0504 8.39919C12.4201 8.02965 12.6566 7.79318 12.8218 7.55008C13.497 6.5561 13.5319 5.2624 12.8817 4.27235C12.7231 4.0309 12.492 3.79989 12.1406 3.44859L12.0959 3.40396L12.0513 3.35931C11.7 3.00788 11.469 2.77677 11.2275 2.6182C10.2375 1.96801 8.94376 2.00287 7.94978 2.6781C7.70668 2.84324 7.47022 3.07978 7.10068 3.44942L7.10068 3.44943L7.05777 3.49235L6.43905 4.11106C6.24379 4.30633 6.24379 4.62291 6.43905 4.81817C6.63431 5.01343 6.9509 5.01343 7.14616 4.81817L7.76488 4.19945ZM2.99191 7.55821L2.94899 7.60112C2.57934 7.97065 2.3428 8.20712 2.17766 8.45022C1.50243 9.4442 1.46757 10.7379 2.11776 11.7279C2.27633 11.9694 2.50743 12.2004 2.85886 12.5517L2.85888 12.5517L2.90352 12.5963L2.94815 12.641L2.94815 12.641L2.94817 12.641C3.29945 12.9924 3.53046 13.2235 3.77191 13.3821C4.76196 14.0323 6.05566 13.9974 7.04964 13.3222C7.29274 13.1571 7.52921 12.9205 7.89875 12.5509L7.94165 12.508L8.56037 11.8892C8.75563 11.694 8.75563 11.3774 8.56037 11.1821C8.36511 10.9869 8.04853 10.9869 7.85326 11.1821L7.23455 11.8008C6.80754 12.2279 6.64208 12.3902 6.48771 12.495C5.81135 12.9545 4.95619 12.9635 4.32085 12.5462C4.17658 12.4515 4.02251 12.3011 3.61062 11.8892C3.19874 11.4774 3.04837 11.3233 2.95363 11.179C2.53638 10.5437 2.54538 9.68851 3.00484 9.01215C3.10971 8.85778 3.27201 8.69232 3.69901 8.26532L4.31773 7.6466C4.51299 7.45134 4.51299 7.13475 4.31773 6.93949C4.12247 6.74423 3.80589 6.74423 3.61062 6.93949L2.99191 7.55821Z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </>
                            );
                        }}
                    </Popover.Panel>
                </Popover>
            )}
        </>
    );
};

export default ButtonConnectWalletDesktop;
