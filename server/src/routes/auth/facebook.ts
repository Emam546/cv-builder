/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from "express";
import passport from "passport";
import { assertIsAuth } from "@serv/util/utils";
import { sign } from "@serv/util/jwt";
const router = Router();

router.get("/", passport.authenticate("facebook"));

router.get(
    "/callback",
    passport.authenticate("facebook", {
        failureRedirect: "/",
        session: false,
    }),
    (req, res) => {
        assertIsAuth(req);
        res.cookie("token", sign(req.user));
        res.redirect("/");
    }
);

export default router;
