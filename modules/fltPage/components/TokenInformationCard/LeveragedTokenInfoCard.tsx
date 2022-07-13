import { FunctionComponent, useEffect } from "react";
import toast from "react-hot-toast";
import { dollarFormatter } from "../../../../utils/formatters";
import { Metadata } from "../../../../components/v1/MarketMetadata";
import { useMarket } from "../../../../components/v1/swr/useMarket";
import ToastError from "../../../../uikit/toasts/Error";
import { chain as Chains } from "wagmi";
import { customChains, formatAddress, getEtherscanAddressURL } from "../../../../components/v1/Wallet";
import { InformationCardSubTitle, InformationCardTitle, InformationCard } from "../../../../uikit/card/FLTInformationCard";
import { useTokenInfoStore } from "./TokenInfoStore";
import { ContainerInfoItem, ItemInfo, ItemTitle } from "./InfoItem";

/**
 * LeveragedTokenInfoCardProps is a React Component properties that passed to React Component LeveragedTokenInfoCard
 */
type LeveragedTokenInfoCardProps = {
    chainID: number;
    address: string;
};

/**
 * LeveragedTokenInfoCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const LeveragedTokenInfoCard: FunctionComponent<LeveragedTokenInfoCardProps> = ({ chainID, address }) => {
    const metadata = Metadata[chainID][address];

    // Get the market data
    const { data: marketData, error } = useMarket(chainID, address);
    const { setData } = useTokenInfoStore();

    // Toast error if loading is error
    useEffect(() => {
        if (error) {
            toast.custom((t) => <ToastError>Failed to load information card data, please try to refresh</ToastError>);
        }
    }, [error]);

    useEffect(() => {
        if (marketData) {
            setData(marketData);
        }
    }, [marketData, setData]);

    return (
        <InformationCard>
            <InformationCardTitle>Informations</InformationCardTitle>
            <InformationCardSubTitle>{metadata.informationText}</InformationCardSubTitle>
            <div className="mt-6 flex align-middle">
                <img className="mr-1" src="/assets/icon/fltPage/worldIcon.svg" />
                <span className=" text-base leading-4 text-gray-dark-10">
                    Arbiscan{" "}
                    <a href={getEtherscanAddressURL(chainID === customChains.bsc.id ? customChains.bsc : Chains.arbitrumOne, address)} target="_blank" rel="noopener noreferrer" className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-dark-12">
                        {formatAddress(address)} &#8599;
                    </a>
                </span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t-2 border-dashed border-t-gray-dark-5 px-2 pt-4">
                <ContainerInfoItem>
                    <ItemTitle>Market cap</ItemTitle>
                    <ItemInfo>{dollarFormatter.format(marketData?.leveraged_token_market_cap || 0)}</ItemInfo>
                </ContainerInfoItem>
                <ContainerInfoItem>
                    <ItemTitle>Underlying assets</ItemTitle>
                    <ItemInfo>
                        {metadata.collateralSymbol}, {metadata.debtSymbol}
                    </ItemInfo>
                </ContainerInfoItem>
                <ContainerInfoItem>
                    <ItemTitle>Volume</ItemTitle>
                    <ItemInfo>&#36;{43.9}M</ItemInfo>
                </ContainerInfoItem>
                <ContainerInfoItem>
                    <ItemTitle>Trading Fees</ItemTitle>
                    <ItemInfo>0.1%</ItemInfo>
                </ContainerInfoItem>
                <ContainerInfoItem>
                    <ItemTitle>Management fees</ItemTitle>
                    <ItemInfo>
                        <p className="text-green-dark-11">FREE</p>
                    </ItemInfo>
                </ContainerInfoItem>
                <ContainerInfoItem>
                    <ItemTitle>Capacity (USDC)</ItemTitle>
                    <ItemInfo>
                        <p className="font-ibm text-xs font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                            <span className="text-green-light-11 dark:text-green-dark-11">{marketData?.leveraged_token_total_collateral.toFixed(2) + metadata.collateralSymbol}</span> / {(marketData?.leveraged_token_max_total_collateral || 0) > 0 && <span>{marketData?.leveraged_token_max_total_collateral.toFixed(2) + metadata.collateralSymbol}</span>}
                            {(marketData?.leveraged_token_max_total_collateral || 0) <= 0 && <span>&#8734;</span>}
                        </p>
                    </ItemInfo>
                </ContainerInfoItem>
            </div>
        </InformationCard>
    );
};

export default LeveragedTokenInfoCard;
