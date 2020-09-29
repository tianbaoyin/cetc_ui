import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import uploader from 'vue-simple-uploader'
import '@/icons' // icon
import '@/permission' // permission control
import * as filters from './filters'
import './utils/dialog'
import preventReClick from '@/utils/preventReClick.js'
// 引入form-create表单生成器
import formCreate from '@form-create/element-ui'
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 使用form-create
Vue.use(formCreate)

Vue.use(uploader)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  preventReClick,
  render: h => h(App)
})
