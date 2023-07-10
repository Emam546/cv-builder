import { useRef, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import ElemGenerator, { ElemType, PSchema } from "./EleGen";
import DeleteAlert from "@src/components/common/deleteAlert";
export type NameRules = `${string}.data` | string;
export interface ListProps<FormData extends FieldValues> extends PSchema {
    index: number;
    form: UseFormReturn<FormData>;
    name: string;
    id: string;
}

export type ListElemType<FormData extends FieldValues> = ElemType<
    ListProps<FormData>
>;
export interface Data<T> {
    [k: NameRules]: T[];
}
export interface Props<T extends PSchema> {
    formRegister: UseFormReturn<Data<T>>;
    initData: () => T;
    addButtonLabel: string;
    Elem: ListElemType<Data<T>>;
    noDragging?: boolean;
    onDeleteElem?: (v: T) => Promise<void>;
    keys: {
        root: string;
        data: NameRules;
    };
    onDuplicateElem?: (val: T, path: string) => Promise<T>;
}
export default function MainInfoGetter<T extends PSchema>({
    initData,
    addButtonLabel = "Add",
    Elem,
    formRegister,
    noDragging,
    onDeleteElem,
    keys,
    onDuplicateElem,
}: Props<T>) {
    const { setValue, getValues } = formRegister;
    const [EleData, setEleData] = useState(getValues(keys.data));
    const [process, setProcess] = useState(false);
    const [open, setOpen] = useState(false);
    const lastData = useRef<[T, number]>();
    const [loadingElem, setLoadingElem] = useState(false);
    const [errDeleting, setErrDeleting] = useState<string>();
    const [message, setMessage] = useState("");

    function undo() {
        if (!lastData.current) return;
        const allData = getValues(keys.data);
        const newArr = [
            ...allData.slice(0, lastData.current[1]),
            lastData.current[0],
            ...allData.slice(lastData.current[1], allData.length),
        ];
        lastData.current = undefined;
        setValue(keys.data, newArr as any);
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
            <div>
                <div
                    className={classNames({
                        "pl-5": !noDragging,
                    })}
                >
                    <ElemGenerator
                        noDragging={noDragging}
                        Elem={Elem}
                        data={EleData.map((val, i) => ({
                            index: i,
                            form: formRegister,
                            name: keys.root,
                            id: val.id,
                        }))}
                        onResort={(indexes) => {
                            const allData = getValues(keys.data);
                            const data = indexes
                                .map((i) => allData[i])
                                .filter((val) => val);
                            setValue(keys.data, data);
                            setEleData(data);
                        }}
                        onDuplicate={
                            onDuplicateElem &&
                            ((xid) => {
                                const allData = getValues(keys.data);
                                const val = allData.find(({ id }) => xid == id);
                                if (!val) throw new Error("undefined instance");
                                setLoadingElem(true);
                                setProcess(true);
                                setMessage("Duplicating element");
                                onDuplicateElem(val, keys.data)
                                    .then((data) => {
                                        setValue(keys.data, [
                                            ...allData,
                                            data,
                                        ] as any);
                                        setEleData([...allData, data]);
                                    })
                                    .catch((err) => {
                                        setErrDeleting(err.message);
                                        setOpen(true);
                                    })
                                    .finally(() => {
                                        setLoadingElem(false);
                                        setProcess(false);
                                    });
                            })
                        }
                        onDelete={(xid) => {
                            onClose().then(() => {
                                setMessage("Element successfully deleted");
                                const allData = getValues(keys.data);
                                const data = allData.filter(
                                    ({ id }) => id != xid
                                );
                                lastData.current = [
                                    allData.find(({ id }) => id == xid) as T,
                                    allData.findIndex(({ id }) => id == xid),
                                ];
                                setValue(keys.data, data);
                                setEleData([...data]);
                                setOpen(true);
                            });
                        }}
                    />
                </div>
                <button
                    className="text-blue-60 font-bold hover:bg-blue-10 transition-all block w-full py-3 text-start px-4 space-x-2"
                    onClick={() => {
                        const data = initData();
                        const preData = getValues(keys.data);
                        setValue(keys.data, [...preData, data]);
                        setEleData([...preData, data]);
                    }}
                    type="button"
                    aria-label="add"
                >
                    <FontAwesomeIcon icon={faAdd} />
                    <span>{addButtonLabel}</span>
                </button>
            </div>

            <DeleteAlert
                deps={[lastData.current]}
                open={open || process}
                message={
                    errDeleting ? `Error happened:${errDeleting}` : message
                }
                setClose={onClose}
                undo={() => {
                    undo();
                    setOpen(false);
                }}
                error={errDeleting != undefined}
                loading={loadingElem}
            />
        </>
    );
}
