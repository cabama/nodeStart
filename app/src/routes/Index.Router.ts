// Cargamos el modulo para poder utilizar el enrutador de express
import { Router } from 'express'
import { default as passport, generateAccessToken } from '../services/Passport/passport'
import { LoginRouter } from './login.router';
import { UserRouter } from './user.router';

export class Routing {
	
	private router = Router();
	private loginRouter: LoginRouter;
	private userRouter: UserRouter;

	constructor () {
		this.loginRouter = new LoginRouter()
		this.userRouter = new UserRouter()
		this.router.use('/login', this.loginRouter.routing)
		this.router.use('/users', this.userRouter.routing)
		this.router.use('/', this.setRoutes)
		
	}

	get setRoutes () {
		this.router.get('/',   // This request must be authenticated using a JWT, or else we will fail
			LoginRouter.isAuth(),
			(req, res) => {
				console.log(req.user)
				res.json(req.user.id)
			}, (req, res) => res.json(req.user))
		this.router.get('/reshu', (req, res) => res.json({ hola: 'pues esto es asi cazador sin ' }))
		this.router.get('/hormiga', (req, res) => res.json({ hola: 'hola soy una hormiga' }))
		this.router.get('/atleti', (req, res) => res.json({ chucufleta: 'Que sepas que el Atleti es el mejor equipo del mundo' }))

		// this.router.get('/login', (req, res) => res.json({ login: 'No estas logueado guapeton' }));
		this.router.get('/google/callback',
			passport.authenticate('google', { failureRedirect: '/api/login' }),
			function (req, res) {
				console.log('Google ', req.user)
				res.json({ token: generateAccessToken(req.user.userid) });
			});
			
		return this.router
	}
	
	get enrouting () { return this.router }
	
}


