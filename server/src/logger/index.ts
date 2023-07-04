import { NodeEnvs } from "@serv/declarations/enums";
import EnvVars from "@serv/declarations/major/EnvVars";
import { transports, format, createLogger, Logger } from "winston";
// eslint-disable-next-line node/no-extraneous-import
import "winston-mongodb";
const colorizer = format.colorize();
let logger: Logger = createLogger({
    transports: [
        new transports.Console({
            level: "warn",
        }),
    ],
    format: format.combine(
        format.printf((info) => {
            const level = colorizer.colorize(
                info.level,
                info.level.toUpperCase()
            );
            const message = colorizer.colorize(
                info.level,
                info.message as string
            );
            return `${level}: ${message}`;
        }),

        format.errors({ stack: true })
    ),
});
if (EnvVars.nodeEnv == NodeEnvs.Production) {
    logger = createLogger({
        transports: [
            new transports.File({
                level: "error",
                filename: "production.log",
            }),
            new transports.MongoDB({
                level: "error",
                db: EnvVars.MONGODB_URL,
                dbName: "Resume_logs",
                collection: "logs",
            }),
        ],
        format: format.combine(
            format.json(),
            format.metadata(),
            format.timestamp(),
            format.errors({ stack: true })
        ),
    });
}
export default logger;
