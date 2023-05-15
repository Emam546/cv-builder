/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }));

// NOW FOR LOGOUT USER

export default router;
