/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RequestHandler } from "express";

export function parseMultiFormData(
    ...[req, , next]: Parameters<RequestHandler>
) {
    if (req.headers["content-type"]?.startsWith("multipart/form-data"))
        for (const key in req.body) req.body[key] = JSON.parse(req.body[key]);

    next();
}
