import { copyObject, hasOwnProperty, uuid } from "@src/utils";
import { PSchema } from "./EleGen";
function hasId(val: unknown): val is { id: string } {
    return hasOwnProperty(val, "id") && typeof val.id == "string";
}
function isRecord(value: any): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isArrayRecord(val: unknown): val is Record<string, unknown>[] {
    return Array.isArray(val) && isRecord(val[0]);
}
export function changeId<T extends Record<string, unknown>>(val: T) {
    if (hasId(val)) val.id == uuid();
    Object.keys(val).forEach((key) => {
        const ele = val[key];
        if (isArrayRecord(ele)) ele.forEach((val) => changeId(val));
        if (isRecord(ele)) changeId(ele);
    });
}
export function Duplicate<T extends PSchema>(value: T) {
    const data = copyObject(value);
    if (isRecord(data)) changeId(data);
    return data;
}
