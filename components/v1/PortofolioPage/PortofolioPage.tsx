import { FunctionComponent, useMemo } from "react";
import Head from "next/head";
import MarketsPageMeta from "../MarketsPage/MarketsPageMeta";
import Favicon from "../Favicon";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";
import BackgroundGradient from "./BackgroundGradient";
import { chain as Chains, useProvider } from "wagmi";
import { useWalletContext, DEFAULT_CHAIN } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import PortofolioChart from "./PortofolioChart";
import { useTransactionHistory } from "../swr/useTransactionHistory";
import { useTokenBalance } from "../swr/useTokenBalance";
import { tokenBalanceFormatter, dollarFormatter } from "../../../utils/formatters";
import { ethers } from "ethers";
import { useLeveragedTokenNAV } from "../swr/useLeveragedTokenNAV";
import { useLeveragedTokenDailyData } from "../swr/useLeveragedTokenDailyData";
import Footer from "../Footer";
import { NoPorotoflioWarn } from "./NoPortofolioWarn";
import Navigation from "../Navigation";
import { useVaultExchangeRate } from "../swr/useVaultExchangeRate";

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
    const ethriseBalance = useTokenBalance({ account: account, token: ethriseAddress, provider: provider });
    const formattedEthriseBalance = tokenBalanceFormatter.format(parseFloat(ethers.utils.formatUnits(ethriseBalance.data ? ethriseBalance.data : 0)));

    // Get User's rvETHUSDC Balance
    const rvETHUSDCBalance = useTokenBalance({ account: account, token: metadata.vaultAddress, provider: provider });
    const formattedRvETHUSDCBalance = parseFloat(ethers.utils.formatUnits(rvETHUSDCBalance.data ? rvETHUSDCBalance.data : 0, metadata.debtDecimals));

    // Get Latest ETHRISE NAV
    const latestEthriseNav = useLeveragedTokenNAV({ token: ethriseAddress, vault: metadata.vaultAddress, provider: provider });
    const latestEthriseNavFormatted = parseFloat(ethers.utils.formatUnits(latestEthriseNav.data ? latestEthriseNav.data : 0, metadata.debtDecimals));

    // Get Latest rvETHUSDC Exchange Rate
    const latestVaultExchangeRate = useVaultExchangeRate({ vault: metadata.vaultAddress, provider: provider });
    const latestVaultExchangeRateFormatted = parseFloat(ethers.utils.formatUnits(latestVaultExchangeRate.data ? latestVaultExchangeRate.data : 0, metadata.collateralDecimals));

    // Get daily ETHRISE NAV
    const dailyData = useLeveragedTokenDailyData(chainID, ethriseAddress);

    // Get transaction history
    const transactionHistory = useTransactionHistory({ account: account, contract: ethriseAddress, provider: provider });

    const isHavePortofolio = useMemo(() => {
        return formattedEthriseBalance !== 0;
    }, [formattedEthriseBalance]);

    // Tailwind class for return & amount
    const positiveReturn = "text-green-light-11 dark:text-green-dark-11";
    const negativeReturn = "text-red-light-10 dark:text-red-dark-10";

    return (
        <>
            <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
                <Head>
                    {/* <!-- HTML Meta Tags --> */}
                    <title>Risedle Protocol</title>
                    <meta name="description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
                    <MarketsPageMeta />
                </Head>
                <Favicon />

                <Navigation portofolioActive />

                <div className="mb-20 flex flex-grow flex-col px-4 outline-0 sm:z-10 sm:mx-auto sm:mt-12 sm:mb-0">
                    <div className="mx-auto flex w-full flex-col space-y-6 outline-0 sm:gap-[24px] sm:space-y-0 lg:grid lg:grid-cols-2">
                        {/* Left Column: Price info */}
                        <div className="sm:min-w-[412px] sm:max-w-[540px]">
                            <div className="flex w-full flex-col rounded-[16px] bg-gray-light-2 pb-4 dark:bg-gray-dark-2">
                                {/* Title, subtitle and logo */}
                                <div className="flex flex-row items-center justify-between p-4">
                                    <div className="flex grow flex-col space-y-2">
                                        <h1 className="m-0 text-2xl font-bold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">Portofolio</h1>
                                    </div>
                                </div>
                                <PortofolioChart address={ethriseAddress} isHavePortofolio={isHavePortofolio} />
                            </div>
                        </div>
                        {/* Right Column: Assets Info*/}
                        {/* TODO (Matthew): Implement mobile layout, currently only desktop layout that has been implemented */}
                        <div className="flex flex-col space-y-6 sm:min-w-[412px] sm:max-w-[540px]">
                            {/* Leveraged Token Assets */}
                            <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
                                <div className="pt-4">
                                    <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Leveraged Token Assets</h2>
                                </div>
                                <div>
                                    <table className="w-full table-auto">
                                        <thead className="text-right">
                                            <tr className="hidden lg:contents">
                                                <th className="w-2/5 pb-4 text-left text-sm font-normal text-gray-light-9 dark:text-gray-dark-9">Token</th>
                                                <th className="w-1/5 pb-4 text-sm font-normal text-gray-light-9 dark:text-gray-dark-9">Amount</th>
                                                <th className="w-1/5 pb-4 text-sm font-normal text-gray-light-9 dark:text-gray-dark-9">Return</th>
                                                <th className="w-1/5 pb-4 text-sm font-normal text-gray-light-9 dark:text-gray-dark-9">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* TODO(Matthew): Use map if there are more than 1 Leveraged token */}
                                            {isHavePortofolio ? (
                                                <tr className="text-right text-sm font-semibold">
                                                    <td className="flex items-center space-x-4 text-left">
                                                        <img className="h-[40px] w-[40px]" src={metadata.logo} alt={metadata.title} />
                                                        <div className="flex flex-col space-y-[8px]">
                                                            <p className="text-gray-light-12 dark:text-gray-dark-12">{metadata.title}</p>
                                                            <p className="text-gray-light-10 dark:text-gray-dark-10 lg:hidden">
                                                                {formattedEthriseBalance.toFixed(2)} {metadata.title}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="hidden text-gray-light-10 dark:text-gray-dark-10 lg:table-cell">
                                                        {formattedEthriseBalance.toFixed(2)} {metadata.title}
                                                    </td>
                                                    <td className="hidden text-green-light-11 dark:text-green-dark-11 lg:table-cell">+$13.34</td>
                                                    <td>
                                                        <div className="flex flex-col space-y-[8px]">
                                                            <p className="text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(latestEthriseNavFormatted * formattedEthriseBalance)}</p>
                                                            <p className="text-green-light-11 dark:text-green-dark-11 lg:hidden">+$13.34</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : null}
                                        </tbody>
                                    </table>
                                    {!isHavePortofolio && <NoPorotoflioWarn />}
                                </div>
                            </div>
                            {/* Liquidity Vault Assets */}
                            <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
                                <div className="pt-4">
                                    <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Liquidity Vault Assets</h2>
                                </div>
                                <div>
                                    <table className="w-full table-auto">
                                        <thead className="text-right">
                                            <tr className="hidden lg:contents">
                                                <th className="w-2/5 pb-4 text-left text-sm font-normal text-gray-light-9 dark:text-gray-dark-9">Token</th>
                                                <th className="w-1/5 pb-4 text-sm font-normal text-gray-light-9 dark:text-gray-dark-9">Amount</th>
                                                <th className="w-1/5 pb-4 text-sm font-normal text-gray-light-9 dark:text-gray-dark-9">Return</th>
                                                <th className="w-1/5 pb-4 text-sm font-normal text-gray-light-9 dark:text-gray-dark-9">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isHavePortofolio ? (
                                                <tr className="text-right text-sm font-semibold">
                                                    <td className="flex items-center space-x-4 text-left">
                                                        <img className="h-[40px] w-[40px]" src={metadata.vaultLogo} alt={metadata.title} />
                                                        <div className="flex flex-col space-y-[8px]">
                                                            <p className="text-gray-light-12 dark:text-gray-dark-12">{metadata.vaultTitle}</p>
                                                            <p className="text-gray-light-10 dark:text-gray-dark-10 lg:hidden">
                                                                {formattedRvETHUSDCBalance.toFixed(2)} {metadata.vaultTitle}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="hidden text-gray-light-10 dark:text-gray-dark-10 lg:table-cell">
                                                        {formattedRvETHUSDCBalance.toFixed(2)} {metadata.vaultTitle}
                                                    </td>
                                                    <td className="hidden text-green-light-11 dark:text-green-dark-11 lg:table-cell">+$13.34</td>
                                                    <td>
                                                        <div className="flex flex-col space-y-[8px]">
                                                            <p className="text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(latestVaultExchangeRateFormatted * formattedRvETHUSDCBalance)}</p>
                                                            <p className="text-green-light-11 dark:text-green-dark-11 lg:hidden">+$13.34</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : null}
                                            {/* TODO(Matthew): Use map if there are more than 1 Leveraged token */}
                                        </tbody>
                                    </table>
                                    {!isHavePortofolio && <NoPorotoflioWarn />}
                                </div>
                            </div>
                            {/* Transaction History */}
                            <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 dark:bg-gray-dark-2">
                                <div className="pt-4">
                                    <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Transaction History</h2>
                                </div>
                                <div>
                                    <table className="w-full table-auto">
                                        <thead className="text-right">
                                            <tr className="hidden lg:contents">
                                                <th className="w-2/5 pb-4 text-left text-sm font-normal text-gray-light-9 dark:text-gray-dark-9">Transaction</th>
                                                <th className="w-1/5 pb-4 text-sm font-normal text-gray-light-9 dark:text-gray-dark-9">Amount</th>
                                                <th className="w-1/5 pb-4 text-sm font-normal text-gray-light-9 dark:text-gray-dark-9">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isHavePortofolio
                                                ? transactionHistory.data
                                                      ?.sort((a, b) => {
                                                          return b.date.getTime() - a.date.getTime();
                                                      })
                                                      .map((item) => {
                                                          return (
                                                              <tr className="text-right text-sm font-semibold" key={item.date.getTime()}>
                                                                  <td className="flex items-center space-x-4 pb-4 text-left">
                                                                      <img className="h-[40px] w-[40px]" src={metadata.logo} alt={metadata.title} />
                                                                      <div className="flex flex-col space-y-[8px]">
                                                                          <p className="text-gray-light-12 dark:text-gray-dark-12">{item.type}</p>
                                                                          <p className="text-gray-light-10 dark:text-gray-dark-10">{item.date.toDateString()}</p>
                                                                      </div>
                                                                  </td>
                                                                  <td className={`${item.type == "Mint" ? positiveReturn : negativeReturn} hidden lg:table-cell`}>
                                                                      {item.type == "Mint" ? "+" : "-"}
                                                                      {item.value} ETHRISE
                                                                  </td>
                                                                  <td>
                                                                      <div className="flex flex-col space-y-[8px]">
                                                                          <p className="text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(latestEthriseNavFormatted * parseFloat(item.value))}</p>
                                                                          <p className={`${item.type == "Mint" ? positiveReturn : negativeReturn} lg:hidden`}>
                                                                              {item.type == "Mint" ? "+" : "-"}
                                                                              {item.value} ETHRISE
                                                                          </p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          );
                                                      })
                                                : null}
                                        </tbody>
                                    </table>
                                    {!isHavePortofolio && <NoPorotoflioWarn />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:mt-20 sm:inline-block">
                    <Footer />
                </div>
                <BackgroundGradient />
            </div>
            <div className="sm:hidden">
                <ButtonConnectWalletMobile />
            </div>
        </>
    );
};

export default PortofolioPage;
