import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { DependencyList } from "react";
import { useAppDispatch, useAppSelector } from "@src/store";
import { LoginModelActions } from "@src/components/loginModel";
import { DeleteFile, UploadFile } from ".";
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
    name: string
): (blob: Blob) => Promise<string> {
    const dispatch = useAppDispatch();
    const isSignedIn = useAppSelector((state) => state.user.isSingIn);
    async function Update(blob: Blob) {
        if (!isSignedIn) {
            dispatch(LoginModelActions.open());
            return "";
        }
        return UploadFile(url, name, blob);
    }
    return Update;
}

export function useDeleteFile(url: string, filename: string) {
    const dispatch = useAppDispatch();
    const isSignedIn = useAppSelector((state) => state.user.isSingIn);
    async function Update() {
        if (!isSignedIn) {
            dispatch(LoginModelActions.open());
            return "";
        }
        return await DeleteFile(url, filename);
    }
    return Update;
}
