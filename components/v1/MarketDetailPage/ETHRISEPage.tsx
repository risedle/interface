import { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";
import { chain as Chains } from "wagmi";
import * as Tabs from "@radix-ui/react-tabs";
import toast, { Toaster } from "react-hot-toast";

import Favicon from "../Favicon";
import Footer from "../Footer";
import { DEFAULT_CHAIN, useWalletContext, getEtherscanAddressURL, formatAddress } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import { useMarket } from "../../../utils/snapshot";
import { dollarFormatter } from "../../../utils/formatters";
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

// ETHRISE Token ids
const ETHRISEAddresses = {
    [Chains.kovan.id]: "0xc4676f88663360155c2bc6d2A482E34121a50b3b",
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

    // Get price external data from Risedle Snapshot
    const { market, marketIsLoading, marketIsError } = useMarket(chainID, ethriseAddress);

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

                {/* Navigation */}
                <div className="container mx-auto max-w-full sm:z-20">
                    <div className="flex flex-row items-center justify-between p-4">
                        <div className="flex-none">
                            <Link href="/">
                                <a className="flex items-center">
                                    <Logo />
                                    <span className="traking-tight leading-0 self-center pl-2 font-inter text-base font-bold text-gray-light-12 dark:text-gray-light-1">Risedle</span>
                                </a>
                            </Link>
                        </div>
                        <div className="inline-block flex flex-none flex-row space-x-2">
                            <div className="hidden sm:inline-block">
                                <ButtonNetworkSwitcher />
                            </div>

                            <div className="hidden sm:inline-block">
                                <ButtonConnectWalletDesktop />
                            </div>

                            <div className="sm:hidden">
                                <Link href={"/markets"}>
                                    <a>
                                        <ButtonTertiary>
                                            <span className="mr-2">&#8592;</span>Markets
                                        </ButtonTertiary>
                                    </a>
                                </Link>
                            </div>

                            <div className="inline-block h-[40px]">
                                <ButtonThemeSwitcher />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-20 flex flex-col sm:z-10 sm:mb-0">
                    {/* Market header on the desktop; Only show this on w > 640px */}
                    <div className="m-auto mt-12 mb-14 flex hidden flex-col space-y-6 text-center sm:inline-block">
                        <div>
                            <img src={metadata.logo} alt={metadata.title} className="inline-block h-[64px] w-[64px]" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <h1 className="m-0 text-[32px] font-bold leading-none tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{metadata.title} Market</h1>
                            <p className="text-sm text-gray-light-10 dark:text-gray-dark-10">{metadata.description}</p>
                        </div>
                    </div>

                    {/* Market tabs and content */}
                    <Tabs.Root defaultValue="leverage" className="px-4 outline-0">
                        <div className="mx-auto mb-6 hidden grid-cols-4 place-content-between gap-2 sm:grid sm:max-w-[540px]">
                            <div className="place-self-center">
                                <Link href={"/markets"}>
                                    <a>
                                        <ButtonTertiary>
                                            <span className="mr-2">&#8592;</span>Markets
                                        </ButtonTertiary>
                                    </a>
                                </Link>
                            </div>
                            <div className="col-span-2 mx-auto">
                                <Tabs.List aria-label="ETHRISE" className="flex flex-row rounded-[12px] bg-gray-light-3 p-1 dark:bg-gray-dark-2 sm:min-w-[253px] sm:max-w-[253px]">
                                    <Tabs.Trigger value="leverage" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 state-active:bg-gray-light-1 state-active:py-[12px] state-active:font-bold state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                                        Leverage
                                    </Tabs.Trigger>
                                    <Tabs.Trigger value="lend" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 state-active:bg-gray-light-1 state-active:py-[12px] state-active:font-bold state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                                        Lend
                                    </Tabs.Trigger>
                                </Tabs.List>
                            </div>
                        </div>

                        {/* For Mobile Layout */}
                        <Tabs.List aria-label="ETHRISE" className="mx-auto mb-6 flex flex-row rounded-[12px] bg-gray-light-3 p-1 dark:bg-gray-dark-2 sm:hidden sm:max-w-[253px]">
                            <Tabs.Trigger value="leverage" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 state-active:bg-gray-light-1 state-active:py-[12px] state-active:font-bold state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                                Leverage
                            </Tabs.Trigger>
                            <Tabs.Trigger value="lend" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 state-active:bg-gray-light-1 state-active:py-[12px] state-active:font-bold state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                                Lend
                            </Tabs.Trigger>
                        </Tabs.List>

                        {/* Leverage tab */}
                        <Tabs.Content value="leverage" className="mx-auto flex flex-col space-y-6 outline-0 sm:max-w-[540px]">
                            {/* Price info card */}
                            <div className="flex w-full flex-col rounded-[16px] bg-gray-light-2 dark:bg-gray-dark-2 ">
                                {/* Title, subtitle and lgoo */}
                                <div className="flex flex-row items-center justify-between p-4">
                                    <div className="sflex grow flex-col space-y-2">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{metadata.subtitle}</p>
                                        <h1 className="m-0 text-2xl font-bold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{metadata.title}</h1>
                                    </div>
                                    <img className="sm:hidden" src={metadata.logo} alt={metadata.title} />
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

                            {/* My Asset card */}
                            {showMyAsset && <MyAssetCard address={ethriseAddress} />}

                            {/* Information card */}
                            <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
                                <div className="pt-4">
                                    <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Information</h2>
                                </div>
                                <div className="">
                                    <p className="text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">{metadata.informationText}</p>
                                </div>
                                <div className="flex flex-col space-y-6">
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Market cap</p>
                                        {(marketIsLoading || marketIsError) && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                        {!marketIsLoading && market && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(market.leveraged_token_market_cap)}</p>}
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Leverage ratio</p>
                                        {(marketIsLoading || marketIsError) && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                        {!marketIsLoading && market && market.leverage_ratio && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{market.leverage_ratio.toFixed(2) + "x"}</p>}
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Creation &amp; redemption fees</p>
                                        <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">0.1%</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Management fees</p>
                                        <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-green-light-11 dark:text-green-dark-11">FREE</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Underlying assets</p>
                                        <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                                            {metadata.collateralSymbol}, {metadata.debtSymbol}
                                        </p>
                                    </div>
                                    {/* TODO(bayu): Handle case when capacity is maxed out */}
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Capacity</p>
                                        {(marketIsLoading || marketIsError) && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                        {!marketIsLoading && market && (
                                            <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                                                <span className="text-green-light-11 dark:text-green-dark-11">{market.leveraged_token_total_collateral.toFixed(2) + metadata.collateralSymbol}</span> / {market.leveraged_token_max_total_collateral > 0 && <span>{market.leveraged_token_max_total_collateral.toFixed(2) + metadata.collateralSymbol}</span>}
                                                {market.leveraged_token_max_total_collateral <= 0 && <span>&#8734;</span>}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Contract Address</p>
                                        <a href={getEtherscanAddressURL(chain.chain, ethriseAddress)} target="_blank" rel="noopener noreferrer" className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                                            {formatAddress(ethriseAddress)} &#8599;
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Backing card */}
                            <BackingCard address={ethriseAddress} />
                        </Tabs.Content>

                        {/* Lend tab */}
                        <Tabs.Content value="lend" className="mx-auto flex max-w-[540px] flex-col space-y-6 outline-0">
                            {/* APY info card */}
                            <div className="flex w-full flex-col rounded-[16px] bg-gray-light-2 dark:bg-gray-dark-2">
                                {/* Title, subtitle and lgoo */}
                                <div className="flex flex-row items-center justify-between p-4">
                                    <div className="sflex grow flex-col space-y-2">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{metadata.subtitle}</p>
                                        <h1 className="m-0 text-2xl font-bold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{metadata.vaultTitle}</h1>
                                    </div>
                                    <img className="sm:hidden" src={metadata.vaultLogo} alt={`rv${metadata.collateralSymbol}${metadata.debtSymbol}`} />
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
                            <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
                                <div className="pt-4">
                                    <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Information</h2>
                                </div>
                                <div className="">
                                    <p className="text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">{metadata.vaultInformationText}</p>
                                </div>
                                <div className="flex flex-col space-y-6">
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Utilization rate</p>
                                        {(marketIsLoading || marketIsError) && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                        {!marketIsLoading && market && market.vault_utilization_rate && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{market.vault_utilization_rate.toFixed(2) + "%"}</p>}
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Total borrowed</p>
                                        {(marketIsLoading || marketIsError) && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                        {!marketIsLoading && market && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(market.vault_total_outstanding_debt)}</p>}
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Available to withdraw</p>
                                        {(marketIsLoading || marketIsError) && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                        {!marketIsLoading && market && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(market.vault_total_available_cash)}</p>}
                                    </div>
                                </div>
                            </div>
                        </Tabs.Content>
                    </Tabs.Root>
                    <div className="hidden sm:mt-20 sm:inline-block">
                        <Footer />
                    </div>
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
