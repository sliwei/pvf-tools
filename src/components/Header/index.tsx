import React, { useState, Fragment, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import LogoImg from '@/assets/images/logo.png'
import UserAvatarImg from '@/assets/images/logo.png'
import ImgPlaceholder from '../ImgPlaceholder'
import { useRecoilValue, useSetRecoilState } from '@/store'
import { BsGithub } from 'react-icons/bs'
import Port from '../Port'

export default () => {
  return (
    <Container className="w-full h-[80px] bg-white m-0 p-0">
      <div className="h-full w-[1200px] ml-auto mr-auto flex justify-center items-center">
        <div className=" h-full flex justify-center items-center">
          <a className=" block h-[57px]" href="/">
            <ImgPlaceholder className=" h-full w-auto" src={LogoImg} alt="logo" />
          </a>
        </div>
        <div className="ml-4">pvf.bstu.cn</div>
        <div className="ml-4 flex-1">
          <Port />
        </div>
        <div>
          <a target="_blank" href="https://github.com/sliwei/pvf-tools">
            <BsGithub />
          </a>
        </div>
      </div>
    </Container>
  )
}

const Container = styled(motion.div)`
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  .nav {
    position: relative;
    a {
      transition: all 0.15s;
    }
    &:hover {
      a {
        color: #000;
        font-weight: bold;
      }
      ::before {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        margin-left: -12px;
        width: 24px;
        height: 2px;
        background: #ff3300;
      }
    }
  }
  .avtice {
    a {
      color: #000;
      font-weight: bold;
    }
    ::before {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0;
      margin-left: -12px;
      width: 24px;
      height: 2px;
      background: #ff3300;
    }
  }
`
