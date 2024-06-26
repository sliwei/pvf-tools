import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { BaseTable } from 'ali-react-table'
import Modal from '@/components/Modal'

interface dataSourceType {
  y: string
  x1: number
  x2: number
  x3: number
  x4: number
  x5: number
  x6: number
  x7: number
  x8: number
  x9: number
  x10: number
}

const defy = [
  'y1',
  'y2',
  'y3',
  'y4',
  'y5',
  'y6',
  'y7',
  'y8',
  'y9',
  'y10',
  'y11',
  'y12',
  'y13',
  'y14',
  'y15',
  'y16',
  'y17',
  'y18',
  'y19',
  'y20'
]
const defx = { x1: 0, x2: 0, x3: 0, x4: 0, x5: 0, x6: 0, x7: 0, x8: 0, x9: 0, x10: 0 }

export default () => {
  // 1	19	15	2	26	15	3	34	15	4	40	15	5	48	15	6	56	15	7	64	15	8	73	15	9	84	15	10	92	15	11	102	15	12	112	15	13	122	15	14	133	15	15	144	15	16	155	15	17	167	15	18	180	15	19	191	15	20	193	15	21	198	15	22	208	15	23	221	15	24	211	15	25	221	15	26	234	15	27	243	15	28	288	15	29	302	15	30	316	15	31	331	15	32	345	15	33	359	15	34	376	15	35	392	15	36	407	15	37	422	15	38	438	15	39	456	15	40	453	15	41	473	15	42	494	15	43	515	15	44	536	15	45	558	15	46	579	15	47	602	15	48	627	15	49	648	15	50	672	15	51	771	15	52	795	15	53	820	15	54	848	15	55	875	15	56	904	15	57	930	15	58	939	15	59	946	15	60	948	15	61	972	15	62	994	15	63	1018	15	64	1040	15	65	1062	15	66	1086	15	67	1108	15	68	1132	15	69	1155	15	70	1179	15	71	1200	15	72	1224	15	73	1246	15	74	1269	15	75	1293	15	76	1315	15	77	1338	15	78	1360	15	79	1384	15	80	1406	15	81	1429	15	82	1451	15	83	1475	15	84	1496	15	85	1521	15	86	1543	15	87	1565	15	88	1590	15	89	1611	15	90	1635	15	91	1657	15	92	1680	15	93	1702	15	94	1727	15	95	1750	15	96	1772	15	97	1796	15	98	1818	15	99	1841	15	100	1981	15	101	2005	15	102	2029	15	103	2054	15	104	2078	15	105	2103	15	106	2129	15	107	2154	15	108	2180	15	109	2206	15	110	2233	15	111	2259	15	112	2284	15	113	2309	15	114	2335	15	115	2360	15	116	2386	15	117	2413	15	118	2439	15	119	2466	15	120	2493	15	121	2521	15	122	2548	15	123	2576	15	124	2605	15	125	2633	15	126	2662	15	127	2692	15	128	2721	15	129	2751	15	130	2781	15	131	2809	15	132	2837	15	133	2866	15	134	2894	15	135	2923	15	136	2952	15	137	2982	15	138	3012	15	139	3042	15	140	3072	15	141	3103	15	142	3134	15	143	3165	15	144	3197	15	145	3229	15	146	3261	15	147	3294	15	148	3327	15	149	3360	15	150	3394	15	151	3428	15	152	3462	15	153	3497	15	154	3532	15	155	3567	15	156	3603	15	157	3639	15	158	3675	15	159	3712	15	160	3749	15	161	3786	15	162	3824	15	163	3862	15	164	3901	15	165	3940	15	166	3979	15	167	4019	15	168	4059	15	169	4100	15	170	4141	15	171	4182	15	172	4224	15	173	4266	15	174	4309	15	175	4352	15	176	4396	15	177	4440	15	178	4484	15	179	4529	15	180	4574	15	181	4620	15	182	4666	15	183	4713	15	184	4760	15	185	4808	15	186	4856	15	187	4904	15	188	4953	15	189	5003	15	190	5053	15	191	5103	15	192	5154	15	193	5206	15	194	5258	15	195	5311	15	196	5364	15	197	5417	15	198	5471	15	199	5526	15	200	5581	15
  const [code, setCode] = useState<string>('')
  const [num, setNum] = useState<number>(0)
  const [type, setType] = useState<boolean>(true)
  const [descriptionState, setDescriptionState] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<dataSourceType[]>(
    defy.map((v) => ({
      y: v,
      ...defx
    }))
  )

  const change = () => {
    let x1 = ''
    let x2 = ''
    let x3 = ''
    let x4 = ''
    let x5 = ''
    let x6 = ''
    let x7 = ''
    let x8 = ''
    let x9 = ''
    let x10 = ''
    dataSource.forEach((v, i) => {
      x1 += `${0 * 20 + i + 1}	${v.x1}	15	`
      x2 += `${1 * 20 + i + 1}	${v.x2}	15	`
      x3 += `${2 * 20 + i + 1}	${v.x3}	15	`
      x4 += `${3 * 20 + i + 1}	${v.x4}	15	`
      x5 += `${4 * 20 + i + 1}	${v.x5}	15	`
      x6 += `${5 * 20 + i + 1}	${v.x6}	15	`
      x7 += `${6 * 20 + i + 1}	${v.x7}	15	`
      x8 += `${7 * 20 + i + 1}	${v.x8}	15	`
      x9 += `${8 * 20 + i + 1}	${v.x9}	15	`
      x10 += `${9 * 20 + i + 1}	${v.x10}	15	`
    })
    // console.log(`${x1}${x2}${x3}${x4}${x5}${x6}${x7}${x8}${x9}${x10}`.trim())
    setCode(`${x1}${x2}${x3}${x4}${x5}${x6}${x7}${x8}${x9}${x10}`.trim())
  }

  const ex = () => {
    let arr = code.trim().split('	')
    let arr1: number[] = []
    ;[...new Array(200)].forEach((_, i) => {
      arr1.push(parseInt(arr[3 * i + 1] || '0'))
    })

    setDataSource((v) => {
      ;[...new Array(20)].forEach((_v, i) => {
        v[i] = {
          ...v[i],
          x1: arr1[0 * 20 + i], // 1
          x2: arr1[1 * 20 + i], // 21
          x3: arr1[2 * 20 + i], // 41
          x4: arr1[3 * 20 + i], // ...
          x5: arr1[4 * 20 + i], // ...
          x6: arr1[5 * 20 + i], // ...
          x7: arr1[6 * 20 + i], // ...
          x8: arr1[7 * 20 + i], // ...
          x9: arr1[8 * 20 + i], // ...
          x10: arr1[9 * 20 + i]
        }
      })
      return [...v]
    })
  }

  const batch = () => {
    setDataSource((v) => {
      ;[...new Array(20)].forEach((_v, i) => {
        if (type) {
          v[i] = {
            ...v[i],
            x1: (0 * 20 + i + 1) * num, // 1
            x2: (1 * 20 + i + 1) * num, // 21
            x3: (2 * 20 + i + 1) * num, // 41
            x4: (3 * 20 + i + 1) * num, // ...
            x5: (4 * 20 + i + 1) * num, // ...
            x6: (5 * 20 + i + 1) * num, // ...
            x7: (6 * 20 + i + 1) * num, // ...
            x8: (7 * 20 + i + 1) * num, // ...
            x9: (8 * 20 + i + 1) * num, // ...
            x10: (9 * 20 + i + 1) * num
          }
        } else {
          v[i] = {
            ...v[i],
            x1: 0 * 20 + i + 1 + num, // 1
            x2: 1 * 20 + i + 1 + num, // 21
            x3: 2 * 20 + i + 1 + num, // 41
            x4: 3 * 20 + i + 1 + num, // ...
            x5: 4 * 20 + i + 1 + num, // ...
            x6: 5 * 20 + i + 1 + num, // ...
            x7: 6 * 20 + i + 1 + num, // ...
            x8: 7 * 20 + i + 1 + num, // ...
            x9: 8 * 20 + i + 1 + num, // ...
            x10: 9 * 20 + i + 1 + num
          }
        }
      })
      return [...v]
    })
    change()
  }

  const changeVal = (type: string, val: string, index: number) => {
    setDataSource((v) => {
      v[index][type] = parseInt(val)
      return [...v]
    })
  }

  const blurVal = (type: string, val: string, index: number) => {
    setDataSource((v) => {
      if (parseInt(val) >= 0) {
        v[index][type] = parseInt(val) || 0
      } else {
        v[index][type] = 0
      }
      return [...v]
    })
    change()
  }

  const columns = [...new Array(10)].map((v, i) => ({
    name: `${i * 20 + 1}~${(i + 1) * 20}`,
    code: `x${i + 1}`,
    render: (text: number, record: any, index: number) => {
      return (
        <div className="flex items-center justify-center">
          <div className="inline-block">lv{i * 20 + (index + 1)}</div>
          <div className="flex-1]">
            <input
              key={`s${record.y}${index}`}
              onChange={(e) => changeVal(`x${i + 1}`, e.target.value, index)}
              onBlur={(e) => blurVal(`x${i + 1}`, e.target.value, index)}
              className="h-[20px] w-full p-0 text-[12px]"
              type="number"
              value={text}
            />
          </div>
        </div>
      )
    }
  }))

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
        placeholder="gold drop ref table"
      ></textarea>
      <button
        className="rounded text-white bg-blue-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition"
        onClick={ex}
      >
        回显
      </button>
      &emsp;
      <div className="flex items-center">
        <input
          id="push-email"
          name="push-notifications"
          type="radio"
          checked={type}
          onChange={() => setType(true)}
          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
          递乘
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="push-nothing"
          name="push-notifications"
          type="radio"
          checked={!type}
          onChange={() => setType(false)}
          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
          递增
        </label>
      </div>
      <input
        type="number"
        className="mt-1 mb-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={num}
        onChange={(e) => setNum(parseInt(e.target.value || '0'))}
        onBlur={(e) => setNum(parseInt(e.target.value || '0'))}
      ></input>
      <button
        className="rounded text-white bg-blue-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition"
        onClick={batch}
      >
        批量修改
      </button>
      &emsp;
      <BaseTable
        style={{ '--row-height': '16px', '--font-size': '12px', '--cell-padding': '2px 2px' }}
        dataSource={dataSource}
        columns={columns}
      />
      <Modal
        show={descriptionState}
        header={'版本说明'}
        cancelText="知道了"
        cancel={() => setDescriptionState(false)}
      >
        {/* 🔥新增 🆕新功能 🐞bug 💄优化修复 🗑废弃 🛠重构 */}
        <pre className="whitespace-pre-wrap text-xs">
          v1.0.3：
          <br />
          🔥金币掉落计算、批量修改
          <br />
          <br />
          说明：
          <br />
          金币掉落计算
          <br />
          复制itemdropinfo_common文件gold drop ref table的值，粘贴到编辑中点击回显自动回填到表格中
          <br />
          编辑表格中的数值，自动生成代码到编辑框，自行复制粘贴回文件即可
          <br />
          选择递乘或递增，填写数字，点击批量修改，表格自动填充对应数值
        </pre>
      </Modal>
    </Container>
  )
}

const Container = styled(motion.div)`
  box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px;
  padding: 0 30px 30px 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
`
