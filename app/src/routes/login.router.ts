import { Router, Response, Request } from 'express';
import { default as passport, generateAccessToken } from '../services/Passport/passport'

export class LoginRouter {

  private failureUrl = '/api/notLogged'
  private router = Router()

  constructor () {
    this.router.get('/notLogged', (req, res) => res.json({ login: 'No estas logueado.' }));
    this.router.post('/signup, ')
    this.router.post('/email', this.emailLogin)
    this.router.get('/google', this.googleLogin() );
    this.router.get('/google/callback',
      passport.authenticate('google', { failureRedirect: this.failureUrl }),
      this.sendToken );
  }

  get routing () { return this.router } 

  public static isAuth () {
    return passport.authenticate(['jwt'], { session: false })
  }

  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/api/login')
  }

  private googleLogin () {
    return passport.authenticate(
      'google',
      { scope: 'https://www.googleapis.com/auth/plus.login' }
    )
  }

  private emailLogin = (req: Request, res: Response) => 
    passport.authenticate('local', function (err, user, info) {
      if (err) { return res.json({ message: info.message })}
      if (!user) { return res.json({ message: info.message }) }
      res.json(user);
    })(req, res) 
 

  private sendToken (req: Request, res: Response) {
    res.json({ token: generateAccessToken(req.user.userid) });
  }

  

}