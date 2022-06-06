import Image from "next/image";
import BackgroundBox from "./BackgroundBox";
import { SecondJumbotronSection } from "./Section";

function SecondJumbotron() {
    return (
        <div className="mx-auto max-w-7xl pt-32 ">
            <SecondJumbotronSection>
                <SecondJumbotronSection.Section>
                    <SecondJumbotronSection.SmallTitle>TRADER</SecondJumbotronSection.SmallTitle>
                    <SecondJumbotronSection.Title>Boost Any Token And Earn More</SecondJumbotronSection.Title>
                    <SecondJumbotronSection.JumbotronExplanation>Boost various strategy in Risedle based on the market condition. It’s fully on your hand.</SecondJumbotronSection.JumbotronExplanation>
                    <SecondJumbotronSection.Button>Try Boost </SecondJumbotronSection.Button>
                </SecondJumbotronSection.Section>
                <SecondJumbotronSection.Section>
                    <BackgroundBox>
                        <img className="absolute left-0 mt-14 max-w-[1000px] md:relative" src="/assets/images/homepage/section-1.svg" />
                    </BackgroundBox>
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
                    <BackgroundBox>
                        <img className="absolute left-0 mt-14 max-w-[1000px]" src="/assets/images/homepage/Section-2.svg" />
                    </BackgroundBox>
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
                    <BackgroundBox>
                        <img className="mt-0 ml-0 max-w-[600px] sm:mt-14 sm:-ml-[86px] sm:max-w-[1000px]  md:max-w-[600px]" src="/assets/images/homepage/Section-3.svg" />
                    </BackgroundBox>
                </SecondJumbotronSection.Section>
            </SecondJumbotronSection>
        </div>
    );
}

export { SecondJumbotron };
