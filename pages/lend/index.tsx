import type { NextPage } from "next";
import Head from "next/head";

// Import components
import Favicon from "../../components/Favicon";
import Navigation from "../../components/Navigation";
import DetailHeader from "../../components/DetailHeader";
import DetailCard from "../../components/DetailCard";

// PNG files
import USDC_ICON from "../../public/USDC_ICON.png";

const Lend: NextPage = () => {
    // TODO (bayu):
    // 1. Get supply APY data
    // 2. Get TVL data
    // 3. Get user balance on the vault token
    // 4. Get available to withdraw
    // 5. Get the exchange rate of vault token
    const cardItems = [
        {
            title: "Your balance",
            value: "0.00 rvUSDC",
        },
        {
            title: "Available to withdraw",
            value: "0.00 rvUSDC",
        },
        {
            title: "Total value",
            value: "0.00 USDC",
        },
    ];

    return (
        <div>
            <Head>
                <title>Earn 56.75% APY | Risedle Protocol</title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
            </Head>
            <Favicon />
            <Navigation activeMenu="lend" />
            <div className="mt-8 gap gap-y-8 flex flex-col">
                <DetailHeader
                    image={USDC_ICON}
                    title="Earn 56.75% APY"
                    subTitle="TVL 10,000.00 USDC"
                    leftTitle="Deposit"
                    leftPath="/lend/deposit"
                    rightTitle="Withdraw"
                    rightPath="/lend/withdraw"
                />
                <DetailCard items={cardItems} />
            </div>
        </div>
    );
};

export default Lend;
