import type { NextPage } from "next";
import Head from "next/head";

// Import the useDapp
import { formatUnits } from "@ethersproject/units";

// Import wagmi
import { useContractRead } from "wagmi";

// Import components
import Favicon from "../../../components/Favicon";
import Navigation from "../../../components/Navigation";
import DetailHeader from "../../../components/DetailHeader";
import RisedleMarket from "../../../abis/RisedleMarket";

// PNG files
import ETHRISE_ICON from "../../../public/ETHRISE_ICON.png";

const ETHRISE: NextPage = () => {
    // Read data from chain
    const [ethriseNAVData, readEthriseNAV] = useContractRead(
        {
            addressOrName: RisedleMarket.address,
            contractInterface: RisedleMarket.interface,
        }, 
        'getETFNAV',
        {
            args: RisedleMarket.ethrise
        },
    )

    // Get NAV data
    let ethriseNAV: string = "- USDC";
    if (ethriseNAVData.data) {
        const nav = formatUnits(
            // @ts-ignore
            ethriseNAVData.data,
            6
        );
        const navFloat = parseFloat(nav);
        let dollarUSLocale = Intl.NumberFormat("en-US");
        ethriseNAV = `${dollarUSLocale.format(navFloat)} USDC`;
    }

    return (
        <div>
            <Head>
                <title>
                    ETHRISE - ETH 2x Leveraged Token | Risedle Protocol
                </title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
            </Head>
            <Favicon />
            <Navigation
                activeMenu="products"
            />
            <div className="mt-8 gap gap-y-8 flex flex-col">
                <DetailHeader
                    image={ETHRISE_ICON.src}
                    title="ETHRISE"
                    subTitle="Enjoy increased leverage with no liquidations for your ETH"
                    leftTitle="Mint"
                    leftPath="/products/ethrise/mint"
                    rightTitle="Redeem"
                    rightPath="/products/ethrise/redeem"
                />
                <div
                    className="flex flex-col bg-gradient-to-t from-grey-100 rounded-2xl p-6 gap gap-y-4 mx-auto"
                    style={{ width: "480px" }}
                >
                    <div>
                        <p className="text-sm font-semibold text-grey m-0 leading-normal">
                            Information
                        </p>
                        <p className="text-xl font-semibold text-white m-0 leading-normal">
                            ETHRISE is a leveraged token that goes 2x long ETH.
                            It generates 1.75x-2.5x leveraged gains when the
                            price of ETH rises.
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-grey m-0 leading-normal">
                                Management fees
                            </p>
                            <p className="text-2xl font-extrabold text-white m-0 leading-normal">
                                0%
                            </p>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-grey m-0 leading-normal">
                                Creation & redemption fees
                            </p>
                            <p className="text-2xl font-extrabold text-white m-0 leading-normal">
                                0.1%
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-grey m-0 leading-normal">
                                Underlying asset
                            </p>
                            <p className="text-2xl font-extrabold text-white m-0 leading-normal">
                                WETH
                            </p>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-grey m-0 leading-normal">
                                NAV
                            </p>
                            <p className="text-2xl font-extrabold text-white m-0 leading-normal">
                                {ethriseNAV}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ETHRISE;