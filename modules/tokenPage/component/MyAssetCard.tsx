import { FunctionComponent, useEffect } from "react";
import { useLeveragedTokenNAV } from "../../../components/v1/swr/useLeveragedTokenNAV";
import { useTokenBalance } from "../../../components/v1/swr/useTokenBalance";
import { useVaultExchangeRate } from "../../../components/v1/swr/useVaultExchangeRate";
import { useWalletContext } from "../../../components/v1/Wallet";
import ButtonTertiary from "../../../uikit/button/ButtonTertiary";
import Button from "../../../uikit/buttonV2/Button";
import InformationCard from "../../../uikit/card/InformationCard";
import { addTokenToMetamask, tokenType } from "../../../utils/addTokenToMetamask";
import { useAssetStore } from "../store/assetStore";
import { LoadedData, useTokenStore } from "../store/tokenStore";
import { AssetsItem } from "./AssetItem";

type MyAssetsCardProps = {
    isVault?: boolean;
};

const MyAssetsCard = ({ state, isVault }: { state: LoadedData; isVault: boolean }) => {
    const { chainId, token: metadata, tokenId } = state;
    const { setValue, setError, state: assetState, setLoading } = useAssetStore();

    const { account, provider } = useWalletContext();
    const navResponse = useLeveragedTokenNAV({ token: tokenId, vault: metadata.vaultAddress, provider: provider }, { isPaused: () => !tokenId || !metadata || !provider });
    const latestVaultExchangeRateResponse = useVaultExchangeRate({ vault: metadata.vaultAddress, provider: provider }, { isPaused: () => !metadata || !provider });
    const balanceResponse = useTokenBalance({ account: account, token: isVault ? metadata.vaultAddress : tokenId, provider: provider }, { isPaused: () => !tokenId || !metadata || !account });

    const refetchData = () => {
        setLoading();
        navResponse.mutate();
        latestVaultExchangeRateResponse.mutate();
        balanceResponse.mutate();
    };

    useEffect(() => {
        if (!account) {
            setError("No account");
            return;
        }
    }, [account]);

    useEffect(() => {
        if (navResponse.data && latestVaultExchangeRateResponse.data && balanceResponse.data) {
            setValue(navResponse.data, latestVaultExchangeRateResponse.data, balanceResponse.data, metadata);
        }
    }, [navResponse.data, latestVaultExchangeRateResponse.data, balanceResponse.data]);

    useEffect(() => {
        if (navResponse.error || latestVaultExchangeRateResponse.error) {
            setError("Something went wrong");
        }
    }, [navResponse.error, latestVaultExchangeRateResponse.error]);

    if (assetState.status === "error" && assetState.error === "No account") {
        return null;
    }
    if (assetState.status === "loaded" && assetState.balance === 0) {
        return null;
    }

    return (
        <InformationCard>
            <div className="pt-4">
                <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">My Asset</h2>
            </div>
            {assetState.status !== "error" ? (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <AssetsItem variant="token" />
                        <AssetsItem variant="value" />
                        <AssetsItem variant="return" />
                        <AssetsItem variant="returnDollar" />
                    </div>
                    <ButtonTertiary full onClick={async () => await addTokenToMetamask({ token: tokenType.ETHRISE, chainID: chainId, isVaultToken: isVault })}>
                        Add {isVault ? metadata.vaultTitle : metadata.title} to Wallet
                    </ButtonTertiary>
                </>
            ) : (
                <div className="mx-auto text-center text-red-light-10">
                    <p>{assetState.error}</p>
                    <Button className="mx-auto mt-2" onClick={refetchData}>
                        Retry
                    </Button>
                </div>
            )}
        </InformationCard>
    );
};

const MyAssetsCardContainer: FunctionComponent<MyAssetsCardProps> = ({ isVault = false }) => {
    const { state } = useTokenStore();

    switch (state.status) {
        case "loaded":
            return <MyAssetsCard state={state} isVault={isVault} />;
        case "loading":
            return null;
        case "error":
            return <Button>Refresh</Button>;
    }
};

export default MyAssetsCardContainer;
