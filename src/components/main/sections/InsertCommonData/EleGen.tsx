import { uuid } from "@src/utils";
import React, {
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes,
    useRef,
    useState,
} from "react";

export interface PrimaryProps {
    onDelete?: (this: HTMLDivElement) => any;
    onDuplicate?: (this: HTMLDivElement) => any;
    onDragOver?: (ele: HTMLDivElement) => any;
    onDrag?: (this: HTMLDivElement, ev: Event) => any;
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
export interface PSchema {
    id: string;
}
export default function ElemGenerator<P extends PSchema>({
    Elem,
    noDragging,
    onResort,
    onDelete: deleteSelf,
    data,
    onDuplicate: duplicate,
}: {
    Elem: ElemType<P>;
    data: P[];
    onDelete?: (id: string) => any;
    onDuplicate?: (id: string) => any;
    onResort?: (indexes: string[]) => void;
    noDragging?: boolean;
}) {
    const allEle = useRef<HTMLDivElement[]>([]);
    allEle.current.length = data.length;
    return (
        <div className="flex flex-col items-stretch space-y-4 transition-all duration-700 mb-1">
            {data.map((props, i) => {
                return (
                    <Elem
                        onDuplicate={duplicate && (() => duplicate(props.id))}
                        noDragging={noDragging}
                        index={i}
                        onDelete={
                            deleteSelf &&
                            (() => {
                                deleteSelf(props.id);
                            })
                        }
                        key={`${props.id}_${i}`}
                        onDragOver={(ele) => {
                            const indexes = allEle.current
                                .map<[number, number]>((ele, i) => {
                                    const rect = ele.getBoundingClientRect();
                                    return [
                                        rect.top +
                                            rect.height / 2 +
                                            window.scrollY,
                                        i,
                                    ];
                                })
                                .sort((a, b) => a[0] - b[0])
                                .map(([, i]) => i);
                            if (onResort)
                                onResort(indexes.map((i) => data[i].id));
                        }}
                        ref={(ele) => {
                            if (!ele) return;
                            allEle.current[i] = ele;
                        }}
                        props={props}
                    />
                );
            })}
        </div>
    );
}
