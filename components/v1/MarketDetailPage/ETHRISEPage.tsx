import { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";
import { chain as Chains } from "wagmi";
import * as Tabs from "@radix-ui/react-tabs";
import toast, { Toaster } from "react-hot-toast";

import Favicon from "../Favicon";
import Footer from "../Footer";
import { DEFAULT_CHAIN, useWalletContext } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";
import Logo from "../Logo";
import ButtonNetworkSwitcher from "../Buttons/NetworkSwitcher";
import ButtonConnectWalletDesktop from "../Buttons/ConnectWalletDesktop";
import ButtonThemeSwitcher from "../Buttons/ThemeSwitcher";
import ToastError from "../Toasts/Error";
import BackgroundGradient from "./BackgroundGradient";
import ButtonSwitchNetwork from "./Buttons/SwitchNetwork";
import LeveragedTokenChart from "./LeveragedTokenChart";
import ButtonMintOrRedeem from "./ButtonMintOrRedeem";
import MarketDetailPageMeta from "./MarketDetailPageMeta";
import VaultChart from "./VaultChart";
import ButtonDisabled from "../Buttons/ButtonDisabled";
import ButtonDepositOrWithdraw from "./ButtonDepositOrWithdraw";
import ButtonTertiary from "../Buttons/ButtonTertiary";
import MyAssetCard from "./LeveragedTokenMyAssetCard";
import BackingCard from "./LeveragedTokenBackingCard";
import InformationCard from "./LeveragedTokenInformationCard";
import { useMarket } from "../swr/useMarket";
import VaultInformationCard from "./VaultInformationCard";
import Navigation from "../Navigation";

// ETHRISE Token ids
const ETHRISEAddresses = {
    [Chains.arbitrumOne.id]: "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452",
};

/**
 * ETHRISEPageProps is a React Component properties that passed to React Component ETHRISEPage
 */
type ETHRISEPageProps = {};

/**
 * ETHRISEPage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ETHRISEPage: FunctionComponent<ETHRISEPageProps> = ({}) => {
    const { chain, account, switchNetwork } = useWalletContext();

    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const ethriseAddress = ETHRISEAddresses[chainID];

    // Get ETHRISE metadata
    const metadata = Metadata[chainID][ethriseAddress];

    // Main button states
    const showConnectWallet = !account;
    const showSwitchNetwork = !showConnectWallet && chain.unsupported;
    const showAction = !showConnectWallet && !showSwitchNetwork ? true : false;
    const showMyAsset = !showConnectWallet && !showSwitchNetwork ? true : false;

    return (
        <>
            <div className="flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
                <Head>
                    {/* <!-- HTML Meta Tags --> */}
                    <title>{metadata.title} Market | Risedle Protocol</title>
                    <meta name="description" content="Leverage ETH or earn yield from your idle USDC" />
                    <MarketDetailPageMeta title={metadata.title} path={metadata.path} />
                </Head>
                <Favicon />

                <Navigation marketsActive portfolioActive />

                <div className="mb-20 flex flex-grow flex-col sm:z-10 sm:mb-0">
                    {/* Market tabs and content */}
                    <Tabs.Root defaultValue="leverage" className="px-4 outline-0 sm:mx-auto sm:mt-10">
                        <Tabs.List aria-label="ETHRISE" className="mb-6 flex flex-row rounded-[12px] bg-gray-light-3 p-1 dark:bg-gray-dark-2 sm:max-w-[343px]">
                            <Tabs.Trigger value="leverage" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 state-active:bg-gray-light-1 state-active:py-[12px] state-active:font-bold state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                                Leverage
                            </Tabs.Trigger>
                            <Tabs.Trigger value="lend" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 state-active:bg-gray-light-1 state-active:py-[12px] state-active:font-bold state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                                Lend
                            </Tabs.Trigger>
                        </Tabs.List>

                        {/* Leverage tab */}
                        <Tabs.Content value="leverage" className="mx-auto flex flex-col space-y-6 outline-0 sm:gap-[24px] sm:space-y-0 lg:grid lg:grid-cols-2">
                            {/* Left Column */}
                            <div className="max-w-[540px]">
                                {/* Price info card */}
                                <div className="flex w-full flex-col rounded-[16px] bg-gray-light-2 dark:bg-gray-dark-2 ">
                                    {/* Title, subtitle and lgoo */}
                                    <div className="flex flex-row items-center justify-between p-4">
                                        <div className="sflex grow flex-col space-y-2">
                                            <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{metadata.subtitle}</p>
                                            <h1 className="m-0 text-2xl font-bold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{metadata.title}</h1>
                                        </div>
                                        <img className="h-[48px] w-[48px]" src={metadata.logo} alt={metadata.title} />
                                    </div>

                                    <LeveragedTokenChart address={ethriseAddress} />

                                    {/* Mint & Redeem Button */}
                                    <div className="p-4">
                                        {/* Show Connect wallet to mint or redeem */}
                                        {showConnectWallet && <ButtonDisabled full>Connect wallet to Mint or Redeem</ButtonDisabled>}

                                        {/* Show switch network */}
                                        {showSwitchNetwork && (
                                            <ButtonSwitchNetwork
                                                onClick={() => {
                                                    if (switchNetwork) {
                                                        switchNetwork(DEFAULT_CHAIN.id);
                                                    } else {
                                                        toast.custom((t) => <ToastError>Cannot switch network automatically on WalletConnect</ToastError>);
                                                    }
                                                }}
                                                chainName={DEFAULT_CHAIN.name}
                                            />
                                        )}

                                        {/* Show mint or redeem */}
                                        {showAction && <ButtonMintOrRedeem address={ethriseAddress} />}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex max-w-[540px] flex-col space-y-6">
                                {/* My Asset card */}
                                {showMyAsset && <MyAssetCard address={ethriseAddress} />}

                                {/* Information card */}
                                <InformationCard address={ethriseAddress} />

                                {/* Backing card */}
                                <BackingCard address={ethriseAddress} />
                            </div>
                        </Tabs.Content>

                        {/* Lend tab */}
                        <Tabs.Content value="lend" className="flex flex-col space-y-6 outline-0 sm:gap-[24px] sm:space-y-0 lg:grid lg:grid-cols-2">
                            {/* APY info card */}
                            <div className="flex w-full max-w-[540px] flex-col rounded-[16px] bg-gray-light-2 dark:bg-gray-dark-2">
                                {/* Title, subtitle and lgoo */}
                                <div className="flex flex-row items-center justify-between p-4">
                                    <div className="sflex grow flex-col space-y-2">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{metadata.subtitle}</p>
                                        <h1 className="m-0 text-2xl font-bold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{metadata.vaultTitle}</h1>
                                    </div>
                                    <img className="h-[48px] w-[48px]" src={metadata.vaultLogo} alt={`rv${metadata.collateralSymbol}${metadata.debtSymbol}`} />
                                </div>

                                {/* Supply & Borrow APY Chart */}
                                <VaultChart address={metadata.vaultAddress} />

                                {/* Deposit and Withdraw button */}
                                <div className="p-4">
                                    {/* Show Connect wallet to mint or redeem */}
                                    {showConnectWallet && <ButtonDisabled full>Connect wallet to Deposit or Withdraw</ButtonDisabled>}

                                    {/* Show switch netwoek */}
                                    {showSwitchNetwork && (
                                        <ButtonSwitchNetwork
                                            onClick={() => {
                                                if (switchNetwork) {
                                                    switchNetwork(DEFAULT_CHAIN.id);
                                                } else {
                                                    toast.custom((t) => <ToastError>Cannot switch network automatically on WalletConnect</ToastError>);
                                                }
                                            }}
                                            chainName={DEFAULT_CHAIN.name}
                                        />
                                    )}

                                    {/* Show mint or redeem */}
                                    {showAction && <ButtonDepositOrWithdraw address={ethriseAddress} />}
                                </div>
                            </div>

                            {/* Information card */}
                            <div className="max-w-[540px] flex-col space-y-6">
                                {showMyAsset && <MyAssetCard isVault address={ethriseAddress} />}

                                <VaultInformationCard address={ethriseAddress} />
                            </div>
                        </Tabs.Content>
                    </Tabs.Root>
                </div>
                <div className="hidden sm:mt-20 sm:inline-block">
                    <Footer />
                </div>
                <BackgroundGradient />
            </div>

            <div className="sm:hidden">
                <ButtonConnectWalletMobile />
            </div>

            <div className="sm:hidden">
                <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
            </div>
        </>
    );
};

export default ETHRISEPage;
