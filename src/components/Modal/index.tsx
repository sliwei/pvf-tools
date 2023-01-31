import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import useAnimationState from '@/hooks/useAnimationState'
import { BsXLg } from 'react-icons/bs'

interface IProps {
  /*
   * 是否显示
   */
  show: boolean
  /*
   * 是否点击遮罩关闭
   */
  shadowClick?: boolean
  /*
   * 标题
   */
  title?: string
  /*
   * 头部
   */
  header?: React.ReactNode
  /*
   * 底部
   */
  footer?: React.ReactNode
  /*
   * 取消文案
   */
  cancelText?: string
  /*
   * 确认文案
   */
  confirmText?: string
  /*
   * 取消事件
   */
  cancel?: (status: boolean) => void
  /*
   * 确认事件
   */
  confirm?: (() => void) | null
  /*
   * 内容体
   */
  children: React.ReactNode
  /*
   * 自定义弹窗体样式
   */
  style?: any
  /*
   * 自定义弹窗体样式名
   */
  className?: any
}

const defAnimate = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.3 },
  transition: {
    duration: 0.25,
    type: 'spring',
    damping: 35,
    stiffness: 600
  }
}

export const fullAnimate = {
  initial: { y: '110%' },
  animate: { y: 0 },
  exit: { y: '110%' },
  transition: {
    duration: 0.25,
    type: 'spring',
    damping: 40,
    stiffness: 600
  }
}

const maskAnimate = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 }
}

export default ({
  show = false,
  shadowClick = true,
  header = null,
  footer = null,
  cancelText = '取消',
  confirmText = '确定',
  title = '',
  cancel: fatherCancel = () => {},
  confirm = null,
  children,
  style = {},
  className = ''
}: IProps) => {
  const [localState, animation, setAnimationState] = useAnimationState()
  const [bodyOverflow, setBodyOverflow] = useState('')
  const [tid] = useState(new Date().getTime())

  useEffect(() => {
    setAnimationState(show)
    if (show) {
      setBodyOverflow(document.body.style.overflow)
      document.body.style.overflow = 'hidden'
    } else {
      setTimeout(() => {
        const modal_container: any = document.querySelector('.modal_container')
        if (!modal_container) {
          document.body.style.overflow = bodyOverflow
        }
      }, 500)
    }
  }, [show, bodyOverflow])

  const cancel = () => {
    fatherCancel(false)
  }

  return localState ? (
    <Container
      className={`modal_container w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[9000]`}
    >
      <AnimatePresence>
        {animation ? (
          <motion.div
            {...maskAnimate}
            key="mask"
            className="mark bg-[#00000050] w-full h-full absolute top-0 left-0 z-[9001]"
            onClick={shadowClick ? cancel : undefined}
          ></motion.div>
        ) : null}
        {animation ? (
          <motion.div
            {...defAnimate}
            className="sprite-box max-h-screen overflow-auto z-[9002] py-[10px] px-[10px]"
          >
            <div key="sprite" className={`${className} sprite`} style={style}>
              {header !== null ? (
                header
              ) : (
                <div className="header flex items-center justify-center pb-[10px] mb-[10px] relative">
                  <div className=" text-[20px] text-[#333] flex-1">{title}</div>
                  <div
                    onClick={cancel}
                    className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer text-[#666] hover:scale-105 hover:cursor-pointer active:scale-95 transition"
                  >
                    <BsXLg />
                  </div>
                </div>
              )}
              {children}
              {footer !== null ? (
                footer
              ) : (
                <div className=" flex items-center justify-center mt-[10px]">
                  <button
                    onClick={cancel}
                    className="mx-[10px] rounded-full px-[40px] py-[9px] text-[#ff3300] bg-[#ffeee8] border-[#ff3300] border-[1px] border-solid hover:scale-105 hover:cursor-pointer active:scale-95 transition"
                  >
                    {cancelText}
                  </button>
                  {confirm !== null ? (
                    <button
                      onClick={confirm}
                      className="mx-[10px] btn-style rounded-full px-[40px] py-[10px] text-[#FFF] hover:scale-105 hover:cursor-pointer active:scale-95 transition"
                    >
                      {confirmText}
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Container>
  ) : null
}

const Container = styled(motion.div)`
  .sprite-box {
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      background-color: transparent;
    }
    ::-webkit-scrollbar-track {
      /*-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.6);*/
      border-radius: 8px;
      /*background-color: rgba(255,255,255,0.2);*/
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 0;
      /*-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);*/
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .sprite {
    min-width: 400px;
    min-height: 150px;
    padding: 20px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 0px 0px 4px rgba(255, 255, 255, 0.25);
    .header {
      ::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: #f3f3f3;
      }
    }
    .footer {
    }
    .btn-style {
      background: linear-gradient(39deg, #ff742f 0%, #ff3300 100%);
    }
  }
`
