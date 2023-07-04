import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";

import BaseRouter from "./routes";
import logger from "@serv/logger";
import EnvVars from "@serv/declarations/major/EnvVars";
import HttpStatusCodes from "@serv/declarations/major/HttpStatusCodes";
import { NodeEnvs } from "@serv/declarations/enums";
import { RouteError } from "@serv/declarations/classes";
import expressWinstom from "express-winston";
import passport from "./passport.config";
import fileUpload from "express-fileupload";
// **** Init express **** //

const app = express();

// **** Set basic express settings **** //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.cookieProps.secret));
app.use(fileUpload());
app.use(
    expressWinstom.logger({
        winstonInstance: logger,
        statusLevels: true,
    })
);
//Initialize Passport
app.use(passport.initialize());
// app.use(passport.session());

// Security
if (EnvVars.nodeEnv === NodeEnvs.Production) {
    app.use(
        helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
        })
    );
}

// **** Add API routes **** //

// Add APIs
app.use("/api/v1", BaseRouter);

// Setup error handler
app.use(
    (
        err: Error,
        _: Request,
        res: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: NextFunction
    ) => {
        logger.error(err);
        let status = HttpStatusCodes.BAD_REQUEST;
        if (err instanceof RouteError) {
            status = err.status;
        }
        return res.status(status).json({ status: false, msg: err.message });
    }
);

// **** Export default **** //

export default app;
