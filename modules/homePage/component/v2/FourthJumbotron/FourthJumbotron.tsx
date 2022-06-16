import BackgroundBox from "../SecondJumbotron/BackgroundBox";
import { FourthJumbotronBox, FourthJumbotronTitle, Image, Button } from "./FourthJumbotronComponent";

export default function FourthJumbotron() {
    return (
        <div className="mx-auto max-w-[450px] px-4 text-center sm:max-w-[552px] sm:text-left md:max-w-[700px] lg:max-w-[936px] xl:max-w-[1128px]">
            <h1 className="mb-6 text-center text-[64px] font-extrabold leading-[72px] tracking-[-0.02em] text-dark-neutral-primary md:text-left lg:text-[148px]	lg:leading-[136px]">
                Dive Deeper <br /> Into Risedle
            </h1>
            <h3 className="paragraph-xl mb-20 text-dark-neutral-soft">
                Read our docs, join our Discord, or jump into our <br />
                Twitter account to get more learning resources!
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <FourthJumbotronBox className="col-span-1">
                    <FourthJumbotronTitle>Documentation</FourthJumbotronTitle>
                    <Image className="min-w-[642px]" src="/assets/images/homepage/doc.png" alt="docs" />
                    <Button className="bg-dark-primary ">Read Docs</Button>
                </FourthJumbotronBox>
                <FourthJumbotronBox className="col-span-1 ">
                    <FourthJumbotronTitle>Discord Server</FourthJumbotronTitle>
                    <Image className="min-w-[641px]" src="/assets/images/homepage/discord.png" alt="discord" />
                    <Button className="bg-[#5B64EA]">Join Discord</Button>
                </FourthJumbotronBox>
                <FourthJumbotronBox className="sm:col-span-2 lg:col-span-1">
                    <FourthJumbotronTitle>Twitter</FourthJumbotronTitle>
                    <Image className="min-w-[591px]" src="/assets/images/homepage/Twitter.png" alt="twitter" />
                    <Button className="bg-[#3292D8]">Follow @risedle</Button>
                </FourthJumbotronBox>
            </div>
        </div>
    );
}
