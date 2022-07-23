import { useEffect, useState } from "react";
import { Banner, BannerContentContainer, BannerContent, BannerItem, CloseBannerButton } from "./Banner";

function BannerBSC() {
    const [isOpen, setIsOpen] = useState<boolean>();

    useEffect(() => {
        if (window && window.localStorage.getItem("bannerBsc") === "false") {
            return setIsOpen(false);
        }
        return setIsOpen(true);
    }, []);

    if (isOpen) {
        return (
            <>
                <Banner chainId={56}>
                    <a href="https://bsc.risedle.com" rel="noreferrer" target="_blank">
                        <BannerContentContainer>
                            <BannerContent>
                                <BannerItem variant="base">Risedle New Network</BannerItem>
                                <BannerItem variant="base" isIcon />
                            </BannerContent>
                            <BannerContent>
                                <BannerItem chainId={56} variant="chain">
                                    Binance Smart Chain
                                </BannerItem>
                                <BannerItem chainId={56} variant="chain" isIcon />
                            </BannerContent>
                        </BannerContentContainer>
                    </a>
                </Banner>
                <CloseBannerButton
                    onClick={() => {
                        if (window) {
                            window.localStorage.setItem("bannerBsc", "false");
                            setIsOpen(false);
                        }
                    }}
                />
            </>
        );
    }

    return null;
}

export { BannerBSC };
