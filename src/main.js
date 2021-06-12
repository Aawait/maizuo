import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入px转rem的第三方包
import 'amfe-flexible'

Vue.config.productionTip = false

// 引入vant并使用
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 引入element-ui并使用
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)

// 获取token
let token = localStorage.getItem('token')
if(token){
  store.commit('addtoken',token)
}

// 获取mobile
let mobile = localStorage.getItem('mobile')
if(mobile){
  store.commit('userlogin',mobile)
}

// 定义事件列车,将vue实例保存再原型上，所有组件都能访问了
Vue.prototype.eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
