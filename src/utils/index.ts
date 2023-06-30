import { AxiosRequestConfig } from "axios";
import { v4 as _uuid } from "uuid";
import Cookies from "js-cookie";

export function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !("nodeType" in e)) {
        throw new Error(`Node expected`);
    }
}
export function copyObject<T>(obj: T): T {
    return MakeItSerializable(obj);
}
export function hasOwnProperty<K extends PropertyKey, T>(
    obj: unknown,
    key: K
): obj is Record<K, T> {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
export function MakeItSerializable<T>(val: T): T {
    return JSON.parse(JSON.stringify(val));
}
export function uuid() {
    return _uuid();
}
export function getHeaders<T>(){
    const token = Cookies.get("token");
    return {
        Authorization: `Bearer ${token}`,
    } as AxiosRequestConfig<T>["headers"];

}
