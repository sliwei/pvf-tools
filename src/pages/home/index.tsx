import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { BaseTable } from 'ali-react-table'
import Modal from '@/components/Modal'

interface dataSourceType {
  id: string | number
  name: string
  probability: number
  num: number
  message: number
}

export default () => {
  const [code, setCode] = useState<string>('')
  const [addState, setAddState] = useState<boolean>(false)
  const [impStackableState, setImpStackableState] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<number>(0)
  const [dataSource, setDataSource] = useState<dataSourceType[]>([])
  const [addId, setAddId] = useState<string>('')
  const [max, setMax] = useState<number>(0)
  const [stackableTxt, setStackableTxt] = useState<string>('')
  const [stackable, setStackable] = useState<{ [key: number]: string }>(
    JSON.parse(localStorage.stackable || '{}')
  )

  const add = () => {
    setDataSource((v) => {
      v.push({
        id: addId,
        name: stackable[addId],
        probability: 10000,
        num: 1,
        message: 0
      })
      return [...v]
    })
    setAddId('')
    setAddState(false)
  }

  const setStackableEx = () => {
    let obj = {}
    stackableTxt.split(/\n/).forEach((v) => {
      obj[v.split(/\t/)[0]] = v.split(/\t/)[1]
    })
    setStackable(obj)
    localStorage.stackable = JSON.stringify(obj)
    setImpStackableState(false)
  }

  const ex = () => {
    let list: dataSourceType[] = []
    let arr = code.split('	')
    for (let i = 0; i < Math.ceil(arr.length / 4); i++) {
      list.push({
        id: arr[i * 4 + 0],
        name: stackable[arr[i * 4 + 0]],
        probability: parseInt(arr[i * 4 + 1]),
        num: parseInt(arr[i * 4 + 2]) || 1,
        message: parseInt(arr[i * 4 + 3]) || 0
      })
    }
    setDataSource(list)
  }

  useEffect(() => {
    let m = 0
    dataSource.forEach((v) => (m += v.probability))
    setMax(m / 10000)
  }, [dataSource.length, refresh])

  const del = (index: number) => {
    setDataSource((v) => {
      v.splice(index, 1)
      return [...v]
    })
  }

  const out = () => {
    if (dataSource.length < 1) {
      toast('你还未解析或添加物品')
      return
    }
    let txt = ``
    dataSource.forEach((v) => {
      txt += `${v.id}	${v.probability}	${v.num}	${v.message}	`
    })
    setCode(txt.slice(0, txt.length - 1))
    console.log(txt.slice(0, txt.length - 1))
    toast('生成成功，请复制编辑框的内容')
  }
  const changeVal = (type: string, val: string, index: number) => {
    if (type === 'probability') {
      setDataSource((v) => {
        v[index].probability = parseFloat(val) * 10000
        return [...v]
      })
    } else if (type === 'num') {
      setDataSource((v) => {
        v[index].num = parseInt(val)
        return [...v]
      })
    } else if (type === 'message') {
      setDataSource((v) => {
        v[index].message = parseInt(val)
        return [...v]
      })
    }
    setRefresh(new Date().getTime())
  }

  const columns = [
    {
      name: 'index',
      code: 'index',
      render: (text: number, record: any, index: number) => {
        return index + 1
      }
    },
    {
      name: 'id',
      code: 'id'
    },
    {
      name: 'name',
      code: 'name',
      width: 300
    },
    {
      name: 'probability',
      code: 'probability',
      width: 120,
      render: (text: number, record: any, index: number) => {
        return (
          <>
            <input
              key={`probability${record.id}${index}`}
              onChange={(e) => changeVal('probability', e.target.value, index)}
              className="h-[20px] w-[80px] p-0 text-[12px]"
              type="number"
              value={text / 10000}
            />
            %
          </>
        )
      }
    },
    {
      name: 'num',
      code: 'num',
      width: 120,
      render: (text: number, record: any, index: number) => {
        return (
          <input
            key={`probability${record.id}${index}`}
            onChange={(e) => changeVal('num', e.target.value, index)}
            className="h-[20px] w-[80px] p-0 text-[12px]"
            type="number"
            value={text}
          />
        )
      }
    },
    {
      name: 'message',
      code: 'message',
      width: 120,
      render: (text: number, record: any, index: number) => {
        return (
          <input
            key={`probability${record.id}${index}`}
            onChange={(e) => changeVal('message', e.target.value, index)}
            className="h-[20px] w-[80px] p-0 text-[12px]"
            type="number"
            value={text}
          />
        )
      }
    },
    {
      name: '操作',
      code: 'action',
      render: (text: number, record: any, index: number) => {
        return (
          <button className="text-red-500" onClick={() => del(index)}>
            删
          </button>
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
      <span>stackable/twdf/cash/randomcerabox/randomcerabox_tw.stk</span>
      <textarea
        className="w-full text-xs"
        rows={4}
        onChange={(e) => setCode(e.target.value)}
        value={code}
      ></textarea>
      <button onClick={() => setImpStackableState(true)}>导入stackable</button>&emsp;
      <button onClick={() => setAddState(true)}>添加一列</button>&emsp;
      <button onClick={ex}>解析</button>&emsp;
      <button onClick={out}>生成</button>&emsp; 百分比：<span>{max}</span>
      <BaseTable
        style={{ '--row-height': '16px', '--font-size': '12px', '--cell-padding': '2px 8px' }}
        dataSource={dataSource}
        columns={columns}
      />
      <Modal show={addState} header={''} cancel={() => setAddState(false)} confirm={add}>
        <input
          className=" p-4 border w-full h-[26px] text-[12px]"
          value={addId}
          placeholder="物品ID"
          onChange={(e) => setAddId(e.target.value)}
        ></input>
      </Modal>
      <Modal
        show={impStackableState}
        header={''}
        cancel={() => setImpStackableState(false)}
        confirm={setStackableEx}
      >
        <textarea
          className="w-full text-xs"
          value={stackableTxt}
          rows={4}
          placeholder="stackable"
          onChange={(e) => setStackableTxt(e.target.value)}
        ></textarea>
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
