import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import React from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";

import {
    Name as TeamName,
    InputData as TeamInputData,
} from "@src/components/main/sections/Team";

import FElem from "../links";
import { ElemType } from "../InsertCommonData/EleGen";
export const Name = "links";
export type NameType = typeof Name;
export type NameRules = string;
export interface InputData extends FieldsType {
    index?: number;
    role: string;
}
function assertISValidData(data: unknown): InputData {
    return data as InputData;
}
export function CreateListItem(Name: NameRules) {
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
                    headLabel={() => (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {mateName || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">{role}</p>
                        </>
                    )}
                    {...props}
                    ref={ref}
                >
                    <div className="mb-2">
                        <Grid2Container>
                            <NormalInput
                                label="Index"
                                {...register(`${Name}.${i}.index`, {
                                    valueAsNumber: true,
                                })}
                            />
                            <NormalInput
                                options={[mateJobTitle]}
                                label="Role"
                                setValue={(val) =>
                                    setValue(`${Name}.${i}.role`, val)
                                }
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
    }>;
}

export default FElem;
