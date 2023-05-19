import React, { useMemo } from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import FinalEditor from "@src/components/common/inputs/Editor";
import UploadButton from "@src/components/common/uploadAvatar";
import { CreateListItem } from "../links";
import InfoGetter from "@src/components/main/sections/InsertCommonData/input";
import { LabelElem } from "@src/components/common/inputs/styles";
import lodash from "lodash";
export type NameType = "team";
export const Name: NameType = "team";
export interface InputData extends FieldsType {
    name: string;
    jobTitle: string;
    email: string;
    avatar: string;
    links: {
        label: string;
        link: string;
    }[];
    desc: string;
}
type LinkPath = `${NameType}.data.${number}.links`;

const TeamElem: ElemType<InputData, NameType> = React.forwardRef(
    ({ index: i, props: { form }, ...props }, ref) => {
        const { register, control, setValue } = form;
        const { name, jobTitle } = useWatch({
            name: `${Name}.data.${i}`,
            control,
        });
        const LinkPath: LinkPath = `${Name}.data.${i}.links`;
        const LinkEle = useMemo(() => CreateListItem(LinkPath), [i]);

        return (
            <Elem
                headLabel={() => (
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
                )}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        label="Full Name"
                        {...register(`${Name}.data.${i}.name`)}
                    />
                    <UploadButton
                        label="Avatar"
                        setValue={(val) =>
                            setValue(`${Name}.data.${i}.avatar`, val)
                        }
                        name={`${Name}.data.${i}.avatar`}
                        defaultValue={lodash.get(
                            control._defaultValues,
                            `${Name}.data.${i}.avatar`
                        )}
                        control={control as any}
                    />
                    <NormalInput
                        label="Job Title"
                        {...register(`${Name}.data.${i}.jobTitle`)}
                    />
                    <NormalInput
                        label="Email"
                        {...register(`${Name}.data.${i}.email`)}
                    />
                </Grid2Container>
                <div className="my-4">
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more Link"
                        Elem={LinkEle}
                        initData={{ label: "", link: "" }}
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
                        placeholder="Description about team mate and his role"
                    />
                </LabelElem>
            </Elem>
        );
    }
);
export default TeamElem;
