import { atom, selector } from 'recoil'

export const randomceraboxState = atom({
  key: 'randomcerabox',
  default: ''
})

export const lstListState = atom({
  key: 'lstList',
  default: localStorage?.lstList?.split(',') || []
})

export const lstState = atom<any>({
  key: 'lst',
  default: localStorage?.lst ? JSON.parse(localStorage.lst) : {}
})

export const lstDisableLoadState = atom({
  key: 'lstDisableLoad',
  default: localStorage.lstDisableLoad || ''
})

export const isLoadLstState = atom({
  key: 'isLoadLst',
  default: false
})
