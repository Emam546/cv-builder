/* eslint-disable react/display-name */
import React, {
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes,
    useEffect,
    useState,
} from "react";

export interface PrimaryProps {
    deleteSelf: (this: HTMLDivElement) => any;
    onDragOver?: (ele: HTMLDivElement) => any;
    onDrag?: (this: HTMLDivElement, ev: MouseEvent) => any;
    onDragStart?: (ele: HTMLDivElement) => any;
    noDragging?: boolean;
}
export interface ListProps<P = {}> extends PrimaryProps {
    index: number;
    props: P;
}
export type ElemType<P = {}> = ForwardRefExoticComponent<
    PropsWithoutRef<ListProps<P>> & RefAttributes<HTMLDivElement>
>;
export default function ElemGenerator<P = {}>({
    Elem,
    noDragging,
    resort,
    deleteSelf,
    data,
}: {
    Elem: ElemType<P>;
    data: P[];
    deleteSelf?: (i: number) => any;
    resort?: (indexes: number[]) => void;
    noDragging?: boolean;
}) {
    const [dragger, setDragging] = useState<[boolean, number | null]>([
        false,
        null,
    ]);
    const [allEle, setAllEle] = useState<HTMLDivElement[]>([]);
    const [ypos, setYpos] = useState(0);
    useEffect(() => {
        const [state, index] = dragger;
        if (index == null) return;
        const ele = allEle[index];

        if (!ele) return;
        if (!state) {
            const indexes = allEle
                .map<[number, number]>((ele, i) => {
                    if (i == index) return [ypos, i];
                    const rect = ele.getBoundingClientRect();
                    return [rect.top + rect.height / 2 + window.scrollY, i];
                })
                .sort((a, b) => a[0] - b[0])
                .map(([_, i]) => i);
            if (resort) resort(indexes);
        }
    }, [dragger]);
    return (
        <div className="space-y-4 transition-all duration-700 mb-1">
            {data.map((props, i) => {
                return (
                    <Elem
                        noDragging={noDragging}
                        index={i}
                        key={i}
                        deleteSelf={() => deleteSelf && deleteSelf(i)}
                        onDragStart={(ele) => setDragging([true, i])}
                        onDragOver={(ele) => setDragging([false, i])}
                        onDrag={function (ev) {
                            if (i != dragger[1]) return;
                            const rect = this.getBoundingClientRect();
                            setYpos(
                                rect.top + rect.height / 2 + window.scrollY
                            );
                        }}
                        ref={(ele) => {
                            if (!ele) return;
                            setAllEle((pre) => [...pre, ele]);
                        }}
                        props={props}
                    />
                );
            })}
        </div>
    );
}
