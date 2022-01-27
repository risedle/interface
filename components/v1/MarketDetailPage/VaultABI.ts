import { ethers } from "ethers";

export const VaultABI = new ethers.utils.Interface([
    "function getMetadata(address token) external view returns (bool isETH, address token, address collateral, address oracleContract, address swapContract, address maxSwapSlippageInEther, uint256 initialPrice, uint256 feeInEther, uint256 totalCollateralPlusFee, uint256 totalPendingFees, uint256 minLeverageRatioInEther, uint256 maxLeverageRatioInEther, uint256 maxRebalancingValue, uint256 rebalancingStepInEther, uint256 maxTotalCollateral)",
    "function getTotalAvailableCash() external view returns (uint256 totalAvailableCash)",
    "function getNAV(address token) external view returns (uint256 nav)",
    "function mint(address token) external payable",
]);

export default VaultABI;
