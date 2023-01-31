import React, { useEffect } from 'react'

import { Toaster } from 'react-hot-toast'
import Routes from './router'
import { ThemeProvider } from 'styled-components'
import { ReactQueryDevtools } from 'react-query/devtools'
import { darkTheme, lightTheme } from './theme'
import { useRecoilValue, themeStore} from '@/store'
import '@/assets/css/global.css'
import './index.css'

const { isDarkState } = themeStore

export default () => {
  const isDark = useRecoilValue(isDarkState)

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      {/* 路由 */}
      <Routes />

      {/* 全局提示 */}
      <Toaster />

      {/* RQT */}
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  )
}
