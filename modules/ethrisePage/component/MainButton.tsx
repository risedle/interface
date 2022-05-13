import { FunctionComponent } from "react";
import ButtonSwitchNetwork from "../../../components/v1/MarketDetailPage/Buttons/SwitchNetwork";
import ButtonDisabled from "../../../uikit/button/ButtonDisabled";
import { useWalletContext, DEFAULT_CHAIN } from "../../../components/v1/Wallet";
import ButtonMintOrRedeem from "./ButtonMintOrRedeem";
import ButtonDepositOrWithdraw from "../../../components/v1/MarketDetailPage/ButtonDepositOrWithdraw";

/**
 * MainButtonProps is a React Component properties that passed to React Component MainButton
 */
type MainButtonProps = {
    isVault?: boolean;
    tokenAddress: string;
};

/**
 * MainButton is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MainButton: FunctionComponent<MainButtonProps> = ({ isVault, tokenAddress }) => {
    const { account, chain, switchNetwork } = useWalletContext();

    // Button states
    const showConnectWallet = !account;
    const showSwitchNetwork = !showConnectWallet && chain.unsupported;
    const showAction = !showConnectWallet && !showSwitchNetwork ? true : false;
    return (
        <div className="p-4">
            {/* Show Connect wallet to mint or redeem */}
            {showConnectWallet && <ButtonDisabled full>Connect wallet to Mint or Redeem</ButtonDisabled>}

            {/* Show switch network */}
            {showSwitchNetwork && (
                <ButtonSwitchNetwork
                    onClick={() => {
                        if (switchNetwork) {
                            switchNetwork(DEFAULT_CHAIN.id);
                        }
                    }}
                    chainName={DEFAULT_CHAIN.name}
                />
            )}

            {/* Show mint or redeem */}
            {showAction && !isVault && <ButtonMintOrRedeem address={tokenAddress} />}

            {/* Show deposit or withdraw*/}
            {showAction && isVault && <ButtonDepositOrWithdraw address={tokenAddress} />}
        </div>
    );
};

export default MainButton;
