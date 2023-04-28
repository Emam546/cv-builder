import React, { useEffect, useRef } from "react";
import { useState } from "react";

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
export function useSmoothExpand<T extends HTMLElement>(
    initialValue: T | null,
    expand: boolean
) {
    const ref = useRef<T>(initialValue);
    // useEffect(() => {
    //     if (!ref.current) return;
    //     if (expand) {
    //         ref.current.style.height = ref.current.clientHeight + "px";
    //     } else ref.current.style.height = "auto";
    // }, [ref, expand]);
    return ref;
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
    },deps);
}
