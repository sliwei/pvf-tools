import React, { useState, Fragment, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <div className='text-[12px] text-center text-[#ddd]'>{import.meta.env.VITE_APP_TIME}</div>
    </Container>
  )
}

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #969696;
`
