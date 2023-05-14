export function assertIsAuth(
    req: Express.Request
): asserts req is Express.AuthenticatedRequest {
    if (!req.isAuthenticated()) throw new Error("User is not Authenticated");
}
