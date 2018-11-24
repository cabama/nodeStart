import { LoginService } from '../../Services/LoginService'

export interface IUserStore {
    avatar?: string
    signed: boolean
    login: boolean
    email: string
    origin: 'LOCAL' | 'GOOGLE'
    name: string
    role: 'admin' | 'slave' | null
    loginService?: LoginService
}

export const defaultUser: IUserStore = {
    signed: false,
    login: false,
    name: '',
    email: '',
    origin: 'LOCAL',
    role: null,
}
