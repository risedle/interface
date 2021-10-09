import { utils } from "ethers";

const VAULT = "0x4576Df8E6C99d7Bb71Aa9E843BfbE9111D5ff256";
const ETHRISE = "0xB1Bd881Ef4eF1975f7b19b23da52558708C4FDdB";
const INTERFACE = new utils.Interface([
    // Read only
    "function getSupplyRatePerSecondInEther() view returns (uint256)",
    "function totalOutstandingDebt() view returns (uint256)",
    "function getTotalAvailableCash() view returns (uint256)",
    "function getExchangeRateInEther() view returns (uint256)",
    "function decimals() external view returns (uint8)",
    "function symbol() external view returns (string)",
    "function getETFInfo(address etf) external view returns (address token, address collateral, uint8 collateralDecimals, address feed, uint256 initialPrice, uint256 feeInEther, uint256 totalCollateral, uint256 totalPendingFees, uint24 uniswapV3PoolFee)",
    "function getETFNAV(address etf) external view returns (uint256 etfNAV)",

    // Write
    "function mint(uint256 amount) external",
    "function burn(uint256 amount) external",
    "function invest(address etf, uint256 amount) external",
    "function redeem(address etf, uint256 amount) external",
    "function approve(address spender, uint256 amount) external",

    // Events
    "event InterestAccrued (uint256 previousTimestamp, uint256 currentTimestamp, uint256 previousTotalOutstandingDebt, uint256 previoustotalPendingFees, uint256 borrowRatePerSecondInEther, uint256 elapsedSeconds, uint256 interestAmount, uint256 totalOutstandingDebt, uint256 totalPendingFees)",
    "event SupplyAdded(address indexed account, uint256 amount, uint256 ExchangeRateInEther, uint256 mintedAmount)",
    "event SupplyRemoved(address indexed account, uint256 amount, uint256 ExchangeRateInEther, uint256 redeemedAmount)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event ETFMinted(address indexed investor, address indexed etf, uint256 amount)",
    "event ETFBurned(address indexed investor, address indexed etf, uint256 amount)",
]);

export default {
    address: VAULT,
    interface: INTERFACE,
    ethrise: ETHRISE,
};
