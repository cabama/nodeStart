import { UserModel } from './../models/Users.Model'
import { MdUser } from '../models/Users.Model';
import { Router } from "express";
import * as express from 'express';
import { LoginRouter } from './login.router';
import { UserController } from '../controllers/User.ctrl'

// Route /users

export class UserRouter {

  private router = Router()
  private userController = new UserController()

  constructor () {
    this.setUpRouting()
  }

  private setUpRouting () {
    this.router.get('/me', LoginRouter.isAuth(), this.getMe.bind(this));
    this.router.put('/me', LoginRouter.isAuth(), this.putMe.bind(this));
    this.router.post('/avatar', LoginRouter.isAuth(), this.uploadProfileAvatar.bind(this));
    this.router.get('/all', this.getAll.bind(this));
    this.router.get('/id/:userId', this.getById);
  }

  async getMe(req:express.Request, res:express.Response) {
    const userid = req.user._id
    this.userController.getUser(res, userid)
  }

  async putMe(req: express.Request, res: express.Response) {
    const user = req.user as UserModel
    this.userController.putUser(user, req, res)
  }

  async uploadProfileAvatar(req: express.Request, res: express.Response) {
    const user = req.user as UserModel 
    console.log('Estas en user avatar')
    this.userController.uploadProfileAvatar(user, req, res)
  }

  async getAll(req: express.Request, res: express.Response){
    const user = await MdUser.find({})
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