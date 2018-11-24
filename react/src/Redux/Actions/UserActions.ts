import { IUserResponse } from './../../Services/LoginService'
export enum UserTypes  {
  loginToken = 'LOGIN_TOKEN',
  loginEmail = 'LOGIN_EMAIL',
  loginSocial = 'LOGIN_SOCIAL_ACOUNT',
  logged = 'LOGGED',
  updated = 'UPDATED',
  logout = 'LOGOUT_USER',
}

export interface IUserActions {
  type: UserTypes
  action: {
    email?: string,
    password?: string,
    user?: IUserResponse
    dispatch?: (a: IUserActions) => void,
    newUser?: {
      name: string,
      email: string,
      password: string,
    },
  }
}
