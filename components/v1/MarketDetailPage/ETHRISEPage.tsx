import { FunctionComponent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ethers } from "ethers";
import { chain as Chains, useContractRead, useNetwork, useBalance, useContractWrite } from "wagmi";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import toast, { Toaster } from "react-hot-toast";

import Favicon from "../Favicon";
import Footer from "../Footer";
import { useWalletContext, Providers } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import { useLeveragedTokenHistoricalData, Timeframe, useMarket, useVaultData3Months } from "../../../utils/snapshot";
import { dollarFormatter } from "../../../utils/formatters";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";
import Logo from "../Logo";
import ButtonNetworkSwitcher from "../Buttons/NetworkSwitcher";
import ButtonConnectWalletDesktop from "../Buttons/ConnectWalletDesktop";
import ButtonThemeSwitcher from "../Buttons/ThemeSwitcher";
import ToastError from "../Toasts/Error";
import BackgroundGradient from "./BackgroundGradient";
import ButtonFetchingOnchainData from "./Buttons/FetchingOnchainData";
import ButtonFailedToFetchOnchainData from "./Buttons/FailedToFetchOnchainData";
import ButtonConnectWalletToMintOrRedeem from "./Buttons/ConnectWalletToMintOrRedeem";
import ButtonSwitchNetwork from "./Buttons/SwitchNetwork";
import ToastTransaction from "../Toasts/Transaction";
import ToastSuccess from "../Toasts/Success";


// ETHRISE Token ids
const ETHRISEAddresses = {
    [Chains.kovan.id]: { token: "0xc4676f88663360155c2bc6d2A482E34121a50b3b", vault: "0x42B6BAE111D9300E19F266Abf58cA215f714432c" },
};

// Vault ABIs
const VaultABI = new ethers.utils.Interface([
    "function getMetadata(address token) external view returns (bool isETH, address token, address collateral, address oracleContract, address swapContract, address maxSwapSlippageInEther, uint256 initialPrice, uint256 feeInEther, uint256 totalCollateralPlusFee, uint256 totalPendingFees, uint256 minLeverageRatioInEther, uint256 maxLeverageRatioInEther, uint256 maxRebalancingValue, uint256 rebalancingStepInEther, uint256 maxTotalCollateral)",
    "function getTotalAvailableCash() external view returns (uint256 totalAvailableCash)",
    "function getNAV(address token) external view returns (uint256 nav)",
    "function mint(address token) external payable",

]);
const OracleABI = new ethers.utils.Interface(["function getPrice() external view returns (uint256 price)"]);

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
    const vaultAddress = ETHRISEAddresses[chain.id].vault;

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
    const uniswapSwapURL = metadata.uniswapSwapURL;
    const collateralDecimals = metadata.collateralDecimals;
    const debtDecimals = metadata.debtDecimals;
    const oracleContract = metadata.oracleContract;

    // Get price external data from Risedle Snapshot
    const { leveragedTokenDailyData, leveragedTokenWeeklyData, leveragedTokenTwoWeeklyData, leveragedTokenMonthlyData, leveragedTokenThreeMonthlyData, leveragedTokenDataIsLoading, leveragedTokenDataIsError } = useLeveragedTokenHistoricalData(chain.id, ethriseAddress);
    const { vaultHistoricalData, vaultHistoricalDataIsLoading, vaultHistoricalDataIsError } = useVaultData3Months(chain.id, vaultAddress);
    const { market, marketIsLoading, marketIsError } = useMarket(chain.id, ethriseAddress);

    // Get onchain market data
    const [onchainETHRISEMetadata] = useContractRead(
        {
            addressOrName: vaultAddress,
            contractInterface: VaultABI,
        },
        "getMetadata",
        {
            args: ethriseAddress,
        }
    );

    // Get onchain balance
    const [onchainBalance] = useBalance({ addressOrName: account ? account : undefined });
    const userCollateralBalance = onchainBalance && onchainBalance.data && onchainBalance.data.formatted ? parseFloat(onchainBalance.data.formatted) : 0;


    // Get onchain oracle
    const [onchainOracle] = useContractRead(
        {
            addressOrName: oracleContract,
            contractInterface: OracleABI,
        },
        "getPrice"
    );


    // Get total available cash of vault
    const [onchainTotalAvailableCash] = useContractRead(
        {
            addressOrName: vaultAddress,
            contractInterface: VaultABI,
        },
        "getTotalAvailableCash"
    );


    // Get NAV of the token
    const [onchainNAV] = useContractRead(
        {
            addressOrName: vaultAddress,
            contractInterface: VaultABI,
        },
        "getNAV",
        {
            args: ethriseAddress,
        }
    );
    const [, mint] = useContractWrite(
        {
            addressOrName: vaultAddress,
            contractInterface: VaultABI,
        },
        "mint"
    );

    // console.debug("onchainETHRISEMetadata", onchainETHRISEMetadata);
    // console.debug("onchainBalance", onchainBalance);
    // console.debug("onchainNAV", onchainNAV);
    // console.debug("onchainOracle", onchainOracle);
    // console.debug("onchainTotalAvailableCash", onchainTotalAvailableCash);


    // States
    const [nav, setNAV] = useState(0);
    const [initialNAV, setInitialNAV] = useState(0);
    const [navChange, setNAVChange] = useState(0);
    const [initialNAVChange, setInitialNAVChange] = useState(0);
    const [supplyAPY, setSupplyAPY] = useState(0);
    const [initialSupplyAPY, setInitialSupplyAPY] = useState(0);
    const [borrowAPY, setBorrowAPY] = useState(0);
    const [initialBorrowAPY, setInitialBorrowAPY] = useState(0);

    const [currentTimeframe, setCurrentTimeframe] = useState(Timeframe.TwoWeekly);
    const [currentLeveragedTokenData, setCurrentLeveragedTokenData] = useState(leveragedTokenTwoWeeklyData);
    const [currentVaultData, setCurrentVaultData] = useState(vaultHistoricalData);
    const [mintAmount, setMintAmount] = useState(0);

    // Action states
    const [isMinting, setIsMinting] = useState(false);

    // Set initial data for onMouseLeave event on the price chart
    if (initialNAV === 0 && initialNAVChange === 0 && initialSupplyAPY === 0 && initialBorrowAPY === 0 && market) {
        // Initial Price and changes
        const change = ((market.nav_last - market.nav_past) / market.nav_past) * 100;
        setInitialNAV(market.nav_last);
        setNAV(market.nav_last);
        setInitialNAVChange(change);
        setNAVChange(change);

        // Initial APYs
        setInitialSupplyAPY(market.vault_supply_apy);
        setSupplyAPY(market.vault_supply_apy);
        setInitialBorrowAPY(market.vault_borrow_apy);
        setBorrowAPY(market.vault_borrow_apy);
    }

    // Set current data on the first load
    if (!currentLeveragedTokenData && leveragedTokenTwoWeeklyData) {
        setCurrentLeveragedTokenData(leveragedTokenTwoWeeklyData);
    }
    if (!currentVaultData && vaultHistoricalData) {
        setCurrentVaultData(vaultHistoricalData);
    }

    // Styling for active timeframe selector
    const activeTimeframeClasses = "bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 rounded-full font-semibold text-gray-light-12 dark:text-gray-dark-12";

    // Main button states
    const showFetchingOnchainDataInProgress = onchainETHRISEMetadata.loading || onchainBalance.loading || onchainOracle.loading || onchainTotalAvailableCash.loading || onchainNAV.loading;
    const showFailedToFetchOnChainData = !showFetchingOnchainDataInProgress && (onchainETHRISEMetadata.error || onchainBalance.error || onchainOracle.error || onchainTotalAvailableCash.error || onchainNAV.error) ? true : false;
    const showConnectWalletToMintOrRedeem = !showFetchingOnchainDataInProgress && !showFailedToFetchOnChainData && (!account || !connectedChain.data || !connectedChain.data.chain);
    const showSwitchNetwork = !showFetchingOnchainDataInProgress && !showFailedToFetchOnChainData && !showConnectWalletToMintOrRedeem && connectedChain.data.chain && connectedChain.data.chain.id != chain.id ? true : false;
    const showMintOrRedeem = !showFetchingOnchainDataInProgress && !showFailedToFetchOnChainData && !showConnectWalletToMintOrRedeem && !showSwitchNetwork ? true : false;

    // Current data
    const maxTotalCollateral = parseFloat(ethers.utils.formatUnits(onchainETHRISEMetadata.data ? onchainETHRISEMetadata.data.maxTotalCollateral : 0, collateralDecimals));
    const totalCollateralPlusFee = parseFloat(ethers.utils.formatUnits(onchainETHRISEMetadata.data ? onchainETHRISEMetadata.data.totalCollateralPlusFee : 0, collateralDecimals));
    const totalPendingFees = parseFloat(ethers.utils.formatUnits(onchainETHRISEMetadata.data ? onchainETHRISEMetadata.data.totalPendingFees : 0, collateralDecimals));
    const collateralPrice = parseFloat(ethers.utils.formatUnits(onchainOracle.data ? onchainOracle.data : 0, debtDecimals));
    const totalAvailableCash = parseFloat(ethers.utils.formatUnits(onchainTotalAvailableCash.data ? onchainTotalAvailableCash.data : 0, debtDecimals));
    const tokenNAV = parseFloat(ethers.utils.formatUnits(onchainNAV.data ? onchainNAV.data : 0, debtDecimals));
    const isMaxCapReached = maxTotalCollateral > 0 && totalCollateralPlusFee - totalPendingFees > maxTotalCollateral ? true : false;
    const isMintAmountMakeMaxCapReached = maxTotalCollateral > 0 && totalCollateralPlusFee - totalPendingFees + mintAmount > maxTotalCollateral ? true : false;
    const isNotEnoughLiquidity = mintAmount * collateralPrice > totalAvailableCash;
    const defaultMaxMintAmount = 5; // 5 ETH
    const maxMintAmount = maxTotalCollateral > 0 ? maxTotalCollateral - totalCollateralPlusFee : defaultMaxMintAmount;
    const mintedAmount = (mintAmount * collateralPrice) / tokenNAV;
    const minimalMintedAmount = mintedAmount - mintedAmount * (5 / 100);


    return (
        <>
            <div className="w-full h-full bg-gray-light-1 dark:bg-gray-dark-1 font-inter min-h-screen flex flex-col overflow-hidden">
                <Head>
                    <title>ETHRISE Market | Risedle</title>
                    <meta name="description" content="Leverage ETH or earn yield from your idle USDC" />
                </Head>
                <Favicon />

                {/* Navigation */}
                <div className="container max-w-full mx-auto sm:z-10">
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

                                {/* Price & Change */}
                                <div className="flex flex-row space-x-4 px-4">
                                    <div className="flex flex-col space-y-2 w-[52px]">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Price</p>
                                        {(leveragedTokenDataIsLoading || leveragedTokenDataIsError) && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                                        {!leveragedTokenDataIsLoading && currentLeveragedTokenData && <p className="font-ibm font-semibold text-sm leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(nav)}</p>}
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Change</p>
                                        {(leveragedTokenDataIsLoading || leveragedTokenDataIsError) && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                                        {!leveragedTokenDataIsLoading && currentLeveragedTokenData && (
                                            <div className="flex flex-row items-center">
                                                <svg className={navChange > 0 ? "fill-green-light-11 dark:fill-green-dark-11 inline-block" : "hidden"} width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" />
                                                </svg>
                                                <svg className={navChange > 0 ? "hidden" : "fill-red-light-11 dark:fill-red-dark-11 inline-block"} width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L8 11.2929L8 2.5C8 2.22386 7.77614 2 7.5 2C7.22386 2 7 2.22386 7 2.5L7 11.2929L3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536Z" />
                                                </svg>
                                                <p className={`font-ibm font-semibold text-sm text-gray-light-12 dark:text-gray-dark-12 tracking-[-0.02em] ${navChange > 0 ? "text-green-light-11 dark:text-green-dark-11" : "text-red-light-10 dark:text-red-dark-10"}`}>{navChange.toFixed(2) + "%"}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Price chart */}
                                <div className="w-full h-[192px] mt-8 z-0">
                                    {(leveragedTokenDataIsLoading || leveragedTokenDataIsError) && <div className="h-[192px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse mb-2"></div>}
                                    {!leveragedTokenDataIsLoading && currentLeveragedTokenData && (
                                        <ResponsiveContainer width="100%" height="100%" className="h-full">
                                            <AreaChart
                                                data={currentLeveragedTokenData.data}
                                                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                                onMouseLeave={() => {
                                                    setNAV(currentLeveragedTokenData.latestNAV);
                                                    setNAVChange(currentLeveragedTokenData.change);
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient id="upGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="rgba(37, 208, 171)" stopOpacity={0.4} />
                                                        <stop offset="100%" stopColor="rgba(37, 208, 171)" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="downGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="rgb(205, 43, 49)" stopOpacity={0.4} />
                                                        <stop offset="100%" stopColor="rgb(205, 43, 49)" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <Tooltip
                                                    position={{ y: 0 }}
                                                    content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            const selectedData = payload[0].payload;
                                                            const timestamp = selectedData.timestamp;
                                                            const date = new Date(timestamp);
                                                            const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "numeric", year: "numeric", minute: "numeric" }).format(date);

                                                            setNAV(selectedData.nav);
                                                            const change = ((selectedData.nav - currentLeveragedTokenData.oldestNAV) / currentLeveragedTokenData.oldestNAV) * 100;
                                                            setNAVChange(change);

                                                            return <div className="text-xs text-gray-light-10 dark:text-gray-dark-10">{formattedDate}</div>;
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <YAxis hide={true} type="number" domain={["dataMin - 5", "dataMax + 5"]} />
                                                <Area type="monotoneX" dataKey="nav" stroke={navChange > 0 ? "#4CC38A" : "#CD2B31"} fill={navChange > 0 ? "url(#upGradient)" : "url(#downGradient)"} strokeWidth={2} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>

                                {/* Timeframe selector */}
                                <div className="flex flex-row items-center px-4 mt-2">
                                    <div className="basis-1/5 text-center">
                                        <button
                                            className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Daily ? activeTimeframeClasses : ""}`}
                                            onClick={() => {
                                                setCurrentTimeframe(Timeframe.Daily);
                                                if (leveragedTokenDailyData) {
                                                    setCurrentLeveragedTokenData(leveragedTokenDailyData);
                                                    setNAV(leveragedTokenDailyData.latestNAV);
                                                    setNAVChange(leveragedTokenDailyData.change);
                                                }
                                            }}
                                        >
                                            1D
                                        </button>
                                    </div>
                                    <div className="basis-1/5 text-center">
                                        <button
                                            className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Weekly ? activeTimeframeClasses : ""}`}
                                            onClick={() => {
                                                setCurrentTimeframe(Timeframe.Weekly);
                                                if (leveragedTokenWeeklyData) {
                                                    setCurrentLeveragedTokenData(leveragedTokenWeeklyData);
                                                    setNAV(leveragedTokenWeeklyData.latestNAV);
                                                    setNAVChange(leveragedTokenWeeklyData.change);
                                                }
                                            }}
                                        >
                                            1W
                                        </button>
                                    </div>
                                    <div className="basis-1/5 text-center">
                                        <button
                                            className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.TwoWeekly ? activeTimeframeClasses : ""}`}
                                            onClick={() => {
                                                setCurrentTimeframe(Timeframe.TwoWeekly);
                                                if (leveragedTokenTwoWeeklyData) {
                                                    setCurrentLeveragedTokenData(leveragedTokenTwoWeeklyData);
                                                    setNAV(leveragedTokenTwoWeeklyData.latestNAV);
                                                    setNAVChange(leveragedTokenTwoWeeklyData.change);
                                                }
                                            }}
                                        >
                                            2W
                                        </button>
                                    </div>
                                    <div className="basis-1/5 text-center">
                                        <button
                                            className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Monthly ? activeTimeframeClasses : ""}`}
                                            onClick={() => {
                                                setCurrentTimeframe(Timeframe.Monthly);
                                                if (leveragedTokenMonthlyData) {
                                                    setCurrentLeveragedTokenData(leveragedTokenMonthlyData);
                                                    setNAV(leveragedTokenMonthlyData.latestNAV);
                                                    setNAVChange(leveragedTokenMonthlyData.change);
                                                }
                                            }}
                                        >
                                            1M
                                        </button>
                                    </div>
                                    <div className="basis-1/5 text-center">
                                        <button
                                            className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.ThreeMonthly ? activeTimeframeClasses : ""}`}
                                            onClick={() => {
                                                setCurrentTimeframe(Timeframe.ThreeMonthly);
                                                if (leveragedTokenThreeMonthlyData) {
                                                    setCurrentLeveragedTokenData(leveragedTokenThreeMonthlyData);
                                                    setNAV(leveragedTokenThreeMonthlyData.latestNAV);
                                                    setNAVChange(leveragedTokenThreeMonthlyData.change);
                                                }
                                            }}
                                        >
                                            3M
                                        </button>
                                    </div>
                                </div>

                                {/* Mint & Redeem Button */}
                                <div className="p-4">
                                    {/* Show loading button */}
                                    {showFetchingOnchainDataInProgress && <ButtonFetchingOnchainData />}

                                    {/* Show Failed to fetach button */}
                                    {showFailedToFetchOnChainData && <ButtonFailedToFetchOnchainData />}

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
                                    {showMintOrRedeem && (
                                        <Dialog.Root>
                                            <Dialog.Trigger className="bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 rounded-full w-full text-sm leading-4 tracking-[-0.02em] text-gray-light-1 dark:text-blue-light-1 font-semibold py-[11px] w-full">Mint or Redeem</Dialog.Trigger>
                                            <Dialog.Overlay className="fixed inset-0 bg-gray-dark-1/60 dark:bg-black/60 backdrop-blur z-30" />
                                            <Dialog.Content className="fixed left-0 bottom-0 z-30 w-screen sm:-translate-y-1/3">
                                                {/* Mint or Redeem container */}
                                                <div className="mx-4 mb-4 sm:max-w-[376px] sm:m-auto flex flex-col bg-gray-light-1 dark:bg-gray-dark-1 border border-gray-light-3 dark:border-gray-dark-3 rounded-[24px] mx-auto p-4">
                                                    <Dialog.Title className="flex flex-row justify-between items-center mb-4">
                                                        <div className="flex flex-row items-center space-x-4">
                                                            <div>
                                                                <img src={logo} alt={title} />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                                                                <h1 className="m-0 text-base tracking-[-0.02em] font-bold text-gray-light-12 dark:text-gray-dark-12">{title}</h1>
                                                            </div>
                                                        </div>
                                                        <Dialog.Close asChild>
                                                            <button className="button basic p-0 h-[32px]">
                                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-gray-light-12 dark:fill-gray-dark-12 w-[11px] h-[11px] m-[9.5px]">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </Dialog.Close>
                                                    </Dialog.Title>

                                                    <Tabs.Root defaultValue="mint" className="outline-0">
                                                        <Tabs.List aria-label="mintOrRedeem" className="bg-gray-light-3 dark:bg-gray-dark-2 rounded-[12px] flex flex-row p-1 mx-auto mb-6 mt-2">
                                                            <Tabs.Trigger value="mint" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 state-active:text-gray-light-12 state-active:dark:text-gray-dark-12 state-active:font-bold state-active:py-[12px] state-active:dark:bg-gray-dark-4 state-active:bg-gray-light-1">
                                                                Mint
                                                            </Tabs.Trigger>
                                                            <Tabs.Trigger value="redeem" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 state-active:text-gray-light-12 state-active:dark:text-gray-dark-12 state-active:font-bold state-active:py-[12px] state-active:dark:bg-gray-dark-4 state-active:bg-gray-light-1">
                                                                Redeem
                                                            </Tabs.Trigger>
                                                        </Tabs.List>

                                                        <Tabs.Content value="mint" className="outline-0 flex flex-col mx-auto sm:max-w-[540px] space-y-6">
                                                            {isMaxCapReached && (
                                                                <div className="flex flex-col mt-4 space-y-4">
                                                                    <div className="flex flex-row space-x-2 bg-yellow-light-2 dark:bg-yellow-dark-2 border border-yellow-light-5 dark:border-yellow-dark-5 rounded-[8px] items-center p-4">
                                                                        <svg className="fill-yellow-light-12 dark:fill-yellow-dark-12" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M8.4449 1.10861C8.0183 0.392832 6.9817 0.392832 6.55509 1.10861L0.161178 11.8367C-0.275824 12.5699 0.252503 13.4998 1.10608 13.4998H13.8939C14.7475 13.4998 15.2758 12.5699 14.8388 11.8367L8.4449 1.10861ZM7.4141 1.62058C7.45288 1.55551 7.54712 1.55551 7.5859 1.62058L13.9798 12.3486C14.0196 12.4153 13.9715 12.4998 13.8939 12.4998H1.10608C1.02849 12.4998 0.980454 12.4153 1.02018 12.3486L7.4141 1.62058ZM6.8269 4.98596C6.81221 4.60408 7.11783 4.28648 7.5 4.28648C7.88217 4.28648 8.18778 4.60408 8.1731 4.98596L8.01921 8.98686C8.00848 9.26585 7.7792 9.48649 7.5 9.48649C7.2208 9.48649 6.99151 9.26585 6.98078 8.98686L6.8269 4.98596ZM8.24989 10.9758C8.24989 11.3901 7.9141 11.7258 7.49989 11.7258C7.08567 11.7258 6.74989 11.3901 6.74989 10.9758C6.74989 10.5616 7.08567 10.2258 7.49989 10.2258C7.9141 10.2258 8.24989 10.5616 8.24989 10.9758Z"
                                                                            />
                                                                        </svg>
                                                                        <p className="text-yellow-light-12 dark:text-yellow-dark-12 text-xs">Max cap is reached</p>
                                                                    </div>
                                                                    <div className="border-b border-gray-light-3 dark:border-gray-dark-3 border-dashed pb-4">
                                                                        <p className="text-sm text-gray-light-10 dark:text-gray-dark-10">Buy {title} directly from Uniswap</p>
                                                                    </div>
                                                                    <Link href={uniswapSwapURL}>
                                                                        <a className="rounded-full bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 text-center font-semibold text-sm tracking-tighter text-gray-light-1 dark:text-blue-light-1 py-[9px]" target="_blank" rel="noreferrer">
                                                                            Buy on Uniswap
                                                                        </a>
                                                                    </Link>
                                                                </div>
                                                            )}

                                                            {!isMaxCapReached && (
                                                                <div className="mt-6">
                                                                    <div className="flex flex-row justify-between items-center">
                                                                        <p className="text-xs leading-4 font-semibold text-gray-light-12 dark:text-gray-dark-12">How many {collateralSymbol}?</p>
                                                                    </div>
                                                                    <form className="flex flex-col mt-2 space-y-4">
                                                                        <div className="flex flex-row p-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] items-center justify-between">
                                                                            <div className="grow">
                                                                                <input
                                                                                    className="w-full appearance-none outline-none font-ibm text-2xl font-bold bg-clip-text placeholder:bg-clip-text text-transparent placeholder:text-transparent transition-none gradient move-gradient bg-[length:250%_250%] focus:outline-none focus:ring-0 focus:shadow-none"
                                                                                    type="number"
                                                                                    placeholder="0"
                                                                                    min={0}
                                                                                    max={maxMintAmount.toFixed(3)}
                                                                                    value={mintAmount.toString()}
                                                                                    step={0.001}
                                                                                    onChange={(e) => {
                                                                                        if (e.target.value === "") {
                                                                                            setMintAmount(0);
                                                                                            return;
                                                                                        }
                                                                                        const value = parseFloat(e.target.value);
                                                                                        console.debug("e.target.value", e.target.value);
                                                                                        setMintAmount(value);
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="flex-none">
                                                                                <button
                                                                                    className="outline-none flex flex-row items-center space-x-2"
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        setMintAmount(parseFloat(userCollateralBalance.toFixed(3)));
                                                                                    }}
                                                                                >
                                                                                    <svg width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg" className="fill-green-light-10 dark:fill-green-dark-10">
                                                                                        <path
                                                                                            fillRule="evenodd"
                                                                                            clipRule="evenodd"
                                                                                            d="M13.9 1.0001C13.9 0.779184 13.7209 0.600098 13.5 0.600098C13.2791 0.600098 13.1 0.779184 13.1 1.0001V1.6001H12.5C12.2791 1.6001 12.1 1.77918 12.1 2.0001C12.1 2.22101 12.2791 2.4001 12.5 2.4001H13.1V3.0001C13.1 3.22101 13.2791 3.4001 13.5 3.4001C13.7209 3.4001 13.9 3.22101 13.9 3.0001V2.4001H14.5C14.7209 2.4001 14.9 2.22101 14.9 2.0001C14.9 1.77918 14.7209 1.6001 14.5 1.6001H13.9V1.0001ZM11.8536 3.64654C12.0488 3.8418 12.0488 4.15838 11.8536 4.35365L10.8536 5.35365C10.6583 5.54891 10.3417 5.54891 10.1465 5.35365C9.9512 5.15839 9.9512 4.84181 10.1465 4.64655L11.1464 3.64655C11.3417 3.45128 11.6583 3.45128 11.8536 3.64654ZM9.85357 5.64654C10.0488 5.84181 10.0488 6.15839 9.85357 6.35365L2.85355 13.3537C2.65829 13.5489 2.34171 13.5489 2.14645 13.3537C1.95118 13.1584 1.95118 12.8418 2.14645 12.6465L9.14646 5.64654C9.34172 5.45128 9.65831 5.45128 9.85357 5.64654ZM13.5 5.6001C13.7209 5.6001 13.9 5.77918 13.9 6.0001V6.6001H14.5C14.7209 6.6001 14.9 6.77918 14.9 7.0001C14.9 7.22101 14.7209 7.4001 14.5 7.4001H13.9V8.0001C13.9 8.22101 13.7209 8.4001 13.5 8.4001C13.2791 8.4001 13.1 8.22101 13.1 8.0001V7.4001H12.5C12.2791 7.4001 12.1 7.22101 12.1 7.0001C12.1 6.77918 12.2791 6.6001 12.5 6.6001H13.1V6.0001C13.1 5.77918 13.2791 5.6001 13.5 5.6001ZM8.90002 1.0001C8.90002 0.779184 8.72093 0.600098 8.50002 0.600098C8.2791 0.600098 8.10002 0.779184 8.10002 1.0001V1.6001H7.50002C7.2791 1.6001 7.10002 1.77918 7.10002 2.0001C7.10002 2.22101 7.2791 2.4001 7.50002 2.4001H8.10002V3.0001C8.10002 3.22101 8.2791 3.4001 8.50002 3.4001C8.72093 3.4001 8.90002 3.22101 8.90002 3.0001V2.4001H9.50002C9.72093 2.4001 9.90002 2.22101 9.90002 2.0001C9.90002 1.77918 9.72093 1.6001 9.50002 1.6001H8.90002V1.0001Z"
                                                                                        />
                                                                                    </svg>
                                                                                    <p className="text-green-light-10 dark:text-green-dark-10 text-sm tracking-tighter font-semibold">MAX</p>
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                        <div className="flex flex-row justify-between">
                                                                            <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10 text-left">
                                                                                Balance: {userCollateralBalance.toFixed(3)} {collateralSymbol}
                                                                            </p>
                                                                            <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10 text-right">
                                                                                Max mint: {maxMintAmount.toFixed(3)} {collateralSymbol}
                                                                            </p>
                                                                        </div>

                                                                        <div className="pt-4 pb-8 border-b border-gray-light-5 dark:border-gray-dark-5 border-dashed">
                                                                            {/* mint amount in range, display normal slider */}
                                                                            {mintAmount <= userCollateralBalance && (
                                                                                <Slider.Root
                                                                                    min={0}
                                                                                    value={[mintAmount]}
                                                                                    max={parseFloat(userCollateralBalance.toFixed(3))}
                                                                                    step={0.01}
                                                                                    className="relative w-full flex flex-row items-center"
                                                                                    onValueChange={(value) => {
                                                                                        setMintAmount(value[0]);
                                                                                    }}
                                                                                >
                                                                                    <Slider.Track className="relative h-[2px] w-full bg-gray-light-4 dark:bg-gray-dark-4">
                                                                                        <Slider.Range className="absolute h-[2px] bg-blue-light-10 dark:bg-blue-dark-10" />
                                                                                    </Slider.Track>
                                                                                    <Slider.Thumb className="h-[20px] w-[20px] rounded-full bg-gray-light-1 dark:bg-gray-dark-12 border border-gray-light-5 dark:border-0 block" />
                                                                                </Slider.Root>
                                                                            )}

                                                                            {/* mint amount out of range or mint amount max cap reached or mint amount not enough liquidity, display red slider */}
                                                                            {(mintAmount > userCollateralBalance || isMintAmountMakeMaxCapReached || isNotEnoughLiquidity) && (
                                                                                <Slider.Root
                                                                                    min={0}
                                                                                    value={[userCollateralBalance]}
                                                                                    max={parseFloat(userCollateralBalance.toFixed(3))}
                                                                                    step={0.01}
                                                                                    className="relative w-full flex flex-row items-center"
                                                                                    onValueChange={(value) => {
                                                                                        setMintAmount(value[0]);
                                                                                    }}
                                                                                >
                                                                                    <Slider.Track className="relative h-[2px] w-full bg-gray-light-4 dark:bg-gray-dark-4">
                                                                                        <Slider.Range className="absolute h-[2px] bg-red-light-11 dark:bg-red-dark-11" />
                                                                                    </Slider.Track>
                                                                                    <Slider.Thumb className="h-[20px] w-[20px] rounded-full bg-gray-light-1 dark:bg-gray-dark-12 border border-gray-light-5 dark:border-0 block" />
                                                                                </Slider.Root>
                                                                            )}
                                                                        </div>

                                                                        {/* Dislay disabled button with not enough balance */}
                                                                        {mintAmount > userCollateralBalance && (
                                                                            <div className="text-center w-full">
                                                                                <button disabled className="bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-gray-dark-5 text-sm leading-4 tracking-tighter font-semibold text-gray-light-10 dark:text-gray-dark-10 cursor-not-allowed py-[11px] w-full rounded-full">
                                                                                    Not enough balance
                                                                                </button>
                                                                            </div>
                                                                        )}

                                                                        {/* Dislay disabled button with max mint */}
                                                                        {mintAmount < userCollateralBalance && isMintAmountMakeMaxCapReached && !isNotEnoughLiquidity && (
                                                                            <div className="text-center w-full">
                                                                                <button disabled className="bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-gray-dark-5 text-sm leading-4 tracking-tighter font-semibold text-gray-light-10 dark:text-gray-dark-10 cursor-not-allowed py-[11px] w-full rounded-full">
                                                                                    Max Limit per Mint
                                                                                </button>
                                                                            </div>
                                                                        )}

                                                                        {/* Dislay disabled button with not enough liquidity */}
                                                                        {mintAmount < userCollateralBalance && isNotEnoughLiquidity && !isMintAmountMakeMaxCapReached && (
                                                                            <div className="text-center w-full">
                                                                                <button disabled className="bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-gray-dark-5 text-sm leading-4 tracking-tighter font-semibold text-gray-light-10 dark:text-gray-dark-10 cursor-not-allowed py-[11px] w-full rounded-full">
                                                                                    {debtSymbol} liquidity not enough
                                                                                </button>
                                                                            </div>
                                                                        )}

                                                                        {/* Dislay disabled button with not enough liquidity */}
                                                                        {mintAmount < userCollateralBalance && isNotEnoughLiquidity && isMintAmountMakeMaxCapReached && (
                                                                            <div className="text-center w-full">
                                                                                <button disabled className="bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-gray-dark-5 text-sm leading-4 tracking-tighter font-semibold text-gray-light-10 dark:text-gray-dark-10 cursor-not-allowed py-[11px] w-full rounded-full">
                                                                                    Please lower the mint amount
                                                                                </button>
                                                                            </div>
                                                                        )}

                                                                        {/* Dislay mint button */}
                                                                        {mintAmount < userCollateralBalance && !isMintAmountMakeMaxCapReached && !isNotEnoughLiquidity && (
                                                                            <div className="flex flex-col space-y-4">
                                                                                <div className="text-center">
                                                                                    <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">
                                                                                        You will get{" "}
                                                                                        <span className="font-semibold text-gray-light-12 dark:text-gray-dark-12">
                                                                                            {minimalMintedAmount.toFixed(3)} {title}
                                                                                        </span>{" "}
                                                                                        at minimum
                                                                                    </p>
                                                                                </div>
                                                                                <div className="text-center w-full">

                                                                                    {!isMinting && (
                                                                                        <button
                                                                                            onClick={async (e) => {
                                                                                                e.preventDefault();
                                                                                                // Set isMintingInProgress
                                                                                                setIsMinting(true);
                                                                                                const result = await mint({ args: [ethriseAddress], overrides: { value: ethers.utils.parseUnits(mintAmount.toString(), collateralDecimals) } });
                                                                                                if (result.error) {
                                                                                                    toast.custom((t) => <ToastError>{result.error.message}</ToastError>);
                                                                                                    setIsMinting(false);
                                                                                                    return;
                                                                                                }

                                                                                                const it = toast.custom((t) => <ToastTransaction hash={result.data.hash} />, { duration: Infinity });
                                                                                                const receipt = await result.data.wait(3);
                                                                                                toast.dismiss(it);
                                                                                                setIsMinting(false);
                                                                                                if (receipt.status === 1) {
                                                                                                    // success
                                                                                                    const event = receipt.logs[receipt.logs.length - 1];
                                                                                                    const confirmedMintedAmount = ethers.utils.formatUnits(event.data, collateralDecimals);
                                                                                                    toast.custom((t) => (
                                                                                                        <ToastSuccess>
                                                                                                            Successfully minted {parseFloat(confirmedMintedAmount).toFixed(3)} {title}{" "}
                                                                                                        </ToastSuccess>
                                                                                                    ));
                                                                                                } else {
                                                                                                    console.error("Something happening", receipt);
                                                                                                }
                                                                                            }}
                                                                                            className="bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 text-sm leading-4 tracking-tighter font-semibold text-gray-light-1 dark:text-blue-light-1 py-[11px] w-full rounded-full"
                                                                                        >
                                                                                            Mint
                                                                                        </button>
                                                                                    )}
                                                                                    {isMinting && (
                                                                                        <button className="cursor-wait flex flex-row text-center justify-center space-x-2 bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 text-blue-dark-1 dark:text-blue-light-1 text-sm leading-4 font-semibold py-[11px] px-4 rounded-full leading-4 inline-block tracking-[-0.02em] w-full drop-shadow-[0_0_45px_rgba(54,158,255,0.1)]">
                                                                                            <svg width="17" height="16" viewBox="0 0 17 16" className="fill-gray-light-12 dark:fill-gray-dark-12 animate-spin" xmlns="http://www.w3.org/2000/svg">
                                                                                                <g clipPath="url(#clip0_1161_30088)">
                                                                                                    <path opacity="0.2" d="M16.5 8.00049C16.5 12.4188 12.9183 16.0005 8.5 16.0005C4.08172 16.0005 0.5 12.4188 0.5 8.00049C0.5 3.58221 4.08172 0.000488281 8.5 0.000488281C12.9183 0.000488281 16.5 3.58221 16.5 8.00049ZM2.9 8.00049C2.9 11.0933 5.40721 13.6005 8.5 13.6005C11.5928 13.6005 14.1 11.0933 14.1 8.00049C14.1 4.90769 11.5928 2.40049 8.5 2.40049C5.40721 2.40049 2.9 4.90769 2.9 8.00049Z" />
                                                                                                    <path d="M15.3 8.00049C15.9627 8.00049 16.5092 8.5407 16.4102 9.196C16.3136 9.83526 16.1396 10.4619 15.891 11.062C15.489 12.0326 14.8997 12.9145 14.1569 13.6573C13.414 14.4002 12.5321 14.9895 11.5615 15.3915C10.9614 15.6401 10.3348 15.814 9.69551 15.9107C9.04021 16.0097 8.5 15.4632 8.5 14.8005C8.5 14.1377 9.04326 13.6133 9.69084 13.4724C10.0157 13.4017 10.3344 13.3021 10.643 13.1742C11.3224 12.8928 11.9398 12.4803 12.4598 11.9603C12.9798 11.4403 13.3923 10.8229 13.6737 10.1435C13.8016 9.83489 13.9012 9.51619 13.9719 9.19133C14.1129 8.54375 14.6373 8.00049 15.3 8.00049Z" />
                                                                                                </g>
                                                                                            </svg>
                                                                                            <div>Minting...</div>
                                                                                        </button>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </form>
                                                                </div>
                                                            )}
                                                        </Tabs.Content>
                                                        <Tabs.Content value="redeem" className="outline-0 flex flex-col mx-auto sm:max-w-[540px] space-y-6">
                                                            Redeem
                                                        </Tabs.Content>
                                                    </Tabs.Root>
                                                </div>
                                            </Dialog.Content>
                                        </Dialog.Root>
                                    )}
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

                                {/* Supply APY and Borrow APY */}
                                <div className="flex flex-row space-x-4 px-4">
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Supply APY</p>
                                        {(vaultHistoricalDataIsLoading || vaultHistoricalDataIsError) && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                                        {!vaultHistoricalDataIsLoading && vaultHistoricalData && <p className="font-ibm font-semibold text-sm leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{supplyAPY.toFixed(2) + "%"}</p>}
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Borrow APY</p>
                                        {(vaultHistoricalDataIsLoading || vaultHistoricalDataIsError) && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                                        {!vaultHistoricalDataIsLoading && vaultHistoricalData && <p className="font-ibm font-semibold text-sm leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{borrowAPY.toFixed(2) + "%"}</p>}
                                    </div>
                                </div>

                                {/* APYs chart */}
                                <div className="w-full h-[192px] mt-8">
                                    {(vaultHistoricalDataIsLoading || vaultHistoricalDataIsError) && <div className="h-[192px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse mb-2"></div>}
                                    {!vaultHistoricalDataIsLoading && vaultHistoricalData && (
                                        <ResponsiveContainer width="100%" height="100%" className="h-full">
                                            <AreaChart
                                                data={currentVaultData}
                                                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                                onMouseLeave={() => {
                                                    setSupplyAPY(initialSupplyAPY);
                                                    setBorrowAPY(initialBorrowAPY);
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="rgba(37, 208, 171)" stopOpacity={0.4} />
                                                        <stop offset="100%" stopColor="rgba(37, 208, 171)" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="borrowGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="rgb(205, 43, 49)" stopOpacity={0.4} />
                                                        <stop offset="100%" stopColor="rgb(205, 43, 49)" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <Tooltip
                                                    position={{ y: 0 }}
                                                    content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            const selectedData = payload[0].payload;
                                                            const timestamp = selectedData.timestamp;
                                                            const date = new Date(timestamp);
                                                            const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "numeric", year: "numeric", minute: "numeric" }).format(date);

                                                            setSupplyAPY(selectedData.supply_apy);
                                                            setBorrowAPY(selectedData.borrow_apy);

                                                            return <div className="text-xs text-gray-light-10 dark:text-gray-dark-10">{formattedDate}</div>;
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <YAxis hide={true} type="number" domain={["dataMin - 5", "dataMax + 5"]} />
                                                <Area type="monotoneX" dataKey="supply_apy" stroke="#4CC38A" fill="url(#supplyGradient)" strokeWidth={2} />
                                                <Area type="monotoneX" dataKey="borrow_apy" stroke="#CD2B31" fill="url(#borrowGradient)" strokeWidth={2} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>

                                {/* Timeframe selector */}
                                <div className="flex flex-row items-center px-4 mt-2">
                                    <div className="basis-1/5 text-center">
                                        <button
                                            className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Daily ? activeTimeframeClasses : ""}`}
                                            onClick={() => {
                                                setCurrentTimeframe(Timeframe.Daily);
                                                if (vaultHistoricalData) {
                                                    setCurrentVaultData(vaultHistoricalData.slice(vaultHistoricalData.length - 24, vaultHistoricalData.length));
                                                }
                                            }}
                                        >
                                            1D
                                        </button>
                                    </div>
                                    <div className="basis-1/5 text-center">
                                        <button
                                            className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Weekly ? activeTimeframeClasses : ""}`}
                                            onClick={() => {
                                                setCurrentTimeframe(Timeframe.Weekly);
                                                if (vaultHistoricalData) {
                                                    setCurrentVaultData(vaultHistoricalData.slice(vaultHistoricalData.length - 24 * 7, vaultHistoricalData.length));
                                                }
                                            }}
                                        >
                                            1W
                                        </button>
                                    </div>
                                    <div className="basis-1/5 text-center">
                                        <button
                                            className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.TwoWeekly ? activeTimeframeClasses : ""}`}
                                            onClick={() => {
                                                setCurrentTimeframe(Timeframe.TwoWeekly);
                                                if (vaultHistoricalData) {
                                                    setCurrentVaultData(vaultHistoricalData.slice(vaultHistoricalData.length - 24 * 7 * 2, vaultHistoricalData.length));
                                                }
                                            }}
                                        >
                                            2W
                                        </button>
                                    </div>
                                    <div className="basis-1/5 text-center">
                                        <button
                                            className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Monthly ? activeTimeframeClasses : ""}`}
                                            onClick={() => {
                                                setCurrentTimeframe(Timeframe.Monthly);
                                                if (vaultHistoricalData) {
                                                    setCurrentVaultData(vaultHistoricalData.slice(vaultHistoricalData.length - 24 * 7 * 2 * 4, vaultHistoricalData.length));
                                                }
                                            }}
                                        >
                                            1M
                                        </button>
                                    </div>
                                    <div className="basis-1/5 text-center">
                                        <button
                                            className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.ThreeMonthly ? activeTimeframeClasses : ""}`}
                                            onClick={() => {
                                                setCurrentTimeframe(Timeframe.ThreeMonthly);
                                                setCurrentVaultData(vaultHistoricalData);
                                            }}
                                        >
                                            3M
                                        </button>
                                    </div>
                                </div>

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

            <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        </>
    );
};

export default ETHRISEPage;
