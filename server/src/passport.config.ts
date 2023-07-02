import passport from "passport";
import passportFacebook from "passport-facebook";
import passportGoogle from "passport-google-oauth";
import EnvVars from "@serv/declarations/major/EnvVars";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import Users, { UserProvider } from "@serv/models/user";
import { createUser } from "@serv/util/user";
const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

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
            clientID: EnvVars.facebook.APP_ID,
            clientSecret: EnvVars.facebook.APP_SECRET,
            callbackURL: `${EnvVars.DOMAIN_URL}/api/v1/auth/facebook/callback`,
            profileFields: ["id", "first_name", "last_name", "emails"],
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
                firstName: profile.name?.givenName || "",
                lastName: profile.name?.familyName || "",
                email: profile.emails?.[0]?.value,
                provider_id: profile.id,
                provider_type: "facebook",
            });
            done(null, newUser.toObject());
        }
    )
);
passport.use(
    new GoogleStrategy(
        {
            clientID: EnvVars.google.APP_ID,
            clientSecret: EnvVars.google.APP_SECRET,
            callbackURL: `${EnvVars.DOMAIN_URL}/api/v1/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            // You can save the user profile or perform other actions here
            const result = await Users.findOne({
                provider_id: profile.id,
                provider_type: "google",
            }).hint({ provider_id: 1, provider_type: 1 });
            if (result) return done(null, result.toObject());

            const newUser = await createUser({
                firstName: profile.name?.givenName || "",
                lastName: profile.name?.familyName || "",
                email: profile.emails?.[0]?.value,
                provider_id: profile.id,
                provider_type: "google",
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
