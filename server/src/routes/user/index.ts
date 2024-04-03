/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from "express";
import User, { UserTokenInfo } from "@serv/models/user";
import { assertIsAuth } from "@serv/util/utils";
import passport from "passport";
import rateLimiter from "express-rate-limit";
import { getData, UpdateToken } from "@serv/util/user";

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

router
    .route("/data")
    .get(async (req, res) => {
        assertIsAuth(req);
        const user = await User.findById(req.user._id);
        if (!user)
            return res
                .status(401)
                .send({ status: false, msg: "you are not authorized" });

        res.send({ status: true, msg: "success", data: user.toObject().data });
    })
    .post(
        rateLimiter({
            max: 20,
            windowMs: 60 * 1000,
        }),
        async (req, res) => {
            assertIsAuth(req);
            await User.updateOne(
                { _id: req.user._id },
                { $set: { data: req.body } }
            );

            res.status(200).send({
                status: true,
                msg: "success",
                data: req.body,
            });
        }
    );
router
    .route("/info")
    .get(async (req, res) => {
        assertIsAuth(req);
        const user = await User.findById(req.user._id);
        if (!user)
            return res
                .status(401)
                .send({ status: false, msg: "you are not authorized" });

        res.send({
            status: true,
            msg: "success",
            data: getData(user, user._id.toString()),
        });
    })
    .post(async (req, res) => {
        assertIsAuth(req);
        await User.updateOne({ _id: req.user._id }, { $set: { ...req.body } });
        UpdateToken(res, { ...req.user, ...(req.body as UserTokenInfo) });
        res.status(200).send({ status: true, msg: "success", data: req.body });
    });
router.route("/delete").delete(async (req, res) => {
    assertIsAuth(req);
    await User.deleteOne({ _id: req.user._id });
    res.status(200).send({ status: true, msg: "success" });
});

export default router;
