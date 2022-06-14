import ButtonPrimary from "../../../../../uikit/buttonV2/ButtonPrimary";

function ForthJumobtronBox({ children, className }: { className?: string; children?: React.ReactNode }) {
    return <div className={`relative mt-4 h-[236px] max-w-full overflow-hidden rounded-[36px] bg-dark-background-elevated pt-8 pl-8 text-left sm:h-[280px] xl:h-[300px]     ${className || ""}`}>{children}</div>;
}

function ForthJumobtronTitle({ children }: { children?: React.ReactNode }) {
    return <p className="heading-h5 text-dark-neutral-primary">{children}</p>;
}

function Image({ src, alt }: { src: string; alt: string }) {
    return (
        <>
            <img src={src} alt={alt} className="absolute left-[32px] bottom-[-80px] h-full w-full  rounded-lg rounded-br-[36px] sm:bottom-0 sm:h-[210px]  " />
            <div style={{ background: "linear-gradient(0deg, #0E1018 0%, rgba(14, 16, 24, 0) 100%);" }} className=" absolute bottom-0 left-0 h-full w-full rounded-[36px]"></div>
        </>
    );
}

function Button({ children, className }: { children?: React.ReactNode; className?: string }) {
    return <ButtonPrimary className={`absolute bottom-[24px] left-[24px] text-gray-100 ${className || ""}`}>{children}</ButtonPrimary>;
}

export { ForthJumobtronBox, ForthJumobtronTitle, Image, Button };
