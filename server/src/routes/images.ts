/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import EnvVars from "@serv/declarations/major/EnvVars";
import { UploadedFile } from "express-fileupload";
import mime from "mime";
import { assertIsAuth } from "@serv/util/utils";
import rateLimiter from "express-rate-limit";
import {
    UploadCloudinary,
    DeleteCloudinary,
    DeleteLocalImage,
    UploadLocalImage,
} from "@serv/util/uploadImage";
import { NodeEnvs } from "@serv/declarations/enums";
import logger from "@serv/logger";
cloudinary.config(EnvVars.cloudinary);
const router = Router();
export const MaxSize = 2 * 1024 * 1024;
if (EnvVars.nodeEnv == NodeEnvs.Production) {
    router.use(
        rateLimiter({
            max: 3,
        })
    );
}
router
    .route("/")
    .post(async (req, res) => {
        assertIsAuth(req);
        if (!req.files?.img)
            return res.status(400).json({
                status: false,
                msg: "img data is missed",
            });
        const img = req.files.img as UploadedFile;
        if (typeof req.body.name != "string")
            return res.status(400).json({ status: false, msg: "invalid name" });
        if (EnvVars.nodeEnv == NodeEnvs.Production && img.size > MaxSize) {
            return res.status(400).json({
                status: false,
                msg: "File size limit exceeded: 2MB maximum.",
            });
        }
        const ext = mime.getExtension(img.mimetype);

        if (!ext || !["png", "jpg", "jpeg", "pdf"].includes(ext))
            return res
                .status(400)
                .json({ status: false, msg: "Invalid file extention" });
        if (!EnvVars.APPLY_LOCAL) {
            const result = await UploadCloudinary(img, {
                public_id: req.body.name,
                format: ext,
                folder: req.user._id,
            });
            res.status(200).json({
                status: true,
                msg: "file uploaded successfully",
                data: {
                    url: result?.url,
                },
            });
        } else {
            const url = UploadLocalImage(
                img,
                req.user._id,
                `${req.body.name as string}.${ext}`
            );
            res.status(200).json({
                status: true,
                msg: "file uploaded successfully",
                data: {
                    url: url,
                },
            });
        }
    })
    .delete(async (req, res) => {
        assertIsAuth(req);
        const fileName = req.body.name;
        if (typeof fileName != "string")
            return res.status(401).json({
                status: false,
                msg: "filename is not exist",
            });
        if (!EnvVars.APPLY_LOCAL) {
            await DeleteCloudinary(fileName);
            res.status(200).json({
                status: true,
                msg: "file deleted successfully",
            });
        } else {
            DeleteLocalImage(fileName);
            res.status(200).json({
                status: true,
                msg: "file deleted successfully",
            });
        }
    });

export default router;
