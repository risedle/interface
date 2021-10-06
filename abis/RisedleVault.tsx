import { utils } from "ethers";

const ADDRESS = "0xECDC27a6214E3BC4715af5cB5706E03259e7A1f8";
const INTERFACE = new utils.Interface([
    // Read only
    "function getSupplyRatePerSecondInEther() view returns (uint256)",
    "function totalOutstandingDebt() view returns (uint256)",
    "function getTotalAvailableCash() view returns (uint256)",
    "function getExchangeRateInEther() view returns (uint256)",
    "function decimals() external view returns (uint8)",
    "function symbol() external view returns (string)",

    // Write
    "function mint(uint256 amount) external",
    "function burn(uint256 amount) external",
    "function approve(address spender, uint256 amount) external",

    // Events
    "event InterestAccrued (uint256 previousTimestamp, uint256 currentTimestamp, uint256 previousTotalOutstandingDebt, uint256 previoustotalPendingFees, uint256 borrowRatePerSecondInEther, uint256 elapsedSeconds, uint256 interestAmount, uint256 totalOutstandingDebt, uint256 totalPendingFees)",
    "event SupplyAdded(address indexed account, uint256 amount, uint256 ExchangeRateInEther, uint256 mintedAmount)",
    "event SupplyRemoved(address indexed account, uint256 amount, uint256 ExchangeRateInEther, uint256 redeemedAmount)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
]);

export default {
    address: ADDRESS,
    interface: INTERFACE,
};
