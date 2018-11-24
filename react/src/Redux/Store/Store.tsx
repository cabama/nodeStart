import { combineReducers } from 'redux'
import { SetupReducer } from '../Reducers/setupReducer'
import { userReducer } from '../Reducers/userReducer'
import { ISetUpStore } from './setupStore'
import { IUserStore } from './userStore'

export interface IMyStore {
  user: IUserStore,
  setup: ISetUpStore
}

export const MyStore = combineReducers({
  user: userReducer,
  setup: SetupReducer,
})
