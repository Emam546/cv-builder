import { UploadedFile } from "express-fileupload";
import {
    UploadApiOptions,
    UploadApiResponse,
    v2 as cloudinary,
} from "cloudinary";
import stream from "stream";
import fs from "fs";
import path from "path";
export function UploadCloudinary(img: UploadedFile, opt?: UploadApiOptions) {
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
        readableStream.push(img.data);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
    });
}
export function UploadLocalImage(
    img: UploadedFile,
    folder: string,
    name: string
) {
    const p = path.join("./public/users", folder);
    if (!fs.existsSync(p)) fs.mkdirSync(p);
    fs.writeFileSync(path.join(p, name), img.data);
    return path.join("/users", folder, name).replaceAll("\\", "/");
}
