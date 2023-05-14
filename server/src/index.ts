import "./pre-start"; // Must be the first import
import logger from "@serv/logger";
import EnvVars from "@serv/declarations/major/EnvVars";
import server from "./server";
import next from "next";
import connect from "@serv/db/connect";
import mongoose from "mongoose";


const dev = EnvVars.nodeEnv == "development";
const app = next({ dev });
const handle = app.getRequestHandler();
// **** Start server **** //
connect(EnvVars.MONGODB_URL).then(() => {
    app.prepare()
        .then(() => {
            server.get("*", (req, res) => {
                return handle(req, res);
            });

            const msg =
                "Express server started on port: " + EnvVars.port.toString();
            server.listen(EnvVars.port, () => logger.info(msg));
        })
        .catch((ex) => {
            mongoose.disconnect().then(() => {
                console.error(ex.stack);
                process.exit(1);
            });
        });
});
