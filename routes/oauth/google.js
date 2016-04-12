var passport = require('passport');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.HOST + "/auth/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

module.exports = passport
