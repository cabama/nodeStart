import { Request, Response, NextFunction } from "express";
import { hashSync } from 'bcrypt'
import { MdUser, AccountOrigin, AccountRole, UserModel } from '../models/Users.Model'

export class LoginController {

  public async signUp (req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    if (!email || !password) {
      this.invalid('Not email or password', res)
      return
    }
    const emailChecked = await this.checkEmail(email)
    if (!emailChecked) {
      this.invalid('Email not valid', res)
      return
    }
    const passwordEncrypted = this.encryptPassword(password)
    // Finally create the user
    LoginController.createNewUser(email, passwordEncrypted, AccountOrigin.local)
      .then( user => res.json({status: 'ok', info: user}))
      .catch( info => this.invalid(info, res))
  }

  public static createNewUser (email: string, password: string, origin: AccountOrigin): Promise<UserModel> { 
    return new MdUser({
      email,
      password,
      origin,
      role: AccountRole.slave
    }).save()
  }

  private async checkEmail (email: string) {
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    const emailValid = re.test(email)
    if (!emailValid) return emailValid
    const emailFound = await MdUser.findOne({email: email})
    return !emailFound
  }

  private encryptPassword ( password: string ): string {
    var BCRYPT_SALT_ROUNDS = 12;
    return hashSync(password, BCRYPT_SALT_ROUNDS)
  }

  private invalid (info: string, res: Response) {
    res.json({status: 'invalid', info})
  }

}