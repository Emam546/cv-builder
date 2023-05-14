/* eslint-disable react/display-name */
import React from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
export type NameType = "skills";
export const Name: NameType = "skills";
import data from "./data.json";
import LevelInput, { LevelType } from "@src/components/common/inputs/level";
const programmingLangs = data.programming_technologies;
export interface InputData extends FieldsType {
    label: string;
    level: LevelType;
}
const Levels: Record<LevelType, string> = {
    "0": "Novice",
    "1": "Beginner",
    "2": "SkillFul",
    "3": "Experienced",
    "4": "Expert",
};
const FElem: ElemType<InputData, NameType> = React.forwardRef(
    (
        { index: i, props: { form: { register, control, setValue }}, ...props },
        ref
    ) => {
        const { label, level } = useWatch({
            name: `${Name}.data.${i}`,
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
                                setValue(`skills.data.${i}.label`, val)
                            }
                            options={programmingLangs}
                            {...register(`${Name}.data.${i}.label`)}
                        />

                        <LevelInput
                            label="link"
                            Levels={Levels}
                            setValue={(val) =>
                                setValue(`skills.data.${i}.level`, val)
                            }
                            defaultValue={
                                control._defaultValues.skills?.data?.[i]?.level
                            }
                            {...register(`${Name}.data.${i}.level`, {
                                valueAsNumber: true,
                            })}
                        />
                    </Grid2Container>
                </div>
            </Elem>
        );
    }
);
export default FElem;
