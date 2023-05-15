import React from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import DatePicker from "@src/components/common/inputs/datePicker";
import FinalEditor from "@src/components/common/inputs/Editor";
import { LabelElem } from "@src/components/common/inputs/styles";
import MultiSelectInput from "@src/components/common/inputs/multiSelect";
import data from "@src/components/main/sections/Skills/data.json";
import lodash from "lodash";
const Technologies = data.programming_technologies.map((value) => ({
    value,
    label: value,
}));
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
    teamSize: number;
    technologies: string[];
}
const iniData: InputData = {
    jobTitle: "",
    employer: "",
    date: {
        start: "",
        end: "",
    },
    city: "",
    desc: "",
    teamSize: 0,
    technologies: [],
};
function ConvValToOptions(vals?: string[]) {
    if (!vals) return [];
    return vals.reduce((acc, str) => {
        const res = Technologies.find((val) => {
            return val.value == str;
        });
        if (!res) return acc;
        return [...acc, res];
    }, [] as { value: string; label: string }[]) as any;
}
const EmployElem: ElemType<InputData, NameType> = React.forwardRef(
    (
        {
            index: i,
            props: {
                form: { register, control, setValue, getValues },
            },
            ...props
        },
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
                    <NormalInput
                        label="Team Size"
                        {...register(`${Name}.data.${i}.teamSize`, {
                            valueAsNumber: true,
                        })}
                    />
                </Grid2Container>
                <LabelElem
                    className="my-4"
                    label={"Teleologies Used"}
                >
                    <MultiSelectInput
                        setValue={(val) =>
                            setValue(`${Name}.data.${i}.technologies`, val)
                        }
                        options={Technologies}
                        defaultValues={ConvValToOptions(
                            lodash.get(
                                control._defaultValues.projects,
                                `${Name}.data.${i}.technologies`
                            )
                        )}
                        {...register(`${Name}.data.${i}.technologies`)}
                        value={ConvValToOptions(
                            getValues(
                                `${Name}.data.${i}.technologies`
                            ) as string[]
                        )}
                    />
                </LabelElem>
                <LabelElem
                    label={"Description"}
                    className="my-4"
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
