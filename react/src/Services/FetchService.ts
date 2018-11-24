import { getUrlsEnviroment } from '../Enviroments'
import { LoginService } from './LoginService'

interface IFetchParams {
  path?: string,
  init?: RequestInit,
  baseUrl?: string,
  url?: string,
}

export class Fetch {

  public baseUrl: string

  constructor () {
    this.baseUrl = getUrlsEnviroment().baseApi
  }

  public fetch (fetchParams: IFetchParams): Promise<Response> {
    const {path, init, baseUrl} = fetchParams
    const token = LoginService.getToken()
    const initRequest = { ...init, ...{ headers: { ...{ Authorization: 'JWT ' + token}}}}
    debugger
    if (fetchParams.url) return fetch(fetchParams.url, initRequest)
    const base = baseUrl || this.baseUrl
    const url = base + '/' + path
    return fetch(url, initRequest)
  }

}
