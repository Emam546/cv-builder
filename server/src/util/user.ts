import Users, { UserProvider } from "@serv/models/user";
import generateApiKey from "generate-api-key";
export interface Options {
    name: string;
    provider_id: string;
    provider_type: UserProvider["provider_type"];
}
function removeSuspiciousCharacters(key: string) {
    // Define a regular expression pattern to match suspicious characters
    const pattern = /[^A-Za-z0-9\-_.~]/g;

    // Remove suspicious characters from the key using the replace method
    const sanitizedKey = key.replaceAll(pattern, "");

    return sanitizedKey;
}
export async function createUser(props: Options) {
    const newUser = new Users({
        ...props,
        apiKey: removeSuspiciousCharacters(
            generateApiKey({
                dashes: false,
            }) as string
        ),
    });
    const res = await newUser.save();
    return res;
}
