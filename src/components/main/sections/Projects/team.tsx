import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import React from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput, {
    OptionsInput,
} from "@src/components/common/inputs/normal";
import {
    Name as TeamName,
    InputData as TeamInputData,
} from "@src/components/main/sections/Team";
import FElem from "../links";
import { ElemType } from "../InsertCommonData/EleGen";
import { uuid } from "@src/utils";
export const Name = "links";
export type NameType = typeof Name;
export type NameRules = string;
export interface InputData extends FieldsType {
    index?: number;
    role: string;
    id: string;
}
export const InitData = (): InputData => ({
    role: "",
    index: 0,
    id: uuid(),
});
function assertISValidData(data: unknown): InputData {
    return data as InputData;
}
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
        const { index: mateI = -1, role } = assertISValidData(
            useWatch({
                name: `${Name}.${i}`,
                control,
            })
        );
        const AllTEamMates = useWatch({
            name: `${TeamName}.data`,
            control,
        });
        const mateName = AllTEamMates?.[mateI]?.name;
        const mateJobTitle = AllTEamMates?.[mateI]?.jobTitle;
        return (
            <Elem
                headLabel={function G() {
                    return (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {mateName || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">{role}</p>
                        </>
                    );
                }}
                {...props}
                ref={ref}
            >
                <div className="mb-2">
                    <Grid2Container>
                        <NormalInput
                            control={control}
                            label="Index"
                            {...register(`${Name}.${i}.index`, {
                                valueAsNumber: true,
                            })}
                        />
                        <OptionsInput
                            options={[mateJobTitle]}
                            label="Role"
                            control={control}
                            {...register(`${Name}.${i}.role`)}
                        />
                    </Grid2Container>
                </div>
            </Elem>
        );
    }
) as ElemType<{
    index: number;
    form: UseFormReturn<
        {
            [f: NameRules]: InputData[];
        } & {
            [TeamName]: {
                data: TeamInputData[];
            };
        }
    >;
    name: string;
}>;

export default FElem;
