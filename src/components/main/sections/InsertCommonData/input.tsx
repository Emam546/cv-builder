import React, { ForwardRefRenderFunction, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { WrapElem } from "@src/components/common/inputs/styles";
import classNames from "classnames";
import ElemGenerator, {
    ElemType,
    ListProps as OrgListProps,
    PSchema,
} from "./EleGen";
import { Duplicate } from "./utils";
import DeleteAlert from "./deleteAlert";
export type NameRules = string;
export interface ListProps<T> extends PSchema {
    index: number;
    form: UseFormReturn<ListData<T, NameRules>>;
    name: string;
    id: string;
}

export type ListElemType<T> = ElemType<ListProps<T>>;
export function forwardRef<T extends PSchema>(
    render: ForwardRefRenderFunction<HTMLDivElement, OrgListProps<ListProps<T>>>
): ListElemType<T> {
    return React.forwardRef(render);
}
export default function InfoGetter<T extends PSchema>({
    name,
    initData,
    addButtonLabel = "Add",
    Elem,
    formRegister,
    label,
    noDragging,
    onDeleteElem,
}: {
    name: NameRules;
    formRegister: UseFormReturn<ListData<T, NameRules>>;
    initData: () => T;
    addButtonLabel: string;
    Elem: ListElemType<T>;
    label?: string;
    noDragging?: boolean;
    onDeleteElem?: (v: T) => Promise<void>;
}) {
    const { setValue, getValues } = formRegister;
    const keys = {
        root: `${name}`,
        data_i(i: number) {
            return `${this.root}.${i}`;
        },
        data_i_key(i: number, key: string) {
            return `${this.data_i(i)}.${key}`;
        },
    };
    const [EleData, setEleData] = useState(getValues(name));
    const [open, setOpen] = useState(false);
    const lastData = useRef<[T, number]>();
    const [loadingElem, setLoadingElem] = useState(false);
    const [errDeleting, setErrDeleting] = useState<string>();

    function undo() {
        if (!lastData.current) return;
        const allData = getValues(`${name}`);
        const newArr = [
            ...allData.slice(0, lastData.current[1]),
            lastData.current[0],
            ...allData.slice(lastData.current[1], allData.length),
        ];
        lastData.current = undefined;
        setValue(`${name}`, newArr as any);
        setEleData(newArr);
    }
    function onClose() {
        return new Promise((res) => {
            if (!lastData.current) {
                setOpen(false);
                setErrDeleting(undefined);
                return res(true);
            }
            if (onDeleteElem) {
                setLoadingElem(true);
                return onDeleteElem(lastData.current[0])
                    .then(() => {
                        lastData.current = undefined;
                        setErrDeleting(undefined);
                        setOpen(false);
                        res(true);
                    })
                    .catch((err) => {
                        undo();
                        setErrDeleting(err.message);
                        res(false);
                    })
                    .finally(() => setLoadingElem(false));
            } else {
                lastData.current = undefined;
                setErrDeleting(undefined);
                setOpen(false);
                res(true);
            }
        });
    }
    return (
        <>
            <WrapElem label={label}>
                <div>
                    <div
                        className={classNames({
                            "pl-5": !noDragging,
                        })}
                    >
                        <div className="space-y-4 transition-all duration-700 mb-1">
                            <ElemGenerator
                                noDragging={noDragging}
                                Elem={Elem}
                                data={EleData.map((val, i) => ({
                                    index: i,
                                    form: formRegister,
                                    name,
                                    id: val.id,
                                }))}
                                resort={(indexes) => {
                                    const allData = getValues(`${name}`);
                                    const data = indexes
                                        .map((i) => allData[i])
                                        .filter((val) => val);
                                    setValue(keys.root, data);
                                    setEleData(data);
                                }}
                                onDuplicate={(xid) => {
                                    const allData = getValues(`${name}`);
                                    const val = allData.find(
                                        ({ id }) => xid == id
                                    );
                                    if (!val)
                                        throw new Error("undefined instance");
                                    const data = Duplicate(val);
                                    setValue(keys.root, [...allData, data]);
                                    setEleData([...allData, data]);
                                }}
                                onDelete={(xid) => {
                                    onClose().then(() => {
                                        const allData = getValues(`${name}`);
                                        const data = allData.filter(
                                            ({ id }) => id != xid
                                        );
                                        lastData.current = [
                                            allData.find(
                                                ({ id }) => id == xid
                                            ) as T,
                                            allData.findIndex(
                                                ({ id }) => id == xid
                                            ),
                                        ];
                                        setValue(keys.root, data);
                                        setEleData([...data]);
                                        setOpen(true);
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <button
                        className="text-blue-60 font-bold hover:bg-blue-10 transition-all block w-full py-3 text-start px-4 space-x-2"
                        onClick={() => {
                            const data = initData();
                            const preData = getValues(keys.root);
                            setValue(name, [...preData, data]);
                            setEleData([...preData, data]);
                        }}
                        type="button"
                        aria-label="add"
                    >
                        <FontAwesomeIcon icon={faAdd} />
                        <span>{addButtonLabel}</span>
                    </button>
                </div>
            </WrapElem>
            <DeleteAlert
                deps={[lastData.current]}
                open={open}
                setClose={onClose}
                undo={() => {
                    undo();
                    setOpen(false);
                }}
                loading={loadingElem}
                error={errDeleting}
            />
        </>
    );
}
