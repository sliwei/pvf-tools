import request from '@/utils/request'

interface ResType<T> {
  data: T
  msg: string
  status: number
}

// 登录-登录接口
export const login = (data: any) => {
  return request({ url: `/xx/xx`, method: 'post', data })
}
