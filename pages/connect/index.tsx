import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

// Import useDapp
import { useEthers } from "@usedapp/core";

// Import components
import Favicon from "../../components/Favicon";
import Navigation from "../../components/Navigation";
import ConnectWalletPrompt from "../../components/ConnectWalletPrompt";

const Connect: NextPage = () => {
    // Setup hooks
    const { account, activateBrowserWallet, deactivate, activate } = useEthers();
    const router = useRouter();

    const mainDisplay = (
        account: string | null | undefined
    ) => {
        console.log(account)
        if(!account){
            return(
                <div className="mt-16">
                    <ConnectWalletPrompt
                        activateBrowserWallet={activateBrowserWallet}
                        activate={activate}
                    />
                </div>
            )
        }

        if(account){
            router.push('/')
        }
    }

    return(
        <div>
            <Head>
                <title>Risedle Protocol</title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
            </Head>
            <Favicon />
            <Navigation
                activeMenu="invest"
                account={account}
                deactivate={deactivate}
            />

            {mainDisplay(account)}

        </div>
    )
}

export default Connect;