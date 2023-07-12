import { Elem as _Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import { ListElemType } from "@src/components/main/sections/InsertCommonData/input";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { uuid } from "@src/utils";
import React from "react";
export type NameType = "links";
export const Name: NameType = "links";
export interface InputData {
    label: string;
    link: string;
    id: string;
}
export const InitData: () => InputData = () => ({
    id: uuid(),
    label: "",
    link: "",
});
export const ListItem = React.forwardRef(
    (
        {
            index: i,
            props: {
                form: { register, control },
                name: Name,
            },
            ...props
        },
        ref
    ) => {
        return (
            <_Elem
                headLabel={function G() {
                    const data = useWatch({
                        name: `${Name}.${i}`,
                        control,
                    });
                    const { label, link } = data;
                    return (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {label || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">
                                {link || ""}
                            </p>
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
                            label="Label"
                            {...register(`${Name}.${i}.label`)}
                        />
                        <NormalInput
                            control={control}
                            label="link"
                            {...register(`${Name}.${i}.link`)}
                        />
                    </Grid2Container>
                </div>
            </_Elem>
        );
    }
) as ListElemType<InputData>;

const MainElem = React.forwardRef(
    ({ index: i, props: { form, id, index, name }, ...props }, ref) => {
        return (
            <ListItem
                index={i}
                props={{ form: form as any, id, name: `${name}.data`, index }}
                {...props}
            />
        );
    }
) as ElemType<InputData>;
export default MainElem;
