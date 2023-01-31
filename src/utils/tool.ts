// 获取参数
export function getParams(query: string): { [key: string]: string } {
  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params: { [key: string]: string }, param: string) => {
      const [key, value] = param.split('=')
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : ''
      return params
    }, {})
}