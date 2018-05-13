// Cargamos el modulo para poder utilizar el enrutador de express
import { Router } from 'express'
import { JwtService } from '../services/jwt';
import { RequestAuth } from 'config/interfaces.type';

import { CtrUser } from '../controllers/Users.Ctrl'
import { CONFIG } from '../config/config'

export class routing_jaguer {
	
	public router = Router();
	public jwt = new JwtService ()
	public userController = new CtrUser ()

	constructor () {
		this.router.get('/reshu', (req,res) => res.json({hola: 'rehola cazador sin pistola'}))
		this.router.get('/hormiga', (req,res) => res.json({hola: 'hola soy una hormiga'}))
		this.router.get('/atleti', (req,res) => res.json({chucufleta: 'Que sepas que el Atleti es el mejor equipo del mundo'}))

	}
	
	get enrouting () { return this.router }
	
}


