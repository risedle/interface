import type { NextPage } from "next";
import Head from "next/head";
import { chain } from "wagmi";

import MarketDetailPageMeta from "../../../components/v1/MarketDetailPage/MarketDetailPageMeta";
import { MapperNameToChainId, MapperTokenToTokenId, Metadata, MetadataToken } from "../../../components/v1/MarketMetadata";
import { DEFAULT_CHAIN, useWalletContext } from "../../../components/v1/Wallet";
import { chain as Chains } from "wagmi";

import EthrisePageContainer from "../../../modules/ethrisePage/EthrisePageContainer";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { TokenContainer } from "../../../modules/tokenPage/tokenContainer";

type PagesData = {
    chainId: number;
    tokenId: string;
};
type QueryPage = {
    token: string;
    chains: string;
};

function TokenPage() {
    const router = useRouter();
    const { token, chains } = router.query as QueryPage;
    const { chain } = useWalletContext();
    const [metadata, setMetadata] = React.useState<MetadataToken>();
    const address = useMemo(() => {
        return {
            chainId: MapperNameToChainId[chains],
            tokenId: MapperTokenToTokenId[token],
        };
    }, [token, chains]);

    useEffect(() => {
        if (address.chainId && address.tokenId) {
            const currentData = Metadata[address.chainId][address.tokenId];
            setMetadata(currentData);
        }
    }, [address]);

    if (!address.chainId || !address.tokenId) {
        return "Loading...";
    }

    return (
        <div className="flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
            <Head>
                <title>{metadata?.title} Market | Risedle Protocol</title>
                <meta name="description" content="Leverage ETH or earn yield from your idle USDC" />
                <MarketDetailPageMeta title={metadata?.title || ""} path={metadata?.path || ""} />
            </Head>
            <TokenContainer chainAddress={address.chainId} tokenAddress={address.tokenId} />;
        </div>
    );
}

export default TokenPage;
