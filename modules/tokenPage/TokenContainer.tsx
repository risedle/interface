import ButtonConnectWalletMobile from "../../components/v1/Buttons/ConnectWalletMobile";
import Footer from "../../uikit/layout/Footer";
import BackgroundGradient from "../ethrisePage/component/BackgroundGradient";
import LeveragedTokenBackingCard from "../ethrisePage/component/LeveragedTokenBackingCard";
import LeveragedTokenInfoCard from "../ethrisePage/component/LeveragedTokenInfoCard";
import TabsContentGrid from "../ethrisePage/component/TabsContentGrid";
import VaultInfoCard from "../ethrisePage/component/VaultInfoCard";
import { Root as TabsRoot } from "@radix-ui/react-tabs";
import PriceInfoCard from "./component/PriceInfoCard";
import { useTokenStore } from "./store/tokenStore";
import TabsList from "../ethrisePage/component/TabsList";
import MyAssetsCardContainer from "./component/MyAssetCard";

const MainContent = () => {
    const { state } = useTokenStore();
    if (state.status === "loaded") {
        const { tokenId: tokenAddress } = state;
        return (
            <TabsRoot defaultValue="leverage" className="px-4 outline-0 sm:mx-auto">
                <TabsList />
                {/* Leverage Tab */}
                <TabsContentGrid value="leverage">
                    {/* Left Column */}
                    <PriceInfoCard />
                    {/* Right Column */}
                    <div className="flex max-w-[540px] flex-col space-y-6">
                        <MyAssetsCardContainer />
                        <LeveragedTokenInfoCard address={tokenAddress} />
                        <LeveragedTokenBackingCard address={tokenAddress} />
                    </div>
                </TabsContentGrid>
                {/* Lend Tab */}
                <TabsContentGrid value="lend">
                    {/* Left Column */}
                    <PriceInfoCard isVault />

                    {/* RightColumn */}
                    <div className="max-w-[540px] flex-col space-y-6">
                        <MyAssetsCardContainer isVault={true} />
                        <VaultInfoCard address={tokenAddress} />
                    </div>
                </TabsContentGrid>
            </TabsRoot>
        );
    } else return <div>loading...</div>; // TODO: loading view ??
};

function TokenContainer() {
    return (
        <>
            <div className="mb-20 mt-[76px] flex flex-grow flex-col sm:z-10 sm:mb-0 sm:mt-[120px]">
                <MainContent />
            </div>
            <div className="hidden sm:mt-20 sm:inline-block">
                <Footer />
            </div>
            <BackgroundGradient />
            <div className="sm:hidden">
                <ButtonConnectWalletMobile />
            </div>
        </>
    );
}

export { TokenContainer };
