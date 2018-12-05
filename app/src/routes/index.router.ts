// Cargamos el modulo para poder utilizar el enrutador de express
import { Router } from 'express'
import { default as passport, generateAccessToken } from '../services/Passport/passport'
import { LoginRouter } from './login.router';
import { UserRouter } from './user.router';
import { TemporadaRouter } from './temporada.router';

export class Routing {

  private router = Router();
  private loginRouter: LoginRouter;
  private userRouter: UserRouter;
  private temporadaRouter: TemporadaRouter;

  constructor()  {
    this.router.use(this.enableCors)
    this.loginRouter = new LoginRouter()
    this.userRouter = new UserRouter()
    this.temporadaRouter = new TemporadaRouter()
    this.router.use('/login', this.loginRouter.routing)
    this.router.use('/users', this.userRouter.routing)
    this.router.use('/temporada', this.temporadaRouter.routing)
    this.router.use('/', this.setRoutes)
  }

  enableCors(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
  }

  get setRoutes() {
    this.router.get('/',   // This request must be authenticated using a JWT, or else we will fail
      LoginRouter.isAuth(),
      (req, res) => {
        console.log(req.user)
        res.json(req.user.id)
      }, (req, res) => res.json(req.user))
    this.router.get('/hormiga', (req, res) => {
      res.json({ hola: 'hola soy una hormiga' })
    })

    // this.router.get('/login', (req, res) => res.json({ login: 'No estas logueado guapeton' }));
    this.router.get('/google/callback',
      passport.authenticate('google', { failureRedirect: '/api/login' }),
      function (req, res) {
        console.log('Google ', req.user)
        res.json({ token: generateAccessToken(req.user.userid) });
      });

    return this.router
  }

  get enrouting() { return this.router }

}


