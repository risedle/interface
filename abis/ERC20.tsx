import { utils } from "ethers";

const INTERFACE = new utils.Interface([
    // Read only
    "function decimals() external view returns (uint8)",
    "function symbol() external view returns (string)",

    // Write
    "function approve(address spender, uint256 amount) external",

    // Events
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
]);

export default {
    interface: INTERFACE,
};
