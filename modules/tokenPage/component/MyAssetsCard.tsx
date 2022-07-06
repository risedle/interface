import { ethers } from "ethers";
import type { FunctionComponent } from "react";
import ButtonTertiary from "../../../uikit/button/ButtonTertiary";
import { addTokenToMetamask, tokenType } from "../../../utils/addTokenToMetamask";
import { tokenBalanceFormatter } from "../../../utils/formatters";
import { Metadata } from "../../../components/v1/MarketMetadata";
import { useLeveragedTokenNAV } from "../../../components/v1/swr/useLeveragedTokenNAV";
import { useTokenBalance } from "../../../components/v1/swr/useTokenBalance";
import { useVaultExchangeRate } from "../../../components/v1/swr/useVaultExchangeRate";
import { useWalletContext, getProvider } from "../../../components/v1/Wallet";
import { AssetsItem } from "./AssetsItem";
import InformationCard from "../../../uikit/card/InformationCard";

/**
 * MyAssetsCardProps is a React Component properties that passed to React Component MyAssetsCard
 */
type MyAssetsCardProps = {
    chainID: number;
    address: string;
    isVault?: boolean;
};

// }

/**
 * MyAssetsCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MyAssetsCard: FunctionComponent<MyAssetsCardProps> = ({ address, isVault = false, chainID }) => {
    const { account, chain } = useWalletContext();
    const provider = getProvider({ chainId: chainID });
    const metadata = Metadata[chainID][address];

    // Read on-chain data
    const navResponse = useLeveragedTokenNAV({ token: address, vault: metadata.vaultAddress, provider: provider });
    const latestVaultExchangeRateResponse = useVaultExchangeRate({ vault: metadata.vaultAddress, provider: provider });
    const balanceResponse = useTokenBalance({ account: account, token: isVault ? metadata.vaultAddress : address, provider: provider });

    // Data
    const nav = parseFloat(ethers.utils.formatUnits(navResponse.data ? navResponse.data : 0, metadata.debtDecimals));
    const latestVaultExchangeRate = parseFloat(ethers.utils.formatUnits(latestVaultExchangeRateResponse.data ? latestVaultExchangeRateResponse.data : 0, metadata.collateralDecimals));
    const balance = parseFloat(ethers.utils.formatUnits(balanceResponse.data ? balanceResponse.data : 0, isVault ? metadata.debtDecimals : metadata.collateralDecimals));
    const value = (isVault ? latestVaultExchangeRate : nav) * balance;

    // UI states
    const showLoading = navResponse.isLoading || balanceResponse.isLoading ? true : false;
    const showError = navResponse.error || balanceResponse.error ? true : false;
    const showData = !showLoading && !showError && navResponse.data && balanceResponse.data ? true : false;
    if (balance > 0) {
        return (
            <InformationCard>
                <div className="pt-4">
                    <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">My Asset</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <AssetsItem icon="balance" title="Token Balance" value={`${tokenBalanceFormatter.format(balance)}`} showData={showData} showLoading={showLoading || showError} />
                    <AssetsItem icon="value" title="Value (USDC)" value={`${tokenBalanceFormatter.format(value)}`} showData={showData} showLoading={showLoading || showError} />
                    <AssetsItem icon="return" title="Return" value={`-`} showData={showData} showLoading={showLoading || showError} />
                    <AssetsItem icon="returnUSD" title="Return (USDC)" value={`-`} showData={showData} showLoading={showLoading || showError} />
                </div>
                <ButtonTertiary full onClick={async () => await addTokenToMetamask({ token: tokenType.ETHRISE, chainID: chain.chain.id, isVaultToken: isVault })}>
                    Add {isVault ? metadata.vaultTitle : metadata.title} to Wallet
                </ButtonTertiary>
            </InformationCard>
        );
    }
    return null;
};

export default MyAssetsCard;
