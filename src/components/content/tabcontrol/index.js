// 配置路由相关的信息
import VueRouter from "vue-router"
import Vue from 'vue'

const home = () => import('../views/home/home')
// 1.通过Vue.use,安装插件
Vue.use(VueRouter)

// 2创建VueRouter对象
const router = [
    {
       
      },
]
const router = new VueRouter({
    routes
})
// 3将router对象传入到Vue实例
export default router




//  path: '/home',
//         component: home