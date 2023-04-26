import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'

const APP = createApp(App)
APP.use(router)
APP.use(pinia)
APP.mount('#app')
