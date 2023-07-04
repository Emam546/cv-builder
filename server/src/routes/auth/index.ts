import { Router } from "express";
import FacebookRouter from "./facebook";
import GoogleRouter from "./google";
import logger from "@serv/logger";
import { sign } from "@serv/util/jwt";
const router = Router();
router.use("/facebook", FacebookRouter);
router.use("/google", GoogleRouter);
router.get("/logout", (req, res) => {
    req.logout({ keepSessionInfo: false }, (err) => logger.error(err));
    res.cookie("token", undefined);
    res.send({ status: true, msg: "success", data: {} });
});
router.use((req, res, next) => {
    if (!req.isAuthenticated()) return next();
    delete req.user.data;
    res.cookie("token", sign(req.user));
    res.redirect("/");
});
export default router;
