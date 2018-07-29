import { Router, Response, Request } from 'express'
import { default as passport, generateAccessToken } from '../services/Passport/passport'


export class LoginRouter {

  private failureUrl = '/api/notLogged'
  private router = Router()

  constructor () {
    this.router.get('/notLogged', (req, res) => res.json({ login: 'No estas logueado.' }));
    this.router.get('/google', this.googleLogin() );
    this.router.get('/google/callback',
      passport.authenticate('google', { failureRedirect: this.failureUrl }),
      (req, res)  => this.sendToken(req, res) );
  }

  get routing () { return this.router } 

  public isAuth () {
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

  private sendToken (req: Request, res: Response) {
    res.json({ token: generateAccessToken(req.user.userid) });
  }

  

}