import React from "react";
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
import { WrapElem } from "@src/components/common/inputs/styles";
import lodash from "lodash";
import { uuid } from "@src/utils";
import { getPath } from "../InsertCommonData/utils";
export type NameType = "team";
export const Name: NameType = "team";
export interface InputData {
    id: string;
    name: string;
    jobTitle: string;
    email: string;
    avatar: string;
    links: LinkInputData[];
    desc: string;
}
type LinkPath = `${NameType}.data.${number}.links`;
export const InitData = () => ({
    id: uuid(),
    name: "",
    jobTitle: "",
    email: "",
    avatar: "",
    links: [],
    desc: "<p></p>\n",
});
export const onDelete = async (value: InputData) => {
    await DeleteFile(value.avatar);
};
const TeamElem: ElemType<InputData> = React.forwardRef(
    ({ index: i, props: { form }, ...props }, ref) => {
        const { register, control, setValue, getValues } = form;

        const LinkPath: LinkPath = `${Name}.data.${i}.links`;

        return (
            <Elem
                headLabel={function G() {
                    const { name, jobTitle } = useWatch({
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
                                    {jobTitle}
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
                    <UploadButton
                        label="Avatar"
                        name={`${Name}.data.${i}.avatar`}
                        defaultValue={
                            lodash.get(
                                control._defaultValues,
                                `${Name}.data.${i}.avatar`
                            ) as string
                        }
                        imageId={getPath(
                            getValues() as any,
                            `${Name}.data.${i}.avatar`
                        )}
                        control={control}
                    />
                    <NormalInput
                        control={control}
                        label="Job Title"
                        {...register(`${Name}.data.${i}.jobTitle`)}
                    />
                    <NormalInput
                        control={control}
                        label="Email"
                        {...register(`${Name}.data.${i}.email`)}
                    />
                </Grid2Container>
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
                        placeholder="Description about team mate and his role"
                    />
                </WrapElem>
            </Elem>
        );
    }
);
export default TeamElem;
