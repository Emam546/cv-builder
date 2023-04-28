/* eslint-disable react/display-name */
import classNames from "classnames";
import React, { ReactNode } from "react";
type InputProps = 
    React.InputHTMLAttributes<HTMLInputElement>

export const StyledInput = React.forwardRef<HTMLInputElement, InputProps>(
    (props, ref) => (
        <input
            type="text"
            autoComplete="off"
            ref={ref}
            {...props}
            className={classNames(
                "focus:outline-none bg-neutral-10 px-4 py-3 block w-full",
                props.className
            )}
        />
    )
);
export function BottomLine({ children }: { children: ReactNode }) {
    return (
        <div className='after:content-[""] after:absolute after:w-0 focus-within:after:w-full after:transition-all after:duration-75 after:h-[2px] after:bg-blue-60 after:bottom-0 after:left-1/2 after:-translate-x-1/2 relative'>
            {children}
        </div>
    );
}
