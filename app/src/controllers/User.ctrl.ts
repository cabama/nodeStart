import { MdUser, UserModel } from '../models/Users.Model'
import { Request, Response, NextFunction } from "express"
import { check, validationResult, body } from 'express-validator/check'
import { PublicPath } from '../config/getEnviroments'
import { UploadedFile } from 'express-fileupload'
import * as path from 'path'


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

  public uploadProfileAvatar (user: UserModel, req: Request, res: Response) {
    const sampleFile = req.files.avatar as UploadedFile
    const publicPath = PublicPath
    const fileName = Buffer.from(user.id + sampleFile.name).toString('base64')
    const imgPath = path.join(publicPath, 'avatar', fileName)
    sampleFile.mv(imgPath, function (err) {
      if (err) return res.status(500).send(err);
      user.update({ avatar: fileName })
        .then(() => {
          MdUser.findById(user.id).select("-password -_id")
          .then((value) => res.status(200).json(value))
        })
        .catch(res.status(500).send)
    });
  }

  public  putUser (user: UserModel, req: Request, res: Response): any {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let toModify = {}
    if (req.body.email) toModify = {...toModify, email: req.body.email}
    if (req.body.name) toModify = {...toModify, name: req.body.name}
    if (req.body.password) toModify = {...toModify, password: req.body.password}
    // MdUser.findOneAndUpdate({email: req.body.email},  )
    user.update(toModify)
      .then((value) => {
        MdUser.findById(user.id).select("-password -_id")
          .then((value) => res.json(value))
          .catch((errors) => res.status(422).json({ errors: errors.array() }))
      })
      .catch((errors) => res.status(422).json({ errors: errors.array() }))
    
  }
}

export const UserBodyParameters = [
  check('name').isAlpha(),
  check('email').isEmail(),
  check('password').isLength({ min: 5 })
]