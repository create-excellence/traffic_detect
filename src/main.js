import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/normlize.css'
import echarts from 'echarts'
import VueI18n from 'vue-i18n'
import LangZhCHS from './static/lang/zhchs'
import iView from 'iview'
import 'iview/dist/styles/iview.css'


/* import ampleadmin */
import './assets/material/bootstrap/dist/css/bootstrap.min.css'
import './assets/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.css'
import './assets/material/css/animate.css'
import './assets/material/css/style.css'
import './assets/material/css/colors/default.css'



Vue.use(ElementUI)
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zhchs',
  messages: {
    'zhchs': LangZhCHS,
  }
})


new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount('#app')
