// import React, { useEffect } from 'react'

// import { Toaster } from 'react-hot-toast'
// import Routes from './router'
// import { ThemeProvider } from 'styled-components'
// import { ReactQueryDevtools } from 'react-query/devtools'
// import { darkTheme, lightTheme } from './theme'
// import { useRecoilValue, themeStore} from '@/store'
// import '@/assets/css/global.css'
// import './index.css'

// const { isDarkState } = themeStore

// export default () => {
//   const isDark = useRecoilValue(isDarkState)

//   return (
//     <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
//       {/* 路由 */}
//       <Routes />

//       {/* 全局提示 */}
//       <Toaster />

//       {/* RQT */}
//       <ReactQueryDevtools initialIsOpen={true} />
//     </ThemeProvider>
//   )
// }

import React from 'react'
import SwiperCore, { Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import './index.css'

SwiperCore.use([Thumbs])
let slides, slide, progress

export default () => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null)

  return (
    <div>
      {thumbsSwiper && (
        <Swiper
          className="swiper-container"
          watchSlidesProgress
          resistanceRatio={0}
          thumbs={{ swiper: thumbsSwiper }}
          onSetTranslate={function (swiper) {
            slides = swiper.slides
            const offsetAfter = swiper.width * 0.95 //每个slide的位移值
            for (let i = 0; i < slides.length; i++) {
              slide = slides.eq(i)
              progress = slides[i].progress
              console.log(slide)
              slide.transform(
                'translate3d(' +
                  progress * offsetAfter +
                  'px, 0, 0) scale(' +
                  (1 - Math.abs(progress) / 20) +
                  ')'
              )
              slide.css('zIndex', (1 - Math.abs(progress) / 20) * 100)
            }
          }}
          onSetTransition={function (swiper, transition) {
            for (var i = 0; i < swiper.slides.length; i++) {
              slide = swiper.slides.eq(i)
              slide.transition(transition)
            }
          }}
          // on={{
          //   resize: function (swiper: any) {
          //     swiper.update()
          //   },
          //   slideChange: function (swiper: any) {
          //     // console.log(swiper.activeIndex);
          //     // swiper2Root.slideTo(swiper.activeIndex);
          //   },
          //   setTranslate: function (swiper) {
          //     slides = swiper.slides
          //     const offsetAfter = swiper.width * 0.95 //每个slide的位移值
          //     for (let i = 0; i < slides.length; i++) {
          //       slide = slides.eq(i)
          //       progress = slides[i].progress
          //       console.log(slide)
          //       slide.transform(
          //         'translate3d(' +
          //           progress * offsetAfter +
          //           'px, 0, 0) scale(' +
          //           (1 - Math.abs(progress) / 20) +
          //           ')'
          //       )
          //       slide.css('zIndex', (1 - Math.abs(progress) / 20) * 100)
          //     }
          //   },
          //   setTransition: function (swiper, transition) {
          //     for (var i = 0; i < swiper.slides.length; i++) {
          //       slide = swiper.slides.eq(i)
          //       slide.transition(transition)
          //     }
          //   }
          // }}
        >
          <SwiperSlide className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </SwiperSlide>
        </Swiper>
      )}
      <Swiper
        className="swiper-container2"
        onSwiper={setThumbsSwiper}
        slidesPerView={'auto'}
        freeMode
        watchSlidesVisibility
        watchSlidesProgress
      >
        <SwiperSlide className="swiper-slide">
          <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
