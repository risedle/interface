import { ethers } from "ethers";
import type { FunctionComponent } from "react";
import { Metadata } from "../MarketMetadata";
import { useLeveragedTokenNAV } from "../swr/useLeveragedTokenNAV";
import { useTokenBalance } from "../swr/useTokenBalance";
import { DEFAULT_CHAIN, useWalletContext } from "../Wallet";
import { AssetsItem } from "./AssetsItem";

/**
 * MyAssetCardProps is a React Component properties that passed to React Component MyAssetCard
 */
type MyAssetCardProps = {
    address: string;
};

// }

/**
 * MyAssetCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MyAssetCard: FunctionComponent<MyAssetCardProps> = ({ address }) => {
    const { account, chain, provider } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const metadata = Metadata[chainID][address];

    // Read on-chain data
    const navResponse = useLeveragedTokenNAV({ token: address, vault: metadata.vaultAddress, provider: provider });
    const balanceResponse = useTokenBalance({ account: account, token: address, provider: provider });

    // Data
    const nav = parseFloat(ethers.utils.formatUnits(navResponse.data ? navResponse.data : 0, metadata.debtDecimals));
    const balance = parseFloat(ethers.utils.formatUnits(balanceResponse.data ? balanceResponse.data : 0, metadata.collateralDecimals));

    // UI states
    const showLoading = navResponse.isLoading || balanceResponse.isLoading ? true : false;
    const showError = navResponse.error || balanceResponse.error ? true : false;
    const showData = !showLoading && !showError && navResponse.data && balanceResponse.data ? true : false;

    return (
        <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
            <div className="pt-4">
                <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">My Asset</h2>
            </div>
            <div className="grid grid-cols-2 gap-8">
                <AssetsItem title="Token Balance" image="/markets/tokenBalanceIcon.svg" balance={balance} showData={showData} showLoading={showLoading || showError} assetsName={metadata.title} />
                <AssetsItem title="Value (USDC)" image="/markets/returnIcon.svg" balance={balance * nav} showData={showData} showLoading={showLoading || showError} assetsName={metadata.debtSymbol} />
                <AssetsItem title="Return" image="/markets/returnBalanceIcon.svg" balance={balance * nav} showData={showData} showLoading={showLoading || showError} assetsName={metadata.debtSymbol} />
                <AssetsItem title="Return (USDC)" image="/markets/balanceIcon.svg" balance={balance * nav} showData={showData} showLoading={showLoading || showError} assetsName={metadata.debtSymbol} />
            </div>
        </div>
    );
};

export default MyAssetCard;
