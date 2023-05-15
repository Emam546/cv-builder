/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from "express";
import User from "@serv/models/user";
import { assertIsAuth } from "@serv/util/utils";
import passport from "passport";
import rateLimiter from "express-rate-limit";
const router = Router();
router.use(passport.authenticate("jwt", { session: false }));
router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res
            .status(401)
            .send({ status: false, msg: "You are not authorized" });
    }
    next();
});

router.get("/data", async (req, res) => {
    assertIsAuth(req);
    const user = await User.findById(req.user._id);
    if (!user)
        return res
            .status(401)
            .send({ status: false, msg: "you are not authorized" });
    res.send({ status: true, msg: "success", data: user.toObject().data });
});
router.use(
    rateLimiter({
        max: 20,
    })
);
router.post("/data", async (req, res) => {
    assertIsAuth(req);
    await User.updateOne({ _id: req.user._id }, { $set: { data: req.body } });
    req.user.data = req.body;
    res.status(200).send({ status: true, msg: "success", data: req.body });
});

export default router;
