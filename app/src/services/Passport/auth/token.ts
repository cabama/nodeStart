import * as passportJwt from 'passport-jwt'
import * as jwt from 'jsonwebtoken'

import { MdUser } from '../../../models/Users.Model';

const tokenConfig = {
  secretOrKey: 'mySuperSecretKey',
  issuer: 'social-logins-spa',
  audience: 'social-logins-spa',
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt')
}

// Generate an Access Token for the given User ID
export function generateAccessToken(userId) {
  // How long will the token be valid for
  const expiresIn = '1 hour';
  // Which service issued the token
  const issuer = tokenConfig.issuer
  // Which service is the token intended for
  const audience = tokenConfig.audience
  // The signing key for signing the token
  const secret = tokenConfig.secretOrKey
  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    audience: audience,
    issuer: issuer,
    subject: userId.toString()
  });
  return token;
}

export function setUpJWT (passport) {
  passport.use(new passportJwt.Strategy(tokenConfig, async (payload, done) => {
    const user = await MdUser.findOne({ userid: payload.sub})
    if (user) return done(null, user, payload);
    else return done('Hubo un error');
  }));

  return passport
}
