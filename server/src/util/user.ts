import Users, { UserProvider } from "@serv/models/user";
import generateApiKey from "generate-api-key";
export interface Options {
    name: string;
    provider_id: string;
    provider_type: UserProvider["provider_type"];
}
export async function createUser(props: Options) {
    const newUser = new Users({
        ...props,
        apiKey: generateApiKey(),
    });
    const res = await newUser.save();
    return res;
}
