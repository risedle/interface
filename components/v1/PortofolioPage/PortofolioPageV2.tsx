import { FunctionComponent } from "react";
import Head from "next/head";
import MarketsPageMeta from "../MarketsPage/MarketsPageMeta";
import Favicon from "../Favicon";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";
import BackgroundGradient from "./BackgroundGradient";
import { chain as Chains, useProvider } from "wagmi";
import { useWalletContext, DEFAULT_CHAIN, formatAddress } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import { useTokenBalance } from "../swr/useTokenBalance";
import { tokenBalanceFormatter, dollarFormatter } from "../../../utils/formatters";
import { ethers } from "ethers";
import { useLeveragedTokenNAV } from "../swr/useLeveragedTokenNAV";
import Footer from "../Footer";
import { NoPorotoflioWarn } from "./NoPortofolioWarn";
import Navigation from "../Navigation";
import { useVaultExchangeRate } from "../swr/useVaultExchangeRate";
import { useVaultHistoricalData } from "../swr/useVaultHistoricalData";
import { useLeveragedTokenHistoricalData } from "../swr/useLeveragedTokenHistoricalData";
import { useTransactionHistory } from "../swr/useTransactionHistory";
import { useTransferEvents } from "../swr/useTransferEvents";
import { LeveragedTokenDailyData, useLeveragedTokenDailyData } from "../swr/useLeveragedTokenDailyData";

// ETHRISE Token ids
const ETHRISEAddresses = {
    [Chains.kovan.id]: "0xc4676f88663360155c2bc6d2A482E34121a50b3b",
    [Chains.arbitrumOne.id]: "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452",
};

// Token Changes
interface TokenChanges {
    totalChanges: number;
    totalChangesPercentage: number;
}

/**
 * PortofolioPageV2Props is a React Component properties that passed to React Component PortofolioPageV2
 */
type PortofolioPageV2Props = {};

/**
 * PortofolioPageV2 is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const PortofolioPageV2: FunctionComponent<PortofolioPageV2Props> = ({}) => {
    const { chain, account, switchNetwork } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const ethriseAddress = ETHRISEAddresses[chainID];

    // Get ETHRISE metadata
    const metadata = Metadata[chainID][ethriseAddress];

    // Get Provider
    const provider = useProvider();

    // Get User's ETHRISE Balance
    const ethriseBalanceResponse = useTokenBalance({ account: account, token: ethriseAddress, provider: provider });
    const ethriseBalance = tokenBalanceFormatter.format(parseFloat(ethers.utils.formatUnits(ethriseBalanceResponse.data ? ethriseBalanceResponse.data : 0)));

    // Get User's rvETHUSDC Balance
    const rvETHUSDCBalanceResponse = useTokenBalance({ account: account, token: metadata.vaultAddress, provider: provider });
    const rvETHUSDCBalance = parseFloat(ethers.utils.formatUnits(rvETHUSDCBalanceResponse.data ? rvETHUSDCBalanceResponse.data : 0, metadata.debtDecimals));

    // Get Latest ETHRISE NAV
    const latestEthriseNav = useLeveragedTokenNAV({ token: ethriseAddress, vault: metadata.vaultAddress, provider: provider });
    const latestEthriseNavFormatted = parseFloat(ethers.utils.formatUnits(latestEthriseNav.data ? latestEthriseNav.data : 0, metadata.debtDecimals));

    // Get Latest rvETHUSDC Exchange Rate
    const latestVaultExchangeRate = useVaultExchangeRate({ vault: metadata.vaultAddress, provider: provider });
    const latestVaultExchangeRateFormatted = parseFloat(ethers.utils.formatUnits(latestVaultExchangeRate.data ? latestVaultExchangeRate.data : 0, metadata.collateralDecimals));

    // Get Historical data for leveraged & vault token
    const ethriseHistorical = useLeveragedTokenDailyData(chainID, ethriseAddress);
    const rvETHUSDCHistorical = useVaultHistoricalData(chainID, metadata.vaultAddress);

    // Get tokens transfer events
    const ethriseTransactions = useTransferEvents({ account: account, contract: ethriseAddress, provider: provider });
    const rvETHUSDCTransactions = useTransferEvents({ account: account, contract: metadata.vaultAddress, provider: provider });

    // Get USD value for each user's token balance
    const ethriseValue = ethriseBalance && latestEthriseNavFormatted ? ethriseBalance * latestEthriseNavFormatted : 0;
    const rvETHUSDCValue = rvETHUSDCBalance && latestVaultExchangeRateFormatted ? rvETHUSDCBalance * latestVaultExchangeRateFormatted : 0;

    // Get Total Portofolio Value
    const totalValue = ethriseValue + rvETHUSDCValue;

    // Function to calculate all time changes for a token
    const calculateTokenAllTimeChanges = (transactionData: ethers.Event[], historicalData: LeveragedTokenDailyData[], latestNAV: number): TokenChanges => {
        let totalBuyValue = 0;
        let totalBalance = 0;

        transactionData.forEach((event) => {
            const matchedHistoricalData = historicalData.reduce((a, b) => {
                return Math.abs(b.block_number - event.blockNumber) < Math.abs(a.block_number - event.blockNumber) ? b : a;
            });

            if (event.args!.to === account) {
                let mintAmount = parseFloat(ethers.utils.formatUnits(event.args!.value ? event.args!.value : 0));
                totalBalance += mintAmount;
                totalBuyValue += matchedHistoricalData!.nav * mintAmount;
            } else if (event.args!.from === account) {
                let redeemAmount = parseFloat(ethers.utils.formatUnits(event.args!.value ? event.args!.value : 0));
                let avgBuyValue = totalBuyValue / totalBalance;
                totalBalance -= parseFloat(ethers.utils.formatUnits(event.args!.value ? event.args!.value : 0));
                totalBuyValue -= redeemAmount * avgBuyValue;
            }
        });
        const totalChanges = latestNAV * totalBalance - totalBuyValue;
        const totalChangesPercentage = ((latestNAV - totalBuyValue / totalBalance) / (totalBuyValue / totalBalance)) * 100;

        return {
            totalChanges: totalChanges,
            totalChangesPercentage: totalChangesPercentage,
        };
    };

    // Get all time changes for every token
    let ethriseChanges: TokenChanges = {
        totalChanges: 0,
        totalChangesPercentage: 0,
    };

    if (ethriseTransactions.data && ethriseHistorical.threeMonthly?.data) {
        ethriseChanges = calculateTokenAllTimeChanges(ethriseTransactions.data, ethriseHistorical.threeMonthly?.data, latestEthriseNavFormatted);
    }

    let rvETHUSDCChanges: TokenChanges = {
        totalChanges: 0,
        totalChangesPercentage: 0,
    };

    // if(rvETHUSDCTransactions.data && rvETHUSDCHistorical.threeMonthly?.data){
    //     rvETHUSDCChanges = calculateTokenAllTimeChanges(rvETHUSDCTransactions.data, ethriseHistorical.threeMonthly?.data, latestEthriseNavFormatted)
    // }
    console.log(rvETHUSDCHistorical);

    // Tailwind class for return & amount
    const positiveReturn = "text-green-light-11 dark:text-green-dark-11 text-sm";
    const negativeReturn = "text-red-light-10 dark:text-red-dark-10 text-sm";

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

                <div className="mb-20 mt-5 flex flex-grow flex-col space-y-6 px-4 outline-0 sm:z-10 sm:mx-auto sm:mt-14 sm:mb-0">
                    {/* Portofolio */}
                    <div className="space-y-2 rounded-[16px] bg-gray-light-2 p-[16px] dark:bg-gray-dark-2 sm:w-[540px]">
                        <div className="flex flex-row items-center">
                            <div className="flex-grow">
                                <p className={`mb-2 text-sm text-gray-light-10 dark:text-gray-dark-10 ${!account && "hidden"}`}>{account ? formatAddress(account) : null}</p>
                                <p className="text-xl font-bold text-gray-light-12 dark:text-gray-dark-12">Portofolio</p>
                            </div>
                            <div>
                                <img src="portofolio/portofolio.png" width={48} height={48} alt="portofolio" />
                            </div>
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                            <div className="space-y-1">
                                <p className="text-sm text-gray-light-10 dark:text-gray-dark-10">Total Value</p>
                                <p className="text-sm font-bold text-gray-light-12 dark:text-gray-dark-12">{totalValue > 0 ? dollarFormatter.format(ethriseValue) : "---"}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-light-10 dark:text-gray-dark-10">Changes</p>
                                <p className={ethriseChanges.totalChangesPercentage > 0 ? positiveReturn : negativeReturn}>
                                    {" "}
                                    {ethriseChanges.totalChangesPercentage > 0 ? <span>&uarr;</span> : <span>&darr;</span>} {totalValue > 0 ? dollarFormatter.format(ethriseChanges.totalChanges) + " (" + ethriseChanges.totalChangesPercentage.toFixed(2) + "%)" : "---"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Holding Assets */}
                    <div className={`space-y-2 rounded-[16px] bg-gray-light-2 ${totalValue > 0 ? "px-[16px] pt-[16px]" : "p-[16px]"} dark:bg-gray-dark-2 sm:w-[540px]`}>
                        <p className="text-xl font-bold text-gray-light-12 dark:text-gray-dark-12">Holding Assets</p>
                        <table className="table w-full table-fixed">
                            <thead>
                                <tr>
                                    <th className="w-3/5 rounded-l-[8px] bg-gray-light-4 p-[8px] text-left text-[12px] text-gray-light-10 dark:bg-gray-dark-4 dark:text-gray-dark-10">Token</th>
                                    <th className="hidden w-1/5 bg-gray-light-4 p-[8px] text-[12px] text-gray-light-10 dark:bg-gray-dark-4 dark:text-gray-dark-10 sm:table-cell">Amount</th>
                                    <th className="hidden w-1/5 rounded-r-[8px] bg-gray-light-4 p-[8px] text-right text-[12px] text-gray-light-10 dark:bg-gray-dark-4 dark:text-gray-dark-10 sm:table-cell">Value (USDC)</th>
                                    <th className="w-2/5 rounded-r-[8px] bg-gray-light-4 p-[8px] text-right text-[12px] text-gray-light-10 dark:bg-gray-dark-4 dark:text-gray-dark-10 sm:hidden">Amount/value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-dashed divide-gray-light-5 dark:divide-gray-dark-5">
                                {totalValue
                                    ? Object.values(Metadata[chainID]).map((token) => {
                                          let leveragedTokenBalance = 0;
                                          let leveragedTokenValue = 0;
                                          let vaultTokenBalance = 0;
                                          let vaultTokenValue = 0;
                                          switch (token.title) {
                                              case "DEMOETHRISE" || "ETHRISE": {
                                                  leveragedTokenBalance = ethriseBalance;
                                                  leveragedTokenValue = ethriseValue;
                                                  vaultTokenBalance = rvETHUSDCBalance;
                                                  vaultTokenValue = rvETHUSDCValue;
                                                  break;
                                              }
                                          }
                                          return (
                                              <>
                                                  {/* Vault Token */}
                                                  <tr>
                                                      <td className="my-[16px] flex items-center space-x-3 px-[8px] text-left">
                                                          <img className="h-[24px] w-[24px]" src={token.vaultLogo} alt={token.vaultLogo} />
                                                          <div className="flex flex-col space-y-[8px]">
                                                              <p className="text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12">{token.vaultTitle}</p>
                                                          </div>
                                                      </td>
                                                      <td className="my-[16px] hidden px-[8px] text-center text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12 sm:table-cell">{tokenBalanceFormatter.format(vaultTokenBalance)}</td>
                                                      <td className="my-[16px] hidden px-[8px] text-right text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12 sm:table-cell">{dollarFormatter.format(vaultTokenValue)}</td>
                                                      <td className="my-[16px] px-[8px] sm:hidden">
                                                          <div className="flex flex-col text-right">
                                                              <p className="text-right text-sm font-semibold text-gray-light-12  dark:text-gray-dark-12">{tokenBalanceFormatter.format(vaultTokenBalance)}</p>
                                                              <p className="text-right text-[12px] text-gray-light-10  dark:text-gray-dark-10">{dollarFormatter.format(vaultTokenValue)}</p>
                                                          </div>
                                                      </td>
                                                  </tr>

                                                  {/* Leveraged Token */}
                                                  <tr>
                                                      <td className="my-[16px] flex items-center space-x-3 px-[8px] text-left">
                                                          <img className="h-[24px] w-[24px]" src={token.logo} alt={token.logo} />
                                                          <div className="flex flex-col space-y-[8px]">
                                                              <p className="text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12">{token.title}</p>
                                                          </div>
                                                      </td>
                                                      <td className="my-[16px] hidden px-[8px] text-center text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12 sm:table-cell">{tokenBalanceFormatter.format(leveragedTokenBalance)}</td>
                                                      <td className="my-[16px] hidden px-[8px] text-right text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12 sm:table-cell">{dollarFormatter.format(leveragedTokenValue)}</td>
                                                      <td className="my-[16px] px-[8px] sm:hidden">
                                                          <div className="flex flex-col text-right">
                                                              <p className="text-right text-sm font-semibold text-gray-light-12 dark:text-gray-dark-12">{tokenBalanceFormatter.format(leveragedTokenBalance)}</p>
                                                              <p className="text-right text-[12px] text-gray-light-10 dark:text-gray-dark-10">{dollarFormatter.format(leveragedTokenValue)}</p>
                                                          </div>
                                                      </td>
                                                  </tr>
                                              </>
                                          );
                                      })
                                    : null}
                            </tbody>
                        </table>
                        {totalValue <= 0 ? <NoPorotoflioWarn /> : null}
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

export default PortofolioPageV2;
