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

import React, { useEffect } from 'react'
import { Swiper } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import './index.css'

let slides, slide, progress;
// 
export default function Index() {
  useEffect(() => {
    var swiper2Root = new Swiper('.swiper-container2', {
      watchSlidesProgress: true, //查看slide的progress
      freeMode: true,
      slidesPerView: 'auto',
      watchSlidesVisibility: true
      // loop: true,
      // pagination: {
      //   el: ".swiper-pagination",
      //   clickable: true,
      // },
      // on: {
      //   slideChange: function (swiper: any) {
      //     console.log(swiper.activeIndex);
      //     swiperRoot.slideTo(swiper.activeIndex);
      //   },
      // },
    })
    var swiperRoot = new Swiper('.swiper-container', {
      watchSlidesProgress: true, //查看slide的progress
      resistanceRatio: 0, //禁止边缘移动
      thumbs: {
        swiper: swiper2Root,
        autoScrollOffset: 1
      },
      on: {
        resize: function (swiper: any) {
          swiper.update()
        },
        slideChange: function (swiper: any) {
          // console.log(swiper.activeIndex);
          // swiper2Root.slideTo(swiper.activeIndex);
        },
        setTranslate: function () {
          slides = this.slides
          const offsetAfter = this.width * 0.95 //每个slide的位移值
          for (let i = 0; i < slides.length; i++) {
            slide = slides.eq(i)
            progress = slides[i].progress
            slide.transform(
              'translate3d(' +
                progress * offsetAfter +
                'px, 0, 0) scale(' +
                (1 - Math.abs(progress) / 20) +
                ')'
            )
            slide.css('zIndex', (1 - Math.abs(progress) / 20) * 100)
          }
        },
        setTransition: function (swiper, transition) {
          for (var i = 0; i < this.slides.length; i++) {
            slide = this.slides.eq(i)
            slide.transition(transition)
          }
        }
      }
    })
  }, [])
  return (
    <div className="w-full max-w-[750px] m-auto select-none">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
          </div>
          <div className="swiper-slide">
            <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
          </div>
          <div className="swiper-slide">
            <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
          </div>
          <div className="swiper-slide">
            <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
          </div>
          <div className="swiper-slide">
            <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
          </div>
          <div className="swiper-slide">
            <div className="rounded-[80px] overflow-hidden shadow-xl relative">AA</div>
          </div>
        </div>
      </div>
      <div className="swiper-container2">
        <div className="swiper-wrapper">
          <div className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </div>
          <div className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </div>
          <div className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </div>
          <div className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </div>
          <div className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </div>
          <div className="swiper-slide w-[188px] h-[344px]">
            <div className="overflow-hidden shadow-xl relative">BBB</div>
          </div>
        </div>
      </div>
    </div>
  )
}
