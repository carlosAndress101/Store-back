const { config } = require('../../config/config');
const { Strategy, ExtractJwt } = require('passport-jwt');


const { jwtSecret } = config;

/**options */
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;

const JwtStrategy = new Strategy(opts,(payload, done) => {
 return done(null, payload);
});


module.exports = JwtStrategy;