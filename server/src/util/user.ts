import Users, { User, UserTokenInfo } from "@serv/models/user";
import { Response } from "express";
import generateApiKey from "generate-api-key";
import { sign } from "./jwt";
export type UserInfo = Omit<User, "data" | "apiKey" | "_id">;
function removeSuspiciousCharacters(key: string) {
    // Define a regular expression pattern to match suspicious characters
    const pattern = /[^A-Za-z0-9\-_.~]/g;

    // Remove suspicious characters from the key using the replace method
    const sanitizedKey = key.replaceAll(pattern, "");

    return sanitizedKey;
}
export async function createUser(props: UserInfo) {
    const newUser = new Users({
        ...props,
        apiKey: removeSuspiciousCharacters(
            generateApiKey({
                dashes: false,
            }).toString()
        ),
    });
    const res = await newUser.save();
    return res;
}
export function UpdateToken(res: Response, data: UserTokenInfo) {
    res.cookie("token", sign(data));
}
export function getUserEssentialData(data: User, id: string): UserTokenInfo {
    return {
        _id: id,
        apiKey: data.apiKey,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        provider_id: data.provider_id,
        provider_type: data.provider_type,
    };
}
