import React, { useMemo } from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import InfoGetter, { ListElemType } from "../InsertCommonData/input";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput, { OptionsInput } from "@src/components/common/inputs/normal";
import data from "./data.json";
import LevelInput, { LevelType } from "@src/components/common/inputs/level";
import { LabelElem, WrapElem } from "@src/components/common/inputs/styles";
import { uuid } from "@src/utils";
const programmingLangs = data.programming_technologies;
export type NameType = "skills";
export const Name: NameType = "skills";
export interface ElemInputData {
    id: string;
    label: string;
    level: LevelType;
}
export interface InputData {
    id: string;
    label: string;
    skills: ElemInputData[];
}
export const EleInitData: () => ElemInputData = () => ({
    id: uuid(),
    label: "",
    level: 0,
});
export const InitData: () => InputData = () => ({
    id: uuid(),
    label: "",
    skills: [],
});
const Levels: Record<LevelType, string> = {
    "0": "Novice",
    "1": "Beginner",
    "2": "SkillFul",
    "3": "Experienced",
    "4": "Expert",
};
export const ListElem = React.forwardRef(
    (
        {
            index: i,
            props: {
                form: { register, control, setValue },
                name: Name,
            },
            ...props
        },
        ref
    ) => {
        return (
            <Elem
                headLabel={function Skill() {
                    const { label, level } = useWatch({
                        name: `${Name}.${i}`,
                        control,
                    });
                    return (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {label || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">
                                {Levels[+level as LevelType]}
                            </p>
                        </>
                    );
                }}
                {...props}
                ref={ref}
            >
                <div className="mb-4">
                    <Grid2Container>
                        <OptionsInput
                            label="Skill"
                            control={control as any}
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
) as ListElemType<ElemInputData>;

type SkillsPath = `${NameType}.data.${number}.skills`;

export const FElem: ElemType<InputData> = React.forwardRef(
    ({ index: i, props: { form }, ...props }, ref) => {
        const { register, control, setValue } = form;

        const skillPath: SkillsPath = `${Name}.data.${i}.skills`;
        return (
            <Elem
                headLabel={function G() {
                    const { label } = useWatch({
                        name: `${Name}.data.${i}`,
                        control,
                    });
                    return (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {label || "(Not Specified)"}
                            </p>
                        </>
                    );
                }}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        label="Label"
                        {...register(`${Name}.data.${i}.label`)}
                    />
                </Grid2Container>
                <WrapElem
                    label={"Skills"}
                    className="my-4"
                >
                    <InfoGetter
                        formRegister={form as any}
                        name={skillPath}
                        Elem={ListElem}
                        initData={EleInitData}
                        addButtonLabel={"Add one more skill"}
                    />
                </WrapElem>
            </Elem>
        );
    }
);
export default FElem;
