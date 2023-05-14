import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { DependencyList } from "react";
import mime from "mime";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@src/store";
import { LoginModelActions } from "@src/components/loginModel";
import crypto from "crypto";
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
    deps?: React.DependencyList | undefined
) {
    const [state, setState] = useState(false);
    return useEffect(() => {
        if (!state) setState(true);

        return effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    useInitialEffect(() => {
        const t = setTimeout(() => {
            fn.call(undefined, deps);
        }, waitTime);

        return () => {
            clearTimeout(t);
        };
    }, deps);
};
export function useUploadImage(
    url: string,
    key: string,
    blob?: Blob,
    defaultValue?: string
): [
    string | undefined,
    React.Dispatch<React.SetStateAction<string | undefined>>
] {
    const [imgURl, setImgUrl] = useState<string | undefined>(defaultValue);
    const dispatch = useAppDispatch();
    const isSignedIn = useAppSelector((state) => state.user.isSingIn);
    const userId = useAppSelector((state) => {
        if (state.user.isSingIn) {
            return state.user.user._id;
        }
        return false;
    });

    useEffect(() => {
        if (!isSignedIn && blob) dispatch(LoginModelActions.open());
    }, [blob]);
    useEffect(() => {
        const token = Cookies.get("token");
        if (!blob || !token) return;

        const ext = mime.getExtension(blob.type);
        if (!ext || !["png", "jpg", "jpeg"].includes(ext))
            throw new Error(`un recognized type ${blob.type}`);
        const hash = crypto
            .createHash("sha256")
            .update(userId + key)
            .digest()
            .toString("base64")
            .replaceAll(/[?&#\\%<>+/]/g, "");

        const formData = new FormData();
        formData.append("name", hash);
        formData.append("img", blob, `image.${ext}`);

        axios
            .post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setImgUrl(res.data.data.url);
            })
            .catch((err) => {
                setImgUrl(undefined);
            });
    }, [blob]);
    return [imgURl, setImgUrl];
}
