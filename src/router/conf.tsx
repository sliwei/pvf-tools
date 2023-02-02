import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
// Layout import
import Layout from '@/layout/Layout'

// Components import
import Login from '@/pages/login'
import RandomceraboxTw from '@/pages/randomcerabox_tw'
import ItemdropinfoMonsterHell from '@/pages/itemdropinfo_monster_hell'
import IndependentDrop from '@/pages/independent_drop'
import Itemshop from '@/pages/itemshop'
import ItemdropinfoClearreward from '@/pages/itemdropinfo_clearreward'
import ItemdropinfoMonseter from '@/pages/itemdropinfo_monseter'
import ItemdropinfoMonseterExtra from '@/pages/itemdropinfo_monseter_extra'
import ItemdropinfoCommon from '@/pages/itemdropinfo_common'

export interface routerType {
  path: string
  component: ReactNode
  children?: routerType[]
}

// 忽略鉴权的路由，鉴权逻辑在[/src/router/index.tsx]中的守卫处
export const ignoreTokenPath = [
  '/',
  '/login',
  '/itemdropinfo_monster_hell',
  '/independent_drop',
  '/itemshop',
  '/itemdropinfo_clearreward',
  '/itemdropinfo_monseter',
  '/itemdropinfo_monseter_extra',
  '/itemdropinfo_common'
]

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
        component: <RandomceraboxTw />
      },
      {
        path: '/itemdropinfo_monster_hell',
        component: <ItemdropinfoMonsterHell />
      },
      {
        path: '/independent_drop',
        component: <IndependentDrop />
      },
      {
        path: '/itemshop',
        component: <Itemshop />
      },
      {
        path: '/itemdropinfo_clearreward',
        component: <ItemdropinfoClearreward />
      },
      {
        path: '/itemdropinfo_monseter',
        component: <ItemdropinfoMonseter />
      },
      {
        path: '/itemdropinfo_monseter_extra',
        component: <ItemdropinfoMonseterExtra />
      },
      {
        path: '/itemdropinfo_common',
        component: <ItemdropinfoCommon />
      }
    ]
  },
  {
    path: '*',
    component: <Navigate to="/login" />
  }
]

export default router
