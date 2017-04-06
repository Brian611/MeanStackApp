module.exports = (passport) => {
    const JwtStrategy = require('passport-jwt').Strategy
    const ExtractJwt = require('passport-jwt').ExtractJwt;
    const config = require("./database");
    const User = require("../models/userModel");
    const _ = require("lodash");

    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.getUserById(jwt_payload._doc._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (!_.isEmpty(user)) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};

