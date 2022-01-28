import { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";
import { chain as Chains, useNetwork } from "wagmi";
import * as Tabs from "@radix-ui/react-tabs";
import toast, { Toaster } from "react-hot-toast";

import Favicon from "../Favicon";
import Footer from "../Footer";
import { useWalletContext } from "../Wallet";
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
import ButtonConnectWalletToMintOrRedeem from "./Buttons/ConnectWalletToMintOrRedeem";
import ButtonSwitchNetwork from "./Buttons/SwitchNetwork";
import LeveragedTokenChart from "./LeveragedTokenChart";
import ButtonMintOrRedeem from "./ButtonMintOrRedeem";
import MarketDetailPageMeta from "./MarketDetailPageMeta";
import VaultChart from "./VaultChart";

// ETHRISE Token ids
const ETHRISEAddresses = {
    [Chains.kovan.id]: { token: "0xc4676f88663360155c2bc6d2A482E34121a50b3b", vault: "0x42B6BAE111D9300E19F266Abf58cA215f714432c" },
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
    const { chain, account } = useWalletContext();
    const [connectedChain, switchNetwork] = useNetwork();

    const ethriseAddress = ETHRISEAddresses[chain.id].token;

    // Get ETHRISE metadata
    const metadata = Metadata[chain.id][ethriseAddress];
    const title = metadata.title;
    const subtitle = metadata.subtitle;
    const logo = metadata.logo;
    const vaultLogo = metadata.vaultLogo;
    const description = metadata.description;
    const informationText = metadata.informationText;
    const vaultInformationText = metadata.vaultInformationText;
    const collateralSymbol = metadata.collateralSymbol;
    const debtSymbol = metadata.debtSymbol;
    const path = metadata.path;

    // Get price external data from Risedle Snapshot
    const { market, marketIsLoading, marketIsError } = useMarket(chain.id, ethriseAddress);

    // Allowances
    // TODO: add collateral token allowance here
    // const [leveragedTokenAllowance] = useContractRead(
    //     {
    //         addressOrName: ethriseAddress,
    //         contractInterface: ERC20ABI,
    //     },
    //     "allowance",
    //     {
    //         args: [account, vaultAddress],
    //     }
    // );
    // console.debug("leveragedTokenAllowance", leveragedTokenAllowance);

    // const [debtTokenAllowance] = useContractRead(
    //     {
    //         addressOrName: debtContract,
    //         contractInterface: ERC20ABI,
    //     },
    //     "allowance",
    //     {
    //         args: [account, vaultAddress],
    //     }
    // );
    // const [rvTokenAllowance] = useContractRead(
    //     {
    //         addressOrName: vaultAddress,
    //         contractInterface: ERC20ABI,
    //     },
    //     "allowance",
    //     {
    //         args: [account, vaultAddress],
    //     }
    // );

    // console.debug("onchainETHRISEMetadata", onchainETHRISEMetadata);
    // console.debug("onchainBalance", onchainBalance);
    // console.debug("onchainNAV", onchainNAV);
    // console.debug("onchainOracle", onchainOracle);
    // console.debug("onchainTotalAvailableCash", onchainTotalAvailableCash);

    // Main button states
    const showConnectWalletToMintOrRedeem = !account || !connectedChain.data || !connectedChain.data.chain;
    const showSwitchNetwork = !showConnectWalletToMintOrRedeem && connectedChain.data.chain && connectedChain.data.chain.id != chain.id ? true : false;
    const showMintOrRedeem = !showConnectWalletToMintOrRedeem && !showSwitchNetwork ? true : false;

    // Current data

    // Approval states
    // TODO(bayu): add collateral token approval states here
    // const isLeveragedTokenApproved = leveragedTokenAllowance.data && leveragedTokenAllowance.data.eq(ethers.constants.MaxUint256) ? true : false;
    // const isDebtTokenApproved = debtTokenAllowance.data && debtTokenAllowance.data.eq(ethers.constants.MaxInt256) ? true : false;
    // const isrvTokenApproved = rvTokenAllowance.data && rvTokenAllowance.data.eq(ethers.constants.MaxInt256) ? true : false;

    // console.debug("isLeveragedTokenApproved", isLeveragedTokenApproved);
    // console.debug("isDebtTokenApproved", isDebtTokenApproved);
    // console.debug("isrvTokenApproved", isrvTokenApproved);

    return (
        <>
            <div className="w-full h-full bg-gray-light-1 dark:bg-gray-dark-1 font-inter min-h-screen flex flex-col overflow-hidden">
                <Head>
                    {/* <!-- HTML Meta Tags --> */}
                    <title>{title} Market | Risedle Protocol</title>
                    <meta name="description" content="Leverage ETH or earn yield from your idle USDC" />
                    <MarketDetailPageMeta title={title} path={path} />
                </Head>
                <Favicon />

                {/* Navigation */}
                <div className="container max-w-full mx-auto sm:z-20">
                    <div className="flex flex-row p-4 items-center justify-between">
                        <div className="flex-none">
                            <Link href="/">
                                <a className="flex items-center">
                                    <Logo />
                                    <span className="text-base font-inter font-bold pl-2 traking-tight text-gray-light-12 dark:text-gray-light-1 self-center leading-0">Risedle</span>
                                </a>
                            </Link>
                        </div>
                        <div className="flex-none flex flex-row space-x-2 inline-block">
                            <div className="hidden sm:inline-block">
                                <ButtonNetworkSwitcher />
                            </div>

                            <div className="hidden sm:inline-block">
                                <ButtonConnectWalletDesktop />
                            </div>

                            <div className="inline-block h-[40px]">
                                <ButtonThemeSwitcher />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sm:z-10 flex flex-col mb-20 sm:mb-0">
                    {/* Market header on the desktop; Only show this on w > 640px */}
                    <div className="hidden sm:inline-block flex flex-col m-auto text-center space-y-6 mt-12 mb-14">
                        <div>
                            <img src={logo} alt={title} className="w-[64px] h-[64px] inline-block" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <h1 className="m-0 text-[32px] leading-none tracking-[-.02em] font-bold text-gray-light-12 dark:text-gray-dark-12">{title} Market</h1>
                            <p className="text-sm text-gray-light-10 dark:text-gray-dark-10">{description}</p>
                        </div>
                    </div>

                    {/* Market tabs and content */}
                    <Tabs.Root defaultValue="leverage" className="px-4 outline-0">
                        <Tabs.List aria-label="ETHRISE" className="bg-gray-light-3 dark:bg-gray-dark-2 rounded-[12px] flex flex-row p-1 mx-auto sm:max-w-[253px] mb-6">
                            <Tabs.Trigger value="leverage" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 state-active:text-gray-light-12 state-active:dark:text-gray-dark-12 state-active:font-bold state-active:py-[12px] state-active:dark:bg-gray-dark-4 state-active:bg-gray-light-1">
                                Leverage
                            </Tabs.Trigger>
                            <Tabs.Trigger value="earn" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 state-active:text-gray-light-12 state-active:dark:text-gray-dark-12 state-active:font-bold state-active:py-[12px] state-active:dark:bg-gray-dark-4 state-active:bg-gray-light-1">
                                Earn
                            </Tabs.Trigger>
                        </Tabs.List>

                        {/* Leverage tab */}
                        <Tabs.Content value="leverage" className="outline-0 flex flex-col mx-auto sm:max-w-[540px] space-y-6">
                            {/* Price info card */}
                            <div className="flex flex-col bg-gray-light-2 dark:bg-gray-dark-2 rounded-[16px] w-full ">
                                {/* Title, subtitle and lgoo */}
                                <div className="flex flex-row p-4 items-center justify-between">
                                    <div className="grow sflex flex-col space-y-2">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                                        <h1 className="m-0 text-2xl text-gray-light-12 dark:text-gray-dark-12 tracking-[-.02em] font-bold">{title}</h1>
                                    </div>
                                    <img className="sm:hidden" src={logo} alt={title} />
                                </div>

                                <LeveragedTokenChart chainID={chain.id} address={ethriseAddress} />

                                {/* Mint & Redeem Button */}
                                <div className="p-4">
                                    {/* Show Connect wallet to mint or redeem */}
                                    {showConnectWalletToMintOrRedeem && <ButtonConnectWalletToMintOrRedeem />}

                                    {/* Show switch netwoek */}
                                    {showSwitchNetwork && (
                                        <ButtonSwitchNetwork
                                            onClick={() => {
                                                if (switchNetwork) {
                                                    switchNetwork(chain.id);
                                                } else {
                                                    toast.custom((t) => <ToastError>Cannot switch network automatically on WalletConnect</ToastError>);
                                                }
                                            }}
                                            chainName={chain.name}
                                        />
                                    )}

                                    {/* Show mint or redeem */}
                                    {showMintOrRedeem && <ButtonMintOrRedeem address={ethriseAddress} />}
                                </div>
                            </div>

                            {/* Information card */}
                            <div className="flex flex-col bg-gray-light-2 dark:bg-gray-dark-2 rounded-[16px] w-full space-y-6 px-4 pb-4">
                                <div className="pt-4">
                                    <h2 className="text-base leading-4 font-bold text-gray-light-12 dark:text-gray-dark-12">Information</h2>
                                </div>
                                <div className="">
                                    <p className="text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">{informationText}</p>
                                </div>
                                <div className="flex flex-col space-y-6">
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Market cap</p>
                                        {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                        {!marketIsLoading && market && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(market.leveraged_token_market_cap)}</p>}
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Leverage ratio</p>
                                        {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                        {!marketIsLoading && market && market.leverage_ratio && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{market.leverage_ratio.toFixed(2) + "x"}</p>}
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Creation &amp; redemption fees</p>
                                        <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">0.1%</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Management fees</p>
                                        <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-green-light-11 dark:text-green-dark-11">FREE</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Underlying assets</p>
                                        <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                                            {collateralSymbol}, {debtSymbol}
                                        </p>
                                    </div>
                                    {/* TODO(bayu): Handle case when capacity is maxed out */}
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Capacity</p>
                                        {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                        {!marketIsLoading && market && (
                                            <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                                                <span className="text-green-light-11 dark:text-green-dark-11">{market.leveraged_token_total_collateral.toFixed(2) + collateralSymbol}</span> / {market.leveraged_token_max_total_collateral > 0 && <span>{market.leveraged_token_max_total_collateral.toFixed(2) + collateralSymbol}</span>}
                                                {market.leveraged_token_max_total_collateral <= 0 && <span>&#8734;</span>}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Allocation card */}
                            <div className="flex flex-col bg-gray-light-2 dark:bg-gray-dark-2 rounded-[16px] w-full space-y-6 px-4 pb-4">
                                <div className="pt-4">
                                    <h2 className="text-base leading-4 font-bold text-gray-light-12 dark:text-gray-dark-12">Allocation</h2>
                                </div>
                                <div className="flex flex-col space-y-6">
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Asset</p>
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Allocation</p>
                                    </div>

                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{collateralSymbol}</p>
                                        {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                        {!marketIsLoading && market && market.collateral_per_token && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{market.collateral_per_token.toFixed(2) + " " + collateralSymbol}</p>}
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{debtSymbol}</p>
                                        {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                        {!marketIsLoading && market && market.debt_per_token && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">-{market.debt_per_token.toFixed(2) + " " + debtSymbol}</p>}
                                    </div>
                                </div>
                            </div>
                        </Tabs.Content>

                        {/* Earn tab */}
                        <Tabs.Content value="earn" className="outline-0 flex flex-col mx-auto max-w-[540px] space-y-6">
                            {/* APY info card */}
                            <div className="flex flex-col bg-gray-light-2 dark:bg-gray-dark-2 rounded-[16px] w-full">
                                {/* Title, subtitle and lgoo */}
                                <div className="flex flex-row p-4 items-center justify-between">
                                    <div className="grow sflex flex-col space-y-2">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                                        <h1 className="m-0 text-2xl text-gray-light-12 dark:text-gray-dark-12 tracking-[-.02em] font-bold">
                                            rv{collateralSymbol}
                                            {debtSymbol}
                                        </h1>
                                    </div>
                                    <img className="sm:hidden" src={vaultLogo} alt={`rv${collateralSymbol}${debtSymbol}`} />
                                </div>

                                {/* Supply & Borrow APY Chart */}
                                <VaultChart address={metadata.vaultAddress} chainID={chain.id} />

                                {/* Mint & Redeem Button */}
                                <div className="p-4">
                                    {/* Wallet not connected; Display disabled button */}
                                    {!account && (
                                        <button disabled className="bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-0 text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-10 rounded-full cursor-not-allowed w-full py-[11px] dark:py-[12px]">
                                            Connect wallet to Deposit or Withdraw
                                        </button>
                                    )}
                                    {/* Wallet connected; Display mint and redeem button */}
                                    {/* TODO (bayu): handle connected wallet */}
                                    {account && <button>Deposit or Withdraw</button>}
                                </div>
                            </div>

                            {/* Information card */}
                            <div className="flex flex-col bg-gray-light-2 dark:bg-gray-dark-2 rounded-[16px] w-full space-y-6 px-4 pb-4">
                                <div className="pt-4">
                                    <h2 className="text-base leading-4 font-bold text-gray-light-12 dark:text-gray-dark-12">Information</h2>
                                </div>
                                <div className="">
                                    <p className="text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">{vaultInformationText}</p>
                                </div>
                                <div className="flex flex-col space-y-6">
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Utilization rate</p>
                                        {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                        {!marketIsLoading && market && market.vault_utilization_rate && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{market.vault_utilization_rate.toFixed(2) + "%"}</p>}
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Total borrowed</p>
                                        {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                        {!marketIsLoading && market && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(market.vault_total_outstanding_debt)}</p>}
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Available to withdraw</p>
                                        {(marketIsLoading || marketIsError) && <p className="w-[100px] h-[16px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse rounded-[8px]"></p>}
                                        {!marketIsLoading && market && <p className="font-ibm text-sm leading-4 font-semibold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(market.vault_total_available_cash)}</p>}
                                    </div>
                                </div>
                            </div>
                        </Tabs.Content>
                    </Tabs.Root>
                    <div className="hidden sm:inline-block sm:mt-20">
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
