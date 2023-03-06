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
// import lst from './data.js'
import hezi from './hezi.js'
import noDataSvg from '@/assets/images/noData.svg'
import axios from 'axios'
import { dataStore, portStore, useRecoilState } from '@/store'
import Editor from '@monaco-editor/react'
import Modal from '@/components/Modal/index.js'

const { randomceraboxState, lstState } = dataStore
const { portState } = portStore

registerAllModules()
registerLanguageDictionary(zhCN)

export default () => {
  const [data, setData] = useState<any[]>([])
  const [active, setActive] = useState<null | number>(null)
  const [out, setOut] = useState<number>(0)
  const [re, setRe] = useState<number>(0)
  const [outWin, setOutWin] = useState<boolean>(false)
  const [outcode, setOutcode] = useState<string>('')
  const hotRef = useRef<any>(null)
  const [randomcerabox, setRandomcerabox] = useRecoilState(randomceraboxState)
  const [port, setPort] = useRecoilState(portState)
  const [lst, setLst] = useRecoilState(lstState)

  useEffect(() => {
    if (!randomcerabox) {
      init()
    }
  }, [])

  // etc/itemdropinfo_monster_hell.etc

  // http://localhost:27000/Api/PvfUtiltiy/GetFileContent?filePath=etc/itemdropinfo_monster_hell.etc&useCompatibleDecompiler=true&encodingType=CN

  // http://localhost:27000/Api/PvfUtiltiy/GetAllLstFileList
  // http://localhost/Api/PvfUtiltiy/getLstFileInfo?filePath=equipment/equipment.lst

  // POST
  // http://localhost:/Api/PvfUtiltiy/ImportFile?filePath=[文件路径]

  // http://localhost:/Api/PvfUtiltiy/ImportFiles
  // [{"FilePath":"文件路径","FileContent":"文件内容"},{"FilePath":"文件路径","FileContent":"文件内容"}]

  // const saveHell = () => {
  //   axios
  //     .post('http://localhost:27000/Api/PvfUtiltiy/ImportFiles', [
  //       {
  //         FilePath: 'etc/itemdropinfo_monster_hell.etc',
  //         FileContent:
  //           '#PVF_File\r\n\r\n[drop prob count]\r\n2\t\r\n[dungeon difficulty drop prob]\r\n1\t44\t0\t0\t0\t0\t0\t45\t200\t335\t875\t1000\t1400\t1000\t\r\n[basis of rarity dicision]\r\n2\t400\t700\t980\t990\t1\t1001\t451\t791\t991\t995001\t1001\t1002\t\r\n[item drop ref table]\r\n1\t0\t4\t2\t1\t3\t3\t2\t2\t4\t3\t1\t5\t4\t0\t6\t3\t1\t7\t3\t0\t8\t4\t0\t9\t5\t0\t10\t6\t2\t11\t6\t1\t12\t6\t0\t13\t6\t3\t14\t6\t3\t15\t6\t3\t16\t6\t3\t17\t7\t3\t18\t8\t3\t19\t9\t3\t20\t8\t3\t21\t9\t3\t22\t10\t3\t23\t6\t3\t24\t6\t3\t25\t6\t3\t26\t6\t3\t27\t7\t3\t28\t8\t3\t29\t9\t3\t30\t8\t3\t31\t9\t3\t32\t10\t3\t33\t6\t3\t34\t6\t3\t35\t6\t3\t36\t6\t3\t37\t7\t3\t38\t8\t3\t39\t9\t3\t40\t8\t3\t41\t9\t3\t42\t10\t3\t43\t6\t3\t44\t6\t3\t45\t6\t3\t46\t6\t3\t47\t7\t3\t48\t8\t3\t49\t9\t3\t50\t8\t3\t51\t9\t3\t52\t10\t3\t53\t6\t3\t54\t6\t3\t55\t6\t3\t56\t6\t3\t57\t7\t3\t58\t8\t3\t59\t9\t3\t60\t8\t3\t61\t9\t3\t62\t10\t3\t63\t6\t3\t64\t6\t3\t65\t6\t3\t66\t6\t3\t67\t7\t3\t68\t8\t3\t69\t9\t3\t70\t8\t3\t71\t9\t3\t72\t10\t3\t73\t6\t3\t74\t6\t3\t75\t6\t3\t76\t6\t3\t77\t7\t3\t78\t8\t3\t79\t9\t3\t80\t8\t6\t81\t9\t6\t82\t10\t6\t83\t6\t6\t84\t6\t6\t85\t6\t6\t86\t6\t6\t87\t7\t6\t88\t8\t6\t89\t9\t6\t90\t8\t6\t91\t9\t6\t92\t10\t6\t93\t6\t6\t94\t6\t6\t95\t6\t6\t96\t6\t6\t97\t7\t6\t98\t8\t6\t99\t9\t6\t100\t6\t6\t101\t6\t6\t102\t6\t6\t103\t6\t6\t104\t6\t6\t105\t6\t6\t106\t6\t6\t107\t7\t6\t108\t8\t6\t109\t9\t6\t110\t6\t6\t111\t6\t6\t112\t6\t6\t113\t6\t6\t114\t6\t6\t115\t6\t6\t116\t6\t6\t117\t7\t6\t118\t8\t6\t119\t9\t6\t120\t6\t6\t121\t6\t6\t122\t6\t6\t123\t6\t6\t124\t6\t6\t125\t6\t6\t126\t6\t6\t127\t7\t6\t128\t8\t6\t129\t9\t6\t130\t6\t6\t131\t6\t6\t132\t6\t6\t133\t6\t6\t134\t6\t6\t135\t6\t6\t136\t6\t6\t137\t7\t6\t138\t8\t6\t139\t9\t6\t140\t6\t6\t141\t6\t6\t142\t6\t6\t143\t6\t6\t144\t6\t6\t145\t6\t6\t146\t6\t6\t147\t7\t6\t148\t8\t6\t149\t9\t6\t150\t6\t6\t151\t6\t6\t152\t6\t6\t153\t6\t6\t154\t6\t6\t155\t6\t6\t156\t6\t6\t157\t7\t6\t158\t8\t6\t159\t9\t6\t160\t6\t6\t161\t6\t6\t162\t6\t6\t163\t6\t6\t164\t6\t6\t165\t6\t6\t166\t6\t6\t167\t7\t6\t168\t8\t6\t169\t9\t6\t170\t6\t6\t171\t6\t6\t172\t6\t6\t173\t6\t6\t174\t6\t6\t175\t6\t6\t176\t6\t6\t177\t7\t6\t178\t8\t6\t179\t9\t6\t180\t6\t6\t181\t6\t6\t182\t6\t6\t183\t6\t6\t184\t6\t6\t185\t6\t6\t186\t6\t6\t187\t7\t6\t188\t8\t6\t189\t9\t6\t190\t6\t6\t191\t6\t6\t192\t6\t6\t193\t6\t6\t194\t6\t6\t195\t6\t6\t196\t6\t6\t197\t7\t6\t198\t8\t6\t199\t9\t6\t200\t6\t6\t\r\n'
  //       }
  //     ])
  //     .then((res) => {
  //       console.log('====================================')
  //       console.log(res)
  //       console.log('====================================')
  //     })
  // }

  const init = () => {
    setData([])
    setActive(null)

    axios
      .get(
        `http://localhost:${port}/Api/PvfUtiltiy/GetFileContent?filePath=stackable/twdf/cash/randomcerabox/randomcerabox_tw.stk&useCompatibleDecompiler=true&encodingType=CN`
      )
      .then((res: any) => {
        setRandomcerabox(res.data.Data)
        setRe(new Date().getTime())
      })

    // setRandomcerabox(hezi.Data)
    // setRe(new Date().getTime())
  }

  useEffect(() => {
    if (randomcerabox) {
      console.log(randomcerabox)
      const random = randomcerabox.substring(
        randomcerabox.indexOf('[random]'),
        randomcerabox.indexOf('[/random]')
      )
      console.log(random)
      let randomArr: string[] = random.split('[random list]')
      console.log(randomArr)
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
      console.log(randomArrList)
      const randomArrList2 = randomArrList.map((v) => {
        let arr: any[] = []
        for (let i = 0; i < Math.ceil(v.length / 4); i++) {
          arr.push(
            i === 0
              ? [
                  parseInt(v[i * 4 + 1]),
                  lst[v[i * 4 + 1]] || '-',
                  '\\',
                  parseInt(v[i * 4 + 2]) || 1,
                  parseInt(v[i * 4 + 3]) || 0
                ]
              : [
                  parseInt(v[i * 4 + 0]),
                  lst[v[i * 4 + 0]] || '-',
                  parseInt(v[i * 4 + 1]),
                  parseInt(v[i * 4 + 2]) || 1,
                  parseInt(v[i * 4 + 3]) || 0
                ]
          )
        }
        return arr
      })
      setData(randomArrList2)
      switchRandom(0)
    } else {
      setData([])
    }
  }, [randomcerabox, re])

  const save = () => {
    if (hotRef.current && active !== null) {
      const hot = hotRef.current.hotInstance
      const filtersPlugin = hot.getPlugin('filters')
      filtersPlugin.removeConditions(0)
      filtersPlugin.removeConditions(1)
      filtersPlugin.removeConditions(2)
      filtersPlugin.removeConditions(3)
      filtersPlugin.removeConditions(4)
      filtersPlugin.filter()
      const out = data
      out[active] = hot.getData()

      let out1 = []
      out.forEach((v, i) => {
        let chr = []
        v.forEach((vv, ii) => {
          if (ii === 0) {
            chr = [1, vv[0], vv[3], vv[4]]
          } else {
            chr = [...chr, vv[0], vv[2], vv[3], vv[4]]
          }
        })
        out1.push(chr)
      })

      let txt = `#PVF_File

[name]
	\`赛丽亚的祝福\`

[name2]
	\`name2_690000280\`

[explain]
	\`    打开后可以获得装备、 宠物、 宝珠、 强化券、 各种消耗品等。
    开启1个礼盒需要消耗1个幸运魔锤。\`

[flavor text]
	\`点击鼠标右键开启礼盒\`

[grade]
	1

[attach type]
	\`[free]\`

[rarity]
	2

[usable job]
	\`[all]\`
[/usable job]

[minimum level]
	1

[icon]
	\`Item/stackable/consumption.img\`	442

[field image]
	\`Item/field_material.img\`	39

[stackable type]
	\`[multi upgradable legacy]\`	0

[random]

	[default list]
		${out1[0].join('	')}
	[/default list]

	[random list]
		${out1[1].join('	')}
	[/random list]

	[random list]
		${out1[2].join('	')}
	[/random list]

	[random list]
		${out1[3].join('	')}
	[/random list]

	[sealing removal item]
		900	1
	[/sealing removal item]

[/random]

[move wav]
	\`CLOTH_TOUCH\`
`
      console.log(txt)
      setOutWin(true)
      setOutcode(txt)
    }
  }

  const calculated = (dat?: any[]) => {
    if (hotRef.current) {
      const hot = hotRef.current.hotInstance
      const filtersPlugin = hot.getPlugin('filters')
      filtersPlugin.removeConditions(0)
      filtersPlugin.removeConditions(1)
      filtersPlugin.removeConditions(2)
      filtersPlugin.removeConditions(3)
      filtersPlugin.removeConditions(4)
      filtersPlugin.filter()
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
      const filtersPlugin = hot.getPlugin('filters')
      filtersPlugin.removeConditions(0)
      filtersPlugin.removeConditions(1)
      filtersPlugin.removeConditions(2)
      filtersPlugin.removeConditions(3)
      filtersPlugin.removeConditions(4)
      filtersPlugin.filter()
      setData((v) => {
        v[active] = hot.getData()
        return v
      })
    }
    setActive(i)
    setTimeout(() => {
      calculated(data[i])
    }, 100)
  }

  return (
    <Container
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
    >
      <div className="my-[5px] flex items-center">
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="默认自动读取一次，如果pvfUtility编辑器中文件被改动，请点击重新读取"
          onClick={init}
          className="rounded text-white bg-blue-600 py-1 px-2 mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition flex items-center"
        >
          <AiOutlineSearch />
          重新读取
        </button>
        &ensp;
        <button
          onClick={save}
          className="rounded text-white bg-[#ff9800] py-1 px-2 mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition flex items-center"
        >
          <AiOutlineSave />
          生成
        </button>
      </div>
      <div className="flex my-[5px]">
        {data.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              i !== active ? switchRandom(i) : null
            }}
            className={`flex text-[14px] cursor-pointer items-center p-1.5 hover:bg-[#6466f133] border-indigo-500 ${
              i === active ? 'border-l-2 border-t-2 border-r-2' : 'border-b-2'
            }`}
          >
            {i === 0 ? 'default list' : `random list ${i}`}
          </div>
        ))}
      </div>
      {active !== null ? (
        <div className="flex items-center my-[5px]">
          <button
            data-tooltip-id="my-tooltip"
            data-tooltip-content="修改数据后，重新计算概率"
            onClick={() => calculated()}
            className="rounded text-white bg-blue-600 py-1 px-2 mr-[4px] mb-[4px] hover:scale-105 hover:cursor-pointer active:scale-95 transition"
          >
            计算概率
          </button>
          &ensp;
          <span className="text-[#f44336] text-[14px]">
            当前: 1,000,000(100%总概率) - {out}({(out / 10000).toFixed(2)}%其他物品) ={' '}
            {(1000000 - out).toFixed(0)}({`${(100 - out / 10000).toFixed(2)}`}%第一个物品)
          </span>
          &ensp;
          <AiFillQuestionCircle
            data-tooltip-id="my-tooltip"
            data-tooltip-content="第一个物品的概率等于100万减去其他物品概率之和"
            className="text-[#ff9800] text-[18px]"
          />
        </div>
      ) : null}
      <div className="flex-1">
        <div className="flex"></div>
        {active !== null ? (
          <HotTable
            key={active}
            ref={hotRef}
            filters={true}
            dropdownMenu={true}
            data={data[active]}
            colHeaders={(index) => ['物品id', '名称', '几率', '获得数量', '是否公告'][index]}
            // colWidths={[90, 370, 90, 90, 90]}
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
            // manualRowMove
            columns={(index) => {
              return {
                type: index >= 2 ? 'numeric' : 'text'
                // readOnly: index < 2
              }
            }}
            afterChange={(changes, source) => {
              changes?.forEach(([row, prop, oldValue, newValue]) => {
                const hot = hotRef.current.hotInstance
                if (prop === 0) {
                  hot.setDataAtCell(row, 1, lst[newValue] || '-', 'GetName')
                }
              })
            }}
            beforeChange={(changes, source: string) => {
              changes?.forEach(([row, prop, oldValue, newValue], index) => {
                if (source !== 'GetName' && prop === 1) {
                  changes[index] = null
                }
              })
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
      <Tooltip id="my-tooltip" />

      <Modal
        show={outWin}
        header={`生成文件：/stackable/twdf/cash/randomcerabox/randomcerabox_tw.stk`}
        cancel={() => {
          setOutcode('')
          setOutWin(false)
        }}
        cancelText="ok"
      >
        <div className="py-[20px] h-[60vh] w-[70vw]">
          {outcode ? (
            <Editor
              language="ini"
              theme="vs-dark"
              options={{
                renderWhitespace: 'all',
                lineNumbers: 'on'
              }}
              height="100%"
              value={outcode}
              defaultValue="// 生成"
            />
          ) : null}
        </div>
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
