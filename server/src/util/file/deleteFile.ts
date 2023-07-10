import EnvVars from "@serv/declarations/major/EnvVars";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";
import { exist } from "./utils";
function getPublicIdFromUrl(publicUrl: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const publicId = publicUrl.split("/").pop()!.split(".")[0];
    return publicId;
}
export async function DeleteCloudinary(public_id: string, userId: string) {
    await cloudinary.uploader.destroy(
        userId + "/" + getPublicIdFromUrl(public_id),
        {
            invalidate: true,
            type: "upload",
        }
    );
}
export async function DeleteLocalImage(name: string, userId: string) {
    const publicId = getPublicIdFromUrl(name);

    const p = path.join(
        "./public/users",
        userId,
        publicId + path.extname(name)
    );
    if ((await exist(p)) && (await fs.stat(p)).isFile()) await fs.unlink(p);
    return name;
}

export async function DeleteFile(fileName: string, userId: string) {
    if (!EnvVars.APPLY_LOCAL) {
        await DeleteCloudinary(fileName, userId);
    } else await DeleteLocalImage(fileName, userId);
}
