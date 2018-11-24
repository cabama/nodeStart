import { LoginService } from '../../Services/LoginService'
import { IUserActions, UserTypes} from '../Actions/UserActions'
import { defaultUser, IUserStore } from '../Store/userStore'

export const userReducer = (state: IUserStore = defaultUser, action: IUserActions) => {
  switch (action.type) {
    case UserTypes.loginEmail:
      LoginService.loginWithEmail(action.action.email!, action.action.password!)
        .then((userP) => action.action.dispatch!({
          type: UserTypes.logged,
          action: { user: userP || undefined },
        },
      ))
      return state
    case UserTypes.loginToken:
      LoginService.loginWithToken()
        .then((userP) => {
          if (!userP || !action.action.dispatch) return
          action.action.dispatch({
            type: UserTypes.logged,
            action: { user: userP || undefined },
          })
        })
      return state
    case UserTypes.logout:
      LoginService.removeToken()
      return defaultUser
    case UserTypes.logged:
      return { ...state, ...action.action.user, login: true}
    case UserTypes.updated:
      return { ...state, ...action.action.user }
    default:
      return state
  }
}
