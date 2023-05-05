/* eslint-disable react/display-name */
import React from "react";
import { ElemType } from "@src/components/common/InsertCommonData";
import { Elem } from "@src/components/common/InsertCommonData/Elem";
import { FieldsType } from "@src/components/common/InsertCommonData/types";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import DatePicker from "@src/components/common/inputs/datePicker";
import FinalEditor from "@src/components/common/inputs/Editor";
import { LabelElem } from "../common/inputs/styles";
export type NameType = "employ";
export const Name: NameType = "employ";
export interface InputData extends FieldsType {
    jobTitle: string;
    employer: string;
    date: {
        start: string;
        end: string | "Present";
    };
    city: string;
    desc: string;
}
const EmployElem: ElemType<InputData, NameType> = React.forwardRef(
    (
        { index: i, values, form: { register, control, setValue }, ...props },
        ref
    ) => {
        const { jobTitle, employer, date } = useWatch({
            name: `${Name}.data.${i}`,
            control,
        });
        return (
            <Elem
                headLabel={() => (
                    <>
                        <p className="font-bold group-hover:text-blue-60">
                            {`${
                                (jobTitle == "" &&
                                    employer == "" &&
                                    "(Not specified)") ||
                                ""
                            } ${jobTitle} ${
                                (jobTitle != "" && employer != "" && "at") || ""
                            } ${employer}`}
                        </p>
                        <p className="text-sm text-neutral-50">{`${
                            date.start
                        } ${
                            (date.start != "" && date.end != "" && "-") || ""
                        } ${date.end}`}</p>
                    </>
                )}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        label="Job Title"
                        {...register(`${Name}.data.${i}.jobTitle`)}
                    />
                    <NormalInput
                        label="Employer"
                        {...register(`${Name}.data.${i}.employer`)}
                    />
                    <DatePicker
                        applyPresent
                        label="Start &End Time"
                        startData={{
                            ...register(`${Name}.data.${i}.date.start`),
                            placeholder: "MM / YYYY",
                            setValue(val) {
                                setValue(`${Name}.data.${i}.date.start`, val);
                            },
                        }}
                        endData={{
                            ...register(`${Name}.data.${i}.date.end`),
                            placeholder: "MM / YYYY",
                            setValue(val) {
                                setValue(`${Name}.data.${i}.date.end`, val);
                            },
                        }}
                        labelEnd="Currently Work here."
                    />
                    <NormalInput
                        label="City"
                        {...register(`${Name}.data.${i}.city`)}
                    />
                </Grid2Container>
                <LabelElem
                    label={"Description"}
                    className="mt-5 pb-5"
                >
                    <FinalEditor
                        setValue={(val) =>
                            setValue(`${Name}.data.${i}.desc`, val)
                        }
                        {...register(`${Name}.data.${i}.desc`)}
                        placeholder="e.g. Created and implemented lesson plans based on child-led interests and curiosities"
                    />
                </LabelElem>
            </Elem>
        );
    }
);
export default EmployElem;
