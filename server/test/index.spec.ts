import "./pre-test";
import server from "@serv/server";
import supertest from "supertest";
import connect from "@serv/db/connect";
import EnvVars from "@serv/declarations/major/EnvVars";
import UserDb, { User } from "@serv/models/user";
import { sign } from "@serv/util/jwt";
import { expect } from "chai";
import { defaultData, defaultSectionState } from "@src/components/main/default";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import { convertSection2Data } from "@src/components/main/utils";
import axios from "axios";
const request = supertest(server);
function readFile(p: string) {
    return path.join(__dirname, p);
}
beforeAll(async () => {
    await connect(EnvVars.MONGODB_URL);
});
afterAll(async () => {
    await mongoose.disconnect();
});
describe("Main tests", () => {
    let token: string;
    let user: User;
    beforeAll(async () => {
        const res = await UserDb.aggregate([{ $sample: { size: 1 } }]);
        if (res.length) {
            token = sign(res[0]);
            user = res[0];
        }
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
            let url: string;
            it("upload image", async () => {
                const post = request
                    .post("/api/v1/images")
                    .set("Authorization", `Bearer ${token}`);
                post.field("name", "image");
                post.attach("img", readFile("./sample_img.jpg"));
                const res = await post.expect(200);
                expect(res.body.status).true;
                expect(res.body.data.url).not.undefined;
                url = res.body.data.url;
                if (EnvVars.APPLY_LOCAL) {
                    expect(
                        fs.existsSync(path.join("./public", res.body.data.url))
                    ).true;
                } else {
                    const res = await axios.get(url, {
                        validateStatus(status) {
                            return true;
                        },
                    });
                    expect(res.status).lessThan(300);
                }
            }, 30000);
            it("delete image", async () => {
                const res = await request
                    .delete("/api/v1/images")
                    .send({
                        name: url,
                    })
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200);
                expect(res.body.status).true;
                if (EnvVars.APPLY_LOCAL) {
                    expect(fs.existsSync(path.join("./public", url))).false;
                } else {
                    await new Promise((resH) => {
                        setTimeout(() => {
                            axios
                                .get(url, {
                                    validateStatus(status) {
                                        return true;
                                    },
                                })
                                .then((res) => {
                                    expect(res.status).not.eq(200);
                                    resH(null);
                                });
                        }, 3000);
                    });
                }
            });
        });
    });
    describe("GET", () => {
        describe(" /data", () => {
            const PostedData = {
                sections: defaultData,
                sectionState: defaultSectionState,
            };
            const curData = convertSection2Data(
                PostedData.sections,
                PostedData.sectionState
            );
            beforeAll(async () => {
                await request
                    .post("/api/v1/user/data")
                    .send(PostedData)
                    .set("Authorization", `Bearer ${token}`);
            });
            // test("main", async () => {
            //     const res = await request
            //         .get("/api/v1/data")
            //         .query({
            //             apikey: user.apiKey,
            //         })
            //         .expect(200);
            //     expect(res.body.status).true;
            //     expect(res.body.data).deep.eq(curData);
            // });
            it("routed data", async () => {
                const res = await request
                    .get(`/api/v1/data/projects/data`)
                    .query({
                        apikey: user.apiKey,
                    })
                    .expect(200);
                expect(res.body.status).true;
                expect(res.body.data).deep.eq(curData.projects.data);
            });
        });
    });
});
