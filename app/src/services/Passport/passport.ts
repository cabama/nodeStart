import * as passport from 'passport'
import { setUpJWT } from './auth/token';

export {default as GooglePassport} from './auth/google'
export {generateAccessToken} from './auth/token'

setUpJWT(passport)

export default passport
