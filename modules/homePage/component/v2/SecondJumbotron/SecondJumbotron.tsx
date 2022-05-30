import Image from "next/image";
import { FirstSectionImage } from "./FirstSectionImage";
import { SecondSectionImage } from "./SecondSectionImage";
import { SecondJumbotronSection } from "./Section";
import { ThirdSectionImage } from "./ThirdSectionImage";

function SecondJumbotron() {
    return (
        <div className="mx-auto max-w-7xl ">
            <SecondJumbotronSection>
                <SecondJumbotronSection.Section>
                    <SecondJumbotronSection.SmallTitle>TRADER</SecondJumbotronSection.SmallTitle>
                    <SecondJumbotronSection.Title>Boost Any Token And Earn More</SecondJumbotronSection.Title>
                    <SecondJumbotronSection.JumbotronExplanation>Boost various strategy in Risedle based on the market condition. It’s fully on your hand.</SecondJumbotronSection.JumbotronExplanation>
                    <SecondJumbotronSection.Button>Try Boost </SecondJumbotronSection.Button>
                </SecondJumbotronSection.Section>
                <SecondJumbotronSection.Section>
                    <FirstSectionImage />
                </SecondJumbotronSection.Section>
            </SecondJumbotronSection>
            <SecondJumbotronSection>
                <SecondJumbotronSection.Section>
                    <SecondJumbotronSection.SmallTitle>Liquidity Provider</SecondJumbotronSection.SmallTitle>
                    <SecondJumbotronSection.Title>Earn by Providing Liquidity</SecondJumbotronSection.Title>
                    <SecondJumbotronSection.JumbotronExplanation>Earn high APY on Risedle Fuels by supplying liquidity to our pools</SecondJumbotronSection.JumbotronExplanation>
                    <SecondJumbotronSection.Button>Try Fuel </SecondJumbotronSection.Button>
                </SecondJumbotronSection.Section>
                <SecondJumbotronSection.Section>
                    <SecondSectionImage />
                </SecondJumbotronSection.Section>
            </SecondJumbotronSection>
            <SecondJumbotronSection>
                <SecondJumbotronSection.Section>
                    <SecondJumbotronSection.SmallTitle>Crypto Project</SecondJumbotronSection.SmallTitle>
                    <SecondJumbotronSection.Title>Leverage Liquidity Using Boost Pro</SecondJumbotronSection.Title>
                    <SecondJumbotronSection.JumbotronExplanation>Risedle Boost Pro enable levaraging any liquidity pool in Rari Fuse pool. No creating smart contracts just configure and good to go!</SecondJumbotronSection.JumbotronExplanation>
                    <SecondJumbotronSection.Button>Try Boost Pro</SecondJumbotronSection.Button>
                </SecondJumbotronSection.Section>
                <SecondJumbotronSection.Section>
                    <ThirdSectionImage />
                </SecondJumbotronSection.Section>
            </SecondJumbotronSection>
        </div>
    );
}

export { SecondJumbotron };
