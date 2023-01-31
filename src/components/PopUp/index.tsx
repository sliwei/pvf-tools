import React, { useState, Fragment } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

interface IProps {
  title: string
  className: string
  type?: string
  confirm?: () => void
  cancel: () => void
  children: React.ReactNode
}

export default ({ title, className, type, confirm, cancel, children }: IProps) => {
  return (
    <Container>
      <div className="dialog-exit-bg">
        <span className={className}></span>
        <span>{title}</span>
      </div>
      <div className="dialog-exit-title">{children}</div>
      <div className="dialog-exit-footer">
        {type === 'confirm' ? (
          <Fragment>
            <div className="dialog-exit-btn dialog-exit-btn-cancel" onClick={cancel}>
              取消
            </div>
            <div className="dialog-exit-btn dialog-exit-btn-confirm" onClick={confirm}>
              确定
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="dialog-exit-btn dialog-exit-btn-confirm" onClick={cancel}>
              确定
            </div>
          </Fragment>
        )}
      </div>
    </Container>
  )
}

const Container = styled(motion.div)`
  width: 408px;
  // min-height: 300px;
  position: relative;
  background: #ffffff;
  border-radius: 24px;
  padding-bottom: 30px;
  .dialog-exit-bg {
    // width: 40.8vh;
    height: 120px;
    position: relative;
    // top: -30px;
    // left: 0;
    // z-index: 1;
    background: url('@/components/update/image/bg.png');
    background-size: 100% 100%;
    .dialog-exit-class {
      position: absolute;
      top: -30px;
      right: 20px;
      width: 115px;
      height: 157px;
      background: url('@/components/update/image/bear_1.png') no-repeat center/contain;
    }
    span {
      // position: absolute;
      // left: 3.2vh;
      // top: 6.2vh;
      // z-index: 10;
      line-height: 120px;
      padding-left: 32px;
      font-size: 28px;
      font-weight: 500;
      color: #ffffff;
      text-shadow: 0.1vh 0.1vh 2.6vh rgba(229, 132, 9, 0.63);
    }
  }
  .dialog-exit-title {
    padding: 40px 30px 0;
    font-size: 16px;
    // position: absolute;
    bottom: 14vh;
    line-height: 1.5;
    text-align: center;
    color: #333333;
  }
  .dialog-exit-footer {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    // position: absolute;
    // bottom: 3vh;
    margin-top: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    .dialog-exit-btn {
      cursor: pointer;
      // width: 15.6vh;
      flex: 1;
      height: 48px;
      box-shadow: 0px 0.4vh 0px 0px #fbe7e7;
      border-radius: 24px;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      line-height: 48px;
    }
    .dialog-exit-btn-cancel {
      color: #ff5050;
      background: #fff4f4;
      box-shadow: 0px 0.4vh 0px 0px #fbe7e7;
      margin-right: 15px;
    }
    .dialog-exit-btn-confirm {
      color: #fff;
      box-shadow: 0px 0.4vh 0px 0px #d1385f;
      background: #ff5050;
    }
  }
`
