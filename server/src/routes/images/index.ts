/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import EnvVars from "@serv/declarations/major/EnvVars";
import { UploadedFile } from "express-fileupload";
import mime from "mime";
import { assertIsAuth } from "@serv/util/utils";
import rateLimiter from "express-rate-limit";
import { UploadFile } from "@serv/util/file/uploadFile";
import { DeleteFile } from "@serv/util/file/deleteFile";
import { NodeEnvs } from "@serv/declarations/enums";
import { checkMimeType } from "./utils";
import { MaxSize } from "./constants";
cloudinary.config(EnvVars.cloudinary);
const router = Router();

router
    .route("/")
    .post(
        rateLimiter({
            max: 100,
        }),
        async (req, res) => {
            assertIsAuth(req);
            if (!req.files?.img)
                return res.status(400).json({
                    status: false,
                    msg: "img data is missed",
                });
            const img = req.files.img as UploadedFile;
            const name = req.body.name;
            if (typeof name != "string")
                return res
                    .status(400)
                    .json({ status: false, msg: "invalid name" });
            if (EnvVars.nodeEnv == NodeEnvs.Production && img.size > MaxSize) {
                return res.status(400).json({
                    status: false,
                    msg: "File size limit exceeded: 2MB maximum.",
                });
            }
            const ext = mime.getExtension(img.mimetype);
            if (!checkMimeType(img.mimetype))
                return res
                    .status(400)
                    .json({ status: false, msg: "Invalid file extension" });

            const url = await UploadFile(
                img,
                name,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ext!,
                req.user._id,
                req.user._id
            );
            res.status(200).json({
                status: true,
                msg: "file uploaded successfully",
                data: {
                    url: url,
                },
            });
        }
    )
    .delete(async (req, res) => {
        assertIsAuth(req);
        const fileName = req.body.name;
        if (typeof fileName != "string")
            return res.status(401).json({
                status: false,
                msg: "filename is not exist",
            });
        if (!fileName.includes(req.user._id))
            return res.status(401).json({
                status: false,
                msg: "you has no access",
            });
        await DeleteFile(fileName);
        res.status(200).json({
            status: true,
            msg: "file deleted successfully",
        });
    });

export default router;
