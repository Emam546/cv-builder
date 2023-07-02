import { RouteError } from "@serv/declarations/classes";
import HttpStatusCode from "@serv/declarations/major/HttpStatusCodes";

export function assertIsAuth(
    req: Express.Request
): asserts req is Express.AuthenticatedRequest {
    if (!req.isAuthenticated())
        throw new RouteError(
            HttpStatusCode.UNAUTHORIZED,
            "User is not Authenticated"
        );
}
