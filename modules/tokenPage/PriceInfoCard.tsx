import { FunctionComponent } from "react";
import LeveragedTokenChart from "../ethrisePage/component/LeveragedTokenChart";
import MainButton from "../ethrisePage/component/MainButton";
import VaultChart from "../ethrisePage/component/VaultChart";
import { useTokenStore } from "./tokenStore";

type PriceInfoCardProps = {
    isVault?: boolean;
};

const PriceInfoCard: FunctionComponent<PriceInfoCardProps> = ({ isVault }) => {
    const { state } = useTokenStore();
    const { status } = state;
    if (status === "loaded") {
        const { token, tokenId } = state;
        const { vaultAddress, subtitle, title, logo } = token;
        return (
            <div className="max-w-[540px]">
                <div className="flex w-full flex-col rounded-[16px] bg-gray-light-2 dark:bg-gray-dark-2 ">
                    <div className="flex flex-row items-center justify-between p-4">
                        <div className="flex grow flex-col space-y-2">
                            <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                            <h1 className="m-0 text-2xl font-bold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{title}</h1>
                        </div>
                        <img className="h-[48px] w-[48px]" src={logo} alt={title} />
                    </div>
                    {isVault && vaultAddress ? <VaultChart address={vaultAddress} /> : <LeveragedTokenChart address={tokenId} />}
                    <MainButton isVault={isVault} tokenAddress={tokenId} />
                </div>
            </div>
        );
    } else return null;
};

export default PriceInfoCard;
