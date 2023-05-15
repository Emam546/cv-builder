import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./style.module.css";
import { GeneralInputProps } from "../styles";
import { useSyncRefs } from "@src/utils/hooks";
interface Props extends GeneralInputProps<string> {
    defaultValue?: number;
}
const RangeInput = React.forwardRef<HTMLInputElement, Props>(
    ({ setValue, defaultValue = 20, ...props }, ref) => {
        const parentNode = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);
        const allRef = useSyncRefs(ref, inputRef);
        useEffect(() => {
            if (!parentNode.current) return;
            if (!inputRef.current) return;
            parentNode.current.style.setProperty(
                "--value",
                inputRef.current.value
            );
            parentNode.current.style.setProperty(
                "--text-value",
                JSON.stringify((+inputRef.current.value).toLocaleString())
            );
        }, [inputRef.current?.value]);
        return (
            <div
                className={classNames(
                    styles["range-slider"],
                    styles["grad"],
                    " w-full mt-5"
                )}
                ref={parentNode}
                style={
                    {
                        "--prefix": "'%'",
                        "--min": "0",
                        "--max": "100",
                        "--step": "1",
                        "--value": `${defaultValue}`,
                        "--text-value": `'${defaultValue}'`,
                    } as React.CSSProperties
                }
            >
                <input
                    {...props}
                    ref={allRef}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    defaultValue={defaultValue}
                    className="w-full"
                    onChange={(e) => {
                        if (props.onChange) props.onChange(e);
                        if (!parentNode.current) return;
                        parentNode.current.style.setProperty(
                            "--value",
                            e.currentTarget.value
                        );
                        parentNode.current.style.setProperty(
                            "--text-value",
                            JSON.stringify(
                                (+e.currentTarget.value).toLocaleString()
                            )
                        );
                    }}
                />
                <output></output>
                <div className={styles["range-slider__progress"]}></div>
            </div>
        );
    }
);
export default RangeInput;
