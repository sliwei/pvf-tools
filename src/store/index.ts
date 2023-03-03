import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  selectorFamily,
  atom,
  selector
} from 'recoil'
import * as themeStore from './theme'
import * as portStore from './port'
import * as dataStore from './data'

export {
  atom, // 创建数据源
  selector, // 处理atom创建的数据源，类似于Vue的计算函数，得到需要的格式数据，支持异步
  useRecoilState, // 获取到atom数据源的值和set方法
  useRecoilValue, // 获取到atom数据源的值 或者 获取selector创建的数据
  useSetRecoilState, // 获取到atom数据源的set方法
  selectorFamily, // 与selector类似，但可以传参
  themeStore,
  portStore,
  dataStore
}
