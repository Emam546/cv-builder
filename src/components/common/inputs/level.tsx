import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import { useSyncRefs } from "@src/utils/hooks";
import style from "./level.module.css";
import {
    GeneralInputProps,
    LabelElem,
} from "@src/components/common/inputs/styles";
export interface OptionType {
    label: string;
}
export type LevelType = 0 | 1 | 2 | 3 | 4;
export interface Props extends GeneralInputProps<LevelType> {
    label: string;
    Levels: Record<LevelType, string>;
    defaultValue?: LevelType;
}

const newArr: LevelType[] = Array(5)
    .fill(0)
    .map((_, index) => index as LevelType);
const LevelInput = React.forwardRef<HTMLInputElement, Props>(
    ({ label, Levels, defaultValue, setValue, ...props }, ref) => {
        const [id, setId] = useState("");
        useEffect(() => {
            setId(uuid());
        }, []);
        const containerDiv = useRef<HTMLDivElement>(null);
        const [val, setVal] = useState<LevelType>(defaultValue || 0);
        const inputRef = useRef<HTMLInputElement>(null);
        const allRef = useSyncRefs(ref, inputRef);
        useEffect(() => {
            if (!inputRef.current) return;
            const curVal = inputRef.current.value;
            const newI = newArr.find((pre) => pre == +curVal);
            if (typeof newI != "undefined") setVal(newI);
            else setVal(0);
        }, [inputRef.current?.value]);
        return (
            <LabelElem
                id={id}
                label={
                    <>
                        Level-
                        <span
                            className={classNames(
                                style.label,
                                "transition duration-300"
                            )}
                            data-cur={val}
                        >
                            {Levels[val]}
                        </span>
                    </>
                }
                ref={containerDiv}
            >
                <div className="relative">
                    <div
                        className={classNames(
                            style["level-container"],
                            "flex justify-stretch items-stretch h-[3rem] max-w-xs relative overflow-hidden rounded-lg",
                            "after:content-[''] after:h-full  after:w-1/5 after:absolute after:rounded-lg",
                            "after:transition-all after:duration-300"
                        )}
                        data-cur={val}
                    >
                        {newArr.map((i) => {
                            return (
                                <div
                                    key={i}
                                    className={classNames(
                                        style.level,
                                        "w-full cursor-pointer transition duration-300",
                                        "[&:not(:last-child)]:relative [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:content-[''] [&:not(:last-child)]:after:bg-neutral-20 [&:not(:last-child)]:after:right-0 [&:not(:last-child)]:after:top-1/2 [&:not(:last-child)]:after:-translate-y-1/2 [&:not(:last-child)]:after:w-[1px] [&:not(:last-child)]:after:h-1/2 "
                                    )}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setVal(i);
                                        if (setValue) setValue(i);
                                    }}
                                    aria-selected={i == val}
                                    data-cur={val}
                                />
                            );
                        })}
                    </div>
                    <input
                        {...props}
                        type="hidden"
                        ref={allRef}
                        autoComplete="off"
                        id={id}
                    />
                </div>
            </LabelElem>
        );
    }
);
export default LevelInput;
