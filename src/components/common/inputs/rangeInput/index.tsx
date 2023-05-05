/* eslint-disable react/display-name */
import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./style.module.css";
import { GeneralInputProps } from "../styles";
interface Props extends GeneralInputProps<string> {}
const RangeInput = React.forwardRef<HTMLInputElement, Props>(
    ({ setValue, ...props }, ref) => {
        const parentNode = useRef<HTMLDivElement>(null);
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
                        "--min": 0,
                        "--max": 100,
                        "--step": 1,
                        "--value": 20,
                        "--text-value": "'20'",
                    } as React.CSSProperties
                }
            >
                <input
                    {...props}
                    ref={ref}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    defaultValue="20"
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
