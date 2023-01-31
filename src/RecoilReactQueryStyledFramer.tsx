import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, m } from 'framer-motion'
import { themeStore, useSetRecoilState, useRecoilState, useRecoilValue } from '@/store'
import styled from 'styled-components'
import brushImg from '@/assets/images/brush@2x.png'
import { useQuery, useQueryClient } from 'react-query'

const { isDarkState, isDarkTextState } = themeStore

/**
 * 本页面包含以下库的简单使用介绍，路由http://localhost:3000/demo
 * 1.Recoil状态管理器 https://recoiljs.org/zh-hans/docs/introduction/getting-started
 * 2.framer-motion动画 https://www.framer.com/motion/
 * 3.tailwind 通用css框架，类似bootstrap https://tailwindcss.com/
 * 4.styled-components css in js https://styled-components.com/
 * 5.react-query 管理请求的数据同步库 https://react-query-beta.tanstack.com/quick-start
 */

export default () => {
  /****************** Recoil状态管理器 ********************/
  // 1.获取值
  // const isDark = useRecoilValue(isDarkState)
  // 2.获取设置函数
  // const setIsDark = useSetRecoilState(isDarkState)
  // 3.值和修改函数一起获取
  const [isDark, setIsDark] = useRecoilState(isDarkState)
  // 4.取计算后的值，和vue的计算函数一样，与获取值的函数是一个
  const isDarkText = useRecoilValue(isDarkTextState)
  // 说明：Recoil状态管理器使用方式和useState类似，只是会把状态提权到订阅它的组件之上，单并不是全局，也不能在组件之外修改，这点需要注意
  // 使用：1、2、3按需使用，当需要监听部分数据或者做计算、格式化时可以使用4
  /****************** Recoil状态管理器 ********************/

  /***************** framer-motion动画 *******************/
  const [isShow, setIsShow] = useState(false)
  const defAnimate = {
    // 进入 y：y轴 x：x轴 opacity：透明度 scale：缩放 按需配置
    initial: { y: -20, x: '-110%', opacity: 0, scale: 0.1 },
    // 完成或者结束
    animate: { y: 0, x: 0, opacity: 1, scale: 1 },
    // 退出
    exit: { y: -20, x: '-110%', opacity: 0, scale: 0.1 },
    // 动画配置
    transition: {
      // 时长
      duration: 0.8,
      // 曲线方式
      type: 'spring',
      // 阻尼
      damping: 40,
      // 僵硬度
      stiffness: 600
    }
  }
  // AnimatePresence 组件是允许组件在从 React 树中移除时进行动画处理,不在motion组件外使用的话，没有退出动画
  // motion.div motion.img 等等，是动画的组件
  /***************** framer-motion动画 *******************/

  /**************** tailwind 通用css框架 ******************/
  // tailwind 通用css框架
  // 这库熟练使用真的不错，推荐少写样式，具体class看官网https://tailwindcss.com/
  // 没啥使用介绍，无脑往className上面堆就行，还能直接挂各种动画、动效。
  // 比如：hover:scale-105 hover:cursor-pointer active:scale-95 transition 一眼看懂
  /**************** tailwind 通用css框架 ******************/

  /***************** styled-components *******************/
  const [size, setSize] = useState(16)
  // styled-components 就是将css创建成一个个组件，相对于css mudule还是很方便，可以使用组件自身的变量进行样式控制
  // 但是避免一个组件底下无限子样式，推荐需要写样式的都抽离成一个组件
  // 能与framer-motion动画库搭配使用
  // ！！！避免下面场景，以免引起bug
  // <A>
  //   <div className='title'>AA</div>
  //   <B>
  //     <div className='title'>BB</div>
  //   </B>
  // </A>
  // A = styled.div`
  //   .title {
  //     color: red;
  //   }
  // `
  // B = styled.div`
  //   未设置
  // `
  // 组件B的tile将被组件A的样式影响，所以尽量做到需要自定义样式就抽离成组件，或多使用tailwind css
  /***************** styled-components *******************/

  /************ react-query 管理请求的数据同步库 ************/
  // 返回常用字段
  // isLoading：只会在没有缓存的时候是TRUE，与平时理解的等待不同，当第二次以上query，isLoading不会变化，会一直是false
  // error：错误信息
  // data：返回数据
  // isFetching：是否在query，这个可以理解成loading
  // refetch：重新query函数，可以直接调用
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    // 第一个参数，一般是数组或者直接将依赖放到这里，类似useEffect效果，useState更新或者props更新会使query重新触发
    // 这里依赖了size,当size变化，query也会重新请求
    ['getApi', size],
    // 第二个参数是promise函数，一般是接口
    (props) =>
      new Promise((resolve, reject) => {
        // props.queryKey就是useQuery的第一个参数，方便传给接口进行请求
        console.log(props)
        setTimeout(() => {
          resolve({ data: new Date().toString() })
        }, 2000)
      }),
    // 第三个参数，query的配置，比如重试、缓存、自动请求或获取焦点请求，这些配置也可全局配置，非必填
    {
      // enabled, //默认为true，表示自动请求，false的话则需要你手动
      // retry, //请求失败后，请求的重试次数，也可以为boolean，true为无数次重试，false则不会重试
      // refetchOnWindowFocus，//页面取得焦点时，重新获取数据，默认为true
      // staleTime, //指定缓存时长，以毫秒为单位。
    }
  )

  // 也可以使用queryClient.refetchQueries来重新请求
  const queryClient = useQueryClient()
  // () => queryClient.refetchQueries('getApi')

  // 类似如下写法

  // const getApi = () => {
  //   setLoading(true)
  //   setFetchin(true)
  //   ...
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({ data: new Date().toString() })
  //     }, 2000)
  //   }).then(res => {
  //     setData(res)
  //     ...
  //   }).finally(() => {
  //     setLoading(false)
  //     setFetchin(false)
  //     ...
  //   })
  // }
  // useEffect(() => {
  //   getApi()
  // }, [size])

  // 理解说明：useQuery类似使用useEffect封装了各种小工具（loading、refetch、retry），非常方便
  // 看博文「react-query从拒绝到拥抱」快速了解详细用法 https://cloud.tencent.com/developer/article/1914978
  /************ react-query 管理请求的数据同步库 ************/

  return (
    <Container
      // 尽量使用tailwind语法写样式
      className="p-10"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
    >
      {/* ****************** Recoil状态管理器 ******************** */}
      <Text size={size}>
        这个文案颜色是取得styled-components全局变量，使用Recoil控制 {`${isDark}`} {isDarkText}
      </Text>
      <div>
        <button
          onClick={() => setIsDark((v) => !v)}
          // tailwind语法
          className="rounded text-white bg-blue-600 py-2 px-3 w-80 mt-3 hover:scale-105 hover:cursor-pointer active:scale-95 transition"
        >
          <p className="font-bold">修改Recoil中的主题变量</p>
        </button>
      </div>
      {/* ****************** Recoil状态管理器 ******************** */}

      {/* ***************** framer-motion动画 ******************* */}
      <div className="h-40">
        <button
          onClick={() => setIsShow((v) => !v)}
          className="rounded text-white bg-blue-600 py-2 px-3 w-80 mt-3 hover:scale-105 hover:cursor-pointer active:scale-95 transition"
        >
          <p className="font-bold">framer-motion切换动画</p>
        </button>
        <AnimatePresence>
          {isShow ? (
            <motion.div {...defAnimate} className="w-10 h-10 bg-lime-400">
              <div></div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      {/* ***************** framer-motion动画 ******************* */}

      {/* ***************** styled-components ******************* */}
      <div>
        <button
          onClick={() => setSize((v) => (v === 16 ? 22 : 16))}
          className="rounded text-white bg-blue-600 py-2 px-3 w-80 mt-3 hover:scale-105 hover:cursor-pointer active:scale-95 transition"
        >
          <p className="font-bold">styled-components修改字体大小</p>
        </button>
      </div>
      {/* ***************** styled-components ******************* */}

      {/* ***************** styled-components ******************* */}
      <div>
        <button
          onClick={() => refetch()}
          className="rounded text-white bg-blue-600 py-2 px-3 w-80 mt-3 hover:scale-105 hover:cursor-pointer active:scale-95 transition"
        >
          <p className="font-bold">ReactQuery</p>
        </button>
        <div className="mt-2">{isLoading ? 'isLoading' : 'no isLoading'}</div>
        <div className="mt-2">{isFetching ? 'isFetching' : 'no isFetching'}</div>
        <div className="mt-2">data: {JSON.stringify(data)}</div>
        <div className="mt-2">error: {JSON.stringify(error)}</div>
      </div>
      {/* ***************** styled-components ******************* */}
    </Container>
  )
}

// 这里是将styled-components与framer-motion配合使用的例子
const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  // 也能取到styled的主题变量
  color: ${(props) => props.theme.textColor};
  // 静态资源直接import导入后使用字符模板拼接即可
  background: url('${brushImg}') no-repeat;
  background-color: #fff;
`

const Text = styled.div<{ size: number }>`
  // 字符模板支持函数，返回字符串，props是这个主键自身的值
  font-size: ${(props) => props.size}px;
  // 也能取到styled的主题变量
  color: ${(props) => props.theme.textColor};
`
