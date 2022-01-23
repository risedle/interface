import { Fragment, FunctionComponent, useState } from "react";
import { useWalletContext } from "../Wallet";
import { AreaChart, Area, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Dialog, Tab } from "@headlessui/react";
import Link from "next/link";
import * as Slider from "@radix-ui/react-slider";

import { useLeveragedTokenData3Months } from "../../../utils/snapshot";

// Formatters
import { dollarFormatter } from "../../../utils/formatters";

/**
 * PriceChartProps is a React Component properties that passed to React Component PriceChart
 */
type PriceChartProps = {
    leveragedTokenAddress: string;
    title: string;
    subtitle: string;
    logo: string;
    totalCollateral: number;
    maxTotalCollateral: number;
    uniswapURL: string;
    mintTokenSymbol: string;
    mintTokenBalance: number;
    redeemTokenSymbol: string;
    redeemTokenBalance: number;
};

// Chart timeframes
enum Timeframe {
    Daily,
    Weekly,
    TwoWeekly,
    Monthly,
    ThreeMonthly,
}

/**
 * PriceChart is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const PriceChart: FunctionComponent<PriceChartProps> = ({ leveragedTokenAddress, title, subtitle, logo, mintTokenSymbol, totalCollateral, maxTotalCollateral, uniswapURL, mintTokenBalance, redeemTokenSymbol, redeemTokenBalance }) => {
    const { chain } = useWalletContext();
    const { leveragedTokenHistoricalData, leveragedTokenHistoricalDataIsLoading, leveragedTokenHistoricalDataIsError } = useLeveragedTokenData3Months(chain.id, leveragedTokenAddress);
    const [currentTimeframe, setCurrentTimeframe] = useState(Timeframe.TwoWeekly);
    const [currentData, setCurrentData] = useState(leveragedTokenHistoricalData);
    const [nav, setNAV] = useState(0);
    const [initialNAV, setInitialNAV] = useState(0);
    const [change, setChange] = useState(0);
    const [initialChange, setInitialChange] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mintAmount, setMintAmount] = useState(0);
    const [redeemAmount, setRedeemAmount] = useState(0);

    // Max minting amount
    const maxMintAmount = maxTotalCollateral - totalCollateral;

    // Set initial leveragedTokenHistoricalData for onMouseLeave event on the price chart
    if (initialNAV === 0 && initialChange === 0 && leveragedTokenHistoricalData) {
        const latestData = leveragedTokenHistoricalData[leveragedTokenHistoricalData.length - 1];
        const oldestData = leveragedTokenHistoricalData[0];
        const change = ((latestData.nav - oldestData.nav) / oldestData.nav) * 100;

        setInitialNAV(latestData.nav);
        setNAV(latestData.nav);
        setInitialChange(change);
        setChange(change);
    }

    const activeTimeframeClasses = "bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 rounded-full font-semibold text-gray-light-12 dark:text-gray-dark-12";

    // Set current leveragedTokenHistoricalData on the first load
    if (!currentData && leveragedTokenHistoricalData) {
        setCurrentData(leveragedTokenHistoricalData);
    }

    return (
        <>
            {/* Mint or Redeem dialog */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex flex-col-reverse min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-white/20 dark:bg-black/20 backdrop-blur" />

                    <div className="px-4 pb-6">
                        <div className="flex flex-col relative bg-gray-light-1 dark:bg-gray-dark-1 border border-gray-light-3 dark:border-gray-dark-3 rounded-[24px] mx-auto p-4">
                            {/* Title */}
                            <Dialog.Title className="flex flex-row justify-between items-center mb-4">
                                <div className="flex flex-row items-center space-x-4">
                                    <div>
                                        <img src={logo} alt={title} />
                                    </div>
                                    <div>
                                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                                        <h1 className="m-0 text-base tracking-tighter font-bold text-gray-light-12 dark:text-gray-dark-12">{title}</h1>
                                    </div>
                                </div>
                                <button className="bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 rounded-full h-[32px]" onClick={() => setIsDialogOpen(false)}>
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-gray-light-12 dark:fill-gray-dark-12 m-2 inline-block">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                                        />
                                    </svg>
                                </button>
                            </Dialog.Title>

                            <Tab.Group>
                                <Tab.List className="flex flex-row p-1 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[12px]">
                                    <Tab as={Fragment}>{({ selected }) => <button className={`basis-1/2 text-sm py-[10px] rounded-[8px] ${selected ? "bg-gray-light-1 dark:bg-gray-dark-1 font-bold text-gray-light-12 dark:text-gray-dark-12" : "text-gray-light-10 dark:text-gray-dark-10"}`}>Mint</button>}</Tab>
                                    <Tab as={Fragment}>{({ selected }) => <button className={`basis-1/2 text-sm py-[10px] rounded-[8px] ${selected ? "bg-gray-light-1 dark:bg-gray-dark-1 font-bold text-gray-light-12 dark:text-gray-dark-12" : "text-gray-light-10 dark:text-gray-dark-10"}`}>Redeem</button>}</Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    {/* Minting panel */}
                                    <Tab.Panel className="flex flex-col">
                                        {/* Maxed out mint */}
                                        {maxTotalCollateral >= 0 && maxTotalCollateral <= totalCollateral && (
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
                                                <Link href={uniswapURL}>
                                                    <a className="rounded-full bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 text-center font-semibold text-sm tracking-tighter text-gray-light-1 dark:text-blue-light-1 py-[9px]" target="_blank" rel="noreferrer">
                                                        Buy on Uniswap
                                                    </a>
                                                </Link>
                                            </div>
                                        )}
                                        {maxTotalCollateral >= 0 && totalCollateral < maxTotalCollateral && (
                                            <div className="mt-6">
                                                <div className="flex flex-row justify-between items-center">
                                                    <p className="text-xs leading-4 font-semibold text-gray-light-12 dark:text-gray-dark-12">How many {mintTokenSymbol}?</p>
                                                    <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">
                                                        Balance: {mintTokenBalance} {mintTokenSymbol}
                                                    </p>
                                                </div>
                                                <form className="flex flex-col mt-2 space-y-4">
                                                    <div className="flex flex-row p-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px]">
                                                        <input
                                                            className="appearance-none grow outline-none font-ibm text-2xl font-bold bg-clip-text placeholder:bg-clip-text text-transparent placeholder:text-transparent transition-none gradient move-gradient bg-[length:250%_250%] focus:outline-none focus:ring-0 focus:shadow-none"
                                                            type="number"
                                                            placeholder="0"
                                                            min={0}
                                                            max={mintTokenBalance}
                                                            value={mintAmount.toString()}
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
                                                        <button
                                                            className="outline-none flex flex-row items-center space-x-2"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setMintAmount(mintTokenBalance);
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

                                                    <div className="pt-4 pb-8 border-b border-gray-light-5 dark:border-gray-dark-5 border-dashed">
                                                        {/* mint amount in range, display normal slider */}
                                                        {mintAmount <= mintTokenBalance && (
                                                            <Slider.Root
                                                                min={0}
                                                                value={[mintAmount]}
                                                                max={mintTokenBalance}
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

                                                        {/* mint amount out of range, display red slider */}
                                                        {mintAmount > mintTokenBalance && (
                                                            <Slider.Root
                                                                min={0}
                                                                value={[mintTokenBalance]}
                                                                max={mintTokenBalance}
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
                                                    {mintAmount > mintTokenBalance && (
                                                        <div className="text-center w-full">
                                                            <button disabled className="bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-gray-dark-5 text-sm leading-4 tracking-tighter font-semibold text-gray-light-10 dark:text-gray-dark-10 cursor-not-allowed py-[11px] w-full rounded-full">
                                                                Not enough balance
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Dislay disabled button with not enough balance */}
                                                    {mintAmount <= mintTokenBalance && (
                                                        <div className="text-center w-full">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                }}
                                                                className="bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 text-sm leading-4 tracking-tighter font-semibold text-gray-light-1 dark:text-blue-light-1 py-[11px] w-full rounded-full"
                                                            >
                                                                Mint
                                                            </button>
                                                        </div>
                                                    )}
                                                </form>
                                            </div>
                                        )}
                                    </Tab.Panel>

                                    {/* Redeem panel */}
                                    <Tab.Panel className="flex flex-col">
                                        {/* TODO: User dont have redeem token, display error message */}

                                        {redeemTokenBalance > 0 && (
                                            <div className="mt-6">
                                                <div className="flex flex-row justify-between items-center">
                                                    <p className="text-xs leading-4 font-semibold text-gray-light-12 dark:text-gray-dark-12">How many {mintTokenSymbol}?</p>
                                                    <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">
                                                        Balance: {redeemTokenBalance} {redeemTokenSymbol}
                                                    </p>
                                                </div>
                                                <form className="flex flex-col mt-2 space-y-4">
                                                    <div className="flex flex-row p-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px]">
                                                        <input
                                                            className="appearance-none grow outline-none font-ibm text-2xl font-bold bg-clip-text placeholder:bg-clip-text text-transparent placeholder:text-transparent transition-none gradient move-gradient bg-[length:250%_250%] focus:outline-none focus:ring-0 focus:shadow-none"
                                                            type="number"
                                                            placeholder="0"
                                                            min={0}
                                                            max={redeemTokenBalance}
                                                            value={redeemAmount.toString()}
                                                            onChange={(e) => {
                                                                if (e.target.value === "") {
                                                                    setRedeemAmount(0);
                                                                    return;
                                                                }
                                                                const value = parseFloat(e.target.value);
                                                                console.debug("e.target.value", e.target.value);
                                                                setRedeemAmount(value);
                                                            }}
                                                        />
                                                        <button
                                                            className="outline-none flex flex-row items-center space-x-2"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setRedeemAmount(redeemTokenBalance);
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

                                                    <div className="pt-4 pb-8 border-b border-gray-light-5 dark:border-gray-dark-5 border-dashed">
                                                        {/* mint amount in range, display normal slider */}
                                                        {redeemAmount <= redeemTokenBalance && (
                                                            <Slider.Root
                                                                min={0}
                                                                value={[redeemAmount]}
                                                                max={redeemTokenBalance}
                                                                step={0.01}
                                                                className="relative w-full flex flex-row items-center"
                                                                onValueChange={(value) => {
                                                                    setRedeemAmount(value[0]);
                                                                }}
                                                            >
                                                                <Slider.Track className="relative h-[2px] w-full bg-gray-light-4 dark:bg-gray-dark-4">
                                                                    <Slider.Range className="absolute h-[2px] bg-blue-light-10 dark:bg-blue-dark-10" />
                                                                </Slider.Track>
                                                                <Slider.Thumb className="h-[20px] w-[20px] rounded-full bg-gray-light-1 dark:bg-gray-dark-12 border border-gray-light-5 dark:border-0 block" />
                                                            </Slider.Root>
                                                        )}

                                                        {/* mint amount out of range, display red slider */}
                                                        {redeemAmount > redeemTokenBalance && (
                                                            <Slider.Root
                                                                min={0}
                                                                value={[redeemTokenBalance]}
                                                                max={redeemTokenBalance}
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
                                                    {redeemAmount > redeemTokenBalance && (
                                                        <div className="text-center w-full">
                                                            <button disabled className="bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-gray-dark-5 text-sm leading-4 tracking-tighter font-semibold text-gray-light-10 dark:text-gray-dark-10 cursor-not-allowed py-[11px] w-full rounded-full">
                                                                Not enough balance
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Dislay disabled button with not enough balance */}
                                                    {redeemAmount <= redeemTokenBalance && (
                                                        <div className="text-center w-full">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                }}
                                                                className="bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 text-sm leading-4 tracking-tighter font-semibold text-gray-light-1 dark:text-blue-light-1 py-[11px] w-full rounded-full"
                                                            >
                                                                Redeem
                                                            </button>
                                                        </div>
                                                    )}
                                                </form>
                                            </div>
                                        )}
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </Dialog>

            <div className="px-4">
                <div className="flex flex-col sm:max-w-[540px] sm:mx-auto rounded-[16px] bg-gray-light-2 dark:bg-gray-dark-2">
                    <div className="flex flex-row p-4 justify-between items-center">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                            <h1 className="m-0 text-2xl font-bold text-gray-light-12 dark:text-gray-dark-12">{title}</h1>
                        </div>
                        <div>
                            <img src={logo} alt={title} />
                        </div>
                    </div>
                    <div className="flex flex-row px-4 space-x-4">
                        <div className="min-w-[67px] flex flex-col space-y-1">
                            <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Price</p>
                            {(leveragedTokenHistoricalDataIsLoading || leveragedTokenHistoricalDataIsError) && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                            {!leveragedTokenHistoricalDataIsLoading && leveragedTokenHistoricalData && <p className="font-ibm text-sm leading-4 tracking-tighter font-semibold text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(nav)}</p>}
                        </div>
                        <div className="min-w-[67px] flex flex-col space-y-1">
                            <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Change</p>
                            {(leveragedTokenHistoricalDataIsLoading || leveragedTokenHistoricalDataIsError) && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                            {!leveragedTokenHistoricalDataIsLoading && leveragedTokenHistoricalData && (
                                <div className="flex flex-row items-center">
                                    <svg className={change > 0 ? "fill-green-light-11 dark:fill-green-dark-11 inline-block" : "hidden"} width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" />
                                    </svg>
                                    <svg className={change > 0 ? "hidden" : "fill-red-light-11 dark:fill-red-dark-11 inline-block"} width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L8 11.2929L8 2.5C8 2.22386 7.77614 2 7.5 2C7.22386 2 7 2.22386 7 2.5L7 11.2929L3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536Z" />
                                    </svg>
                                    <p className={`font-ibm font-semibold text-sm text-gray-light-12 dark:text-gray-dark-12 tracking-tighter ${change > 0 ? "text-green-light-11 dark:text-green-dark-11" : "text-red-light-10 dark:text-red-dark-10"}`}>{change.toFixed(2) + "%"}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full h-[232px] inline-block flex flex-col pt-4">
                        {(leveragedTokenHistoricalDataIsLoading || leveragedTokenHistoricalDataIsError) && <div className="h-[192px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse mb-2"></div>}
                        {!leveragedTokenHistoricalDataIsLoading && leveragedTokenHistoricalData && (
                            <ResponsiveContainer width="100%" height="100%" className="h-[192px]">
                                <AreaChart
                                    data={currentData}
                                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                    onMouseLeave={() => {
                                        setNAV(initialNAV);
                                        setChange(initialChange);
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
                                                const latestData = payload[0].payload;
                                                const timestamp = latestData.timestamp;
                                                const date = new Date(timestamp);
                                                const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "numeric", year: "numeric", minute: "numeric" }).format(date);

                                                setNAV(latestData.nav);

                                                let cd, oldestData;
                                                switch (currentTimeframe) {
                                                    case Timeframe.Daily:
                                                        cd = leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24, leveragedTokenHistoricalData.length);
                                                        oldestData = cd[0];
                                                        break;
                                                    case Timeframe.Weekly:
                                                        cd = leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7, leveragedTokenHistoricalData.length);
                                                        oldestData = cd[0];
                                                        break;
                                                    case Timeframe.TwoWeekly:
                                                        cd = leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7 * 2, leveragedTokenHistoricalData.length);
                                                        oldestData = cd[0];
                                                        break;
                                                    case Timeframe.Monthly:
                                                        cd = leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7 * 2 * 4, leveragedTokenHistoricalData.length);
                                                        oldestData = cd[0];
                                                        break;
                                                    case Timeframe.ThreeMonthly:
                                                        cd = leveragedTokenHistoricalData;
                                                        oldestData = cd[0];
                                                        break;
                                                }

                                                const change = ((latestData.nav - oldestData.nav) / oldestData.nav) * 100;
                                                setChange(change);

                                                return <div className="text-xs text-gray-light-10 dark:text-gray-dark-10">{formattedDate}</div>;
                                            }
                                            return null;
                                        }}
                                    />
                                    <YAxis hide={true} type="number" domain={["leveragedTokenHistoricalDataMin - 5", "leveragedTokenHistoricalDataMax + 5"]} />
                                    <Area type="monotoneX" dataKey="nav" stroke={change > 0 ? "#4CC38A" : "#CD2B31"} fill={change > 0 ? "url(#upGradient)" : "url(#downGradient)"} strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                        <div className="flex flex-row items-center">
                            <div className="basis-1/5 text-center">
                                <button
                                    className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Daily ? activeTimeframeClasses : ""}`}
                                    onClick={() => {
                                        setCurrentTimeframe(Timeframe.Daily);
                                        if (leveragedTokenHistoricalData) {
                                            setCurrentData(leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24, leveragedTokenHistoricalData.length));
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
                                        if (leveragedTokenHistoricalData) {
                                            setCurrentData(leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7, leveragedTokenHistoricalData.length));
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
                                        if (leveragedTokenHistoricalData) {
                                            setCurrentData(leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7 * 2, leveragedTokenHistoricalData.length));
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
                                        if (leveragedTokenHistoricalData) {
                                            setCurrentData(leveragedTokenHistoricalData.slice(leveragedTokenHistoricalData.length - 24 * 7 * 2 * 4, leveragedTokenHistoricalData.length));
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
                                        setCurrentData(leveragedTokenHistoricalData);
                                    }}
                                >
                                    3M
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <button
                            className="w-full text-center py-[11px] bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 rounded-full text-sm leading-4 tracking-tighter font-semibold text-blue-light-1"
                            onClick={() => {
                                setIsDialogOpen(true);
                            }}
                        >
                            Mint or Redeem
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PriceChart;
