import type { NextPage } from "next";
import { chain } from "wagmi";

// Import components
import MarketsPageContainer from "../../../modules/marketsPage/MarketsPageContainer";

const ArbitrumMarkets: NextPage = () => {
    return <MarketsPageContainer chainID={chain.arbitrumOne.id} />;
};

export default ArbitrumMarkets;
