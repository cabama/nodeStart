export interface IUrlsEnv {
  baseUrl: string,
  baseApi: string,
  baseUsers: string,
  baseAvatar: string,
}

export abstract class Environment {
  public baseUrl: string
  public get baseApi () { return this.baseUrl + '/api' }
  public get baseUsers () { return this.baseApi + '/users'}
  public get basePublic () { return this.baseUrl + '/public'}
  public get baseAvatar () { return this.baseUsers + '/avatar'}

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public getUrls (): IUrlsEnv {
    return {
      baseUrl: this.baseUrl,
      baseApi: this.baseApi,
      baseUsers: this.baseUsers,
      baseAvatar: this.baseAvatar,
    }
  }
}

export class DevEnvironment extends Environment {
  constructor () {
    super('//localhost:2525')
  }
}

export class ProdEnvironment extends Environment {
  constructor () {
    super('//192.168.1.10:2525')
  }
}
