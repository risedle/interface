import { ethers } from "ethers";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { tokenBalanceFormatter } from "../../../utils/formatters";
import { Metadata } from "../../../components/v1/MarketMetadata";
import { useCollateralPerLeveragedToken } from "../../../components/v1/swr/useCollateralPerLeveragedToken";
import { useDebtPerLeveragedToken } from "../../../components/v1/swr/useDebtPerLeveragedToken";
import { getProvider } from "../../../components/v1/Wallet";
import { InformationCardExtra, InformationCardSubTitle, InformationCardTitle, InformationCard } from "../../../uikit/card/InformationCard";
import { StatusEnum } from "./TokenInformation/TokenInfoStore";

type LeveragedTokenBackingCardProps = {
    chainID: number;
    address: string;
};

type UiType = {
    status: StatusEnum;
    data?: {
        collateralPerLeveragedToken?: number;
        debtPerLeveragedToken?: number;
    };
    error?: string;
};

const LeveragedTokenBackingCard: FunctionComponent<LeveragedTokenBackingCardProps> = ({ chainID, address }) => {
    const provider = useMemo(() => {
        return getProvider({ chainId: chainID });
    }, [chainID]);
    const metadata = Metadata[chainID][address];
    const collateralPerTokenResponse = useCollateralPerLeveragedToken({ token: address, vault: metadata.vaultAddress, provider: provider });
    const debtPerTokenResponse = useDebtPerLeveragedToken({ token: address, vault: metadata.vaultAddress, provider: provider });
    const [uiData, setUiData] = useState<UiType>({
        status: "loading",
    });

    useEffect(() => {
        if (metadata) {
            if (collateralPerTokenResponse.data && debtPerTokenResponse.data) {
                setUiData({
                    status: "loaded",
                    data: {
                        collateralPerLeveragedToken: parseFloat(ethers.utils.formatUnits(collateralPerTokenResponse.data ? collateralPerTokenResponse.data : 0, metadata.collateralDecimals)),
                        debtPerLeveragedToken: parseFloat(ethers.utils.formatUnits(debtPerTokenResponse.data ? debtPerTokenResponse.data : 0, metadata.debtDecimals)),
                    },
                });
            }
        }
    }, [collateralPerTokenResponse.data, debtPerTokenResponse.data, metadata]);

    useEffect(() => {
        if (collateralPerTokenResponse.error || debtPerTokenResponse.error) {
            setUiData({
                status: "error",
                error: collateralPerTokenResponse?.error?.message || debtPerTokenResponse?.error?.message,
            });
        }
    }, [collateralPerTokenResponse.error, debtPerTokenResponse.error]);

    return (
        <InformationCard>
            <InformationCardTitle>Backing per {metadata.title}</InformationCardTitle>
            <InformationCardSubTitle>{metadata.title} represents collaterized debt position and can be redeemed at any time.</InformationCardSubTitle>
            {
                //TODO: simplify table with custom component and custom logic
            }
            <table className="text-right">
                <thead className="bg-gray-dark-3 font-inter text-xs text-gray-dark-10	">
                    <tr>
                        <th className="rounded-bl-lg rounded-tl-lg py-2 pl-2 text-left">Token</th>
                        <th className="py-2">Allocation</th>
                        <th className="w-[80px] rounded-br-lg rounded-tr-lg py-2 pr-2">Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b-2 border-dashed border-b-gray-dark-5 px-2">
                        <td className="py-4 pl-2 text-left">
                            <p className="text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{metadata.collateralSymbol}</p>
                        </td>
                        <td>
                            {uiData.status === "loading" && <p className="h-4 w-[100px] animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                            {uiData.status === "loaded" && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{tokenBalanceFormatter.format(uiData.data?.collateralPerLeveragedToken || 0)}</p>}
                        </td>
                        <td className="pr-2">{0}%</td>
                    </tr>
                    <tr>
                        <td className="py-4 pl-2 text-left">
                            <p className="text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{metadata.debtSymbol}</p>
                        </td>
                        <td>
                            {uiData.status === "loading" && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                            {uiData.status === "loaded" && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">-{tokenBalanceFormatter.format(uiData.data?.debtPerLeveragedToken || 0)}</p>}
                        </td>
                        <td className="pr-2">{0}%</td>
                    </tr>
                </tbody>
            </table>
            <InformationCardExtra className="bg-green-dark-2">
                <p className=" font-inter text-xs text-white">
                    &#10003; Last rebalanced at: <span className="font-semibold"> 13-01-2022 03:23AM </span>
                </p>
            </InformationCardExtra>
        </InformationCard>
    );
};

export default LeveragedTokenBackingCard;
