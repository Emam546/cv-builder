import React, { useMemo } from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import FinalEditor from "@src/components/common/inputs/Editor";
import UploadButton, { DeleteFile } from "@src/components/common/uploadAvatar";
import {
    ListItem as LinkListItem,
    InputData as LinkInputData,
    InitData as LinkInitData,
} from "../links";
import InfoGetter from "@src/components/main/sections/InsertCommonData/input";
import { LabelElem, WrapElem } from "@src/components/common/inputs/styles";
import {
    InputData as ImageInputData,
    ListItem as ImageListItem,
    InitData as ImageInitData,
} from "../Projects/images";
import lodash from "lodash";
import RatingInput from "./rating";
import { uuid } from "@src/utils";
import { getPath } from "../InsertCommonData/utils";
export type NameType = "testimonials";
export const Name: NameType = "testimonials";
export interface InputData {
    id: string;
    name: string;
    role: string;
    company: string;
    testimonialJob: string;
    email: string;
    avatar: string;
    projectImages: ImageInputData[];
    projectUrl: string;
    rating: number;
    links: LinkInputData[];
    desc: string;
}
export const InitData: () => InputData = () => ({
    id: uuid(),
    name: "",
    role: "",
    company: "",
    testimonialJob: "",
    email: "",
    avatar: "",
    projectImages: [],
    projectUrl: "",
    rating: 0,
    links: [],
    desc: "<p></p>\n",
});
type LinkPath = `${NameType}.data.${number}.links`;
type ProjectPath = `${NameType}.data.${number}.projectImages`;
export const onDelete = async (val: InputData) => {
    return DeleteFile(val.avatar);
};
const TeamElem: ElemType<InputData> = React.forwardRef(
    ({ index: i, props: { form }, ...props }, ref) => {
        const { register, control, setValue, getValues } = form;

        const LinkPath: LinkPath = `${Name}.data.${i}.links`;
        const ImagesPath: ProjectPath = `${Name}.data.${i}.projectImages`;
        return (
            <Elem
                headLabel={function G() {
                    const { name, company } = useWatch({
                        name: `${Name}.data.${i}`,
                        control,
                    });
                    return (
                        <div className="font-bold group-hover:text-blue-60">
                            <>
                                <p className="font-bold group-hover:text-blue-60">
                                    {name || "(Not Specified)"}
                                </p>
                                <p className="text-sm text-neutral-50">
                                    {company}
                                </p>
                            </>
                        </div>
                    );
                }}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        control={control}
                        label="Full Name"
                        {...register(`${Name}.data.${i}.name`)}
                    />
                    <NormalInput
                        control={control}
                        label="Company"
                        {...register(`${Name}.data.${i}.company`)}
                    />
                    <NormalInput
                        control={control}
                        label="Testimonial job title"
                        {...register(`${Name}.data.${i}.testimonialJob`)}
                    />
                    <UploadButton
                        label="Avatar"
                        imageId={getPath(
                            getValues() as any,
                            `${Name}.data.${i}.avatar`
                        )}
                        name={`${Name}.data.${i}.avatar`}
                        defaultValue={
                            lodash.get(
                                control._defaultValues,
                                `${Name}.data.${i}.avatar`
                            ) as string
                        }
                        control={control}
                    />
                    <NormalInput
                        control={control}
                        label="Your Role or Job Title"
                        {...register(`${Name}.data.${i}.role`)}
                    />
                    <NormalInput
                        control={control}
                        label="Testimonial Email"
                        {...register(`${Name}.data.${i}.email`)}
                    />
                    <WrapElem label="Testimonial Rate">
                        <RatingInput
                            {...register(`${Name}.data.${i}.rate`, {
                                valueAsNumber: true,
                            })}
                        />
                    </WrapElem>
                </Grid2Container>
                <div className="my-4">
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more Project"
                        Elem={ImageListItem}
                        initData={ImageInitData}
                        name={ImagesPath}
                        label={"Project Images"}
                    />
                </div>
                <div className="my-4">
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more Link"
                        Elem={LinkListItem}
                        initData={LinkInitData}
                        name={LinkPath}
                        label={"Links"}
                    />
                </div>
                <WrapElem
                    label={"Description"}
                    className="my-4"
                >
                    <FinalEditor
                        control={control}
                        {...register(`${Name}.data.${i}.desc`)}
                        placeholder="Description about testimonial opinion"
                    />
                </WrapElem>
            </Elem>
        );
    }
);
export default TeamElem;
