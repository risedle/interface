import { FunctionComponent } from "react";
import LeveragedTokenChart from "./LeveragedTokenChart";
import VaultChart from "./VaultChart";
import MainButton from "./MainButton";
import MyAssetsCard from "./MyAssetsCard";

/**
 * PriceInfoCardProps is a React Component properties that passed to React Component PriceInfoCard
 */
type PriceInfoCardProps = {
    chainID: number;
    title: string;
    subtitle: string;
    logo: string;
    tokenAddress: string;
    isVault?: boolean;
    vaultAddress?: string;
};

/**
 * PriceInfoCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const PriceInfoCard: FunctionComponent<PriceInfoCardProps> = ({ chainID, title, subtitle, logo, tokenAddress, isVault, vaultAddress }) => {
    return (
        <div className="max-w-[540px]">
            <div className="flex w-full flex-col rounded-2xl bg-gray-light-2 dark:bg-gray-dark-2 ">
                <div className="flex flex-row items-center justify-between p-4">
                    <div className="flex grow flex-col space-y-2">
                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                        <h1 className="m-0 text-2xl font-bold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{title}</h1>
                    </div>
                    <img className="h-12 w-12" src={logo} alt={title} />
                </div>
                {isVault && vaultAddress ? <VaultChart chainID={chainID} address={vaultAddress} /> : <LeveragedTokenChart chainID={chainID} address={tokenAddress} />}

                <div className="mx-4 mt-4 border-t-2 border-dashed border-t-gray-dark-5  pt-2">
                    <MyAssetsCard chainID={chainID} address={tokenAddress} isVault={isVault} />

                    <MainButton chainID={chainID} isVault={isVault} tokenAddress={tokenAddress} />
                </div>
            </div>
        </div>
    );
};

export default PriceInfoCard;
