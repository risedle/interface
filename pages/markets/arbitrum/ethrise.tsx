import type { NextPage } from "next";
import { chain } from "wagmi";

// Import components
import TokenPageContainer from "../../../modules/tokenPage/TokenPageContainer";

// ETHRISE Token ids
const ETHRISEAddress = "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452";

const ETHRISE: NextPage = () => {
    return <TokenPageContainer chainID={chain.arbitrumOne.id} tokenAddress={ETHRISEAddress} />;
};

export default ETHRISE;
