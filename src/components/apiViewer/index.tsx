import { faClipboard, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@src/store";
import React, { useState } from "react";

export default function ApiViewer() {
    let apiKey = useAppSelector((state) => {
        if (state.user.isSingIn) {
            return state.user.user.apiKey;
        }
        return false;
    });
    const [copied, setCopied] = useState(false);
    if (!apiKey) return null;
    const baseURL = process.env.NEXT_PUBLIC_API_DOMAIN ?? "";

    // Create a new URL object based on the base URL
    const url = `${baseURL}?apikey=${apiKey}`;

    return (
        <div className="py-5">
            <div className="relative flex flex-col justify-center items-center">
                <div className="relative w-full bg-[#f2f2f2] border border-solid border-[#ddd] shadow-lg p-4 max-h-[65rem] overflow-y-auto">
                    <pre
                        id="jsonViewer"
                        className="whitespace-pre-wrap"
                    >
                        {url.toString()}
                    </pre>
                </div>
                <div className="absolute right-0 top-0 p-3 mr-4">
                    <div className="relative px-1">
                        <button
                            id="copyButton"
                            onClick={() => {
                                if (!copied)
                                    navigator.clipboard
                                        .writeText(url.toString())
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
                                        icon={faClipboard}
                                        fontSize={"2.25rem"}
                                    />
                                    <span className="ml-2">Copy</span>
                                </>
                            )}
                            {copied && (
                                <>
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className="font-bold"
                                        fontSize={"2.25rem"}
                                    />
                                    <span className="ml-2">Copied</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
