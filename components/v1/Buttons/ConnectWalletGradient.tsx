import type { FunctionComponent } from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { InjectedConnector, useConnect } from "wagmi";
import toast, { Toaster } from "react-hot-toast";

import { MetaMaskConnector, WCConnector } from "../Wallet";

import MetamaskIcon from "../../../public/wallet/Metamask.svg";
import WalletConnectIcon from "../../../public/wallet/WalletConnect.svg";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import ToastError from "../Toasts/Error";

/**
 * ButtonConnectWalletGradientProps is a React Component properties that passed to React Component ButtonConnectWalletGradient
 */
type ButtonConnectWalletGradientProps = {};

/**
 * ButtonConnectWalletGradient is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonConnectWalletGradient: FunctionComponent<ButtonConnectWalletGradientProps> =
    ({}) => {
        const [{ data, error }, connect] = useConnect();
        let [isOpen, setIsOpen] = useState(false);
        let [isConnecting, setIsConnecting] = useState(false);
        let [usedConnector, setUsedConnector] = useState("MetaMask");

        // Debugs
        console.debug("ButtonConnectWalletGradient data:", data);
        console.debug("ButtonConnectWalletGradient error:", error);
        console.debug("ButtonConnectWalletGradient connect:", connect);

        // Connect function
        const connectWallet = async (
            connector: InjectedConnector | WalletConnectConnector
        ) => {
            setIsConnecting(true);
            setUsedConnector(connector.name);
            const result = await connect(connector);
            console.debug("connectWallet result", result);
            if (result && result.error) {
                toast.custom(
                    (t) => <ToastError>{result.error.message}</ToastError>,
                    {
                        position: "bottom-right",
                    }
                );
            }
            if (result && result.data) {
                toast("Wallet connected");
            }
            setIsConnecting(false);
        };

        return (
            <>
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="fixed z-10 inset-0 overflow-y-auto"
                >
                    <div className="flex items-center justify-center min-h-screen">
                        <Dialog.Overlay className="fixed inset-0 bg-white/20 dark:bg-black/20 backdrop-blur" />

                        <div className="flex flex-col relative bg-gray-light-1 dark:bg-gray-dark-1 border border-gray-light-3 dark:border-gray-dark-3 rounded-[24px] max-w-sm mx-auto w-[342px]">
                            <Dialog.Title className="text-center pr-4 py-4 pl-[49px] border-b border-gray-light-3 dark:border-gray-dark-3 border-dashed m-0">
                                <span className="text-base leading-none font-bold text-gray-light-12 dark:text-gray-dark-12">
                                    {isConnecting
                                        ? "Connecting..."
                                        : "Connect Wallet"}
                                </span>
                                <button
                                    className="float-right bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 rounded-full align-middle self-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="align-middle inline-block fill-gray-light-12 dark:fill-gray-dark-12 m-2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                                        />
                                    </svg>
                                </button>
                            </Dialog.Title>

                            <div className="flex flex-col p-4 space-y-2">
                                <button
                                    className="bg-orange-light-2 dark:bg-orange-dark-2 border border-orange-light-5 dark:border-orange-dark-5 rounded-[12px] py-[11px] px-[12px] text-left w-full m-0 flex flex-row items-center justify-between"
                                    onClick={() => {
                                        connectWallet(MetaMaskConnector);
                                    }}
                                >
                                    <div>
                                        <img
                                            src={MetamaskIcon}
                                            alt="MetaMask"
                                            className="inline-block self-center  mr-4"
                                        />
                                        <span className="text-sm text-gray-light-12 dark:text-gray-dark-12 font-semibold font-inter m-0 leading-none">
                                            Metamask
                                        </span>
                                    </div>
                                    {isConnecting &&
                                        usedConnector === "MetaMask" && (
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="animate-spin inline-block float-right"
                                            >
                                                <path
                                                    opacity="0.2"
                                                    d="M28 16.0005C28 22.6279 22.6274 28.0005 16 28.0005C9.37258 28.0005 4 22.6279 4 16.0005C4 9.37307 9.37258 4.00049 16 4.00049C22.6274 4.00049 28 9.37307 28 16.0005ZM6.4 16.0005C6.4 21.3024 10.6981 25.6005 16 25.6005C21.3019 25.6005 25.6 21.3024 25.6 16.0005C25.6 10.6986 21.3019 6.40049 16 6.40049C10.6981 6.40049 6.4 10.6986 6.4 16.0005Z"
                                                    className="fill-gray-light-12 dark:fill-gray-dark-12"
                                                />
                                                <path
                                                    d="M26.8 16.0005C27.4627 16.0005 28.0062 16.5391 27.9401 17.1985C27.7286 19.3064 26.9618 21.3285 25.7082 23.0539C24.2187 25.1041 22.1183 26.6301 19.7082 27.4132C17.2981 28.1963 14.7019 28.1963 12.2918 27.4132C10.2635 26.7541 8.45455 25.5689 7.04447 23.9879C6.60334 23.4933 6.72645 22.7381 7.26262 22.3486C7.79879 21.959 8.5442 22.0841 8.99756 22.5675C10.1008 23.7439 11.4874 24.6283 13.0334 25.1306C14.9615 25.7571 17.0385 25.7571 18.9666 25.1306C20.8947 24.5042 22.5749 23.2834 23.7666 21.6432C24.722 20.3281 25.324 18.7975 25.5251 17.1974C25.6077 16.5398 26.1373 16.0005 26.8 16.0005Z"
                                                    className="fill-gray-light-12 dark:fill-gray-dark-12"
                                                />
                                            </svg>
                                        )}
                                </button>
                                <button
                                    className="bg-blue-light-2 dark:bg-blue-dark-2 border border-blue-light-5 dark:border-blue-dark-5 rounded-[12px] py-[11px] px-[12px] text-left w-full m-0 flex flex-row items-center justify-between"
                                    onClick={() => {
                                        connectWallet(WCConnector);
                                    }}
                                >
                                    <div>
                                        <img
                                            src={WalletConnectIcon}
                                            alt="WalletConnect"
                                            className="inline-block self-center  mr-4"
                                        />
                                        <span className="text-sm text-gray-light-12 dark:text-gray-dark-12 font-semibold font-inter m-0 leading-none">
                                            Wallet Connect
                                        </span>
                                    </div>
                                    {isConnecting &&
                                        usedConnector === "WalletConnect" && (
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="animate-spin inline-block float-right"
                                            >
                                                <path
                                                    opacity="0.2"
                                                    d="M28 16.0005C28 22.6279 22.6274 28.0005 16 28.0005C9.37258 28.0005 4 22.6279 4 16.0005C4 9.37307 9.37258 4.00049 16 4.00049C22.6274 4.00049 28 9.37307 28 16.0005ZM6.4 16.0005C6.4 21.3024 10.6981 25.6005 16 25.6005C21.3019 25.6005 25.6 21.3024 25.6 16.0005C25.6 10.6986 21.3019 6.40049 16 6.40049C10.6981 6.40049 6.4 10.6986 6.4 16.0005Z"
                                                    className="fill-gray-light-12 dark:fill-gray-dark-12"
                                                />
                                                <path
                                                    d="M26.8 16.0005C27.4627 16.0005 28.0062 16.5391 27.9401 17.1985C27.7286 19.3064 26.9618 21.3285 25.7082 23.0539C24.2187 25.1041 22.1183 26.6301 19.7082 27.4132C17.2981 28.1963 14.7019 28.1963 12.2918 27.4132C10.2635 26.7541 8.45455 25.5689 7.04447 23.9879C6.60334 23.4933 6.72645 22.7381 7.26262 22.3486C7.79879 21.959 8.5442 22.0841 8.99756 22.5675C10.1008 23.7439 11.4874 24.6283 13.0334 25.1306C14.9615 25.7571 17.0385 25.7571 18.9666 25.1306C20.8947 24.5042 22.5749 23.2834 23.7666 21.6432C24.722 20.3281 25.324 18.7975 25.5251 17.1974C25.6077 16.5398 26.1373 16.0005 26.8 16.0005Z"
                                                    className="fill-gray-light-12 dark:fill-gray-dark-12"
                                                />
                                            </svg>
                                        )}
                                </button>
                            </div>

                            <div className="text-center p-4 border-t border-gray-light-3 dark:border-gray-dark-3 border-dashed m-0">
                                <p className="text-gray-light-11 dark:text-gray-dark-11 text-xs leading-1">
                                    By connecting your wallet to Residle
                                    you&apos;re agree with our{" "}
                                    <a
                                        href="#"
                                        className="underline text-gray-light-12 dark:text-gray-dark-12"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Terms and Conditions
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </Dialog>

                <button
                    className="text-gray-light-12 text-sm font-semibold py-3 px-4 rounded-full leading-4 inline-block"
                    style={{
                        background:
                            "radial-gradient(91.36% 358.74% at 12.29% 100%, #C9BBFF 0%, #B2ECFF 30.08%, #FFC1F9 60.28%, #FFF5C1 100%)",
                        boxShadow:
                            "-20px -24px 54px rgba(255, 169, 231, 0.08), 0px 6px 54px rgba(186, 243, 255, 0.16)",
                    }}
                    onClick={() => setIsOpen(true)}
                >
                    Connect Wallet
                </button>

                <Toaster />
            </>
        );
    };

export default ButtonConnectWalletGradient;
