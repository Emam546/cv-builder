import EnvVars from "@serv/declarations/major/EnvVars";
import jwt from "jsonwebtoken";

export function sign(payload: string | object | Buffer) {
    return jwt.sign(payload, EnvVars.jwt.secret);
}
export function decode<T = any>(token: string): T {
    return jwt.verify(token, EnvVars.jwt.secret) as T;
}
