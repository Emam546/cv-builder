import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { useConnected } from "./hooks";
export default function ConnectedBar() {
    const [connected, setConnected] = useConnected();
    const [showConnected, setShowConnected] = useState(false);
    useEffect(() => {
        if (!connected) {
            setShowConnected(true);
        } else if (showConnected) {
            const t = setTimeout(() => {
                setShowConnected(false);
            }, 3000);
            return () => clearTimeout(t);
        }
    }, [connected]);
    if (!connected)
        return (
            <div
                className={classNames(
                    "fixed py-1 w-full z-[10000] bg-gray-400 top-0"
                )}
            >
                <p className="w-fit m-0 p-0 text-xs capitalize mx-auto text-gray-200 ">
                    You are offline
                </p>
            </div>
        );
    if (!showConnected) return null;
    return (
        <div
            className={classNames(
                "fixed py-1 w-full z-[10000] bg-green-500 top-0"
            )}
        >
            <p className="w-fit m-0 text-xs capitalize mx-auto text-gray-100 ">
                You are online
            </p>
        </div>
    );
}
