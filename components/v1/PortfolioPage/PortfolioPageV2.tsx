import { FunctionComponent } from "react";
import Head from "next/head";
import PortofolioPageMeta from "./PortfolioPageMeta";
import Favicon from "../../../uikit/layout/Favicon";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";
import BackgroundGradient from "./BackgroundGradient";
import { chain as Chains, useProvider } from "wagmi";
import { useWalletContext, DEFAULT_CHAIN, formatAddress } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import { useTokenBalance } from "../swr/useTokenBalance";
import { tokenBalanceFormatter, dollarFormatter } from "../../../utils/formatters";
import { ethers } from "ethers";
import { useLeveragedTokenNAV } from "../swr/useLeveragedTokenNAV";
import Footer from "../../../uikit/layout/Footer";
import Navigation from "../Navigation";
import { useVaultExchangeRate } from "../swr/useVaultExchangeRate";

// ETHRISE Token ids
const ETHRISEAddresses = {
    [Chains.arbitrumOne.id]: "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452",
};

/**
 * PortfolioPageV2Props is a React Component properties that passed to React Component PortfolioPageV2
 */
type PortfolioPageV2Props = {};

/**
 * PortfolioPageV2 is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const PortfolioPageV2: FunctionComponent<PortfolioPageV2Props> = ({}) => {
    const { chain, account, switchNetwork } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;

    // Tokens
    const ethriseAddress = ETHRISEAddresses[chainID];
    const ethriseMetadata = Metadata[chainID][ethriseAddress];

    // Get Provider
    const provider = useProvider();

    // Get tokens balance
    const ethriseBalanceResponse = useTokenBalance({ account: account, token: ethriseAddress, provider: provider });
    const ethriseBalance = parseFloat(ethers.utils.formatUnits(ethriseBalanceResponse.data ? ethriseBalanceResponse.data : 0, ethriseMetadata.collateralDecimals));
    const rvETHUSDCBalanceResponse = useTokenBalance({ account: account, token: ethriseMetadata.vaultAddress, provider: provider });
    const rvETHUSDCBalance = parseFloat(ethers.utils.formatUnits(rvETHUSDCBalanceResponse.data ? rvETHUSDCBalanceResponse.data : 0, ethriseMetadata.debtDecimals));

    // Get tokens value
    const latestEthriseNavResponse = useLeveragedTokenNAV({ token: ethriseAddress, vault: ethriseMetadata.vaultAddress, provider: provider });
    const latestEthriseNav = parseFloat(ethers.utils.formatUnits(latestEthriseNavResponse.data ? latestEthriseNavResponse.data : 0, ethriseMetadata.debtDecimals));
    const latestVaultExchangeRateResponse = useVaultExchangeRate({ vault: ethriseMetadata.vaultAddress, provider: provider });
    const latestVaultExchangeRate = parseFloat(ethers.utils.formatUnits(latestVaultExchangeRateResponse.data ? latestVaultExchangeRateResponse.data : 0, ethriseMetadata.collateralDecimals));

    // Get USD value for each user's token balance
    const ethriseValue = ethriseBalance * latestEthriseNav;
    const rvETHUSDCValue = rvETHUSDCBalance * latestVaultExchangeRate;

    // Get Total Portofolio Value
    const totalValue = ethriseValue + rvETHUSDCValue;

    // UI States
    const showTotalValueLoading = ethriseBalanceResponse.isLoading || rvETHUSDCBalanceResponse.isLoading || latestEthriseNavResponse.isLoading || latestVaultExchangeRateResponse.isLoading ? true : false;
    const showTotalValueError = !showTotalValueLoading && (ethriseBalanceResponse.error || rvETHUSDCBalanceResponse.error || latestEthriseNavResponse.error || latestVaultExchangeRateResponse.error) ? true : false;
    const showTotalValueData = !showTotalValueLoading && !showTotalValueError ? true : false;

    // TODO: Can we make this more simple?
    const showBalanceLoading = ethriseBalanceResponse.isLoading || rvETHUSDCBalanceResponse.isLoading ? true : false;
    const showBalanceError = !showBalanceLoading && (ethriseBalanceResponse.error || rvETHUSDCBalanceResponse.error) ? true : false;
    const showBalanceData = !showBalanceLoading && !showBalanceError ? true : false;

    const showValueLoading = latestEthriseNavResponse.isLoading || latestVaultExchangeRateResponse.isLoading ? true : false;
    const showValueError = !showValueLoading && (latestEthriseNavResponse.error || latestVaultExchangeRateResponse.error) ? true : false;
    const showValueData = !showValueLoading && !showValueError ? true : false;

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>Risedle Protocol</title>
                <meta name="description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
                <PortofolioPageMeta />
            </Head>
            <Favicon />

            <Navigation portfolioActive />

            <div className="z-10 mb-20 mt-5 flex flex-grow flex-col space-y-6 px-4 outline-0 sm:mx-auto sm:mt-14 sm:mb-0">
                {/* Portofolio */}
                <div className="space-y-4 rounded-[16px] bg-gray-light-2 p-[16px] dark:bg-gray-dark-2 sm:w-[540px]">
                    <div className="flex flex-row items-center">
                        <div className="flex-grow">
                            {account && !chain.unsupported && <p className="mb-2 text-sm text-gray-light-10 dark:text-gray-dark-10">{formatAddress(account)}</p>}
                            {account && chain.unsupported && <p className="mb-2 text-sm text-gray-light-10 dark:text-gray-dark-10">Switch network to see yours</p>}
                            {!account && <p className="mb-2 text-sm text-gray-light-10 dark:text-gray-dark-10">Connect wallet to see yours</p>}
                            <p className="text-xl font-bold text-gray-light-12 dark:text-gray-dark-12">Portfolio</p>
                        </div>
                        <div>
                            <img src="/assets/images/portfolio/portfolio.png" width={48} height={48} alt="portfolio" />
                        </div>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <div className="space-y-2">
                            <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Total Value</p>
                            {(!account || chain.unsupported) && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                            {account && !chain.unsupported && showBalanceLoading && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                            {account && !chain.unsupported && showTotalValueError && <p className="text-sm font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Failed to fetch data</p>}
                            {account && !chain.unsupported && showTotalValueData && <p className="text-sm font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(totalValue)}</p>}
                        </div>
                    </div>
                </div>

                {/* Holding Assets */}
                <div className="rounded-[16px] bg-gray-light-2 p-4 dark:bg-gray-dark-2 sm:w-[540px]">
                    <p className="text-base font-bold leading-none text-gray-light-12 dark:text-gray-dark-12">My Tokens</p>
                    <table className="mt-6 table w-full table-fixed">
                        <thead>
                            <tr>
                                <th className="w-3/5 rounded-l-[8px] bg-gray-light-4 p-2 text-left text-xs font-normal leading-4 text-gray-light-10 dark:bg-gray-dark-4 dark:text-gray-dark-10">Token</th>
                                <th className="hidden w-1/5 bg-gray-light-4 p-2 text-right text-xs font-normal leading-4 text-gray-light-10 dark:bg-gray-dark-4 dark:text-gray-dark-10 sm:table-cell">Amount</th>
                                <th className="hidden w-1/5 rounded-r-[8px] bg-gray-light-4 p-2 text-right text-xs font-normal leading-4 text-gray-light-10 dark:bg-gray-dark-4 dark:text-gray-dark-10 sm:table-cell">Value (USDC)</th>
                                <th className="w-2/5 rounded-r-[8px] bg-gray-light-4 p-2 text-right text-xs font-normal leading-4 text-gray-light-10 dark:bg-gray-dark-4 dark:text-gray-dark-10 sm:hidden">Amount/value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dashed divide-gray-light-5 dark:divide-gray-dark-5">
                            {/* rvETHUSDC */}
                            <tr>
                                <td className="my-4 flex items-center space-x-3 px-2 text-left">
                                    <img className="h-[24px] w-[24px]" src={ethriseMetadata.vaultLogo} alt={ethriseMetadata.vaultLogo} />
                                    <div className="flex flex-col space-y-[8px]">
                                        <p className="font-ibm text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12">{ethriseMetadata.vaultTitle}</p>
                                    </div>
                                </td>
                                <td className="my-4 hidden px-2 text-right font-ibm text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12 sm:table-cell">
                                    {(!account || chain.unsupported) && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                    {account && !chain.unsupported && showBalanceLoading && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                    {account && !chain.unsupported && showBalanceError && "Failed to fetch data"}
                                    {account && !chain.unsupported && showBalanceData && tokenBalanceFormatter.format(rvETHUSDCBalance)}
                                </td>
                                <td className="my-4 hidden px-2 text-right font-ibm text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12 sm:table-cell">
                                    {(!account || chain.unsupported) && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                    {account && !chain.unsupported && showValueLoading && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                    {account && !chain.unsupported && showValueError && "Failed to fetch data"}
                                    {account && !chain.unsupported && showValueData && dollarFormatter.format(rvETHUSDCValue)}
                                </td>
                                <td className="my-4 px-2 sm:hidden">
                                    <div className="flex flex-col text-right">
                                        {(!account || chain.unsupported) && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                        {account && !chain.unsupported && (showBalanceError || showValueError) && "Failed to fetch data"}
                                        {account && !chain.unsupported && showBalanceData && <p className="text-right text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12">{tokenBalanceFormatter.format(rvETHUSDCBalance)}</p>}
                                        {account && !chain.unsupported && showValueData && <p className="text-right text-[12px] text-gray-light-10 dark:text-gray-dark-10">{dollarFormatter.format(rvETHUSDCValue)}</p>}
                                    </div>
                                </td>
                            </tr>
                            {/* ETHRISE */}
                            <tr>
                                <td className="my-4 flex items-center space-x-3 px-2 text-left">
                                    <img className="h-[24px] w-[24px]" src={ethriseMetadata.logo} alt={ethriseMetadata.logo} />
                                    <div className="flex flex-col space-y-[8px]">
                                        <p className="font-ibm text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12">{ethriseMetadata.title}</p>
                                    </div>
                                </td>
                                <td className="my-4 hidden px-2 text-right font-ibm text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12 sm:table-cell">
                                    {(!account || chain.unsupported) && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                    {account && !chain.unsupported && showBalanceLoading && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                    {account && !chain.unsupported && showBalanceError && "Failed to fetch data"}
                                    {account && !chain.unsupported && showBalanceData && tokenBalanceFormatter.format(ethriseBalance)}
                                </td>
                                <td className="my-4 hidden px-2 text-right font-ibm text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12 sm:table-cell">
                                    {(!account || chain.unsupported) && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                    {account && !chain.unsupported && showValueLoading && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                    {account && !chain.unsupported && showValueError && "Failed to fetch data"}
                                    {account && !chain.unsupported && showValueData && dollarFormatter.format(ethriseValue)}
                                </td>
                                <td className="my-4 px-2 sm:hidden">
                                    <div className="flex flex-col text-right">
                                        {(!account || chain.unsupported) && <p className="block h-[16px] w-full animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                                        {account && !chain.unsupported && (showBalanceError || showValueError) && "Failed to fetch data"}
                                        {account && !chain.unsupported && showBalanceData && <p className="text-right text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12">{tokenBalanceFormatter.format(ethriseBalance)}</p>}
                                        {account && !chain.unsupported && showValueData && <p className="text-right text-[12px] text-gray-light-10 dark:text-gray-dark-10">{dollarFormatter.format(ethriseValue)}</p>}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* {totalValue <= 0 ? <NoPortfolioWarn /> : null} */}
                </div>
            </div>

            <div className="hidden sm:mt-20 sm:inline-block">
                <Footer />
            </div>

            <BackgroundGradient />

            <div className="z-10 sm:hidden">
                <ButtonConnectWalletMobile />
            </div>
        </div>
    );
};

export default PortfolioPageV2;
