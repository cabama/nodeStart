export interface ISetUpStore {
  isMobile: boolean
  isDrawableVisible: boolean
}

export const defaultSetUpStore: ISetUpStore = {
  isMobile: /android.+mobile|ip(hone|[oa]d)/i.test(navigator.userAgent),
  isDrawableVisible: false,
}
