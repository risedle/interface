import { FunctionComponent } from "react";
import { chain as Chains } from "wagmi";
import ButtonSwitchNetwork from "../../../components/v1/MarketDetailPage/Buttons/SwitchNetwork";
import ButtonDisabled from "../../../uikit/button/ButtonDisabled";
import { useWalletContext, customChains } from "../../../components/v1/Wallet";
import ButtonMintOrRedeem from "./ButtonMintOrRedeem";
import ButtonDepositOrWithdraw from "./ButtonDepositOrWithdraw";

/**
 * MainButtonProps is a React Component properties that passed to React Component MainButton
 */
type MainButtonProps = {
    chainID: number;
    isVault?: boolean;
    tokenAddress: string;
};

/**
 * MainButton is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MainButton: FunctionComponent<MainButtonProps> = ({ chainID, isVault, tokenAddress }) => {
    const { account, chain, switchNetwork } = useWalletContext();

    const selectedChain = chainID === customChains.bsc.id ? customChains.bsc : Chains.arbitrumOne;

    // Button states
    const showConnectWallet = !account;
    const showSwitchNetwork = !showConnectWallet && chain.chain.id !== selectedChain.id;
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
                            switchNetwork(selectedChain.id);
                        }
                    }}
                    chainName={selectedChain.name}
                />
            )}

            {/* Show mint or redeem */}
            {showAction && !isVault && <ButtonMintOrRedeem chainID={chainID} address={tokenAddress} />}

            {/* Show deposit or withdraw*/}
            {showAction && isVault && <ButtonDepositOrWithdraw chainID={chainID} address={tokenAddress} />}
        </div>
    );
};

export default MainButton;
