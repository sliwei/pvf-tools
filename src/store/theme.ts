import { atom, selector } from 'recoil'

export const isDarkState = atom({
  key: 'isDark',
  default: false
})

export const isDarkTextState = selector({
  key: 'isDarkTextState',
  // get支持异步
  get: ({ get }) => {
    const isDark = get(isDarkState)
    return isDark ? '黑暗' : '明亮'
  }
})
