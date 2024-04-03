import { useAppSelector } from "@src/store";
import axios from "axios";
import { UserData } from "@serv/models/user";
import { Dispatch, useEffect, useRef, useState } from "react";
import { useInitialEffect } from "@src/utils/hooks";
export function useUploadData() {
    const time = +(process.env.NEXT_PUBLIC_UPLOADING_TIME || "3000");
    const data: UserData = useAppSelector((state) => ({
        sections: state.form,
        sectionState: state.state.data,
    }));
    const isSingIn = useAppSelector((state) => state.user.isSingIn);
    const [state, setState] = useState<boolean>(false);
    const lastData = useRef(JSON.stringify(data));
    const [err, setErr] = useState<string>();
    const str = JSON.stringify(data);
    const uploadData = async () => {
        if (!isSingIn) return false;
        if (lastData.current == str) return false;
        lastData.current = str;
        const source = axios.CancelToken.source();
        await axios.post("/api/v1/user/data", data, {
            cancelToken: source.token,
        });
        return true;
    };
    useInitialEffect(() => {
        const t = setTimeout(() => {
            uploadData()
                .then((state) => {
                    setErr(undefined);
                    setState(state);
                })
                .catch((err) => {
                    setErr(err.message);
                });
        }, time);
        setState(false);
        return () => clearTimeout(t);
    }, [str]);
    useEffect(() => {
        window.addEventListener("beforeunload", uploadData);

        return () => {
            window.removeEventListener("beforeunload", uploadData);
        };
    }, [str]);
    return [state, setState, err] as [
        boolean,
        Dispatch<boolean>,
        string | undefined
    ];
}
function useLayoutEffect(arg0: () => () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}
