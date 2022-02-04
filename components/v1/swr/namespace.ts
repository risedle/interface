// Global cache namespace for SWR
// Note: We use global namespace in order to prevent caching key issue on different fetcher on SWR
export enum SWRCacheNamespace {
    GetBalance,
    GetAllowance,
    OracleGetPrice,
    VaultGetLeveragedTokenMetadata,
    VaultGetLeveragedTokenNAV,
    VaultGetCollateralPerLeveragedToken,
    VaultGetDebtPerLeveragedToken,
    VaultGetTotalAvailableCash,
    VaultGetExchangeRate,
}
