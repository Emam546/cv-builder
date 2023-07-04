/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from "express";
import passport from "passport";
const router = Router();

router.get(
    "/",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
        session: false,
    })
);

export default router;
