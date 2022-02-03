import { Popover } from "@headlessui/react";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePopper } from "react-popper";
import createPersistedState from "use-persisted-state";
import { Chain, chain as Chains, InjectedConnector, useAccount, useConnect, useNetwork } from "wagmi";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import RisedleLinks from "../../../utils/links";
// Toasts
import ToastError from "../Toasts/Error";
import ToastSuccess from "../Toasts/Success";
// States
import { DEFAULT_CHAIN, formatAddress, getEtherscanAddressURL, MetaMaskConnector, supportedChains, useWalletContext, WCConnector } from "../Wallet";

/**
 * ButtonConnectWalletMobileProps is a React Component properties that passed to React Component ButtonConnectWalletMobile
 */
type ButtonConnectWalletMobileProps = {};

/**
 * ButtonConnectWalletMobile is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonConnectWalletMobile: FunctionComponent<ButtonConnectWalletMobileProps> = ({}) => {
    // Read global states
    const { chain, account, connectWallet, disconnectWallet, switchNetwork } = useWalletContext();

    // Local states
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
                    offset: [0, 16],
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
    let [referenceElement2, setReferenceElement2] = useState<HTMLButtonElement | null>();
    let [popperElement2, setPopperElement2] = useState<HTMLDivElement | null>();
    let popper2 = usePopper(referenceElement2, popperElement2, {
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 16],
                },
            },
            {
                name: "preventOverflow",
                options: {
                    padding: { left: 0, right: 0 },
                },
            },
        ],
    });
    let [referenceElement3, setReferenceElement3] = useState<HTMLButtonElement | null>();
    let [popperElement3, setPopperElement3] = useState<HTMLDivElement | null>();
    let popper3 = usePopper(referenceElement3, popperElement3, {
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 16],
                },
            },
            {
                name: "preventOverflow",
                options: {
                    padding: { left: 16, right: 16 },
                },
            },
        ],
    });

    // Utilities
    const getChainIconPath = (c: Chain): string => {
        switch (c.id) {
            case Chains.arbitrumOne.id:
                return "/networks/Arbitrum.svg";
            case Chains.kovan.id:
                return "/networks/Kovan.svg";
        }
        return "/networks/Arbitrum.svg";
    };

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
        setConnectorName(undefined);
    };

    return (
        <>
            <div className="fixed bottom-0 flex h-[64px] w-full flex-row space-x-2 border-t border-gray-light-3 bg-gray-light-1 px-4 py-3 dark:border-gray-dark-3 dark:bg-gray-dark-1">
                {/* Network switcher popover */}
                <Popover id="popover-1">
                    {({ open }) => {
                        // Weird trick to blur all except this popover
                        if (process.browser) {
                            if (open) {
                                const dom = document.getElementById("popover-1");
                                if (dom) dom.style.zIndex = "10";
                            } else {
                                const dom = document.getElementById("popover-1");
                                if (dom) dom.style.zIndex = "0";
                            }
                        }
                        return (
                            <>
                                <Popover.Button ref={setReferenceElement1} className="button basic w-[40px] p-2 outline-0">
                                    <img src={getChainIconPath(chain.chain)} alt={chain.chain.name} className="flex-shrink-0" />
                                </Popover.Button>

                                <Popover.Panel ref={setPopperElement1} style={popper1.styles.popper} {...popper1.attributes.popper} className="flex min-w-[241px] flex-col rounded-[16px] border border-gray-light-4 bg-gray-light-2 p-4 dark:border-gray-dark-4 dark:bg-gray-dark-2">
                                    {({ close }) => {
                                        return (
                                            <>
                                                <div className="border-b border-dashed border-gray-light-3 pb-2 text-xs text-gray-light-9 dark:border-gray-dark-3 dark:text-gray-dark-9">Switch network</div>
                                                <div className="mt-2 flex flex-col space-y-4 text-left">
                                                    {supportedChains.map((c) => {
                                                        return (
                                                            <button
                                                                className="m-0 flex w-full flex-row items-center justify-between text-left"
                                                                onClick={async () => {
                                                                    if (!account) {
                                                                        toast.remove();
                                                                        toast.custom((t) => <ToastError>Please connect your wallet first</ToastError>);
                                                                        return;
                                                                    }

                                                                    if (switchNetwork) {
                                                                        const result = await switchNetwork(c.id);
                                                                        if (result.error) {
                                                                            toast.remove();
                                                                            toast.custom((t) => <ToastError>{result.error.message}</ToastError>);
                                                                            return;
                                                                        }
                                                                        toast.remove();
                                                                        toast.custom((t) => <ToastSuccess>Switched to {c.name}</ToastSuccess>);
                                                                        return;
                                                                    } else {
                                                                        toast.remove();
                                                                        toast.custom((t) => <ToastError>Cannot switch network automatically in WalletConnect. Please change network directly from your wallet.</ToastError>);
                                                                        return;
                                                                    }
                                                                }}
                                                                key={c.id}
                                                            >
                                                                <span className="m-0 text-sm font-normal leading-none text-gray-light-12 dark:text-gray-dark-12">{c.name}</span>

                                                                <img src={getChainIconPath(c)} alt={c.name} className="inline-block self-center" />
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        );
                                    }}
                                </Popover.Panel>
                                <Popover.Overlay className={`${open ? "fixed inset-0 bg-gray-dark-1/60 opacity-100 backdrop-blur dark:bg-black/60" : "opacity-0"} z-[-1]`} />
                            </>
                        );
                    }}
                </Popover>

                {/* Connect wallet */}
                <Popover id="popover-2" className="grow">
                    {({ open }) => {
                        // Weird trick to blur all except this popover
                        if (process.browser) {
                            if (open) {
                                const dom = document.getElementById("popover-2");
                                if (dom) dom.style.zIndex = "10";
                            } else {
                                const dom = document.getElementById("popover-2");
                                if (dom) dom.style.zIndex = "0";
                            }
                        }
                        return (
                            <>
                                {/* If account is not connected then display the connect wallet button */}
                                {showConnectWallet && (
                                    <>
                                        <Popover.Button ref={setReferenceElement2} className="button gradient inline-block w-full rounded-full bg-[length:300%_300%] bg-center py-3 px-4 text-sm font-semibold leading-4 tracking-tight text-gray-light-1 outline-0 hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 dark:text-gray-dark-1">
                                            Connect Wallet
                                        </Popover.Button>

                                        <Popover.Panel ref={setPopperElement2} style={popper2.styles.popper} {...popper2.attributes.popper} className="container">
                                            {({ close }) => {
                                                return (
                                                    <div className="mx-4 rounded-[24px] border border-gray-light-3 bg-gray-light-1 dark:border-gray-dark-3 dark:bg-gray-dark-1">
                                                        <div className="m-0 border-b border-dashed border-gray-light-3 py-4 pr-4 pl-[49px] text-center dark:border-gray-dark-3">
                                                            <span className="text-base font-bold leading-none text-gray-light-12 dark:text-gray-dark-12">{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
                                                            <button className="float-right self-center rounded-full border border-gray-light-4 bg-gray-light-2 align-middle dark:border-gray-dark-4 dark:bg-gray-dark-2" onClick={() => close()}>
                                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-2 inline-block fill-gray-light-12 align-middle dark:fill-gray-dark-12">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        <div className="flex flex-col space-y-2 p-4">
                                                            <button
                                                                className={`m-0 flex flex-row items-center justify-between rounded-[12px] border border-orange-light-5 bg-orange-light-2 py-[11px] px-[12px] text-left transition duration-300 ease-in-out hover:bg-orange-light-3 active:scale-95 dark:border-orange-dark-5 dark:bg-orange-dark-2 dark:hover:bg-orange-dark-3 ${isConnecting && connectorName ? "cursor-wait" : "cursor-pointer"}`}
                                                                disabled={isConnecting && connectorName ? true : false}
                                                                onClick={async () => {
                                                                    await connect(MetaMaskConnector);
                                                                    close();
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
                                                                className={`m-0 flex flex-row items-center justify-between rounded-[12px] border border-blue-light-5 bg-blue-light-2 py-[11px] px-[12px] text-left transition duration-300 ease-in-out hover:bg-blue-light-3 active:scale-95 dark:border-blue-dark-5 dark:bg-blue-dark-2 dark:hover:bg-blue-dark-3 ${isConnecting && connectorName ? "cursor-wait" : "cursor-pointer"}`}
                                                                disabled={isConnecting && connectorName ? true : false}
                                                                onClick={async () => {
                                                                    await connect(WCConnector);
                                                                    close();
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
                                                );
                                            }}
                                        </Popover.Panel>
                                    </>
                                )}

                                {/* If account is connected and connected chain is not the same as current chain then display the switch network button */}
                                {showSwitchToDefaultNetwork && (
                                    <button
                                        className="inline-block w-full rounded-full border border-gray-light-4 bg-gray-light-2 py-[11px] px-4 text-sm font-semibold leading-4 leading-4 tracking-tighter text-blue-dark-1 dark:border-gray-dark-4 dark:bg-gray-dark-2 dark:text-blue-light-1"
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
                                    <>
                                        <Popover.Button ref={setReferenceElement2} className="inline-block w-full rounded-full border border-gray-light-4 bg-gray-light-2 py-[11px] px-4 text-sm font-semibold leading-4 tracking-tighter text-blue-dark-1 dark:border-gray-dark-4 dark:bg-gray-dark-2 dark:text-blue-light-1">
                                            <span className="mr-2 inline-block h-[8px] w-[8px] rounded-full bg-sky-light-10 shadow-[0px_0px_12px] shadow-sky-light-10 dark:bg-sky-dark-10"></span>
                                            {formatAddress(account)}
                                        </Popover.Button>

                                        <Popover.Panel ref={setPopperElement2} style={popper2.styles.popper} {...popper2.attributes.popper} className="mt-2 flex w-[241px] flex-col rounded-[16px] border border-gray-light-4 bg-gray-light-2 dark:border-gray-dark-4 dark:bg-gray-dark-2">
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
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M7.4999 2.2999C4.35188 2.2999 1.7999 4.85188 1.7999 7.9999C1.7999 11.1479 4.35188 13.6999 7.4999 13.6999C10.6479 13.6999 13.1999 11.1479 13.1999 7.9999C13.1999 4.85188 10.6479 2.2999 7.4999 2.2999ZM0.899902 7.9999C0.899902 4.35482 3.85482 1.3999 7.4999 1.3999C11.145 1.3999 14.0999 4.35482 14.0999 7.9999C14.0999 11.645 11.145 14.5999 7.4999 14.5999C3.85482 14.5999 0.899902 11.645 0.899902 7.9999Z"
                                                                    />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4999 8.39985H1.49988V7.59985H13.4999V8.39985Z" />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.09985 13.9999V1.99988H7.89985V13.9999H7.09985Z" />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.3749 7.99986C10.3749 5.82712 9.59358 3.67766 8.06177 2.25644L8.53787 1.74329C10.2395 3.32206 11.0749 5.67261 11.0749 7.99986C11.0749 10.3271 10.2395 12.6777 8.53787 14.2564L8.06177 13.7433C9.59358 12.3221 10.3749 10.1726 10.3749 7.99986Z" />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.99963 7.99988C3.99963 5.67599 4.8078 3.32666 6.45762 1.74707L6.94171 2.25269C5.45814 3.6731 4.69963 5.82377 4.69963 7.99988C4.69964 10.176 5.45816 12.3267 6.94173 13.7471L6.45763 14.2527C4.80782 12.6731 3.99964 10.3238 3.99963 7.99988Z" />
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M7.49989 4.45789C9.66922 4.45789 11.8752 4.85903 13.3706 5.69436C13.5393 5.78863 13.5997 6.00185 13.5055 6.1706C13.4112 6.33936 13.198 6.39974 13.0292 6.30548C11.6793 5.55143 9.60793 5.15789 7.49989 5.15789C5.39186 5.15789 3.32046 5.55143 1.97058 6.30548C1.80182 6.39974 1.5886 6.33936 1.49433 6.1706C1.40007 6.00185 1.46045 5.78863 1.62921 5.69436C3.1246 4.85903 5.33057 4.45789 7.49989 4.45789Z"
                                                                    />
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M7.49989 11.3499C9.66922 11.3499 11.8752 10.9487 13.3706 10.1134C13.5393 10.0191 13.5997 9.80589 13.5055 9.63714C13.4112 9.46838 13.198 9.408 13.0292 9.50226C11.6793 10.2563 9.60793 10.6499 7.49989 10.6499C5.39186 10.6499 3.32046 10.2563 1.97058 9.50226C1.80182 9.408 1.5886 9.46838 1.49433 9.63714C1.40007 9.80589 1.46045 10.0191 1.62921 10.1134C3.1246 10.9487 5.33057 11.3499 7.49989 11.3499Z"
                                                                    />
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
                                                                        disconnectWallet();
                                                                        toast.remove();
                                                                        toast.custom((t) => <ToastSuccess>Wallet disconnected</ToastSuccess>);
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
                                    </>
                                )}
                                <Popover.Overlay className={`${open ? "fixed inset-0 bg-gray-dark-1/60 opacity-100 backdrop-blur dark:bg-black/60" : "opacity-0"} -z-[1]`} />
                            </>
                        );
                    }}
                </Popover>

                {/* Hamburger menu popover */}
                <Popover id="popover-3">
                    {({ open }) => {
                        // Weird trick to blur all except this popover
                        if (process.browser) {
                            if (open) {
                                const dom = document.getElementById("popover-3");
                                if (dom) dom.style.zIndex = "10";
                            } else {
                                const dom = document.getElementById("popover-3");
                                if (dom) dom.style.zIndex = "0";
                            }
                        }
                        return (
                            <>
                                <Popover.Button ref={setReferenceElement3} className="button basic w-[40px] outline-0">
                                    {open && (
                                        <svg className="flex-shrink-0 fill-gray-light-12 dark:fill-gray-dark-12" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M13.3536 3.35355C13.5488 3.15829 13.5488 2.84171 13.3536 2.64645C13.1583 2.45118 12.8417 2.45118 12.6464 2.64645L8 7.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L7.29289 8L2.64645 12.6464C2.45118 12.8417 2.45118 13.1583 2.64645 13.3536C2.84171 13.5488 3.15829 13.5488 3.35355 13.3536L8 8.70711L12.6464 13.3536C12.8417 13.5488 13.1583 13.5488 13.3536 13.3536C13.5488 13.1583 13.5488 12.8417 13.3536 12.6464L8.70711 8L13.3536 3.35355Z"
                                            />
                                        </svg>
                                    )}
                                    {!open && (
                                        <svg className="flex-shrink-0 fill-gray-light-12 dark:fill-gray-dark-12" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M2 3.5C1.72386 3.5 1.5 3.72386 1.5 4C1.5 4.27614 1.72386 4.5 2 4.5H14C14.2761 4.5 14.5 4.27614 14.5 4C14.5 3.72386 14.2761 3.5 14 3.5H2ZM1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H14C14.2761 7.5 14.5 7.72386 14.5 8C14.5 8.27614 14.2761 8.5 14 8.5H2C1.72386 8.5 1.5 8.27614 1.5 8ZM1.5 12C1.5 11.7239 1.72386 11.5 2 11.5H14C14.2761 11.5 14.5 11.7239 14.5 12C14.5 12.2761 14.2761 12.5 14 12.5H2C1.72386 12.5 1.5 12.2761 1.5 12Z"
                                            />
                                        </svg>
                                    )}
                                </Popover.Button>

                                <Popover.Panel ref={setPopperElement3} style={popper3.styles.popper} {...popper3.attributes.popper} className="flex min-w-[161px] flex-col rounded-[16px] border border-gray-light-4 bg-gray-light-2 p-4 dark:border-gray-dark-4 dark:bg-gray-dark-2">
                                    {({ close }) => {
                                        return (
                                            <>
                                                <div className="pb-2 text-xs text-gray-light-9 dark:text-gray-dark-9">Navigation</div>
                                                <div className="mt-2 flex flex-col space-y-4 text-left">
                                                    <Link href="/">
                                                        <a className="m-0 flex w-full flex-row items-center justify-between text-left">
                                                            <span className="m-0 text-sm font-normal leading-none text-gray-light-12 dark:text-gray-dark-12">Home</span>
                                                        </a>
                                                    </Link>
                                                    <Link href="/">
                                                        <a className="m-0 flex w-full flex-row items-center justify-between text-left">
                                                            <span className="m-0 text-sm font-normal leading-none text-gray-light-12 dark:text-gray-dark-12">Markets</span>
                                                        </a>
                                                    </Link>
                                                </div>

                                                <div className="pb-2 pt-4 text-xs text-gray-light-9 dark:text-gray-dark-9">Socials</div>
                                                <div className="mt-2 flex flex-col space-y-4 text-left">
                                                    <Link href={RisedleLinks.twitter}>
                                                        <a className="m-0 flex w-full flex-row items-center justify-between text-left" target="_blank" rel="noreferrer">
                                                            <div>
                                                                <span className="m-0 text-sm font-normal leading-none text-gray-light-12 dark:text-gray-dark-12">Twitter</span>
                                                                <span className="m-0 text-sm font-normal leading-none text-gray-light-9 dark:text-gray-dark-9">&#8599;</span>
                                                            </div>
                                                            <svg className="fill-gray-light-12 dark:fill-gray-dark-12" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M7.23348 5.19608C7.23348 3.46863 8.63347 2.06836 10.3601 2.06836C11.3737 2.06836 12.1831 2.54782 12.7255 3.24364C13.3081 3.12446 13.8558 2.90892 14.3514 2.61487C14.156 3.22577 13.7425 3.73939 13.2035 4.06442C13.2039 4.06547 13.2044 4.06652 13.2048 4.06758C13.7335 4.00339 14.2365 3.8628 14.705 3.65524L14.7038 3.65693C14.3668 4.16162 13.9432 4.60715 13.4563 4.97013C13.4824 5.14651 13.4957 5.32406 13.4957 5.50058C13.4957 9.18689 10.6874 13.4744 5.52135 13.4744C3.93918 13.4744 2.46556 13.0108 1.22517 12.215C0.992754 12.0659 0.92523 11.7566 1.07435 11.5241C1.08753 11.5036 1.10195 11.4844 1.11746 11.4664C1.20594 11.32 1.3745 11.2307 1.55552 11.252C2.47079 11.3599 3.3858 11.2483 4.19231 10.896C3.39239 10.5432 2.77142 9.85954 2.50216 9.01953C2.45371 8.86838 2.48847 8.70289 2.59363 8.58401C2.59728 8.57989 2.60099 8.57585 2.60476 8.57188C1.96403 8.00798 1.55985 7.18187 1.55985 6.26121V6.22738C1.55985 6.06793 1.64424 5.92038 1.78167 5.83952C1.82683 5.81296 1.8755 5.79489 1.92544 5.78536C1.70561 5.36133 1.58128 4.87963 1.58128 4.36937C1.58128 3.90144 1.58396 3.31171 1.91344 2.7806C1.98731 2.66154 2.1077 2.58894 2.23652 2.57174C2.42601 2.51215 2.64099 2.56948 2.77418 2.7328C3.86548 4.07105 5.44078 4.99562 7.23378 5.23939L7.23348 5.19608ZM5.52135 12.4744C4.73399 12.4744 3.97794 12.3433 3.2726 12.1021C4.13024 11.9536 4.95319 11.6157 5.66231 11.06C5.81223 10.9425 5.87194 10.7433 5.81138 10.5627C5.75082 10.3821 5.58312 10.2592 5.39267 10.2559C4.6898 10.2434 4.06724 9.89695 3.67805 9.36823C3.8684 9.35284 4.0544 9.32018 4.23457 9.27146C4.43615 9.21695 4.57375 9.03092 4.56686 8.82222C4.55997 8.61351 4.41041 8.43696 4.20568 8.39586C3.42706 8.23955 2.79895 7.66743 2.56181 6.92153C2.76267 6.97003 2.97114 6.99889 3.18494 7.00589C3.38575 7.01246 3.56659 6.88511 3.62807 6.69383C3.68955 6.50255 3.61679 6.29369 3.44976 6.18203C2.86536 5.79134 2.48128 5.12442 2.48128 4.36937C2.48128 4.20191 2.48364 4.05247 2.49367 3.91697C3.85127 5.29891 5.70885 6.18909 7.77601 6.29317C7.93237 6.30104 8.0834 6.23522 8.18407 6.11531C8.28475 5.99541 8.32344 5.83527 8.28863 5.68262C8.25267 5.52496 8.23348 5.36263 8.23348 5.19608C8.23348 4.02063 9.18604 3.06836 10.3601 3.06836C11.5944 3.06836 12.4957 4.21187 12.4957 5.50058C12.4957 8.75687 10.0203 12.4744 5.52135 12.4744Z"
                                                                />
                                                            </svg>
                                                        </a>
                                                    </Link>
                                                    <Link href={RisedleLinks.discord}>
                                                        <a className="m-0 flex w-full flex-row items-center justify-between text-left" target="_blank" rel="noreferrer">
                                                            <div>
                                                                <span className="m-0 text-sm font-normal leading-none text-gray-light-12 dark:text-gray-dark-12">Discord</span>
                                                                <span className="m-0 text-sm font-normal leading-none text-gray-light-9 dark:text-gray-dark-9">&#8599;</span>
                                                            </div>
                                                            <svg className="fill-gray-light-12 dark:fill-gray-dark-12" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                                                                <g clipPath="url(#clip0_389_4649)">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M5.07749 2.30587C5.0339 2.29902 4.9896 2.29797 4.94574 2.30274C4.10135 2.39471 2.81875 2.84958 2.0615 3.26029C2.00932 3.28859 1.96259 3.32596 1.92352 3.37064C1.60745 3.73202 1.32187 4.32047 1.09839 4.87417C0.868444 5.44389 0.678 6.04433 0.569413 6.47848C0.216266 7.89039 0.0224013 9.58555 -0.00262488 11.192C-0.00392888 11.2757 0.0158058 11.3584 0.0547692 11.4325C0.358439 12.01 1.00875 12.5434 1.65769 12.9322C2.31423 13.3255 3.08115 13.6375 3.70181 13.6975C3.85753 13.7125 4.01132 13.6538 4.1174 13.5388C4.27318 13.3699 4.5363 12.9777 4.73407 12.675C4.83938 12.5139 4.9368 12.3614 5.0078 12.2493C5.01264 12.2416 5.01737 12.2342 5.02197 12.2269C5.69436 12.3886 6.51514 12.4999 7.4999 12.4999C8.48361 12.4999 9.30369 12.3888 9.97567 12.2274C9.98017 12.2345 9.98479 12.2418 9.98952 12.2493C10.0605 12.3614 10.1579 12.5139 10.2632 12.675C10.461 12.9777 10.7241 13.3699 10.8799 13.5388C10.986 13.6538 11.1398 13.7125 11.2955 13.6975C11.9162 13.6375 12.6831 13.3255 13.3396 12.9322C13.9886 12.5434 14.6389 12.01 14.9425 11.4325C14.9815 11.3584 15.0012 11.2757 14.9999 11.192C14.9749 9.58555 14.781 7.89039 14.4279 6.47848C14.3193 6.04433 14.1289 5.44389 13.8989 4.87417C13.6754 4.32047 13.3899 3.73202 13.0738 3.37064C13.0347 3.32596 12.988 3.28859 12.9358 3.26029C12.1786 2.84958 10.896 2.39471 10.0516 2.30274C10.0077 2.29797 9.96341 2.29902 9.91982 2.30587C9.70885 2.33902 9.52808 2.44754 9.39591 2.54738C9.25613 2.65297 9.12662 2.78271 9.01506 2.91364C8.85179 3.10524 8.69345 3.33945 8.59243 3.56146C8.25175 3.52255 7.88701 3.49979 7.49988 3.49979C7.11186 3.49979 6.74635 3.52265 6.40501 3.56172C6.30399 3.33963 6.14559 3.10532 5.98226 2.91364C5.8707 2.78271 5.74118 2.65297 5.60141 2.54738C5.46924 2.44754 5.28846 2.33902 5.07749 2.30587ZM10.9659 11.9205C11.008 11.986 11.0534 12.0562 11.1004 12.1281C11.2305 12.3271 11.3588 12.5176 11.4592 12.6582C11.851 12.568 12.3478 12.3607 12.8257 12.0743C13.3654 11.751 13.7909 11.3808 13.9974 11.068C13.9646 9.56469 13.7789 8.00485 13.4578 6.72112C13.3607 6.33315 13.1848 5.77666 12.9716 5.24844C12.7716 4.75295 12.5595 4.33517 12.3748 4.09471C11.7279 3.76026 10.7129 3.40728 10.0494 3.31046C10.0363 3.31842 10.0194 3.32963 9.99868 3.34529C9.93203 3.39564 9.85461 3.4702 9.77621 3.56221C9.72423 3.62321 9.67803 3.6844 9.6383 3.74229C10.0059 3.82826 10.3304 3.92885 10.6083 4.02989C10.9748 4.16317 11.2606 4.29738 11.4577 4.40024C11.5563 4.4517 11.6329 4.49537 11.6864 4.52727C11.7132 4.54322 11.7343 4.55623 11.7494 4.56581L11.7678 4.57755L11.7736 4.58137L11.7757 4.58275L11.7765 4.5833L11.7769 4.58354C11.7771 4.58365 11.7772 4.58376 11.5146 4.97775L11.7772 4.58376C12.007 4.73694 12.0691 5.04737 11.9159 5.27714C11.763 5.50646 11.4535 5.56875 11.2238 5.41669L11.2235 5.41646L11.2231 5.41618L11.2229 5.41603L11.2228 5.41601C11.2227 5.41591 11.2225 5.41581 11.4999 4.99979L11.2225 5.41581L11.2154 5.4113C11.2074 5.40623 11.1938 5.39776 11.1746 5.38637C11.1364 5.36358 11.0762 5.32913 10.9952 5.28683C10.8329 5.20219 10.5875 5.0864 10.2665 4.96968C9.62463 4.73627 8.68261 4.49979 7.49988 4.49979C6.31715 4.49979 5.37512 4.73627 4.73324 4.96968C4.41227 5.0864 4.16682 5.20219 4.0046 5.28683C3.92352 5.32913 3.86337 5.36358 3.82512 5.38637C3.80599 5.39776 3.79236 5.40623 3.78433 5.4113L3.77652 5.41629L3.77667 5.41619C3.77676 5.41613 3.77684 5.41607 3.77693 5.41601L3.77667 5.41618L3.77667 5.41619C3.54696 5.56889 3.23691 5.50671 3.08385 5.27714C2.93068 5.04737 2.99276 4.73694 3.22253 4.58376L3.49988 4.99979C3.22253 4.58376 3.22269 4.58365 3.22286 4.58354L3.22322 4.5833L3.22406 4.58275L3.22614 4.58137L3.23199 4.57755L3.25034 4.56581C3.2655 4.55623 3.28653 4.54322 3.31331 4.52727C3.36685 4.49537 3.44342 4.4517 3.54203 4.40024C3.73918 4.29738 4.02497 4.16317 4.3915 4.02989C4.66882 3.92905 4.99262 3.82865 5.35935 3.74278C5.31955 3.68475 5.27323 3.62338 5.22111 3.56221C5.1427 3.4702 5.06529 3.39564 4.99863 3.34529C4.9779 3.32963 4.961 3.31842 4.9479 3.31046C4.28437 3.40728 3.2694 3.76026 2.62255 4.09471C2.43782 4.33517 2.2257 4.75295 2.02571 5.24844C1.81252 5.77666 1.63657 6.33315 1.53953 6.72112C1.21844 8.00485 1.03272 9.56469 0.999868 11.068C1.20642 11.3808 1.63193 11.751 2.17164 12.0743C2.64953 12.3607 3.14629 12.568 3.53815 12.6582C3.63854 12.5176 3.76684 12.3271 3.89693 12.1281C3.94405 12.0559 3.98964 11.9855 4.03188 11.9197C3.93671 11.8827 3.84637 11.8452 3.76077 11.8075C3.36036 11.631 3.0661 11.452 2.86711 11.3121C2.76767 11.2423 2.69215 11.1823 2.63915 11.1374C2.61266 11.115 2.59179 11.0963 2.57638 11.0821C2.56868 11.075 2.56234 11.069 2.55734 11.0642L2.55085 11.0579L2.54835 11.0555L2.54729 11.0544L2.5468 11.0539C2.54657 11.0537 2.54635 11.0535 2.8999 10.6999L2.54635 11.0535C2.35109 10.8582 2.35109 10.5416 2.54635 10.3464C2.74058 10.1521 3.05486 10.1511 3.25036 10.3433L3.25423 10.3469C3.25948 10.3517 3.26976 10.361 3.28526 10.3741C3.31624 10.4004 3.36806 10.4419 3.44206 10.4939C3.58994 10.5979 3.82694 10.7438 4.16403 10.8924C4.83647 11.1887 5.91764 11.4999 7.4999 11.4999C9.08217 11.4999 10.1633 11.1887 10.8358 10.8924C11.1729 10.7438 11.4099 10.5979 11.5577 10.4939C11.6317 10.4419 11.6836 10.4004 11.7146 10.3741C11.73 10.361 11.7403 10.3517 11.7456 10.3469L11.7494 10.3433C11.9449 10.1511 12.2592 10.1521 12.4535 10.3464C12.6487 10.5416 12.6487 10.8582 12.4535 11.0535L12.1048 10.7048C12.4535 11.0535 12.4532 11.0537 12.453 11.0539L12.4525 11.0544L12.4515 11.0555L12.449 11.0579L12.4425 11.0642C12.4375 11.069 12.4311 11.075 12.4234 11.0821C12.408 11.0963 12.3872 11.115 12.3607 11.1374C12.3077 11.1823 12.2321 11.2423 12.1327 11.3121C11.9337 11.452 11.6395 11.631 11.239 11.8075C11.1528 11.8454 11.0618 11.8833 10.9659 11.9205ZM4.08036 7.512C4.324 7.24963 4.65464 7.10141 4.99995 7.09976C5.34526 7.10141 5.67591 7.24963 5.91954 7.512C6.16317 7.77437 6.29995 8.12953 6.29995 8.49976C6.29995 8.86999 6.16317 9.22515 5.91954 9.48752C5.67591 9.7499 5.34526 9.89812 4.99995 9.89976C4.65464 9.89812 4.324 9.7499 4.08036 9.48752C3.83673 9.22515 3.69995 8.86999 3.69995 8.49976C3.69995 8.12953 3.83673 7.77437 4.08036 7.512ZM9.99873 7.09976C9.65342 7.10141 9.32277 7.24963 9.07914 7.512C8.83551 7.77437 8.69873 8.12953 8.69873 8.49976C8.69873 8.86999 8.83551 9.22515 9.07914 9.48752C9.32277 9.7499 9.65342 9.89812 9.99873 9.89976C10.344 9.89812 10.6747 9.7499 10.9183 9.48752C11.162 9.22515 11.2987 8.86999 11.2987 8.49976C11.2987 8.12953 11.162 7.77437 10.9183 7.512C10.6747 7.24963 10.344 7.10141 9.99873 7.09976Z"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_389_4649">
                                                                        <rect width="15" height="15" fill="white" transform="translate(0 0.5)" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </a>
                                                    </Link>
                                                    <Link href={RisedleLinks.github}>
                                                        <a className="m-0 flex w-full flex-row items-center justify-between text-left" target="_blank" rel="noreferrer">
                                                            <div>
                                                                <span className="m-0 text-sm font-normal leading-none text-gray-light-12 dark:text-gray-dark-12">Github</span>
                                                                <span className="m-0 text-sm font-normal leading-none text-gray-light-9 dark:text-gray-dark-9">&#8599;</span>
                                                            </div>

                                                            <svg className="fill-gray-light-12 dark:fill-gray-dark-12" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M7.49949 1.3501C3.82779 1.3501 0.850098 4.3274 0.850098 8.00032C0.850098 10.938 2.75535 13.4307 5.39787 14.3105C5.73059 14.3713 5.85184 14.1659 5.85184 13.9896C5.85184 13.8316 5.84612 13.4135 5.84286 12.8588C3.99313 13.2605 3.60285 11.9672 3.60285 11.9672C3.30035 11.1989 2.86435 10.9943 2.86435 10.9943C2.26056 10.582 2.91007 10.5902 2.91007 10.5902C3.57754 10.6371 3.92862 11.2756 3.92862 11.2756C4.5218 12.2917 5.48524 11.9982 5.86408 11.828C5.9245 11.3985 6.09637 11.1054 6.2862 10.9392C4.8096 10.771 3.25707 10.2007 3.25707 7.6525C3.25707 6.92624 3.51631 6.33307 3.94169 5.86809C3.87311 5.69989 3.6449 5.02384 4.00701 4.10816C4.00701 4.10816 4.56507 3.92935 5.8355 4.78951C6.36581 4.64213 6.93489 4.56865 7.5003 4.56579C8.0653 4.56865 8.63398 4.64213 9.1651 4.78951C10.4347 3.92935 10.992 4.10816 10.992 4.10816C11.3549 5.02384 11.1267 5.69989 11.0585 5.86809C11.4847 6.33307 11.7419 6.92624 11.7419 7.6525C11.7419 10.2073 10.1869 10.7694 8.70583 10.9339C8.94424 11.1393 9.15694 11.545 9.15694 12.1656C9.15694 13.0543 9.14877 13.7716 9.14877 13.9896C9.14877 14.1676 9.26879 14.3745 9.606 14.3096C12.2465 13.4282 14.1501 10.9376 14.1501 8.00032C14.1501 4.3274 11.1724 1.3501 7.49949 1.3501Z"
                                                                />
                                                            </svg>
                                                        </a>
                                                    </Link>
                                                </div>

                                                <div className="pb-2 pt-4 text-xs text-gray-light-9 dark:text-gray-dark-9">Others</div>
                                                <div className="mt-2 flex flex-col space-y-4 text-left">
                                                    <Link href={RisedleLinks.docs}>
                                                        <a className="m-0 flex w-full flex-row items-center justify-between text-left" target="_blank" rel="noreferrer">
                                                            <div>
                                                                <span className="m-0 text-sm font-normal leading-none text-gray-light-12 dark:text-gray-dark-12">Docs</span>
                                                                <span className="m-0 text-sm font-normal leading-none text-gray-light-9 dark:text-gray-dark-9">&#8599;</span>
                                                            </div>
                                                            <svg className="fill-gray-light-12 dark:fill-gray-dark-12" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.25781 3.61684C3.67771 3.95796 3.83523 3.93193 4.62369 3.87933L12.0571 3.43299C12.2147 3.43299 12.0836 3.27571 12.0311 3.24957L10.7965 2.35711C10.56 2.17347 10.2448 1.96315 9.64083 2.01576L2.44308 2.54074C2.18059 2.56677 2.12815 2.69801 2.2327 2.80322L3.25781 3.61684ZM3.7041 5.34917V13.1704C3.7041 13.5907 3.91415 13.748 4.38693 13.722L12.5562 13.2493C13.0292 13.2233 13.0819 12.9341 13.0819 12.5927V4.82397C13.0819 4.48306 12.9508 4.29921 12.6612 4.32545L4.12422 4.82397C3.80918 4.85044 3.7041 5.00803 3.7041 5.34917ZM11.7688 5.76872C11.8212 6.00518 11.7688 6.24142 11.5319 6.26799L11.1383 6.34641V12.1205C10.7965 12.3042 10.4814 12.4092 10.2188 12.4092C9.79835 12.4092 9.69305 12.2779 9.37812 11.8844L6.80345 7.84249V11.7532L7.61816 11.937C7.61816 11.937 7.61816 12.4092 6.96086 12.4092L5.14879 12.5143C5.09615 12.4092 5.14879 12.147 5.33259 12.0944L5.80546 11.9634V6.79276L5.1489 6.74015C5.09625 6.50369 5.22739 6.16278 5.5954 6.13631L7.53935 6.00528L10.2188 10.0998V6.47765L9.53564 6.39924C9.4832 6.11018 9.69305 5.90028 9.95576 5.87425L11.7688 5.76872ZM1.83874 1.83212L9.32557 1.28079C10.245 1.20193 10.4815 1.25475 11.0594 1.67452L13.4492 3.35424C13.8436 3.64309 13.975 3.72173 13.975 4.03661V13.2493C13.975 13.8266 13.7647 14.1681 13.0293 14.2203L4.33492 14.7454C3.78291 14.7717 3.52019 14.693 3.23111 14.3253L1.47116 12.0419C1.1558 11.6216 1.02466 11.3071 1.02466 10.9392V2.75041C1.02466 2.27825 1.23504 1.88441 1.83874 1.83212Z" />
                                                            </svg>
                                                        </a>
                                                    </Link>
                                                </div>

                                                {account && (
                                                    <div className="flex flex-row justify-between pb-2 pt-4 text-sm leading-4">
                                                        <button
                                                            className="text-red-light-10 hover:underline dark:text-red-dark-10"
                                                            onClick={() => {
                                                                disconnectWallet();
                                                                toast.remove();
                                                                toast.custom((t) => <ToastSuccess>Wallet disconnected</ToastSuccess>);
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
                                                )}
                                            </>
                                        );
                                    }}
                                </Popover.Panel>
                                <Popover.Overlay className={`${open ? "fixed inset-0 bg-gray-dark-1/60 opacity-100 backdrop-blur dark:bg-black/60" : "opacity-0"} -z-[1]`} />
                            </>
                        );
                    }}
                </Popover>
            </div>
        </>
    );
};

export default ButtonConnectWalletMobile;
