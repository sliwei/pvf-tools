import React, { useState, Fragment, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

interface IProps {
  title: string
  className?: string
  children?: React.ReactNode
}

export default ({ title, children, className }: IProps) => {
  return (
    <Container className={className}>
      <div className="flex-1">{title}</div>
      {children}
    </Container>
  )
}

const Container = styled(motion.div)`
  display: flex;
  padding-top: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  padding-bottom: 15px;
`
