import { MdUser } from '../models/Users.Model'
import { Request, Response, NextFunction } from "express"
import {check, validationResult, body} from 'express-validator/check'

export class UserController {

  public getUser(res: Response, id: string): any {
    MdUser.findById(id)//.select("+password")
      .then((myUser) => res.json({ user: myUser }))
      .catch(() => res.json({ error: 'user not exist' }))
  }

  public getAllUser(req: Request, res: Response): any {
    MdUser.find()
      .then( users  => res.json(users))
      .catch(() => res.json({ error: 'error' }))
  }

  public  putUser (req: Request, res: Response): any {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let toModify = {}
    if (req.body.email) toModify = {...toModify, email: req.body.email}
    if (req.body.name) toModify = {...toModify, name: req.body.name}
    if (req.body.password) toModify = {...toModify, password: req.body.password}
    MdUser.findOneAndUpdate({email: req.body.email}, toModify )
  }
}

export const UserBodyParameters = [
  check('name').isAlpha(),
  check('email').isEmail(),
  check('password').isLength({ min: 5 })
]