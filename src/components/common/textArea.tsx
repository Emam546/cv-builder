import React from "react";
import { BottomLine } from "./inputs/styles";

export default function TextArea(
    props: React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    >
) {
    return (
        <BottomLine>
            <textarea
                {...props}
                className="w-full min-h-[10rem] m-0 resize-none bg-neutral-10 p-3 py-4 text-2xl focus:outline-none"
            />
        </BottomLine>
    );
}
