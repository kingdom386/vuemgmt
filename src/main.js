// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import eleui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/src/locale/lang/zh-CN'
import moment from 'moment'
import 'normalize.css'
import '@/assets/iconfont/iconfont.css'
import '@/styles/index.scss'
// 权限控制
import './rights'
// 调试
// import Vconsole from 'vconsole';

// eslint-disable-next-line no-new
// new Vconsole();

Vue.use(eleui, { size: 'small', locale })
Vue.prototype.$api = axios
Vue.prototype.$moment = moment
Vue.config.productionTip = false
window.merchantNo = "20000262"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
