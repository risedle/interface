import { ethers } from "ethers";

export const OracleABI = new ethers.utils.Interface(["function getPrice() external view returns (uint256 price)"]);

export default OracleABI;
