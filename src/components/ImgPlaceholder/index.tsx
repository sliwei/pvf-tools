import React, { useState, Fragment, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import PicLoad from '@/assets/images/pic_load.png'
import PicError from '@/assets/images/pic_error.png'

export default ({ style = {}, ...props }: any) => {
  const { display = '' } = style
  const [state, setState] = useState(false)
  const [errorState, setErrorState] = useState(false)
  const load = () => {
    setState(true)
  }

  const error = () => {
    setErrorState(true)
  }

  return (
    <React.Fragment>
      <img
        {...props}
        style={{ ...style, display: state ? display || '' : 'none' }}
        onLoad={load}
        onError={error}
      />
      {!state && !errorState ? (
        <img
          {...props}
          style={{ ...style, margin: '0 auto', width: 'auto', display }}
          src={PicLoad}
          alt="ImgPlaceholder"
        />
      ) : null}
      {errorState ? (
        <img
          {...props}
          style={{ ...style, margin: '0 auto', width: 'auto', display }}
          src={PicError}
          alt="ImgPlaceholder"
        />
      ) : null}
    </React.Fragment>
  )
}
