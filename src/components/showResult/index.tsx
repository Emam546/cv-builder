import { faCheck, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { convertSection2Data } from "../main/utils";
import { useAppSelector } from "@src/store";
export default function ShowResult() {
    const [res, data] = useAppSelector((state) => [
        state.form,
        state.state.data,
    ]);
    const obj = convertSection2Data(res, data);
    const string = JSON.stringify(obj, null, 2);
    const [copied, setCopied] = useState(false);
    return (
        <div className="relative flex flex-col justify-center items-center">
            <div className="relative w-full bg-[#f2f2f2] border border-solid border-[#ddd] shadow-lg p-4 max-h-[65rem] overflow-y-auto">
                <pre
                    id="jsonViewer"
                    className="whitespace-pre-wrap"
                >
                    {string}
                </pre>
            </div>
            <div className="absolute right-0 top-0 p-3 mr-4">
                <div className="relative px-1">
                    <button
                        type="button"
                        onClick={() => {
                            if (!copied)
                                navigator.clipboard
                                    .writeText(string)
                                    .then(() => {
                                        setCopied(true);
                                        setTimeout(() => {
                                            setCopied(false);
                                        }, 1000);
                                    });
                        }}
                        className="bg-neutral-60 hover:bg-neutral-70 text-white font-bold py-1 px-2 rounded-lg"
                    >
                        {!copied && (
                            <>
                                <FontAwesomeIcon
                                    fontSize={"1em"}
                                    icon={faClipboard}
                                />
                                <span className="ml-2">Copy</span>
                            </>
                        )}
                        {copied && (
                            <>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    fontSize={"1em"}
                                    className="font-bold"
                                />
                                <span className="ml-2">Copied</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
