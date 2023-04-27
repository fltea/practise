// export const BASE_URL = 'http://coderwhy.dev:8000'
export const TIME_OUT = 10000

// vite默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)

let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://192.168.1.106:8000'
} else {
  BASE_URL = 'http://localhost:8000'
}

console.log(BASE_URL)
export { BASE_URL }
