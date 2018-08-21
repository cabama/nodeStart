import { Request, Response, NextFunction } from "express";
import { MdUser, AccountOrigin, AccountRole, UserModel } from '../models/Users.Model';

export class LoginController {

  public signUp (req: Request, res: Response, next: NextFunction) {
    
    const { email, password } = req.body
    if (!email || !password) {
      this.invalid('Not email or password', res)
      return
    }
    if (!this.checkEmail(email)){
      this.invalid('Not email or password', res)
      return
    }

    const passwordEncrypted = this.encryptPassword(password)

    // Finally create the user
    this.createNewUser(email, passwordEncrypted, AccountOrigin.local)
      .then( user => res.json({status: 'ok', info: user}))
      .catch( info => this.invalid(info, res))
  }

  private createNewUser (email: string, password: string, origin: AccountOrigin): Promise<UserModel> { 
    return new MdUser({
      email,
      password,
      origin: AccountOrigin.local,
      role: AccountRole.slave
    }).save()
  }

  private checkEmail (email: string) {
    return true
  }

  private encryptPassword ( password: string ): string {
    return password
  }

  private invalid (info: string, res: Response) {
    res.json({status: 'invalid', info})
  }

}