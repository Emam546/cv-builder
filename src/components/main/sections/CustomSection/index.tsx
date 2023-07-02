import React, { useEffect } from "react";
import InfoGetter, {
    ElemType,
} from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { UseFormReturn, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import DatePicker from "@src/components/common/inputs/datePicker";
import FinalEditor from "@src/components/common/inputs/Editor";
import { LabelElem, WrapElem } from "@src/components/common/inputs/styles";
import Container from "@src/components/common/container";
import { useAppSelector } from "@src/store";
import { useDispatch } from "react-redux";
import { StateActions } from "@src/store/state";
import {
    NameType as CustomNameType,
    InputData,
    Name as CustomName,
    SectionInputData,
    InitData,
    SectionInitData as MainSectionInitData,
} from "./types";
import { uuid } from "@src/utils";

type SectionTypeName = `${CustomNameType}.${number}`;

const ListElem = React.forwardRef(
    (
        {
            index: i,
            props: {
                form: { register, control, getValues },
                name: Name,
            },
            ...props
        },
        ref
    ) => {
        return (
            <Elem
                headLabel={function G() {
                    const { title, city, date }: any = useWatch({
                        name: `${Name}.data.${i}`,
                        control,
                    });
                    return (
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
                    );
                }}
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
                        control={control}
                        labelEnd="Currently Work here."
                    />
                </Grid2Container>
                <WrapElem
                    label={"Description"}
                    className="mt-5 pb-5"
                >
                    <FinalEditor
                        control={control}
                        {...register(`${Name}.data.${i}.desc`)}
                        placeholder="e.g. Created and implemented lesson plans based on child-led interests and curiosities"
                    />
                </WrapElem>
            </Elem>
        );
    }
) as ElemType<SectionInputData>;

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
    return (
        <Container
            hiddenState={false}
            order={order}
        >
            <InfoGetter
                addButtonLabel="Add one more item"
                initData={InitData}
                formRegister={form as any}
                Elem={ListElem}
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
                MainSectionInitData(),
            ]);
        }
    }, [sectionNum]);

    return (
        <>
            {orders.map(({ order }, i) => {
                return (
                    <CreateEle
                        key={uuid()}
                        order={order}
                        i={i}
                        form={form}
                    />
                );
            })}
        </>
    );
}
