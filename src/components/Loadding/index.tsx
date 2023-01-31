import React, { useState, Fragment, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

interface Props {
  state: boolean
  children: React.ReactNode
}

export default ({ state, children }: Props) => {
  return (
    <React.Fragment>
      {state ? (
        <Container className="w-full h-full absolute z-50 top-0 left-0 flex items-center justify-center">
          <span className="loader"></span>
        </Container>
      ) : null}
      {children}
    </React.Fragment>
  )
}

const Container = styled(motion.div)`
  .loader {
    width: 36px;
    height: 36px;
    border: 4px solid #ddd;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
