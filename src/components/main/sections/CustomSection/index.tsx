import React, { useEffect, useMemo, useState } from "react";
import InfoGetter, {
    ElemType,
} from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { UseFormReturn, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import DatePicker from "@src/components/common/inputs/datePicker";
import FinalEditor from "@src/components/common/inputs/Editor";
import { LabelElem } from "@src/components/common/inputs/styles";
import Container from "@src/components/common/container";
import { useAppSelector } from "@src/store";
import { useDispatch } from "react-redux";
import { StateActions } from "@src/store/state";
import {
    NameType as CustomNameType,
    InputData,
    Name as CustomName,
    SectionInputData,
} from "./types";
import lodash from "lodash";

type SectionTypeName = `${CustomNameType}.${number}`;
type NameRules = string;
function CreateElem(Name: NameRules) {
    return React.forwardRef(
        (
            {
                index: i,
                props: {
                    form: { register, control, setValue },
                },
                ...props
            },
            ref
        ) => {
            const { title, city, date } = useWatch({
                name: `${Name}.data.${i}`,
                control,
            });
            return (
                <Elem
                    headLabel={() => (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {`${
                                    (title == "" &&
                                        city == "" &&
                                        "(Not specified)") ||
                                    ""
                                } ${title} ${
                                    (title != "" && city != "" && ",") || ""
                                } ${city}`}
                            </p>
                            <p className="text-sm text-neutral-50">{`${
                                date.start
                            } ${
                                (date.start != "" && date.end != "" && "-") ||
                                ""
                            } ${date.end}`}</p>
                        </>
                    )}
                    {...props}
                    ref={ref}
                >
                    <Grid2Container>
                        <NormalInput
                            label="Activity name ,Job title,book title etc"
                            {...register(`${Name}.data.${i}.title`)}
                        />
                        <NormalInput
                            label="City"
                            {...register(`${Name}.data.${i}.city`)}
                        />
                        <DatePicker
                            applyPresent
                            label="Start &End Time"
                            startData={{
                                ...register(`${Name}.data.${i}.date.start`),
                                placeholder: "MM / YYYY",
                            }}
                            endData={{
                                ...register(`${Name}.data.${i}.date.end`),
                                placeholder: "MM / YYYY",
                            }}
                            control={control as any}
                            labelEnd="Currently Work here."
                        />
                    </Grid2Container>
                    <LabelElem
                        label={"Description"}
                        className="mt-5 pb-5"
                    >
                        <FinalEditor
                            control={control as any}
                            defaultValue={
                                lodash.get(
                                    control._defaultValues,
                                    `${Name}.data.${i}.desc`
                                ) as any
                            }
                            name={`${Name}.data.${i}.desc`}
                            placeholder="e.g. Created and implemented lesson plans based on child-led interests and curiosities"
                        />
                    </LabelElem>
                </Elem>
            );
        }
    ) as ElemType<SectionInputData, NameRules>;
}

function CreateEle({
    order,
    i,
    form,
}: {
    order: number;
    i: number;
    form: UseFormReturn<InputData>;
}) {
    const path: SectionTypeName = `${CustomName}.${i}`;
    const dispatch = useDispatch();
    const Elem = useMemo(() => CreateElem(path), [i]);
    return (
        <Container
            hiddenState={false}
            order={order}
        >
            <InfoGetter
                addButtonLabel="Add one more item"
                initData={{
                    city: "",
                    date: {
                        start: "",
                        end: "",
                    },
                    desc: "",
                    title: "",
                }}
                formRegister={form as any}
                Elem={Elem}
                name={path}
                setDelete={() => {
                    dispatch(
                        StateActions.setSectionState({
                            type: "DELETE",
                            index: i,
                        })
                    );
                    form.setValue(
                        CustomName,
                        form.getValues(CustomName).filter((_, ei) => ei != i)
                    );
                }}
            />
        </Container>
    );
}
export default function CustomSection({
    form,
}: {
    form: UseFormReturn<InputData>;
    defaultData?: { order: number }[] | undefined;
}) {
    const dispatch = useDispatch();
    const sectionNum = useAppSelector((state) => state.form.custom.length);
    const orders = useAppSelector((state) => state.state.data.custom);
    useEffect(() => {
        if (sectionNum > orders.length) {
            dispatch(StateActions.setSectionState({ type: "ADD" }));
            form.setValue(CustomName, [
                ...form.getValues(CustomName),
                {
                    head: "Untitled",
                    data: [],
                },
            ]);
        }
    }, [sectionNum]);

    return (
        <>
            {orders.map(({ order }, i) => {
                return (
                    <CreateEle
                        order={order}
                        i={i}
                        key={i}
                        form={form}
                    />
                );
            })}
        </>
    );
}
