import axios, { AxiosRequestConfig } from "axios";
import { v4 as _uuid } from "uuid";
import Cookies from "js-cookie";
import mime from "mime";
import { checkMimeType } from "@serv/routes/images/utils";
import { MaxSize } from "@serv/routes/images/constants";
axios.defaults.withCredentials = true;
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
export async function UploadFile(url: string, name: string, blob: Blob) {
    const token = Cookies.get("token");
    if (!token) return "";
    const ext = mime.getExtension(blob.type);

    if (!checkMimeType(blob.type))
        throw new Error(`Un recognized type ${blob.type}`);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("img", blob, `image.${ext}`);

    const res = await axios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data.data.url;
}
export async function DeleteFile(url: string, name: string) {
    const token = Cookies.get("token");
    if (!token) return;
    if (!name) return;
    await axios.delete(url, {
        data: {
            name: name,
        },
    });
}
export function formateDate(date: Date, sep: string = "-") {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed, so we add 1
    const day = date.getDate().toString().padStart(2, "0");

    // Create the formatted date string
    return `${year}${sep}${month}${sep}${day}`;
}
