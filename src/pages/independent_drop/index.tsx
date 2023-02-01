import React, { useState, Fragment, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineRight } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { BsBellFill } from 'react-icons/bs'

export default () => {
 

  return (
    <Container
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
    >
      test
    </Container>
  )
}

const Container = styled(motion.div)``
