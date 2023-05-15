import React from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { Path, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import { forwardRef } from "@src/components/main/sections/InsertCommonData/input";
export type NameType = "links";
export const Name: NameType = "links";
export interface InputData extends FieldsType {
    label: string;
    link: string;
}
const FElem: ElemType<InputData, NameType> = React.forwardRef(
    (
        {
            index: i,
            props: {
                form: { register, control },
            },
            ...props
        },
        ref
    ) => {
        const { label, link } = useWatch({
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
                        <p className="text-sm text-neutral-50">{link}</p>
                    </>
                )}
                {...props}
                ref={ref}
            >
                <div className="mb-2">
                    <Grid2Container>
                        <NormalInput
                            label="Label"
                            {...register(`${Name}.data.${i}.label`)}
                        />
                        <NormalInput
                            label="link"
                            {...register(`${Name}.data.${i}.link`)}
                        />
                    </Grid2Container>
                </div>
            </Elem>
        );
    }
);
function assertISValidData(data: unknown): InputData {
    return data as InputData;
}
export function CreateListItem<NameType extends string>(Name: NameType) {
    function v(s: string) {
        return s as Path<ListData<InputData, NameType>>;
    }
    return forwardRef<InputData, NameType>(
        (
            {
                index: i,
                props: {
                    form: { register, control },
                },
                ...props
            },
            ref
        ) => {
            const data = assertISValidData(
                useWatch({
                    name: v(`${Name}.${i}`),
                    control,
                })
            );
            const { label, link } = data;
            return (
                <Elem
                    headLabel={() => (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {label || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">
                                {link || ""}
                            </p>
                        </>
                    )}
                    {...props}
                    ref={ref}
                >
                    <div className="mb-2">
                        <Grid2Container>
                            <NormalInput
                                label="Label"
                                {...register(v(`${Name}.${i}.label`))}
                            />
                            <NormalInput
                                label="link"
                                {...register(v(`${Name}.${i}.link`))}
                            />
                        </Grid2Container>
                    </div>
                </Elem>
            );
        }
    );
}

export default FElem;
