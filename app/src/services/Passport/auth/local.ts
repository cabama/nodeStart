import {Strategy} from 'passport-local'
import { MdUser, UserModel } from '../../../models/Users.Model';
import { generateAccessToken } from './token';

const isValidPassword = (user: UserModel, password: string) => {
  return true
}


export function setLocalStrategy(passport) {
  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      function (email, password, done) {
        // check in mongo if a user with username exists or not
        MdUser.findOne({ 'email': email })
          .then((user: UserModel)=>{
            if (!user) return done(null, false);
            const token = generateAccessToken(user._id)
            done(null, {token})
          })
          .catch((error) => { done(null, false) })
      }));
  return passport
}