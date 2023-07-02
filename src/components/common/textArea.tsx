import React from "react";
import { BottomLine } from "./inputs/styles";
const TextArea = React.forwardRef<
    HTMLTextAreaElement,
    React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    >
>((props, ref) => {
    return (
        <BottomLine>
            <textarea
                ref={ref}
                {...props}
                className="w-full min-h-[10rem] m-0 resize-none bg-neutral-10 p-3 py-4 text-2xl focus:outline-none"
            />
        </BottomLine>
    );
});

export default TextArea;
