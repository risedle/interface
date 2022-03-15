import type { FunctionComponent } from "react";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import MarketsPageMeta from "../MarketsPage/MarketsPageMeta";
import Favicon from "../Favicon";
import Logo from "../Logo";
import ButtonNetworkSwitcher from "../Buttons/NetworkSwitcher";
import ButtonConnectWalletDesktop from "../Buttons/ConnectWalletDesktop";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";
import ButtonThemeSwitcher from "../Buttons/ThemeSwitcher";
import BackgroundGradient from "./BackgroundGradient";
import { chain as Chains, useProvider, useBalance, erc20ABI, useToken } from "wagmi";
import { useWalletContext, DEFAULT_CHAIN } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import PortofolioChart from "./PortofolioChart";
import { useTransferEvents } from "../swr/useTransferEvents";
import { useTransactionHistory } from "../swr/useTransactionHistory";
import { useTokenBalance } from "../swr/useTokenBalance";
import { tokenBalanceFormatter, dollarFormatter } from "../../../utils/formatters";
import { ethers } from "ethers";
import { useLeveragedTokenNAV } from "../swr/useLeveragedTokenNAV";
import { useLeveragedTokenDailyData } from "../swr/useLeveragedTokenDailyData";

// ETHRISE Token ids
const ETHRISEAddresses = {
    [Chains.kovan.id]: "0xc4676f88663360155c2bc6d2A482E34121a50b3b",
    [Chains.arbitrumOne.id]: "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452",
};

/**
 * PortofolioPageProps is a React Component properties that passed to React Component PortofolioPage
 */
type PortofolioPageProps = {};

/**
 * PortofolioPage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const PortofolioPage: FunctionComponent<PortofolioPageProps> = ({}) => {

    const { chain, account, switchNetwork } = useWalletContext();

    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const ethriseAddress = ETHRISEAddresses[chainID];

    // Get ETHRISE metadata
    const metadata = Metadata[chainID][ethriseAddress];

    // Get Provider
    const provider = useProvider();

    // Get User's ETHRISE Balance
    const ethriseBalance = useTokenBalance({account: account, token: ethriseAddress, provider: provider});
    const formattedEthriseBalance = tokenBalanceFormatter.format(parseFloat(ethers.utils.formatUnits(ethriseBalance.data ? ethriseBalance.data : 0)));

    // Get User's rvETHUSDC Balance
    const rvEthriseUsdcBalance = useTokenBalance({account: account, token: metadata.vaultAddress, provider: provider});
    const formattedRvEthriseUsdcBalance = parseFloat(ethers.utils.formatUnits(rvEthriseUsdcBalance.data ? rvEthriseUsdcBalance.data : 0, metadata.debtDecimals));

    // Get Latest ETHRISE NAV
    const latestEthriseNav = useLeveragedTokenNAV({ token: ethriseAddress, vault: metadata.vaultAddress, provider: provider });
    const latestEthriseNavFormatted = parseFloat(ethers.utils.formatUnits(latestEthriseNav.data ? latestEthriseNav.data : 0, metadata.debtDecimals));

    // Get daily ETHRISE NAV
    const dailyData = useLeveragedTokenDailyData(chainID, ethriseAddress);

    // Get transaction history
    const transactionHistory = useTransactionHistory({account: account, contract: ethriseAddress, provider: provider})
    
    return(
        <>
            <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
                <Head>
                    {/* <!-- HTML Meta Tags --> */}
                    <title>Risedle Protocol</title>
                    <meta name="description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
                    <MarketsPageMeta />
                </Head>
                <Favicon />

                {/* Navigation */}
                <div className="container z-10 mx-auto max-w-full sm:z-20">
                    <div className="grid grid-cols-3 content-center place-items-center p-4">
                        <div className="justify-self-start">
                            <Link href="/">
                                <a className="flex items-center">
                                    <Logo />
                                    <span className="hidden sm:block traking-tight leading-0 self-center pl-2 font-inter text-base font-bold text-gray-light-12 dark:text-gray-light-1">Risedle</span>
                                </a>
                            </Link>
                        </div>
                        <div className="space-x-4 text-sm text-gray-light-12 dark:text-gray-dark-12">
                            <Link href="/markets">
                                <a>Markets</a>
                            </Link>
                            <Link href="/portofolio">
                                <a>Portofolio</a>
                            </Link>
                        </div>
                        <div className="justify-self-end inline-block flex flex-row space-x-2">
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

                <div className="mb-20 flex flex-col sm:mt-12 sm:z-10 sm:mb-0 px-4 lg:px-28 outline-0">
                    <div className="w-full mx-auto flex flex-col space-y-6 outline-0 sm:grid sm:grid-cols-2 sm:gap-[24px] sm:space-y-0">
                        {/* Left Column: Price info */}
                        <div>
                            <div className="flex w-full flex-col rounded-[16px] bg-gray-light-2 dark:bg-gray-dark-2 pb-4">
                                {/* Title, subtitle and lgoo */}
                                <div className="flex flex-row items-center justify-between p-4">
                                    <div className="flex grow flex-col space-y-2">
                                        <h1 className="m-0 text-2xl font-bold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">Portofolio</h1>
                                    </div>
                                </div>
                                <PortofolioChart address={ethriseAddress} />
                            </div>
                        </div>
                        {/* Right Column: Assets Info*/}
                        {/* TODO (Matthew): Implement mobile layout, currently only desktop layout that has been implemented */}
                        <div className="flex flex-col space-y-6">
                            {/* Leveraged Token Assets */}
                            <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
                                <div className="pt-4">
                                    <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Leveraged Token Assets</h2>
                                </div>
                                <div>
                                    <table className="table-auto w-full">
                                        <thead className="text-right">
                                            <tr>
                                                <th className="pb-4 w-2/5 text-left text-sm text-gray-light-9 dark:text-gray-dark-9 font-normal">Token</th>
                                                <th className="pb-4 w-1/5 text-sm text-gray-light-9 dark:text-gray-dark-9 font-normal">Amount</th>
                                                <th className="pb-4 w-1/5 text-sm text-gray-light-9 dark:text-gray-dark-9 font-normal">Return</th>
                                                <th className="pb-4 w-1/5 text-sm text-gray-light-9 dark:text-gray-dark-9 font-normal">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* TODO(Matthew): Use map if there are more than 1 Leveraged token */}
                                            <tr className="text-right text-sm font-semibold">
                                                <td className="text-left flex items-center space-x-4">
                                                    <img src={metadata.logo} alt={metadata.title} />
                                                    <p className="text-gray-light-12 dark:text-gray-dark-12">{metadata.title}</p>
                                                </td>
                                                <td className="text-gray-light-10 dark:text-gray-dark-10">{formattedEthriseBalance.toFixed(2)}</td>
                                                <td className="text-green-light-11 dark:text-green-dark-11">+$13.34</td>
                                                <td className="text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(latestEthriseNavFormatted * formattedEthriseBalance)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Liquidity Vault Assets */}
                            <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
                                <div className="pt-4">
                                    <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Liquidity Vault Assets</h2>
                                </div>
                                <div>
                                    <table className="table-auto w-full">
                                        <thead className="text-right">
                                            <tr>
                                                <th className="pb-4 w-2/5 text-left text-sm text-gray-light-9 dark:text-gray-dark-9 font-normal">Token</th>
                                                <th className="pb-4 w-1/5 text-sm text-gray-light-9 dark:text-gray-dark-9 font-normal">Amount</th>
                                                <th className="pb-4 w-1/5 text-sm text-gray-light-9 dark:text-gray-dark-9 font-normal">Return</th>
                                                <th className="pb-4 w-1/5 text-sm text-gray-light-9 dark:text-gray-dark-9 font-normal">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* TODO(Matthew): Use map if there are more than 1 Leveraged token */}
                                            <tr className="text-right text-sm font-semibold">
                                                <td className="text-left flex items-center space-x-4">
                                                    <img src={metadata.vaultLogo} alt={metadata.title} />
                                                    <p className="text-gray-light-12 dark:text-gray-dark-12">{metadata.vaultTitle}</p>
                                                </td>
                                                <td className="text-gray-light-10 dark:text-gray-dark-10">{formattedRvEthriseUsdcBalance.toFixed(2)}</td>
                                                <td className="text-green-light-11 dark:text-green-dark-11">+$13.34</td>
                                                <td className="text-gray-light-12 dark:text-gray-dark-12">$122.37</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Transaction History */}
                            <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
                                <div className="pt-4">
                                    <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Transaction History</h2>
                                </div>
                                <div>
                                    <table className="table-auto w-full">
                                        <thead className="text-right">
                                            <tr>
                                                <th className="pb-4 w-2/5 text-left text-sm text-gray-light-9 dark:text-gray-dark-9 font-normal">Transaction</th>
                                                <th className="pb-4 w-1/5 text-sm text-gray-light-9 dark:text-gray-dark-9 font-normal">Amount</th>
                                                <th className="pb-4 w-1/5 text-sm text-gray-light-9 dark:text-gray-dark-9 font-normal">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactionHistory.data?.sort((a, b) => { return b.date.getTime() - a.date.getTime() }).map((item) => {
                                                return(
                                                    <tr className="text-right text-sm font-semibold">
                                                        <td className="text-left flex items-center space-x-4 pb-4">
                                                            <img src={metadata.logo} alt={metadata.title} />
                                                            <div>
                                                                <p className="text-gray-light-12 dark:text-gray-dark-12">{item.type}</p>
                                                                <p className="text-gray-light-10 dark:text-gray-dark-10">{item.date.toDateString()}</p>
                                                            </div>
                                                        </td>
                                                        <td className="text-gray-light-10 dark:text-gray-dark-10">{item.value}</td>
                                                        <td className="text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(latestEthriseNavFormatted * parseFloat(item.value))}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BackgroundGradient />
            </div>
            <div className="sm:hidden">
                <ButtonConnectWalletMobile />
            </div>
        </>
    )
}

export default PortofolioPage;