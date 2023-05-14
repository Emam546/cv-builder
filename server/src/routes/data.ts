import { Router } from "express";
import cors from "cors";
import apicache from "apicache";
import User from "@serv/models/user";
import { convertSection2Data } from "@src/components/main/utils";
import rateLimiter from "express-rate-limit";
const router = Router();
router.use(cors({ origin: "*" }));
const cache = apicache.middleware;
router.use(cache(5 * 60 * 60 * 1000));
router.use(
    rateLimiter({
        windowMs: 60 * 1000, // 1 minute
        max: 10, // limit each IP to 10 requests per windowMs
    })
);
router.get("/", async (req, res) => {
    if (!req.query.apikey && typeof req.query.apikey == "string") {
        return res
            .status(400)
            .json({ status: false, msg: "ApiKey is not provided" });
    }
    const result = await User.findOne({ apiKey: req.query.apikey }).hint({
        apiKey: 1,
    });
    if (!result)
        return res.status(401).json({ status: false, msg: "Invalid API key" });
    const data = result.data;
    if (!data)
        return res.status(404).json({ status: false, msg: "Unprovided Data" });
    res.status(200).json({
        status: true,
        msg: "success",
        data: convertSection2Data(data.sections, data.sectionState),
    });
});
export default router;
