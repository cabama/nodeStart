import { ISetUpActions, setupTypes } from '../Actions/setupActions'
import { defaultSetUpStore, ISetUpStore } from '../Store/setupStore'

export const SetupReducer = (state: ISetUpStore = defaultSetUpStore, action: ISetUpActions): ISetUpStore => {

  switch (action.type) {
    case setupTypes.changeDevice:
      return { ...state, ...{isMobile: !state.isMobile}}
    case setupTypes.setDevice:
      return { ...state, ...{ isMobile: !state.isMobile }}
    case setupTypes.openDrawable:
      return { ...state, isDrawableVisible: true}
    case setupTypes.changeDrawableView:
      return { ...state, isDrawableVisible: !state.isDrawableVisible}
    case setupTypes.closeDrawable:
      return { ...state, isDrawableVisible: false}
    default:
      return state
  }
}
