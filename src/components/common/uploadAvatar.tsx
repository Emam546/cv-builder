import { faPen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCropper from "@src/components/common/Img_cropper";
import { useUploadImage } from "@src/utils/hooks";
import classNames from "classnames";
import React, { useState, Dispatch, useEffect } from "react";
import { Control, useController } from "react-hook-form";
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
    const [orgUrl, setOrgUrl] = useState(defaultValue);
    const [imgUrl, setImgUrl] = useUploadImage(
        "/api/v1/images",
        name,
        blob,
        defaultValue as string
    );
    const { field } = useController({ control, name, defaultValue });
    useEffect(() => {
        if (setValue && imgUrl) setValue(imgUrl);
    }, [imgUrl]);
    useEffect(() => {
        if (field.value != "") setOrgUrl(field.value);
        else setOrgUrl(undefined);
    }, [field.value, field.name]);
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
                            fontSize={"1em"}
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
                        <img
                            src={orgUrl}
                            alt="avatar img"
                            className="max-w-full"
                        />
                    </div>
                    <div className="font-medium">
                        <button
                            type="button"
                            className="block text-blue-50 hover:text-blue-80 cursor-pointer"
                            onClick={() => setEdit(true)}
                        >
                            <FontAwesomeIcon
                                fontSize={"1em"}
                                icon={faPen}
                            />
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
                                setImgUrl(undefined);
                                setValue("");
                                setOrgUrl(undefined);
                            }}
                        >
                            <FontAwesomeIcon
                                fontSize={"1em"}
                                icon={faTrash}
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
                        setOrgUrl(URL.createObjectURL(blob));
                    }}
                    exit={() => setEdit(false)}
                    aspect={1}
                />
            </div>
        </div>
    );
}

export default UploadButton;
