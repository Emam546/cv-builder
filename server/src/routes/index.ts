import authRouter from "./auth";
import userRouter from "./user";
import imagesRouter from "./images";
import DataRouter from "./data";
import { Router } from "express";
import passport from "@serv/passport.config";
const router = Router();
router.use("/auth", authRouter);
router.use("/data", DataRouter);
router.use(passport.authenticate("jwt", { session: false }));
router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res
            .status(401)
            .send({ status: false, msg: "You are not authorized" });
    }
    next();
});
router.use("/images", imagesRouter);
router.use("/user", userRouter);

export default router;
