import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import router, { routerType, ignoreTokenPath } from './conf'
import CustomRouter from './CustomRouter'
import history from './history'


// 守卫
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  let location = useLocation()
  const userId = localStorage.getItem('userid') || false
  const token = localStorage.getItem('token') || false
  // 注意，如果路由中没有「/」的声明，一定要排除，不然Navigate受两次跳转会失效
  if (ignoreTokenPath.indexOf(location.pathname) === -1 && (!userId || !token)) {
    return <Navigate to="/login" state={{ from: location }} replace />
  } else {
    return <>{children}</>
  }
}

// 循环
const RouterTree = (tree: routerType[]) => {
  return tree.map(({ path, component, children }) => {
    if (children && children.length) {
      return (
        <Route key={path} path={path} element={component}>
          {RouterTree(children)}
        </Route>
      )
    } else {
      return <Route key={path} path={path} element={<RequireAuth>{component}</RequireAuth>} />
    }
  })
}

// 动画
const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence
      exitBeforeEnter
      initial={true}
      onExitComplete={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 })
        }
      }}
    >
      <Routes location={location} key={location.pathname}>
        {RouterTree(router)}
      </Routes>
    </AnimatePresence>
  )
}

export default () => {
  return (
    <CustomRouter
      history={history}
      basename={''}
    >
      <AnimatedRoutes />
    </CustomRouter>
  )
}
