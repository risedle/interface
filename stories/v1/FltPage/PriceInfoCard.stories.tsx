import { chain } from "wagmi";
import PriceInfoCardComponent from "../../../modules/fltPage/components/PriceInfoCard/PriceInfoCardContainer";

export default {
    component: PriceInfoCardComponent,
    title: "Risedle V1/FLT Page/Price Info Card",
};

export const PriceInfoCard = () => <PriceInfoCardComponent chainID={chain.arbitrumOne.id} address="0x46D06cf8052eA6FdbF71736AF33eD23686eA1452" />;
