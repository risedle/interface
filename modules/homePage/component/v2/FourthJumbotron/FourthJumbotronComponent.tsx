import ButtonPrimary from "../../../../../uikit/buttonV2/ButtonPrimary";

function ForthJumobtronBox({ children, className }: { className?: string; children?: React.ReactNode }) {
    return <div className={`relative mt-20 h-[314px] max-w-full overflow-hidden rounded-[36px] bg-dark-background-elevated pt-8 pl-8  ${className || ""}`}>{children}</div>;
}

function ForthJumobtronTitle({ children }: { children?: React.ReactNode }) {
    return <p className="text-dark-neutral-primary">{children}</p>;
}

function Image({ src }: { src: string }) {
    return (
        <>
            <img src={src} className="absolute left-[32px] bottom-0 rounded-br-[36px]" />
            <div style={{ background: "linear-gradient(0deg, #0E1018 0%, rgba(14, 16, 24, 0) 100%);" }} className=" absolute bottom-0 left-0 h-full w-full rounded-[36px]"></div>
        </>
    );
}

function Button({ children }: { children?: React.ReactNode }) {
    return <ButtonPrimary className="absolute bottom-[24px] left-[24px]">{children}</ButtonPrimary>;
}

export { ForthJumobtronBox, ForthJumobtronTitle, Image, Button };
