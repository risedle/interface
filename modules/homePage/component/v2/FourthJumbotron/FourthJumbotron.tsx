import BackgroundBox from "../SecondJumbotron/BackgroundBox";
import { ForthJumobtronBox, ForthJumobtronTitle, Image, Button } from "./FourthJumbotronComponent";

export default function FourthJumbotron() {
    return (
        <div className="mx-auto max-w-[450px] px-4 text-center sm:max-w-[552px] sm:text-left md:max-w-[700px] lg:max-w-[936px] xl:max-w-[1128px]">
            <h1 className="mb-6 text-center text-[64px] font-extrabold leading-[72px] tracking-[-0.02em] text-dark-neutral-primary md:text-left lg:text-[148px]	lg:leading-[136px]">
                Dive Deeper <br /> Into Risedle
            </h1>
            <h3 className="paragraph-xl mb-8 text-dark-neutral-soft">
                Read our docs, join our Discord, or jump into our <br />
                Twitter account to get more learning resources!
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <ForthJumobtronBox className="col-span-1">
                    <ForthJumobtronTitle>Documentation</ForthJumobtronTitle>
                    <Image src="/assets/images/homepage/doc.png" alt="docs" />
                    <Button className="bg-dark-primary ">Read Docs</Button>
                </ForthJumobtronBox>
                <ForthJumobtronBox className="col-span-1 ">
                    <ForthJumobtronTitle>Discord Server</ForthJumobtronTitle>
                    <Image src="/assets/images/homepage/discord.png" alt="discord" />
                    <Button className="bg-[#5B64EA]">Join Discord</Button>
                </ForthJumobtronBox>
                <ForthJumobtronBox className="md:col-span-2 lg:col-span-1">
                    <ForthJumobtronTitle>Twitter</ForthJumobtronTitle>
                    <Image src="/assets/images/homepage/Twitter.png" alt="twitter" />
                    <Button className="bg-[#3292D8]">Follow @risedle</Button>
                </ForthJumobtronBox>
            </div>
        </div>
    );
}
