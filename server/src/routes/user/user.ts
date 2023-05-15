import { Router } from "express";
import User from "@serv/models/user";
import { assertIsAuth } from "@serv/util/utils";
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    await User.updateOne({ _id: req.user._id }, { $set: { data: req.body } });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    req.user.data = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(200).send({ status: true, msg: "success", data: req.body });
});

export default router;
