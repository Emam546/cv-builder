import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";

import { Path, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import { forwardRef } from "@src/components/main/sections/InsertCommonData/input";
import FElem from "../links";
import FinalEditor from "@src/components/common/inputs/Editor";
import { LabelElem } from "@src/components/common/inputs/styles";
export type NameType = "links";
export const Name: NameType = "links";
export type NameRules = string;
export interface InputData extends FieldsType {
    title: string;
    desc: string;
}

export function CreateListItem(Name: NameRules) {
    return forwardRef<InputData, NameRules>(
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
            const { title, desc } = useWatch({
                name: `${Name}.${i}`,
                control,
            });

            return (
                <Elem
                    headLabel={() => (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {title || "(Not Specified)"}
                            </p>
                        </>
                    )}
                    {...props}
                    ref={ref}
                >
                    <div className="mb-2">
                        <Grid2Container>
                            <NormalInput
                                label="Title"
                                {...register(`${Name}.${i}.title`)}
                            />
                            <LabelElem label="Desc">
                                <FinalEditor
                                    control={control as any}
                                    name={`${Name}.${i}.desc`}
                                />
                            </LabelElem>
                        </Grid2Container>
                    </div>
                </Elem>
            );
        }
    );
}

export default FElem;
