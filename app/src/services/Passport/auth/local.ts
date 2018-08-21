import {Strategy} from 'passport-local'
import { MdUser, UserModel } from '../../../models/Users.Model';

const isValidPassword = (user: UserModel, password: string) => {
  return true
}


export function setLocalStrategy(passport) {
  console.log('Pongo un passport CAAARLOS')
  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      function (email, password, done) {
        console.log('Estas en la estrategia local', email)
        // check in mongo if a user with username exists or not
        MdUser.findOne({ 'email': email })
          .then((user: UserModel)=>{
            if (!user) {
              console.log('User Not Found with username ');
              return done(null, false);
            }
            done(null, user)
          })
          .catch((error) => {
            done(null, false)
          })
      }));
  return passport
}