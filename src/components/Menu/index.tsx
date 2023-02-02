import React, { useState, Fragment, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import { TbToolsOff } from 'react-icons/tb'
import { AiOutlineBook, AiOutlineControl, AiOutlineDesktop, AiOutlineRight } from 'react-icons/ai'
import { useRecoilValue, themeStore, useRecoilState, useSetRecoilState } from '@/store'
import Modal from '../Modal'

const menu = [
  {
    icon: <TbToolsOff />,
    title: 'Pvf Tools',
    subitem: [
      {
        title: '魔盒编辑器',
        link: '/',
        type: 0
      },
      {
        title: '爆率计算器',
        link: '/itemdropinfo_monster_hell',
        type: 0
      },
      {
        title: '金币掉落',
        link: '/itemdropinfo_common',
        type: 0
      },
      {
        title: '独立掉落',
        link: '/independent_drop',
        type: 0
      },
      {
        title: 'NPC商店',
        link: '/itemshop',
        type: 0
      },
      {
        title: '翻牌',
        link: '/itemdropinfo_clearreward',
        type: 0
      },
      {
        title: '小怪',
        link: '/itemdropinfo_monseter',
        type: 0
      },
      {
        title: '绿名怪',
        link: '/itemdropinfo_monseter_extra',
        type: 0
      }
    ]
  }
]

export default () => {
  const location = useLocation()

  return (
    <Container className="w-[160px]">
      <ul className="m-0 p-0 list-none">
        {menu.map(({ icon, title, subitem }) => (
          <li className="group" key={title}>
            <div className="flex items-center justify-start text-[16px]">
              <div className="text-[#6a6a6a] w-[20px]">{icon}</div>
              <div className="ml-[5px] font-medium">{title}</div>
            </div>
            <ul className="m-0 p-0 list-none ml-[25px]">
              {subitem.map(({ title, link, type }) => (
                <li
                  className={`subitem text-[14px] mt-[16px] mb-[16px] flex items-center justify-start ${
                    location.pathname === link ? 'actives' : ''
                  }`}
                  key={title}
                >
                  {type === 0 ? (
                    <NavLink to={link} className="flex-1">
                      {title}
                    </NavLink>
                  ) : null}
                  {type === 1 ? (
                    <a className="flex-1" href={link}>
                      {title}
                    </a>
                  ) : null}
                  <AiOutlineRight />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Container>
  )
}

const Container = styled(motion.div)`
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
  .group {
    position: relative;
    margin-bottom: 40px;
    ::before {
      content: '';
      position: absolute;
      bottom: -20px;
      width: 100%;
      height: 1px;
      background: #ededed;
    }
    :last-child {
      ::before {
        display: none;
      }
    }
    .subitem {
      transition: all 0.15s;
      :hover {
        color: #ff3300;
      }
    }
    .actives {
      color: #ff3300;
    }
  }
`
