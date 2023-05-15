import React, { useMemo } from "react";
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

export type NameType = "images";
export const Name: NameType = "images";
export interface InputData extends FieldsType {
    label: string;
    images: ImageInputData[];
}
export const InitData: InputData = {
    images: [],
    label: "",
};
type ImagesPathType = `${NameType}.data.${number}.images`;

const ProjectElem: ElemType<InputData, NameType> = React.forwardRef(
    ({ index: i, props: { form }, ...props }, ref) => {
        const { register, control } = form;
        const { name } = useWatch({
            name: `${Name}.data.${i}`,
            control,
        });
        const ImagePath: ImagesPathType = `${Name}.data.${i}.images`;
        const ImageInputItem = useMemo(() => CreateImageItem(ImagePath), [i]);
        return (
            <Elem
                headLabel={() => (
                    <div className="font-bold group-hover:text-blue-60">
                        <p className="font-bold group-hover:text-blue-60">
                            {name || "(Not Specified)"}
                        </p>
                    </div>
                )}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        label="label"
                        {...register(`${Name}.data.${i}.name`)}
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
    }
);
export default ProjectElem;
