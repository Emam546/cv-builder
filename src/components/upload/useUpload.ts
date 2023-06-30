import { useAppSelector } from "@src/store";
import axios from "axios";
import Cookies from "js-cookie";
import { UserData } from "@serv/models/user";
import { Dispatch, useEffect, useRef, useState } from "react";
import { useInitialEffect } from "@src/utils/hooks";
import { getHeaders } from "@src/utils";
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
    useInitialEffect(() => {
        const t = setTimeout(() => {
            if (!isSingIn) return;
            if (lastData.current == str) return;
            lastData.current = str;
            const source = axios.CancelToken.source();
            axios
                .post("/api/v1/user/data", data, {
                    headers: getHeaders(),
                    cancelToken: source.token,
                })
                .then(() => {
                    setErr(undefined);
                })
                .catch((err) => {
                    setErr(err.message);
                })
                .finally(() => {
                    setState(true);
                });
        }, time);
        setState(false);
        return () => clearTimeout(t);
    }, [str]);

    return [state, setState, err] as [
        boolean,
        Dispatch<boolean>,
        string | undefined
    ];
}
