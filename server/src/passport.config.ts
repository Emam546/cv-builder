/* eslint-disable @typescript-eslint/no-unsafe-argument */
import passport from "passport";
import passportFacebook from "passport-facebook";
import EnvVars from "./declarations/major/EnvVars";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import Users, { UserProvider } from "@serv/models/user";
import { createUser } from "./util/user";
const FacebookStrategy = passportFacebook.Strategy;
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface User extends UserProvider {}
    }
}

passport.use(
    new FacebookStrategy(
        {
            clientID: EnvVars.FaceBook_APP_ID,
            clientSecret: EnvVars.FaceBook_APP_SECRET,
            callbackURL: `${EnvVars.DOMAIN_URL}/api/v1/auth/facebook/callback`,
            profileFields: ["id", "first_name", "last_name"],
            display: "popup",
        },
        // authenticate user
        async function (accessToken, refreshToken, profile, done) {
            const result = await Users.findOne({
                provider_id: profile.id,
                provider_type: "facebook",
            }).hint({ provider_id: 1, provider_type: 1 });
            if (result) return done(null, result.toObject());

            const newUser = await createUser({
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                name: `${profile.name?.givenName} ${profile.name?.familyName}`,
                provider_id: profile.id,
                provider_type: "facebook",
            });
            done(null, newUser.toObject());
        }
    )
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: EnvVars.jwt.secret,
        },
        function (jwt_payload, done) {
            return done(null, jwt_payload);
        }
    )
);
passport.serializeUser(function (profile, cb) {
    cb(null, profile);
});

passport.deserializeUser(function (id, cb) {
    cb(null, id as UserProvider);
});
export default passport;
