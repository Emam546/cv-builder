import { Router } from "express";
import FacebookRouter from "./facebook";
import GoogleRouter from "./google";
import { UpdateToken } from "@serv/util/user";
const router = Router();
router.use("/facebook", FacebookRouter);
router.use("/google", GoogleRouter);
router.get("/logout", (req, res) => {
    res.set("X-Access-Token", "");
    res.send({ status: true, msg: "success", data: {} });
});
router.use((req, res, next) => {
    if (!req.user) return next();
    UpdateToken(res, req.user);
    res.redirect("/");
});
export default router;
