import { getUrlsEnviroment } from '../Enviroments'
import { Fetch } from './FetchService'

const TOKEN_KEY = 'app_token'

export interface IUserResponse {
  _id: string
  email: string
  origin: string
  role: string
}

export class LoginService {

  public static getToken () {
    return localStorage.getItem(TOKEN_KEY) || null
  }

  public static removeToken () {
    return localStorage.removeItem(TOKEN_KEY)
  }

  public static setToken (token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  }

  public static async loginWithToken (): Promise<IUserResponse | null> {
    const token = LoginService.getToken()
    if (!token) return null
    const responseJson = await LoginBridge.loginWithToken(token)
      .then((response) => response.json())
      .catch(() => LoginService.removeToken)
    if (responseJson && responseJson.user) return responseJson.user
    else return null
  }

  public static async loginWithEmail (email: string, password: string): Promise <IUserResponse | null> {
    const emailRequest = await LoginBridge.loginWithEmail(email, password)
    const emailResponse = await emailRequest.json()
    if (emailResponse && emailResponse.token) {
      LoginService.setToken(emailResponse.token)
      const user = await LoginService.loginWithToken()
      if (user) return user
      else return null
    } else {
      return null
    }
  }

  public static async singUp (email: string, name: string, password: string): Promise<any> {
    return LoginBridge.singUp(email, name, password)
  }
}

class LoginBridge {

  public static urls = getUrlsEnviroment()

  public static loginWithToken (token: string): Promise<any> {
    const requestInit: RequestInit = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    }
    return new Fetch().fetch({
      path: 'users/me',
      init: requestInit,
    })
  }

  public static singUp (email: string, name: string, password: string): Promise<any> {
    const requestInit: RequestInit = {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: `email=${email}&password=${password}`,
      cache: 'default',
    }
    return new Fetch().fetch({
      path: 'login/signup',
      init: requestInit,
    })
  }

  public static loginWithEmail (email: string, password: string) {
    const body = new FormData()
    body.append('email', email)
    body.append('password', password)

    const requestInit: RequestInit = {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body,
      cache: 'default',
    }
    return new Fetch().fetch({
      path: 'login/email',
      init: requestInit,
    })
  }

}
