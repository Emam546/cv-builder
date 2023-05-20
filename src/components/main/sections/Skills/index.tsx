import React, { useMemo } from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import InfoGetter, { ListElemType } from "../InsertCommonData/input";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import data from "./data.json";
import LevelInput, { LevelType } from "@src/components/common/inputs/level";
import { LabelElem } from "@src/components/common/inputs/styles";
const programmingLangs = data.programming_technologies;
export type NameType = "skills";
export const Name: NameType = "skills";
export interface ElemInputData extends FieldsType {
    label: string;
    level: LevelType;
}
export interface InputData extends FieldsType {
    label: string;
    skills: ElemInputData[];
}
export const InitData: InputData = {
    label: "",
    skills: [],
};
const Levels: Record<LevelType, string> = {
    "0": "Novice",
    "1": "Beginner",
    "2": "SkillFul",
    "3": "Experienced",
    "4": "Expert",
};
type NameRules = string;
export function CreateElem(Name: NameRules) {
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
            const { label, level } = useWatch({
                name: `${Name}.${i}`,
                control,
            });

            return (
                <Elem
                    headLabel={() => (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {label || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">
                                {Levels[+level as LevelType]}
                            </p>
                        </>
                    )}
                    {...props}
                    ref={ref}
                >
                    <div className="mb-4">
                        <Grid2Container>
                            <NormalInput
                                label="Skill"
                                setValue={(val) =>
                                    setValue(`${Name}.${i}.label`, val)
                                }
                                options={programmingLangs}
                                {...register(`${Name}.${i}.label`)}
                            />

                            <LevelInput
                                label="link"
                                Levels={Levels}
                                setValue={(val) =>
                                    setValue(`${Name}.${i}.level`, val)
                                }
                                {...register(`${Name}.${i}.level`, {
                                    valueAsNumber: true,
                                })}
                            />
                        </Grid2Container>
                    </div>
                </Elem>
            );
        }
    ) as ListElemType<ElemInputData, NameRules>;
}
type SkillsPath = `${NameType}.data.${number}.skills`;

export const FElem: ElemType<ElemInputData, NameType> = React.forwardRef(
    ({ index: i, props: { form }, ...props }, ref) => {
        const { register, control, setValue } = form;
        const { label } = useWatch({
            name: `${Name}.data.${i}`,
            control,
        });
        const skillPath: SkillsPath = `${Name}.data.${i}.skills`;
        const SkillElem = useMemo(() => CreateElem(skillPath), [i]);
        return (
            <Elem
                headLabel={() => (
                    <>
                        <p className="font-bold group-hover:text-blue-60">
                            {label || "(Not Specified)"}
                        </p>
                    </>
                )}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        label="Label"
                        setValue={(val) =>
                            setValue(`skills.data.${i}.label`, val)
                        }
                        {...register(`${Name}.data.${i}.label`)}
                    />
                </Grid2Container>
                <LabelElem
                    label={"Skills"}
                    className="my-4"
                >
                    <InfoGetter
                        name={skillPath}
                        Elem={SkillElem as any}
                        formRegister={form as any}
                        initData={{
                            label: "",
                            level: 0,
                        }}
                        addButtonLabel={"Add one more skill"}
                    />
                </LabelElem>
            </Elem>
        );
    }
);
export default FElem;
