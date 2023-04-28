import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icons'

// 全局注册
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const APP = createApp(App)
APP.use(router)
APP.use(pinia)
APP.use(registerIcons)
// APP.use(ElementPlus)
APP.mount('#app')
