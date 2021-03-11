import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations.js'
// import actions from './actions.js'
import getters from './getters.js'

//1.安装插件
Vue.use(Vuex)
const state = {
  cartList: []
}
//2.创建Store对象
const store = new Vuex.Store({
  state,

  mutations: {
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }

  },
  actions: {
    addCart(context, payload) {
      // 查找之前数组中是否有该商品
      return new Promise((resolve, reject) => {
        let oldproduct = context.state.cartList.find(item => item.iid === payload.iid);
        // for (let item of context.state.cartList) {
        //   if (item.iid === payload.iid) {
        //     oldproduct = item;
        //   }
        // }
        // 判断oldproduct
        if (oldproduct) {
          // oldproduct.count += 1
          context.commit('addCounter', oldproduct)
          resolve('当前的商品数量+1')
        } else {
          payload.count = 1
          // context.state.cartList.push(payload)
          context.commit('addToCart', payload)
          resolve('添加新商品数量')
        }
      })


    }
  },
  getters,



})

//挂载到Vue实例上
export default store
