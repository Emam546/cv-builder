import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
export default function LoadingState() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) =>
            url !== router.asPath && setLoading(true);
        const handleComplete = () => setLoading(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, []);
    if (!loading) return null;
    return (
        <div className="w-full fixed top-0 left-0 z-50">
            <LinearProgress />
        </div>
    );
}
