import { useState, useEffect, Dispatch, SetStateAction } from "react";

export function useConnected() {
    const [isOnline, setIsOnline] = useState(
        typeof navigator != "undefined" ? navigator.onLine : true
    );

    useEffect(() => {
        function onlineHandler() {
            setIsOnline(true);
        }

        function offlineHandler() {
            setIsOnline(false);
        }

        window.addEventListener("online", onlineHandler);
        window.addEventListener("offline", offlineHandler);

        return () => {
            window.removeEventListener("online", onlineHandler);
            window.removeEventListener("offline", offlineHandler);
        };
    }, []);
    return [isOnline, setIsOnline] as [
        boolean,
        Dispatch<SetStateAction<boolean>>
    ];
}
