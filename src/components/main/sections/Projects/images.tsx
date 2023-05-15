import { faImage, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCropper from "@src/components/common/Img_cropper";
import classNames from "classnames";
import React, { useRef, useState, Dispatch, useEffect } from "react";

import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { Control, Path, useController, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import { forwardRef } from "@src/components/main/sections/InsertCommonData/input";
import { useSyncRefs, useUploadImage } from "@src/utils/hooks";
import { GeneralInputProps } from "@src/components/common/inputs/styles";

export type NameType = "links";
export const Name: NameType = "links";
export interface InputData extends FieldsType {
    widthRation: number;
    heightRation: number;
    image: string;
}
function assertISValidData(data: unknown): InputData {
    return data as InputData;
}

export function CreateListItem<NameType extends string>(Name: NameType) {
    function v(s: string) {
        return s as Path<ListData<InputData, NameType>>;
    }
    return forwardRef<InputData, NameType>(
        (
            {
                index: i,
                props: {
                    form: { register, control, setValue, getValues },
                },
                ...props
            },
            ref
        ) => {
            const { widthRation, heightRation } = assertISValidData(
                useWatch({
                    name: v(`${Name}.${i}`),
                    control,
                })
            );
            return (
                <Elem
                    headLabel={() => (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {widthRation} / {heightRation}
                            </p>
                        </>
                    )}
                    {...props}
                    ref={ref}
                >
                    <div className="mb-2">
                        <Grid2Container>
                            <NormalInput
                                label="Width ratio"
                                {...register(v(`${Name}.${i}.widthRation`), {
                                    valueAsNumber: true,
                                })}
                            />
                            <NormalInput
                                label="Height ration"
                                {...register(v(`${Name}.${i}.heightRation`), {
                                    valueAsNumber: true,
                                })}
                            />
                        </Grid2Container>
                        <UploadButton
                            label="Upload Image"
                            setValue={(val) =>
                                setValue(v(`${Name}.${i}.image`), val as any)
                            }
                            aspect={widthRation / (heightRation || 1)}
                            {...register(v(`${Name}.${i}.image`))}
                            control={control}
                        />
                    </div>
                </Elem>
            );
        }
    );
}
interface Props {
    label: string;
    setValue: Dispatch<string>;
    aspect: number;
    name: string;
    control: Control;
    defaultValue?: string;
}
export const UploadButton = React.forwardRef<HTMLInputElement, Props>(
    ({ defaultValue, label, setValue, name, control, aspect }, ref) => {
        const [orgImg, setOrgImg] = useState(defaultValue);
        const [edit, setEdit] = useState(false);
        const [blob, setBlob] = useState<Blob>();
        const { field } = useController({ name, control, defaultValue });
        const [imgUrl, setImgUrl] = useUploadImage(
            "/api/v1/images",
            name,
            blob,
            defaultValue as string
        );
        useEffect(() => {
            if (imgUrl && setValue) setValue(imgUrl);
        }, [imgUrl]);
        useEffect(() => {
            if (field.value != "") setOrgImg(field.value);
            else setOrgImg(undefined);
        }, [field.value, field.name]);
        return (
            <div className="group pt-5 select-none">
                {!orgImg && (
                    <div
                        onClick={() => {
                            setEdit(true);
                        }}
                        className="cursor-pointer"
                    >
                        <div
                            style={{
                                aspectRatio: aspect,
                            }}
                            className="mx-auto bg-neutral-10 max-w-full max-h-[20rem] group-hover:bg-blue-10  flex items-center justify-center"
                        >
                            <div className="text-center">
                                <FontAwesomeIcon
                                    icon={faImage}
                                    className="text-neutral-50 group-hover:text-blue-50 text-6xl"
                                />
                                <span className="block mt-3 text-blue-50 group-hover:text-neutral-50">
                                    {label}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                {orgImg && (
                    <>
                        <div
                            onClick={() => {
                                setEdit(true);
                            }}
                            className="cursor-pointer"
                        >
                            <div
                                style={{
                                    aspectRatio: aspect,
                                    backgroundImage: `url('${
                                        orgImg || imgUrl
                                    }')`,
                                }}
                                className={classNames(
                                    "mx-auto bg-cover bg-center bg-neutral-10 max-w-full max-h-[20rem] group-hover:bg-blue-10  flex items-center justify-center",
                                    "group relative after:content-[''] after:w-full after:h-full after:absolute hover:after:opacity-60 after:opacity-0 after:bg-neutral-100 after:top-0 after:left-0 after:transition-all after:duration-400"
                                )}
                            >
                                <div className="text-center relative z-10 hidden group-hover:block">
                                    <div className="font-medium">
                                        <button
                                            type="button"
                                            className="block text-blue-40 hover:text-blue-50 cursor-pointer"
                                            onClick={(e) => setEdit(true)}
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                            <span className="px-3">
                                                Edit photo
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="block text-neutral-20 hover:text-red-40 mt-1 cursor-pointer"
                                            onClick={(e) => {
                                                if (
                                                    !window.confirm(
                                                        "Are you sure the you want to delete Image Profile"
                                                    )
                                                )
                                                    return;
                                                setImgUrl(undefined);
                                                setOrgImg(undefined);
                                                setValue("");
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span className="px-3">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div
                    className={classNames({
                        hidden: !edit,
                    })}
                >
                    <ImageCropper
                        setValue={(val) => {
                            setEdit(false);
                            setBlob(val);
                            setOrgImg(URL.createObjectURL(val));
                        }}
                        exit={() => setEdit(false)}
                        aspect={aspect}
                    />
                </div>
            </div>
        );
    }
);