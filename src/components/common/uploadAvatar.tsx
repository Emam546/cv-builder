/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import { faPen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCropper from "@src/components/common/Img_cropper";
import { GeneralInputProps } from "@src/components/common/inputs/styles";
import { useSyncRefs } from "@src/utils/hooks";
import classNames from "classnames";
import React, { useRef, useState, Dispatch } from "react";
interface Props {
    label: string;
    setValue: Dispatch<string>;
}
const UploadButton = React.forwardRef<HTMLInputElement, Props>(
    ({ label, setValue, ...props }, ref) => {
        const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
        const [edit, setEdit] = useState(false);
        return (
            <div className="group pt-5 select-none">
                {!imgSrc && (
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

                {imgSrc && (
                    <div className="flex items-center gap-x-4 h-full">
                        <div className="bg-neutral-10 max-h-[4rem] group-hover:bg-blue-10 aspect-square h-full flex items-center justify-center overflow-hidden">
                            <img
                                src={imgSrc}
                                alt="avatar img"
                                className="max-w-full"
                            />
                        </div>
                        <div className="font-medium">
                            <button
                                type="button"
                                className="block text-blue-50 hover:text-blue-80 cursor-pointer"
                                onClick={(e) => setEdit(true)}
                            >
                                <FontAwesomeIcon icon={faPen} />
                                <span className="px-3">Edit photo</span>
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
                                    setImgSrc(undefined);
                                    setValue("");
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
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
                        setValue={(val) => {
                            if (setValue) setValue(val);
                            setEdit(false);
                            setImgSrc(val);
                        }}
                        exit={() => setEdit(false)}
                        aspect={1}
                    />
                </div>
            </div>
        );
    }
);
export default UploadButton;
