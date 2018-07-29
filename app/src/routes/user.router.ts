import { Router } from "express";

class UserRouter {
  private router = Router();
  private userCrl = new this.userCrl ();

  constructor () {
    this.setUpRouting()
  }

  private setUpRouting () {
    this.router.get('/', this.userCrl.getAllUser);
  }

  get routing () {
    return this.router
  }
}