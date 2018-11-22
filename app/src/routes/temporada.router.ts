import { Router, Response, Request } from 'express';
import { default as passport, generateAccessToken } from '../services/Passport/passport'
import { getCalendarJSON } from '../services/MadridData/MadridData';

export class TemporadaRouter {

  private router = Router()

  constructor () {
    this.router.get('/calendar', (req, res) => this.Calendar(res));
    this.router.get('/example', (req, res) => res.json({hola: 'caracola8'}));
  }

  get routing () { return this.router } 

  private async Calendar (res: Response) {
    const value = await getCalendarJSON().then(value => value)
    res.json({Calendar: value})
  }

}