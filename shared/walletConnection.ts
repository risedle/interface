import { useEffect, useState } from "react";

export const useLocalWallet = () => {
    const [wallet, setWallet] = useState<string | null>(null);

    const storeWallet = (walletAddres: string) => {
        setWallet(walletAddres);

        window.localStorage.setItem("account", walletAddres);
    };
    const removeWallet = () => {
        setWallet(null);
        window.localStorage.removeItem("account");
    };

    useEffect(() => {
        const storedWallet = window.localStorage.getItem("account");
        if (storedWallet) {
            setWallet(storedWallet);
        }
    }, []);

    return { wallet, storeWallet, removeWallet };
};
