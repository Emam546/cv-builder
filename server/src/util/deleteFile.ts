import EnvVars from "@serv/declarations/major/EnvVars";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";
export async function DeleteCloudinary(public_id: string) {
    await cloudinary.uploader.destroy(public_id, {});
}
export async function DeleteLocalImage(name: string) {
    const p = path.join("./public", name);
    if ((await fs.stat(p)).isFile()) await fs.unlink(p);
    return name;
}

export async function DeleteFile(fileName: string) {
    if (!EnvVars.APPLY_LOCAL) {
        await DeleteCloudinary(fileName);
    } else DeleteLocalImage(fileName);
}
