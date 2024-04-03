import { UserTokenInfo } from "@serv/models/user";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface User extends UserTokenInfo {}
    }
}
