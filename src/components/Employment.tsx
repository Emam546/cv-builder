/* eslint-disable react/display-name */
import React, { SyntheticEvent, useEffect, useState } from "react";
import Header from "@src/components/common/inputs/header";
import { UseFormRegister, UseFormReturn, useWatch } from "react-hook-form";
import NormalInput from "@src/components/common/inputs/normal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAdd,
    faChevronDown,
    faChevronUp,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import DraggableComp from "./common/drag";
import classNames from "classnames";
import { useForceUpdate, useSmoothExpand, useSyncRefs } from "@src/utils/hooks";
import Grid2Container from "./common/2GridInputHolder";
import DatePicker from "./common/inputs/datePicker";
import MyEditor from "@src/components/common/inputs/Editor";
interface JopData {
    jopTitle: string;
    employer: string;
    date: {
        start?: Date;
        end?: Date | "Present";
    };
    city: string;
    desc: string;
}
export interface InputData {
    employmentHead: string;
    employments: JopData[];
}
const Elem = React.forwardRef<
    HTMLLIElement,
    {
        deleteSelf: Function;
        register: UseFormRegister<JopData>;
        onDragOver?: (ele: HTMLLIElement) => any;
        onDrag?: (this: HTMLLIElement, ev: MouseEvent) => any;
        onDragStart?: (ele: HTMLLIElement) => any;
    } & Pick<JopData, "jopTitle" | "employer">
>(
    (
        {
            jopTitle,
            employer,
            deleteSelf,
            register,
            onDragOver,
            onDrag,
            onDragStart,
        },
        ref
    ) => {
        const [expand, setExpand] = useState(false);
        const [drag, setDrag] = useState(false);
        const forceUpdate = useForceUpdate();
        const parentDiv = useSmoothExpand<HTMLLIElement>(null, expand);
        const allRefs = useSyncRefs(parentDiv, ref);
        useEffect(() => {
            if (parentDiv.current) forceUpdate();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return (
            <li
                ref={allRefs}
                className={classNames(
                    "px-3 border rounded-lg border-solid border-neutral-20 py-1 transition-[height]",
                    {
                        "fixed z-50 bg-neutral-5": drag,
                        relative: !drag,
                    }
                )}
            >
                <div className="group cursor-pointer flex items-center justify-between h-16">
                    <DraggableComp
                        onDragStart={() => {
                            setDrag(true);
                            if (onDragStart && parentDiv.current)
                                onDragStart(parentDiv.current);
                        }}
                        onDragOver={() => {
                            setDrag(false);
                            if (onDragOver && parentDiv.current)
                                onDragOver(parentDiv.current);
                        }}
                        onDrag={function (ev) {
                            if (onDrag && parentDiv.current)
                                onDrag.call(parentDiv.current, ev);
                        }}
                        parentDiv={parentDiv.current}
                    />
                    <div
                        className="flex-grow min-w-max self-stretch flex items-center"
                        onClick={() => setExpand(!expand)}
                    >
                        <span className="block font-bold text-sm group-hover:text-blue-60">
                            {jopTitle == "" &&
                                employer == "" &&
                                "(Not specified)"}
                            {jopTitle}{" "}
                            {jopTitle != "" && employer != "" && "at"}{" "}
                            {employer}
                        </span>
                    </div>
                    <div className="space-x-3">
                        <button
                            type="button"
                            className="group-hover:text-blue-60"
                            onClick={() => deleteSelf()}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <button
                            type="button"
                            className="group-hover:text-blue-60"
                            onClick={() => setExpand(!expand)}
                        >
                            <FontAwesomeIcon
                                icon={expand ? faChevronUp : faChevronDown}
                            />
                        </button>
                    </div>
                </div>

                <div
                    className={classNames("transition-all", {
                        "h-auto": expand && !drag,
                        "h-0 overflow-hidden": !expand || drag,
                    })}
                >
                    <Grid2Container>
                        <NormalInput
                            label="Job Title"
                            type="text"
                            {...register("jopTitle")}
                        />
                        <NormalInput
                            label="Employer"
                            {...register("employer")}
                        />
                        <DatePicker
                            label="Start & End time"
                            startData={{
                                ...register("date.start"),
                                placeholder: "MM / YYYY",
                            }}
                            endData={{
                                ...register("date.end"),
                                placeholder: "MM / YYYY",
                            }}
                            labelEnd="Currently work here"
                            applyPresent
                        />
                        <NormalInput
                            label="City"
                            {...register("city")}
                        />
                    </Grid2Container>
                    <div className="mt-5">
                        <MyEditor
                            {...register("desc")}
                            placeholder="e.g. Created and implemented lesson plans based on child-led interests and curiosities"
                        />
                    </div>
                </div>
            </li>
        );
    }
);

export default function EmploymentInfo({
    register,
    resetField,
    control,
    setValue,
    getValues,
}: UseFormReturn<InputData>) {
    const [EmploymentsData, setEmploymentData] = useState<JopData[]>(
        (control._defaultValues.employments as JopData[]) || ([] as JopData[])
    );
    const value = useWatch({ control, name: "employments" });
    const [dragger, setDragging] = useState<[boolean, number | null]>([
        false,
        null,
    ]);
    const [allEle, setAllEle] = useState<HTMLElement[]>([]);
    const [ypos, setYpos] = useState(0);
    useEffect(() => {
        const [state, index] = dragger;
        if (index == null) return;
        const ele = allEle[index];

        if (!ele) return;
        if (!state) {
            const indexes = allEle
                .map<[number, number]>((ele, i) => {
                    if (i == index) return [ypos, i];
                    const rect = ele.getBoundingClientRect();
                    return [rect.top + rect.height / 2 + window.scrollY, i];
                })
                .sort((a, b) => a[0] - b[0])
                .map(([_, i]) => i);
            console.log(
                allEle.map<[number, number]>((ele, i) => {
                    if (i == index) return [ypos, i];
                    return [ele.getBoundingClientRect().top, i];
                })
            );
            const data = indexes.map((i) => getValues(`employments.${i}`));
            setValue("employments", data);
            setEmploymentData((pre) => indexes.map((i) => pre[i]));
        }
    }, [dragger]);

    return (
        <section className="my-4">
            <Header
                reset={() => resetField("employmentHead")}
                {...register("employmentHead", {
                    onBlur(e: SyntheticEvent<HTMLInputElement>) {
                        if (!e.currentTarget.value) {
                            resetField("employmentHead");
                        }
                    },
                })}
                defaultValue={control._defaultValues.employmentHead}
                placeholder="Untitled"
            />
            <ul className="space-y-4 transition-all duration-700">
                {EmploymentsData.map((data, i) => {
                    const newRegister: UseFormRegister<JopData> = ((
                        ...[name]: Parameters<UseFormRegister<JopData>>
                    ) => {
                        return register(`employments.${i}.${name}`);
                    }) as any;
                    return (
                        <Elem
                            jopTitle={value[i].jopTitle}
                            employer={value[i].employer}
                            key={i}
                            deleteSelf={() => {
                                setEmploymentData(
                                    EmploymentsData.filter((_, ix) => ix != i)
                                );
                            }}
                            register={newRegister}
                            onDragStart={(ele) => setDragging([true, i])}
                            onDragOver={(ele) => setDragging([false, i])}
                            onDrag={function (ev) {
                                if (i != dragger[1]) return;
                                const rect = this.getBoundingClientRect();
                                setYpos(
                                    rect.top + rect.height / 2 + window.scrollY
                                );
                            }}
                            ref={(ele) => {
                                if (!ele) return;
                                setAllEle((pre) => [...pre, ele]);
                            }}
                        />
                    );
                })}
            </ul>
            <button
                className="text-blue-60 font-bold hover:bg-blue-10 transition-all block w-full mt-5 py-3 text-start px-4 space-x-2"
                onClick={() => {
                    const data = {
                        jopTitle: "",
                        employer: "",
                        city: "",
                        date: {},
                        desc: "",
                    };
                    setEmploymentData((pre) => [...pre, data]);
                    setValue(`employments.${EmploymentsData.length}`, data);
                }}
            >
                <FontAwesomeIcon icon={faAdd} />
                <span>Add Employment</span>
            </button>
        </section>
    );
}
