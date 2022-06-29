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
import Navigation from "../../../components/v1/Navigation";
import { useTokenStore } from "../../../modules/tokenPage/tokenStore";

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
    const { state, setToken } = useTokenStore();
    useEffect(() => {
        if (token && chains) {
            setToken(MapperNameToChainId[chains], MapperTokenToTokenId[token]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, chains]);

    return (
        <div className="flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
            {state.status === "loaded" && (
                <Head>
                    <title>{state.token.title} Market | Risedle Protocol</title>
                    <meta name="description" content="Leverage ETH or earn yield from your idle USDC" />
                    <MarketDetailPageMeta title={state.token.title || ""} path={state.token.path || ""} />
                </Head>
            )}
            <Navigation marketsActive />
            <TokenContainer />;
        </div>
    );
}

export default TokenPage;
