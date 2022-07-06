import type { NextPage } from "next";
import { customChains } from "../../../components/v1/Wallet";

// Import components
import MarketsPageContainer from "../../../modules/marketsPage/MarketsPageContainer";

const BinanceMarkets: NextPage = () => {
    return <MarketsPageContainer chainID={customChains.bsc.id} />;
};

export default BinanceMarkets;
