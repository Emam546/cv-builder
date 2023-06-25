import { faPen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCropper from "@src/components/common/Img_cropper";
import { useNotInitEffect, useUploadImage } from "@src/utils/hooks";
import classNames from "classnames";
import React, { useState, Dispatch, useEffect } from "react";
import { Control, useController } from "react-hook-form";
import LoadingPanner from "./loading/loading";
interface Props {
    name: string;
    label: string;
    setValue: Dispatch<string>;
    control: Control;
    defaultValue?: string;
}
function UploadButton({ label, setValue, defaultValue, name, control }: Props) {
    const [edit, setEdit] = useState(false);
    const [blob, setBlob] = useState<Blob>();
    const UploadImage = useUploadImage("/api/v1/images", name);
    const { field } = useController({ control, name, defaultValue });
    const orgUrl = (blob && URL.createObjectURL(blob)) || field.value;
    const [loading, setLoading] = useState(false);

    return (
        <div className="group pt-5 select-none">
            {!orgUrl && (
                <div
                    onClick={() => {
                        setEdit(true);
                    }}
                    className="flex items-center gap-x-4 h-full cursor-pointer"
                >
                    <div className="bg-neutral-10 min-h-[4rem] group-hover:bg-blue-10 aspect-square h-full flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faUser}
                            className="text-neutral-50 group-hover:text-blue-50 text-4xl"
                        />
                    </div>
                    <div className="font-medium">
                        <span className="text-blue-50 group-hover:text-neutral-50">
                            {label}
                        </span>
                    </div>
                </div>
            )}

            {orgUrl && (
                <div className="flex items-center gap-x-4 h-full">
                    <div className="bg-neutral-10 max-h-[4rem] group-hover:bg-blue-10 aspect-square h-full flex items-center justify-center overflow-hidden">
                        {!loading ? (
                            <img
                                src={orgUrl}
                                alt="avatar img"
                                className="max-w-full"
                            />
                        ) : (
                            <div className="bg-gray-200 aspect-square flex items-center">
                                <div className="scale-[0.7]">
                                    <LoadingPanner />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="font-medium">
                        <button
                            type="button"
                            className="block text-blue-50 hover:text-blue-80 cursor-pointer"
                            onClick={() => setEdit(true)}
                            aria-label="edit"
                        >
                            <FontAwesomeIcon icon={faPen} />
                            <span className="px-3">Edit photo</span>
                        </button>
                        <button
                            type="button"
                            className="block text-neutral-20 hover:text-red-40 mt-1 cursor-pointer"
                            onClick={() => {
                                if (
                                    !window.confirm(
                                        "Are you sure the you want to delete Image Profile"
                                    )
                                )
                                    return;
                                setValue("");
                                setBlob(undefined);
                            }}
                            aria-label="delete"
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                                aria-label="delete"
                            />
                            <span className="px-3">Delete</span>
                        </button>
                    </div>
                </div>
            )}
            <div
                className={classNames({
                    hidden: !edit,
                })}
            >
                <ImageCropper
                    setValue={(blob) => {
                        setEdit(false);
                        setBlob(blob);
                        setLoading(true);
                        UploadImage(blob)
                            .then((url) => {
                                if (url) setValue(url);
                                else setBlob(undefined);
                            })
                            .catch(() => {
                                setBlob(undefined);
                            })
                            .finally(() => {
                                setLoading(false);
                            });
                    }}
                    exit={() => setEdit(false)}
                    aspect={1}
                />
            </div>
        </div>
    );
}

export default UploadButton;
