import React, { ReactNode } from "react";
interface Props {
    label: string;
    children: ReactNode;
}
export default function Section({ label, children }: Props) {
    return (
        <>
            <h3 className="mx-12 text-neutral-30 font-medium text-sm my-2">{label}</h3>
            <section className="bg-white p-10">{children}</section>
        </>
    );
}
