import { Router, Request, Response, NextFunction } from "express";
import User from "@serv/models/user";
import { assertIsAuth } from "@serv/util/utils";
import { sign } from "@serv/util/jwt";
const router = Router();

router.get("/data", async (req, res) => {
    assertIsAuth(req);
    const user = await User.findById(req.user._id);
    if (!user)
        return res
            .status(401)
            .send({ status: false, msg: "you are not authorized" });
    res.send({ status: true, msg: "success", data: user.toObject().data });
});
router.post("/data", async (req, res) => {
    assertIsAuth(req);
    await User.updateOne({ _id: req.user._id }, { $set: { data: req.body } });
    req.user.data = req.body;
    res.status(200).send({ status: true, msg: "success", data: req.body });
});

export default router;
