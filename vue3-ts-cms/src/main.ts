import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'
import App from './App.vue'
import router from './router'

const APP = createApp(App)
APP.use(router)
APP.mount('#app')
