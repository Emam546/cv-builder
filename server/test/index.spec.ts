import dotenv from "dotenv";
dotenv.config({
    path: "test.env",
});
import server from "@serv/server";
import supertest from "supertest";
import connect from "@serv/db/connect";
import EnvVars from "@serv/declarations/major/EnvVars";
import mongoose from "mongoose";
import UserDb, { User } from "@serv/models/user";
import { sign } from "@serv/util/jwt";
import { expect } from "chai";
import { defaultData, defaultSectionState } from "@src/components/main/default";
import fs from "fs";
import path from "path";
const request = supertest(server);
function readFile(src: string) {
    return path.join(__dirname, src);
}
describe("Main tests", () => {
    let token: string;
    beforeAll(async () => {
        await connect(EnvVars.MONGODB_URL);
        const res = await UserDb.aggregate([{ $sample: { size: 1 } }]);
        if (res.length) token = sign(res[0]);
    });
    describe("POST", () => {
        describe("user/data", () => {
            it("main", async () => {
                const PostedData: User["data"] = {
                    sections: defaultData,
                    sectionState: defaultSectionState,
                };
                await request
                    .post("/api/v1/user/data")
                    .send(PostedData)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200);
                const res = await request
                    .get("/api/v1/user/data")
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200);
                expect(res.body.status).true;
                expect(res.body.data).deep.eq(PostedData);
            });
            it("update", async () => {
                const PostedData: User["data"] = {
                    sections: defaultData,
                    sectionState: defaultSectionState,
                };
                PostedData.sections.info.data.jobTitle = "new value";
                const res1 = await request
                    .post("/api/v1/user/data")
                    .send(PostedData)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200);
                expect(res1.body.status).true;
                expect(res1.body.data).deep.eq(PostedData);
                const res = await request
                    .get("/api/v1/user/data")
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200);
                expect(res.body.status).true;
                expect(res.body.data).deep.eq(PostedData);
            });
        });
        describe("/images", () => {
            it("main", async () => {
                const post = request
                    .post("/api/v1/images")
                    .set("Authorization", `Bearer ${token}`);
                post.field("name", "image");
                post.attach("img", readFile("./sample_img.jpg"));
                const res = await post.expect(200);
                expect(res.body.status).true;
                expect(res.body.data.url).not.undefined;
                // expect(res.body.data.url).not.string("");
            }, 30000);
        });
    });

    afterAll(async () => {
        mongoose.disconnect();
    });
});
