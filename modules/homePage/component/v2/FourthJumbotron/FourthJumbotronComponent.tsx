import Button, { ButtonVariant } from "../../../../../uikit/buttonV2/Button";
import ButtonPrimary from "../../../../../uikit/buttonV2/ButtonPrimary";

function FourthJumbotronBox({ children, className }: { className?: string; children?: React.ReactNode }) {
    return <div className={`relative h-[234px] max-w-full overflow-hidden rounded-3xl bg-dark-background-elevated pt-9 pl-8 text-left sm:h-[314px] ${className || ""}`}>{children}</div>;
}

function FourthJumbotronTitle({ children }: { children?: React.ReactNode }) {
    return <p className="heading-h5 text-dark-neutral-primary">{children}</p>;
}

function Image({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return (
        <>
            <img src={src} alt={alt} className={`mt-[38px] rounded-lg ${className || ""}`} />
            <div style={{ background: "linear-gradient(0deg, #0E1018 0%, rgba(14, 16, 24, 0) 100%)" }} className="absolute bottom-0 left-0 h-full w-full rounded-3xl"></div>
        </>
    );
}

function ButtonJumbotron({ children, className, variant = "primary" }: { variant?: ButtonVariant; children?: React.ReactNode; className?: string }) {
    return (
        <Button variant={variant} className={`absolute bottom-[24px] left-[24px] text-gray-100 ${className || ""}`}>
            {children}
        </Button>
    );
}

export { FourthJumbotronBox, FourthJumbotronTitle, Image, ButtonJumbotron };
