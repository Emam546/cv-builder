import classNames from "classnames";
import React, { Dispatch, InputHTMLAttributes, ReactNode } from "react";
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export interface SetInputProps<T> {
    setValue?: Dispatch<T>;
}
export interface GeneralInputProps<T extends string | number | any[]>
    extends InputHTMLAttributes<HTMLInputElement>,
        SetInputProps<T> {}
export const StyledInput = React.forwardRef<HTMLInputElement, InputProps>(
    (props, ref) => (
        <input
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
export interface Props
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    label?: string | React.ReactNode;
}

export const LabelElem = React.forwardRef<HTMLDivElement, Props>(
    ({ label, id, children, ...props }, ref) => {
        if (!label) return <>{children}</>;
        return (
            <div
                ref={ref}
                {...props}
            >
                <label
                    htmlFor={id}
                    className="py-2 block text-neutral-40 leading-6"
                >
                    {label}
                </label>
                {children}
            </div>
        );
    }
);

export function BottomLine({
    children,
    focus = false,
}: {
    children: ReactNode;
    focus?: boolean;
}) {
    return (
        <div
            className={classNames(
                'after:content-[""] after:absolute after:w-0 focus-within:after:w-full after:transition-all after:duration-75 after:h-[3px] after:bg-blue-60 after:z-10 after:bottom-0 after:left-1/2 after:-translate-x-1/2 relative',
                {
                    "after:w-full": focus,
                }
            )}
        >
            {children}
        </div>
    );
}
