import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/normlize.css'
import echarts from 'echarts'

Vue.use(ElementUI)

Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
