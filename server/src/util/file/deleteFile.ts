import EnvVars from "@serv/declarations/major/EnvVars";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";
import { exist } from "./utils";
import { RouteError } from "@serv/declarations/classes";
function getPublicIdFromUrl(publicUrl: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const publicId = publicUrl.split("/").pop()!.split(".")[0];
    return publicId;
}
export async function DeleteCloudinary(public_id: string, userId: string) {
    const publicId = userId + "/" + getPublicIdFromUrl(public_id);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await cloudinary.uploader.destroy(publicId, {
        invalidate: true,
        type: "upload",
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (result.result != "ok")
        throw new RouteError(404, "The image is not exist");
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
