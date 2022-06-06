import BackgroundBox from "../SecondJumbotron/BackgroundBox";
import { ForthJumobtronBox, ForthJumobtronTitle, Image, Button } from "./FourthJumbotronComponent";

export default function FourthJumbotron() {
    return (
        <div className="mx-auto max-w-7xl pt-28">
            <h1 className="text-[148px] font-extrabold tracking-tight text-dark-neutral-primary	">
                Dive Deeper <br /> Into Risedle
            </h1>
            <h3 className="paragraph-xl text-dark-neutral-soft">
                Read our docs, join our Discord, or jump into our <br />
                Twitter account to get more learning resources!
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <ForthJumobtronBox className="col-span-1">
                    <ForthJumobtronTitle>Documentation</ForthJumobtronTitle>
                    <Image src="/assets/images/homepage/section-4-1.svg" />
                    <Button>Read Docs</Button>
                </ForthJumobtronBox>
                <ForthJumobtronBox className="col-span-1 ">
                    <ForthJumobtronTitle>Documentation</ForthJumobtronTitle>
                    <Image src="/assets/images/homepage/section-4-3.svg" />
                    <Button>Join Discord</Button>
                </ForthJumobtronBox>
                <ForthJumobtronBox className="md:col-span-2 lg:col-span-1 	">
                    <ForthJumobtronTitle>Documentation</ForthJumobtronTitle>
                    <Image src="/assets/images/homepage/section-4-2.svg" />
                    <Button>Follow @risedle</Button>
                </ForthJumobtronBox>
            </div>
        </div>
    );
}
