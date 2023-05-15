import React from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import DatePicker from "@src/components/common/inputs/datePicker";
import FinalEditor from "@src/components/common/inputs/Editor";
import { LabelElem } from "@src/components/common/inputs/styles";
export type NameType = "internships";
export const Name: NameType = "internships";
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
        {
            index: i,
            props: {
                form: { register, control, setValue },
            },
            ...props
        },
        ref
    ) => {
        const { jobTitle, employer } = useWatch({
            name: `${Name}.data.${i}`,
            control,
        });
        return (
            <Elem
                headLabel={() => (
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
                    className="mt-5"
                >
                    <FinalEditor
                        control={control}
                        defaultValue={
                            control._defaultValues[Name]?.data?.[i]?.desc
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
