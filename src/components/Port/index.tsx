import React, { useState, Fragment, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { portStore, dataStore, useRecoilState } from '@/store'
import yunxing from '@/assets/images/yunxing.svg'
import tingzhi from '@/assets/images/tingzhi.svg'
import loadingGif from '@/assets/images/Iphone-spinner-2.gif'
import { toast } from 'react-hot-toast'
import Modal from '../Modal'

import lstData from './lst'

const { portState } = portStore
const { isLoadLstState, lstListState, lstDisableLoadState, lstState } = dataStore

export default () => {
  const [port, setPort] = useRecoilState(portState)
  const [thatPort, setThatPort] = useState(port)
  const [isLoadLst, setIsLoadLst] = useRecoilState(isLoadLstState)
  const [lstList, setLstList] = useRecoilState(lstListState)
  const [lstDisableLoad, setLstDisableLoad] = useRecoilState(lstDisableLoadState)
  const [lst, setLst] = useRecoilState(lstState)
  const [loadLstWin, setLoadLstWin] = useState(false)

  const { isLoading, error, data, isFetching, refetch } = useQuery<any>(
    // 第一个参数，一般是数组或者直接将依赖放到这里，类似useEffect效果，useState更新或者props更新会使query重新触发
    // 这里依赖了size,当size变化，query也会重新请求
    ['getVersion'],
    // 第二个参数是promise函数，一般是接口
    (props) => axios.get(`http://localhost:${port}/Api/PvfUtiltiy/getVersion`),
    // (props) =>
    //   new Promise((resolve, reject) => {
    //     // props.queryKey就是useQuery的第一个参数，方便传给接口进行请求
    //     setTimeout(() => {
    //       resolve({ data: { Data: '2022.9.30.3', IsError: false, Msg: null } })
    //     }, 2000)
    //   }),
    // 第三个参数，query的配置，比如重试、缓存、自动请求或获取焦点请求，这些配置也可全局配置，非必填
    {
      refetchInterval: 5000
      // enabled, //默认为true，表示自动请求，false的话则需要你手动
      // retry: 2, //请求失败后，请求的重试次数，也可以为boolean，true为无数次重试，false则不会重试
      // refetchOnWindowFocus，//页面取得焦点时，重新获取数据，默认为true
      // staleTime, //指定缓存时长，以毫秒为单位。
    }
  )

  useEffect(() => {
    if (data?.data.IsError === false && !isLoadLst) {
      toast.success(`连接pvfUtility成功，版本：${data.data.Data}`)
      loadLst()
    }
  }, [data])

  const loadLst = () => {
    setLoadLstWin(true)
    setIsLoadLst(true)
    // axios.get(`http://localhost:${port}/Api/PvfUtiltiy/GetAllLstFileList`).then((res: any) => {
    //   const thatLstList = res.data.Data.map((v) => ({
    //     isLoad: lstDisableLoad.includes(v),
    //     path: v,
    //     isLoading: false,
    //     isFetching: false
    //   }))
    const thatLstList = [
      'equipment/equipment.lst', // 装备
      'stackable/stackable.lst', // 物品
      'aicharacter/aicharacter.lst', // 人偶
      'creature/creature.lst' // 宠物
    ]
    setLstList(thatLstList)

    setLst({})
    localStorage.lst = ''
    setTimeout(() => {
      loopLoadLst(0, thatLstList)
    }, 100)
    // })
  }

  const loopLoadLst = (i: number, list: any) => {
    console.log(i)
    setLstList((v: any) => {
      const tv = [...v]
      tv[i] = {
        ...tv[i],
        isFetching: true
      }
      return tv
    })

    axios
      .get(`http://localhost:${port}/Api/PvfUtiltiy/getLstFileInfo?filePath=${list[i].path}`)
      .then((res) => {
        // setTimeout(() => {
        setLstList((v: any) => {
          const tv = [...v]
          tv[i] = {
            ...tv[i],
            isLoading: true,
            isFetching: false
          }
          return tv
        })
        setLst((v) => {
          const ov = { ...v }
          const oLst = res.data.Data
          Object.keys(oLst).forEach((v) => {
            ov[v] = oLst[v].ItemName
          })
          return ov
        })
        if (i + 1 < list.length) {
          loopLoadLst(i + 1, list)
        }
        // }, 200)
      })
  }

  const editPort = () => {
    if (thatPort !== port) {
      setPort(thatPort)
      setIsLoadLst(false)
      toast.success('端口修改成功')
    } else {
      toast.error('端口无变化')
    }
  }

  return (
    <Container>
      <div className="flex items-center">
        连接状态：
        <div className="w-[20px]">
          {isLoading ? (
            <img className="w-[20px]" src={loadingGif}></img>
          ) : (
            <div>
              {error ? (
                <img className="w-[20px]" src={tingzhi}></img>
              ) : (
                <img className="w-[20px]" src={yunxing}></img>
              )}
            </div>
          )}
        </div>
        &ensp;{data?.data.Data || '0.0.0'}
        &ensp;{' '}
        <input
          type="number"
          className="h-[32px] w-[90px] block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={thatPort}
          onChange={(e) => setThatPort(parseInt(e.target.value || '0'))}
        ></input>{' '}
        &ensp;
        <button
          onClick={editPort}
          className="rounded text-white bg-blue-600 py-1 px-2 hover:scale-105 hover:cursor-pointer active:scale-95 transition flex items-center"
        >
          修改端口
        </button>
      </div>
      <Modal
        show={loadLstWin}
        header={`加载Lst数据 - ${Object.keys(lst).length}`}
        cancel={() => setLoadLstWin(false)}
        cancelText="后台加载"
      >
        <div className="text-[14px] py-[20px]">
          {lstList.map((v: any, i: number) => (
            <div key={i}>
              {v.path} {v.isLoading ? '加载完成' : ''} {v.isFetching ? '加载中...' : ''}
            </div>
          ))}
        </div>
      </Modal>
    </Container>
  )
}

const Container = styled(motion.div)``
