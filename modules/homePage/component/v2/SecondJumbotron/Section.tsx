import React from "react";
import ButtonSecondary from "../../../../../uikit/buttonV2/ButtonSecondary";

function SecondJumbotronSection({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 text-center text-white md:grid-cols-2 md:text-left ">{children}</div>;
}

function SecondJumbotronTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="mt-10 text-3xl font-extrabold leading-relaxed md:text-5xl md:leading-[56px]">{children}</h2>;
}

function Section({ children }: { children?: React.ReactNode }) {
    return <div className="md:py-32">{children}</div>;
}

function SmallTitle({ children }: { children: React.ReactNode }) {
    return <p className="mt-4 text-base text-xs leading-relaxed text-gray-light-10">{children}</p>;
}

function JumbotronExplanation({ children }: { children: React.ReactNode }) {
    return <p className="mt-4 text-lg font-normal text-dark-neutral-soft">{children}</p>;
}

function JumbotronButton({ children }: { children: React.ReactNode }) {
    return <ButtonSecondary className="mx-auto mt-10 md:mx-0">{children} -&gt;</ButtonSecondary>;
}

SecondJumbotronSection.Title = SecondJumbotronTitle;
SecondJumbotronSection.Section = Section;
SecondJumbotronSection.SmallTitle = SmallTitle;
SecondJumbotronSection.Button = JumbotronButton;
SecondJumbotronSection.JumbotronExplanation = JumbotronExplanation;

export { SecondJumbotronSection };
