import { RequestHandler } from "express";

export  function parseMultiFormData(
    ...[req, res, next]: Parameters<RequestHandler>
) {
    if (req.headers["content-type"]?.startsWith("multipart/form-data"))
        for (const key in req.body) req.body[key] = JSON.parse(req.body[key]);

    next();
}

