import React, { useMemo } from "react";
import { ListElemType } from "@src/components/main/sections/InsertCommonData/input";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import {
    CreateListItem as CreateImageItem,
    InputData as ImageInputData,
} from "../Projects/images";
import InfoGetter from "@src/components/main/sections/InsertCommonData/input";

export const Name = "images";
export type NameType = typeof Name;
export interface InputData {
    label: string;
    images: ImageInputData[];
}
export const InitData: InputData = {
    images: [],
    label: "",
};
export type NameRules = string;
export function CreateElem(Name: NameRules) {
    type ImagesPathType = `${NameRules}.${number}.images`;

    return React.forwardRef(({ index: i, props: { form }, ...props }, ref) => {
        const { register, control } = form;
        const { label } = useWatch({
            name: `${Name}.${i}`,
            control,
        });
        const ImagePath: ImagesPathType = `${Name}.${i}.images`;
        const ImageInputItem = useMemo(() => CreateImageItem(ImagePath), [i]);
        return (
            <Elem
                headLabel={() => (
                    <div className="font-bold group-hover:text-blue-60">
                        <p className="font-bold group-hover:text-blue-60">
                            {label || "(Not Specified)"}
                        </p>
                    </div>
                )}
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
                        Elem={ImageInputItem}
                        initData={{
                            heightRation: 1,
                            widthRation: 1,
                            image: "",
                        }}
                        name={ImagePath}
                        label={"Images"}
                    />
                </div>
            </Elem>
        );
    }) as ListElemType<InputData>;
}
export default CreateElem(`${Name}.data`) as unknown as ElemType<InputData>;
