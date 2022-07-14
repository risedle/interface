import type { NextPage } from "next";
import { chain } from "wagmi";

// Import components
import FLTPageContainer from "../../../modules/fltPage/FLTPageContainer";

// BNBRISE Token ids
const BNBRISEAddress = "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452";

const BNBRISE: NextPage = () => {
    return <FLTPageContainer chainID={chain.arbitrumOne.id} tokenAddress={BNBRISEAddress} />;
};

export default BNBRISE;
