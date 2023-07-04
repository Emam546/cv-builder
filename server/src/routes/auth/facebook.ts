/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from "express";
import passport from "passport";
const router = Router();

router.get(
    "/",
    passport.authenticate("facebook", { scope: ["profile", "email"] })
);

router.get(
    "/callback",
    passport.authenticate("facebook", {
        failureRedirect: "/",
        session: false,
    })
);

export default router;
