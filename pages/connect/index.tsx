import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Import useDapp
import { useEthers } from "@usedapp/core";

// Import WalletConnect connector
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// Import components
import Favicon from "../../components/Favicon";
import Navigation from "../../components/Navigation";
import ConnectWalletPrompt from "../../components/ConnectWalletPrompt";

const Connect: NextPage = () => {
    // Setup hooks
    const { account, activateBrowserWallet, deactivate, activate } = useEthers();
    const router = useRouter();

    // Get the Kovan URL from .env file
    let kovanURL = "";
    if (process.env.NEXT_PUBLIC_KOVAN_URL) {
        kovanURL = process.env.NEXT_PUBLIC_KOVAN_URL;
    }

    // Setup Wallet Connect Configuration
    const walletconnect = new WalletConnectConnector({
        rpc: {
            42: kovanURL
        },
        bridge: "https://bridge.walletconnect.org",
        qrcode: true, 
        supportedChainIds: [42],
        chainId: 42,
    })

    // Activate WalletConnect
    const connectWalletConnect = async() => {
        await activate(walletconnect, undefined, true).catch((error) => {
            console.log(error)
        });
    }

    // Automatically connect to WalletConnect on page refresh (if already authenticated)
    useEffect(() => {
        if(localStorage.getItem('walletconnect')){
            setTimeout(() => {
                connectWalletConnect()
            }, 1); 
        }
    }, [])
    
    const mainDisplay = (
        account: string | null | undefined
    ) => {
        console.log(account)
        if(!account){
            return(
                <div className="mt-16">
                    <ConnectWalletPrompt
                        activateBrowserWallet={activateBrowserWallet}
                        activateWalletConnect={connectWalletConnect}
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
                account={account}
                deactivate={async() => deactivate()}
            />

            {mainDisplay(account)}

        </div>
    )
}

export default Connect;