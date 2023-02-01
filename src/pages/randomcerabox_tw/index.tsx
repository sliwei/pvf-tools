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
  const [descriptionState, setDescriptionState] = useState<boolean>(false)
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
    let arr = code.trim().split('	')
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
      name: '序号',
      code: 'index',
      render: (text: number, record: any, index: number) => {
        return index + 1
      }
    },
    {
      name: '物品id',
      code: 'id'
    },
    {
      name: '名称',
      code: 'name',
      width: 300
    },
    {
      name: '几率',
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
      name: '获得数量',
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
      name: '是否公告',
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
          <button className="rounded text-white bg-red-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition" onClick={() => del(index)}>
            删除
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
      <button className="rounded text-white bg-blue-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition" onClick={() => setDescriptionState(true)}>使用说明</button>
      {/* &emsp;<span>stackable/twdf/cash/randomcerabox/randomcerabox_tw.stk</span> */}
      <textarea
        className="w-full text-xs"
        rows={4}
        onChange={(e) => setCode(e.target.value)}
        value={code}
        placeholder="random list"
      ></textarea>
      <button className="rounded text-white bg-blue-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition" onClick={() => setImpStackableState(true)}>导入stackable</button>&emsp;
      <button className="rounded text-white bg-blue-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition" onClick={() => setAddState(true)}>添加一列</button>&emsp;
      <button className="rounded text-white bg-blue-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition" onClick={ex}>解析</button>&emsp;
      <button className="rounded text-white bg-blue-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition" onClick={out}>生成</button>&emsp; 百分比：<span>{max}</span>
      <BaseTable
        style={{ '--row-height': '16px', '--font-size': '12px', '--cell-padding': '2px 8px' }}
        dataSource={dataSource}
        columns={columns}
      />
      <Modal show={addState} header={'添加一列物品'} cancel={() => setAddState(false)} confirm={add}>
        <input
          className=" p-4 border w-full h-[26px] text-[12px]"
          value={addId}
          placeholder="物品ID"
          onChange={(e) => setAddId(e.target.value)}
        ></input>
      </Modal>
      <Modal
        show={impStackableState}
        header={'导入stackable'}
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
      <Modal
        show={descriptionState}
        header={'版本说明'}
        cancelText='知道了'
        cancel={() => setDescriptionState(false)}
      >
        {/* 🔥新增 🆕新功能 🐞bug 💄优化修复 🗑废弃 🛠重构 */}
        <pre className='whitespace-pre-wrap text-xs'>
          v1.0.1：<br/>
            🐞去random list首尾空格<br/>
            🔥添加源码地址（右上角Github）<br/>
            <br/>

          v1.0.0：<br/>
            🔥支持解析、生成、本地存stackable<br/>
            🔥修改概率、个数、公告<br/>
            <br/>
          说明：<br/>
            本魔盒编辑器是手动的，只能可视化编辑random list，random list的取和存，回显名称都需要手动操作<br/>
            1.使用lst管理器将stackable文件导出为代码---名称结构的字符串，使用「导入stackable」存在本地<br/>
            2.将randomcerabox_tw.stk文件的[random list]提取出来，放在random list编辑框，点击「解析」即可生成表格，如果你提前将stackable导入，那么名称列会自动匹配名称<br/>
            3.使用「添加一列」或删除、修改表格进行自定义修改，点击「生成」生成出修改后的结果，生成后的字符串会覆盖编辑框，自行复制覆盖randomcerabox_tw.stk文件中的random list即可<br/>
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
