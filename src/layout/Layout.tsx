import React, { Fragment, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import bgImg from '@/assets/images/cubes.png'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

const Container = styled(motion.div)`
  background-image: url('${bgImg}');
  background-color: #fff;
`
const Center = styled(motion.div)``
const Left = styled(motion.div)``
const Right = styled(motion.div)`
  /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px; */
`

export default () => {
  return (
    <Container className="w-screen min-h-screen">
      <Header />
      <Center className="w-[1200px] ml-auto mr-auto pt-[20px] pb-[20px] flex">
        <Left>
          <Menu />
        </Left>
        <Right className="flex-1 ml-[20px] ">
          <Outlet />
          <Footer />
        </Right>
      </Center>
    </Container>
  )
}
