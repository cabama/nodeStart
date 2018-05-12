// Cargamos el modulo para poder utilizar el enrutador de express
import { Router } from 'express'
import { JwtService } from '../services/jwt';
import { RequestAuth } from 'config/interfaces.type';

import { CtrUser } from '../controllers/Users.Ctrl'
import { CONFIG } from '../config/config'
import * as multipart from 'connect-multiparty';

export class routing_jaguer {
	
	public router = Router();
	public jwt = new JwtService ()
	public userController = new CtrUser ()

	constructor () {
		this.router.get('/carlos', (req,res) => res.json({hola: 'caracola'}))
	}
	
	get enrouting () { return this.router }
	
}


