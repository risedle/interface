import React from "react";
import ButtonSecondary from "../../../../../uikit/buttonV2/ButtonSecondary";

function SecondJumbotronSection({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 text-center text-white md:grid-cols-2 md:text-left ">{children}</div>;
}

function SecondJumbotronTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="heading-h3 md:heading-h2 mt-4 md:mt-10">{children}</h2>;
}

function Section({ children, className }: { children?: React.ReactNode; className?: string }) {
    return <div className={`flex flex-col items-center justify-center py-4 md:items-baseline md:py-24 ${className || ""}`}>{children}</div>;
}

function SmallTitle({ children }: { children: React.ReactNode }) {
    return <p className="mt-4 text-xs leading-relaxed text-gray-light-10">{children}</p>;
}

function JumbotronExplanation({ children }: { children: React.ReactNode }) {
    return <p className="paragraph-l mt-6 text-dark-neutral-soft">{children}</p>;
}

function JumbotronButton({ children }: { children: React.ReactNode }) {
    return <ButtonSecondary className="mx-auto mt-10 md:mx-0">{children} &rarr;</ButtonSecondary>;
}

SecondJumbotronSection.Title = SecondJumbotronTitle;
SecondJumbotronSection.Section = Section;
SecondJumbotronSection.SmallTitle = SmallTitle;
SecondJumbotronSection.Button = JumbotronButton;
SecondJumbotronSection.JumbotronExplanation = JumbotronExplanation;

export { SecondJumbotronSection };
