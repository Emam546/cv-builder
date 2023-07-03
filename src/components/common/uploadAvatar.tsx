import { faPen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCropper from "@src/components/common/Img_cropper";
import { useDeleteFile, useUploadFile } from "@src/utils/hooks";
import classNames from "classnames";
import { useState } from "react";
import { Control, useController } from "react-hook-form";
import LoadingPanner from "./loading/loading";
import { DeleteFile as OrgDeleteFile } from "@src/utils";
import { useDeleteDialog } from "./confirmAction";
import DeleteSnackBar from "@src/components/main/sections/InsertCommonData/deleteAlert";
interface Props {
    name: string;
    label: string;
    imageId: string;
    control: Control;
    defaultValue?: string;
}
const DeleteFileUrl = "/api/v1/images";
const UploadFileUrl = "/api/v1/images";
export function DeleteFile(name: string) {
    return OrgDeleteFile(DeleteFileUrl, name);
}
function UploadButton({ label, defaultValue, name, imageId, control }: Props) {
    const [edit, setEdit] = useState(false);
    const [blob, setBlob] = useState<Blob>();
    const UploadFile = useUploadFile(UploadFileUrl, imageId);
    const { field } = useController({ control, name, defaultValue });
    const orgUrl = (blob && URL.createObjectURL(blob)) || field.value;
    const DeleteFile = useDeleteFile(DeleteFileUrl, field.value);
    const [loading, setLoading] = useState(false);
    const [Dialog, stateAccept] = useDeleteDialog({
        title: "Are you sure the you want to delete Image Profile",
    });
    const [error, setErr] = useState<string>();
    return (
        <>
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
                                    stateAccept.accept(() => {
                                        setLoading(true);
                                        return new Promise((res) => {
                                            DeleteFile()
                                                .then(() => {
                                                    field.onChange("");
                                                    setBlob(undefined);
                                                })
                                                .catch((err) =>
                                                    setErr(err.message)
                                                )
                                                .finally(() => {
                                                    setLoading(false);
                                                    res(null);
                                                });
                                        });
                                    });
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
                            UploadFile(blob)
                                .then((url) => {
                                    if (url) field.onChange(url);
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
                        aspect={1}
                    />
                </div>
            </div>
            <Dialog />
            <DeleteSnackBar
                open={error != undefined}
                setClose={() => setErr(undefined)}
                undo={function () {
                    throw new Error("Function not implemented.");
                }}
                error={error}
            />
        </>
    );
}

export default UploadButton;
