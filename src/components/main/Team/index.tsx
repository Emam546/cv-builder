/* eslint-disable react/display-name */
import React, { useMemo } from "react";
import { ElemType } from "@src/components/common/InsertCommonData";
import { Elem } from "@src/components/common/InsertCommonData/Elem";
import { FieldsType } from "@src/components/common/InsertCommonData/types";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import FinalEditor from "@src/components/common/inputs/Editor";
import UploadButton from "@src/components/common/uploadAvatar";
import { CreateListItem } from "../links";
import InfoGetter from "@src/components/common/InsertCommonData/input";
import { LabelElem } from "@src/components/common/inputs/styles";
export type NameType = "Team";
export const Name: NameType = "Team";
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
    ({ index: i, values, form, ...props }, ref) => {
        const { register, control, setValue } = form;
        const { name, jobTitle } = useWatch({
            name: `${Name}.data.${i}`,
            control,
        });
        const LinkPath: LinkPath = `${Name}.data.${i}.links`;
        const LinkEle = useMemo(() => CreateListItem(LinkPath), []);

        return (
            <Elem
                headLabel={() => (
                    <p className="font-bold group-hover:text-blue-60">
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {name || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">
                                {jobTitle}
                            </p>
                        </>
                    </p>
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
                        setValue={(val) =>
                            setValue(`${Name}.data.${i}.desc`, val)
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
