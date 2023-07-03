import { faDownload, faFile, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import { useDeleteDialog } from "@src/components/common/confirmAction";
import { checkFile } from "@src/utils";
import { useDeleteFile, useUploadFile } from "@src/utils/hooks";
import { useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";

interface Props {
    name: string;
    label: string;
    control: Control;
    defaultValue?: string;
    pdfId: string;
}
function UploadPDF({ label, defaultValue, name, control, pdfId }: Props) {
    const UploadFile = useUploadFile("/api/v1/images", pdfId);
    const { field } = useController({ control, name, defaultValue });
    const [loading, setLoading] = useState(false);
    const orgUrl = field.value;
    const DeleteFile = useDeleteFile("/api/v1/image", orgUrl);
    const [err, setError] = useState<string>();
    const [Dialog, stateAccept] = useDeleteDialog({
        title: "Are you sure the you want to delete this file",
    });
    useEffect(() => {
        setError(undefined);
    }, [field.value]);
    return (
        <>
            <div className="group pt-5 select-none">
                {!orgUrl && (
                    <label className="flex items-center gap-x-4 h-full cursor-pointer">
                        <div className="bg-neutral-10 min-h-[4rem] group-hover:bg-blue-10 aspect-square h-full flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={faFile}
                                className="text-neutral-50 group-hover:text-blue-50 text-4xl"
                            />
                        </div>
                        <div className="font-medium">
                            <span className="text-blue-50 group-hover:text-neutral-50">
                                {label}
                            </span>
                            {err && <p className="text-red-50">{err}</p>}
                        </div>
                        <input
                            type="file"
                            onChange={(e) => {
                                const files = e.target.files;
                                checkFile(e)
                                    .then((values) => {
                                        UploadFile(
                                            new Blob([values[0]], {
                                                type: files![0].type,
                                            })
                                        )
                                            .then((url) => {
                                                field.onChange(url);
                                            })
                                            .catch((err) => {
                                                setError(err.message);
                                            })
                                            .finally(() => {
                                                setLoading(false);
                                            });
                                    })
                                    .catch((err) => {
                                        setError(err.message);
                                        setLoading(false);
                                    });
                                setLoading(true);
                            }}
                            accept=".pdf"
                            className="absolute invisible -z-50 appearance-none"
                        />
                    </label>
                )}

                {orgUrl && (
                    <div className="flex items-center gap-x-4 h-full">
                        <div className="bg-neutral-10 max-h-[4rem] group-hover:bg-blue-10 aspect-square h-full flex items-center justify-center overflow-hidden">
                            {!loading ? (
                                <FontAwesomeIcon
                                    icon={faFile}
                                    className="text-neutral-50 group-hover:text-blue-50 text-4xl"
                                />
                            ) : (
                                <div className="bg-gray-200 aspect-square flex items-center justify-center">
                                    <CircularProgress className="max-w-[2rem] max-h-[2rem]" />
                                </div>
                            )}
                        </div>
                        <div className="font-medium flex">
                            <div>
                                <button
                                    type="button"
                                    className="block text-neutral-20 hover:text-red-40 my-1 cursor-pointer"
                                    onClick={() => {
                                        stateAccept.accept(() => {
                                            return new Promise((res) => {
                                                DeleteFile()
                                                    .then(() => {
                                                        field.onChange("");
                                                    })
                                                    .catch((err) => {
                                                        setError(err.message);
                                                    })
                                                    .finally(() => {
                                                        setLoading(false);
                                                        res(null);
                                                    });
                                                setLoading(true);
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
                                <a
                                    className="block text-neutral-20 hover:text-blue-40 my-1 cursor-pointer"
                                    download
                                    href={field.value}
                                    aria-label="download"
                                >
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        aria-label="download"
                                    />
                                    <span className="px-3">Download</span>
                                </a>
                            </div>
                            {err && <p className="text-red-50">{err}</p>}
                        </div>
                    </div>
                )}
            </div>
            <Dialog />
        </>
    );
}

export default UploadPDF;
