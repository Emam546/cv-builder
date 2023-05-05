/* eslint-disable react/display-name */
import React, {
    ForwardRefExoticComponent,
    ForwardRefRenderFunction,
    PropsWithoutRef,
    RefAttributes,
    useEffect,
    useState,
} from "react";
import {
    FieldPath,
    FieldValues,
    Path,
    PathValue,
    UseFormReturn,
} from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { PrimaryProps } from "./Elem";
import { FieldsType } from "./types";
import { LabelElem } from "../inputs/styles";
import classNames from "classnames";
export type ListData<T, Name extends string> = {
    [f in Name]: T[];
};
export interface ListProps<T extends FieldValues, Name extends string>
    extends PrimaryProps {
    values: T;
    index: number;
    form: UseFormReturn<ListData<T, Name>>;
}

export type ListElemType<
    T extends FieldValues,
    Name extends string
> = ForwardRefExoticComponent<
    PropsWithoutRef<ListProps<T, Name>> & RefAttributes<HTMLLIElement>
>;
export function forwardRef<
    T extends FieldValues,
    Name extends string,
    ADDProps = {}
>(
    render: ForwardRefRenderFunction<HTMLLIElement, ListProps<T, Name>>
): ListElemType<T, Name> {
    return React.forwardRef(render);
}

export default function InfoGetter<T extends FieldsType, Name extends string>({
    name,
    initData,
    addButtonLabel = "Add",
    Elem,
    formRegister,
    label,
    noDragging,
}: {
    name: Name;
    formRegister: UseFormReturn<ListData<T, Name>>;
    initData: T;
    addButtonLabel: string;
    Elem: ForwardRefExoticComponent<
        PropsWithoutRef<ListProps<T, Name>> & RefAttributes<HTMLLIElement>
    >;
    label: string;
    noDragging?: boolean;
}) {
    const { control, setValue, getValues } = formRegister;

    const [EmploymentsData, setEmploymentData] = useState<T[]>(
        (control._defaultValues[name] as T[]) || []
    );
    const keys = {
        root: `${name}` as FieldPath<ListData<T, Name>>,
        data_i(i: number): FieldPath<ListData<T, Name>> {
            return `${this.root}.${i}` as Path<ListData<T, Name>>;
        },
        data_i_key(i: number, key: string): FieldPath<ListData<T, Name>> {
            return `${this.data_i(i)}.${key}` as Path<ListData<T, Name>>;
        },
    };
    // const value = useWatch({ control, name: `${name}_data` });
    const [dragger, setDragging] = useState<[boolean, number | null]>([
        false,
        null,
    ]);
    const [allEle, setAllEle] = useState<HTMLElement[]>([]);
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
            const data = indexes.map((i) =>
                getValues(keys.data_i(i))
            ) as PathValue<ListData<T, Name>, Path<ListData<T, Name>>>;
            setValue(keys.root, data);
            setEmploymentData((pre) => indexes.map((i) => pre[i]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dragger]);

    return (
        <LabelElem
            label={label}
            className=""
        >
            <div>
                <div
                    className={classNames({
                        "pl-5": !noDragging,
                    })}
                >
                    <ul className="space-y-4 transition-all duration-700 mb-1">
                        {EmploymentsData.map((data, i) => {
                            return (
                                <Elem
                                    noDragging={noDragging}
                                    index={i}
                                    key={i}
                                    deleteSelf={() => {
                                        setEmploymentData(
                                            EmploymentsData.filter(
                                                (_, ix) => ix != i
                                            )
                                        );
                                    }}
                                    form={formRegister}
                                    onDragStart={(ele) =>
                                        setDragging([true, i])
                                    }
                                    onDragOver={(ele) =>
                                        setDragging([false, i])
                                    }
                                    onDrag={function (ev) {
                                        if (i != dragger[1]) return;
                                        const rect =
                                            this.getBoundingClientRect();
                                        setYpos(
                                            rect.top +
                                                rect.height / 2 +
                                                window.scrollY
                                        );
                                    }}
                                    ref={(ele) => {
                                        if (!ele) return;
                                        setAllEle((pre) => [...pre, ele]);
                                    }}
                                    values={data}
                                />
                            );
                        })}
                    </ul>
                </div>
                <button
                    className="text-blue-60 font-bold hover:bg-blue-10 transition-all block w-full py-3 text-start px-4 space-x-2"
                    onClick={() => {
                        const data = { ...initData };
                        setEmploymentData((pre) => [...pre, data]);
                        setValue(
                            keys.data_i(EmploymentsData.length),
                            data as any
                        );
                    }}
                >
                    <FontAwesomeIcon icon={faAdd} />
                    <span>{addButtonLabel}</span>
                </button>
            </div>
        </LabelElem>
    );
}
