/* eslint-disable react/display-name */
import React, { InputHTMLAttributes } from "react";
import Header, { Props } from "./inputs/header";

const HeadSection = React.forwardRef<
    HTMLInputElement,
    Props & { desc?: string }
>(({ desc, ...props }, ref) => {
    return (
        <div>
            <Header
                {...props}
                ref={ref}
            />
            {desc && <p className="text-neutral-50 mb-3">{desc}</p>}
        </div>
    );
});
export default HeadSection;
