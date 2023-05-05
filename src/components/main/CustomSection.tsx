/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import InfoGetter, { ElemType } from "@src/components/common/InsertCommonData";
import { Elem } from "@src/components/common/InsertCommonData/Elem";
import {
    FieldsType,
    GeneratorData,
} from "@src/components/common/InsertCommonData/types";
import { Path, UseFormReturn, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import DatePicker from "@src/components/common/inputs/datePicker";
import FinalEditor from "@src/components/common/inputs/Editor";
import { LabelElem } from "../common/inputs/styles";
import Container from "../common/container";
export type NameType = "custom";
export const Name: NameType = "custom";
type SectionTypeName = `${NameType}.${number}`;
interface SectionInputData extends FieldsType {
    title: string;
    city: string;
    date: {
        start: string;
        end: string | "Present";
    };
    desc: string;
}
export interface InputData {
    custom: GeneratorData<SectionInputData, SectionTypeName>[];
}
function CreateElem<NameType extends SectionTypeName>(Name: NameType) {
    function v(n: unknown) {
        return n as Path<GeneratorData<SectionInputData, NameType>>;
    }
    const CustomElem: ElemType<SectionInputData, NameType> = React.forwardRef(
        (
            {
                index: i,
                values,
                form: { register, control, setValue },
                ...props
            },
            ref
        ) => {
            const { title, city, date } = useWatch({
                name: v(`${Name}.data.${i}`),
                control,
            }) as any;
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
                            {...register(v(`${Name}.data.${i}.title`))}
                        />
                        <NormalInput
                            label="City"
                            {...register(v(`${Name}.data.${i}.city`))}
                        />
                        <DatePicker
                            applyPresent
                            label="Start &End Time"
                            startData={{
                                ...register(v(`${Name}.data.${i}.date.start`)),
                                placeholder: "MM / YYYY",
                                setValue(val) {
                                    setValue(
                                        v(`${Name}.data.${i}.date.start`),
                                        val as any
                                    );
                                },
                            }}
                            endData={{
                                ...register(v(`${Name}.data.${i}.date.end`)),
                                placeholder: "MM / YYYY",
                                setValue(val) {
                                    setValue(
                                        v(`${Name}.data.${i}.date.end`),
                                        val as any
                                    );
                                },
                            }}
                            labelEnd="Currently Work here."
                        />
                    </Grid2Container>
                    <LabelElem
                        label={"Description"}
                        className="mt-5 pb-5"
                    >
                        <FinalEditor
                            setValue={(val) =>
                                setValue(
                                    v(`${Name}.data.${i}.desc`),
                                    val as any
                                )
                            }
                            {...register(v(`${Name}.data.${i}.desc`))}
                            placeholder="e.g. Created and implemented lesson plans based on child-led interests and curiosities"
                        />
                    </LabelElem>
                </Elem>
            );
        }
    );
    return CustomElem;
}
function CustomSection({
    sectionNum,
    form,
    order,
}: {
    order: number;
    sectionNum: number;
    form: UseFormReturn<InputData>;
}) {
    const [sections, setSections] = useState<JSX.Element[]>([]);
    useEffect(() => {
        console.log(sectionNum);
        if (sectionNum > sections.length) {
            setSections((pre) => {
                console.log(pre);
                for (let i = 0; i < sectionNum - pre.length; i++) {
                    const curI = pre.length;
                    const path: SectionTypeName = `${Name}.${curI}`;
                    pre.push(
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
                                Elem={CreateElem(path)}
                                name={path}
                                setDelete={() => {
                                    setSections((pre) => {
                                        return pre.filter((_, i) => i != curI);
                                    });
                                }}
                                key={curI}
                            />
                        </Container>
                    );
                    form.setValue(path, {
                        head: "Untitled",
                        data: [],
                    } as any);
                }
                return [...pre];
            });
        } else {
            setSections((pre) => {
                return pre.slice(0, sectionNum);
            });
        }
    }, [sectionNum]);
    return <>{sections.map((Ele) => Ele)}</>;
}
export default CustomSection;
