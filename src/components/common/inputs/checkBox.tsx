import classNames from "classnames";
import React from "react";
import style from "./checkbox.module.css";
export default function CheckBox({
    label,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
    return (
        <label className="flex items-center gap-1">
            <input
                {...props}
                type="checkbox"
                id={props.name}
                className={classNames(
                    style["input_checkbox"],
                    "appearance-none",
                    props.className
                )}
            />
            <div
                className={classNames(
                    "inline-block w-12 p-[2px] bg-neutral-30 hover:bg-neutral-50 rounded-xl  cursor-pointer transition",
                    "after:content-[''] after:w-5 after:h-5 after:rounded-[50%] after:block after:bg-white after:z-10 after:transition"
                )}
            ></div>
            {label && <span>{label}</span>}
        </label>
    );
}
