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
export interface InputData extends FieldsType {
    title: string;
    desc: string;
}
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
                    form: { register, control, setValue },
                    
                },
                ...props
            },
            ref
        ) => {
            const { title, desc } = assertISValidData(
                useWatch({
                    name: v(`${Name}.${i}`),
                    control,
                })
            );
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
                                {...register(v(`${Name}.${i}.title`))}
                            />
                            <LabelElem label="Desc">
                                <FinalEditor
                                    control={control}
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
