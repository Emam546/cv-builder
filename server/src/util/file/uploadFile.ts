import { UploadedFile } from "express-fileupload";
import {
    UploadApiOptions,
    UploadApiResponse,
    v2 as cloudinary,
} from "cloudinary";
import stream from "stream";
import fs from "fs/promises";
import path from "path";
import EnvVars from "@serv/declarations/major/EnvVars";
import crypto from "crypto";
import { exist } from "./utils";
function UploadCloudinary(file: UploadedFile, opt?: UploadApiOptions) {
    return new Promise<UploadApiResponse | undefined>((res, rej) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                allowed_formats: ["png", "jpg", "jpeg"],
                overwrite: true,
                unique_filename: false,
                resource_type: "image",
                ...opt,
            },
            function (error, result) {
                if (error) {
                    rej(error);
                } else {
                    res(result);
                }
            }
        );
        const readableStream = new stream.Readable();
        readableStream.push(file.data);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
    });
}

async function UploadLocalImage(
    file: UploadedFile,
    folder: string,
    name: string
) {
    const p = path.join("./public/users", folder);
    if (!(await exist(p))) await fs.mkdir(p, { recursive: true });
    await fs.writeFile(path.join(p, name), file.data);
    return path.join("/users", folder, name).replaceAll("\\", "/");
}

export async function UploadFile(
    img: UploadedFile,
    name: string,
    ext: string,
    folder: string,
    userId: string
) {
    const hash = crypto
        .createHash("sha256")
        .update(userId + name)
        .digest()
        .toString("base64")
        .replaceAll(/[?&#\\%<>+=/]/g, "");
    if (!EnvVars.APPLY_LOCAL) {
        const result = await UploadCloudinary(img, {
            public_id: hash,
            format: ext || undefined,
            folder: folder,
        });
        return result?.url || "";
    } else {
        const url = UploadLocalImage(img, folder, `${hash}.${ext}`);
        return url;
    }
}
