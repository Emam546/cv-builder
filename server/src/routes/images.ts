/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import EnvVars from "@serv/declarations/major/EnvVars";
import { UploadedFile } from "express-fileupload";
import stream from "stream";
import mime from "mime";
import { assertIsAuth } from "@serv/util/utils";
import rateLimiter from "express-rate-limit";
cloudinary.config(EnvVars.cloudinary);
const router = Router();
router.use(
    rateLimiter({
        max: 3,
    })
);
router.route("/").post((req, res) => {
    assertIsAuth(req);
    if (req.files?.img) {
        const img = req.files?.img as UploadedFile;
        if (typeof req.body.name != "string")
            return res.status(400).json({ status: false, msg: "invalid name" });

        const ext = mime.getExtension(img.mimetype);

        if (!ext || !["png", "jpg", "jpeg"].includes(ext))
            return res
                .status(400)
                .json({ status: false, msg: "Invalid file extention" });

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                public_id: req.body.name,
                format: ext,
                allowed_formats: ["png", "jpg", "jpeg"],
                overwrite: true,
                folder: req.user._id,
                unique_filename: false,
                resource_type: "image",
            },
            function (error, result) {
                if (error) {
                    res.status(504).json({
                        status: true,
                        msg: "Error happened",
                        err: error,
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        msg: "image Uploaded successfully",
                        data: result,
                    });
                }
            }
        );
        const readableStream = new stream.Readable();
        readableStream.push(img.data);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
        // stream.Readable.from(img.data).pipe(uploadStream);
    } else {
        res.status(400).json({
            status: false,
            msg: "img data is missed",
        });
    }

    // return res.public_id;
});

export default router;
