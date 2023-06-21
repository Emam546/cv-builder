import React, { useMemo } from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import FinalEditor from "@src/components/common/inputs/Editor";
import UploadButton from "@src/components/common/uploadAvatar";
import {
    CreateListItem,
    InputData as LinkInputData,
    InitData as LinkInitData,
} from "../links";
import InfoGetter from "@src/components/main/sections/InsertCommonData/input";
import { LabelElem } from "@src/components/common/inputs/styles";
import {
    InputData as ImageInputData,
    CreateListItem as CreateImageListItem,
    InitData as ProjectInitData,
} from "../Projects/images";
import lodash from "lodash";
import RatingInput from "./rating";
export type NameType = "testimonials";
export const Name: NameType = "testimonials";
export interface InputData {
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
export const InitData: InputData = {
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
    desc: "",
};
type LinkPath = `${NameType}.data.${number}.links`;
type ProjectPath = `${NameType}.data.${number}.projectImages`;

const TeamElem: ElemType<InputData> = React.forwardRef(
    ({ index: i, props: { form }, ...props }, ref) => {
        const { register, control, setValue } = form;
        const { name, company } = useWatch({
            name: `${Name}.data.${i}`,
            control,
        });
        const LinkPath: LinkPath = `${Name}.data.${i}.links`;
        const ProjectPath: ProjectPath = `${Name}.data.${i}.projectImages`;
        const LinkEle = useMemo(() => CreateListItem(LinkPath), [i]);
        const ProjectImageEle = useMemo(
            () => CreateImageListItem(ProjectPath),
            [i]
        );

        return (
            <Elem
                headLabel={() => (
                    <div className="font-bold group-hover:text-blue-60">
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {name || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">{company}</p>
                        </>
                    </div>
                )}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        label="Full Name"
                        {...register(`${Name}.data.${i}.name`)}
                    />
                    <NormalInput
                        label="Company"
                        {...register(`${Name}.data.${i}.company`)}
                    />
                    <NormalInput
                        label="Testimonial job title"
                        {...register(`${Name}.data.${i}.testimonialJob`)}
                    />
                    <UploadButton
                        label="Avatar"
                        setValue={(val) =>
                            setValue(`${Name}.data.${i}.avatar`, val)
                        }
                        name={`${Name}.data.${i}.avatar`}
                        defaultValue={
                            lodash.get(
                                control._defaultValues,
                                `${Name}.data.${i}.avatar`
                            ) as string
                        }
                        control={control as any}
                    />
                    <NormalInput
                        label="Your Role or Job Title"
                        {...register(`${Name}.data.${i}.role`)}
                    />
                    <NormalInput
                        label="Testimonial Email"
                        {...register(`${Name}.data.${i}.email`)}
                    />
                    <LabelElem label="Testimonial Rate">
                        <RatingInput
                            {...register(`${Name}.data.${i}.rate`, {
                                valueAsNumber: true,
                            })}
                        />
                    </LabelElem>
                </Grid2Container>
                <div className="my-4">
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more Project"
                        Elem={ProjectImageEle}
                        initData={ProjectInitData}
                        name={ProjectPath}
                        label={"Project Images"}
                    />
                </div>
                <div className="my-4">
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more Link"
                        Elem={LinkEle}
                        initData={LinkInitData}
                        name={LinkPath}
                        label={"Links"}
                    />
                </div>
                <LabelElem
                    label={"Description"}
                    className="my-4"
                >
                    <FinalEditor
                        control={control as any}
                        defaultValue={
                            form.control._defaultValues[Name]?.data?.[i]?.desc
                        }
                        {...register(`${Name}.data.${i}.desc`)}
                        placeholder="Description about testimonial opinion"
                    />
                </LabelElem>
            </Elem>
        );
    }
);
export default TeamElem;
