import { MdUser } from '../models/Users.Model';
import { Router, RequestHandler } from "express";
import * as express from 'express';
import { LoginRouter } from './login.router';

// Route /users

export class UserRouter {

  private router = Router();

  constructor () {
    this.setUpRouting()
  }

  private setUpRouting () {
    this.router.get('/me', LoginRouter.isAuth(), this.getMe);
    this.router.get('/all', this.getAll);
    this.router.get('/id/:userId', this.getById);
  }

  async getMe(req:express.Request, res:express.Response) {
    const userid = req.user._id
    console.log('USERID: '+ userid)
    if (userid) {
      MdUser.findById(userid)
        .then((myUser) => res.json({user: myUser}))
        .catch(() => res.json({user: 'not exist'}))
    } else {
      res.json({ user: null })
    }
  }

  async getAll(req: express.Request, res: express.Response) {
    const user = await MdUser.find
    res.json(user)
  }

  async getById(req: express.Request, res: express.Response) {
    const userid = req.params.userId
    console.log(`userId: ${userid}`)
    if (userid) {
      MdUser.findById(userid)
        .then((myUser) => res.json({ user: myUser }))
        .catch(() => res.json({ user: null }))
    } else {
      res.json({ user: null })
    }
  }

  get routing () {
    return this.router
  }
}