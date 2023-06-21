import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import { forwardRef } from "@src/components/main/sections/InsertCommonData/input";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
export type NameType = "links";
export const Name: NameType = "links";
export interface InputData extends FieldsType {
    label: string;
    link: string;
}
export const InitData: InputData = {
    label: "",
    link: "",
};
type NameRules = string;
export function CreateListItem(Name: NameRules) {
    return forwardRef<InputData>(
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
            const data = useWatch({
                name: `${Name}.${i}`,
                control,
            });
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
                                {...register(`${Name}.${i}.label`)}
                            />
                            <NormalInput
                                label="link"
                                {...register(`${Name}.${i}.link`)}
                            />
                        </Grid2Container>
                    </div>
                </Elem>
            );
        }
    );
}

export default CreateListItem(`${Name}.data`) as unknown as ElemType<InputData>;
