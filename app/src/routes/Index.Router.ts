// Cargamos el modulo para poder utilizar el enrutador de express
import { Router } from 'express'
import { GooglePassport, generateAccessToken } from '../services/Passport/passport'
import * as passport from 'passport';

export class routing_jaguer {

	ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
		res.redirect('/api/login')
	}
	
	public router = Router();

	constructor () {
		this.router.get('/',   // This request must be authenticated using a JWT, or else we will fail
			passport.authenticate(['jwt'], { session: false }),
			(req, res) => {
				console.log(req.user)
				res.json(req.user.id)
			}, (req, res) => res.json(req.user))
		this.router.get('/reshu', (req,res) => res.json({hola: 'pues esto es asi cazador sin '}))
		this.router.get('/hormiga', (req,res) => res.json({hola: 'hola soy una hormiga'}))
		this.router.get('/atleti', (req,res) => res.json({chucufleta: 'Que sepas que el Atleti es el mejor equipo del mundo'}))
		this.router.get('/google',
			GooglePassport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

		this.router.get('/login', (req, res) => res.json({login: 'No estas logueado guapeton'}));
		this.router.get('/google/callback',
			GooglePassport.authenticate('google', { failureRedirect: '/api/login' }),
			function (req, res) {
				console.log('Google ', req.user)
				res.json({ token: generateAccessToken(req.user.userid)});
			});

	}
	
	get enrouting () { return this.router }
	
}


