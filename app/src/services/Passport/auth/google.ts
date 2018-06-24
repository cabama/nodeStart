import * as passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { MdUser } from '../../../models/Users.Model';


passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id: any, fn) {
  console.log(id)
  MdUser.findOne({ _id: id._id }, function (err, user) {
    fn(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: "528714219064-3pbintjpmv0bdph38ua11a0tijlb5k6s.apps.googleusercontent.com",
  clientSecret: "9CqMXXR-cu_JCzAmAhpdLG2Y",
  callbackURL: "http://localhost:2525/api/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    MdUser.create({ userid: profile.id }, { name: profile.displayName, userid: profile.id }, function (err, user) {
      console.log(user)
      return done(err, user)
    });
  }
));


export default passport;