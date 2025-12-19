const { Strategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models/models');
const { SECRET_KEY } = process.env;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
};

module.exports = (passport) => {
    passport.use(new Strategy(opts, async (jwtPayload, done) => {
        try {
            const user = await User.findByPk(jwtPayload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    }));
};