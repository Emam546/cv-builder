import { faCheck, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { convertSection2Data } from "../main/utils";
import { useAppSelector } from "@src/store";
interface Props {
    string: string;
    children: React.ReactNode;
}
export default function ShowResultElem({ string, children }: Props) {
    const [copied, setCopied] = useState(false);
    return (
        <div className="relative bg-[#f2f2f2] shadow-lg border border-solid  border-[#ddd] p-4">
            <div className="max-h-[65rem] overflow-y-auto">{children}</div>
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
                                <FontAwesomeIcon icon={faClipboard} />
                                <span className="ml-2">Copy</span>
                            </>
                        )}
                        {copied && (
                            <>
                                <FontAwesomeIcon
                                    icon={faCheck}
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
