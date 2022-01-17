import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Import components
import Navigation from "../../components/Navigation";
import ConnectWalletPrompt from "../../components/ConnectWalletPrompt";
import Favicon from "../../components/Favicon";

// Import wagmi
import { useConnect, useAccount, useNetwork, chain } from "wagmi";

// Import wallet connectors
import { injected_connector, getWCConnector } from '../../config/WalletConnectorsConfig';
import { changeToKovan, changeToArbitrum } from "../../utils/changeNetwork";

const Connect: NextPage = () => {

    // setup hooks
    const router = useRouter();
    const [ network, setNetwork ] = useState("");
    const [ connectData, connect ] = useConnect();
    const [ accountData, disconnect ] = useAccount();
    const [ networkData, switchNetwork] = useNetwork();

    // Redirect user to '/' if they have connected to the supported network
    useEffect(() => {
        if(!networkData.data.chain?.unsupported && connectData.data.connected){
            router.push('/')
        }
    }, [networkData, connectData])
 
    // Function to connect with metamask wallet (injected)
    const connectMetamask = async() => {
        if(network === ""){
            throw 'Please choose a network to connect!'
        }

        await connect(injected_connector);

        // change the network in metamask to the selected network (kovan or arbitrum)
        if(network === "kovan"){
            changeToKovan();
        }  
        
        if(network === "arbitrum"){
            changeToArbitrum();
        }
    }

    // Function to connect with WalletConnect wallet
    const connectWalletConnect = async() => {
        if(network === ""){
            throw 'Please choose a network to connect!'
        }

        if(network === "kovan"){
            const connector = getWCConnector(chain.kovan.id)
            const result = await connect(connector)

            /*
                wallet connect does not support programmatic network switching, so it will
                throw error message instead of switching the network when the network is 
                not supported
            */
            if(result?.data?.chain?.unsupported){
                disconnect()
                throw 'Network is not supported, please change the network in your wallet!'
            }
        }

        if(network === "arbitrum"){
            const connector = getWCConnector(chain.arbitrumOne.id)
            const result = await connect(connector)
            
            /*
                wallet connect does not support programmatic network switching, so it will
                throw error message instead of switching the network when the network is 
                not supported
            */
            if(result?.data?.chain?.unsupported){
                disconnect()
                throw 'Network is not supported, please change the network in your wallet!'
            }
        }
    }

    return(
        <div>
            <Head>
                <title>Risedle</title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
                
            </Head>
            <Favicon />
            <Navigation/>
            <div className="mt-8">
                <ConnectWalletPrompt
                    connectMetamask={connectMetamask}
                    connectWalletConnect={connectWalletConnect}
                    setKovan={() => setNetwork("kovan")}
                    setArbitrum={() => setNetwork("arbitrum")}
                    network={network}
                />
            </div>
        </div>
    )
}

export default Connect;