import { faImage, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCropper from "@src/components/common/Img_cropper";
import classNames from "classnames";
import React, { useState, Dispatch } from "react";

import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { Control, useController, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import { ListElemType } from "@src/components/main/sections/InsertCommonData/input";
import {
    useDeleteFile,
    useNotInitEffect,
    useUploadFile,
} from "@src/utils/hooks";
import LoadingPanner from "@src/components/common/loading/loading";
import loadash from "lodash";
import { DeleteFile, UploadFile, copyObject, uuid } from "@src/utils";
import { Duplicate, getPath } from "../InsertCommonData/utils";
import { useDeleteDialog } from "@src/components/common/confirmAction";
import DeleteAlert from "../../../common/deleteAlert";
import axios from "axios";
export type NameType = "images";
export const Name: NameType = "images";
export type NameRules = string;
export interface InputData {
    widthRation: number;
    heightRation: number;
    image: string;
    id: string;
}
interface Props {
    label: string;
    setValue: Dispatch<string>;
    aspect: number;
    name: string;
    imageId: string;
    control: Control;
    defaultValue?: string;
}
const ImageUploadUrl = "/api/v1/images";
const ImageDeleteUrl = "/api/v1/images";
export const UploadButton = React.forwardRef<HTMLInputElement, Props>(
    (
        { defaultValue, label, setValue, name, control, aspect, imageId },
        ref
    ) => {
        const [edit, setEdit] = useState(false);
        const [blob, setBlob] = useState<Blob | undefined>();
        const { field } = useController({ name, control, defaultValue });
        const UploadImage = useUploadFile(ImageUploadUrl, imageId);
        const [loading, setLoading] = useState(false);
        const orgImg = (blob && URL.createObjectURL(blob)) || field.value;
        const DeleteFile = useDeleteFile(ImageDeleteUrl, field.value);
        const [Dialog, stateAccept] = useDeleteDialog({
            title: "Are you sure the you want to delete Image Profile",
        });
        const [error, setErr] = useState<string>();
        useNotInitEffect(() => {
            setValue("");
            setBlob(undefined);
            setLoading(false);
        }, [aspect]);
        return (
            <>
                <div className="group pt-5 select-none">
                    {!orgImg && !loading && (
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
                    {orgImg && !loading && (
                        <>
                            <div className="cursor-pointer">
                                <div
                                    style={{
                                        aspectRatio: aspect,
                                        backgroundImage: `url('${orgImg}')`,
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
                                                aria-label="edit"
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
                                                    stateAccept.accept(() => {
                                                        return new Promise(
                                                            (res) => {
                                                                DeleteFile()
                                                                    .then(
                                                                        () => {
                                                                            setValue(
                                                                                ""
                                                                            );
                                                                            setBlob(
                                                                                undefined
                                                                            );
                                                                        }
                                                                    )
                                                                    .catch(
                                                                        (
                                                                            err
                                                                        ) => {
                                                                            setErr(
                                                                                err.message
                                                                            );
                                                                        }
                                                                    )
                                                                    .finally(
                                                                        () => {
                                                                            setLoading(
                                                                                false
                                                                            );
                                                                            res(
                                                                                null
                                                                            );
                                                                        }
                                                                    );
                                                                setLoading(
                                                                    true
                                                                );
                                                            }
                                                        );
                                                    });
                                                }}
                                                aria-label="delete"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                                <span className="px-3">
                                                    Delete
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {loading && (
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
                                        backgroundImage: `url('${orgImg}')`,
                                    }}
                                    className={classNames(
                                        "mx-auto bg-cover bg-center bg-neutral-10 max-w-full max-h-[20rem] group-hover:bg-blue-10  flex items-center justify-center",
                                        "group relative after:content-[''] after:w-full after:h-full after:absolute after:opacity-60 after:bg-neutral-100 after:top-0 after:left-0 after:transition-all after:duration-400"
                                    )}
                                >
                                    <div className="text-center relative z-10">
                                        <div className="font-medium">
                                            <LoadingPanner />
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
                                setLoading(true);
                                UploadImage(val)
                                    .then((url) => {
                                        if (url) setValue(url);
                                        else setBlob(undefined);
                                    })
                                    .catch((err) => {
                                        setBlob(undefined);
                                        setErr(err.message);
                                    })
                                    .finally(() => {
                                        setLoading(false);
                                    });
                            }}
                            exit={() => setEdit(false)}
                            aspect={aspect || 1}
                        />
                    </div>
                </div>
                <Dialog />
                <DeleteAlert
                    open={error != undefined}
                    message={`Error happened:${error}`}
                    setClose={() => setErr(undefined)}
                    undo={function () {
                        throw new Error("Function not implemented.");
                    }}
                    error={true}
                />
            </>
        );
    }
);
export const InitData: () => InputData = () => ({
    id: uuid(),
    widthRation: 1,
    heightRation: 1,
    image: "",
});
export const OnDelete = async (value: InputData) => {
    if (!value.image) return;
    return await DeleteFile(ImageDeleteUrl, value.image);
};
export const onDuplicate = async (
    value: InputData,
    path: string
): Promise<InputData> => {
    const newValue = Duplicate(value);
    if (!newValue.image) return newValue;
    const response = await axios.get(value.image, { responseType: "blob" });
    const blob = new Blob([response.data], {
        type: response.headers["content-type"],
    });
    newValue.image = await UploadFile(
        ImageUploadUrl,
        `${path}.${newValue.id}.image`,
        blob
    );
    return newValue;
};
export const ListItem = React.forwardRef(
    (
        {
            index: i,
            props: {
                form: { register, control, setValue, getValues },
                name: Name,
            },
            ...props
        },
        ref
    ) => {
        const { widthRation, heightRation } = useWatch({
            name: `${Name}.${i}`,
            control,
        });

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
                            {...register(`${Name}.${i}.widthRation`, {
                                valueAsNumber: true,
                            })}
                        />
                        <NormalInput
                            label="Height ratio"
                            {...register(`${Name}.${i}.heightRation`, {
                                valueAsNumber: true,
                            })}
                        />
                    </Grid2Container>
                    <UploadButton
                        label="Upload Image"
                        imageId={getPath(getValues(), `${Name}.${i}.image`)}
                        setValue={(val) => setValue(`${Name}.${i}.image`, val)}
                        aspect={widthRation / (heightRation || 1)}
                        {...register(`${Name}.${i}.image`)}
                        control={control}
                        defaultValue={
                            loadash.get(
                                control._defaultValues,
                                `${Name}.${i}.image`
                            ) as any
                        }
                    />
                </div>
            </Elem>
        );
    }
) as ListElemType<InputData>;
