import axios, { AxiosRequestConfig } from "axios";
import { v4 as _uuid } from "uuid";
import Cookies from "js-cookie";
import crypto from "crypto";

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
export function getAuthHeaders<T>() {
    const token = Cookies.get("token");
    return {
        Authorization: `Bearer ${token}`,
    } as AxiosRequestConfig<T>["headers"];
}
const MaxSize = 2 * 1024 * 1024;

export function checkFile(e: React.ChangeEvent<HTMLInputElement>) {
    const length = e.target.files?.length;
    return Promise.all(
        [new Array(length).fill(0)].map((_, i) => {
            const file = e.target!.files![i];
            return new Promise<string>((res, rej) => {
                if (file.size > MaxSize)
                    return rej("File size limit exceeded: 2MB maximum.");

                const reader = new FileReader();
                reader.addEventListener("load", () =>
                    res(reader.result?.toString() || "")
                );
                reader.readAsDataURL(file);
            });
        })
    );
}
export async function DeleteFile(url: string, name: string) {
    const token = Cookies.get("token");
    if (!token) return;
    await axios.delete(url, {
        data: {
            name: name,
        },
        headers: {
            ...getAuthHeaders(),
        },
    });
}
