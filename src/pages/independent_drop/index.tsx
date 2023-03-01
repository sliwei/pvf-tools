import React, { useState, Fragment, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineRight } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { AiFillQuestionCircle, AiOutlineSearch, AiOutlineSave } from 'react-icons/ai'
import 'handsontable/dist/handsontable.full.min.css'
import Handsontable from 'handsontable/base'
import { registerAllModules } from 'handsontable/registry'
import { registerLanguageDictionary, zhCN } from 'handsontable/i18n'
import { HotTable } from '@handsontable/react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import lst from './data.js'
// import hezi from './hezi.js'
import noDataSvg from '@/assets/images/noData.svg'
import axios from 'axios'

registerAllModules()
registerLanguageDictionary(zhCN)

export default () => {
  const [data, setData] = useState<any[]>([])
  const [active, setActive] = useState<null | number>(null)
  const [out, setOut] = useState<number>(0)
  const hotRef = useRef<any>(null)

  // useEffect(() => {
  //   init()
  // }, [])

  const init = () => {
    axios
      .get(
        `http://localhost:27000/Api/PvfUtiltiy/GetFileContent?filePath=stackable/twdf/cash/randomcerabox/randomcerabox_tw.stk&useCompatibleDecompiler=true&encodingType=CN`
      )
      .then((res: any) => {
        const txt = res.Data
        const random = txt.substring(txt.indexOf('[random]'), txt.indexOf('[/random]'))
        let randomArr: string[] = random.split('[random list]')
        const randomArrList = randomArr.map((v) => {
          if (v.indexOf('[default list]') !== -1) {
            return v
              .substring(v.indexOf('[default list]') + 14, v.indexOf('[/default list]'))
              .split(`	`)
              .map((v) => v.replace(/\r\n/g, ''))
              .filter((v) => v)
          } else {
            return v
              .substring(0, v.indexOf('[/random list]'))
              .split(`	`)
              .map((v) => v.replace(/\r\n/g, ''))
              .filter((v) => v)
          }
        })
        const randomArrList2 = randomArrList.map((v) => {
          let arr: any[] = []
          for (let i = 0; i < Math.ceil(v.length / 4); i++) {
            arr.push(
              i === 0
                ? [
                    parseInt(v[i * 4 + 1]),
                    lst.Data[v[i * 4 + 1]]?.ItemName || '-',
                    '\\',
                    parseInt(v[i * 4 + 2]) || 1,
                    parseInt(v[i * 4 + 3]) || 0
                  ]
                : [
                    parseInt(v[i * 4 + 0]),
                    lst.Data[v[i * 4 + 0]]?.ItemName || '-',
                    parseInt(v[i * 4 + 1]),
                    parseInt(v[i * 4 + 2]) || 1,
                    parseInt(v[i * 4 + 3]) || 0
                  ]
            )
          }
          return arr
        })
        setData(randomArrList2)
      })
  }

  const save = () => {
    if (hotRef.current) {
      const hot = hotRef.current.hotInstance
      console.log(hot.getData())
    }
  }

  const calculated = (dat?: any[]) => {
    if (hotRef.current) {
      const hot = hotRef.current.hotInstance
      const thatData = dat || hot.getData()
      let thatOut = 0
      thatData.forEach((v: any[], i: number) => {
        i !== 0 ? (thatOut += v[2]) : null
      })
      setOut(thatOut)
    }
  }

  const switchRandom = (i: number) => {
    if (hotRef.current && active !== null) {
      const hot = hotRef.current.hotInstance
      setData((v) => {
        v[active] = hot.getData()
        return v
      })
    }
    setActive(i)
    calculated(data[i])
    // setTimeout(() => {
    //   const hot = hotRef.current.hotInstance
    //   hot.updateSettings({
    //     cells(row: any, col: any) {
    //       const cellProperties: any = {}
    //       if (hot.getData()[row][col] === '\\') {
    //         cellProperties.readOnly = true
    //         cellProperties.className = 'htRight'
    //       }
    //       return cellProperties
    //     }
    //   })
    // }, 0)
  }

  return (
    <Container
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className=" flex"
    >
      <div className="w-[170px] px-3.5">
        <div className="flex items-center justify-between">
          <button
            onClick={init}
            className="rounded text-white bg-blue-600 py-1 px-2 mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition flex items-center"
          >
            <AiOutlineSearch />
            读取
          </button>
          <button
            onClick={save}
            className="rounded text-white bg-[#ff9800] py-1 px-2 mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition flex items-center"
          >
            <AiOutlineSave />
            保存
          </button>
        </div>
        {data.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              i !== active ? switchRandom(i) : null
            }}
            className={`mb-[2px] text-[14px] cursor-pointer flex items-center rounded-md p-1.5 hover:bg-indigo-600 hover:text-white ${
              i === active ? 'bg-indigo-600 text-white' : ''
            }`}
          >
            {i === 0 ? 'default list' : `random list ${i}`}
          </div>
        ))}
      </div>
      <div className="flex-1">
        <Tooltip id="my-tooltip" />
        <div className="flex">
          <div className="flex-1 flex items-center">
            <button
              onClick={() => calculated()}
              className="rounded text-white bg-blue-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition"
            >
              计算概率
            </button>
            <span className="text-[#8bc34a] text-[14px]">
              当前: 1,000,000(100%总概率) - {out}({(out / 10000).toFixed(2)}%其他物品) ={' '}
              {(1000000 - out).toFixed(0)}({`${(100 - out / 10000).toFixed(2)}`}%第一个物品)
            </span>
            <AiFillQuestionCircle
              data-tooltip-id="my-tooltip"
              data-tooltip-content="第一个物品的概率等于100万减去其他物品概率之和"
              className="text-[#ff9800] text-[24px]"
            />
          </div>
        </div>
        {active !== null ? (
          <HotTable
            ref={hotRef}
            filters={true}
            dropdownMenu={true}
            data={data[active]}
            colHeaders={(index) => ['物品id', '名称', '几率', '获得数量', '是否公告'][index]}
            colWidths={[90, 370, 90, 90, 90]}
            afterGetColHeader={(_, TH) => {
              TH.setAttribute('title', TH.querySelector('span')?.textContent as string)
            }}
            contextMenu={[
              'row_above',
              'row_below',
              '---------',
              'undo',
              'redo',
              '---------',
              'remove_row'
            ]}
            width="100%"
            height={600}
            rowHeaders
            language="zh-CN"
            columns={(index) => {
              return {
                type: index >= 2 ? 'numeric' : 'text',
                readOnly: index < 2
              }
            }}
            cell={[{ row: 0, col: 2, className: 'htRight', readOnly: true }]}
            licenseKey="non-commercial-and-evaluation"
          />
        ) : (
          <div className="border-[#e5e7eb] w-full h-[240px] border-[1px] flex items-center justify-center flex-col">
            <img className="h-[70%]" src={noDataSvg} />
            <span className="mt-[-20px] text-[#bbb] text-[14px]">没有数据</span>
          </div>
        )}
      </div>
    </Container>
  )
}

const Container = styled(motion.div)`
  box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px;
  padding: 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
`
