import React, { ReactNode } from 'react'

// Layout import
import Layout from '@/layout/Layout'

// Components import
import Login from '@/pages/login'
import Home from '@/pages/home'
import Test from '@/pages/test'
import { Navigate } from 'react-router-dom'

export interface routerType {
  path: string
  component: ReactNode
  children?: routerType[]
}

// 忽略鉴权的路由，鉴权逻辑在[/src/router/index.tsx]中的守卫处
export const ignoreTokenPath = ['/login', '/', '/test']

const router: routerType[] = [
  {
    path: '/login',
    component: <Login />
  },
  {
    path: '/',
    component: <Layout />,
    children: [
      {
        path: '/',
        component: <Home />
      },
      {
        path: '/test',
        component: <Test />
      },
    ]
  },
  {
    path: '*',
    component: <Navigate to="/login" />
  }
]

export default router
