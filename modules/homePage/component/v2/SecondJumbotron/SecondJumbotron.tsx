import { SecondJumbotronSection } from "./Section";

function SecondJumbotron() {
    return (
        <div className="w-full px-16 md:px-24">
            <SecondJumbotronSection>
                <SecondJumbotronSection.Section>
                    <SecondJumbotronSection.SmallTitle>TRADER</SecondJumbotronSection.SmallTitle>
                    <SecondJumbotronSection.Title>Boost Any Token And Earn More</SecondJumbotronSection.Title>
                    <SecondJumbotronSection.JumbotronExplanation>Boost various strategy in Risedle based on the market condition. It’s fully on your hand.</SecondJumbotronSection.JumbotronExplanation>
                    <SecondJumbotronSection.Button>Try Boost </SecondJumbotronSection.Button>
                </SecondJumbotronSection.Section>
                <SecondJumbotronSection.Section></SecondJumbotronSection.Section>
            </SecondJumbotronSection>
            <SecondJumbotronSection>
                <SecondJumbotronSection.Section>
                    <SecondJumbotronSection.SmallTitle>Liquidity Provider</SecondJumbotronSection.SmallTitle>
                    <SecondJumbotronSection.Title>Earn by Providing Liquidity</SecondJumbotronSection.Title>
                    <SecondJumbotronSection.JumbotronExplanation>Earn high APY on Risedle Fuels by supplying liquidity to our pools</SecondJumbotronSection.JumbotronExplanation>
                    <SecondJumbotronSection.Button>Try Fuel </SecondJumbotronSection.Button>
                </SecondJumbotronSection.Section>
                <SecondJumbotronSection.Section></SecondJumbotronSection.Section>
            </SecondJumbotronSection>
            <SecondJumbotronSection>
                <SecondJumbotronSection.Section>
                    <SecondJumbotronSection.SmallTitle>Crypto Project</SecondJumbotronSection.SmallTitle>
                    <SecondJumbotronSection.Title>Leverage Liquidity Using Boost Pro</SecondJumbotronSection.Title>
                    <SecondJumbotronSection.JumbotronExplanation>Risedle Boost Pro enable levaraging any liquidity pool in Rari Fuse pool. No creating smart contracts just configure and good to go!</SecondJumbotronSection.JumbotronExplanation>
                    <SecondJumbotronSection.Button>Try Boost Pro</SecondJumbotronSection.Button>
                </SecondJumbotronSection.Section>
                <SecondJumbotronSection.Section></SecondJumbotronSection.Section>
            </SecondJumbotronSection>
        </div>
    );
}

export { SecondJumbotron };
