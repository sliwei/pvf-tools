import { defineConfig, loadEnv } from 'vite'
import { join } from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
import dayjs from 'dayjs'

export default async ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
    VITE_APP_TIME: dayjs().format('v.YY.MMDD.HHmm')
  }
  const isProd = process.env.VITE_APP_ENV && process.env.VITE_APP_ENV !== 'dev'
  const plugins = [reactRefresh()]
  let sourcemap = true
  let base = './'

  console.log(isProd)
  if (isProd) {
    base = 'https://i.bstu.cn/code/pvf-tools/'
  }

  return defineConfig({
    sourcemap: true,
    root: __dirname,
    resolve: {
      alias: [{ find: '@', replacement: join(__dirname, 'src') }],
      extensions: ['.json', '.ts', '.js']
    },
    plugins,
    base,
    server: {
      port: 3001,
      proxy: {
        // '^/xxx': {
        //   target: 'https://xxx.xxx.com',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/xxx/, '')
        // },
      }
    }
  })
}
