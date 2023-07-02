import React, { useMemo } from "react";
import { ListElemType } from "@src/components/main/sections/InsertCommonData/input";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import {
    ListItem as ImageListItem,
    InputData as ImageInputData,
    InitData as ImageInitData,
    OnDelete as ImageOnDelete,
} from "../Projects/images";
import InfoGetter from "@src/components/main/sections/InsertCommonData/input";
import { uuid } from "@src/utils";

export const Name = "images";
export type NameType = typeof Name;
export interface InputData {
    label: string;
    images: ImageInputData[];
    id: string;
}
export const InitData: () => InputData = () => ({
    id: uuid(),
    images: [],
    label: "",
});
export type NameRules = string;
export const onDelete = async (val: InputData) => {
    await Promise.all(val.images.map(ImageOnDelete));
};
type ImagesPathType = `${NameRules}.${number}.images`;
export const ListElem = React.forwardRef(
    ({ index: i, props: { form, name: Name }, ...props }, ref) => {
        const { register, control } = form;
        const ImagePath: ImagesPathType = `${Name}.${i}.images`;
        return (
            <Elem
                headLabel={function G() {
                    const { label } = useWatch({
                        name: `${Name}.${i}`,
                        control,
                    });
                    return (
                        <div className="font-bold group-hover:text-blue-60">
                            <p className="font-bold group-hover:text-blue-60">
                                {label || "(Not Specified)"}
                            </p>
                        </div>
                    );
                }}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        label="label"
                        {...register(`${Name}.${i}.label`)}
                    />
                </Grid2Container>
                <div className="flex flex-col items-stretch gap-4 my-4">
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more image"
                        Elem={ImageListItem}
                        initData={ImageInitData}
                        name={ImagePath}
                        onDeleteElem={ImageOnDelete}
                        label={"Images"}
                    />
                </div>
            </Elem>
        );
    }
) as ListElemType<InputData>;
export default React.forwardRef(({ index: i, props, ...restprops }, ref) => {
    const ImagePath = `${Name}.data`;
    return (
        <ListElem
            {...{
                index: i,
                props: { ...(props as any), name: ImagePath },
                ...restprops,
                ref,
            }}
        />
    );
}) as ElemType<InputData>;
