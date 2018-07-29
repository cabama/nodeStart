import * as passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { MdUser } from '../../../models/Users.Model';
import { google } from '../../../config/getEnviroments';

export type googleParams = {
  clientID: string,
  clientSecret: string,
  callbackURL: string
}

export function setGoogleStrategy (passport, googleParams: googleParams) {
  console.log(googleParams)
  passport.use(new GoogleStrategy(
    googleParams,
    function (accessToken, refreshToken, profile, done) {
      MdUser.create({ userid: profile.id }, { name: profile.displayName, userid: profile.id }, function (err, user) {
        console.log(user)
        return done(err, user)
      });
    }
  ));
  return passport
}