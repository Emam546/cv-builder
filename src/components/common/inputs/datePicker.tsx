import React from "react";
import { Dispatch, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { BottomLine, StyledInput, LabelElem, InputProps, WrapElem } from "./styles";
import { useSyncRefs } from "@src/utils/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { assertIsNode } from "@src/utils";
import CheckBox from "@src/components/common/inputs/checkBox";
import { Control, useController } from "react-hook-form";

const Months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jui",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
};
const regEx =
    /^(((Jan|Feb|Mar|Apr|May|Jun|Jui|Aug|Sep|Oct|Nov|Dec),\s)?((20|19)\d{2}$)|Present)?/gi;
type MonthsIndex = keyof typeof Months;
type StateType = [MonthsIndex | undefined, number];
function DatePic({
    sendDate,
    defaultData,
    innerRef,
    label = "",
    applyPresent,
}: {
    sendDate: Dispatch<StateType | "Present">;
    curDate?: boolean;
    defaultData: StateType | "Present";
    innerRef?: React.RefObject<HTMLDivElement> | null;
    label?: string;
    applyPresent?: boolean;
}) {
    const entries: [MonthsIndex, string][] = [
        ...Object.entries(Months),
    ] as unknown as [MonthsIndex, string][];
    const [date, setDate] = useState<StateType>(
        defaultData == "Present" ? [undefined, Date.now()] : defaultData
    );
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(false);
    }, [date]);
    return (
        <div
            ref={innerRef}
            className="p-2 font-semibold text-lg text-center capitalize  select-none min-w-max max-w-none"
        >
            <div className="flex w-full justify-between items-center px-2">
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                        setDate([date[0], date[1] - 1]);
                    }}
                    aria-label="left"
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                    />
                </button>
                <button
                    type="button"
                    className={classNames(
                        "cursor-pointer  py-2 px-4 flex items-center justify-center",
                        {
                            "rounded-xl bg-blue-50 text-white":
                                date[0] == undefined && !checked,
                        }
                    )}
                    onClick={() => {
                        setDate([undefined, date[1]]);
                        sendDate([undefined, date[1]]);
                    }}
                >
                    {date[1]}
                </button>
                <button
                    aria-label="right"
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                        setDate([date[0], date[1] + 1]);
                    }}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div className="grid grid-cols-4 py-4 gap-x-1 gap-y-2 items-stretch">
                {entries.map(([val, name], i) => {
                    return (
                        <div
                            key={i}
                            className={classNames(
                                "capitalize rounded-xl min-w-fit select-none text-center cursor-pointer py-1 px-4 transition",
                                {
                                    "bg-blue-50 text-white": date[0] == +val,
                                    invisible: checked && date[0] == +val,
                                }
                            )}
                            onClick={() => {
                                setDate([val, date[1]]);
                                sendDate([val, date[1]]);
                            }}
                        >
                            {name}
                        </div>
                    );
                })}
            </div>
            {applyPresent && (
                <div className="pb-2">
                    <CheckBox
                        label={label}
                        onChange={(e) => {
                            setChecked(e.currentTarget.checked);
                            if (e.currentTarget.checked) {
                                sendDate("Present");
                            }
                        }}
                        checked={checked}
                    />
                </div>
            )}
        </div>
    );
}
type CustomInputProps = InputProps & {
    defaultS?: string;
    label?: string;
    applyPresent?: boolean;
    control: Control<any>;
    name: string;
};
const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ defaultS, label, applyPresent, control, ...props }, ref) => {
        const inpRef = useRef<HTMLInputElement>(null);
        const AllRef = useSyncRefs(ref, inpRef);
        let State: StateType = [undefined, new Date().getFullYear()];
        if (defaultS) {
            const res = regEx.exec(defaultS);
        }
        const { field } = useController({ control, name: props.name });
        const [val, setVal] = useState<StateType | "Present">(State);
        const [focus, setFocus] = useState(false);
        function changeVal(val: StateType | "Present") {
            const input = inpRef.current;
            if (!input) return;
            if (val == "Present") {
                field.onChange("Present");
                return (input.value = "Present");
            }
            let str = "";
            if (val[0]) str = Months[val[0]] + ", " + val[1];
            else str = val[1].toString();
            input.value = str;
            field.onChange(str);
        }
        const Pic = useRef<HTMLDivElement>(null);
        useEffect(() => {
            function getTarget(ev: MouseEvent) {
                if (!inpRef.current) return;
                if (!Pic.current) return;
                assertIsNode(ev.target);
                const state =
                    Pic.current.contains(ev.target) ||
                    inpRef.current.contains(ev.target);
                if (!state) setFocus(false);
            }
            window.addEventListener("click", getTarget);
            return () => {
                window.removeEventListener("click", getTarget);
            };
        }, [inpRef]);
        return (
            <div className="relative">
                <BottomLine>
                    <StyledInput
                        {...props}
                        type="text"
                        autoComplete="off"
                        onFocusCapture={(ev) => {
                            if (props.onFocusCapture) props.onFocusCapture(ev);
                            setFocus(true);
                        }}
                        onBlurCapture={(ev) => {
                            if (props.onBlurCapture) props.onBlurCapture(ev);
                            const match = regEx.test(ev.target.value);
                            if (match || ev.target.value == "") return;
                            changeVal(val);
                        }}
                        ref={AllRef}
                    />
                </BottomLine>
                <div
                    className={classNames(
                        "absolute top-[calc(100%+5px)] left-0 bg-white z-10 min-w-fit max-w-none",
                        {
                            "invisible -z-50": !focus,
                        }
                    )}
                >
                    <DatePic
                        sendDate={(val) => {
                            changeVal(val);
                            setVal(val);
                            setFocus(false);
                        }}
                        defaultData={State}
                        innerRef={Pic}
                        label={label}
                        applyPresent={applyPresent}
                    />
                </div>
            </div>
        );
    }
);

type Props = {
    label: string;
    labelEnd?: string;
    applyPresent?: boolean;
    startData: Omit<CustomInputProps, "control">;
    endData: Omit<CustomInputProps, "control">;
    control: Control<any>;
};
export default function DatePicker({
    label,
    startData,
    endData,
    labelEnd = "",
    applyPresent,
    control,
}: Props) {
    return (
        <WrapElem label={label}>
            <div className="flex flex-wrap gap-x-3 gap-y-4">
                <div className="flex-1">
                    <CustomInput
                        {...startData}
                        control={control}
                    />
                </div>
                <div className="flex-1">
                    <CustomInput
                        {...endData}
                        label={labelEnd}
                        applyPresent={applyPresent}
                        control={control}
                    />
                </div>
            </div>
        </WrapElem>
    );
}
