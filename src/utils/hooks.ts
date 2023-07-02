import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { DependencyList } from "react";
import mime from "mime";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@src/store";
import { LoginModelActions } from "@src/components/loginModel";
import crypto from "crypto";
import { DeleteFile, getAuthHeaders as getAuthHeaders } from ".";
export function useForceUpdate() {
    const [i, setI] = useState(0);
    return () => setI(i + 1);
}
export function useSyncRefs<TType>(
    ...refs: (
        | React.MutableRefObject<TType | null>
        | ((instance: TType) => void)
        | null
    )[]
) {
    const cache = React.useRef(refs);

    React.useEffect(() => {
        cache.current = refs;
    }, [refs]);

    return React.useCallback(
        (value: TType) => {
            for (let ref of cache.current) {
                if (ref == null) {
                    continue;
                }
                if (typeof ref === "function") {
                    ref(value);
                } else {
                    ref.current = value;
                }
            }
        },
        [cache]
    );
}
export function useNotInitEffect(
    effect: React.EffectCallback,
    deps: [string | number | boolean]
) {
    const [state, setState] = useState(false);
    const cur = useRef(deps);
    return useEffect(() => {
        const state = cur.current!.some((val, i) => val != deps[i]);
        if (state) return effect();
    }, deps);
}

export function useDebounceEffect(
    fn: (deps?: DependencyList) => void,
    waitTime: number,
    deps?: DependencyList
) {
    useEffect(() => {
        const t = setTimeout(() => {
            fn.call(undefined, deps);
        }, waitTime);

        return () => {
            clearTimeout(t);
        };
    }, deps);
}
export const useInitialEffect = (effect: () => void, deps?: DependencyList) => {
    const hasMountedRef = useRef(false);

    useEffect(() => {
        if (hasMountedRef.current) {
            return effect();
        } else {
            hasMountedRef.current = true;
        }
    }, deps);
};
export const useDebounceInitialEffect = (
    fn: (deps?: DependencyList) => void,
    waitTime: number,
    deps?: DependencyList
) => {
    useEffect(() => {
        const t = setTimeout(() => {
            fn.call(undefined, deps);
        }, waitTime);

        return () => {
            clearTimeout(t);
        };
    }, deps);
};
export function useUploadFile(
    url: string,
    key: string
): (blob: Blob) => Promise<string> {
    const dispatch = useAppDispatch();
    const isSignedIn = useAppSelector((state) => state.user.isSingIn);
    const userId = useAppSelector((state) => {
        if (state.user.isSingIn) {
            return state.user.user._id;
        }
        return false;
    });
    async function Update(blob: Blob) {
        if (!isSignedIn) {
            dispatch(LoginModelActions.open());
            return "";
        }
        const token = Cookies.get("token");
        if (!token) return "";
        const ext = mime.getExtension(blob.type);
        if (!ext || !["png", "jpg", "jpeg", "pdf"].includes(ext))
            throw new Error(`un recognized type ${blob.type}`);
        const hash = crypto
            .createHash("sha256")
            .update(userId + key)
            .digest()
            .toString("base64")
            .replaceAll(/[?&#\\%<>+=/]/g, "");

        const formData = new FormData();
        formData.append("name", hash);
        formData.append("img", blob, `image.${ext}`);

        const res = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...getAuthHeaders(),
            },
        });
        return res.data.data.url;
    }
    return Update;
}

export function useDeleteFile(
    url: string,
    key: string
): () => Promise<any> {
    const dispatch = useAppDispatch();
    const isSignedIn = useAppSelector((state) => state.user.isSingIn);
    const userId = useAppSelector((state) => {
        if (state.user.isSingIn) {
            return state.user.user._id;
        }
        return false;
    });
    async function Update() {
        if (!isSignedIn) {
            dispatch(LoginModelActions.open());
            return "";
        }
        if (!userId) return "";
        const name = crypto
            .createHash("sha256")
            .update(userId + key)
            .digest()
            .toString("base64")
            .replaceAll(/[?&#\\%<>+=/]/g, "");
        return await DeleteFile(url, name);
    }
    return Update;
}
