import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import FastClick from "fastclick"
import toast from 'components/common/toast/index.js'
Vue.config.productionTip = false

//安装Toast插件
Vue.use(toast)
// 解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
