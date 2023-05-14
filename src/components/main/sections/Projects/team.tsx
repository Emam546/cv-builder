import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";

import { Path, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import {
    forwardRef,
} from "@src/components/main/sections/InsertCommonData/input";
import { Name as TeamName } from "@src/components/main/sections/Team";
import FElem from "../links";
export type NameType = "links";
export const Name: NameType = "links";
export interface InputData extends FieldsType {
    index?: number;
    role: string;
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
            const { index: mateI = -1, role } = assertISValidData(
                useWatch({
                    name: v(`${Name}.${i}`),
                    control,
                })
            );
            const AllTEamMates = useWatch({
                name: v(`${TeamName}.data`),
                control,
            }) as any;
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
                                {...register(v(`${Name}.${i}.index`), {
                                    valueAsNumber: true,
                                })}
                            />
                            <NormalInput
                                options={[mateJobTitle]}
                                label="Role"
                                setValue={(val) =>
                                    setValue(v(`${Name}.${i}.role`), val as any)
                                }
                                {...register(v(`${Name}.${i}.role`))}
                            />
                        </Grid2Container>
                    </div>
                </Elem>
            );
        }
    );
}

export default FElem;
