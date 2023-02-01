import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { BaseTable } from 'ali-react-table'
import Modal from '@/components/Modal'

interface dataSourceType {
  name: string
  s: number
  ss: number
}

export default () => {
  const [code, setCode] = useState<string>('')
  const [descriptionState, setDescriptionState] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<dataSourceType[]>([
    { name: '白', s: 0, ss: 0 },
    { name: '蓝', s: 0, ss: 0 },
    { name: '紫', s: 0, ss: 0 },
    { name: '粉', s: 0, ss: 0 },
    { name: '史诗', s: 100, ss: 100 },
    { name: '总比率', s: 100, ss: 100 }
  ])

  useEffect(() => {
    const A1 = Math.round(dataSource[0].s * 10000)
    const A2 = Math.round(dataSource[1].s * 10000) + A1
    const A3 = Math.round(dataSource[2].s * 10000) + A2
    const A4 = Math.round(dataSource[3].s * 10000) + A3
    // const A5 = 1000000 - A4

    const B1 = Math.round(dataSource[0].ss * 10000)
    const B2 = Math.round(dataSource[1].ss * 10000) + B1
    const B3 = Math.round(dataSource[2].ss * 10000) + B2
    const B4 = Math.round(dataSource[3].ss * 10000) + B3
    // const B5 = 1000000 - B4

    const txt = `2	${A1}	${A2}	${A3}	${A4}	1000000	1000001	${B1}	${B2}	${B3}	${B4}	1000001	1000002`
    setCode(txt)
  }, [dataSource])

  const ex = () => {
    let arr = code
      .trim()
      .split('	')
      .map((v) => parseInt(v))
    const A1 = arr[1] / 10000
    const A2 = (arr[2] - arr[1]) / 10000
    const A3 = (arr[3] - arr[2]) / 10000
    const A4 = (arr[4] - arr[3]) / 10000
    const A5 = (1000000 - arr[4] || 0) / 10000

    const B1 = arr[7] / 10000
    const B2 = (arr[8] - arr[7]) / 10000
    const B3 = (arr[9] - arr[8]) / 10000
    const B4 = (arr[10] - arr[9]) / 10000
    const B5 = (1000000 - arr[10] || 0) / 10000

    setDataSource((v) => {
      v[0] = { ...v[0], s: A1 || 0, ss: B1 || 0 }
      v[1] = { ...v[1], s: A2 || 0, ss: B2 || 0 }
      v[2] = { ...v[2], s: A3 || 0, ss: B3 || 0 }
      v[3] = { ...v[3], s: A4 || 0, ss: B4 || 0 }
      v[4] = { ...v[4], s: A5, ss: B5 }
      return [...v]
    })
  }

  const changeVal = (type: string, val: string, index: number) => {
    if (type === 's') {
      setDataSource((v) => {
        v[index].s = parseInt(val)
        return [...v]
      })
    } else {
      setDataSource((v) => {
        v[index].ss = parseInt(val)
        return [...v]
      })
    }
  }

  const blurVal = (type: string, val: string, index: number) => {
    if (type === 's') {
      setDataSource((v) => {
        if (parseInt(val) >= 0 && parseInt(val) <= 100) {
          v[index].s = parseInt(val) || 0
        } else {
          v[index].s = 0
        }
        return [...v]
      })
    } else {
      setDataSource((v) => {
        if (parseInt(val) >= 0 && parseInt(val) <= 100) {
          v[index].ss = parseInt(val) || 0
        } else {
          v[index].ss = 0
        }
        return [...v]
      })
    }
    setDataSource((v) => {
      v[4] = {
        ...v[4],
        s: 100 - (v[0].s + v[1].s + v[2].s + v[3].s),
        ss: 100 - (v[0].ss + v[1].ss + v[2].ss + v[3].ss)
      }
      return [...v]
    })
  }

  const columns = [
    {
      name: '物品类型',
      code: 'name',
      width: 120
    },
    {
      name: '困难',
      code: 's',
      width: 120,
      render: (text: number, record: any, index: number) => {
        return (
          <>
            {index >= 4 ? (
              text
            ) : (
              <input
                key={`s${record.name}${index}`}
                onChange={(e) => changeVal('s', e.target.value, index)}
                onBlur={(e) => blurVal('s', e.target.value, index)}
                className="h-[20px] w-[80px] p-0 text-[12px]"
                type="number"
                value={text}
              />
            )}
            %
          </>
        )
      }
    },
    {
      name: '非常困难',
      code: 'ss',
      width: 120,
      render: (text: number, record: any, index: number) => {
        return (
          <>
            {index >= 4 ? (
              text
            ) : (
              <input
                key={`ss${record.name}${index}`}
                onChange={(e) => changeVal('ss', e.target.value, index)}
                onBlur={(e) => blurVal('ss', e.target.value, index)}
                className="h-[20px] w-[80px] p-0 text-[12px]"
                type="number"
                value={text}
              />
            )}
            %
          </>
        )
      }
    }
  ]

  return (
    <Container
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
    >
      <button
        className="rounded text-white bg-blue-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition"
        onClick={() => setDescriptionState(true)}
      >
        使用说明
      </button>
      <textarea
        className="w-full text-xs"
        rows={4}
        onChange={(e) => setCode(e.target.value)}
        value={code}
        placeholder="basis of rarity dicision"
      ></textarea>
      <button
        className="rounded text-white bg-blue-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition"
        onClick={ex}
      >
        回显
      </button>
      &emsp;
      <div className="w-[360px]">
        <BaseTable
          style={{ '--row-height': '16px', '--font-size': '12px', '--cell-padding': '2px 8px' }}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
      <Modal
        show={descriptionState}
        header={'版本说明'}
        cancelText="知道了"
        cancel={() => setDescriptionState(false)}
      >
        {/* 🔥新增 🆕新功能 🐞bug 💄优化修复 🗑废弃 🛠重构 */}
        <pre className="whitespace-pre-wrap text-xs">
          v1.0.2：
          <br />
          🔥深渊爆率计算器、回显数值
          <br />
          <br />
          说明：
          <br />
          深渊爆率计算器
          <br />
          复制itemdropinfo_monster_hell文件basis of rarity
          dicision的值，粘贴到编辑中点击回显自动回填到表格中
          <br />
          编辑表格中的数值，自动生成代码到编辑框，自行复制粘贴回文件即可
          <br />
          注意百分比不要超过100
        </pre>
      </Modal>
    </Container>
  )
}

const Container = styled(motion.div)`
  box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px;
  padding: 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
`
