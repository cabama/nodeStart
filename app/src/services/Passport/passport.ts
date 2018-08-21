import * as Passport from 'passport'
import { setGoogleStrategy, googleParams } from './auth/google';
import { setLocalStrategy } from './auth/local';
import { setUpJWT } from './auth/token';
import { google } from '../../config/getEnviroments';
import { MdUser } from '../../models/Users.Model';

export { setGoogleStrategy } from './auth/google'
export { generateAccessToken } from './auth/token'

let passport = Passport

// Serialize and deserialize methods

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id: any, fn) {
  console.log(id)
  MdUser.findOne({ _id: id._id }, function (err, user) {
    fn(err, user);
  });
});

if (google.enabled) {
  const googleParams: googleParams = {
    clientID: google.clientId,
    clientSecret: google.clientSecret,
    callbackURL: "http://localhost:2525/api/google/callback"
  }
  console.log('client Id: ' + google.clientId)
  console.log('client secret: ' + google.clientSecret)
  passport = setGoogleStrategy(passport, googleParams)
}

passport = setUpJWT(passport)
passport = setLocalStrategy(passport)

export default passport
